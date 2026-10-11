import React, { useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { RotateCcw, Check, ShoppingBag, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateFragranceRecommendations } from '../services/recommendationEngine';
import { QuizAnswers } from '../types';
import { WhatsAppOrderButton } from '../components/WhatsAppOrderButton';

export const ScentResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { publishedProducts, quizWeights, addToCart, userPreferences } = useApp();

  const answers: QuizAnswers =
    (location.state as any)?.quizAnswers || userPreferences.savedQuizAnswers || {
      purpose: 'everyday',
      preferredFamilies: ['Warm Woody', 'Crisp Floral'],
      preferredNotes: ['Cedarwood', 'Vanilla'],
      dislikedNotes: [],
      occasions: ['Daily Signature'],
      intensity: 'moderate',
      budgetGHS: 400,
      familiarity: 'curious',
    };

  const recommendations = useMemo(() => {
    return calculateFragranceRecommendations(publishedProducts, answers, quizWeights);
  }, [publishedProducts, answers, quizWeights]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          Deterministic Olfactory Analysis
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#241C2B] tracking-tight">
          Your Fragrance Matches
        </h1>
        <p className="text-xs sm:text-sm text-[#211D24]/75">
          Based on your preferred families, verified notes, GH₵ {answers.budgetGHS} budget ceiling, and projection comfort.
        </p>
      </div>

      {/* Results List */}
      {recommendations.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {recommendations.map((rec, index) => {
              const { product, matchScore, matchBreakdown, reasoning, matchingNotes } = rec;
              return (
                <div
                  key={product.id}
                  className={`bg-white border flex flex-col justify-between transition-all duration-200 ${
                    index === 0
                      ? 'border-[#241C2B] ring-1 ring-[#241C2B]/10 shadow-lg'
                      : 'border-[#211D24]/10 shadow-sm'
                  }`}
                >
                  {/* Top Match Ribbon */}
                  {index === 0 && (
                    <div className="bg-[#241C2B] text-[#F5F2EE] text-[11px] font-semibold uppercase tracking-wider py-1.5 px-4 text-center">
                      Top Olfactory Match
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-4/3 w-full bg-[#EAE6DF] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 text-xs font-mono font-bold text-[#241C2B] tabular-nums border border-[#211D24]/10">
                      {matchScore}% Match
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="text-xs uppercase tracking-wider text-[#211D24]/60">
                        <span>{product.brand}</span> · <span>{product.fragranceFamily}</span>
                      </div>

                      <Link to={`/shop/${product.slug}`}>
                        <h3 className="font-serif text-2xl text-[#241C2B] hover:text-[#D68C7C] transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-baseline justify-between pt-1">
                        <span className="font-mono text-xl font-bold text-[#241C2B] tabular-nums">
                          GH₵ {product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-[#211D24]/60">{product.size}</span>
                      </div>

                      <p className="text-xs text-[#211D24]/75 leading-relaxed line-clamp-3">
                        {product.shortDescription}
                      </p>

                      {/* Attribute Match Breakdown */}
                      <div className="pt-4 border-t border-[#211D24]/10 space-y-2">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#241C2B] block">
                          Match Criteria Breakdown:
                        </span>
                        <div className="space-y-1.5 text-[11px] text-[#211D24]/70">
                          <div className="flex justify-between">
                            <span>Scent Family (30%)</span>
                            <span className="font-mono tabular-nums">{matchBreakdown.family}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Verified Notes (20%)</span>
                            <span className="font-mono tabular-nums">{matchBreakdown.notes}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Occasion Fit (15%)</span>
                            <span className="font-mono tabular-nums">{matchBreakdown.occasion}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Budget Alignment (20%)</span>
                            <span className="font-mono tabular-nums">{matchBreakdown.budget}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Intensity Match (15%)</span>
                            <span className="font-mono tabular-nums">{matchBreakdown.intensity}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Transparent Reasoning */}
                      <div className="pt-3 border-t border-[#211D24]/10 space-y-1.5">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#241C2B] block">
                          Why This Matched:
                        </span>
                        <ul className="space-y-1 text-xs text-[#211D24]/80">
                          {reasoning.map((r, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#D68C7C] shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-[#211D24]/10 space-y-2.5">
                      <button
                        type="button"
                        onClick={() => addToCart(product, 1)}
                        className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Shopping Bag</span>
                      </button>

                      <WhatsAppOrderButton
                        product={product}
                        className="w-full"
                        label="Inquire via WhatsApp"
                      />

                      <Link
                        to={`/shop/${product.slug}`}
                        className="block text-center text-xs uppercase tracking-wider font-semibold text-[#211D24] hover:text-[#D68C7C] pt-1"
                      >
                        View Full Fragrance Profile →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Retake & Explore Links */}
          <div className="p-6 bg-[#FAF8F5] border border-[#211D24]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="font-serif text-lg text-[#241C2B] block">Want to adjust your criteria?</span>
              <span className="text-xs text-[#211D24]/70">You can retake the quiz anytime with new notes or an updated budget.</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/find-your-scent"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#241C2B] border border-[#241C2B]/30 hover:border-[#241C2B]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B]"
              >
                <span>Browse All</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="max-w-xl mx-auto py-16 text-center space-y-6 bg-white border border-[#211D24]/10 p-8">
          <AlertCircle className="w-10 h-10 text-[#D68C7C] mx-auto" />
          <h2 className="font-serif text-3xl text-[#241C2B]">No Precise Match Found</h2>
          <p className="text-sm text-[#211D24]/75 leading-relaxed">
            Your criteria (such as excluded notes or strict budget ceiling of GH₵ {answers.budgetGHS}) filtered out current published formulations.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/find-your-scent"
              className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#F5F2EE] bg-[#241C2B]"
            >
              Adjust Quiz Criteria
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#241C2B] border border-[#241C2B]/30"
            >
              Browse Full Catalogue
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
