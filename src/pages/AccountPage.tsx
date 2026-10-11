import React from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, Sliders, Package, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AccountPage: React.FC = () => {
  const { orders, wishlist, userPreferences, publishedProducts } = useApp();

  const savedFavorites = publishedProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Account Header */}
      <div className="border-b border-[#211D24]/10 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
            Client Profile
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#241C2B]">
            ALORA Customer Account
          </h1>
          <p className="text-xs sm:text-sm text-[#211D24]/70">
            Manage your orders, saved fragrance preferences, and curated wishlist.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/account/preferences"
            className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#241C2B] border border-[#241C2B]/30 hover:border-[#241C2B]"
          >
            Scent Preferences
          </Link>
          <Link
            to="/account/wishlist"
            className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B]"
          >
            Wishlist ({wishlist.length})
          </Link>
        </div>
      </div>

      {/* Account Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-[#211D24]/10 space-y-2">
          <span className="text-xs uppercase tracking-wider text-[#211D24]/60 block">Saved Preferences</span>
          <div className="font-serif text-2xl text-[#241C2B]">
            {userPreferences.consentGranted ? 'Profile Active' : 'Not Set'}
          </div>
          <p className="text-xs text-[#211D24]/70">
            {userPreferences.favoriteFamilies.length > 0
              ? `${userPreferences.favoriteFamilies.join(', ')}`
              : 'Complete quiz to save preferences'}
          </p>
          <Link to="/account/preferences" className="text-xs font-semibold text-[#241C2B] underline pt-2 block">
            Edit Preferences →
          </Link>
        </div>

        <div className="p-6 bg-white border border-[#211D24]/10 space-y-2">
          <span className="text-xs uppercase tracking-wider text-[#211D24]/60 block">Saved in Wishlist</span>
          <div className="font-serif text-2xl text-[#241C2B]">
            {wishlist.length} {wishlist.length === 1 ? 'Fragrance' : 'Fragrances'}
          </div>
          <p className="text-xs text-[#211D24]/70">
            Stored locally on your device with direct bag checkout.
          </p>
          <Link to="/account/wishlist" className="text-xs font-semibold text-[#241C2B] underline pt-2 block">
            View Wishlist →
          </Link>
        </div>

        <div className="p-6 bg-white border border-[#211D24]/10 space-y-2">
          <span className="text-xs uppercase tracking-wider text-[#211D24]/60 block">Order History</span>
          <div className="font-serif text-2xl text-[#241C2B]">
            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
          </div>
          <p className="text-xs text-[#211D24]/70">
            Accra same-day & nationwide dispatch records.
          </p>
          <Link to="/order-tracking" className="text-xs font-semibold text-[#241C2B] underline pt-2 block">
            Track Shipments →
          </Link>
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-[#241C2B]">Recent Orders</h2>
          <Link to="/shop" className="text-xs uppercase tracking-wider font-semibold text-[#241C2B] hover:text-[#D68C7C]">
            Shop Fragrances →
          </Link>
        </div>

        {orders.length > 0 ? (
          <div className="bg-white border border-[#211D24]/10 divide-y divide-[#211D24]/10">
            {orders.map((ord) => (
              <div key={ord.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-[#241C2B]">{ord.reference}</span>
                    <span className="text-[11px] uppercase tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#211D24]/70">
                    {ord.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                  </p>
                  <span className="text-[11px] text-[#211D24]/50">
                    Ordered for {ord.customer.city}, Ghana on {new Date(ord.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <span className="font-mono font-bold text-base text-[#241C2B] tabular-nums">
                    GH₵ {ord.total.toFixed(2)}
                  </span>
                  <Link
                    to="/order-tracking"
                    className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#241C2B] border border-[#241C2B]/20 hover:border-[#241C2B]"
                  >
                    Track
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white border border-[#211D24]/10 space-y-2">
            <Package className="w-8 h-8 text-[#211D24]/30 mx-auto" />
            <span className="text-sm text-[#211D24]/70 block">No past orders registered on this device yet.</span>
            <Link to="/shop" className="text-xs uppercase tracking-wider font-semibold text-[#241C2B] underline">
              Browse Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
