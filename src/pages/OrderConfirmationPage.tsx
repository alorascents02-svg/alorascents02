import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, MessageCircle, ArrowRight, Package, MapPin, Phone } from 'lucide-react';
import { Order } from '../types';

export const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const order: Order | undefined = (location.state as any)?.order;

  if (!order) {
    return <Navigate to="/order-tracking" replace />;
  }

  const handleWhatsAppShare = () => {
    const message = `Hello House of ALORA! I have just placed order #${order.reference}.
Customer: ${order.customer.fullName}
Total: GH₵ ${order.total.toFixed(2)}
Delivery City: ${order.customer.city}

Please confirm fulfillment and courier dispatch. Thank you!`;

    window.open(`https://wa.me/message/5BK5FD4YQXOOB1?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      {/* Success Badge & Headline */}
      <div className="text-center space-y-4">
        <CheckCircle2 className="w-14 h-14 text-emerald-700 mx-auto" />
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          Order Confirmed
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#241C2B]">
          Thank You, {order.customer.fullName}
        </h1>
        <p className="text-sm text-[#211D24]/75 max-w-md mx-auto">
          Your order has been recorded in our Accra dispatch queue. We have prepared your tracking reference below.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white border border-[#211D24]/10 p-8 space-y-8 shadow-sm">
        {/* Reference & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#211D24]/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#211D24]/60 block">Order Reference</span>
            <span className="font-mono text-2xl font-bold text-[#241C2B] tracking-wider">{order.reference}</span>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs uppercase tracking-wider text-[#211D24]/60 block">Status</span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 uppercase tracking-wide inline-block mt-0.5">
              {order.status} · Payment {order.paymentStatus}
            </span>
          </div>
        </div>

        {/* Itemized List */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl text-[#241C2B]">Itemized Receipt</h2>
          <div className="divide-y divide-[#211D24]/10">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-serif text-base text-[#241C2B] block">{item.product.name}</span>
                  <span className="text-[#211D24]/60 font-mono text-[11px]">{item.selectedSize} · Quantity {item.quantity}</span>
                </div>
                <span className="font-mono font-semibold text-[#241C2B] tabular-nums">
                  GH₵ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Summary */}
          <div className="pt-4 border-t border-[#211D24]/10 space-y-2 text-xs text-[#211D24]/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums">GH₵ {order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-mono tabular-nums">GH₵ {order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-[#211D24]/10 flex justify-between font-serif text-xl text-[#241C2B]">
              <span>Total Amount</span>
              <span className="font-mono font-bold tabular-nums">GH₵ {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Destination */}
        <div className="pt-6 border-t border-[#211D24]/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#211D24]/80">
          <div className="space-y-1">
            <span className="font-semibold text-[#241C2B] uppercase tracking-wider block">Delivery Destination</span>
            <p>{order.customer.address}</p>
            {order.customer.landmark && <p className="text-[#211D24]/60">Landmark: {order.customer.landmark}</p>}
            <p>{order.customer.city}, Ghana</p>
          </div>

          <div className="space-y-1">
            <span className="font-semibold text-[#241C2B] uppercase tracking-wider block">Customer Contact</span>
            <p>{order.customer.fullName}</p>
            <p>{order.customer.phone}</p>
            <p>{order.customer.email}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-[#211D24]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-800" />
            <span>Notify Concierge via WhatsApp</span>
          </button>

          <Link
            to="/order-tracking"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] transition-colors"
          >
            <span>Live Order Tracking</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D68C7C]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
