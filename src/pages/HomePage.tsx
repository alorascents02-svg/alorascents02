import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, Check, ShoppingBag, ShieldCheck, Droplets, Copy, ExternalLink, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { SCENT_FAMILIES_INFO } from '../data/products';
import { JOURNAL_ARTICLES } from '../data/journal';

export const HomePage: React.FC = () => {
  const {
    publishedProducts,
    setIsAiAssistantOpen,
    appliedPromoCode,
    applyPromoCode,
    addToCart,
  } = useApp();

  const [copiedPromo, setCopiedPromo] = useState(false);
  const [heroFormatIdx, setHeroFormatIdx] = useState(0);
  const [heroAdded, setHeroAdded] = useState(false);

  // Curate 3 featured masterpieces for displays
  const featuredProducts = publishedProducts.slice(0, 3);
  const journalPreview = JOURNAL_ARTICLES.slice(0, 3);

  // Hero flagship product
  const flagship = publishedProducts[0] || {
    id: 'alo-prd-001',
    name: 'Velours Nocturne',
    fragranceFamily: 'Warm Woody',
    price: 360,
    size: '100ml Flacon',
    images: ['/src/assets/images/luxury_perfume_decants_1791695120764.jpg'],
  };

  const flagshipHeroOptions = [
    { size: '5ml Travel Decant', price: 65, tag: '~75 sprays · 14 days wear' },
    { size: '10ml Deluxe Atomizer', price: 115, tag: '~150 sprays · 30 days wear' },
    { size: '15ml Pocket Flacon', price: 160, tag: '~225 sprays · 60 days signature' },
    { size: 'Full Bottle (100ml)', price: 360, tag: 'Original sealed flacon' },
  ];

  const currentHeroOpt = flagshipHeroOptions[heroFormatIdx];

  const handleCopyWelcome10 = () => {
    navigator.clipboard?.writeText('WELCOME10');
    applyPromoCode('WELCOME10');
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2500);
  };

  const handleAddHeroToBag = () => {
    addToCart(flagship, 1, currentHeroOpt.size, currentHeroOpt.price);
    setHeroAdded(true);
    setTimeout(() => setHeroAdded(false), 2500);
  };

  return (
    <div className="space-y-28 sm:space-y-36 pb-24">
      {/* 1. MAISON YUSIF-INSPIRED OPENING & EDITORIAL HERO */}
      <section className="relative min-h-[92vh] sm:min-h-[95vh] flex items-center bg-[#171512] text-[#FAF9F5] overflow-hidden border-b border-[#C59B3F]/25">
        {/* Background Chiaroscuro Atmosphere */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_luxury_perfume_editorial_1791688544047.jpg"
            alt="Alora Fragrance House luxury perfume flacons and editorial still life"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center lg:object-[center_35%] scale-102 transition-transform duration-1000 ease-out"
          />
          {/* Deep Luxury Scrims */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#171512]/96 via-[#171512]/80 to-transparent sm:to-[#171512]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171512] via-transparent to-[#171512]/50" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Haute Parfumerie Narrative */}
            <div className="lg:col-span-7 space-y-8">
              {/* Prestige Editorial Kicker */}
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#C59B3F]" />
                <span className="text-xs uppercase tracking-[0.28em] font-medium text-[#C59B3F]">
                  L’Art du Décant & Haute Parfumerie · Accra
                </span>
              </div>

              {/* Master Headline */}
              <div className="space-y-4">
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.04] tracking-tight text-[#FAF9F5] text-balance">
                  Never Blind Buy Again. <br />
                  <span className="italic font-normal text-[#C59B3F]">
                    Smell Beyond The Ordinary.
                  </span>
                </h1>
                <p className="font-serif italic text-xl sm:text-2xl text-[#FAF9F5]/90 leading-relaxed font-normal">
                  Experience coveted luxury fragrances on your skin before committing to full bottles.
                </p>
              </div>

              {/* Mission Narrative */}
              <p className="text-sm sm:text-base text-[#FAF9F5]/80 leading-relaxed max-w-xl font-light">
                Alora Fragrance House bridges the gap between watching online reviews and the risk of expensive blind buys. We hand-draw authentic niche extraits into sterile <strong>5ml, 10ml, and 15ml</strong> luxury atomizers — alongside pure perfume oils, body splashes, and full flacons in Accra, Ghana.
              </p>

              {/* Working Promo Code Welcome Box */}
              <div className="p-4 bg-[#211F1C]/90 border border-[#C59B3F]/40 shadow-lg max-w-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C59B3F] font-bold block">
                    Exclusive Welcome Gift
                  </span>
                  <span className="text-xs text-[#FAF9F5]">
                    Enjoy <strong>10% Off</strong> your first decant order with code:
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyWelcome10}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#C59B3F] text-[#171512] font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-xs shrink-0 cursor-pointer"
                  title="Click to copy WELCOME10 code"
                >
                  {copiedPromo || appliedPromoCode === 'WELCOME10' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#171512]" />
                      <span>WELCOME10 APPLIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#171512]" />
                      <span>CODE: WELCOME10</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#171512] bg-[#C59B3F] hover:bg-[#FAF9F5] transition-all duration-300 shadow-xl shadow-black/40"
                >
                  <span>Explore Fragrances</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/find-your-scent"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF9F5] border border-[#FAF9F5]/35 hover:border-[#C59B3F] hover:text-[#C59B3F] hover:bg-[#FAF9F5]/5 transition-all duration-300"
                >
                  <Compass className="w-4 h-4 text-[#C59B3F]" />
                  <span>4-Question Scent Quiz</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsAiAssistantOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF9F5]/90 hover:text-[#C59B3F] transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#C59B3F]" />
                  <span>AI Assistant</span>
                </button>
              </div>

              {/* Hallmark Credentials */}
              <div className="pt-8 border-t border-[#FAF9F5]/15 grid grid-cols-3 gap-6 text-[#FAF9F5]/80 text-xs">
                <div>
                  <span className="font-serif text-base block text-[#FAF9F5]">100% Authentic</span>
                  <span className="text-[11px] text-[#FAF9F5]/60">Hand-Drawn in Accra</span>
                </div>
                <div>
                  <span className="font-serif text-base block text-[#FAF9F5]">5ml · 10ml · 15ml</span>
                  <span className="text-[11px] text-[#FAF9F5]/60">Zero Blind-Buy Risk</span>
                </div>
                <div>
                  <span className="font-serif text-base block text-[#FAF9F5]">Ghana Dispatch</span>
                  <span className="text-[11px] text-[#FAF9F5]/60">Same-Day Accra & MoMo</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Showcase of Flagship Masterpiece */}
            <div className="lg:col-span-5">
              <div className="bg-[#1D1B18]/90 border border-[#C59B3F]/35 p-6 sm:p-8 shadow-2xl backdrop-blur-sm space-y-6">
                <div className="flex items-center justify-between border-b border-[#FAF9F5]/10 pb-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59B3F] font-semibold">
                    Signature Creation · Featured Extrait
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    In Stock in Accra
                  </span>
                </div>

                {/* Imagery */}
                <div className="relative aspect-4/3 w-full bg-[#2A2621] overflow-hidden border border-[#FAF9F5]/10">
                  <img
                    src="/src/assets/images/luxury_perfume_decants_1791695120764.jpg"
                    alt="Velours Nocturne hand-decanted travel atomizers and luxury glass flacons"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] uppercase tracking-wider text-[#C59B3F] font-mono">
                      Velours Nocturne · Extrait de Parfum
                    </span>
                    <p className="font-serif text-lg text-white">
                      Black Fig · Smoked Cedar · Bourbon Amber
                    </p>
                  </div>
                </div>

                {/* Format Switcher */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#FAF9F5]/70 font-semibold uppercase tracking-wider text-[11px]">
                      Select Format to Sample:
                    </span>
                    <span className="text-[#C59B3F] text-[11px] font-mono">
                      {currentHeroOpt.tag}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {flagshipHeroOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setHeroFormatIdx(idx)}
                        className={`p-2 text-center transition-all border ${
                          heroFormatIdx === idx
                            ? 'bg-[#C59B3F] text-[#171512] border-[#C59B3F] font-bold shadow-xs'
                            : 'bg-[#2A2621] text-[#FAF9F5]/80 border-[#FAF9F5]/15 hover:border-[#C59B3F]/50'
                        }`}
                      >
                        <span className="block text-[11px] leading-tight">
                          {opt.size.split(' ')[0]}
                        </span>
                        <span className="block font-mono text-[10px] mt-0.5 opacity-90">
                          GH₵ {opt.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Bag and Pricing */}
                <div className="pt-2 border-t border-[#FAF9F5]/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-[#FAF9F5]/50 block">Active Selection</span>
                    <span className="font-mono text-xl font-bold text-[#FAF9F5]">
                      GH₵ {currentHeroOpt.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddHeroToBag}
                    className="flex-1 py-3 px-4 text-xs font-semibold uppercase tracking-wider bg-[#C59B3F] text-[#171512] hover:bg-[#FAF9F5] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    {heroAdded ? (
                      <>
                        <Check className="w-4 h-4 text-[#171512]" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add {currentHeroOpt.size.split(' ')[0]} to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROMO CODE BANNER (WELCOME10) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#171512] text-[#FAF9F5] p-6 sm:p-8 border border-[#C59B3F]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C59B3F]/20 border border-[#C59B3F]/50 flex items-center justify-center text-[#C59B3F] shrink-0 font-bold font-serif text-lg">
              10%
            </div>
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C59B3F] block">
                Welcome to Alora Fragrance House
              </span>
              <p className="text-sm sm:text-base font-serif text-[#FAF9F5]">
                Unlock 10% off your first decant order with promo code <span className="font-mono font-bold text-[#C59B3F]">WELCOME10</span>
              </p>
              <p className="text-xs text-[#FAF9F5]/60 font-light">
                Hand-drawn from authentic retail flacons. Tamper-evident seals. Shipped across Accra & Ghana.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopyWelcome10}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-[#C59B3F] text-[#171512] hover:bg-white transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              {copiedPromo || appliedPromoCode === 'WELCOME10' ? (
                <>
                  <Check className="w-4 h-4 text-[#171512]" />
                  <span>Promo Applied (10%)</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#171512]" />
                  <span>Copy Code WELCOME10</span>
                </>
              )}
            </button>
            <Link
              to="/shop"
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] border border-[#FAF9F5]/30 hover:bg-[#FAF9F5]/10 transition-colors"
            >
              Shop Decants
            </Link>
          </div>
        </div>
      </section>

      {/* 3. THE MAISON DECANT PHILOSOPHY & 5ml/10ml/15ml FORMAT GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#171512]/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
              The Decanting Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171512] tracking-tight">
              Test on Your Skin. Before You Commit.
            </h2>
            <p className="text-sm text-[#171512]/70 max-w-xl font-light">
              Why spend hundreds of Cedis on a full bottle based on an online review? Explore our authentic format hierarchy:
            </p>
          </div>
          <Link
            to="/discover"
            className="text-xs font-semibold uppercase tracking-wider text-[#171512] hover:text-[#C59B3F] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Learn About Our Decanting</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 5ml */}
          <div className="p-6 bg-white border border-[#171512]/15 hover:border-[#C59B3F] transition-all flex flex-col justify-between gap-6 shadow-sm">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#C59B3F] font-bold">01 · DISCOVERY</span>
              <h3 className="font-serif text-2xl text-[#171512]">5ml Travel Decant</h3>
              <p className="text-xs text-[#171512]/70 leading-relaxed font-light">
                Approx. <strong>75 sprays</strong>. The gold standard for skin trial. Test wear for 10–14 days in Ghana’s heat.
              </p>
              <div className="pt-2 text-[11px] text-[#171512]/80 space-y-1">
                <div>✓ Zero-risk skin trial</div>
                <div>✓ Gold fine-mist pump</div>
              </div>
            </div>
            <div className="pt-3 border-t border-[#171512]/10 flex items-center justify-between">
              <span className="font-serif text-lg font-semibold text-[#171512]">From GH₵ 55</span>
              <Link to="/shop?format=5ml" className="text-[11px] font-semibold text-[#C59B3F] hover:underline uppercase">
                Explore 5ml
              </Link>
            </div>
          </div>

          {/* 10ml */}
          <div className="p-6 bg-white border-2 border-[#C59B3F] relative flex flex-col justify-between gap-6 shadow-md">
            <div className="absolute -top-3 left-4 bg-[#C59B3F] text-[#171512] text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
              Connoisseur Choice
            </div>
            <div className="space-y-3 pt-1">
              <span className="font-mono text-xs text-[#C59B3F] font-bold">02 · DELUXE</span>
              <h3 className="font-serif text-2xl text-[#171512]">10ml Atomizer</h3>
              <p className="text-xs text-[#171512]/70 leading-relaxed font-light">
                Approx. <strong>150 sprays</strong>. A full 30 days of daily wear. Perfect for building a rotating luxury wardrobe.
              </p>
              <div className="pt-2 text-[11px] text-[#171512]/80 space-y-1">
                <div>✓ 30 days rotation</div>
                <div>✓ Heavy glass cylinder</div>
              </div>
            </div>
            <div className="pt-3 border-t border-[#171512]/10 flex items-center justify-between">
              <span className="font-serif text-lg font-semibold text-[#171512]">From GH₵ 95</span>
              <Link to="/shop?format=10ml" className="text-[11px] font-semibold text-[#C59B3F] hover:underline uppercase">
                Explore 10ml
              </Link>
            </div>
          </div>

          {/* 15ml */}
          <div className="p-6 bg-white border border-[#171512]/15 hover:border-[#C59B3F] transition-all flex flex-col justify-between gap-6 shadow-sm">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#C59B3F] font-bold">03 · FLACON</span>
              <h3 className="font-serif text-2xl text-[#171512]">15ml Pocket Flacon</h3>
              <p className="text-xs text-[#171512]/70 leading-relaxed font-light">
                Approx. <strong>225 sprays</strong>. An extended seasonal signature (6–8 weeks) before buying full 100ml.
              </p>
              <div className="pt-2 text-[11px] text-[#171512]/80 space-y-1">
                <div>✓ 60 days signature</div>
                <div>✓ Generous volume</div>
              </div>
            </div>
            <div className="pt-3 border-t border-[#171512]/10 flex items-center justify-between">
              <span className="font-serif text-lg font-semibold text-[#171512]">From GH₵ 135</span>
              <Link to="/shop?format=15ml" className="text-[11px] font-semibold text-[#C59B3F] hover:underline uppercase">
                Explore 15ml
              </Link>
            </div>
          </div>

          {/* Oils, Splashes & Full Flacons */}
          <div className="p-6 bg-[#FAF9F5] border border-[#171512]/15 hover:border-[#C59B3F] transition-all flex flex-col justify-between gap-6 shadow-sm">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#C59B3F] font-bold">04 · FULL & OILS</span>
              <h3 className="font-serif text-2xl text-[#171512]">Oils & Full Bottles</h3>
              <p className="text-xs text-[#171512]/70 leading-relaxed font-light">
                Alcohol-free pure perfume oils (Attars), daily body splash mists, and sealed 100ml retail bottles.
              </p>
              <div className="pt-2 text-[11px] text-[#171512]/80 space-y-1">
                <div>✓ 12+ hr pure oils</div>
                <div>✓ 100ml sealed flacons</div>
              </div>
            </div>
            <div className="pt-3 border-t border-[#171512]/10 flex items-center justify-between">
              <span className="font-serif text-lg font-semibold text-[#171512]">From GH₵ 130</span>
              <Link to="/shop" className="text-[11px] font-semibold text-[#C59B3F] hover:underline uppercase">
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATED FRAGRANCE DISPLAYS (MAISON YUSIF-INSPIRED PRODUCT SHOWCASE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#171512]/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
              Curated Fragrance Displays
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171512] tracking-tight">
              Verified Masterpiece Compositions
            </h2>
            <p className="text-sm text-[#171512]/70 max-w-xl font-light">
              Evaluated for radiance and durability in Ghanaian heat. Select 5ml, 10ml, or 15ml directly below.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold uppercase tracking-wider text-[#171512] hover:text-[#C59B3F] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>View All Fragrances</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. 4-QUESTION SCENT QUIZ PROMOTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#171512] text-[#FAF9F5] p-8 sm:p-14 lg:p-16 border border-[#C59B3F]/30 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C59B3F]" />
                <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
                  Instant Olfactory Matching
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                Not sure where to begin? Take our 4-Question Scent Quiz.
              </h2>
              <p className="text-sm sm:text-base text-[#FAF9F5]/80 leading-relaxed font-light max-w-xl">
                Answer four intuitive questions about your aura, tropical wearing occasion, favorite raw notes, and preferred decant format. Our matching engine pairs you with your ideal decants in under 60 seconds.
              </p>

              {/* 4-Question Preview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 bg-[#FAF9F5]/5 border border-[#FAF9F5]/10">
                  <span className="text-[#C59B3F] font-mono text-[11px] block">01 · Aura</span>
                  <span className="font-medium text-[#FAF9F5]">Bold or Crisp</span>
                </div>
                <div className="p-3 bg-[#FAF9F5]/5 border border-[#FAF9F5]/10">
                  <span className="text-[#C59B3F] font-mono text-[11px] block">02 · Occasion</span>
                  <span className="font-medium text-[#FAF9F5]">Heat or Evening</span>
                </div>
                <div className="p-3 bg-[#FAF9F5]/5 border border-[#FAF9F5]/10">
                  <span className="text-[#C59B3F] font-mono text-[11px] block">03 · Notes</span>
                  <span className="font-medium text-[#FAF9F5]">Vanilla or Woods</span>
                </div>
                <div className="p-3 bg-[#FAF9F5]/5 border border-[#FAF9F5]/10">
                  <span className="text-[#C59B3F] font-mono text-[11px] block">04 · Format</span>
                  <span className="font-medium text-[#FAF9F5]">5ml, 10ml, 15ml</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/find-your-scent"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#171512] bg-[#C59B3F] hover:bg-[#FAF9F5] transition-colors shadow-lg"
                >
                  <span>Start 4-Question Scent Quiz</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsAiAssistantOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF9F5] border border-[#FAF9F5]/30 hover:border-[#C59B3F] transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#C59B3F]" />
                  <span>Or Ask AI Scent Assistant</span>
                </button>
              </div>
            </div>

            {/* Visual Quiz Card Accent */}
            <div className="lg:col-span-5 relative aspect-4/3 w-full bg-[#29241E] overflow-hidden border border-[#C59B3F]/30 shadow-2xl">
              <img
                src="/src/assets/images/fragrance_rose_amber_1791638079597.jpg"
                alt="Rose & Amber Wood luxury decant flacon"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#C59B3F] font-mono">
                  Personalized Match
                </span>
                <p className="font-serif text-xl">Find the decant that mirrors your character.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AI SCENT ASSISTANT INTERACTIVE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5] border border-[#171512]/15 p-8 sm:p-12 lg:p-16 space-y-8 shadow-sm">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C59B3F]" />
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
                Alora Olfactory Concierge
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171512]">
              Have a Specific Scent in Mind? Ask our AI Sommelier.
            </h2>
            <p className="text-sm text-[#171512]/75 font-light leading-relaxed">
              Describe your mood, an upcoming wedding in Labadi, your favorite designer notes, or asking how a fragrance will wear in Accra humidity. Our AI Scent Assistant recommends exact decants with direct 1-click ordering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              '“What 5ml decants survive sunny afternoons in Accra without evaporating?”',
              '“I want an intoxicating vanilla & smoked amber scent for an evening date.”',
              '“Which 3 decants make the perfect discovery set for a gift?”',
            ].map((prompt, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-[#171512]/10 text-xs italic text-[#171512]/80 flex flex-col justify-between gap-4"
              >
                <span>{prompt}</span>
                <button
                  type="button"
                  onClick={() => setIsAiAssistantOpen(true)}
                  className="text-[11px] font-semibold text-[#C59B3F] hover:underline uppercase tracking-wider text-left not-italic flex items-center gap-1"
                >
                  <span>Ask AI Concierge</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsAiAssistantOpen(true)}
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] bg-[#171512] text-[#FAF9F5] hover:bg-[#C59B3F] hover:text-[#171512] transition-colors inline-flex items-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C59B3F]" />
              <span>Launch AI Scent Assistant</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. SCENT FAMILY PALETTE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#171512]/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C59B3F]">
              Explore by Palette
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171512] tracking-tight">
              Shop by Scent Family
            </h2>
            <p className="text-sm text-[#171512]/70 max-w-xl font-light">
              From contemplative smoked woods to sunlit coastal florals, navigate the olfactory families that speak to your essence.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold uppercase tracking-wider text-[#171512] hover:text-[#C59B3F] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Explore All Families</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCENT_FAMILIES_INFO.map((family, idx) => (
            <Link
              key={idx}
              to={`/shop?family=${encodeURIComponent(family.name)}`}
              className="group p-7 bg-white border border-[#171512]/10 hover:border-[#C59B3F] hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-6"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-xs text-[#171512]/50">
                  <span className="font-mono text-xs text-[#C59B3F]">0{idx + 1}</span>
                  <span className="uppercase tracking-widest text-[11px] text-[#171512]/60 font-medium">
                    {family.character}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#171512] group-hover:text-[#C59B3F] transition-colors">
                  {family.name}
                </h3>
                <p className="text-xs text-[#171512]/70 leading-relaxed font-light">
                  {family.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#171512]/10 space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider text-[#171512]/50 block font-medium">
                  Key Notes:
                </span>
                <p className="text-xs text-[#171512] font-medium tracking-wide">
                  {family.commonNotes.join(' · ')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. CLIENT EXPERIENCES FROM ACCRA FRAGRANCE LOVERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
            The Alora Community
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#171512] tracking-tight">
            Loved Across Accra & Ghana
          </h2>
          <p className="text-sm text-[#171512]/70 font-light">
            Real feedback from fragrance enthusiasts who tested our 5ml and 10ml decants before committing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                'I used to waste so much money blind-buying fragrances off TikTok that gave me headaches in Accra heat. Ordering the 5ml decants of Velours Nocturne and Rose & Amber completely changed the game. Both lasted all day!',
              author: 'Nana Ama O.',
              location: 'East Legon, Accra',
              format: '5ml Travel Decants',
            },
            {
              quote:
                'The 10ml decant is pure genius. I get over 150 sprays in a gorgeous glass cylinder with a gold nozzle. The Bergamot & White Cedar stays fresh even after 8 hours in traffic. Shipped same-day via MoMo!',
              author: 'Kofi Mensah',
              location: 'Airport Residential, Accra',
              format: '10ml Deluxe Atomizer',
            },
            {
              quote:
                'Alora Fragrance House is exactly what Ghana needed. The Vetiver & Holy Basil pure perfume oil rollerball has an insane longevity. Also got 10% off with WELCOME10 on my first order. 10/10 service!',
              author: 'Esi Darko',
              location: 'Cantonments, Accra',
              format: 'Pure Perfume Oil & 15ml Decant',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-7 bg-white border border-[#171512]/10 hover:border-[#C59B3F] transition-all flex flex-col justify-between gap-6 shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#C59B3F]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#171512]/80 leading-relaxed font-light italic">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-[#171512]/10 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-[#171512] block">{item.author}</span>
                  <span className="text-[11px] text-[#171512]/50">{item.location}</span>
                </div>
                <span className="text-[10px] font-mono text-[#C59B3F] uppercase">
                  {item.format}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. SCENT JOURNAL ESSAYS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#171512]/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C59B3F]">
              Editorial & Olfactive Literacy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171512] tracking-tight">
              The Scent Journal
            </h2>
            <p className="text-sm text-[#171512]/70 max-w-xl font-light">
              Essays on perfumery science, olfactive literacy, tropical formulation, and wearing scent with intention.
            </p>
          </div>
          <Link
            to="/journal"
            className="text-xs font-semibold uppercase tracking-wider text-[#171512] hover:text-[#C59B3F] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalPreview.map((article) => (
            <Link
              key={article.slug}
              to={`/journal/${article.slug}`}
              className="group flex flex-col bg-white border border-[#171512]/10 hover:border-[#C59B3F] hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#FAF9F5]">
                <img
                  src={article.image}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-[#171512]/50 flex items-center gap-2">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#171512] group-hover:text-[#C59B3F] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#171512]/70 leading-relaxed font-light line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#171512]/10 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#171512] group-hover:text-[#C59B3F] transition-colors">
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 10. GRAND INVITATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#171512] text-[#FAF9F5] p-10 sm:p-20 text-center space-y-8 border border-[#C59B3F]/40 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
              Your Olfactory Signature Awaits
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight leading-tight">
              Begin Your Discovery with 10% Off.
            </h2>
            <p className="text-sm sm:text-base text-[#FAF9F5]/80 leading-relaxed font-light max-w-xl mx-auto">
              Test authentic 5ml, 10ml, and 15ml decants hand-poured in Accra. Use promo code <strong>WELCOME10</strong> at checkout.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/find-your-scent"
              className="w-full sm:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#171512] bg-[#C59B3F] hover:bg-white transition-colors shadow-lg"
            >
              Take 4-Question Scent Quiz
            </Link>
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF9F5] border border-[#FAF9F5]/30 hover:border-white hover:bg-[#FAF9F5]/10 transition-colors"
            >
              Browse Catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
