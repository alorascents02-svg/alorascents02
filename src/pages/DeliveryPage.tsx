import React from 'react';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

export const DeliveryPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-3 border-b border-[#211D24]/10 pb-8">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          Fulfillment Guidelines
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#241C2B] tracking-tight">
          Delivery & Shipping in Ghana
        </h1>
        <p className="text-sm sm:text-base text-[#211D24]/75">
          Clear, reliable delivery commitments for Greater Accra and regional Ghanaian destinations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-[#211D24]/10 space-y-3">
          <div className="font-mono text-xs font-bold text-[#D68C7C]">GH₵ 30.00</div>
          <h3 className="font-serif text-xl text-[#241C2B]">Greater Accra Standard</h3>
          <p className="text-xs text-[#211D24]/70 leading-relaxed">
            Dispatch takes 24 to 48 hours to all residential and corporate addresses across Accra, Tema, Spintex, East Legon, and surrounding areas.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#211D24]/10 space-y-3">
          <div className="font-mono text-xs font-bold text-[#D68C7C]">GH₵ 50.00</div>
          <h3 className="font-serif text-xl text-[#241C2B]">Accra Express Same-Day</h3>
          <p className="text-xs text-[#211D24]/70 leading-relaxed">
            Orders confirmed before 2:00 PM are delivered directly via dedicated courier within 4 hours.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#211D24]/10 space-y-3">
          <div className="font-mono text-xs font-bold text-[#D68C7C]">GH₵ 60.00</div>
          <h3 className="font-serif text-xl text-[#241C2B]">Nationwide Regional Courier</h3>
          <p className="text-xs text-[#211D24]/70 leading-relaxed">
            Dispatched to Kumasi, Takoradi, Cape Coast, Sunyani, Tamale, and all regional hubs across Ghana via VIP, OA, and EMS (2–3 business days).
          </p>
        </div>
      </div>

      <div className="bg-[#FAF8F5] border border-[#211D24]/10 p-8 space-y-4 text-xs sm:text-sm text-[#211D24]/80 leading-relaxed">
        <h3 className="font-serif text-2xl text-[#241C2B]">Packaging & Tamper-Evident Seals</h3>
        <p>
          Every fragrance flacon is inspected for spray mechanism integrity and fitted with an official tamper-evident security seal before leaving our studio. Bottles are nested in shock-absorbent cushioning designed to withstand West African road transit.
        </p>
        <p>
          If your package arrives with an invalidated seal or transit damage, please notify our team within 24 hours of delivery.
        </p>
      </div>
    </div>
  );
};
