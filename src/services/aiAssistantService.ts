import { Product, AiChatMessage } from '../types';

export interface ScentAssistantResponse {
  reply: string;
  suggestedProducts: Product[];
  recommendedDecantSize?: '5ml' | '10ml' | '15ml';
}

/**
 * Intelligent Olfactory Concierge for Alora Fragrance House.
 * Answers queries about note accords, tropical longevity in Ghana,
 * and matches shoppers with authentic 5ml, 10ml, or 15ml decants.
 */
export async function askScentAssistant(
  userQuery: string,
  allProducts: Product[],
  _conversationHistory: AiChatMessage[] = []
): Promise<ScentAssistantResponse> {
  const queryLower = userQuery.toLowerCase();

  // Try server-side API proxy first if running full-stack
  try {
    const res = await fetch('/api/scent-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userQuery,
        products: allProducts.map(p => ({
          id: p.id,
          name: p.name,
          family: p.fragranceFamily,
          notes: p.notes,
          price: p.price,
          decantOptions: p.decantOptions,
          shortDescription: p.shortDescription
        }))
      })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.reply) {
        const matchingProducts = allProducts.filter(p =>
          data.suggestedProductSlugs?.includes(p.slug) ||
          data.suggestedProductIds?.includes(p.id) ||
          data.reply.toLowerCase().includes(p.name.toLowerCase())
        ).slice(0, 3);

        return {
          reply: data.reply,
          suggestedProducts: matchingProducts.length > 0 ? matchingProducts : allProducts.slice(0, 2),
          recommendedDecantSize: data.recommendedDecantSize || '5ml'
        };
      }
    }
  } catch {
    // Proceed to high-fidelity client-side sommelier engine
  }

  // --- Intelligent Knowledge-Grounded Olfactory Engine ---

  // Detect query nuances
  const isHeatOrDaytime = /heat|accra|sun|humid|sweat|hot|day|fresh|clean|office|work|citrus|coastal|marine/i.test(queryLower);
  const isDateOrEvening = /date|night|evening|dinner|seductive|dark|sexy|romantic|intimate|party|club/i.test(queryLower);
  const isVanillaGourmand = /vanilla|sweet|gourmand|caramel|coconut|tonka|warm|cozy/i.test(queryLower);
  const isWoodyOud = /woody|wood|oud|cedar|sandalwood|smoke|smoked|earth|patchouli|vetiver/i.test(queryLower);
  const isFloralRose = /rose|flower|floral|jasmine|saffron/i.test(queryLower);
  const isDecantDiscovery = /decant|sample|starter|discovery|size|5ml|10ml|15ml|blind buy|difference/i.test(queryLower);
  const isOilOrAttar = /oil|attar|concentrated|alcohol-free|pulse|skin scent/i.test(queryLower);

  let matching: Product[] = [];
  let reply = '';
  let decantSize: '5ml' | '10ml' | '15ml' = '5ml';

  if (isHeatOrDaytime) {
    matching = allProducts.filter(
      p => p.fragranceFamily === 'Fresh Citrus & Aquatic' || p.slug.includes('bergamot') || p.slug.includes('vetiver')
    );
    if (matching.length === 0) matching = allProducts.slice(2, 4);
    decantSize = '10ml';
    reply = `For Accra’s coastal heat and tropical humidity, you need fragrances with crisp aromatic top notes anchored by clean cedarwood and mineral sea salt so they don’t turn cloying or evaporate within an hour. 

I strongly recommend starting with **Bergamot & White Cedar** (crisp Italian bergamot, neroli, and Virginia cedarwood) or our alcohol-free **Vetiver & Holy Basil Pure Perfume Oil**. Both radiate a clean, magnetic aura throughout the day. A **5ml or 10ml travel decant** gives you over 75 to 150 sprays to test wear on your skin before committing to a full flacon.`;
  } else if (isDateOrEvening) {
    matching = allProducts.filter(
      p => p.slug.includes('velours') || p.slug.includes('rose-et-ambre') || p.slug.includes('smoked-sandalwood')
    );
    decantSize = '5ml';
    reply = `For an evening rendezvous or celebration, you want an alluring, sensual sillage with rich base-note fixation that lingers as you move.

Our top recommendation is **Velours Nocturne** — an opulent extrait of black fig, smoked cedarwood, and bourbon vanilla. Alternatively, **Rose & Amber Wood** brings luminous damask rose warmed by golden amber and saffron. Both are masterfully formulated to leave an unforgettable trail. I recommend our **5ml Travel Decant** (approx. 75 sprays) to experience their intimate drydown on date night.`;
  } else if (isVanillaGourmand) {
    matching = allProducts.filter(
      p => p.fragranceFamily === 'Amber & Gourmand' || p.slug.includes('vanille') || p.slug.includes('velours')
    );
    decantSize = '10ml';
    reply = `If you love warm gourmand and velvety vanilla accords, you will adore our **Sol Vanille Fine Body Splash** (Tahitian vanilla bean, toasted coconut, and solar jasmine) paired with **Velours Nocturne** for rich bourbon vanilla depth. 

Our body splash is perfect for generous daily misting in warm weather, while a **5ml or 10ml decant** of Velours Nocturne adds luxurious amber depth for cooler evenings.`;
  } else if (isWoodyOud) {
    matching = allProducts.filter(
      p => p.fragranceFamily === 'Warm Woody' || p.slug.includes('sandalwood') || p.slug.includes('oud')
    );
    decantSize = '5ml';
    reply = `For lovers of regal woods and smoky textures, explore **Smoked Sandalwood Elixir** and **Oud & Royal Cashmere Concentrated Perfume Oil**. 

These formulations eschew harsh synthetic alcohols in favor of rich Australian sandalwood, Cambodian oud, and green cardamom that bond intimately with your skin. With 10–14 hours of continuous longevity, a **5ml or 10ml pocket decant** delivers weeks of distinguished wearing.`;
  } else if (isFloralRose) {
    matching = allProducts.filter(
      p => p.fragranceFamily === 'Crisp Floral' || p.slug.includes('rose')
    );
    decantSize = '5ml';
    reply = `Our interpretation of floral elegance is **Rose & Amber Wood**. Instead of powdery antique sweetness, we infuse crimson damask rose petals with glowing amber and spicy saffron, creating a modern floriental masterpiece that wears effortlessly in Ghana’s climate. 

I recommend sampling the **5ml decant (GH₵ 60)** or **10ml atomizer (GH₵ 105)** to experience its multi-layered drydown on your pulse points.`;
  } else if (isOilOrAttar) {
    matching = allProducts.filter(p => p.productType === 'perfume_oil');
    decantSize = '10ml';
    reply = `Our concentrated pure perfume oils (Attars) are 100% alcohol-free and formulated with skin-nourishing carrier oils. They develop directly on your pulse points without the sharp alcohol burst of standard sprays, radiating an intimate, personal scent halo for over 12 to 16 hours. 

Check out **Vetiver & Holy Basil** for botanical freshness or **Oud & Royal Cashmere** for sovereign evening depth. Available in 5ml, 10ml, and 15ml rollerball flacons!`;
  } else if (isDecantDiscovery) {
    matching = allProducts.filter(p => p.productType === 'decant' || p.decantAvailable);
    decantSize = '10ml';
    reply = `At Alora Fragrance House, our entire philosophy is built to bridge the gap between online reviews and buying full bottles blindly:
    
• **5ml Travel Decant**: ~75 sprays (10–14 days of test wearing on your skin).
• **10ml Deluxe Atomizer**: ~150 sprays (30 days of signature rotation).
• **15ml Pocket Flacon**: ~225 sprays (6–8 weeks of seasonal signature wear).

Our **Niche Discovery Decant Vault (5 x 10ml)** allows you to sample our 5 most coveted luxury creations for a full month before choosing a 100ml full flacon! Remember to use promo code **WELCOME10** for 10% off your first order.`;
  } else {
    // General bespoke guidance
    matching = allProducts.slice(0, 3);
    decantSize = '5ml';
    reply = `Welcome to Alora Fragrance House! As your Olfactory Concierge, I can guide you through our artisanal decants and high perfumery extraits hand-poured in Accra. 

Tell me about the feeling you want to radiate, your favorite perfume notes (e.g., vanilla, oud, bergamot, rose), or the occasion you are dressing for. I will recommend the exact formulation and decant size (5ml, 10ml, or 15ml) so you can test it on your skin with zero blind-buy risk!`;
  }

  // Ensure 2-3 products
  if (matching.length === 0) {
    matching = allProducts.slice(0, 2);
  }

  return {
    reply,
    suggestedProducts: matching.slice(0, 3),
    recommendedDecantSize: decantSize
  };
}
