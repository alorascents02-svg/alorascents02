import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Send, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_SOCIAL_LINKS, TikTokIcon, InstagramIcon, WhatsAppIcon } from '../components/SocialLinks';

export const ContactPage: React.FC = () => {
  const { submitInquiry, siteContent } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry(formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-[#211D24]/10 pb-8 max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          House of ALORA Connect
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#241C2B] tracking-tight">
          Connect with House of ALORA
        </h1>
        <p className="text-sm sm:text-base text-[#211D24]/75">
          Have an inquiry about an upcoming order, custom wedding scenting, or fragrance notes? Reach out to our Accra studio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white border border-[#211D24]/10 p-8 space-y-6">
          <h2 className="font-serif text-2xl text-[#241C2B]">Send a Direct Message</h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Message Received Successfully</span>
              </div>
              <p className="text-xs leading-relaxed">
                Thank you for reaching out. A House of ALORA team member will review your inquiry and get in touch within two business hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs font-semibold underline pt-2 block"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#211D24]">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Kwame Mensah"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#211D24]/20 focus:outline-none focus:border-[#241C2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#211D24]">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="024 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#211D24]/20 focus:outline-none focus:border-[#241C2B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#211D24]">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="kwame@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#211D24]/20 focus:outline-none focus:border-[#241C2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#211D24]">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#211D24]/20 focus:outline-none focus:border-[#241C2B]"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Status">Order Status & Delivery</option>
                  <option value="Bespoke Gifting">Wedding / Corporate Gifting</option>
                  <option value="Fragrance Recommendation">Fragrance Recommendation Advice</option>
                  <option value="Wholesale Inquiry">Retail / Wholesale Partnership</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#211D24]">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please describe how we can assist you..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#211D24]/20 focus:outline-none focus:border-[#241C2B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Studio Contact Details & Socials */}
        <div className="lg:col-span-5 space-y-6">
          {/* Official WhatsApp Concierge Card */}
          <div className="bg-[#241C2B] text-[#F5F2EE] p-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#D68C7C]">
              Direct Messaging
            </span>
            <h3 className="font-serif text-2xl">Official WhatsApp Concierge</h3>
            <p className="text-xs text-[#F5F2EE]/75 leading-relaxed">
              Connect directly with our dedicated Accra team on WhatsApp for the fastest guidance and orders.
            </p>
            <a
              href={OFFICIAL_SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#241C2B] bg-[#F5F2EE] hover:bg-white transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#241C2B]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Social Channels Card */}
          <div className="bg-white border border-[#211D24]/10 p-6 space-y-3 text-xs">
            <h3 className="font-serif text-xl text-[#241C2B]">Official Social Media</h3>
            <p className="text-[#211D24]/70">Follow our daily fragrance drops, layering tutorials, and perfume reviews:</p>
            <div className="space-y-2 pt-2">
              <a
                href={OFFICIAL_SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-[#FAF8F5] hover:bg-[#F3EFE7] text-[#241C2B] transition-colors"
              >
                <TikTokIcon className="w-4 h-4 text-[#241C2B]" />
                <div>
                  <span className="font-semibold block">TikTok</span>
                  <span className="text-[11px] text-[#211D24]/60">@_alora.scents</span>
                </div>
              </a>
              <a
                href={OFFICIAL_SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-[#FAF8F5] hover:bg-[#F3EFE7] text-[#241C2B] transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#241C2B]" />
                <div>
                  <span className="font-semibold block">Instagram</span>
                  <span className="text-[11px] text-[#211D24]/60">@alora.scentsss_</span>
                </div>
              </a>
            </div>
          </div>

          {/* Studio Details */}
          <div className="bg-white border border-[#211D24]/10 p-6 space-y-4 text-xs text-[#211D24]/80">
            <h3 className="font-serif text-xl text-[#241C2B]">House of ALORA Studio</h3>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#D68C7C] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#241C2B] block">Studio Location</span>
                <span>{siteContent.contactAddress}</span>
                <span className="text-[11px] text-[#211D24]/60 block mt-0.5">(Visits and pick-up by appointment)</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-[#211D24]/10">
              <Clock className="w-4 h-4 text-[#D68C7C] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#241C2B] block">Operating Hours</span>
                <span>{siteContent.contactHours}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-[#211D24]/10">
              <Mail className="w-4 h-4 text-[#D68C7C] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#241C2B] block">Email Correspondence</span>
                <span>{siteContent.contactEmail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
