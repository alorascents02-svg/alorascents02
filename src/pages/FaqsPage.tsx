import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: 'delivery' | 'products' | 'payment';
}

const FAQS_LIST: FaqItem[] = [
  {
    category: 'delivery',
    q: 'How fast is delivery within Accra and across Ghana?',
    a: 'Within Greater Accra, we offer same-day express delivery for orders placed before 2:00 PM, and standard next-day courier delivery (24–48 hours). For regional deliveries to Kumasi, Takoradi, Cape Coast, Koforidua, and Tamale, parcels are dispatched via trusted courier networks (OA, VIP, EMS) and arrive within 2 to 3 business days.'
  },
  {
    category: 'delivery',
    q: 'What are the delivery fees in Ghanaian Cedis?',
    a: 'Greater Accra standard courier is GH₵ 30. Express same-day delivery in Accra is GH₵ 50. Regional courier dispatch across Ghana is GH₵ 60. Studio pickup at our East Legon House of ALORA studio is completely free.'
  },
  {
    category: 'payment',
    q: 'Which payment methods do you accept?',
    a: 'We accept Ghanaian Mobile Money (MTN MoMo, Telecel Cash, AT Money), major bank debit/credit cards (Visa & Mastercard), and direct assisted payment through our verified WhatsApp concierge line.'
  },
  {
    category: 'payment',
    q: 'Can I place an order directly on WhatsApp instead of the website?',
    a: 'Yes, absolutely. WhatsApp ordering is fully integrated into House of ALORA. You can click "Instant Inquiry on WhatsApp" on any fragrance or export your entire shopping bag directly into a pre-filled WhatsApp message to our verified concierge line.'
  },
  {
    category: 'products',
    q: 'How do ALORA fragrances perform in tropical heat and humidity?',
    a: 'Our fragrances are formulated specifically with higher compound oil concentrations and tenacious base fixatives (aged cedarwood, warm amber, Bourbon vanilla, and Haitian vetiver). This molecular anchoring ensures that our perfumes remain active on skin for 7 to 10+ hours rather than evaporating quickly in Accra’s humidity.'
  },
  {
    category: 'products',
    q: 'Are your formulations skin-safe and IFRA compliant?',
    a: 'Yes. All formulations follow strict IFRA (International Fragrance Association) safety standards. Our perfume oils and sprays are dermatologist-tested and formulated to be non-staining and gentle on pulse points.'
  },
  {
    category: 'products',
    q: 'Do you sell perfume decants or samples?',
    a: 'In accordance with Ghanaian cosmetic repackaging regulations and ALORA operating standards, selected decants are conditional and held in prelaunch staging. They are not enabled for commercial sale without explicit regulatory verification. Full-size bottles and official gift bundles are available.'
  },
  {
    category: 'products',
    q: 'How should I store my perfumes in Ghana to preserve longevity?',
    a: 'Keep your bottles away from direct tropical sunlight and extreme bathroom steam. Store them in a cool, shaded drawer, closet, or in their original ALORA presentation boxes at ambient room temperature.'
  }
];

export const FaqsPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'delivery' | 'products' | 'payment'>('all');

  const filteredFaqs = FAQS_LIST.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-[#211D24]/10 pb-8 text-center max-w-2xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          Client Support
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#241C2B] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#211D24]/75">
          Everything you need to know regarding delivery across Ghana, Mobile Money payments, perfume care, and formulation standards.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'delivery', label: 'Ghana Delivery' },
          { id: 'products', label: 'Fragrance & Longevity' },
          { id: 'payment', label: 'Payments & WhatsApp' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setSelectedCategory(tab.id as any);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              selectedCategory === tab.id
                ? 'bg-[#241C2B] text-[#F5F2EE]'
                : 'bg-white text-[#211D24] border border-[#211D24]/15 hover:border-[#241C2B]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="bg-white border border-[#211D24]/10 divide-y divide-[#211D24]/10">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="transition-colors">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5]/60 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-serif text-lg sm:text-xl text-[#241C2B] leading-snug">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#241C2B]/60 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#241C2B]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#211D24]/80 leading-relaxed border-t border-[#211D24]/5">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* WhatsApp Help Box */}
      <div className="bg-[#FAF8F5] border border-[#211D24]/10 p-8 text-center space-y-4">
        <h3 className="font-serif text-2xl text-[#241C2B]">Have a Specific Question?</h3>
        <p className="text-xs text-[#211D24]/70 max-w-md mx-auto">
          Our Accra concierge is ready to assist with custom recommendations, stock availability, or express delivery instructions.
        </p>
        <a
          href="https://wa.me/message/5BK5FD4YQXOOB1?text=Hello%20House%20of%20ALORA%2C%20I%20have%20a%20question%20regarding%20an%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300"
        >
          <MessageCircle className="w-4 h-4 text-emerald-800" />
          <span>Chat with Concierge</span>
        </a>
      </div>
    </div>
  );
};
