import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, ShieldCheck, Sparkles, Droplets, Check, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { ScentFamily } from '../types';

export const ShopPage: React.FC = () => {
  const { publishedProducts, featureFlags, appliedPromoCode, applyPromoCode } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const familyParam = searchParams.get('family');
  const typeParam = searchParams.get('type') || searchParams.get('format') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>(familyParam || 'all');
  const [selectedFormat, setSelectedFormat] = useState<string>(typeParam);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'name'>('featured');
  const [copiedCode, setCopiedCode] = useState(false);

  const families: ScentFamily[] = [
    'Warm Woody',
    'Crisp Floral',
    'Fresh Citrus & Aquatic',
    'Amber & Gourmand',
    'Aromatic Green',
  ];

  const formatTabs = [
    { id: 'all', label: 'All Items' },
    { id: 'decants', label: 'Perfume Decants (5ml · 10ml · 15ml)', badge: 'Most Popular' },
    { id: '5ml', label: '5ml Travel Decants' },
    { id: '10ml', label: '10ml Deluxe Atomizers' },
    { id: '15ml', label: '15ml Pocket Flacons' },
    { id: 'perfume_oil', label: 'Concentrated Perfume Oils' },
    { id: 'body_splash', label: 'Body Splashes' },
    { id: 'full_bottles', label: 'Full Bottles (100ml)' },
  ];

  const handleCopyWelcome10 = () => {
    navigator.clipboard?.writeText('WELCOME10');
    applyPromoCode('WELCOME10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const filteredProducts = useMemo(() => {
    return publishedProducts.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesFamily = product.fragranceFamily.toLowerCase().includes(query);
        const matchesNotes = [
          ...product.notes.top,
          ...product.notes.heart,
          ...product.notes.base,
        ].some((n) => n.toLowerCase().includes(query));

        if (!matchesName && !matchesDesc && !matchesFamily && !matchesNotes) {
          return false;
        }
      }

      // Scent Family
      if (selectedFamily !== 'all' && product.fragranceFamily !== selectedFamily) {
        return false;
      }

      // Format Tab Filtering
      if (selectedFormat === 'decants') {
        const hasDecants = product.decantAvailable || (product.decantOptions && product.decantOptions.length > 0) || product.productType === 'decant';
        if (!hasDecants) return false;
      } else if (selectedFormat === '5ml') {
        const has5ml = product.decantOptions?.some(d => d.size.includes('5ml'));
        if (!has5ml) return false;
      } else if (selectedFormat === '10ml') {
        const has10ml = product.decantOptions?.some(d => d.size.includes('10ml'));
        if (!has10ml) return false;
      } else if (selectedFormat === '15ml') {
        const has15ml = product.decantOptions?.some(d => d.size.includes('15ml'));
        if (!has15ml) return false;
      } else if (selectedFormat === 'full_bottles') {
        if (product.productType !== 'eau_de_parfum') return false;
      } else if (selectedFormat === 'perfume_oil') {
        if (product.productType !== 'perfume_oil') return false;
      } else if (selectedFormat === 'body_splash') {
        if (product.productType !== 'body_splash') return false;
      }

      // Price ceiling
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured order
    });
  }, [publishedProducts, searchQuery, selectedFamily, selectedFormat, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedFamily('all');
    setSelectedFormat('all');
    setMaxPrice(500);
    setSortBy('featured');
    setSearchParams({});
  };

  if (!featureFlags.cataloguePublication || publishedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-[#171512]/5 flex items-center justify-center text-[#171512]">
          <ShieldCheck className="w-8 h-8 text-[#C59B3F]" />
        </div>
        <h1 className="font-serif text-4xl text-[#171512]">Catalogue Preparing for Relaunch</h1>
        <p className="text-base text-[#171512]/70 max-w-lg mx-auto leading-relaxed">
          Alora Fragrance House is currently updating our verified fragrance catalogue in Ghana. Check back shortly or connect with our concierge on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Editorial Header with Decant Mission */}
      <div className="space-y-4 border-b border-[#171512]/10 pb-8">
        <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C59B3F]">
          The Alora Catalogue · Accra
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#171512] tracking-tight">
          Curated Fragrances, Decants & Oils
        </h1>
        <p className="text-sm sm:text-base text-[#171512]/75 max-w-3xl leading-relaxed font-light">
          Don’t risk an expensive blind buy on an online review. We hand-decant 100% genuine luxury perfumes into sterile <strong>5ml, 10ml, and 15ml</strong> travel atomizers, and offer pure concentrated perfume oils, fine body splashes, and sealed full bottles. All priced transparently in Ghanaian Cedis.
        </p>

        {/* Promo Code & Highlights Ribbon */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-[#171512] text-[#FAF9F5] px-4 py-2 text-xs border border-[#C59B3F]/40 shadow-sm">
            <span className="font-mono text-[#C59B3F] font-bold">WELCOME10</span>
            <span className="text-[#FAF9F5]/80">· 10% Off First Order</span>
            <button
              type="button"
              onClick={handleCopyWelcome10}
              className="ml-2 underline text-[#C59B3F] hover:text-white"
            >
              {copiedCode || appliedPromoCode === 'WELCOME10' ? 'Applied!' : 'Copy Code'}
            </button>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#FAF9F5] border border-[#171512]/10 px-3.5 py-1.5 text-xs text-[#171512]">
            <Droplets className="w-4 h-4 text-[#C59B3F]" />
            <span className="font-medium">5ml, 10ml & 15ml Decants available on all perfumes</span>
          </div>
        </div>
      </div>

      {/* Format Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#171512]/10 scrollbar-none">
        {formatTabs.map((tab) => {
          const isSelected = selectedFormat === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFormat(tab.id)}
              className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-[#171512] text-[#FAF9F5] border-[#171512] shadow-sm'
                  : 'bg-white text-[#171512]/80 border-[#171512]/15 hover:border-[#C59B3F] hover:bg-[#FAF9F5]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && !isSelected && (
                <span className="ml-2 text-[10px] font-normal text-[#C59B3F] bg-[#C59B3F]/15 px-1.5 py-0.5">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search and Secondary Filter Bar */}
      <div className="bg-[#FAF9F5] border border-[#171512]/10 p-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#171512]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by fragrance name, note (e.g. Cedar, Fig, Vanilla, Oud)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#171512]/15 focus:outline-none focus:border-[#C59B3F] text-[#171512]"
            />
          </div>

          {/* Scent Family Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedFamily}
              onChange={(e) => {
                setSelectedFamily(e.target.value);
                if (e.target.value === 'all') {
                  searchParams.delete('family');
                } else {
                  searchParams.set('family', e.target.value);
                }
                setSearchParams(searchParams);
              }}
              className="w-full px-3 py-2.5 text-xs bg-white border border-[#171512]/15 focus:outline-none focus:border-[#C59B3F] text-[#171512]"
            >
              <option value="all">All Scent Families</option>
              {families.map((fam) => (
                <option key={fam} value={fam}>
                  {fam}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Control */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 text-xs bg-white border border-[#171512]/15 focus:outline-none focus:border-[#C59B3F] text-[#171512]"
            >
              <option value="featured">Featured Order</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Active Filters / Reset */}
        <div className="flex items-center justify-between text-xs text-[#171512]/60 pt-2 border-t border-[#171512]/10">
          <div>
            Showing <span className="font-semibold text-[#171512]">{filteredProducts.length}</span> of {publishedProducts.length} products
          </div>
          {(selectedFamily !== 'all' || selectedFormat !== 'all' || searchQuery.trim()) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[#C59B3F] hover:underline font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-white border border-[#171512]/10 p-8">
          <p className="font-serif text-2xl text-[#171512]">No Fragrances Found</p>
          <p className="text-xs text-[#171512]/70 max-w-md mx-auto font-light">
            No products match your current search and format filters. Try resetting your search or choosing a different format tab.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-2 px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#FAF9F5] bg-[#171512]"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
