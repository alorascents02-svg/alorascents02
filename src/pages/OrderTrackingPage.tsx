import React, { useState } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, MapPin, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { findOrder, orders } = useApp();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [matchedOrder, setMatchedOrder] = useState<Order | undefined>(undefined);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    const result = findOrder(query);
    setMatchedOrder(result);
  };

  const steps = [
    { key: 'confirmed', label: 'Order Confirmed', desc: 'Received in Accra dispatch queue' },
    { key: 'processing', label: 'Bottle Quality Check', desc: 'Compounding batch & tamper seal verified' },
    { key: 'dispatched', label: 'Dispatched with Courier', desc: 'In transit to delivery destination' },
    { key: 'delivered', label: 'Delivered Safely', desc: 'Delivered to customer' },
  ];

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'confirmed': return 0;
      case 'processing': return 1;
      case 'dispatched': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          Dispatch Logistics
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#241C2B]">
          Track Your Fragrance Order
        </h1>
        <p className="text-xs sm:text-sm text-[#211D24]/75 max-w-md mx-auto">
          Enter your ALORA order reference (e.g. ALO-2026-XXXX) to check real-time courier fulfillment status across Ghana.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto bg-white border border-[#211D24]/15 p-2 flex gap-2 shadow-sm">
        <input
          type="text"
          placeholder="Enter order reference (e.g. ALO-2026-...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2.5 text-xs bg-transparent focus:outline-none text-[#211D24] uppercase font-mono"
        />
        <button
          type="submit"
          className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] transition-colors flex items-center gap-1.5"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Track</span>
        </button>
      </form>

      {/* Recent Orders quick chip selector if available */}
      {orders.length > 0 && !matchedOrder && (
        <div className="text-center text-xs text-[#211D24]/60 space-y-2">
          <span>Recent orders in your browser:</span>
          <div className="flex flex-wrap justify-center gap-2">
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setQuery(o.reference);
                  setSearched(true);
                  setMatchedOrder(o);
                }}
                className="font-mono text-[11px] underline text-[#241C2B] hover:text-[#D68C7C]"
              >
                {o.reference}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Matched Order Result */}
      {matchedOrder ? (
        <div className="bg-white border border-[#211D24]/10 p-8 space-y-8 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#211D24]/10 pb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#211D24]/60 block">Tracking Reference</span>
              <span className="font-mono text-2xl font-bold text-[#241C2B]">{matchedOrder.reference}</span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs uppercase tracking-wider text-[#211D24]/60 block">Delivery Method</span>
              <span className="text-xs font-semibold text-[#241C2B] capitalize">
                {matchedOrder.deliveryMethod.replace('_', ' ')} · {matchedOrder.customer.city}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl text-[#241C2B]">Fulfillment Milestones</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {steps.map((st, idx) => {
                const activeIndex = getStepIndex(matchedOrder.status);
                const isPassed = idx <= activeIndex;
                const isCurrent = idx === activeIndex;

                return (
                  <div
                    key={st.key}
                    className={`p-4 border transition-colors ${
                      isCurrent
                        ? 'border-[#241C2B] bg-[#FAF8F5]'
                        : isPassed
                        ? 'border-emerald-200 bg-emerald-50/40'
                        : 'border-[#211D24]/10 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Clock className="w-4 h-4 text-[#211D24]/40" />
                      )}
                      <span className="text-[11px] font-mono text-[#211D24]/60">0{idx + 1}</span>
                    </div>
                    <span className="text-xs font-semibold text-[#241C2B] block">{st.label}</span>
                    <span className="text-[11px] text-[#211D24]/60 mt-1 block leading-relaxed">{st.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Package Details */}
          <div className="pt-4 border-t border-[#211D24]/10 space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#241C2B] block">Package Contents</span>
            <div className="divide-y divide-[#211D24]/10 text-xs text-[#211D24]/80">
              {matchedOrder.items.map((it, idx) => (
                <div key={idx} className="py-2.5 flex justify-between">
                  <span>{it.product.name} ({it.selectedSize}) × {it.quantity}</span>
                  <span className="font-mono tabular-nums">GH₵ {(it.product.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : searched ? (
        <div className="text-center py-12 space-y-3 bg-white border border-[#211D24]/10 p-6 max-w-md mx-auto">
          <AlertCircle className="w-8 h-8 text-[#D68C7C] mx-auto" />
          <h3 className="font-serif text-xl text-[#241C2B]">No Order Found</h3>
          <p className="text-xs text-[#211D24]/70">
            We could not find an order matching &quot;{query}&quot;. Please verify the reference code or connect with our WhatsApp concierge.
          </p>
        </div>
      ) : null}
    </div>
  );
};
