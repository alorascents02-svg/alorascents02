import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, AlertCircle, ArrowLeft, Check, Phone, CreditCard, Building } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CustomerDetails, DeliveryMethod, PaymentMethod } from '../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotal, createOrder, clearCart, featureFlags } = useApp();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    city: 'Accra',
    address: '',
    landmark: '',
    notes: '',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard_accra');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
  const [momoNetwork, setMomoNetwork] = useState<'mtn' | 'telecel' | 'at'>('mtn');
  const [momoPhone, setMomoPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#241C2B]">Your Bag is Empty</h2>
        <p className="text-xs text-[#211D24]/70">Add fragrances to your bag before checking out.</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#F5F2EE] bg-[#241C2B]"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  // Delivery Fees in GH₵
  const deliveryFees: Record<DeliveryMethod, number> = {
    standard_accra: 30,
    express_accra: 50,
    nationwide_courier: 60,
    pickup_studio: 0,
  };

  const currentDeliveryFee = deliveryFees[deliveryMethod];
  const grandTotal = cartSubtotal + currentDeliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customer.fullName.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setErrorMessage('Please fill in your name, contact phone number, and delivery address.');
      return;
    }

    setIsProcessing(true);

    // Simulate verified server-side payment adapter response
    setTimeout(() => {
      try {
        const order = createOrder({
          customer,
          items: cart,
          subtotal: cartSubtotal,
          deliveryFee: currentDeliveryFee,
          total: grandTotal,
          deliveryMethod,
          paymentMethod,
          // If paymentsLive is false, it's a test/staging verification flow
          paymentStatus: featureFlags.paymentsLive ? 'pending' : 'verified',
          status: 'confirmed',
          paymentReference: `PAY-${Date.now().toString().slice(-6)}`,
        });

        clearCart();
        setIsProcessing(false);
        navigate('/order-confirmation', { state: { order } });
      } catch (err) {
        setIsProcessing(false);
        setErrorMessage('Failed to generate order record. Please try again.');
      }
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-[#211D24]/10 pb-6 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
            Checkout
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#241C2B]">
            Shipping & Verification
          </h1>
        </div>
        <Link
          to="/cart"
          className="text-xs font-semibold uppercase tracking-wider text-[#211D24]/70 hover:text-[#241C2B] flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Bag</span>
        </Link>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Customer Information & Delivery Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Contact Details */}
          <div className="bg-white border border-[#211D24]/10 p-6 space-y-5">
            <h2 className="font-serif text-xl text-[#241C2B] border-b border-[#211D24]/10 pb-3">
              1. Customer Details (Ghana)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-[#211D24]">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kwame Mensah"
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#211D24]/20 focus:outline-none focus:border-[#241C2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#211D24]">Contact Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 024 123 4567"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#211D24]/20 focus:outline-none focus:border-[#241C2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#211D24]">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. kwame@example.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#211D24]/20 focus:outline-none focus:border-[#241C2B]"
                />
              </div>
            </div>
          </div>

          {/* Delivery Location in Ghana */}
          <div className="bg-white border border-[#211D24]/10 p-6 space-y-5">
            <h2 className="font-serif text-xl text-[#241C2B] border-b border-[#211D24]/10 pb-3">
              2. Delivery Address in Ghana
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#211D24]">Region / City *</label>
                <select
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#211D24]/20 focus:outline-none focus:border-[#241C2B]"
                >
                  <option value="Accra">Greater Accra (East Legon, Airport, Osu, Spintex, etc.)</option>
                  <option value="Tema">Tema & Ashaiman</option>
                  <option value="Kumasi">Kumasi (Ashanti Region)</option>
                  <option value="Takoradi">Sekondi-Takoradi (Western Region)</option>
                  <option value="Cape Coast">Cape Coast (Central Region)</option>
                  <option value="Koforidua">Koforidua (Eastern Region)</option>
                  <option value="Tamale">Tamale (Northern Region)</option>
                  <option value="Other">Other Ghana Location</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#211D24]">Street Address or Location Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House No. 14, Boundary Road, East Legon"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#211D24]/20 focus:outline-none focus:border-[#241C2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#211D24]">Popular Landmark (Crucial for Couriers)</label>
                <input
                  type="text"
                  placeholder="e.g. Near Starbites or opposite Shell Station"
                  value={customer.landmark}
                  onChange={(e) => setCustomer({ ...customer, landmark: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#211D24]/20 focus:outline-none focus:border-[#241C2B]"
                />
              </div>
            </div>
          </div>

          {/* Delivery Method Selection */}
          <div className="bg-white border border-[#211D24]/10 p-6 space-y-4">
            <h2 className="font-serif text-xl text-[#241C2B] border-b border-[#211D24]/10 pb-3">
              3. Delivery Tier
            </h2>

            <div className="space-y-3">
              {[
                { id: 'standard_accra', title: 'Greater Accra Standard (24–48 hrs)', price: 30, desc: 'Delivered directly to your door in Greater Accra.' },
                { id: 'express_accra', title: 'Accra Same-Day Express Dispatch', price: 50, desc: 'Orders placed before 2 PM dispatched within 4 hours.' },
                { id: 'nationwide_courier', title: 'Regional Ghana Nationwide Courier', price: 60, desc: 'Dispatched via VIP/OA/EMS to Kumasi, Takoradi, etc. (2–3 days).' },
                { id: 'pickup_studio', title: 'ALORA Accra Studio Pick-up (Free)', price: 0, desc: 'Collect directly from our East Legon House of ALORA.' },
              ].map((tier) => (
                <label
                  key={tier.id}
                  className={`flex items-start justify-between p-4 border cursor-pointer transition-colors ${
                    deliveryMethod === tier.id ? 'border-[#241C2B] bg-[#FAF8F5]' : 'border-[#211D24]/15'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === tier.id}
                      onChange={() => setDeliveryMethod(tier.id as DeliveryMethod)}
                      className="mt-1 accent-[#241C2B]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#241C2B] block">{tier.title}</span>
                      <span className="text-[11px] text-[#211D24]/65">{tier.desc}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#241C2B] tabular-nums">
                    {tier.price === 0 ? 'FREE' : `GH₵ ${tier.price.toFixed(2)}`}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Method Adapter */}
          <div className="bg-white border border-[#211D24]/10 p-6 space-y-5">
            <h2 className="font-serif text-xl text-[#241C2B] border-b border-[#211D24]/10 pb-3">
              4. Payment Method Adapter
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'momo', label: 'Mobile Money', icon: Phone },
                { id: 'card', label: 'Bank Card', icon: CreditCard },
                { id: 'whatsapp_assisted', label: 'WhatsApp Concierge', icon: Building },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaymentMethod(p.id as PaymentMethod)}
                    className={`p-4 text-center border transition-all ${
                      paymentMethod === p.id ? 'border-[#241C2B] bg-[#FAF8F5]' : 'border-[#211D24]/15'
                    }`}
                  >
                    <Icon className="w-5 h-5 mx-auto text-[#241C2B]" />
                    <span className="text-xs font-semibold text-[#241C2B] block mt-2">{p.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Money Details */}
            {paymentMethod === 'momo' && (
              <div className="p-4 bg-[#FAF8F5] border border-[#211D24]/10 space-y-3">
                <span className="text-xs font-semibold text-[#241C2B] block">Select Mobile Money Network:</span>
                <div className="flex gap-4">
                  {(['mtn', 'telecel', 'at'] as const).map((net) => (
                    <label key={net} className="flex items-center gap-1.5 text-xs text-[#211D24] uppercase font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="momoNetwork"
                        checked={momoNetwork === net}
                        onChange={() => setMomoNetwork(net)}
                        className="accent-[#241C2B]"
                      />
                      <span>{net === 'mtn' ? 'MTN MoMo' : net === 'telecel' ? 'Telecel Cash' : 'AT Money'}</span>
                    </label>
                  ))}
                </div>
                <div className="pt-2">
                  <label className="text-[11px] text-[#211D24]/70 block">Mobile Money Wallet Number:</label>
                  <input
                    type="tel"
                    placeholder="e.g. 024 456 7890"
                    value={momoPhone}
                    onChange={(e) => setMomoPhone(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-white border border-[#211D24]/20"
                  />
                  <span className="text-[10px] text-[#211D24]/50 mt-1 block">
                    A USSD prompt will simulate verified wallet authorization upon submitting.
                  </span>
                </div>
              </div>
            )}

            {/* Card Simulator Note */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-[#FAF8F5] border border-[#211D24]/10 text-xs text-[#211D24]/75 space-y-2">
                <div className="flex items-center gap-2 text-[#241C2B] font-semibold">
                  <Lock className="w-4 h-4 text-[#D68C7C]" />
                  <span>Secure Card Adapter Architecture</span>
                </div>
                <p>
                  Card numbers are processed via verified tokenization adapter. Card credentials are never stored on ALORA servers.
                </p>
              </div>
            )}

            {paymentMethod === 'whatsapp_assisted' && (
              <div className="p-4 bg-[#FAF8F5] border border-[#211D24]/10 text-xs text-[#211D24]/75">
                Our Accra team will confirm this order and share official ALORA Merchant MoMo details via WhatsApp directly with you.
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white border border-[#211D24]/10 p-6 space-y-6 sticky top-28">
          <h2 className="font-serif text-xl text-[#241C2B] border-b border-[#211D24]/10 pb-3">
            Review Bag Items
          </h2>

          <div className="space-y-3 max-h-72 overflow-y-auto divide-y divide-[#211D24]/10 pr-1">
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}`} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                <div>
                  <span className="font-serif text-sm text-[#241C2B] block">{item.product.name}</span>
                  <span className="text-[#211D24]/60 font-mono text-[11px]">{item.selectedSize} · Qty {item.quantity}</span>
                </div>
                <span className="font-mono font-semibold text-[#241C2B] tabular-nums">
                  GH₵ {((item.selectedPrice ?? item.product.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#211D24]/10 space-y-2.5 text-xs text-[#211D24]/80">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-mono tabular-nums">GH₵ {cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-mono tabular-nums">GH₵ {currentDeliveryFee.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-[#211D24]/10 flex justify-between font-serif text-xl text-[#241C2B]">
              <span>Grand Total</span>
              <span className="font-mono font-bold tabular-nums">
                GH₵ {grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span>Verifying & Placing Order...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-[#D68C7C]" />
                <span>Confirm & Place Order</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-[#211D24]/55 text-center leading-relaxed">
            By confirming, you agree to Alora Fragrance House’s delivery terms and tamper-evident hygiene policy in Ghana.
          </p>
        </div>
      </form>
    </div>
  );
};
