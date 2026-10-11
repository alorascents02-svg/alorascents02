import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, cartSubtotal, featureFlags } = useApp();
  const navigate = useNavigate();

  const handleWhatsAppCartOrder = () => {
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (${item.selectedSize}) x${item.quantity} — GH₵ ${(
            item.product.price * item.quantity
          ).toFixed(2)}`
      )
      .join('\n');

    const message = `Hello House of ALORA! I would like to order my shopping bag items:\n\n${itemsList}\n\n• Subtotal: GH₵ ${cartSubtotal.toFixed(
      2
    )}\n\nPlease let me know delivery fee and payment details for my location in Ghana.`;

    window.open(`https://wa.me/message/5BK5FD4YQXOOB1?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-[#211D24]/10 pb-6 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
            Your Bag
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#241C2B]">
            Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
          </h1>
        </div>
        <Link
          to="/shop"
          className="text-xs font-semibold uppercase tracking-wider text-[#211D24]/70 hover:text-[#241C2B] hidden sm:flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Exploring</span>
        </Link>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="p-5 bg-white border border-[#211D24]/10 flex gap-5 items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#EAE6DF] shrink-0 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-wider text-[#211D24]/60 block">
                      {item.product.brand} · {item.product.fragranceFamily}
                    </span>
                    <Link
                      to={`/shop/${item.product.slug}`}
                      className="font-serif text-lg text-[#241C2B] hover:text-[#D68C7C]"
                    >
                      {item.product.name}
                    </Link>
                    <div className="text-xs text-[#211D24]/60 font-mono">
                      {item.selectedSize}
                    </div>
                    <div className="font-mono text-xs font-bold text-[#241C2B] tabular-nums sm:hidden">
                      GH₵ {((item.selectedPrice ?? item.product.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#211D24]/20 bg-white">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.product.id, item.selectedSize, -1)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#241C2B] hover:bg-[#F5F2EE]"
                    >
                      -
                    </button>
                    <span className="px-2.5 py-1 text-xs font-mono font-bold text-[#241C2B] tabular-nums min-w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.product.id, item.selectedSize, 1)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#241C2B] hover:bg-[#F5F2EE]"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="font-mono text-sm font-semibold text-[#241C2B] tabular-nums hidden sm:block min-w-20 text-right">
                    GH₵ {((item.selectedPrice ?? item.product.price) * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                    className="p-1.5 text-[#211D24]/40 hover:text-red-700"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-5 bg-white border border-[#211D24]/10 p-6 space-y-6">
            <h3 className="font-serif text-xl text-[#241C2B] border-b border-[#211D24]/10 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-[#211D24]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-[#241C2B] tabular-nums">
                  GH₵ {cartSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ghana Delivery</span>
                <span className="text-[#211D24]/60">Calculated at checkout</span>
              </div>
              <div className="border-t border-[#211D24]/10 pt-3 flex justify-between font-serif text-lg text-[#241C2B]">
                <span>Estimated Total</span>
                <span className="font-mono font-bold text-xl tabular-nums">
                  GH₵ {cartSubtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {featureFlags.onlineCheckout ? (
                <button
                  type="button"
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#D68C7C]" />
                </button>
              ) : (
                <div className="p-3 bg-amber-50 text-amber-900 text-xs border border-amber-200">
                  Online card gateway is currently paused for relaunch staging. Please use our official WhatsApp ordering below.
                </div>
              )}

              {/* WhatsApp Assisted Checkout */}
              {featureFlags.whatsAppOrdering && (
                <button
                  type="button"
                  onClick={handleWhatsAppCartOrder}
                  className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-800" />
                  <span>Order Bag via WhatsApp</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-[#211D24]/60 text-center leading-relaxed">
              Dispatched with tamper-evident seal. Payments processed with verified confirmation.
            </p>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-white border border-[#211D24]/10 p-8">
          <ShoppingBag className="w-10 h-10 text-[#211D24]/30 mx-auto" />
          <h2 className="font-serif text-3xl text-[#241C2B]">Your Bag is Empty</h2>
          <p className="text-xs text-[#211D24]/70 max-w-sm mx-auto">
            You haven’t added any fragrances to your shopping bag yet. Explore our curated formulations or take the scent quiz.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/shop"
              className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#F5F2EE] bg-[#241C2B]"
            >
              Explore Catalogue
            </Link>
            <Link
              to="/find-your-scent"
              className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#241C2B] border border-[#241C2B]/30"
            >
              Take Scent Quiz
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
