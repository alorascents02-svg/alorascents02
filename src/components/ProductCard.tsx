import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, SlidersHorizontal, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { Product, DecantOption } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInWishlist, toggleWishlist, compareList, addToCompare, removeFromCompare } = useApp();
  const [imgError, setImgError] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  // Fallback decant options if not explicitly set
  const availableOptions: DecantOption[] = (product.decantOptions && product.decantOptions.length > 0)
    ? product.decantOptions
    : [
        { size: '3ml Sample Decant', price: Math.round(product.price * 0.1) || 35 },
        { size: '5ml Travel Decant', price: Math.round(product.price * 0.16) || 55 },
        { size: '10ml Deluxe Decant', price: Math.round(product.price * 0.28) || 95 },
        { size: `Full Bottle (${product.size || '100ml'})`, price: product.price },
      ];

  // Default to the first decant size (e.g. 3ml or 5ml) for accessible testing, or 0
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const currentOption = availableOptions[selectedIdx] || availableOptions[0];
  const isDecantSelected = currentOption.price < product.price;

  const inWishlist = isInWishlist(product.id);
  const inCompare = compareList.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, currentOption.size, currentOption.price);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product.id);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  // Preview key notes
  const previewNotes = [...product.notes.top.slice(0, 2), ...product.notes.base.slice(0, 1)].join(' · ');

  return (
    <article className="group flex flex-col bg-white border border-[#211D24]/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#241C2B]/5">
      {/* Visual Image Slot */}
      <div className="relative aspect-4/3 w-full bg-[#EAE6DF] overflow-hidden">
        {!imgError && product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EAE6DF] text-[#241C2B]/60">
            <span className="font-serif text-2xl text-[#241C2B]">{product.name}</span>
            <span className="text-xs uppercase tracking-wider mt-2">{product.fragranceFamily}</span>
          </div>
        )}

        {/* Quick Utility Overlay Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`p-2 bg-white/95 hover:bg-white text-[#241C2B] rounded-none shadow-sm transition-colors ${
              inWishlist ? 'text-[#D68C7C]' : ''
            }`}
            title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current text-[#D68C7C]' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleToggleCompare}
            className={`p-2 bg-white/95 hover:bg-white text-[#241C2B] rounded-none shadow-sm transition-colors ${
              inCompare ? 'text-[#241C2B] font-bold bg-[#F5F2EE]' : ''
            }`}
            title={inCompare ? 'Remove from comparison' : 'Add to comparison'}
            aria-label="Compare toggle"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Decants indicator banner */}
        <div className="absolute bottom-3 left-3 flex flex-col gap-1 z-10">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-[#241C2B] bg-white/95 backdrop-blur-sm px-2.5 py-1 border border-[#241C2B]/10 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#D68C7C]" />
            Decants from GH₵ {availableOptions[0]?.price}
          </span>
        </div>

        {/* Stock status indicator */}
        {product.availability === 'low_stock' && (
          <div className="absolute top-3 left-3 text-[10px] font-medium tracking-wide uppercase text-amber-900 bg-white/95 px-2 py-0.5">
            Low Stock ({product.stockCount} left)
          </div>
        )}
      </div>

      {/* Content Metadata */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          {/* Brand & Family */}
          <div className="text-[11px] uppercase tracking-wider text-[#211D24]/60 flex items-center justify-between">
            <span className="font-semibold text-[#D68C7C]">{product.brand}</span>
            <span>{product.fragranceFamily}</span>
          </div>

          {/* Product Title */}
          <Link to={`/shop/${product.slug}`} className="block">
            <h3 className="font-serif text-xl sm:text-2xl text-[#241C2B] group-hover:text-[#D68C7C] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Key Notes Teaser */}
          <p className="text-xs text-[#211D24]/70 line-clamp-1">
            {previewNotes}
          </p>

          <p className="text-[11px] text-[#211D24]/60 italic line-clamp-1">
            {product.shortDescription}
          </p>
        </div>

        {/* Decant & Format Option Selector */}
        <div className="space-y-2 pt-2 border-t border-[#211D24]/10">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold uppercase tracking-wider text-[#241C2B]/70">
              Select Decant or Bottle:
            </span>
            <span className="text-[10px] text-[#D68C7C] font-medium">
              {isDecantSelected ? 'Hand-Decanted' : 'Full Flacon'}
            </span>
          </div>

          {/* Size Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {availableOptions.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              // Extract short display label (e.g. "3ml", "5ml", "10ml", "Full")
              const shortLabel = opt.size.includes('3ml')
                ? '3ml'
                : opt.size.includes('5ml')
                ? '5ml'
                : opt.size.includes('10ml')
                ? '10ml'
                : opt.size.includes('12ml')
                ? '12ml'
                : opt.size.includes('250ml')
                ? '250ml'
                : opt.size.includes('30ml')
                ? '30ml'
                : 'Full';

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedIdx(idx);
                  }}
                  className={`px-2 py-1.5 text-center text-[11px] font-medium transition-all border ${
                    isSelected
                      ? 'bg-[#241C2B] text-white border-[#241C2B] shadow-sm font-semibold'
                      : 'bg-[#FAF8F5] text-[#211D24]/80 border-[#211D24]/15 hover:border-[#241C2B]/50'
                  }`}
                >
                  <span className="block leading-none">{shortLabel}</span>
                  <span className="font-mono text-[10px] block mt-0.5 opacity-80">₵{opt.price}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price and Add to Bag */}
        <div className="pt-3 border-t border-[#211D24]/10 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-[#211D24]/50">
              {currentOption.size}
            </span>
            <span className="font-mono text-base sm:text-lg font-bold text-[#241C2B] tabular-nums">
              GH₵ {currentOption.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.availability === 'out_of_stock'}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] disabled:opacity-40 transition-colors shadow-sm"
            >
              {addedNotice ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#D68C7C]" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{isDecantSelected ? 'Add Decant' : 'Add Bottle'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
