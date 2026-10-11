import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  FeatureFlags,
  ContactInquiry,
  AuditLogEntry,
  UserPreferences,
  QuizAnswers,
  ThemeOption,
  ThemePaletteInfo,
  SiteContent,
  PromoCodeResult,
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { DEFAULT_WEIGHTS, QuizEngineWeights } from '../services/recommendationEngine';
import { db } from '../services/firebase';
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

export const AVAILABLE_THEMES: ThemePaletteInfo[] = [
  {
    id: 'luxe_noir',
    name: 'Luxe Noir & Amber',
    subtitle: 'Rich obsidian & champagne gold',
    primary: '#171512',
    accent: '#C59B3F',
    bg: '#FAF9F5',
  },
  {
    id: 'terracotta',
    name: 'Warm Sandstone',
    subtitle: 'Roasted cacao & sunlit terracotta',
    primary: '#211915',
    accent: '#C26B43',
    bg: '#F8F5EE',
  },
  {
    id: 'monochrome',
    name: 'Gallery Minimalist',
    subtitle: 'Pure studio noir & clean ivory',
    primary: '#121214',
    accent: '#9A7B4F',
    bg: '#FCFCFA',
  },
  {
    id: 'botanical',
    name: 'Forest & Brass',
    subtitle: 'Deep cypress & honey bronze',
    primary: '#132219',
    accent: '#B89243',
    bg: '#F5F7F4',
  },
  {
    id: 'plum',
    name: 'Original Plum',
    subtitle: 'Midnight plum & muted coral',
    primary: '#241C2B',
    accent: '#D68C7C',
    bg: '#F5F2EE',
  },
];

export const DEFAULT_SITE_CONTENT: SiteContent = {
  heroHeadline: 'Smell beyond the ordinary.',
  heroSubtitle: 'Fragrance is personal. Finding yours should be, too.',
  heroSubcopy: 'Discover thoughtfully curated fragrances, explore your preferences, and find scents that feel unmistakably you.',
  heroPrimaryCta: 'Discover Your Scent',
  heroSecondaryCta: 'Explore Fragrances',
  announcementStrip: 'Authentic Perfume Decants (3ml, 5ml, 10ml) · Perfume Oils · Body Splashes · Full Bottles · Accra Same-Day Delivery',
  missionHeadline: 'Never blind-buy from an online review. Test with authentic decants first.',
  missionText: 'Alora Fragrance House was founded in Accra to bridge the gap between watching glowing fragrance reviews on social media and risking an expensive blind buy on a full bottle. We hand-decant 100% genuine luxury perfumes into travel atomizers (3ml, 5ml, 10ml), alongside authentic concentrated perfume oils, fine body splashes, and sealed full flacons.',
  howItWorksStep1: 'Explore our curated collection or take the scent quiz. Choose sample decants (3ml, 5ml, 10ml), pure oils, or full presentation bottles.',
  howItWorksStep2: 'Every decant is hand-drawn directly from genuine retail flacons into sterile glass atomizers with fine gold spray nozzles to test wear in Ghana’s heat.',
  howItWorksStep3: 'Rapid courier delivery across Greater Accra, Kumasi, Takoradi, and nationwide courier hubs across Ghana.',
  philosophyHeadline: 'Ready to find a signature scent that truly suits your skin?',
  philosophyText: 'Sample before you commit. Test top, heart, and base notes through a full day before investing in full bottles.',
  ourStoryTitle: 'Bridging the gap between online reviews and confident fragrance discovery in Ghana.',
  ourStoryText1: 'We are not a perfume factory—we are your premier fragrance curator and decanting house in Accra. Everyone has watched a viral perfume review on TikTok or YouTube, spent hundreds of Cedis on a blind buy, and ended up disappointed because the fragrance didn’t match their skin chemistry or evaporated in Ghana’s coastal humidity.',
  ourStoryText2: 'Alora Fragrance House solves this. We offer authentic 3ml, 5ml, and 10ml luxury decants so you can test wear coveted niche perfumes on your skin for days before deciding on a full bottle. We also curate alcohol-free pure perfume oils (attars) for all-day sillage, everyday fine body splashes, and sealed full bottles at honest Ghanaian Cedi prices.',
  contactAddress: 'East Legon, Boundary Road, Accra, Ghana',
  contactHours: 'Monday – Saturday: 9:00 AM – 6:00 PM GMT',
  contactEmail: 'concierge@alorafragrancehouse.com',
  whatsappLink: 'https://wa.me/message/5BK5FD4YQXOOB1',
  instagramLink: 'https://www.instagram.com/alora.scentsss_?igsi=ZG1wZnAydGJjM212&utm_source=qr',
  tiktokLink: 'https://www.tiktok.com/@_alora.scents?_r=1&_t=ZS-99CgGuy88Qe',
  updatedAt: new Date().toISOString(),
};

interface AppContextType {
  // Site Content (Editable by Admin & Saved to Firebase)
  siteContent: SiteContent;
  updateSiteContent: (content: Partial<SiteContent>) => Promise<void>;
  isFirebaseSynced: boolean;

  // Products
  products: Product[];
  publishedProducts: Product[];
  updateProduct: (product: Product) => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Theme
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  availableThemes: ThemePaletteInfo[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedPrice?: number) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  updateCartQuantity: (productId: string, selectedSize: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;

  // Promo Code (e.g. WELCOME10)
  appliedPromoCode: string | null;
  promoDiscountPercent: number;
  promoDiscountAmount: number;
  cartTotalAfterPromo: number;
  applyPromoCode: (code: string) => PromoCodeResult;
  removePromoCode: () => void;

  // Interactive Assistant & Quiz Modals
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  isScentQuizOpen: boolean;
  setIsScentQuizOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Compare
  compareList: string[];
  addToCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;

  // Preferences & Quiz
  userPreferences: UserPreferences;
  saveQuizPreferences: (answers: QuizAnswers, consent: boolean) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  clearPreferences: () => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'reference' | 'createdAt'>) => Order;
  findOrder: (referenceOrId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status'], paymentStatus?: Order['paymentStatus']) => void;

  // Contact Inquiries
  inquiries: ContactInquiry[];
  submitInquiry: (data: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => void;

  // Feature Flags
  featureFlags: FeatureFlags;
  updateFeatureFlags: (flags: Partial<FeatureFlags>) => void;

  // Quiz Engine Weights
  quizWeights: QuizEngineWeights;
  updateQuizWeights: (weights: Partial<QuizEngineWeights>) => void;

  // Admin Auth & Audit
  isAdminLoggedIn: boolean;
  adminLogin: (passcode: string) => boolean;
  adminLogout: () => void;
  auditLogs: AuditLogEntry[];
  addAuditLog: (action: string, details: string) => void;
}

const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  cataloguePublication: true,
  whatsAppOrdering: true,
  customerAccounts: true,
  onlineCheckout: true,
  paymentsLive: false,
  decantSales: true,
  giftBundles: true,
};

const DEFAULT_USER_PREFERENCES: UserPreferences = {
  favoriteFamilies: [],
  favoriteNotes: [],
  dislikedNotes: [],
  preferredIntensity: 'any',
  consentGranted: false,
  updatedAt: new Date().toISOString(),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme State
  const [theme, setThemeState] = useState<ThemeOption>(() => {
    try {
      const stored = localStorage.getItem('alora_palette_v1') as ThemeOption;
      if (stored && ['luxe_noir', 'terracotta', 'monochrome', 'botanical', 'plum'].includes(stored)) {
        return stored;
      }
      return 'luxe_noir';
    } catch {
      return 'luxe_noir';
    }
  });

  const setTheme = (newTheme: ThemeOption) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('alora_palette_v1', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Site Content State (Editable by admin, stored in Firebase)
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const stored = localStorage.getItem('alora_site_content_v1');
      return stored ? { ...DEFAULT_SITE_CONTENT, ...JSON.parse(stored) } : DEFAULT_SITE_CONTENT;
    } catch {
      return DEFAULT_SITE_CONTENT;
    }
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('alora_products_v2');
      if (stored) return JSON.parse(stored);
      // Migrate from v1 or use INITIAL_PRODUCTS
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Feature Flags
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(() => {
    try {
      const stored = localStorage.getItem('alora_feature_flags_v2');
      return stored ? { ...DEFAULT_FEATURE_FLAGS, ...JSON.parse(stored), decantSales: true } : DEFAULT_FEATURE_FLAGS;
    } catch {
      return DEFAULT_FEATURE_FLAGS;
    }
  });

  // Quiz Engine Weights
  const [quizWeights, setQuizWeights] = useState<QuizEngineWeights>(() => {
    try {
      const stored = localStorage.getItem('alora_quiz_weights_v1');
      return stored ? JSON.parse(stored) : DEFAULT_WEIGHTS;
    } catch {
      return DEFAULT_WEIGHTS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('alora_cart_v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('alora_wishlist_v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Compare
  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('alora_compare_v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // User Preferences
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    try {
      const stored = localStorage.getItem('alora_preferences_v1');
      return stored ? JSON.parse(stored) : DEFAULT_USER_PREFERENCES;
    } catch {
      return DEFAULT_USER_PREFERENCES;
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem('alora_orders_v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Inquiries
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const stored = localStorage.getItem('alora_inquiries_v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    try {
      const stored = localStorage.getItem('alora_audit_logs_v1');
      return stored ? JSON.parse(stored) : [
        {
          id: 'log-init',
          action: 'SYSTEM_BOOT',
          user: 'System Admin',
          details: 'Initialized House of ALORA platform with Firebase Firestore storage integration.',
          timestamp: new Date().toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  // Admin Session State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('alora_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [isFirebaseSynced, setIsFirebaseSynced] = useState(false);

  // Initial Firebase Sync on mount
  useEffect(() => {
    async function syncFromFirebase() {
      try {
        // 1. Sync Site Content
        const contentDocRef = doc(db, 'site_settings', 'content');
        const contentSnap = await getDoc(contentDocRef);
        if (contentSnap.exists()) {
          const remoteContent = contentSnap.data() as SiteContent;
          setSiteContent((prev) => ({ ...prev, ...remoteContent }));
        } else {
          // Initialize remote document
          await setDoc(contentDocRef, DEFAULT_SITE_CONTENT);
        }

        // 2. Sync Products
        const productsColRef = collection(db, 'products');
        const productsSnap = await getDocs(productsColRef);
        if (!productsSnap.empty) {
          const remoteProducts: Product[] = [];
          productsSnap.forEach((d) => {
            const data = d.data() as Product;
            const matchingInitial = INITIAL_PRODUCTS.find((ip) => ip.id === data.id || ip.slug === data.slug);
            const enriched: Product = {
              ...data,
              brand: 'Alora Fragrance House',
              publicationStatus: 'published',
              verified: true,
              decantAvailable: data.decantAvailable ?? matchingInitial?.decantAvailable ?? true,
              decantOptions: data.decantOptions && data.decantOptions.length > 0
                ? data.decantOptions
                : matchingInitial?.decantOptions ?? [
                    { size: '3ml Sample Decant', price: Math.round(data.price * 0.1) || 35 },
                    { size: '5ml Travel Decant', price: Math.round(data.price * 0.16) || 55 },
                    { size: '10ml Deluxe Decant', price: Math.round(data.price * 0.28) || 95 },
                    { size: `Full Bottle (${data.size || '100ml'})`, price: data.price },
                  ],
            };
            remoteProducts.push(enriched);
          });
          if (remoteProducts.length > 0) {
            // Also ensure all initial products exist
            const existingIds = new Set(remoteProducts.map((p) => p.id));
            const missingInitials = INITIAL_PRODUCTS.filter((ip) => !existingIds.has(ip.id));
            setProducts([...remoteProducts, ...missingInitials]);
          }
        } else {
          // Seed initial products to Firestore
          for (const p of INITIAL_PRODUCTS) {
            await setDoc(doc(db, 'products', p.id), p);
          }
        }

        setIsFirebaseSynced(true);
      } catch (err) {
        console.warn('Firebase sync notice (fallback to local state):', err);
        setIsFirebaseSynced(true);
      }
    }

    syncFromFirebase();
  }, []);

  // Local storage persistence
  useEffect(() => {
    localStorage.setItem('alora_site_content_v1', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('alora_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('alora_feature_flags_v2', JSON.stringify(featureFlags));
  }, [featureFlags]);

  useEffect(() => {
    localStorage.setItem('alora_quiz_weights_v1', JSON.stringify(quizWeights));
  }, [quizWeights]);

  useEffect(() => {
    localStorage.setItem('alora_cart_v1', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('alora_wishlist_v1', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('alora_compare_v1', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('alora_preferences_v1', JSON.stringify(userPreferences));
  }, [userPreferences]);

  useEffect(() => {
    localStorage.setItem('alora_orders_v1', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('alora_inquiries_v1', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('alora_audit_logs_v1', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const publishedProducts = products.filter((p) => {
    if (!featureFlags.cataloguePublication) return false;
    if (p.publicationStatus !== 'published') return false;
    if (!p.verified) return false;
    if (p.productType === 'decant' && !featureFlags.decantSales) return false;
    return true;
  });

  const addAuditLog = (action: string, details: string) => {
    const entry: AuditLogEntry = {
      id: 'log-' + Date.now(),
      action,
      user: isAdminLoggedIn ? 'Authorized Admin' : 'Customer Action',
      details,
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => [entry, ...prev.slice(0, 99)]);
    try {
      setDoc(doc(db, 'audit_logs', entry.id), entry).catch(() => {});
    } catch {}
  };

  // Update Site Content and save to Firebase
  const updateSiteContent = async (updatedFields: Partial<SiteContent>) => {
    const nextContent = {
      ...siteContent,
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    };
    setSiteContent(nextContent);
    addAuditLog('UPDATE_SITE_CONTENT', 'Administrator updated site copy and branding content.');
    try {
      await setDoc(doc(db, 'site_settings', 'content'), nextContent, { merge: true });
    } catch (err) {
      console.warn('Firebase update failed, preserved locally:', err);
    }
  };

  // Product operations with Firebase save
  const updateProduct = async (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    addAuditLog('UPDATE_PRODUCT', `Updated ${updated.name} (Status: ${updated.publicationStatus})`);
    try {
      await setDoc(doc(db, 'products', updated.id), updated, { merge: true });
    } catch (err) {
      console.warn('Firebase product save failed:', err);
    }
  };

  const addProduct = async (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    addAuditLog('CREATE_PRODUCT', `Created ${newProduct.name}`);
    try {
      await setDoc(doc(db, 'products', newProduct.id), newProduct);
    } catch (err) {
      console.warn('Firebase product creation failed:', err);
    }
  };

  const deleteProduct = async (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addAuditLog('DELETE_PRODUCT', `Removed ${target?.name || id}`);
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      console.warn('Firebase product deletion error:', err);
    }
  };

  // Cart Operations
  const addToCart = (product: Product, quantity = 1, selectedSize?: string, selectedPrice?: number) => {
    const size = selectedSize || product.size;
    
    // Automatically match price if not explicitly provided
    let price = selectedPrice;
    if (price === undefined) {
      if (product.decantOptions && product.decantOptions.length > 0) {
        const matchingOption = product.decantOptions.find((d) => d.size === size);
        price = matchingOption ? matchingOption.price : product.price;
      } else {
        price = product.price;
      }
    }

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity, selectedPrice: price }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize: size, selectedPrice: price }];
    });
  };

  const removeFromCart = (productId: string, selectedSize: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === selectedSize))
    );
  };

  const updateCartQuantity = (productId: string, selectedSize: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === selectedSize) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.selectedPrice ?? item.product.price) * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Promo Code (WELCOME10 - 10% First Order Promo)
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(() => {
    try {
      return localStorage.getItem('alora_promo_code') || null;
    } catch {
      return null;
    }
  });

  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('alora_promo_code');
      return saved?.toUpperCase() === 'WELCOME10' ? 10 : 0;
    } catch {
      return 0;
    }
  });

  const applyPromoCode = (code: string): PromoCodeResult => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'WELCOME10') {
      setAppliedPromoCode('WELCOME10');
      setPromoDiscountPercent(10);
      try {
        localStorage.setItem('alora_promo_code', 'WELCOME10');
      } catch {}
      return {
        success: true,
        message: '10% First-Order Welcome Discount (WELCOME10) applied successfully!',
        discountPercent: 10,
      };
    }
    return {
      success: false,
      message: 'Invalid promo code. Enter WELCOME10 for 10% off your order.',
    };
  };

  const removePromoCode = () => {
    setAppliedPromoCode(null);
    setPromoDiscountPercent(0);
    try {
      localStorage.removeItem('alora_promo_code');
    } catch {}
  };

  const promoDiscountAmount = appliedPromoCode ? (cartSubtotal * promoDiscountPercent) / 100 : 0;
  const cartTotalAfterPromo = Math.max(0, cartSubtotal - promoDiscountAmount);

  // Interactive Modals
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isScentQuizOpen, setIsScentQuizOpen] = useState(false);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Compare
  const addToCompare = (productId: string): boolean => {
    if (compareList.includes(productId)) return true;
    if (compareList.length >= 3) return false;
    setCompareList((prev) => [...prev, productId]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== productId));
  };

  const clearCompare = () => setCompareList([]);

  // Preferences
  const saveQuizPreferences = (answers: QuizAnswers, consent: boolean) => {
    if (!consent) return;
    setUserPreferences({
      savedQuizAnswers: answers,
      favoriteFamilies: answers.preferredFamilies,
      favoriteNotes: answers.preferredNotes,
      dislikedNotes: answers.dislikedNotes,
      preferredIntensity: answers.intensity,
      consentGranted: true,
      updatedAt: new Date().toISOString(),
    });
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    setUserPreferences((prev) => ({
      ...prev,
      ...prefs,
      updatedAt: new Date().toISOString(),
    }));
  };

  const clearPreferences = () => {
    setUserPreferences(DEFAULT_USER_PREFERENCES);
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'reference' | 'createdAt'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `ALO-${new Date().getFullYear()}-${randomSuffix}`;
    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      reference,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Save order to Firebase
    try {
      setDoc(doc(db, 'orders', newOrder.id), newOrder).catch(() => {});
    } catch {}

    // Deduct stock safely
    setProducts((prev) =>
      prev.map((p) => {
        const matchingCartItem = orderData.items.find((item) => item.product.id === p.id);
        if (matchingCartItem) {
          const newStock = Math.max(0, p.stockCount - matchingCartItem.quantity);
          const updatedProduct = {
            ...p,
            stockCount: newStock,
            availability: (newStock === 0 ? 'out_of_stock' : newStock <= 5 ? 'low_stock' : 'in_stock') as any,
          };
          try {
            setDoc(doc(db, 'products', updatedProduct.id), updatedProduct, { merge: true }).catch(() => {});
          } catch {}
          return updatedProduct;
        }
        return p;
      })
    );

    addAuditLog('CREATE_ORDER', `Created order #${reference} for ${orderData.customer.fullName} (GH₵ ${newOrder.total})`);
    return newOrder;
  };

  const findOrder = (referenceOrId: string) => {
    const query = referenceOrId.trim().toUpperCase();
    return orders.find(
      (o) => o.reference.toUpperCase() === query || o.id.toUpperCase() === query
    );
  };

  const updateOrderStatus = (
    orderId: string,
    status: Order['status'],
    paymentStatus?: Order['paymentStatus']
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updated = {
            ...o,
            status,
            paymentStatus: paymentStatus || o.paymentStatus,
          };
          try {
            setDoc(doc(db, 'orders', updated.id), updated, { merge: true }).catch(() => {});
          } catch {}
          return updated;
        }
        return o;
      })
    );
    addAuditLog('UPDATE_ORDER_STATUS', `Order ${orderId} changed to ${status}${paymentStatus ? ` (payment: ${paymentStatus})` : ''}`);
  };

  // Contact Inquiries
  const submitInquiry = (data: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: ContactInquiry = {
      ...data,
      id: 'inq-' + Date.now(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    try {
      setDoc(doc(db, 'inquiries', newInquiry.id), newInquiry).catch(() => {});
    } catch {}
    addAuditLog('CONTACT_INQUIRY', `Inquiry received from ${data.name} regarding "${data.subject}"`);
  };

  // Feature Flags
  const updateFeatureFlags = (flags: Partial<FeatureFlags>) => {
    setFeatureFlags((prev) => {
      const updated = { ...prev, ...flags };
      addAuditLog('UPDATE_FEATURE_FLAGS', `Changed flags: ${JSON.stringify(flags)}`);
      return updated;
    });
  };

  // Quiz Engine Weights
  const updateQuizWeights = (weights: Partial<QuizEngineWeights>) => {
    setQuizWeights((prev) => {
      const updated = { ...prev, ...weights };
      addAuditLog('UPDATE_QUIZ_WEIGHTS', `Tuned recommendation weights`);
      return updated;
    });
  };

  // Admin Auth
  const adminLogin = (passcode: string): boolean => {
    if (passcode.trim() === 'alora2026' || passcode.trim() === 'admin123') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('alora_admin_auth', 'true');
      addAuditLog('ADMIN_LOGIN', 'Administrator authenticated successfully.');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('alora_admin_auth');
    addAuditLog('ADMIN_LOGOUT', 'Administrator signed out.');
  };

  return (
    <AppContext.Provider
      value={{
        siteContent,
        updateSiteContent,
        isFirebaseSynced,
        products,
        publishedProducts,
        updateProduct,
        addProduct,
        deleteProduct,
        theme,
        setTheme,
        availableThemes: AVAILABLE_THEMES,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        appliedPromoCode,
        promoDiscountPercent,
        promoDiscountAmount,
        cartTotalAfterPromo,
        applyPromoCode,
        removePromoCode,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        isScentQuizOpen,
        setIsScentQuizOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        userPreferences,
        saveQuizPreferences,
        updatePreferences,
        clearPreferences,
        orders,
        createOrder,
        findOrder,
        updateOrderStatus,
        inquiries,
        submitInquiry,
        featureFlags,
        updateFeatureFlags,
        quizWeights,
        updateQuizWeights,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        auditLogs,
        addAuditLog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
