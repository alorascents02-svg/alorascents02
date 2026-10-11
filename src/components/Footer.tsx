import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin } from 'lucide-react';
import { SocialLinks, OFFICIAL_SOCIAL_LINKS, TikTokIcon, InstagramIcon, WhatsAppIcon } from './SocialLinks';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#241C2B] text-[#F5F2EE] border-t border-[#F5F2EE]/10 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#F5F2EE]/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-serif tracking-tight text-[#F5F2EE]">
              Alora Fragrance House
            </h2>
            <p className="text-sm text-[#F5F2EE]/70 max-w-sm leading-relaxed">
              Ghanaian fragrance house bridging online perfume reviews with authentic discovery through luxury perfume decants, pure perfume oils, fine body splashes, and full bottles.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#F5F2EE]/60 pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#D68C7C]" />
              <span>Accra, Ghana · Dispatching Nationwide</span>
            </div>

            {/* Official Social Media Channels with Clickable Logos */}
            <div className="pt-3 space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D68C7C] block">
                Official Channels
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={OFFICIAL_SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 hover:bg-white/20 text-[#F5F2EE] hover:text-white transition-colors"
                  title="Follow on TikTok (@_alora.scents)"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
                <a
                  href={OFFICIAL_SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 hover:bg-white/20 text-[#F5F2EE] hover:text-white transition-colors"
                  title="Follow on Instagram (@alora.scentsss_)"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={OFFICIAL_SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 hover:bg-white/20 text-[#F5F2EE] hover:text-white transition-colors"
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
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#D68C7C]">
              Discovery & Shop
            </h3>
            <ul className="space-y-2 text-sm text-[#F5F2EE]/75">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  All Fragrances
                </Link>
              </li>
              <li>
                <Link to="/find-your-scent" className="hover:text-white transition-colors">
                  Find Your Scent Quiz
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors">
                  Fragrance Compare
                </Link>
              </li>
              <li>
                <Link to="/gifting" className="hover:text-white transition-colors">
                  Gifting Collections
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-white transition-colors">
                  Scent Literacy Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#D68C7C]">
              Customer Care
            </h3>
            <ul className="space-y-2 text-sm text-[#F5F2EE]/75">
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  Customer Account
                </Link>
              </li>
              <li>
                <Link to="/account/preferences" className="hover:text-white transition-colors">
                  Saved Preferences
                </Link>
              </li>
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
                  Returns & Hygiene Policy
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* WhatsApp & Studio Concierge */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#D68C7C]">
              Concierge
            </h3>
            <p className="text-xs text-[#F5F2EE]/70 leading-relaxed">
              Need personalized advice or wish to place your order directly via WhatsApp?
            </p>
            <a
              href={OFFICIAL_SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#241C2B] bg-[#F5F2EE] hover:bg-white transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#241C2B]" />
              <span>WhatsApp Concierge</span>
            </a>
            <div className="pt-2">
              <Link
                to="/admin"
                className="text-[11px] text-[#F5F2EE]/40 hover:text-[#F5F2EE]/80 transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Administrative Access</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F2EE]/50">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} House of ALORA. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>Accra, Ghana</span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-[#F5F2EE] transition-colors">
              Privacy & Consent
            </Link>
            <Link to="/terms" className="hover:text-[#F5F2EE] transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-[#F5F2EE] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
