import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, publishedProducts, toggleWishlist, addToCart } = useApp();

  const savedProducts = publishedProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-[#211D24]/10 pb-6 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
            Curated Saves
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#241C2B]">
            Your Fragrance Wishlist ({savedProducts.length})
          </h1>
        </div>
        <Link
          to="/shop"
          className="text-xs font-semibold uppercase tracking-wider text-[#211D24]/70 hover:text-[#241C2B] flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Browsing</span>
        </Link>
      </div>

      {savedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-white border border-[#211D24]/10 p-8 max-w-md mx-auto">
          <Heart className="w-10 h-10 text-[#211D24]/30 mx-auto" />
          <h2 className="font-serif text-3xl text-[#241C2B]">Your Wishlist is Empty</h2>
          <p className="text-xs text-[#211D24]/70">
            Save your favorite fragrances by clicking the heart icon on any product card or detail page.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-block px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#F5F2EE] bg-[#241C2B]"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
