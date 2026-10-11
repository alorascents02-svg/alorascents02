import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, SlidersHorizontal, ShoppingBag, ArrowLeft, ShieldCheck, Check, Clock, Wind, Sun, AlertCircle, Sparkles, Droplets } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FragrancePyramid } from '../components/FragrancePyramid';
import { WhatsAppOrderButton } from '../components/WhatsAppOrderButton';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { publishedProducts, addToCart, isInWishlist, toggleWishlist, compareList, addToCompare, removeFromCompare } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [imgError, setImgError] = useState(false);

  const product = publishedProducts.find((p) => p.slug === slug);

  // Available decant and size options
  const decantOptions = (product?.decantOptions && product.decantOptions.length > 0)
    ? product.decantOptions
    : [
        { size: '3ml Sample Decant', price: Math.round((product?.price || 350) * 0.1) || 35 },
        { size: '5ml Travel Decant', price: Math.round((product?.price || 350) * 0.16) || 55 },
        { size: '10ml Deluxe Decant', price: Math.round((product?.price || 350) * 0.28) || 95 },
        { size: `Full Bottle (${product?.size || '100ml'})`, price: product?.price || 350 },
      ];

  const [selectedOptionIdx, setSelectedOptionIdx] = useState(0);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <AlertCircle className="w-8 h-8 text-[#D68C7C] mx-auto" />
        <h2 className="font-serif text-3xl text-[#241C2B]">Fragrance Not Found</h2>
        <p className="text-sm text-[#211D24]/70 font-light">
          The requested fragrance profile does not exist in our published catalogue or is currently unavailable.
        </p>
        <div className="pt-4">
          <Link
            to="/shop"
            className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#F5F2EE] bg-[#241C2B]"
          >
            Return to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const selectedOption = decantOptions[selectedOptionIdx] || decantOptions[0];
  const isDecant = selectedOption.price < product.price;

  const inWishlist = isInWishlist(product.id);
  const inCompare = compareList.includes(product.id);

  // Gallery images
  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : ['/src/assets/images/luxury_perfume_decants_1791695120764.jpg'];

  // Related products from same family or brand
  const relatedProducts = publishedProducts
    .filter((p) => p.id !== product.id && p.fragranceFamily === product.fragranceFamily)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOption.size, selectedOption.price);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleToggleCompare = () => {
    if (inCompare) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product.id);
    }
  };

  // Helper description for each decant format
  const getFormatDescription = (size: string) => {
    if (size.includes('3ml')) return 'Approx. 40–45 sprays. The ideal test wear format to experience dry-down on your skin for 4–5 days.';
    if (size.includes('5ml')) return 'Approx. 75–80 sprays. High-quality glass travel atomizer with gold spray nozzle for pocket carry.';
    if (size.includes('10ml')) return 'Approx. 150–160 sprays. Generous deluxe decant for 2–3 weeks of everyday signature wear.';
    if (size.includes('12ml') || size.includes('6ml')) return 'Pure concentrated oil formulation with pulse-point glass rollerball.';
    if (size.includes('250ml') || size.includes('30ml')) return 'Fine fragrance mist for generous all-over refreshing scenting.';
    return 'Original presentation retail flacon in sealed collector packaging.';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Back Link */}
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#211D24]/70 hover:text-[#241C2B] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalogue</span>
        </button>
      </div>

      {/* Main PDP Grid: Gallery Left, Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Gallery / High-Res Image Display */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Hero Shot */}
          <div className="relative aspect-4/3 w-full bg-[#EAE6DF] border border-[#211D24]/10 overflow-hidden shadow-sm">
            {!imgError ? (
              <img
                src={galleryImages[selectedImageIdx] || galleryImages[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#EAE6DF] text-[#241C2B]">
                <span className="font-serif text-3xl">{product.name}</span>
                <span className="text-xs uppercase tracking-widest mt-2">{product.fragranceFamily}</span>
              </div>
            )}

            {/* Decant Assurance Tag */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#241C2B] border border-[#211D24]/10 shadow-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D68C7C]" />
              <span>Decants & Full Bottles Available</span>
            </div>
          </div>

          {/* Thumbnail Gallery (if multiple images) */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative aspect-square w-20 bg-[#EAE6DF] overflow-hidden border-2 transition-all ${
                    selectedImageIdx === idx ? 'border-[#241C2B] opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Olfactory Pyramid Component */}
          <div className="pt-4">
            <FragrancePyramid notes={product.notes} />
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-7 sticky top-28">
          <div className="space-y-3 border-b border-[#211D24]/10 pb-6">
            <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#D68C7C] flex items-center gap-2">
              <span>{product.brand}</span>
              <span aria-hidden="true">·</span>
              <span>{product.fragranceFamily}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#241C2B] leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 pt-1">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#241C2B] tabular-nums">
                GH₵ {selectedOption.price.toFixed(2)}
              </span>
              <span className="text-xs text-[#211D24]/70 font-semibold bg-[#241C2B]/5 px-2 py-0.5">
                {selectedOption.size}
              </span>
            </div>

            <p className="text-sm text-[#211D24]/80 leading-relaxed pt-2 font-light">
              {product.description}
            </p>
          </div>

          {/* Format & Decant Selection Module */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider font-bold text-[#241C2B] block">
                Select Format or Decant Size
              </label>
              <span className="text-[11px] text-[#D68C7C] font-semibold">
                {isDecant ? 'Hand-Decanted Sterile Atomizer' : 'Retail Presentation Flacon'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {decantOptions.map((opt, idx) => {
                const isSelected = selectedOptionIdx === idx;
                const isOptionDecant = opt.price < product.price;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedOptionIdx(idx)}
                    className={`flex items-start justify-between p-3.5 text-left border transition-all ${
                      isSelected
                        ? 'border-[#241C2B] bg-[#241C2B]/5 text-[#241C2B] shadow-sm ring-1 ring-[#241C2B]'
                        : 'border-[#211D24]/15 hover:border-[#211D24]/50 bg-white text-[#211D24]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold block">{opt.size}</span>
                        {isOptionDecant && (
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-[#D68C7C] bg-[#D68C7C]/10 px-1.5 py-0.5">
                            Decant
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#211D24]/65 font-light leading-snug">
                        {getFormatDescription(opt.size)}
                      </p>
                    </div>

                    <div className="text-right pl-3 shrink-0">
                      <span className="font-mono text-sm font-bold text-[#241C2B] tabular-nums block">
                        GH₵ {opt.price.toFixed(2)}
                      </span>
                      {isOptionDecant && (
                        <span className="text-[10px] text-[#211D24]/50">Test Wear</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Alora Decant Guarantee Callout */}
          <div className="p-4 bg-[#FAF8F5] border border-[#211D24]/10 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-semibold text-[#241C2B]">
              <Droplets className="w-4 h-4 text-[#D68C7C]" />
              <span>The Alora Decant Promise</span>
            </div>
            <p className="text-[11px] text-[#211D24]/75 leading-relaxed font-light">
              Don’t blind-buy a full bottle from an online review. We hand-decant 100% authentic fragrance directly from original bottles into sterilized glass atomizers with fine gold spray nozzles. Test on your skin in Ghana’s weather before committing.
            </p>
          </div>

          {/* Performance & Climate Specs */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-white border border-[#211D24]/10 p-3.5">
            <div className="flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-[#D68C7C] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#241C2B] block text-[11px]">Longevity</span>
                <span className="text-[#211D24]/70 text-[11px] font-light">{product.longevity}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Wind className="w-3.5 h-3.5 text-[#D68C7C] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#241C2B] block text-[11px]">Sillage</span>
                <span className="text-[#211D24]/70 text-[11px] font-light">{product.sillage}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Sun className="w-3.5 h-3.5 text-[#D68C7C] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#241C2B] block text-[11px]">Climate Resilience</span>
                <span className="text-[#211D24]/70 text-[11px] font-light">Calibrated for Ghana</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D68C7C] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#241C2B] block text-[11px]">Authenticity</span>
                <span className="text-[#211D24]/70 text-[11px] font-light">100% Genuine Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Purchase Actions */}
          <div className="space-y-4 pt-1">
            {/* Quantity and Add to Bag */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#211D24]/20 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-xs font-semibold text-[#241C2B] hover:bg-[#FAF8F5]"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-3 text-xs font-mono font-bold text-[#241C2B] tabular-nums min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-xs font-semibold text-[#241C2B] hover:bg-[#FAF8F5]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.availability === 'out_of_stock'}
                className="flex-1 py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] disabled:opacity-40 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-[#D68C7C]" />
                    <span>Added {selectedOption.size} to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {isDecant ? `Add Decant (GH₵ ${selectedOption.price * quantity})` : `Add Bottle (GH₵ ${selectedOption.price * quantity})`}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* WhatsApp Direct Inquiry */}
            <WhatsAppOrderButton
              productName={`${product.name} (${selectedOption.size})`}
              productPrice={selectedOption.price}
            />

            {/* Utility actions */}
            <div className="flex items-center justify-between text-xs pt-2">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`inline-flex items-center gap-1.5 transition-colors ${
                  inWishlist ? 'text-[#D68C7C] font-semibold' : 'text-[#211D24]/70 hover:text-[#241C2B]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current text-[#D68C7C]' : ''}`} />
                <span>{inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleCompare}
                className={`inline-flex items-center gap-1.5 transition-colors ${
                  inCompare ? 'text-[#241C2B] font-semibold' : 'text-[#211D24]/70 hover:text-[#241C2B]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{inCompare ? 'In Comparison Bar' : 'Compare Fragrance'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Fragrances */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-12 border-t border-[#211D24]/10">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#D68C7C]">
              Similar Profiles
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#241C2B]">
              You May Also Appreciate
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
