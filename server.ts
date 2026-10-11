import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Server-side AI Scent Assistant Proxy
app.post('/api/scent-assistant', async (req, res) => {
  try {
    const { message, products } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        reply: "Welcome to Alora Fragrance House in Accra! For tropical humidity and warm weather, I recommend testing our 5ml travel decant of Bergamot & White Cedar or Velours Nocturne. Use code WELCOME10 for 10% off your first order.",
        suggestedProductSlugs: ['velours-nocturne', 'bergamot-cedarwood'],
        recommendedDecantSize: '5ml'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are the master Olfactory Sommelier for Alora Fragrance House, a high perfumery and decanting house in Accra, Ghana.
Alora Fragrance House is NOT a perfume factory; its mission is to bridge the gap between watching glowing online reviews and the risk of expensive blind buys by offering authentic 5ml (~75 sprays), 10ml (~150 sprays), and 15ml (~225 sprays) decants hand-drawn from original flacons, alongside pure concentrated perfume oils and full bottles.
All prices are in Ghanaian Cedis (GH₵).
The active promo code for first-time orders is WELCOME10 for 10% off.

Available catalog products:
${JSON.stringify(products || [], null, 2)}

Provide warm, sophisticated, concise luxury fragrance recommendations tailored to the customer's request. Explain how top, heart, and base notes evolve in Ghana's coastal heat. Recommend the ideal decant size (5ml, 10ml, or 15ml).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I recommend trying a 5ml decant of Velours Nocturne or Rose & Amber Wood to test wear on your skin. Use code WELCOME10 for 10% off!";

    // Extract suggested products from reply
    const matchedSlugs: string[] = [];
    if (/velours/i.test(replyText)) matchedSlugs.push('velours-nocturne');
    if (/rose/i.test(replyText)) matchedSlugs.push('rose-et-ambre');
    if (/bergamot/i.test(replyText)) matchedSlugs.push('bergamot-cedarwood');
    if (/sandalwood/i.test(replyText)) matchedSlugs.push('smoked-sandalwood-elixir');
    if (/vanille/i.test(replyText)) matchedSlugs.push('sol-vanille-body-splash');
    if (/vetiver/i.test(replyText)) matchedSlugs.push('vetiver-basil-perfume-oil');
    if (/oud/i.test(replyText)) matchedSlugs.push('oud-cashmere-perfume-oil');

    const recommendedDecantSize = /10ml/i.test(replyText) ? '10ml' : /15ml/i.test(replyText) ? '15ml' : '5ml';

    return res.json({
      reply: replyText,
      suggestedProductSlugs: matchedSlugs.length > 0 ? matchedSlugs : ['velours-nocturne', 'rose-et-ambre'],
      recommendedDecantSize
    });
  } catch (error) {
    console.error('Gemini Scent Assistant error:', error);
    return res.json({
      reply: "As your Olfactory Concierge at Alora Fragrance House, I recommend exploring our 5ml travel decants of Velours Nocturne (rich black fig and smoked cedar) or Bergamot & White Cedar (crisp coastal freshness). Both are calibrated for Accra's climate with 8–12 hours of longevity. Remember to enter promo code WELCOME10 at checkout for 10% off!",
      suggestedProductSlugs: ['velours-nocturne', 'bergamot-cedarwood'],
      recommendedDecantSize: '5ml'
    });
  }
});

// Vite Middleware for development
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  // Production static file serving
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Alora Fragrance House server running on http://localhost:${port}`);
});
