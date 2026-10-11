/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { FragrancePage } from './pages/FragrancePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { FindYourScentPage } from './pages/FindYourScentPage';
import { ScentResultsPage } from './pages/ScentResultsPage';
import { ComparePage } from './pages/ComparePage';
import { OurStoryPage } from './pages/OurStoryPage';
import { JournalPage } from './pages/JournalPage';
import { JournalArticlePage } from './pages/JournalArticlePage';
import { GiftingPage } from './pages/GiftingPage';
import { FaqsPage } from './pages/FaqsPage';
import { ContactPage } from './pages/ContactPage';
import { AccountPage } from './pages/AccountPage';
import { PreferencesPage } from './pages/PreferencesPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DeliveryPage } from './pages/DeliveryPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { AdminPage } from './pages/AdminPage';
import { AiScentAssistantModal } from './components/AiScentAssistantModal';

// Scroll to top on navigation helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--ink)] transition-colors duration-200">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/fragrance" element={<FragrancePage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:slug" element={<ProductDetailPage />} />
              <Route path="/find-your-scent" element={<FindYourScentPage />} />
              <Route path="/scent-results" element={<ScentResultsPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/our-story" element={<OurStoryPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/journal/:slug" element={<JournalArticlePage />} />
              <Route path="/gifting" element={<GiftingPage />} />
              <Route path="/faqs" element={<FaqsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/preferences" element={<PreferencesPage />} />
              <Route path="/account/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/order-tracking" element={<OrderTrackingPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/delivery" element={<DeliveryPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
          <AiScentAssistantModal />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
