import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, SlidersHorizontal, Menu, X, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ThemeSelector } from './ThemeSelector';
import { SocialLinks, OFFICIAL_SOCIAL_LINKS, TikTokIcon, InstagramIcon, WhatsAppIcon } from './SocialLinks';

export const Navbar: React.FC = () => {
  const { cartCount, wishlist, compareList, featureFlags, isAdminLoggedIn, siteContent } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#F5F2EE]/95 backdrop-blur-md border-b border-[#211D24]/10 transition-colors">
      {/* Top utility strip for Ghanaian shoppers + Social Media Logos + Palette Customizer */}
      <div className="bg-[#241C2B] text-[#F5F2EE] text-[11px] py-1.5 px-4 tracking-wider uppercase font-medium flex items-center justify-between gap-4">
        {/* Left: Quick Social Icons with Clickable Direct Links */}
        <div className="flex items-center gap-1">
          <a
            href={OFFICIAL_SOCIAL_LINKS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:text-white transition-opacity text-white/80"
            title="Follow on TikTok (@_alora.scents)"
            aria-label="TikTok"
          >
            <TikTokIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={OFFICIAL_SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:text-white transition-opacity text-white/80"
            title="Follow on Instagram (@alora.scentsss_)"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={OFFICIAL_SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:text-white transition-opacity text-white/80"
            title="Chat on WhatsApp"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Center: Delivery & House info */}
        <div className="hidden sm:flex items-center gap-3 mx-auto">
          <span>{siteContent.announcementStrip}</span>
        </div>
        <div className="sm:hidden text-center flex-1 truncate text-[10px]">
          <span>Accra Same-Day Delivery</span>
        </div>

        {/* Right: Theme Customizer */}
        <div className="shrink-0">
          <ThemeSelector compact />
        </div>
      </div>

      {/* Main 3-Zone Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-serif tracking-tight text-[#241C2B] whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          Alora Fragrance House
        </Link>

        {/* Zone 2: 4–5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#211D24]/80">
          <Link
            to="/shop"
            className={`whitespace-nowrap shrink-0 hover:text-[#241C2B] transition-colors relative py-1 ${
              isActive('/shop') ? 'text-[#241C2B] font-semibold border-b-2 border-[#241C2B]' : ''
            }`}
          >
            Shop
          </Link>
          <Link
            to="/find-your-scent"
            className={`whitespace-nowrap shrink-0 hover:text-[#241C2B] transition-colors relative py-1 ${
              isActive('/find-your-scent') ? 'text-[#241C2B] font-semibold border-b-2 border-[#241C2B]' : ''
            }`}
          >
            Find Your Scent
          </Link>
          <Link
            to="/compare"
            className={`whitespace-nowrap shrink-0 hover:text-[#241C2B] transition-colors relative py-1 flex items-center gap-1.5 ${
              isActive('/compare') ? 'text-[#241C2B] font-semibold border-b-2 border-[#241C2B]' : ''
            }`}
          >
            <span>Compare</span>
            {compareList.length > 0 && (
              <span className="text-[11px] font-mono tabular-nums text-[#241C2B] bg-[#241C2B]/10 rounded-full px-1.5 py-0.2">
                {compareList.length}
              </span>
            )}
          </Link>
          <Link
            to="/our-story"
            className={`whitespace-nowrap shrink-0 hover:text-[#241C2B] transition-colors relative py-1 ${
              isActive('/our-story') ? 'text-[#241C2B] font-semibold border-b-2 border-[#241C2B]' : ''
            }`}
          >
            Our Story
          </Link>
          <Link
            to="/journal"
            className={`whitespace-nowrap shrink-0 hover:text-[#241C2B] transition-colors relative py-1 ${
              isActive('/journal') ? 'text-[#241C2B] font-semibold border-b-2 border-[#241C2B]' : ''
            }`}
          >
            Journal
          </Link>
          <Link
            to="/gifting"
            className={`whitespace-nowrap shrink-0 hover:text-[#241C2B] transition-colors relative py-1 ${
              isActive('/gifting') ? 'text-[#241C2B] font-semibold border-b-2 border-[#241C2B]' : ''
            }`}
          >
            Gifting
          </Link>
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Utilities */}
        <div className="flex items-center gap-3.5 shrink-0">
          {/* Wishlist */}
          <Link
            to="/account/wishlist"
            className="p-2 text-[#211D24]/80 hover:text-[#241C2B] transition-colors relative"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#D68C7C] rounded-full" />
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="p-2 text-[#211D24]/80 hover:text-[#241C2B] transition-colors relative"
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#241C2B] text-[#F5F2EE] font-mono text-[11px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Primary Action Button */}
          <Link
            to="/find-your-scent"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] transition-colors rounded-none whitespace-nowrap shrink-0"
          >
            Find Your Fragrance
          </Link>

          {/* Admin badge if logged in */}
          {isAdminLoggedIn && (
            <Link
              to="/admin"
              className="hidden lg:flex items-center gap-1 text-[11px] font-medium text-[#241C2B] bg-[#241C2B]/10 px-2 py-1 rounded"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#211D24] hover:text-[#241C2B]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#241C2B]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F2EE] border-b border-[#211D24]/10 px-5 py-6 space-y-4 animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#211D24]">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#241C2B]"
            >
              Shop Fragrances
            </Link>
            <Link
              to="/find-your-scent"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#241C2B]"
            >
              Fragrance Quiz
            </Link>
            <Link
              to="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#241C2B]"
            >
              Compare Fragrances ({compareList.length})
            </Link>
            <Link
              to="/our-story"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#241C2B]"
            >
              Our Story
            </Link>
            <Link
              to="/journal"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#241C2B]"
            >
              Journal & Scent Literacy
            </Link>
            <Link
              to="/gifting"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#241C2B]"
            >
              Gifting Collections
            </Link>

            {/* Social channels in mobile drawer */}
            <div className="pt-3 border-t border-[#211D24]/10">
              <span className="text-[10px] uppercase font-bold text-[#211D24]/50 block mb-2">Connect with House of ALORA</span>
              <div className="flex items-center gap-3">
                <a
                  href={OFFICIAL_SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-950 text-xs font-semibold"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={OFFICIAL_SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#211D24]/20 hover:border-[#241C2B] text-[#241C2B]"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={OFFICIAL_SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#211D24]/20 hover:border-[#241C2B] text-[#241C2B]"
                  title="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-[#211D24]/10 flex flex-col space-y-2 text-sm text-[#211D24]/70">
              <div className="py-1">
                <span className="text-[10px] uppercase font-bold text-[#211D24]/50 block mb-1">Color Palette</span>
                <ThemeSelector />
              </div>
              <Link to="/account" onClick={() => setMobileMenuOpen(false)}>Customer Account</Link>
              <Link to="/account/preferences" onClick={() => setMobileMenuOpen(false)}>Scent Preferences</Link>
              <Link to="/order-tracking" onClick={() => setMobileMenuOpen(false)}>Track an Order</Link>
              <Link to="/faqs" onClick={() => setMobileMenuOpen(false)}>FAQs & Ghana Delivery</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Studio</Link>
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-[#241C2B] font-medium">Administrative Portal</Link>
            </div>
          </nav>

          <Link
            to="/find-your-scent"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center block py-3 text-xs uppercase tracking-wider font-semibold text-[#F5F2EE] bg-[#241C2B]"
          >
            Find Your Fragrance
          </Link>
        </div>
      )}
    </header>
  );
};
