import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, Sparkles, Compass, Check, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ThemeSelector } from './ThemeSelector';
import { OFFICIAL_SOCIAL_LINKS, TikTokIcon, InstagramIcon, WhatsAppIcon } from './SocialLinks';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    cartSubtotal,
    wishlist,
    setIsAiAssistantOpen,
    appliedPromoCode,
    applyPromoCode,
  } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleCopyPromo = () => {
    navigator.clipboard?.writeText('WELCOME10');
    applyPromoCode('WELCOME10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#171512]/10 transition-colors">
      {/* 1. TOP UTILITY STRIP & MAISON WELCOME ANNOUNCEMENT */}
      <div className="bg-[#171512] text-[#FAF9F5] text-[11px] py-2 px-4 tracking-wider uppercase font-medium flex items-center justify-between gap-4 border-b border-[#C59B3F]/20">
        {/* Left: Social Media */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={OFFICIAL_SOCIAL_LINKS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-[#FAF9F5]/70 hover:text-[#C59B3F] transition-colors"
            title="TikTok (@_alora.scents)"
            aria-label="TikTok"
          >
            <TikTokIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={OFFICIAL_SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-[#FAF9F5]/70 hover:text-[#C59B3F] transition-colors"
            title="Instagram (@alora.scentsss_)"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={OFFICIAL_SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-[#FAF9F5]/70 hover:text-[#C59B3F] transition-colors"
            title="WhatsApp Concierge"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Center: Promo Code Announcement with Interactive Copy Button */}
        <div className="flex items-center gap-2.5 mx-auto truncate text-[11px]">
          <span className="hidden md:inline text-[#FAF9F5]/75">
            Artisanal Decants & Pure Perfumes · Hand-Poured in Accra ·
          </span>
          <span className="text-[#FAF9F5]/90">
            First Order: <strong>10% Off</strong> with code
          </span>
          <button
            type="button"
            onClick={handleCopyPromo}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#C59B3F] text-[#171512] font-mono font-bold text-[10px] tracking-widest hover:bg-[#FAF9F5] transition-all cursor-pointer shadow-xs"
            title="Click to copy and apply 10% discount"
          >
            {copiedCode || appliedPromoCode === 'WELCOME10' ? (
              <>
                <Check className="w-3 h-3 text-[#171512]" />
                <span>WELCOME10 APPLIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-[#171512]" />
                <span>WELCOME10</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Theme Palette */}
        <div className="shrink-0 flex items-center gap-3">
          <ThemeSelector compact />
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Left: Brand Identity */}
        <Link
          to="/"
          className="group flex flex-col justify-center shrink-0 hover:opacity-90 transition-opacity"
        >
          <span className="text-2xl sm:text-3xl font-serif tracking-tight text-[#171512] leading-none">
            Alora Fragrance House
          </span>
          <span className="text-[10px] font-sans tracking-[0.28em] text-[#C59B3F] uppercase font-medium mt-1">
            Haute Parfumerie · Accra
          </span>
        </Link>

        {/* Center: Core Feature Links: Home, Fragrance, Discover, Shop */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.15em] font-semibold text-[#171512]/80">
          <Link
            to="/"
            className={`py-1.5 transition-colors relative hover:text-[#C59B3F] ${
              isActive('/') ? 'text-[#171512] border-b-2 border-[#C59B3F]' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/fragrance"
            className={`py-1.5 transition-colors relative hover:text-[#C59B3F] ${
              isActive('/fragrance') ? 'text-[#171512] border-b-2 border-[#C59B3F]' : ''
            }`}
          >
            Fragrance
          </Link>
          <Link
            to="/discover"
            className={`py-1.5 transition-colors relative hover:text-[#C59B3F] ${
              isActive('/discover') ? 'text-[#171512] border-b-2 border-[#C59B3F]' : ''
            }`}
          >
            Discover
          </Link>
          <Link
            to="/shop"
            className={`py-1.5 transition-colors relative hover:text-[#C59B3F] ${
              isActive('/shop') ? 'text-[#171512] border-b-2 border-[#C59B3F]' : ''
            }`}
          >
            Shop
          </Link>
        </nav>

        {/* Right: Scent Quiz, AI Scent Assistant & Bag */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* 4-Question Scent Quiz CTA */}
          <Link
            to="/find-your-scent"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#171512] border border-[#171512]/25 hover:border-[#C59B3F] hover:text-[#C59B3F] transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#C59B3F]" />
            <span>Scent Quiz</span>
          </Link>

          {/* AI Scent Assistant Button */}
          <button
            type="button"
            onClick={() => setIsAiAssistantOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#171512] hover:bg-[#C59B3F] hover:text-[#171512] transition-colors shadow-xs"
            title="Open AI Scent Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C59B3F]" />
            <span className="hidden sm:inline">AI Assistant</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Wishlist */}
          <Link
            to="/account/wishlist"
            className="p-2 text-[#171512]/80 hover:text-[#C59B3F] transition-colors relative"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C59B3F] rounded-full" />
            )}
          </Link>

          {/* Shopping Bag */}
          <Link
            to="/cart"
            className="p-2 text-[#171512]/80 hover:text-[#C59B3F] transition-colors relative flex items-center gap-1"
            title="Shopping Bag"
            aria-label="Shopping Bag"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#C59B3F] text-[#171512] font-mono text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            {cartCount > 0 && (
              <span className="hidden xl:inline text-xs font-mono font-semibold text-[#171512] ml-1">
                GH₵ {cartSubtotal.toFixed(0)}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#171512]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b border-[#171512]/15 px-6 py-6 space-y-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {/* Promo code highlight in mobile menu */}
          <div className="p-3 bg-[#171512] text-[#FAF9F5] flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-[#C59B3F] block">10% Off Your First Order</span>
              <span className="text-[11px] text-[#FAF9F5]/70">Code: WELCOME10</span>
            </div>
            <button
              type="button"
              onClick={handleCopyPromo}
              className="px-2.5 py-1 text-[10px] uppercase font-bold bg-[#C59B3F] text-[#171512]"
            >
              {copiedCode ? 'Applied!' : 'Apply Code'}
            </button>
          </div>

          <nav className="flex flex-col space-y-4 text-sm uppercase tracking-widest font-medium text-[#171512]">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C59B3F] transition-colors py-1 border-b border-[#171512]/10"
            >
              Home
            </Link>
            <Link
              to="/fragrance"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C59B3F] transition-colors py-1 border-b border-[#171512]/10"
            >
              Fragrance
            </Link>
            <Link
              to="/discover"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C59B3F] transition-colors py-1 border-b border-[#171512]/10"
            >
              Discover Decants
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C59B3F] transition-colors py-1 border-b border-[#171512]/10"
            >
              Shop All Formats
            </Link>
            <Link
              to="/find-your-scent"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C59B3F] transition-colors py-1 border-b border-[#171512]/10 flex items-center justify-between"
            >
              <span>4-Question Scent Quiz</span>
              <span className="text-[10px] text-[#C59B3F] font-mono">Personalized</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAiAssistantOpen(true);
              }}
              className="text-left hover:text-[#C59B3F] transition-colors py-1 border-b border-[#171512]/10 flex items-center justify-between"
            >
              <span>AI Scent Assistant</span>
              <Sparkles className="w-4 h-4 text-[#C59B3F]" />
            </button>
            <Link
              to="/our-story"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C59B3F] transition-colors py-1 border-b border-[#171512]/10"
            >
              Our Story (Accra)
            </Link>
            <Link
              to="/journal"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C59B3F] transition-colors py-1"
            >
              Scent Journal
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
