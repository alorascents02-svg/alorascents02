import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Sparkles, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const GiftingPage: React.FC = () => {
  const { publishedProducts } = useApp();

  const giftBundles = publishedProducts.filter((p) => p.productType === 'gift_bundle');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          ALORA Curation
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#241C2B] tracking-tight">
          Thoughtful Gifting & Bespoke Sets
        </h1>
        <p className="text-sm sm:text-base text-[#211D24]/75 leading-relaxed">
          Fragrance is an intimate gesture of celebration. Every gift set is packaged in our signature House of ALORA luxury presentation packaging with personalized handwritten calligraphy cards.
        </p>
      </div>

      {/* Featured Gifting Products */}
      <div className="space-y-8">
        <h2 className="font-serif text-2xl sm:text-3xl text-[#241C2B]">
          Curated Gift Duos & Sets
        </h2>

        {giftBundles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {giftBundles.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-8 bg-white border border-[#211D24]/10 text-center space-y-2">
            <span className="text-xs text-[#211D24]/70">Holiday sets in compounding staging. Reach out to our concierge for custom combinations.</span>
          </div>
        )}
      </div>

      {/* Bespoke Gifting Service Card */}
      <div className="bg-[#241C2B] text-[#F5F2EE] p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#D68C7C]">
            Corporate & Wedding Scenting
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F2EE] leading-tight">
            Custom Fragrance Favors & Celebrations
          </h3>
          <p className="text-xs sm:text-sm text-[#F5F2EE]/75 leading-relaxed max-w-xl">
            Planning a traditional marriage, wedding in Accra, milestone birthday, or executive corporate gifting suite? We collaborate directly with you to craft bespoke scent pairings and tailored boxes.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#F5F2EE]/70">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#D68C7C]" />
              <span>Personalized wax seals</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#D68C7C]" />
              <span>Volume tier pricing in Cedis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#D68C7C]" />
              <span>Dedicated courier coordination</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-start lg:justify-end">
          <a
            href="https://wa.me/message/5BK5FD4YQXOOB1?text=Hello%20House%20of%20ALORA%2C%20I%20would%20like%20to%20discuss%20custom%20gift%20bundles%20or%20event%20scenting."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#241C2B] bg-[#F5F2EE] hover:bg-white transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#241C2B]" />
            <span>Consult via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
