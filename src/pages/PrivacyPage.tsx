import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3 border-b border-[#211D24]/10 pb-8">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          Legal & Trust
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#241C2B] tracking-tight">
          Privacy & Data Consent
        </h1>
        <p className="text-sm sm:text-base text-[#211D24]/75">
          How Alora Fragrance House collects, protects, and handles your fragrance discovery preferences.
        </p>
      </div>

      <div className="bg-white border border-[#211D24]/10 p-8 space-y-6 text-xs sm:text-sm text-[#211D24]/80 leading-relaxed">
        <div className="space-y-2">
          <h2 className="font-serif text-xl text-[#241C2B]">1. Fragrance Quiz & Saved Preferences</h2>
          <p>
            When you complete our 8-step fragrance quiz, your olfactory preferences (such as preferred notes, scent families, and budget ceiling) are saved locally on your device only when you grant explicit consent. You can clear or modify these preferences at any time in your Customer Account settings.
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-[#211D24]/10">
          <h2 className="font-serif text-xl text-[#241C2B]">2. Order & Payment Information</h2>
          <p>
            We collect your full name, phone number, and physical address strictly to facilitate delivery with Ghanaian courier partners. We do not store sensitive payment card details or Mobile Money PINs on our servers. All transactions use verified payment gateway adapters.
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-[#211D24]/10">
          <h2 className="font-serif text-xl text-[#241C2B]">3. Ghana Data Protection Act Compliance</h2>
          <p>
            Alora Fragrance House adheres to the standards of the Ghana Data Protection Act, 2012 (Act 843). We never sell, rent, or trade customer contact details with external advertising brokers.
          </p>
        </div>
      </div>
    </div>
  );
};
