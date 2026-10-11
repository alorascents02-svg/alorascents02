import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, SlidersHorizontal, Droplets, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const FragrancePage: React.FC = () => {
  const { publishedProducts, setIsAiAssistantOpen, setIsScentQuizOpen, appliedPromoCode, applyPromoCode } = useApp();
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const families = ['All', 'Warm Woody', 'Crisp Floral', 'Fresh Citrus & Aquatic', 'Amber & Gourmand', 'Aromatic Green'];
  const formats = ['All', '5ml Decants', '10ml Decants', '15ml Decants', 'Pure Perfume Oils', 'Full Bottles'];

  const filteredProducts = useMemo(() => {
    return publishedProducts.filter((product) => {
      // Family filter
      if (selectedFamily !== 'All' && product.fragranceFamily !== selectedFamily) {
        return false;
      }

      // Format filter
      if (selectedFormat === '5ml Decants' && !product.decantOptions?.some((d) => d.size.includes('5ml'))) {
        return false;
      }
      if (selectedFormat === '10ml Decants' && !product.decantOptions?.some((d) => d.size.includes('10ml'))) {
        return false;
      }
      if (selectedFormat === '15ml Decants' && !product.decantOptions?.some((d) => d.size.includes('15ml'))) {
        return false;
      }
      if (selectedFormat === 'Pure Perfume Oils' && product.productType !== 'perfume_oil') {
        return false;
      }
      if (selectedFormat === 'Full Bottles' && product.productType !== 'eau_de_parfum') {
        return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesNotes = [
          ...product.notes.top,
          ...product.notes.heart,
          ...product.notes.base,
        ].some((n) => n.toLowerCase().includes(q));
        if (!matchesName && !matchesNotes) return false;
      }

      return true;
    });
  }, [publishedProducts, selectedFamily, selectedFormat, searchQuery]);

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Header */}
      <section className="bg-[#171512] text-[#FAF9F5] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C59B3F]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C59B3F]" />
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C59B3F]">
              Haute Parfumerie & Artisanal Extraits
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF9F5] tracking-tight max-w-3xl leading-tight">
            Curated Fragrances. Hand-Decanted in Accra.
          </h1>

          <p className="text-sm sm:text-base text-[#FAF9F5]/80 max-w-2xl font-light leading-relaxed">
            Explore our complete collection of coveted niche compositions. Every extrait is available in authentic 5ml, 10ml, and 15ml pocket flacons so you can experience their intimate development before acquiring a full bottle.
          </p>

          {/* Quick Action Ribbon */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              to="/find-your-scent"
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#171512] bg-[#FAF9F5] hover:bg-[#C59B3F] transition-colors"
            >
              Take 4-Question Scent Quiz
            </Link>
            <button
              type="button"
              onClick={() => setIsAiAssistantOpen(true)}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] border border-[#C59B3F]/50 hover:bg-[#C59B3F]/15 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C59B3F]" />
              <span>Ask AI Scent Assistant</span>
            </button>
          </div>
        </div>

        {/* Promo Ribbon */}
        <div className="mt-12 pt-6 border-t border-[#FAF9F5]/10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#FAF9F5]/80">
            <span className="text-[#C59B3F] font-semibold">WELCOME10</span>
            <span>· 10% First-Order Welcome code active on all decant orders.</span>
          </div>
          <button
            type="button"
            onClick={() => applyPromoCode('WELCOME10')}
            className="text-[11px] font-semibold text-[#C59B3F] hover:underline"
          >
            {appliedPromoCode === 'WELCOME10' ? 'Code Applied to Bag' : 'Apply Code WELCOME10'}
          </button>
        </div>
      </section>

      {/* Main Content & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Filter Controls */}
        <div className="space-y-4 bg-white p-6 border border-[#171512]/10 shadow-sm">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#171512]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by fragrance name, note (e.g. Bergamot, Vanilla, Cedar), or accord..."
              className="w-full pl-10 pr-4 py-3 text-xs bg-[#FAF9F5] border border-[#171512]/15 focus:outline-none focus:border-[#C59B3F]"
            />
          </div>

          {/* Scent Family Filter */}
          <div className="space-y-1.5">
            <span className="text-[11px] uppercase tracking-wider text-[#171512]/60 font-semibold block">
              Olfactory Family:
            </span>
            <div className="flex flex-wrap gap-2">
              {families.map((family) => (
                <button
                  key={family}
                  type="button"
                  onClick={() => setSelectedFamily(family)}
                  className={`px-3 py-1.5 text-xs transition-colors ${
                    selectedFamily === family
                      ? 'bg-[#171512] text-[#FAF9F5] font-semibold'
                      : 'bg-[#FAF9F5] text-[#171512]/75 hover:bg-[#171512]/10'
                  }`}
                >
                  {family}
                </button>
              ))}
            </div>
          </div>

          {/* Format Filter */}
          <div className="space-y-1.5 pt-2 border-t border-[#171512]/10">
            <span className="text-[11px] uppercase tracking-wider text-[#171512]/60 font-semibold block">
              Explore by Format:
            </span>
            <div className="flex flex-wrap gap-2">
              {formats.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1.5 text-xs transition-colors ${
                    selectedFormat === fmt
                      ? 'bg-[#C59B3F] text-[#171512] font-semibold'
                      : 'bg-[#FAF9F5] text-[#171512]/75 hover:bg-[#C59B3F]/20'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase tracking-wider text-[#171512]/60 font-semibold">
              Showing {filteredProducts.length} Fragrance Formulations
            </span>
            <span className="text-xs text-[#171512]/50">
              5ml · 10ml · 15ml Decants Hand-Poured in Accra
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center space-y-3 bg-white border border-[#171512]/10">
              <p className="font-serif text-2xl text-[#171512]">No fragrances match your filters</p>
              <p className="text-xs text-[#171512]/60">
                Try resetting your search query or selecting "All" formats.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedFamily('All');
                  setSelectedFormat('All');
                  setSearchQuery('');
                }}
                className="mt-2 px-5 py-2 text-xs uppercase tracking-wider font-semibold text-[#FAF9F5] bg-[#171512]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
