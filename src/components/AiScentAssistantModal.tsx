import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ShoppingBag, Check, ArrowRight, MessageSquare, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { askScentAssistant } from '../services/aiAssistantService';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ChatEntry {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  suggestedProducts?: Product[];
  recommendedDecantSize?: '5ml' | '10ml' | '15ml';
  timestamp: string;
}

export const AiScentAssistantModal: React.FC = () => {
  const { isAiAssistantOpen, setIsAiAssistantOpen, publishedProducts, addToCart } = useApp();
  const [messages, setMessages] = useState<ChatEntry[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Greetings. I am your Olfactory Concierge at Alora Fragrance House in Accra. How may I guide your fragrance journey today? Tell me about the aura you wish to project, the weather or occasion, or note accords you love. I will match you with our hand-decanted 5ml, 10ml, or 15ml formulations so you can experience them on your skin before committing to a full flacon.",
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAiAssistantOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiAssistantOpen]);

  if (!isAiAssistantOpen) return null;

  const quickPrompts = [
    'Best 5ml decants for sunny days in Accra',
    'Warm vanilla & amber scent for evening dates',
    'Smoked cedarwood and sandalwood formulations',
    'What 3 decants make the best starter discovery set?',
    'Explain the 5ml vs 10ml vs 15ml decant sizes',
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatEntry = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const result = await askScentAssistant(textToSend, publishedProducts);
      const assistantMessage: ChatEntry = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: result.reply,
        suggestedProducts: result.suggestedProducts,
        recommendedDecantSize: result.recommendedDecantSize,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const fallbackMessage: ChatEntry = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: 'I recommend exploring our flagship Velours Nocturne (5ml travel decant) or Bergamot & White Cedar (10ml atomizer). Both are hand-decanted in Accra and formulated for resilient longevity.',
        suggestedProducts: publishedProducts.slice(0, 2),
        recommendedDecantSize: '5ml',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdd = (product: Product, size: string, price: number) => {
    addToCart(product, 1, size, price);
    const key = `${product.id}-${size}`;
    setAddedItemMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [key]: false }));
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      {/* Drawer Container */}
      <div className="w-full max-w-xl h-full bg-[#171512] text-[#FAF9F5] border-l border-[#C59B3F]/30 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#FAF9F5]/10 bg-[#121110] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C59B3F]/20 border border-[#C59B3F]/40 flex items-center justify-center text-[#C59B3F]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg text-[#FAF9F5] tracking-wide">
                  Alora Olfactory Concierge
                </h3>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-[#FAF9F5]/60 font-sans">
                AI Scent Assistant · Artisanal Decant Advisor
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAiAssistantOpen(false)}
            className="p-2 text-[#FAF9F5]/60 hover:text-white transition-colors"
            title="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Promo Code Notification */}
        <div className="bg-[#C59B3F]/15 border-b border-[#C59B3F]/30 px-4 py-2 flex items-center justify-between text-xs text-[#FAF9F5]">
          <span className="flex items-center gap-1.5 text-[11px]">
            <span className="text-[#C59B3F] font-semibold">WELCOME10</span>
            <span className="text-[#FAF9F5]/80">· Enjoy 10% off your recommended decants</span>
          </span>
          <span className="text-[10px] text-[#C59B3F] font-mono uppercase">Accra Dispatch</span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
            >
              <div
                className={`max-w-[90%] p-3.5 sm:p-4 leading-relaxed font-light ${
                  m.sender === 'user'
                    ? 'bg-[#C59B3F] text-[#171512] font-normal shadow-md'
                    : 'bg-[#211F1C] text-[#FAF9F5] border border-[#FAF9F5]/10 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line text-xs sm:text-[13px] leading-relaxed">
                  {m.text}
                </div>
                <div
                  className={`text-[10px] mt-2 font-mono ${
                    m.sender === 'user' ? 'text-[#171512]/60' : 'text-[#FAF9F5]/40'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {/* Product recommendation cards inside the stream */}
              {m.suggestedProducts && m.suggestedProducts.length > 0 && (
                <div className="w-full space-y-2.5 pt-1 pl-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C59B3F] font-semibold block">
                    Curated Olfactory Matches:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {m.suggestedProducts.map((p) => {
                      // Determine the primary decant option
                      const targetSize = m.recommendedDecantSize || '5ml';
                      const matchingDecant = p.decantOptions?.find((d) => d.size.includes(targetSize)) ||
                        p.decantOptions?.[0] || { size: p.size, price: p.price };
                      const isAdded = addedItemMap[`${p.id}-${matchingDecant.size}`];

                      return (
                        <div
                          key={p.id}
                          className="p-3 bg-[#1D1B18] border border-[#C59B3F]/25 flex flex-col justify-between gap-3 text-left hover:border-[#C59B3F]/60 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 bg-[#2A2621] shrink-0 overflow-hidden border border-[#FAF9F5]/10">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] uppercase tracking-wider text-[#C59B3F] block truncate">
                                {p.fragranceFamily}
                              </span>
                              <h4 className="font-serif text-sm text-[#FAF9F5] truncate">
                                {p.name}
                              </h4>
                              <span className="text-[11px] font-mono text-[#FAF9F5]/70 block mt-0.5">
                                {matchingDecant.size} · GH₵ {matchingDecant.price}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-[#FAF9F5]/10">
                            <button
                              type="button"
                              onClick={() => handleQuickAdd(p, matchingDecant.size, matchingDecant.price)}
                              className={`flex-1 py-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                                isAdded
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#C59B3F] text-[#171512] hover:bg-[#FAF9F5]'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-3.5 h-3.5" />
                                  <span>Add {targetSize} Decant</span>
                                </>
                              )}
                            </button>
                            <Link
                              to={`/shop/${p.slug}`}
                              onClick={() => setIsAiAssistantOpen(false)}
                              className="p-1.5 text-[#FAF9F5]/60 hover:text-white"
                              title="View Details"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#C59B3F] p-3 bg-[#211F1C] border border-[#FAF9F5]/10 max-w-xs">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing fragrance notes and weather longevity...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Suggestions */}
        <div className="p-3 bg-[#121110] border-t border-[#FAF9F5]/10">
          <div className="text-[10px] uppercase tracking-wider text-[#FAF9F5]/45 mb-2 font-medium">
            Frequently Explored Consultations:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 text-[11px] bg-[#211F1C] hover:bg-[#C59B3F]/20 text-[#FAF9F5]/80 hover:text-[#C59B3F] border border-[#FAF9F5]/10 hover:border-[#C59B3F]/40 transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-[#121110] border-t border-[#FAF9F5]/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about scents, decant sizes, notes, or Accra weather..."
              className="flex-1 px-4 py-3 text-xs bg-[#211F1C] text-[#FAF9F5] border border-[#FAF9F5]/15 focus:outline-none focus:border-[#C59B3F] placeholder-[#FAF9F5]/40"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-3 bg-[#C59B3F] text-[#171512] hover:bg-[#FAF9F5] disabled:opacity-40 transition-colors shrink-0"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-[#FAF9F5]/45 text-center mt-2 flex items-center justify-center gap-2">
            <span>Hand-decanted in Accra</span>
            <span>·</span>
            <span>Grounded in Alora fragrance catalog</span>
          </div>
        </div>
      </div>
    </div>
  );
};
