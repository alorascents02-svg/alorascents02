import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Sparkles, ShoppingBag, ShieldCheck, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    description: string;
    tag: string;
    iconText: string;
    familyTarget?: string;
  }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: 'The Aura & Presence',
    subtitle: 'What feeling or mood do you want your fragrance to radiate when you enter a room?',
    options: [
      {
        id: 'aura_woody',
        label: 'Bold, Seductive & Mysterious',
        description: 'Deep smoked cedarwood, nocturnal fig, and bourbon amber with rich projection.',
        tag: 'Warm Woody · Extrait',
        iconText: '01',
        familyTarget: 'Warm Woody',
      },
      {
        id: 'aura_fresh',
        label: 'Crisp, Clean & Effortlessly Refined',
        description: 'Sun-ripened Italian bergamot, neroli, and marine sea salt tailored for elegance.',
        tag: 'Fresh Citrus · Aquatic',
        iconText: '02',
        familyTarget: 'Fresh Citrus & Aquatic',
      },
      {
        id: 'aura_gourmand',
        label: 'Warm, Velvety & Decadent Gourmand',
        description: 'Sun-drenched Tahitian vanilla bean, toasted coconut, and golden tonka comfort.',
        tag: 'Amber & Gourmand',
        iconText: '03',
        familyTarget: 'Amber & Gourmand',
      },
      {
        id: 'aura_floral',
        label: 'Radiant, Floriental & Royal',
        description: 'Damask rose petals infused with spicy saffron and luminous cashmere wood.',
        tag: 'Crisp Floral · Amber',
        iconText: '04',
        familyTarget: 'Crisp Floral',
      },
    ],
  },
  {
    id: 2,
    title: 'Occasion & Climate Resilience',
    subtitle: 'Where and in what environment will you wear this fragrance most often?',
    options: [
      {
        id: 'occ_day',
        label: 'Accra Sunny Heat & Daily Commute',
        description: 'Formulations engineered with mineral sea salt and cedarwood to resist evaporation in tropical humidity.',
        tag: 'High Humidity Resilience',
        iconText: '01',
      },
      {
        id: 'occ_evening',
        label: 'Intimate Evening Dates & Dinners',
        description: 'Magnetic compositions with intoxicating sillage and deep base fixation that linger in close quarters.',
        tag: 'Seductive Nightlife',
        iconText: '02',
      },
      {
        id: 'occ_office',
        label: 'Executive Boardroom & Daily Signature',
        description: 'Polished, authoritative without being cloying or intrusive in air-conditioned spaces.',
        tag: 'Corporate & Formal',
        iconText: '03',
      },
      {
        id: 'occ_weekend',
        label: 'Casual Weekend & Coastal Outings',
        description: 'Uplifting, breezy compositions ideal for Ada, Labadi beach days, or brunch with friends.',
        tag: 'Relaxed & Breezy',
        iconText: '04',
      },
    ],
  },
  {
    id: 3,
    title: 'Coveted Note Accords',
    subtitle: 'Which raw perfumery notes instinctively attract your senses?',
    options: [
      {
        id: 'notes_wood_amber',
        label: 'Smoked Cedarwood, Sandalwood & Bourbon Amber',
        description: 'Grounding, rich resins, dry Australian sandalwood, and aged papyrus.',
        tag: 'Woods & Balsams',
        iconText: '01',
        familyTarget: 'Warm Woody',
      },
      {
        id: 'notes_citrus_marine',
        label: 'Zesty Bergamot, Mint Leaf & Mineral Sea Salt',
        description: 'Invigorating Mediterranean citrus balanced by crisp Virginia cedar.',
        tag: 'Citrus & Marine',
        iconText: '02',
        familyTarget: 'Fresh Citrus & Aquatic',
      },
      {
        id: 'notes_vanilla_tonka',
        label: 'Tahitian Vanilla Pods, Toasted Coconut & Caramel',
        description: 'Edible sweetness counterbalanced by solar jasmine and warm golden sand.',
        tag: 'Gourmand Sweet',
        iconText: '03',
        familyTarget: 'Amber & Gourmand',
      },
      {
        id: 'notes_rose_saffron',
        label: 'Crimson Damask Rose, Saffron & Atlas Cedar',
        description: 'Spicy floral luxury with velvety white musk and Madagascar vanilla.',
        tag: 'Floriental Rose',
        iconText: '04',
        familyTarget: 'Crisp Floral',
      },
    ],
  },
  {
    id: 4,
    title: 'Your Preferred Format',
    subtitle: 'How would you like to experience your curated fragrance first?',
    options: [
      {
        id: 'fmt_5ml',
        label: '5ml Discovery Travel Decant',
        description: 'Approx. 75 sprays · 10–14 days test wear · Pocket atomizer with gold mist nozzle. Perfect zero-risk trial.',
        tag: 'Most Popular Trial · From GH₵ 55',
        iconText: '5ml',
      },
      {
        id: 'fmt_10ml',
        label: '10ml Deluxe Atomizer',
        description: 'Approx. 150 sprays · 30 days wear · Sleek glass cylinder for your monthly fragrance rotation.',
        tag: 'Monthly Signature · From GH₵ 95',
        iconText: '10ml',
      },
      {
        id: 'fmt_15ml',
        label: '15ml Luxury Pocket Flacon',
        description: 'Approx. 225 sprays · 60 days signature wear · Generous luxury atomizer with heavy cap.',
        tag: 'Seasonal Rotation · From GH₵ 135',
        iconText: '15ml',
      },
      {
        id: 'fmt_full',
        label: 'Full Flacon (50ml / 100ml) or Pure Oil',
        description: 'Sealed original retail presentation flacon or 100% concentrated pure perfume attar oil.',
        tag: 'Full Bottle / Attar Oil · From GH₵ 160',
        iconText: 'Full',
      },
    ],
  },
];

export const FindYourScentPage: React.FC = () => {
  const { publishedProducts, addToCart, appliedPromoCode, applyPromoCode } = useApp();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({
    1: 'aura_woody',
    2: 'occ_evening',
    3: 'notes_wood_amber',
    4: 'fmt_5ml',
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const currentQuestion = QUIZ_QUESTIONS[currentStep - 1];

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentStep]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Determine top matched products based on question 1 & 3
  const getMatchedProducts = (): { product: Product; decantSize: string; decantPrice: number; rationale: string }[] => {
    const q1Answer = selectedAnswers[1];
    const q4Answer = selectedAnswers[4];

    let targetSize = '5ml Travel Decant';
    if (q4Answer === 'fmt_10ml') targetSize = '10ml Deluxe Decant';
    if (q4Answer === 'fmt_15ml') targetSize = '15ml Pocket Flacon';
    if (q4Answer === 'fmt_full') targetSize = 'Full Bottle';

    let primaryFamily = 'Warm Woody';
    if (q1Answer === 'aura_fresh') primaryFamily = 'Fresh Citrus & Aquatic';
    if (q1Answer === 'aura_gourmand') primaryFamily = 'Amber & Gourmand';
    if (q1Answer === 'aura_floral') primaryFamily = 'Crisp Floral';

    const matched = publishedProducts.filter((p) => p.fragranceFamily === primaryFamily);
    const fallbacks = publishedProducts.filter((p) => p.fragranceFamily !== primaryFamily);
    const combined = [...matched, ...fallbacks].slice(0, 3);

    return combined.map((p) => {
      const option =
        p.decantOptions?.find((d) => d.size.includes(targetSize.slice(0, 4))) ||
        p.decantOptions?.[0] || { size: p.size, price: p.price };

      let rationale = 'Perfect match for your olfactory aura preference.';
      if (p.fragranceFamily === 'Warm Woody') {
        rationale = 'Smoked cedar, velvety black fig, and bourbon vanilla provide exceptional evening drydown.';
      } else if (p.fragranceFamily === 'Fresh Citrus & Aquatic') {
        rationale = 'Engineered with mineral sea salt and crisp Virginia cedar for resilient longevity in Accra heat.';
      } else if (p.fragranceFamily === 'Crisp Floral') {
        rationale = 'Crimson damask rose infused with warm golden amber and saffron for royal presence.';
      } else if (p.fragranceFamily === 'Amber & Gourmand') {
        rationale = 'Tahitian vanilla bean and toasted coconut deliver cozy, velvety radiance.';
      }

      return {
        product: p,
        decantSize: option.size,
        decantPrice: option.price,
        rationale,
      };
    });
  };

  const handleAddDecantToCart = (p: Product, size: string, price: number) => {
    addToCart(p, 1, size, price);
    const key = `${p.id}-${size}`;
    setAddedMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [key]: false }));
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      {/* Quiz Progress & Header */}
      {!isCompleted ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#211D24]/10 pb-4">
            <Link
              to="/"
              className="text-xs uppercase tracking-wider font-semibold text-[#211D24]/60 hover:text-[#241C2B] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#C59B3F] font-semibold">
                Question {currentStep} of 4
              </span>
            </div>
          </div>

          {/* 4-Step Progress Indicator */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {QUIZ_QUESTIONS.map((q) => (
              <div
                key={q.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  q.id <= currentStep ? 'bg-[#C59B3F]' : 'bg-[#211D24]/15'
                }`}
              />
            ))}
          </div>

          {/* Question Title */}
          <div className="space-y-2 text-center max-w-xl mx-auto pt-4">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
              4-Question Scent Quiz · Step 0{currentStep}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#171512] tracking-tight">
              {currentQuestion.title}
            </h1>
            <p className="text-sm text-[#171512]/70 leading-relaxed font-light">
              {currentQuestion.subtitle}
            </p>
          </div>

          {/* 4 Cards Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedAnswers[currentStep] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-6 text-left border transition-all duration-200 flex flex-col justify-between gap-4 group ${
                    isSelected
                      ? 'border-[#C59B3F] bg-white shadow-lg ring-1 ring-[#C59B3F]'
                      : 'border-[#171512]/10 bg-white hover:border-[#171512]/40 hover:shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#C59B3F] font-semibold">
                        {opt.iconText}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#171512]/50 font-medium">
                        {opt.tag}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-[#171512] group-hover:text-[#C59B3F] transition-colors leading-snug">
                      {opt.label}
                    </h3>
                    <p className="text-xs text-[#171512]/70 leading-relaxed font-light">
                      {opt.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#171512]/10 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#171512]/60">
                      {isSelected ? 'Selected' : 'Choose option'}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-[#C59B3F] border-[#C59B3F] text-[#171512]'
                          : 'border-[#171512]/20 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-[#171512]/10">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#171512] disabled:opacity-30 hover:bg-[#171512]/5 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#171512] hover:bg-[#C59B3F] hover:text-[#171512] transition-colors flex items-center gap-2 shadow-md"
            >
              <span>{currentStep === 4 ? 'Reveal My Decant Matches' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-10">
          {/* Results Header */}
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#C59B3F]/20 border border-[#C59B3F]/40 flex items-center justify-center text-[#C59B3F] mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
              Your Olfactory Profile Matched
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#171512] tracking-tight">
              Your Curated Decant Wardrobe
            </h1>
            <p className="text-sm text-[#171512]/75 leading-relaxed font-light">
              Based on your answers, here are your top 3 fragrance recommendations hand-poured in Accra. Test wear them on your skin before committing to a full flacon.
            </p>
          </div>

          {/* Promo code callout banner */}
          <div className="p-4 bg-[#171512] text-[#FAF9F5] flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#C59B3F]/30 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C59B3F] text-[#171512] flex items-center justify-center font-bold text-xs">
                10%
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#C59B3F] block">
                  First Order Exclusive
                </span>
                <span className="text-xs text-[#FAF9F5]/80">
                  Use promo code <strong>WELCOME10</strong> at checkout for 10% off your decants.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => applyPromoCode('WELCOME10')}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#C59B3F] text-[#171512] hover:bg-[#FAF9F5] transition-colors shrink-0"
            >
              {appliedPromoCode === 'WELCOME10' ? 'Promo Applied!' : 'Apply Code WELCOME10'}
            </button>
          </div>

          {/* Matched Products Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getMatchedProducts().map((match, idx) => {
              const { product, decantSize, decantPrice, rationale } = match;
              const isAdded = addedMap[`${product.id}-${decantSize}`];

              return (
                <div
                  key={product.id}
                  className="bg-white border border-[#171512]/10 hover:border-[#C59B3F] transition-all flex flex-col justify-between shadow-md"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-4/3 w-full bg-[#FAF9F5] overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#171512]/90 text-[#FAF9F5] text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider">
                        Match 0{idx + 1}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-2 text-[11px] text-[#171512]">
                        <span className="font-semibold block">{decantSize}</span>
                        <span className="font-mono text-[#C59B3F] font-bold">GH₵ {decantPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5 space-y-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#171512]/50 font-medium block">
                          {product.fragranceFamily}
                        </span>
                        <h3 className="font-serif text-xl text-[#171512] mt-0.5">
                          {product.name}
                        </h3>
                      </div>

                      <p className="text-xs text-[#171512]/75 leading-relaxed font-light">
                        {rationale}
                      </p>

                      <div className="pt-2 border-t border-[#171512]/10 space-y-1 text-[11px] text-[#171512]/70">
                        <span className="font-medium text-[#171512] block">Notes:</span>
                        <span>{product.notes.top.slice(0, 2).join(', ')} · {product.notes.heart.slice(0, 2).join(', ')} · {product.notes.base.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 space-y-2">
                    <button
                      type="button"
                      onClick={() => handleAddDecantToCart(product, decantSize, decantPrice)}
                      className={`w-full py-3 px-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#171512] text-[#FAF9F5] hover:bg-[#C59B3F] hover:text-[#171512]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added {decantSize}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add {decantSize} (GH₵ {decantPrice})</span>
                        </>
                      )}
                    </button>

                    <Link
                      to={`/shop/${product.slug}`}
                      className="block text-center text-[11px] font-semibold uppercase tracking-wider text-[#171512]/70 hover:text-[#C59B3F] py-1"
                    >
                      View Full Details & Pyramids
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Navigation */}
          <div className="pt-8 border-t border-[#171512]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                setIsCompleted(false);
                setCurrentStep(1);
              }}
              className="text-xs uppercase tracking-wider font-semibold text-[#171512]/60 hover:text-[#171512] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake 4-Question Quiz</span>
            </button>

            <div className="flex items-center gap-3">
              <Link
                to="/shop"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#171512] border border-[#171512]/20 hover:border-[#171512] transition-colors"
              >
                Browse All Decants
              </Link>
              <Link
                to="/cart"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#171512] hover:bg-[#C59B3F] hover:text-[#171512] transition-colors flex items-center gap-1.5"
              >
                <span>View Bag & Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
