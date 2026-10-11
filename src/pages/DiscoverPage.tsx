import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Compass, ShieldCheck, Droplets, Clock, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DiscoverPage: React.FC = () => {
  const { setIsAiAssistantOpen, appliedPromoCode, applyPromoCode } = useApp();

  return (
    <div className="space-y-24 pb-20">
      {/* Editorial Opening */}
      <section className="bg-[#171512] text-[#FAF9F5] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#C59B3F]/20">
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C59B3F]" />
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
              The Alora Decant Philosophy
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#FAF9F5] tracking-tight max-w-4xl leading-[1.08]">
            Why Blind Buy? <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#C59B3F]">Test Wear Before You Commit.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#FAF9F5]/80 max-w-2xl font-light leading-relaxed">
            Watching glowing fragrance reviews on TikTok or Instagram will never tell you how a perfume reacts to your unique skin chemistry in Accra’s heat. Alora Fragrance House bridges this gap by offering authentic 5ml, 10ml, and 15ml decants hand-drawn from original retail flacons.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link
              to="/find-your-scent"
              className="px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#171512] bg-[#FAF9F5] hover:bg-[#C59B3F] transition-colors text-center"
            >
              Take 4-Question Scent Quiz
            </Link>
            <button
              type="button"
              onClick={() => setIsAiAssistantOpen(true)}
              className="px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF9F5] border border-[#C59B3F]/50 hover:bg-[#C59B3F]/15 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C59B3F]" />
              <span>Consult AI Scent Assistant</span>
            </button>
          </div>
        </div>
      </section>

      {/* Format Comparison Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C59B3F]">
            Format Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#171512] tracking-tight">
            Choose Your Decant Size
          </h2>
          <p className="text-sm text-[#171512]/70 font-light">
            Every decant is hand-drawn directly from sealed luxury flacons into sterile glass atomizers with fine gold spray pumps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 5ml */}
          <div className="p-8 bg-white border border-[#171512]/15 hover:border-[#C59B3F] transition-all flex flex-col justify-between space-y-6 shadow-sm hover:shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C59B3F] font-bold">01 · DISCOVERY</span>
                <span className="text-[11px] font-semibold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  Most Popular Trial
                </span>
              </div>
              <h3 className="font-serif text-3xl text-[#171512]">5ml Travel Decant</h3>
              <p className="text-xs text-[#171512]/70 leading-relaxed font-light">
                The quintessential zero-risk skin test. Provides approximately 70–80 generous sprays — allowing you to test wear the fragrance for 10–14 days across work, dates, and warm weather before committing to a full flacon.
              </p>

              <div className="pt-4 border-t border-[#171512]/10 space-y-2 text-xs text-[#171512]/80">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C59B3F]" />
                  <span>~75 sprays (~2 weeks wear)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C59B3F]" />
                  <span>Sterile glass with gold mist nozzle</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C59B3F]" />
                  <span>Fits in pocket or small clutch</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#171512]/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#171512]/50 uppercase block">Starting from</span>
                <span className="font-serif text-2xl text-[#171512] font-semibold">GH₵ 55</span>
              </div>
              <Link
                to="/shop?format=5ml"
                className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#171512] hover:bg-[#C59B3F] hover:text-[#171512] transition-colors"
              >
                Shop 5ml
              </Link>
            </div>
          </div>

          {/* 10ml */}
          <div className="p-8 bg-white border-2 border-[#C59B3F] relative flex flex-col justify-between space-y-6 shadow-md">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C59B3F] text-[#171512] text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-sm">
              Connoisseur Favorite
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C59B3F] font-bold">02 · DELUXE</span>
                <span className="text-[11px] font-mono text-[#171512]/60 font-semibold">
                  Monthly Rotation
                </span>
              </div>
              <h3 className="font-serif text-3xl text-[#171512]">10ml Deluxe Atomizer</h3>
              <p className="text-xs text-[#171512]/70 leading-relaxed font-light">
                The gold standard for the modern fragrance enthusiast. Yields approximately 150 sprays — enough for a solid month of daily signature wearing. Build an entire wardrobe of 5 luxury fragrances for the cost of one full bottle.
              </p>

              <div className="pt-4 border-t border-[#171512]/10 space-y-2 text-xs text-[#171512]/80">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C59B3F]" />
                  <span>~150 sprays (30 days wear)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C59B3F]" />
                  <span>Heavy base luxury glass cylinder</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C59B3F]" />
                  <span>Ideal for travel & work bag</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#171512]/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#171512]/50 uppercase block">Starting from</span>
                <span className="font-serif text-2xl text-[#171512] font-semibold">GH₵ 95</span>
              </div>
              <Link
                to="/shop?format=10ml"
                className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171512] bg-[#C59B3F] hover:bg-[#171512] hover:text-[#FAF9F5] transition-colors"
              >
                Shop 10ml
              </Link>
            </div>
          </div>

          {/* 15ml */}
          <div className="p-8 bg-white border border-[#171512]/15 hover:border-[#C59B3F] transition-all flex flex-col justify-between space-y-6 shadow-sm hover:shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C59B3F] font-bold">03 · FLACON</span>
                <span className="text-[11px] font-mono text-[#171512]/60 font-semibold">
                  Extended Signature
                </span>
              </div>
              <h3 className="font-serif text-3xl text-[#171512]">15ml Pocket Flacon</h3>
              <p className="text-xs text-[#171512]/70 leading-relaxed font-light">
                A substantial luxury travel vessel delivering approximately 225 sprays. Ideal when you love a perfume and want enough juice to wear it throughout an entire season (6–8 weeks) before buying a 100ml flacon.
              </p>

              <div className="pt-4 border-t border-[#171512]/10 space-y-2 text-xs text-[#171512]/80">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C59B3F]" />
                  <span>~225 sprays (60 days signature)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C59B3F]" />
                  <span>Generous reservoir with tight seal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C59B3F]" />
                  <span>Also available in Pure Perfume Oils</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#171512]/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#171512]/50 uppercase block">Starting from</span>
                <span className="font-serif text-2xl text-[#171512] font-semibold">GH₵ 135</span>
              </div>
              <Link
                to="/shop?format=15ml"
                className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#171512] hover:bg-[#C59B3F] hover:text-[#171512] transition-colors"
              >
                Shop 15ml
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Decanting Process / Editorial Visual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#FAF9F5] border border-[#171512]/10 p-8 sm:p-14">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C59B3F]">
              Artisanal Decanting Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171512] leading-tight">
              100% Authentic. Sterile Precision. Zero Compromise.
            </h2>
            <p className="text-sm text-[#171512]/75 leading-relaxed font-light">
              We draw each decant using sterile pipettes and medical-grade lab syringes directly from original, verified flacons. We never dilute with alcohol, water, or carrier oils. What you smell in our 5ml decant is identical in concentration and batch integrity to the full 100ml flacon.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 bg-white border border-[#171512]/10">
                <span className="font-semibold text-[#171512] block">Tamper-Evident Seals</span>
                <span className="text-[#171512]/60">Every decant is sealed before dispatch in Accra.</span>
              </div>
              <div className="p-4 bg-white border border-[#171512]/10">
                <span className="font-semibold text-[#171512] block">Gold Mist Nozzles</span>
                <span className="text-[#171512]/60">Fine-atomizing spray dispersal without leaking.</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#171512] hover:bg-[#C59B3F] hover:text-[#171512] transition-colors"
              >
                <span>Browse All Decants</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-4/3 overflow-hidden bg-white border border-[#171512]/10 shadow-xl">
            <img
              src="/src/assets/images/luxury_decant_bar_aesthetic_1791695150602.jpg"
              alt="Alora Fragrance House luxury decanting flacons and pipettes"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Promo Code Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-[#171512] text-[#FAF9F5] text-center space-y-6 border border-[#C59B3F]/30 shadow-xl">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
            Start Your Scent Journey Today
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl">
            Enjoy 10% Off Your First Decant Order
          </h2>
          <p className="text-sm text-[#FAF9F5]/75 max-w-lg mx-auto font-light">
            Use code <strong>WELCOME10</strong> at checkout to save 10% on all 5ml, 10ml, and 15ml decants.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => applyPromoCode('WELCOME10')}
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#171512] bg-[#C59B3F] hover:bg-[#FAF9F5] transition-colors"
            >
              {appliedPromoCode === 'WELCOME10' ? 'Promo Applied (10% Off)!' : 'Apply Code WELCOME10'}
            </button>
            <Link
              to="/shop"
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] border border-[#FAF9F5]/30 hover:bg-[#FAF9F5]/10 transition-colors"
            >
              Explore Catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
