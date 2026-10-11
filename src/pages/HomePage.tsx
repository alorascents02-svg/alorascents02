import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, BookOpen, Clock, Check, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { SCENT_FAMILIES_INFO } from '../data/products';
import { JOURNAL_ARTICLES } from '../data/journal';

export const HomePage: React.FC = () => {
  const { publishedProducts, siteContent } = useApp();

  // Curate 3 featured signature fragrances
  const featuredProducts = publishedProducts.slice(0, 3);
  const journalPreview = JOURNAL_ARTICLES.slice(0, 3);

  const headline = siteContent.heroHeadline || 'Smell beyond the ordinary.';
  const subtitle = siteContent.heroSubtitle || 'Fragrance is personal. Finding yours should be, too.';
  const subcopy =
    siteContent.heroSubcopy ||
    'Discover thoughtfully curated fragrances, explore your preferences, and find scents that feel unmistakably you.';
  const primaryCta = siteContent.heroPrimaryCta || 'Discover Your Scent';
  const secondaryCta = siteContent.heroSecondaryCta || 'Explore Fragrances';

  return (
    <div className="space-y-28 sm:space-y-36 pb-20">
      {/* 1. FULL-WIDTH LUXURY FRAGRANCE CAMPAIGN HERO */}
      <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center bg-[#171512] text-[#FAF9F5] overflow-hidden">
        {/* Immersive Campaign Background Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_luxury_perfume_editorial_1791688544047.jpg"
            alt="House of ALORA Luxury Fragrance Campaign"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center lg:object-[center_35%] scale-102 transition-transform duration-1000 ease-out"
          />
          {/* Measured Luxury Scrim: Deep Chiaroscuro Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#171512]/92 via-[#171512]/75 to-transparent sm:to-[#171512]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171512] via-transparent to-[#171512]/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-2xl space-y-8">
            {/* Quiet Editorial Kicker */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C59B3F]" />
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
                House of ALORA · High Perfumery
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#FAF9F5] text-balance">
                {headline}
              </h1>
              <p className="font-serif italic text-xl sm:text-2xl text-[#FAF9F5]/90 leading-relaxed font-normal">
                {subtitle}
              </p>
            </div>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-[#FAF9F5]/75 leading-relaxed max-w-xl font-light">
              {subcopy}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                to="/find-your-scent"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#171512] bg-[#FAF9F5] hover:bg-[#C59B3F] hover:text-[#171512] transition-all duration-300 shadow-lg shadow-black/20"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF9F5] border border-[#FAF9F5]/30 hover:border-[#FAF9F5] hover:bg-[#FAF9F5]/10 transition-all duration-300"
              >
                <span>{secondaryCta}</span>
              </Link>
            </div>

            {/* Hallmark Strip */}
            <div className="pt-8 border-t border-[#FAF9F5]/15 grid grid-cols-3 gap-6 text-[#FAF9F5]/80 text-xs">
              <div>
                <span className="font-serif text-base block text-[#FAF9F5]">Verified Notes</span>
                <span className="text-[11px] text-[#FAF9F5]/60">100% Pyramid Transparency</span>
              </div>
              <div>
                <span className="font-serif text-base block text-[#FAF9F5]">Tropical Longevity</span>
                <span className="text-[11px] text-[#FAF9F5]/60">8–12 Hour Presence in Ghana</span>
              </div>
              <div>
                <span className="font-serif text-base block text-[#FAF9F5]">Same-Day Courier</span>
                <span className="text-[11px] text-[#FAF9F5]/60">Accra & Nationwide Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL FRAGRANCE DISCOVERY & DECANT BRIDGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Atmospheric Decant & Perfume Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 sm:aspect-5/4 overflow-hidden bg-[#FAF9F5] border border-[#171512]/10 shadow-xl">
              <img
                src="/src/assets/images/luxury_decant_bar_aesthetic_1791695150602.jpg"
                alt="Alora Fragrance House luxury perfume decanting bar and flacons"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#D68C7C] font-semibold block">
                  Authentic Hand-Decanting
                </span>
                <p className="font-serif text-lg leading-snug mt-1">
                  Drawn directly from original flacons into travel atomizers with gold nozzles.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#D68C7C]">
                The Alora Fragrance House Standard
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#171512] leading-tight">
                {siteContent.missionHeadline || 'Never blind-buy from an online review. Test with authentic decants first.'}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#171512]/75 leading-relaxed font-light">
              {siteContent.missionText ||
                'Alora Fragrance House was founded in Accra to bridge the gap between watching glowing fragrance reviews on social media and risking an expensive blind buy on a full bottle. We hand-decant 100% genuine luxury perfumes into travel atomizers (3ml, 5ml, 10ml), alongside authentic concentrated perfume oils, fine body splashes, and sealed full flacons.'}
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#171512]/80">
              <div className="flex items-start gap-3 p-4 bg-white border border-[#171512]/10">
                <Check className="w-4 h-4 text-[#D68C7C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#171512] block">3ml · 5ml · 10ml Decants</span>
                  <span className="text-[#171512]/60">Sample on your skin before committing to a full bottle.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white border border-[#171512]/10">
                <Check className="w-4 h-4 text-[#D68C7C]" />
                <div>
                  <span className="font-semibold text-[#171512] block">Oils, Splashes & Bottles</span>
                  <span className="text-[#171512]/60">Pure attar oils, fine mists, and authentic retail flacons.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                to="/shop?type=decants"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#241C2B] hover:bg-[#D68C7C] transition-colors"
              >
                Browse Decants
              </Link>
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#171512] hover:text-[#D68C7C] transition-colors"
              >
                <span>Our Decanting Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY SCENT FAMILY */}
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
            className="text-xs font-semibold uppercase tracking-wider text-[#171512] hover:text-[#C59B3F] transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
          >
            <span>View All Fragrances</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCENT_FAMILIES_INFO.map((family, idx) => (
            <Link
              key={idx}
              to={`/shop?family=${encodeURIComponent(family.name)}`}
              className="group p-7 bg-white border border-[#171512]/10 hover:border-[#171512] hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-6"
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
                <span className="text-[11px] uppercase tracking-wider text-[#171512]/50 block">Key Notes:</span>
                <p className="text-xs text-[#171512] font-medium tracking-wide">
                  {family.commonNotes.join(' · ')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. CURATED COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#171512]/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C59B3F]">
              Curated Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171512] tracking-tight">
              Verified Signature Creations
            </h2>
            <p className="text-sm text-[#171512]/70 max-w-xl font-light">
              Hand-selected compositions evaluated for balance, radiance, and longevity in West African warmth.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold uppercase tracking-wider text-[#171512] hover:text-[#C59B3F] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Explore Full Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. PERSONALIZED FRAGRANCE QUIZ PROMOTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#171512] text-[#FAF9F5] p-8 sm:p-14 lg:p-16 border border-[#171512] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C59B3F]" />
                <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
                  Bespoke Consultation
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                Not sure where to begin? Take the 8-step Fragrance Quiz.
              </h2>
              <p className="text-sm sm:text-base text-[#FAF9F5]/75 leading-relaxed font-light max-w-xl">
                Answer eight guided questions about your lifestyle, preferred scent notes, intensity comfort, and Ghanaian Cedi budget. Our matching engine pairs you with your ideal olfactory profile in under two minutes.
              </p>

              {/* Consultation Steps preview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 bg-[#FAF9F5]/5 border border-[#FAF9F5]/10">
                  <span className="text-[#C59B3F] font-mono text-[11px] block">01 · Purpose</span>
                  <span className="font-medium text-[#FAF9F5]">Daily or Evening</span>
                </div>
                <div className="p-3 bg-[#FAF9F5]/5 border border-[#FAF9F5]/10">
                  <span className="text-[#C59B3F] font-mono text-[11px] block">02 · Palette</span>
                  <span className="font-medium text-[#FAF9F5]">Woody to Floral</span>
                </div>
                <div className="p-3 bg-[#FAF9F5]/5 border border-[#FAF9F5]/10">
                  <span className="text-[#C59B3F] font-mono text-[11px] block">03 · Aura</span>
                  <span className="font-medium text-[#FAF9F5]">Intimate or Bold</span>
                </div>
                <div className="p-3 bg-[#FAF9F5]/5 border border-[#FAF9F5]/10">
                  <span className="text-[#C59B3F] font-mono text-[11px] block">04 · Match</span>
                  <span className="font-medium text-[#FAF9F5]">Top 3 Curations</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/find-your-scent"
                  className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#171512] bg-[#FAF9F5] hover:bg-[#C59B3F] transition-colors"
                >
                  <span>Start Fragrance Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Visual Quiz Card Accent */}
            <div className="lg:col-span-5 relative aspect-4/3 w-full bg-[#29241E] overflow-hidden border border-[#FAF9F5]/10 shadow-2xl">
              <img
                src="/src/assets/images/fragrance_rose_amber_1791638079597.jpg"
                alt="Rose and Amber Wood flacon consultation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-[#C59B3F] font-mono">
                  Personalized Profile
                </span>
                <p className="font-serif text-xl">Find the perfume that mirrors your character.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE ALORA PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C59B3F]">
            The ALORA Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#171512] tracking-tight">
            How House of ALORA Operates
          </h2>
          <p className="text-sm text-[#171512]/70 font-light">
            Shopping for luxury perfume online in Ghana should be transparent, verified, and effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 p-8 bg-white border border-[#171512]/10 hover:border-[#171512] transition-colors">
            <span className="font-serif text-4xl text-[#C59B3F] block font-light">01.</span>
            <h3 className="font-serif text-2xl text-[#171512]">Discover & Compare</h3>
            <p className="text-xs text-[#171512]/70 leading-relaxed font-light">
              {siteContent.howItWorksStep1 ||
                'Browse our transparent notes database, take the 8-step quiz, or compare up to three fragrances side-by-side to understand longevity, sillage, and character.'}
            </p>
          </div>

          <div className="space-y-4 p-8 bg-white border border-[#171512]/10 hover:border-[#171512] transition-colors">
            <span className="font-serif text-4xl text-[#C59B3F] block font-light">02.</span>
            <h3 className="font-serif text-2xl text-[#171512]">WhatsApp Concierge</h3>
            <p className="text-xs text-[#171512]/70 leading-relaxed font-light">
              {siteContent.howItWorksStep2 ||
                'Connect directly with our Accra fragrance team via WhatsApp for personalized guidance, scent layering tips, or custom order arrangements.'}
            </p>
          </div>

          <div className="space-y-4 p-8 bg-white border border-[#171512]/10 hover:border-[#171512] transition-colors">
            <span className="font-serif text-4xl text-[#C59B3F] block font-light">03.</span>
            <h3 className="font-serif text-2xl text-[#171512]">Direct Courier Dispatch</h3>
            <p className="text-xs text-[#171512]/70 leading-relaxed font-light">
              {siteContent.howItWorksStep3 ||
                'Safe packaging and swift courier dispatch across Greater Accra, Kumasi, Takoradi, and nationwide courier hubs across Ghana.'}
            </p>
          </div>
        </div>
      </section>

      {/* 7. THE SCENT JOURNAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#171512]/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C59B3F]">
              Editorial & Literacy
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
              className="group flex flex-col bg-white border border-[#171512]/10 hover:border-[#171512] hover:shadow-lg transition-all duration-300"
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

      {/* 8. ELEGANT FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#171512] text-[#FAF9F5] p-10 sm:p-20 text-center space-y-8 relative overflow-hidden border border-[#171512]">
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
              Begin Your Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight leading-tight">
              {siteContent.philosophyHeadline || 'Ready to find a signature scent that stays with you?'}
            </h2>
            <p className="text-sm sm:text-base text-[#FAF9F5]/75 leading-relaxed font-light max-w-xl mx-auto">
              {siteContent.philosophyText ||
                'Begin with our guided discovery quiz or explore the verified collection. Accessible luxury crafted for real presence.'}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/find-your-scent"
              className="w-full sm:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#171512] bg-[#FAF9F5] hover:bg-[#C59B3F] transition-colors"
            >
              Start Scent Quiz
            </Link>
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF9F5] border border-[#FAF9F5]/30 hover:border-[#FAF9F5] hover:bg-[#FAF9F5]/10 transition-colors"
            >
              Browse Catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
