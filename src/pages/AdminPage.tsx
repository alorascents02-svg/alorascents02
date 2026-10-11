import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Package,
  Sliders,
  Inbox,
  ShoppingBag,
  History,
  ToggleLeft,
  Plus,
  Save,
  Check,
  AlertTriangle,
  LogOut,
  Edit2,
  Trash2,
  FileText,
  ExternalLink,
  Database,
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  Product,
  ProductType,
  ScentFamily,
  AvailabilityStatus,
  PublicationStatus,
  IntensityLevel,
  SiteContent
} from '../types';
import {
  OFFICIAL_SOCIAL_LINKS,
  TikTokIcon,
  InstagramIcon,
  WhatsAppIcon
} from '../components/SocialLinks';

export const AdminPage: React.FC = () => {
  const {
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    siteContent,
    updateSiteContent,
    isFirebaseSynced,
    featureFlags,
    updateFeatureFlags,
    quizWeights,
    updateQuizWeights,
    orders,
    updateOrderStatus,
    inquiries,
    auditLogs,
    theme,
    setTheme,
    availableThemes,
  } = useApp();

  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'products' | 'flags' | 'quiz' | 'orders' | 'inquiries' | 'audit'>('content');

  // Editable storefront copy state
  const [editableContent, setEditableContent] = useState<SiteContent>(siteContent);
  const [isSavingContent, setIsSavingContent] = useState(false);

  // Editing or adding product modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);
  const [productFormState, setProductFormState] = useState<{
    name: string;
    brand: string;
    productType: ProductType;
    fragranceFamily: ScentFamily;
    size: string;
    price: number;
    stockCount: number;
    availability: AvailabilityStatus;
    publicationStatus: PublicationStatus;
    verified: boolean;
    intensity: IntensityLevel;
    longevity: string;
    sillage: string;
    shortDescription: string;
    description: string;
    imageUrl: string;
    topNotes: string;
    heartNotes: string;
    baseNotes: string;
    bestOccasions: string;
    decantAvailable: boolean;
    price3ml: number;
    price5ml: number;
    price10ml: number;
  }>({
    name: '',
    brand: 'Alora Fragrance House',
    productType: 'eau_de_parfum',
    fragranceFamily: 'Warm Woody',
    size: '100ml / 3.4 fl. oz.',
    price: 350,
    stockCount: 20,
    availability: 'in_stock',
    publicationStatus: 'published',
    verified: true,
    intensity: 'moderate',
    longevity: '8–10 hours',
    sillage: 'Generous aura',
    shortDescription: '',
    description: '',
    imageUrl: '/src/assets/images/luxury_perfume_decants_1791695120764.jpg',
    topNotes: 'Bergamot, Fig',
    heartNotes: 'Cedarwood, Amber',
    baseNotes: 'Vanilla, Musk',
    bestOccasions: 'Daily Signature, Evening',
    decantAvailable: true,
    price3ml: 35,
    price5ml: 55,
    price10ml: 95,
  });

  const [successNotice, setSuccessNotice] = useState('');

  // Handle fragrance image file upload
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      notify('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result as string;
      if (dataUrl) {
        setProductFormState((prev) => ({ ...prev, imageUrl: dataUrl }));
        notify('Fragrance photo uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Keep local editableContent synced with siteContent if changed remotely
  React.useEffect(() => {
    setEditableContent(siteContent);
  }, [siteContent]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = adminLogin(passcode);
    if (!success) {
      setLoginError('Invalid administrative passcode. Please enter authorized credentials.');
    }
  };

  const notify = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(''), 3000);
  };

  // Open edit modal for product
  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setIsAddingNewProduct(false);
    
    // Find decant prices if present
    const opt3 = p.decantOptions?.find((d) => d.size.includes('3ml'))?.price || Math.round(p.price * 0.1) || 35;
    const opt5 = p.decantOptions?.find((d) => d.size.includes('5ml'))?.price || Math.round(p.price * 0.16) || 55;
    const opt10 = p.decantOptions?.find((d) => d.size.includes('10ml'))?.price || Math.round(p.price * 0.28) || 95;

    setProductFormState({
      name: p.name,
      brand: p.brand || 'Alora Fragrance House',
      productType: p.productType,
      fragranceFamily: p.fragranceFamily,
      size: p.size,
      price: p.price,
      stockCount: p.stockCount,
      availability: p.availability,
      publicationStatus: p.publicationStatus,
      verified: p.verified,
      intensity: p.intensity,
      longevity: p.longevity,
      sillage: p.sillage,
      shortDescription: p.shortDescription,
      description: p.description,
      imageUrl: p.images?.[0] || '/src/assets/images/luxury_perfume_decants_1791695120764.jpg',
      topNotes: p.notes?.top?.join(', ') || '',
      heartNotes: p.notes?.heart?.join(', ') || '',
      baseNotes: p.notes?.base?.join(', ') || '',
      bestOccasions: p.bestOccasions?.join(', ') || '',
      decantAvailable: p.decantAvailable ?? true,
      price3ml: opt3,
      price5ml: opt5,
      price10ml: opt10,
    });
  };

  // Open new product modal
  const handleOpenAddNewProduct = () => {
    setEditingProduct(null);
    setIsAddingNewProduct(true);
    setProductFormState({
      name: '',
      brand: 'Alora Fragrance House',
      productType: 'eau_de_parfum',
      fragranceFamily: 'Warm Woody',
      size: '100ml / 3.4 fl. oz.',
      price: 340,
      stockCount: 25,
      availability: 'in_stock',
      publicationStatus: 'published',
      verified: true,
      intensity: 'moderate',
      longevity: '8–10 hours',
      sillage: 'Generous aura',
      shortDescription: 'Fresh and radiant fragrance composition blended for warm climates.',
      description: 'A finely balanced formulation designed to deliver enduring presence and nuanced character in Ghana.',
      imageUrl: '/src/assets/images/luxury_perfume_decants_1791695120764.jpg',
      topNotes: 'Bergamot, Pink Pepper',
      heartNotes: 'Amber, Orris',
      baseNotes: 'Sandalwood, Vanilla',
      bestOccasions: 'Daily Signature, Special Occasion',
      decantAvailable: true,
      price3ml: 35,
      price5ml: 55,
      price10ml: 95,
    });
  };

  // Save product changes (Edit or New)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormState.name.trim()) {
      notify('Please enter a fragrance name.');
      return;
    }

    const topArray = productFormState.topNotes.split(',').map((s) => s.trim()).filter(Boolean);
    const heartArray = productFormState.heartNotes.split(',').map((s) => s.trim()).filter(Boolean);
    const baseArray = productFormState.baseNotes.split(',').map((s) => s.trim()).filter(Boolean);
    const occasionsArray = productFormState.bestOccasions.split(',').map((s) => s.trim()).filter(Boolean);

    const generatedDecantOptions = productFormState.decantAvailable
      ? [
          { size: '3ml Sample Decant', price: Number(productFormState.price3ml) || 35 },
          { size: '5ml Travel Decant', price: Number(productFormState.price5ml) || 55 },
          { size: '10ml Deluxe Decant', price: Number(productFormState.price10ml) || 95 },
          { size: `Full Bottle (${productFormState.size || '100ml'})`, price: Number(productFormState.price) },
        ]
      : undefined;

    if (isAddingNewProduct) {
      const slug = productFormState.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newProduct: Product = {
        id: 'alo-prd-' + Date.now().toString().slice(-5),
        slug: slug || `fragrance-${Date.now().toString().slice(-4)}`,
        name: productFormState.name,
        brand: productFormState.brand || 'Alora Fragrance House',
        productType: productFormState.productType,
        fragranceFamily: productFormState.fragranceFamily,
        size: productFormState.size,
        price: Number(productFormState.price),
        currency: 'GH₵',
        images: [productFormState.imageUrl || '/src/assets/images/luxury_perfume_decants_1791695120764.jpg'],
        stockCount: Number(productFormState.stockCount),
        availability: productFormState.availability,
        publicationStatus: productFormState.publicationStatus,
        verified: productFormState.verified,
        intensity: productFormState.intensity,
        longevity: productFormState.longevity,
        sillage: productFormState.sillage,
        shortDescription: productFormState.shortDescription,
        description: productFormState.description,
        notes: {
          top: topArray.length > 0 ? topArray : ['Bergamot'],
          heart: heartArray.length > 0 ? heartArray : ['Amber'],
          base: baseArray.length > 0 ? baseArray : ['Vanilla'],
        },
        bestOccasions: occasionsArray.length > 0 ? occasionsArray : ['Daily Signature'],
        seasonality: ['Year Round'],
        decantAvailable: productFormState.decantAvailable,
        decantOptions: generatedDecantOptions,
      };

      await addProduct(newProduct);
      notify(`Added "${newProduct.name}" with photo & decant options to Firebase!`);
      setIsAddingNewProduct(false);
    } else if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: productFormState.name,
        brand: productFormState.brand || 'Alora Fragrance House',
        productType: productFormState.productType,
        fragranceFamily: productFormState.fragranceFamily,
        size: productFormState.size,
        price: Number(productFormState.price),
        images: [productFormState.imageUrl || editingProduct.images[0]],
        stockCount: Number(productFormState.stockCount),
        availability: productFormState.availability,
        publicationStatus: productFormState.publicationStatus,
        verified: productFormState.verified,
        intensity: productFormState.intensity,
        longevity: productFormState.longevity,
        sillage: productFormState.sillage,
        shortDescription: productFormState.shortDescription,
        description: productFormState.description,
        decantAvailable: productFormState.decantAvailable,
        decantOptions: generatedDecantOptions,
        notes: {
          top: topArray,
          heart: heartArray,
          base: baseArray,
        },
        bestOccasions: occasionsArray,
      };

      await updateProduct(updated);
      notify(`Updated "${updated.name}" with photo & decant options to Firebase!`);
      setEditingProduct(null);
    }
  };

  // Save Storefront Copy to Firebase
  const handleSaveStorefrontContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingContent(true);
    try {
      await updateSiteContent(editableContent);
      notify('All storefront sections successfully saved to Firebase Firestore!');
    } catch {
      notify('Saved locally. Check Firebase connection.');
    } finally {
      setIsSavingContent(false);
    }
  };

  // If not logged in, render authentication gate
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-[#241C2B] text-[#F5F2EE] mx-auto flex items-center justify-center">
            <Lock className="w-5 h-5 text-[#D68C7C]" />
          </div>
          <h1 className="font-serif text-3xl text-[#241C2B]">Administrator Portal</h1>
          <p className="text-xs text-[#211D24]/70">
            Protected management system for House of ALORA operations.
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-white border border-[#211D24]/10 p-6 space-y-4 shadow-sm">
          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-900 text-xs">
              {loginError}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#211D24]">Administrator Passcode</label>
            <input
              type="password"
              placeholder="Enter passcode (e.g. alora2026)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#211D24]/20 focus:outline-none focus:border-[#241C2B]"
            />
            <span className="text-[11px] text-[#211D24]/50 block mt-1">
              Authorized staff pass: <code className="font-mono font-bold">alora2026</code>
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] transition-colors"
          >
            Authenticate Session
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#211D24]/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
            <Database className="w-3.5 h-3.5" />
            <span>House of ALORA · Firebase Live Storage</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#241C2B]">
            House of ALORA Administration
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick social verification links */}
          <div className="flex items-center gap-2 bg-[#FAF8F5] p-1.5 border border-[#211D24]/10">
            <a
              href={OFFICIAL_SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#241C2B] hover:text-[#D68C7C] transition-colors"
              title="Open TikTok: @_alora.scents"
            >
              <TikTokIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={OFFICIAL_SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#241C2B] hover:text-[#D68C7C] transition-colors"
              title="Open Instagram: @alora.scentsss_"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={OFFICIAL_SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#241C2B] hover:text-emerald-700 transition-colors"
              title="Open WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="text-right text-xs hidden sm:block">
            <span className="font-semibold text-[#241C2B] block">Super Admin Session</span>
            <span className="text-emerald-800 font-mono flex items-center justify-end gap-1 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block animate-pulse" />
              Firebase Active
            </span>
          </div>
          <button
            type="button"
            onClick={adminLogout}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-red-800 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {successNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 animate-in fade-in duration-150">
          <Check className="w-4 h-4 text-emerald-700" />
          <span className="font-medium">{successNotice}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#211D24]/10 pb-3 text-xs font-semibold uppercase tracking-wider">
        {[
          { id: 'content', label: 'Storefront Content (Firebase)', icon: FileText },
          { id: 'products', label: `Products & Catalog (${products.length})`, icon: Package },
          { id: 'flags', label: 'Feature Flags & Safety', icon: ToggleLeft },
          { id: 'quiz', label: 'Quiz Weights Tuning', icon: Sliders },
          { id: 'orders', label: `Customer Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'inquiries', label: `Contact Inquiries (${inquiries.length})`, icon: Inbox },
          { id: 'audit', label: `Audit Trail (${auditLogs.length})`, icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 flex items-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#241C2B] text-[#F5F2EE]'
                  : 'bg-white text-[#211D24] border border-[#211D24]/15 hover:border-[#241C2B]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: EDITABLE STOREFRONT CONTENT (SAVED TO FIREBASE) */}
      {activeTab === 'content' && (
        <form onSubmit={handleSaveStorefrontContent} className="bg-white border border-[#211D24]/10 p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#211D24]/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl text-[#241C2B]">Storefront Content Management</h2>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Firebase Firestore Synced
                </span>
              </div>
              <p className="text-xs text-[#211D24]/70 mt-1">
                Edit headlines, narratives, steps, and contact links across the entire site. Click "Save to Firebase" to publish live.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSavingContent}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] disabled:opacity-50 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4 text-[#D68C7C]" />
              <span>{isSavingContent ? 'Saving to Firebase...' : 'Save Storefront to Firebase'}</span>
            </button>
          </div>

          {/* Section A: Hero & Top Notice */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#241C2B] flex items-center gap-2 border-b border-[#211D24]/10 pb-2">
              <Sparkles className="w-4 h-4 text-[#D68C7C]" />
              <span>1. Homepage Hero & Announcement</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="md:col-span-2 space-y-1">
                <label className="font-semibold text-[#211D24]">Announcement Strip (Top Bar)</label>
                <input
                  type="text"
                  value={editableContent.announcementStrip}
                  onChange={(e) => setEditableContent({ ...editableContent, announcementStrip: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#211D24]">Hero Main Headline</label>
                <input
                  type="text"
                  value={editableContent.heroHeadline}
                  onChange={(e) => setEditableContent({ ...editableContent, heroHeadline: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#211D24]">Hero Editorial Subtitle</label>
                <input
                  type="text"
                  value={editableContent.heroSubtitle || ''}
                  onChange={(e) => setEditableContent({ ...editableContent, heroSubtitle: e.target.value })}
                  placeholder="Fragrance is personal. Finding yours should be, too."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#211D24]">Primary CTA Button Text</label>
                <input
                  type="text"
                  value={editableContent.heroPrimaryCta}
                  onChange={(e) => setEditableContent({ ...editableContent, heroPrimaryCta: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="font-semibold text-[#211D24]">Hero Subtitle & Supporting Copy</label>
                <textarea
                  rows={2}
                  value={editableContent.heroSubcopy}
                  onChange={(e) => setEditableContent({ ...editableContent, heroSubcopy: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#211D24]">Secondary CTA Button Text</label>
                <input
                  type="text"
                  value={editableContent.heroSecondaryCta}
                  onChange={(e) => setEditableContent({ ...editableContent, heroSecondaryCta: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section B: Brand Mission & Philosophy */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#241C2B] flex items-center gap-2 border-b border-[#211D24]/10 pb-2">
              <Sparkles className="w-4 h-4 text-[#D68C7C]" />
              <span>2. Brand Mission & Philosophy</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="md:col-span-2 space-y-1">
                <label className="font-semibold text-[#211D24]">Mission Headline</label>
                <input
                  type="text"
                  value={editableContent.missionHeadline}
                  onChange={(e) => setEditableContent({ ...editableContent, missionHeadline: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="font-semibold text-[#211D24]">Mission Body Copy</label>
                <textarea
                  rows={3}
                  value={editableContent.missionText}
                  onChange={(e) => setEditableContent({ ...editableContent, missionText: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="font-semibold text-[#211D24]">Philosophy Headline</label>
                <input
                  type="text"
                  value={editableContent.philosophyHeadline}
                  onChange={(e) => setEditableContent({ ...editableContent, philosophyHeadline: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="font-semibold text-[#211D24]">Philosophy Narrative</label>
                <textarea
                  rows={2}
                  value={editableContent.philosophyText}
                  onChange={(e) => setEditableContent({ ...editableContent, philosophyText: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section C: How House of ALORA Works (3 Steps) */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#241C2B] flex items-center gap-2 border-b border-[#211D24]/10 pb-2">
              <Sparkles className="w-4 h-4 text-[#D68C7C]" />
              <span>3. How House of ALORA Works (3 Steps)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#211D24]">Step 1: Discover & Compare</label>
                <textarea
                  rows={3}
                  value={editableContent.howItWorksStep1}
                  onChange={(e) => setEditableContent({ ...editableContent, howItWorksStep1: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#211D24]">Step 2: WhatsApp Assistance</label>
                <textarea
                  rows={3}
                  value={editableContent.howItWorksStep2}
                  onChange={(e) => setEditableContent({ ...editableContent, howItWorksStep2: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#211D24]">Step 3: Direct Dispatch</label>
                <textarea
                  rows={3}
                  value={editableContent.howItWorksStep3}
                  onChange={(e) => setEditableContent({ ...editableContent, howItWorksStep3: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section D: Our Story Page */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#241C2B] flex items-center gap-2 border-b border-[#211D24]/10 pb-2">
              <Sparkles className="w-4 h-4 text-[#D68C7C]" />
              <span>4. Our Story Page Narrative</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#211D24]">Our Story Main Title</label>
                <input
                  type="text"
                  value={editableContent.ourStoryTitle}
                  onChange={(e) => setEditableContent({ ...editableContent, ourStoryTitle: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#211D24]">Climate Challenge (Paragraph 1)</label>
                <textarea
                  rows={3}
                  value={editableContent.ourStoryText1}
                  onChange={(e) => setEditableContent({ ...editableContent, ourStoryText1: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#211D24]">Longevity & Olfactory Craft (Paragraph 2)</label>
                <textarea
                  rows={3}
                  value={editableContent.ourStoryText2}
                  onChange={(e) => setEditableContent({ ...editableContent, ourStoryText2: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section E: Official Social Channels & Concierge */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#241C2B] flex items-center gap-2 border-b border-[#211D24]/10 pb-2">
              <Sparkles className="w-4 h-4 text-[#D68C7C]" />
              <span>5. Social Handles & Concierge Details</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#211D24] flex items-center gap-1.5">
                  <TikTokIcon className="w-3.5 h-3.5" />
                  <span>TikTok Link</span>
                </label>
                <input
                  type="text"
                  value={editableContent.tiktokLink}
                  onChange={(e) => setEditableContent({ ...editableContent, tiktokLink: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#211D24] flex items-center gap-1.5">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram Link</span>
                </label>
                <input
                  type="text"
                  value={editableContent.instagramLink}
                  onChange={(e) => setEditableContent({ ...editableContent, instagramLink: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#211D24] flex items-center gap-1.5">
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>WhatsApp Link</span>
                </label>
                <input
                  type="text"
                  value={editableContent.whatsappLink}
                  onChange={(e) => setEditableContent({ ...editableContent, whatsappLink: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#211D24]">Contact Email</label>
                <input
                  type="email"
                  value={editableContent.contactEmail}
                  onChange={(e) => setEditableContent({ ...editableContent, contactEmail: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#211D24]">Physical Location / Address</label>
                <input
                  type="text"
                  value={editableContent.contactAddress}
                  onChange={(e) => setEditableContent({ ...editableContent, contactAddress: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#211D24]">Operating Hours</label>
                <input
                  type="text"
                  value={editableContent.contactHours}
                  onChange={(e) => setEditableContent({ ...editableContent, contactHours: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 focus:border-[#241C2B] text-xs"
                />
              </div>
            </div>
          </div>

          {/* Submit button at bottom */}
          <div className="pt-4 border-t border-[#211D24]/10 flex justify-end">
            <button
              type="submit"
              disabled={isSavingContent}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4 text-[#D68C7C]" />
              <span>{isSavingContent ? 'Saving to Firebase...' : 'Save All Storefront Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: PRODUCTS & CATALOG (SAVED TO FIREBASE, NO SKUs) */}
      {activeTab === 'products' && (
        <div className="bg-white border border-[#211D24]/10 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#211D24]/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl text-[#241C2B]">Fragrance Catalog & Inventory</h2>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Firebase Sync Enabled
                </span>
              </div>
              <p className="text-xs text-[#211D24]/70 mt-1">
                All changes, new fragrances, and deletions are saved to Firebase Firestore. SKUs have been removed.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddNewProduct}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] transition-colors"
            >
              <Plus className="w-4 h-4 text-[#D68C7C]" />
              <span>Add New Fragrance</span>
            </button>
          </div>

          {/* Products Table without SKUs */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#211D24]/10 divide-y divide-[#211D24]/10">
              <thead className="bg-[#FAF8F5] text-[#211D24]/70 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3">Fragrance</th>
                  <th className="p-3">Format</th>
                  <th className="p-3">Retail (GH₵)</th>
                  <th className="p-3">Stock Units</th>
                  <th className="p-3">Verification</th>
                  <th className="p-3">Publication</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#211D24]/10 bg-white">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]/40 transition-colors">
                    <td className="p-3 font-medium text-[#241C2B]">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-10 h-10 object-cover shrink-0 border border-[#211D24]/10" />
                        <div>
                          <span className="block font-serif text-base">{p.name}</span>
                          <span className="text-[11px] text-[#211D24]/60">{p.fragranceFamily} · {p.size}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 capitalize">{p.productType.replace('_', ' ')}</td>
                    <td className="p-3 font-mono tabular-nums font-semibold text-sm">
                      GH₵ {p.price.toFixed(2)}
                    </td>
                    <td className="p-3 font-mono tabular-nums">
                      <span className={p.stockCount <= 5 ? 'text-amber-800 font-bold' : ''}>
                        {p.stockCount}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={async () => {
                          await updateProduct({ ...p, verified: !p.verified });
                          notify(`Verification for "${p.name}" updated in Firebase.`);
                        }}
                        className={`px-2 py-0.5 text-[11px] font-semibold uppercase ${
                          p.verified ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
                        }`}
                      >
                        {p.verified ? 'Verified' : 'Unverified'}
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={async () => {
                          const nextStatus: PublicationStatus =
                            p.publicationStatus === 'published' ? 'draft' : 'published';
                          await updateProduct({ ...p, publicationStatus: nextStatus });
                          notify(`Status for "${p.name}" set to ${nextStatus}.`);
                        }}
                        className={`px-2 py-0.5 text-[11px] font-semibold uppercase ${
                          p.publicationStatus === 'published' ? 'bg-[#241C2B] text-white' : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {p.publicationStatus}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1.5 text-[#241C2B] hover:text-[#D68C7C] transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (window.confirm(`Delete "${p.name}" from catalog and Firebase?`)) {
                              await deleteProduct(p.id);
                              notify(`Deleted "${p.name}" from catalog.`);
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-red-700 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Comprehensive Product Edit / Add Modal */}
          {(editingProduct || isAddingNewProduct) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
              <div className="bg-white border border-[#211D24]/20 w-full max-w-3xl my-8 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-[#211D24]/10 pb-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#241C2B]">
                      {isAddingNewProduct ? 'Add New Fragrance' : `Edit Fragrance: ${editingProduct?.name}`}
                    </h3>
                    <span className="text-xs text-[#211D24]/60">
                      Changes are directly saved to Firebase Firestore storage.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setIsAddingNewProduct(false);
                    }}
                    className="p-2 text-[#211D24]/60 hover:text-[#241C2B]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold block">Fragrance Name *</label>
                      <input
                        type="text"
                        required
                        value={productFormState.name}
                        onChange={(e) => setProductFormState({ ...productFormState, name: e.target.value })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block">Brand</label>
                      <input
                        type="text"
                        value={productFormState.brand}
                        onChange={(e) => setProductFormState({ ...productFormState, brand: e.target.value })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block">Fragrance Family *</label>
                      <select
                        value={productFormState.fragranceFamily}
                        onChange={(e) => setProductFormState({ ...productFormState, fragranceFamily: e.target.value as any })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20"
                      >
                        <option value="Warm Woody">Warm Woody</option>
                        <option value="Crisp Floral">Crisp Floral</option>
                        <option value="Fresh Citrus & Aquatic">Fresh Citrus & Aquatic</option>
                        <option value="Amber & Gourmand">Amber & Gourmand</option>
                        <option value="Aromatic Green">Aromatic Green</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block">Product Type / Format *</label>
                      <select
                        value={productFormState.productType}
                        onChange={(e) => setProductFormState({ ...productFormState, productType: e.target.value as any })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20"
                      >
                        <option value="eau_de_parfum">Eau de Parfum</option>
                        <option value="body_splash">Body Splash</option>
                        <option value="perfume_oil">Pure Perfume Oil</option>
                        <option value="gift_bundle">Gift Bundle</option>
                        <option value="decant">Decant (Conditional)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block">Retail Price (GH₵) *</label>
                      <input
                        type="number"
                        required
                        value={productFormState.price}
                        onChange={(e) => setProductFormState({ ...productFormState, price: Number(e.target.value) })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block">Bottle Size / Volume</label>
                      <input
                        type="text"
                        value={productFormState.size}
                        onChange={(e) => setProductFormState({ ...productFormState, size: e.target.value })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block">Stock Units *</label>
                      <input
                        type="number"
                        value={productFormState.stockCount}
                        onChange={(e) => setProductFormState({ ...productFormState, stockCount: Number(e.target.value) })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block">Availability State</label>
                      <select
                        value={productFormState.availability}
                        onChange={(e) => setProductFormState({ ...productFormState, availability: e.target.value as any })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20"
                      >
                        <option value="in_stock">In Stock</option>
                        <option value="low_stock">Low Stock</option>
                        <option value="preorder">Pre-Order</option>
                        <option value="out_of_stock">Out of Stock</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block">Publication Status</label>
                      <select
                        value={productFormState.publicationStatus}
                        onChange={(e) => setProductFormState({ ...productFormState, publicationStatus: e.target.value as any })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20"
                      >
                        <option value="published">Published (Visible in Shop)</option>
                        <option value="draft">Draft (Hidden in Staging)</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block">Verification Status</label>
                      <select
                        value={productFormState.verified ? 'true' : 'false'}
                        onChange={(e) => setProductFormState({ ...productFormState, verified: e.target.value === 'true' })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20"
                      >
                        <option value="true">Verified Formulation</option>
                        <option value="false">Unverified</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block">Longevity (Hours)</label>
                      <input
                        type="text"
                        value={productFormState.longevity}
                        onChange={(e) => setProductFormState({ ...productFormState, longevity: e.target.value })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block">Sillage / Projection</label>
                      <input
                        type="text"
                        value={productFormState.sillage}
                        onChange={(e) => setProductFormState({ ...productFormState, sillage: e.target.value })}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#211D24]/20"
                      />
                    </div>
                  </div>

                  {/* Notes Breakdown */}
                  <div className="pt-2 border-t border-[#211D24]/10 space-y-3">
                    <span className="font-serif text-sm font-semibold text-[#241C2B] block">
                      Olfactory Notes Breakdown (Comma-separated)
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="font-semibold block text-[11px]">Top Notes</label>
                        <input
                          type="text"
                          value={productFormState.topNotes}
                          onChange={(e) => setProductFormState({ ...productFormState, topNotes: e.target.value })}
                          className="w-full p-2 bg-[#FAF8F5] border border-[#211D24]/20 text-xs"
                          placeholder="Bergamot, Pink Pepper"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold block text-[11px]">Heart Notes</label>
                        <input
                          type="text"
                          value={productFormState.heartNotes}
                          onChange={(e) => setProductFormState({ ...productFormState, heartNotes: e.target.value })}
                          className="w-full p-2 bg-[#FAF8F5] border border-[#211D24]/20 text-xs"
                          placeholder="Cedarwood, Amber"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold block text-[11px]">Base Notes</label>
                        <input
                          type="text"
                          value={productFormState.baseNotes}
                          onChange={(e) => setProductFormState({ ...productFormState, baseNotes: e.target.value })}
                          className="w-full p-2 bg-[#FAF8F5] border border-[#211D24]/20 text-xs"
                          placeholder="Bourbon Vanilla, Musk"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fragrance Photo Upload & Presets */}
                  <div className="space-y-3 pt-3 border-t border-[#211D24]/10">
                    <div className="p-4 bg-[#FAF8F5] border border-[#211D24]/15 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-semibold block text-xs text-[#241C2B]">
                            Upload Fragrance Photo *
                          </label>
                          <span className="text-[11px] text-[#211D24]/60">
                            Upload high-res photo from your device (PNG, JPG, WEBP)
                          </span>
                        </div>
                        {productFormState.imageUrl && (
                          <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                            Photo Loaded
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="text-xs file:mr-3 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-[#241C2B] file:text-[#F5F2EE] hover:file:bg-[#211D24] cursor-pointer"
                        />

                        {productFormState.imageUrl && (
                          <div className="flex items-center gap-3">
                            <img
                              src={productFormState.imageUrl}
                              alt="Fragrance Preview"
                              className="w-14 h-14 object-cover border border-[#211D24]/20 shadow-xs"
                            />
                            <div className="text-[11px] text-[#211D24]/70">
                              <span className="block font-medium">Active Image Preview</span>
                              <span className="text-[10px] text-[#211D24]/50">Will display on product card & PDP</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Curated Pinterest Aesthetic Image Presets */}
                      <div className="pt-2 border-t border-[#211D24]/10 space-y-2">
                        <span className="text-[11px] font-semibold text-[#241C2B] block">
                          Or select from curated Pinterest luxury fragrance photography:
                        </span>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label: 'Luxury Decants', url: '/src/assets/images/luxury_perfume_decants_1791695120764.jpg' },
                            { label: 'Attar Perfume Oil', url: '/src/assets/images/luxury_perfume_oil_attar_1791695130931.jpg' },
                            { label: 'Body Splash Mist', url: '/src/assets/images/luxury_body_splash_mist_1791695141478.jpg' },
                            { label: 'Decant Bar Tray', url: '/src/assets/images/luxury_decant_bar_aesthetic_1791695150602.jpg' },
                          ].map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setProductFormState((prev) => ({ ...prev, imageUrl: preset.url }))}
                              className={`p-1.5 border text-left flex flex-col items-center gap-1 transition-all ${
                                productFormState.imageUrl === preset.url
                                  ? 'border-[#241C2B] bg-[#241C2B]/5 ring-1 ring-[#241C2B]'
                                  : 'border-[#211D24]/15 hover:border-[#241C2B]/40 bg-white'
                              }`}
                            >
                              <img src={preset.url} alt={preset.label} className="w-full aspect-square object-cover" />
                              <span className="text-[9px] font-medium text-center text-[#211D24]/80 leading-tight">
                                {preset.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-1">
                        <label className="text-[10px] text-[#211D24]/60 block">Direct Image URL / Path (Optional):</label>
                        <input
                          type="text"
                          value={productFormState.imageUrl}
                          onChange={(e) => setProductFormState({ ...productFormState, imageUrl: e.target.value })}
                          className="w-full mt-1 p-2 bg-white border border-[#211D24]/20 font-mono text-[11px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Decant Configuration Module */}
                  <div className="p-4 bg-[#FAF8F5] border border-[#211D24]/15 space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-[#241C2B]">
                      <input
                        type="checkbox"
                        checked={productFormState.decantAvailable}
                        onChange={(e) => setProductFormState({ ...productFormState, decantAvailable: e.target.checked })}
                        className="accent-[#241C2B]"
                      />
                      <span>Offer Decant Sizes For This Fragrance (3ml, 5ml, 10ml)</span>
                    </label>
                    <p className="text-[11px] text-[#211D24]/65">
                      Empower customers in Ghana to test wear genuine decants before committing to full bottles.
                    </p>

                    {productFormState.decantAvailable && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="space-y-1">
                          <label className="font-semibold block text-[11px]">3ml Sample Decant (GH₵)</label>
                          <input
                            type="number"
                            value={productFormState.price3ml}
                            onChange={(e) => setProductFormState({ ...productFormState, price3ml: Number(e.target.value) })}
                            className="w-full p-2 bg-white border border-[#211D24]/20 font-mono text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold block text-[11px]">5ml Travel Decant (GH₵)</label>
                          <input
                            type="number"
                            value={productFormState.price5ml}
                            onChange={(e) => setProductFormState({ ...productFormState, price5ml: Number(e.target.value) })}
                            className="w-full p-2 bg-white border border-[#211D24]/20 font-mono text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold block text-[11px]">10ml Deluxe Decant (GH₵)</label>
                          <input
                            type="number"
                            value={productFormState.price10ml}
                            onChange={(e) => setProductFormState({ ...productFormState, price10ml: Number(e.target.value) })}
                            className="w-full p-2 bg-white border border-[#211D24]/20 font-mono text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-3 pt-2 border-t border-[#211D24]/10">
                    <div className="space-y-1">
                      <label className="font-semibold block">Short Description (Card Teaser)</label>
                      <input
                        type="text"
                        value={productFormState.shortDescription}
                        onChange={(e) => setProductFormState({ ...productFormState, shortDescription: e.target.value })}
                        className="w-full p-2 bg-[#FAF8F5] border border-[#211D24]/20 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block">Full Narrative Description</label>
                      <textarea
                        rows={3}
                        value={productFormState.description}
                        onChange={(e) => setProductFormState({ ...productFormState, description: e.target.value })}
                        className="w-full p-2 bg-[#FAF8F5] border border-[#211D24]/20 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#211D24]/10">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setIsAddingNewProduct(false);
                      }}
                      className="px-4 py-2.5 text-xs uppercase font-semibold border border-[#211D24]/20"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#241C2B] hover:bg-[#211D24] transition-colors"
                    >
                      Save to Firebase
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FEATURE FLAGS */}
      {activeTab === 'flags' && (
        <div className="bg-white border border-[#211D24]/10 p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#211D24]/10 pb-4">
            <h2 className="font-serif text-2xl text-[#241C2B]">Commercial Feature Flags & Staging Controls</h2>
            <p className="text-xs text-[#211D24]/70 mt-1">
              Control the operational state of retail features. Decants and live payment gateways remain strictly safeguarded.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Decant Sales Flag (CRITICAL REQUIREMENT) */}
            <div className="p-5 border border-red-200 bg-red-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-xs text-red-950 block">Decant Commercial Sales</span>
                  <span className="text-[11px] text-red-800">
                    Regulatory condition: Default disabled until approved.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateFeatureFlags({ decantSales: !featureFlags.decantSales });
                    notify(`Decant sales set to ${!featureFlags.decantSales ? 'ENABLED' : 'DISABLED'}`);
                  }}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase ${
                    featureFlags.decantSales ? 'bg-red-700 text-white' : 'bg-stone-300 text-stone-700'
                  }`}
                >
                  {featureFlags.decantSales ? 'ENABLED' : 'DISABLED (SAFE)'}
                </button>
              </div>
              <p className="text-[11px] text-red-900/80 leading-relaxed">
                As required by House of ALORA compliance, decants cannot be listed for sale without explicit regulatory approval.
              </p>
            </div>

            {/* Live Payments Flag */}
            <div className="p-5 border border-amber-200 bg-amber-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-xs text-amber-950 block">Production Live Payments</span>
                  <span className="text-[11px] text-amber-800">
                    Adapter currently operating in verified sandbox mode.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateFeatureFlags({ paymentsLive: !featureFlags.paymentsLive });
                    notify(`Live payments set to ${!featureFlags.paymentsLive ? 'LIVE' : 'SANDBOX'}`);
                  }}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase ${
                    featureFlags.paymentsLive ? 'bg-amber-700 text-white' : 'bg-stone-300 text-stone-700'
                  }`}
                >
                  {featureFlags.paymentsLive ? 'LIVE' : 'SANDBOX SIMULATOR'}
                </button>
              </div>
              <p className="text-[11px] text-amber-900/80 leading-relaxed">
                When disabled, the checkout uses our verified server-side payment adapter for staging testing.
              </p>
            </div>

            {/* Catalogue Publication */}
            <div className="p-5 border border-[#211D24]/10 bg-[#FAF8F5] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-xs text-[#241C2B] block">Catalogue Publication</span>
                  <span className="text-[11px] text-[#211D24]/60">Allow public to view products.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateFeatureFlags({ cataloguePublication: !featureFlags.cataloguePublication });
                    notify(`Catalogue publication changed.`);
                  }}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase ${
                    featureFlags.cataloguePublication ? 'bg-emerald-800 text-white' : 'bg-stone-300 text-stone-700'
                  }`}
                >
                  {featureFlags.cataloguePublication ? 'ONLINE' : 'PRELAUNCH STATE'}
                </button>
              </div>
            </div>

            {/* WhatsApp Ordering */}
            <div className="p-5 border border-[#211D24]/10 bg-[#FAF8F5] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-xs text-[#241C2B] block">WhatsApp Assisted Purchasing</span>
                  <span className="text-[11px] text-[#211D24]/60">Export cart and products to official WhatsApp line.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateFeatureFlags({ whatsAppOrdering: !featureFlags.whatsAppOrdering });
                    notify(`WhatsApp ordering updated.`);
                  }}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase ${
                    featureFlags.whatsAppOrdering ? 'bg-emerald-800 text-white' : 'bg-stone-300 text-stone-700'
                  }`}
                >
                  {featureFlags.whatsAppOrdering ? 'ACTIVE' : 'DISABLED'}
                </button>
              </div>
            </div>

            {/* Online Checkout */}
            <div className="p-5 border border-[#211D24]/10 bg-[#FAF8F5] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-xs text-[#241C2B] block">Online Web Checkout Flow</span>
                  <span className="text-[11px] text-[#211D24]/60">Enable direct website cart checkout.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateFeatureFlags({ onlineCheckout: !featureFlags.onlineCheckout });
                    notify(`Online checkout updated.`);
                  }}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase ${
                    featureFlags.onlineCheckout ? 'bg-emerald-800 text-white' : 'bg-stone-300 text-stone-700'
                  }`}
                >
                  {featureFlags.onlineCheckout ? 'ACTIVE' : 'DISABLED'}
                </button>
              </div>
            </div>

            {/* Customer Accounts */}
            <div className="p-5 border border-[#211D24]/10 bg-[#FAF8F5] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-xs text-[#241C2B] block">Customer Accounts & Preferences</span>
                  <span className="text-[11px] text-[#211D24]/60">Allow clients to save preferences with consent.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateFeatureFlags({ customerAccounts: !featureFlags.customerAccounts });
                    notify(`Customer accounts updated.`);
                  }}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase ${
                    featureFlags.customerAccounts ? 'bg-emerald-800 text-white' : 'bg-stone-300 text-stone-700'
                  }`}
                >
                  {featureFlags.customerAccounts ? 'ACTIVE' : 'DISABLED'}
                </button>
              </div>
            </div>
          </div>

          {/* Color Palette Direction Section */}
          <div className="pt-6 border-t border-[#211D24]/10 space-y-4">
            <div>
              <h3 className="font-serif text-xl text-[#241C2B]">Global Brand Color Palette</h3>
              <p className="text-xs text-[#211D24]/70 mt-0.5">
                Switch the active visual colorway for the entire storefront in real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableThemes.map((pal) => {
                const isActive = pal.id === theme;
                return (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => {
                      setTheme(pal.id);
                      notify(`Storefront palette changed to ${pal.name}.`);
                    }}
                    className={`p-4 text-left border transition-all ${
                      isActive ? 'border-[#241C2B] bg-[#FAF8F5] shadow-xs' : 'border-[#211D24]/15 hover:border-[#241C2B]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-base text-[#241C2B]">{pal.name}</span>
                      {isActive && <Check className="w-4 h-4 text-[#241C2B]" />}
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 inline-block shadow-xs"
                        style={{ backgroundColor: pal.primary }}
                        title="Primary"
                      />
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 inline-block shadow-xs"
                        style={{ backgroundColor: pal.accent }}
                        title="Accent"
                      />
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 inline-block shadow-xs"
                        style={{ backgroundColor: pal.bg }}
                        title="Background Canvas"
                      />
                    </div>
                    <span className="text-[11px] text-[#211D24]/60 leading-tight block">
                      {pal.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: QUIZ WEIGHTS TUNING */}
      {activeTab === 'quiz' && (
        <div className="bg-white border border-[#211D24]/10 p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#211D24]/10 pb-4">
            <h2 className="font-serif text-2xl text-[#241C2B]">Deterministic Recommendation Engine Weights</h2>
            <p className="text-xs text-[#211D24]/70 mt-1">
              Adjust matching formula weights. (Default: Family 30%, Notes 20%, Occasion 15%, Budget 20%, Intensity 15%).
            </p>
          </div>

          <div className="space-y-5 max-w-xl text-xs">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold">Scent Family Weight</span>
                <span className="font-mono font-bold">{Math.round(quizWeights.familyWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.50"
                step="0.05"
                value={quizWeights.familyWeight}
                onChange={(e) => updateQuizWeights({ familyWeight: Number(e.target.value) })}
                className="w-full accent-[#241C2B]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold">Verified Notes Weight</span>
                <span className="font-mono font-bold">{Math.round(quizWeights.notesWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.40"
                step="0.05"
                value={quizWeights.notesWeight}
                onChange={(e) => updateQuizWeights({ notesWeight: Number(e.target.value) })}
                className="w-full accent-[#241C2B]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold">Occasion Fit Weight</span>
                <span className="font-mono font-bold">{Math.round(quizWeights.occasionWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.30"
                step="0.05"
                value={quizWeights.occasionWeight}
                onChange={(e) => updateQuizWeights({ occasionWeight: Number(e.target.value) })}
                className="w-full accent-[#241C2B]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold">Budget Ceiling Alignment Weight</span>
                <span className="font-mono font-bold">{Math.round(quizWeights.budgetWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.40"
                step="0.05"
                value={quizWeights.budgetWeight}
                onChange={(e) => updateQuizWeights({ budgetWeight: Number(e.target.value) })}
                className="w-full accent-[#241C2B]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold">Intensity / Sillage Weight</span>
                <span className="font-mono font-bold">{Math.round(quizWeights.intensityWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.30"
                step="0.05"
                value={quizWeights.intensityWeight}
                onChange={(e) => updateQuizWeights({ intensityWeight: Number(e.target.value) })}
                className="w-full accent-[#241C2B]"
              />
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => notify('Recommendation engine weights saved successfully.')}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#241C2B]"
              >
                Save Engine Calibration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-[#211D24]/10 p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#211D24]/10 pb-4">
            <h2 className="font-serif text-2xl text-[#241C2B]">Ghana Customer Orders</h2>
            <p className="text-xs text-[#211D24]/70 mt-1">
              Track courier dispatches and update fulfillment milestones.
            </p>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="p-5 border border-[#211D24]/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-mono font-bold text-sm text-[#241C2B]">{ord.reference}</span>
                      <span className="text-xs text-[#211D24]/70 ml-2">
                        {ord.customer.fullName} ({ord.customer.phone}) · {ord.customer.city}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={ord.status}
                        onChange={(e) => {
                          updateOrderStatus(ord.id, e.target.value as any);
                          notify(`Order #${ord.reference} marked as ${e.target.value}.`);
                        }}
                        className="text-xs bg-[#FAF8F5] border border-[#211D24]/20 px-2 py-1"
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing & Sealed</option>
                        <option value="dispatched">Dispatched with Courier</option>
                        <option value="delivered">Delivered</option>
                      </select>

                      <span className="font-mono font-bold text-xs text-[#241C2B] tabular-nums">
                        GH₵ {ord.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-[#211D24]/70 pl-2 border-l-2 border-[#241C2B]/20">
                    Items: {ord.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#211D24]/60">
              No orders placed on this instance yet.
            </div>
          )}
        </div>
      )}

      {/* TAB 6: INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="bg-white border border-[#211D24]/10 p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#211D24]/10 pb-4">
            <h2 className="font-serif text-2xl text-[#241C2B]">Customer Contact Inquiries</h2>
            <p className="text-xs text-[#211D24]/70 mt-1">
              Direct inquiries submitted through the contact page and House of ALORA concierge.
            </p>
          </div>

          {inquiries.length > 0 ? (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-5 border border-[#211D24]/10 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-serif text-lg text-[#241C2B] block">{inq.subject}</span>
                      <span className="text-xs text-[#211D24]/60">
                        From: {inq.name} ({inq.email} · {inq.phone})
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#211D24]/50">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-[#211D24]/80 leading-relaxed bg-[#FAF8F5] p-3 border border-[#211D24]/5">
                    {inq.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#211D24]/60">
              No customer inquiries in inbox.
            </div>
          )}
        </div>
      )}

      {/* TAB 7: AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-[#211D24]/10 p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#211D24]/10 pb-4">
            <h2 className="font-serif text-2xl text-[#241C2B]">Administrative Audit Logs</h2>
            <p className="text-xs text-[#211D24]/70 mt-1">
              Chronological ledger of security and configuration events for regulatory accountability.
            </p>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-[#FAF8F5] border border-[#211D24]/10 flex items-start justify-between text-xs font-mono">
                <div className="space-y-0.5">
                  <span className="font-bold text-[#241C2B] block">[{log.action}]</span>
                  <span className="text-[#211D24]/80 font-sans">{log.details}</span>
                  <span className="text-[10px] text-[#211D24]/50 block">By: {log.user}</span>
                </div>
                <span className="text-[11px] text-[#211D24]/50 shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
