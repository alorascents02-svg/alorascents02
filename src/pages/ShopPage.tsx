import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, ShieldCheck, AlertCircle, Sparkles, Droplets } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { ScentFamily, ProductType } from '../types';

export const ShopPage: React.FC = () => {
  const { publishedProducts, featureFlags } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const familyParam = searchParams.get('family');
  const typeParam = searchParams.get('type') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>(familyParam || 'all');
  const [selectedFormat, setSelectedFormat] = useState<string>(typeParam);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'name'>('featured');

  const families: ScentFamily[] = [
    'Warm Woody',
    'Crisp Floral',
    'Fresh Citrus & Aquatic',
    'Amber & Gourmand',
    'Aromatic Green',
  ];

  const formatTabs = [
    { id: 'all', label: 'All Items' },
    { id: 'decants', label: 'Perfume Decants (3ml · 5ml · 10ml)', badge: 'Most Popular' },
    { id: 'full_bottles', label: 'Full Bottles' },
    { id: 'perfume_oil', label: 'Concentrated Perfume Oils' },
    { id: 'body_splash', label: 'Body Splashes' },
    { id: 'gift_bundle', label: 'Discovery & Gift Sets' },
  ];

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
        // Show any product with decants enabled or productType 'decant'
        const hasDecants = product.decantAvailable || (product.decantOptions && product.decantOptions.length > 0) || product.productType === 'decant';
        if (!hasDecants) return false;
      } else if (selectedFormat === 'full_bottles') {
        if (product.productType !== 'eau_de_parfum') return false;
      } else if (selectedFormat === 'perfume_oil') {
        if (product.productType !== 'perfume_oil') return false;
      } else if (selectedFormat === 'body_splash') {
        if (product.productType !== 'body_splash') return false;
      } else if (selectedFormat === 'gift_bundle') {
        if (product.productType !== 'gift_bundle') return false;
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
        <div className="w-16 h-16 mx-auto bg-[#241C2B]/5 flex items-center justify-center text-[#241C2B]">
          <ShieldCheck className="w-8 h-8 text-[#D68C7C]" />
        </div>
        <h1 className="font-serif text-4xl text-[#241C2B]">Catalogue Preparing for Relaunch</h1>
        <p className="text-base text-[#211D24]/70 max-w-lg mx-auto leading-relaxed">
          Alora Fragrance House is currently updating our verified fragrance catalogue in Ghana. Check back shortly or connect with our concierge on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Editorial Header with Decant Mission */}
      <div className="space-y-4 border-b border-[#211D24]/10 pb-8">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          The Alora Catalogue
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#241C2B] tracking-tight">
          Curated Fragrances, Decants & Oils
        </h1>
        <p className="text-sm sm:text-base text-[#211D24]/75 max-w-3xl leading-relaxed">
          Don’t risk an expensive blind buy on an online review. We hand-decant 100% genuine luxury perfumes into sterile 3ml, 5ml, and 10ml travel atomizers, and offer pure perfume oils, fine body splashes, and sealed full bottles. All priced transparently in Ghanaian Cedis.
        </p>

        {/* Highlight Banner */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#211D24]/10 px-3.5 py-1.5 text-xs text-[#241C2B]">
            <Droplets className="w-4 h-4 text-[#D68C7C]" />
            <span className="font-medium">3ml, 5ml & 10ml Decants available on all perfumes</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#211D24]/10 px-3.5 py-1.5 text-xs text-[#241C2B]">
            <Sparkles className="w-4 h-4 text-[#D68C7C]" />
            <span className="font-medium">Concentrated Alcohol-Free Perfume Oils</span>
          </div>
        </div>
      </div>

      {/* Format Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#211D24]/10 scrollbar-none">
        {formatTabs.map((tab) => {
          const isSelected = selectedFormat === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFormat(tab.id)}
              className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-[#241C2B] text-white border-[#241C2B] shadow-sm'
                  : 'bg-white text-[#211D24]/80 border-[#211D24]/15 hover:border-[#241C2B]/50 hover:bg-[#FAF8F5]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && !isSelected && (
                <span className="ml-2 text-[10px] font-normal text-[#D68C7C] bg-[#D68C7C]/10 px-1.5 py-0.5">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search and Secondary Filter Bar */}
      <div className="bg-[#FAF8F5] border border-[#211D24]/10 p-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#211D24]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by fragrance name, note (e.g. Cedar, Fig, Vanilla, Oud)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#211D24]/15 focus:outline-none focus:border-[#241C2B] text-[#211D24]"
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
              className="w-full px-3 py-2.5 text-xs bg-white border border-[#211D24]/15 focus:outline-none focus:border-[#241C2B] text-[#211D24]"
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
              className="w-full px-3 py-2.5 text-xs bg-white border border-[#211D24]/15 focus:outline-none focus:border-[#241C2B] text-[#211D24]"
            >
              <option value="featured">Featured Order</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Line */}
        <div className="pt-3 border-t border-[#211D24]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#211D24]/70">
          <div className="flex items-center gap-4">
            <span>Price ceiling:</span>
            <input
              type="range"
              min="100"
              max="500"
              step="20"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-[#241C2B] cursor-pointer"
            />
            <span className="font-mono font-semibold text-[#241C2B] tabular-nums">
              Up to GH₵ {maxPrice}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#211D24]/60 font-mono tabular-nums">
              Showing {filteredProducts.length} verified {filteredProducts.length === 1 ? 'creation' : 'creations'}
            </span>
            {(selectedFamily !== 'all' || selectedFormat !== 'all' || searchQuery || maxPrice < 500) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-[#241C2B] hover:text-[#D68C7C] font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
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
        <div className="py-20 text-center space-y-4 bg-white border border-[#211D24]/10 p-8">
          <AlertCircle className="w-8 h-8 text-[#D68C7C] mx-auto" />
          <h3 className="font-serif text-2xl text-[#241C2B]">No Matching Fragrances Found</h3>
          <p className="text-xs text-[#211D24]/70 max-w-md mx-auto">
            Try adjusting your search criteria, raising the price ceiling, or clearing active filters to view available inventory.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#F5F2EE] bg-[#241C2B]"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
