import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Sparkles, Compass } from 'lucide-react';
import { OFFICIAL_SOCIAL_LINKS, TikTokIcon, InstagramIcon, WhatsAppIcon } from './SocialLinks';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setIsAiAssistantOpen } = useApp();

  return (
    <footer className="bg-[#171512] text-[#FAF9F5] border-t border-[#C59B3F]/20 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#FAF9F5]/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-serif tracking-tight text-[#FAF9F5]">
              Alora Fragrance House
            </h2>
            <p className="text-sm text-[#FAF9F5]/75 max-w-sm leading-relaxed font-light">
              Ghanaian fragrance house bridging online perfume reviews with authentic discovery through luxury perfume decants (5ml, 10ml, 15ml), pure perfume oils, fine body splashes, and full flacons.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#FAF9F5]/60 pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#C59B3F]" />
              <span>Accra, Ghana · Shipped Same-Day Across Ghana</span>
            </div>

            {/* Official Social Media Channels with Clickable Logos */}
            <div className="pt-3 space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C59B3F] block">
                Official Channels
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={OFFICIAL_SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 hover:bg-[#C59B3F] text-[#FAF9F5] hover:text-[#171512] transition-colors"
                  title="Follow on TikTok (@_alora.scents)"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
                <a
                  href={OFFICIAL_SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 hover:bg-[#C59B3F] text-[#FAF9F5] hover:text-[#171512] transition-colors"
                  title="Follow on Instagram (@alora.scentsss_)"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={OFFICIAL_SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 hover:bg-[#C59B3F] text-[#FAF9F5] hover:text-[#171512] transition-colors"
                  title="Message on WhatsApp"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#C59B3F]">
              Discovery & Shop
            </h3>
            <ul className="space-y-2 text-sm text-[#FAF9F5]/75 font-light">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/fragrance" className="hover:text-white transition-colors">
                  Haute Fragrance
                </Link>
              </li>
              <li>
                <Link to="/discover" className="hover:text-white transition-colors">
                  The Decant Guide
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Catalogue & Formats
                </Link>
              </li>
              <li>
                <Link to="/find-your-scent" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#C59B3F]" />
                  <span>4-Question Scent Quiz</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsAiAssistantOpen(true)}
                  className="hover:text-[#C59B3F] transition-colors flex items-center gap-1.5 text-left"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B3F]" />
                  <span>AI Scent Assistant</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#C59B3F]">
              Customer Care
            </h3>
            <ul className="space-y-2 text-sm text-[#FAF9F5]/75 font-light">
              <li>
                <Link to="/order-tracking" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="hover:text-white transition-colors">
                  Ghana Delivery Terms
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white transition-colors">
                  Tamper & Hygiene Policy
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-white transition-colors">
                  Decant FAQs
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-white transition-colors">
                  Our Story (Accra)
                </Link>
              </li>
            </ul>
          </div>

          {/* WhatsApp & Studio Concierge */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#C59B3F]">
              Concierge
            </h3>
            <p className="text-xs text-[#FAF9F5]/70 leading-relaxed font-light">
              First order? Use promo code <span className="font-mono text-[#C59B3F] font-semibold">WELCOME10</span> for 10% off.
            </p>
            <a
              href={OFFICIAL_SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171512] bg-[#C59B3F] hover:bg-white transition-colors shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#171512]" />
              <span>WhatsApp Concierge</span>
            </a>
            <div className="pt-2">
              <Link
                to="/admin"
                className="text-[11px] text-[#FAF9F5]/40 hover:text-[#FAF9F5]/80 transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Administrative Access</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF9F5]/50">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} Alora Fragrance House. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>Accra, Ghana</span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-[#FAF9F5] transition-colors">
              Privacy & Consent
            </Link>
            <Link to="/terms" className="hover:text-[#FAF9F5] transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-[#FAF9F5] transition-colors">
              Contact Concierge
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
