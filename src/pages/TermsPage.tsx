import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3 border-b border-[#211D24]/10 pb-8">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          Legal Framework
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#241C2B] tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-[#211D24]/75">
          General terms governing fragrance orders, pricing transparency, and operational conditions in Ghana.
        </p>
      </div>

      <div className="bg-white border border-[#211D24]/10 p-8 space-y-6 text-xs sm:text-sm text-[#211D24]/80 leading-relaxed">
        <div className="space-y-2">
          <h2 className="font-serif text-xl text-[#241C2B]">1. Commercial Scope & Market Operation</h2>
          <p>
            Alora Fragrance House operates within the Republic of Ghana. All prices are stated in Ghanaian Cedis (GH₵) and include applicable commercial retail taxes.
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-[#211D24]/10">
          <h2 className="font-serif text-xl text-[#241C2B]">2. Product Identity & Olfactory Verification</h2>
          <p>
            Every published product displays its verified olfactory pyramid (Top, Heart, and Base notes). Only items with active inventory and publication approval are eligible for commercial dispatch.
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-[#211D24]/10">
          <h2 className="font-serif text-xl text-[#241C2B]">3. Authentic Decanting Guarantee</h2>
          <p>
            All fragrance decants offered by Alora Fragrance House are hand-drawn with sterile glass pipettes directly from 100% genuine, original fragrance flacons into new, sterile glass atomizers with fine gold spray nozzles. We never dilute, compound, or alter genuine perfumes.
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-[#211D24]/10">
          <h2 className="font-serif text-xl text-[#241C2B]">4. Orders & Payment Confirmations</h2>
          <p>
            No order is confirmed until verified server-side payment confirmation or authorized WhatsApp concierge verification is issued. Browser redirects do not constitute proof of payment.
          </p>
        </div>
      </div>
    </div>
  );
};
