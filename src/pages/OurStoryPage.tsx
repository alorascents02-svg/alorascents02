import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, Quote, Award, Sparkles, ShieldCheck, Droplets, Layers, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OurStoryPage: React.FC = () => {
  const { siteContent } = useApp();

  const achievements = [
    { value: '3,800+', label: 'Decants & Flacons Hand-Drawn', detail: 'Dispatched safely to fragrance lovers across Ghana' },
    { value: '100%', label: 'Authenticity Guarantee', detail: 'Sourced from genuine original perfume flacons' },
    { value: '3ml · 5ml · 10ml', label: 'Test Wear Formats', detail: 'Evaluate on your skin before buying full bottles' },
    { value: '24–48 hrs', label: 'Accra Courier Dispatch', detail: 'Same-day Greater Accra & nationwide hubs' },
  ];

  const pillars = [
    {
      num: '01',
      title: 'Never Blind-Buy Again',
      desc: 'We bridge the gap between social media perfume reviews and reality. An influencer’s favorite might smell entirely different on your skin or in Accra’s humidity. Test first in 3ml or 5ml decants.',
    },
    {
      num: '02',
      title: 'Sterile Hand-Decanting',
      desc: 'Every decant is drawn with surgical precision using sterile glass pipettes directly from genuine retail bottles into luxury glass atomizers with fine gold spray nozzles.',
    },
    {
      num: '03',
      title: 'Beyond Just Perfumes',
      desc: 'We curate concentrated pure perfume oils (attars) for 12+ hour alcohol-free sillage, fine hydrating body splashes, and pristine full presentation bottles.',
    },
  ];

  const testimonials = [
    {
      quote:
        'I almost spent ₵1,800 on a full bottle after watching YouTube reviews, but bought Alora’s 5ml decant instead. I tested it in Accra’s afternoon heat and realized it wasn’t for me, but their Velours Nocturne decant was pure magic. Alora saved me hundreds of Cedis!',
      author: 'Akosua Mensah',
      role: 'Creative Director · Airport Residential, Accra',
      perfume: 'Velours Nocturne (5ml Travel Decant)',
    },
    {
      quote:
        'Finding a trusted decanter in Ghana who actually sells authentic perfume without dilution was impossible until Alora Fragrance House. The atomizers have real gold fine mists that spray just like the original bottle.',
      author: 'Kwame Osei-Bonsu',
      role: 'Finance Professional · Ridge, Accra',
      perfume: 'Bergamot & White Cedar (10ml Decant)',
    },
    {
      quote:
        'The pure perfume oils are insane in Ghana’s weather! A tiny dab on my neck lasted through a full beach wedding in Laboma. WhatsApp customer service was kind, patient, and knowledgeable.',
      author: 'Nana Ama Prempeh',
      role: 'Architect · Cantonments, Accra',
      perfume: 'Oud & Royal Cashmere Perfume Oil',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* 1. CINEMATIC EDITORIAL HERO */}
      <section className="relative min-h-[65vh] flex items-center bg-[#241C2B] text-[#FAF9F5] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/luxury_decant_bar_aesthetic_1791695150602.jpg"
            alt="Alora Fragrance House luxury perfume decants and flacons"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#241C2B]/95 via-[#241C2B]/80 to-[#241C2B]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241C2B] via-transparent to-[#241C2B]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D68C7C]" />
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#D68C7C]">
                The Alora Fragrance House Story
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-[#FAF9F5] text-balance">
              {siteContent.ourStoryTitle || 'Bridging the gap between online reviews and confident fragrance discovery in Ghana.'}
            </h1>

            <p className="text-base sm:text-lg text-[#FAF9F5]/85 font-light leading-relaxed max-w-xl">
              Alora Fragrance House was established in Accra with an honest mission: to eliminate the fear of expensive blind buys through authentic luxury perfume decants, pure perfume oils, fine body splashes, and sealed full bottles.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#241C2B] bg-[#FAF9F5] hover:bg-[#D68C7C] transition-colors"
              >
                Explore Decants & Bottles
              </Link>
              <Link
                to="/find-your-scent"
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] border border-white/30 hover:border-white transition-colors"
              >
                Take Scent Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ACHIEVEMENTS & TRACTION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 sm:p-12 bg-white border border-[#211D24]/10 shadow-sm">
          {achievements.map((item, idx) => (
            <div key={idx} className="space-y-1 sm:space-y-2 border-l-2 border-[#D68C7C] pl-4 sm:pl-6">
              <span className="font-serif text-3xl sm:text-5xl text-[#241C2B] font-light block tabular-nums">
                {item.value}
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#241C2B] block">
                {item.label}
              </span>
              <span className="text-[11px] text-[#211D24]/60 block font-light leading-snug">
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CHAPTER 01: NOT A FACTORY — A CURATED BRIDGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#D68C7C]">
                Chapter 01 · Purpose
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#241C2B] tracking-tight leading-tight">
                We Are Not A Factory. We Are Your Fragrance Sanctuary.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#211D24]/80 leading-relaxed font-light">
              {siteContent.ourStoryText1 ||
                'We are not a perfume factory compounding generic chemicals. Alora Fragrance House was created right here in Accra because we experienced the exact same frustration every fragrance enthusiast in Ghana faces: you watch an exciting perfume review on TikTok, Instagram, or YouTube, spend hundreds or thousands of Ghanaian Cedis on a full bottle without smelling it, only to realize it doesn’t fit your skin chemistry or simply vanishes in Accra’s humidity.'}
            </p>

            <p className="text-sm sm:text-base text-[#211D24]/80 leading-relaxed font-light">
              {siteContent.ourStoryText2 ||
                'Alora Fragrance House bridges this gap. We procure 100% authentic designer and niche bottles and offer them in convenient 3ml, 5ml, and 10ml travel decants. This empowers you to wear the real perfume for several days, testing top notes, heart transitions, and base longevity in Ghana’s tropical heat before making any big commitment.'}
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#241C2B] font-semibold">
              <Check className="w-4 h-4 text-[#D68C7C]" />
              <span>100% Genuine Perfumes · Sterile Hand-Decanting · Zero Dilution</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-4/3 overflow-hidden bg-[#EAE6DF] border border-[#211D24]/10 shadow-xl">
            <img
              src="/src/assets/images/luxury_perfume_decants_1791695120764.jpg"
              alt="Alora Fragrance House luxury perfume decants on stone slab"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 p-4 border border-[#211D24]/10 text-xs text-[#241C2B]">
              <span className="font-serif text-base block font-medium">Hand-Decanted Luxury Vials</span>
              <span className="text-[#211D24]/60 text-[11px]">3ml, 5ml, and 10ml travel atomizers with gold spray nozzles</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHAPTER 02: COMPLETE FRAGRANCE PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#211D24]/10 p-8 sm:p-14 lg:p-20 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#D68C7C]">
              Chapter 02 · The Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#241C2B] tracking-tight">
              What You Find At Alora Fragrance House
            </h2>
            <p className="text-sm text-[#211D24]/75 font-light leading-relaxed">
              We cater to every scent ritual and budget with four distinct authentic formats:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((item) => (
              <div key={item.num} className="p-8 bg-white border border-[#211D24]/10 space-y-3 shadow-xs">
                <span className="font-serif text-3xl text-[#D68C7C] block font-light">{item.num}</span>
                <h3 className="font-serif text-xl text-[#241C2B]">{item.title}</h3>
                <p className="text-xs text-[#211D24]/70 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Product format breakdown grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            <div className="p-5 bg-white border border-[#211D24]/10 space-y-2">
              <Droplets className="w-5 h-5 text-[#D68C7C]" />
              <h4 className="font-serif text-base font-semibold text-[#241C2B]">Perfume Decants</h4>
              <p className="text-xs text-[#211D24]/70">3ml (40 sprays), 5ml (75 sprays), and 10ml (150 sprays) glass atomizers for test wearing.</p>
              <span className="text-[11px] font-mono text-[#D68C7C] font-semibold block">From GH₵ 30</span>
            </div>

            <div className="p-5 bg-white border border-[#211D24]/10 space-y-2">
              <Sparkles className="w-5 h-5 text-[#D68C7C]" />
              <h4 className="font-serif text-base font-semibold text-[#241C2B]">Pure Perfume Oils</h4>
              <p className="text-xs text-[#211D24]/70">Concentrated, alcohol-free Attar oils for deep pulse-point sillage that lasts 12+ hours.</p>
              <span className="text-[11px] font-mono text-[#D68C7C] font-semibold block">From GH₵ 60</span>
            </div>

            <div className="p-5 bg-white border border-[#211D24]/10 space-y-2">
              <Layers className="w-5 h-5 text-[#D68C7C]" />
              <h4 className="font-serif text-base font-semibold text-[#241C2B]">Fine Body Splashes</h4>
              <p className="text-xs text-[#211D24]/70">Hydrating, airy fragrance mists in generous 250ml flacons for everyday freshness.</p>
              <span className="text-[11px] font-mono text-[#D68C7C] font-semibold block">From GH₵ 90</span>
            </div>

            <div className="p-5 bg-white border border-[#211D24]/10 space-y-2">
              <Award className="w-5 h-5 text-[#D68C7C]" />
              <h4 className="font-serif text-base font-semibold text-[#241C2B]">Full Retail Bottles</h4>
              <p className="text-xs text-[#211D24]/70">Factory-sealed 50ml and 100ml flacons in original packaging for your permanent collection.</p>
              <span className="text-[11px] font-mono text-[#D68C7C] font-semibold block">From GH₵ 310</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#D68C7C]">
            Collector Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#241C2B] tracking-tight">
            Loved Across Ghana
          </h2>
          <p className="text-sm text-[#211D24]/70 font-light">
            Read how Alora Fragrance House helps Ghanaian shoppers discover signature scents without blind-buy regrets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-white border border-[#211D24]/10 flex flex-col justify-between gap-6 shadow-xs hover:border-[#241C2B] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#D68C7C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-base text-[#241C2B] leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#211D24]/10 space-y-1">
                <span className="font-medium text-xs text-[#241C2B] block">{item.author}</span>
                <span className="text-[11px] text-[#211D24]/60 block">{item.role}</span>
                <span className="text-[11px] font-mono text-[#D68C7C] font-semibold block pt-1">{item.perfume}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#241C2B] text-[#FAF9F5] p-10 sm:p-20 text-center space-y-8 border border-[#241C2B]">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#D68C7C]">
              Begin Sampling Today
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight">
              Test Before You Commit
            </h2>
            <p className="text-sm text-[#FAF9F5]/75 font-light leading-relaxed">
              Browse our verified catalogue of 3ml, 5ml, and 10ml decants, or take our 8-step scent quiz for personalized recommendations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/shop?type=decants"
              className="w-full sm:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#241C2B] bg-[#FAF9F5] hover:bg-[#D68C7C] transition-colors"
            >
              Shop Perfume Decants
            </Link>
            <Link
              to="/find-your-scent"
              className="w-full sm:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF9F5] border border-[#FAF9F5]/30 hover:border-[#FAF9F5] hover:bg-[#FAF9F5]/10 transition-colors"
            >
              Take Scent Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
