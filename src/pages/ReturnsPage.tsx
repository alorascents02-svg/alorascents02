import React from 'react';
import { ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

export const ReturnsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-3 border-b border-[#211D24]/10 pb-8">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          Product Integrity
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#241C2B] tracking-tight">
          Returns & Hygiene Policy
        </h1>
        <p className="text-sm sm:text-base text-[#211D24]/75">
          Cosmetic health standards and consumer protection guidelines for fragrance purchases in Ghana.
        </p>
      </div>

      <div className="bg-white border border-[#211D24]/10 p-8 space-y-6 text-xs sm:text-sm text-[#211D24]/80 leading-relaxed">
        <div className="space-y-2">
          <h2 className="font-serif text-2xl text-[#241C2B]">Hygienic Standards for Fragrance Products</h2>
          <p>
            Due to cosmetic safety regulations, skin-contact items such as perfumes, body splashes, and rollerball oils cannot be restocked or resold once their protective cellophane or tamper-evident seal has been broken.
          </p>
          <p>
            We enforce this policy strictly to ensure every ALORA client receives a pristine, untouched product direct from our compounding facility.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#211D24]/10">
          <h3 className="font-serif text-xl text-[#241C2B]">Eligible Returns (Within 48 Hours)</h3>
          <p>Returns or replacements are accepted under the following conditions:</p>
          <ul className="space-y-2 pl-4 list-disc">
            <li>The item was damaged in courier transit (e.g., fractured glass or broken nozzle).</li>
            <li>The wrong fragrance or size was dispatched due to an internal fulfillment error.</li>
            <li>The package remains entirely unopened with its original security seal intact.</li>
          </ul>
        </div>

        <div className="space-y-2 pt-4 border-t border-[#211D24]/10">
          <h3 className="font-serif text-xl text-[#241C2B]">How to Initiate a Claim</h3>
          <p>
            Contact our Accra concierge via WhatsApp (<a href="https://wa.me/message/5BK5FD4YQXOOB1" target="_blank" rel="noopener noreferrer" className="underline font-semibold">House of ALORA WhatsApp</a>) or email concierge@aloraperfumery.com with your order reference (e.g. ALO-2026-XXXX) and photo evidence of the issue within 48 hours of delivery.
          </p>
        </div>
      </div>
    </div>
  );
};
