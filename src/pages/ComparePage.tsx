import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WhatsAppOrderButton } from '../components/WhatsAppOrderButton';

export const ComparePage: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, publishedProducts, addToCart } = useApp();

  const comparedProducts = publishedProducts.filter((p) => compareList.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#211D24]/10 pb-8">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
            Olfactory Matrix
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#241C2B] tracking-tight">
            Fragrance Comparison
          </h1>
          <p className="text-sm text-[#211D24]/75 max-w-xl">
            Evaluate olfactory pyramids, longevity ratings, and projection dynamics side-by-side.
          </p>
        </div>

        {comparedProducts.length > 0 && (
          <button
            type="button"
            onClick={clearCompare}
            className="text-xs font-semibold uppercase tracking-wider text-[#211D24]/70 hover:text-[#241C2B] self-start sm:self-auto"
          >
            Clear All ({comparedProducts.length})
          </button>
        )}
      </div>

      {/* Comparison Grid */}
      {comparedProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="min-w-220 bg-white border border-[#211D24]/10">
            {/* Row 1: Header / Product Cards */}
            <div className="grid grid-cols-4 border-b border-[#211D24]/10 divide-x divide-[#211D24]/10 bg-[#FAF8F5]">
              <div className="p-6 flex items-center justify-center text-xs font-semibold uppercase tracking-wider text-[#211D24]/60">
                Attribute
              </div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="p-6 relative space-y-3">
                  <button
                    type="button"
                    onClick={() => removeFromCompare(p.id)}
                    className="absolute top-4 right-4 p-1 text-[#211D24]/50 hover:text-[#241C2B]"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="aspect-4/3 bg-[#EAE6DF] overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#211D24]/60 block">{p.fragranceFamily}</span>
                    <Link to={`/shop/${p.slug}`} className="font-serif text-xl text-[#241C2B] hover:text-[#D68C7C]">
                      {p.name}
                    </Link>
                  </div>
                  <div className="font-mono font-bold text-lg text-[#241C2B] tabular-nums">
                    GH₵ {p.price.toFixed(2)}
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(p, 1)}
                    className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              ))}
              {/* Fill remaining columns up to 3 */}
              {Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                <div key={idx} className="p-8 flex flex-col items-center justify-center text-center space-y-3 bg-[#FAF8F5]/50">
                  <div className="w-10 h-10 border border-dashed border-[#211D24]/30 rounded-full flex items-center justify-center text-[#211D24]/50">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-[#211D24]/60">Select another fragrance from the shop to compare</span>
                  <Link
                    to="/shop"
                    className="text-xs uppercase tracking-wider font-semibold text-[#241C2B] underline"
                  >
                    Browse Shop
                  </Link>
                </div>
              ))}
            </div>

            {/* Row 2: Scent Family */}
            <div className="grid grid-cols-4 border-b border-[#211D24]/10 divide-x divide-[#211D24]/10 text-xs py-4">
              <div className="px-6 font-semibold uppercase tracking-wider text-[#211D24]/70">Scent Family</div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="px-6 font-medium text-[#241C2B]">{p.fragranceFamily}</div>
              ))}
              {Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                <div key={idx} className="px-6 text-[#211D24]/40">—</div>
              ))}
            </div>

            {/* Row 3: Top Notes */}
            <div className="grid grid-cols-4 border-b border-[#211D24]/10 divide-x divide-[#211D24]/10 text-xs py-4 bg-[#FAF8F5]/40">
              <div className="px-6 font-semibold uppercase tracking-wider text-[#211D24]/70">Top Notes</div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="px-6 text-[#211D24]/80">{p.notes.top.join(' · ')}</div>
              ))}
              {Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                <div key={idx} className="px-6 text-[#211D24]/40">—</div>
              ))}
            </div>

            {/* Row 4: Heart Notes */}
            <div className="grid grid-cols-4 border-b border-[#211D24]/10 divide-x divide-[#211D24]/10 text-xs py-4">
              <div className="px-6 font-semibold uppercase tracking-wider text-[#211D24]/70">Heart Notes</div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="px-6 text-[#211D24]/80">{p.notes.heart.join(' · ')}</div>
              ))}
              {Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                <div key={idx} className="px-6 text-[#211D24]/40">—</div>
              ))}
            </div>

            {/* Row 5: Base Notes */}
            <div className="grid grid-cols-4 border-b border-[#211D24]/10 divide-x divide-[#211D24]/10 text-xs py-4 bg-[#FAF8F5]/40">
              <div className="px-6 font-semibold uppercase tracking-wider text-[#211D24]/70">Base Notes</div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="px-6 text-[#211D24]/80 font-medium">{p.notes.base.join(' · ')}</div>
              ))}
              {Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                <div key={idx} className="px-6 text-[#211D24]/40">—</div>
              ))}
            </div>

            {/* Row 6: Longevity */}
            <div className="grid grid-cols-4 border-b border-[#211D24]/10 divide-x divide-[#211D24]/10 text-xs py-4">
              <div className="px-6 font-semibold uppercase tracking-wider text-[#211D24]/70">Longevity</div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="px-6 font-mono text-[#241C2B] font-semibold">{p.longevity}</div>
              ))}
              {Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                <div key={idx} className="px-6 text-[#211D24]/40">—</div>
              ))}
            </div>

            {/* Row 7: Sillage / Projection */}
            <div className="grid grid-cols-4 border-b border-[#211D24]/10 divide-x divide-[#211D24]/10 text-xs py-4 bg-[#FAF8F5]/40">
              <div className="px-6 font-semibold uppercase tracking-wider text-[#211D24]/70">Projection</div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="px-6 text-[#211D24]/80">{p.sillage}</div>
              ))}
              {Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                <div key={idx} className="px-6 text-[#211D24]/40">—</div>
              ))}
            </div>

            {/* Row 8: Recommended Occasions */}
            <div className="grid grid-cols-4 divide-x divide-[#211D24]/10 text-xs py-4">
              <div className="px-6 font-semibold uppercase tracking-wider text-[#211D24]/70">Best Occasions</div>
              {comparedProducts.map((p) => (
                <div key={p.id} className="px-6 text-[#211D24]/80">{p.bestOccasions.join(', ')}</div>
              ))}
              {Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                <div key={idx} className="px-6 text-[#211D24]/40">—</div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-white border border-[#211D24]/10 p-8 max-w-lg mx-auto">
          <h3 className="font-serif text-3xl text-[#241C2B]">No Fragrances in Comparison</h3>
          <p className="text-xs text-[#211D24]/70 leading-relaxed">
            While browsing the shop or product detail pages, click the comparison icon to add up to three fragrances for side-by-side olfactory evaluation.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#F5F2EE] bg-[#241C2B]"
            >
              <span>Explore Fragrance Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D68C7C]" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
