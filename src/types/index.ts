export type ProductType = 'eau_de_parfum' | 'body_splash' | 'perfume_oil' | 'decant' | 'gift_bundle';

export type ScentFamily = 
  | 'Warm Woody'
  | 'Crisp Floral'
  | 'Fresh Citrus & Aquatic'
  | 'Amber & Gourmand'
  | 'Aromatic Green';

export type AvailabilityStatus = 'in_stock' | 'low_stock' | 'preorder' | 'out_of_stock';
export type PublicationStatus = 'published' | 'draft' | 'archived';
export type IntensityLevel = 'intimate' | 'moderate' | 'strong' | 'bold';

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface DecantOption {
  size: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  productType: ProductType;
  fragranceFamily: ScentFamily;
  notes: FragranceNotes;
  description: string;
  shortDescription: string;
  size: string;
  price: number; // in GH₵
  currency: 'GH₵';
  images: string[];
  availability: AvailabilityStatus;
  stockCount: number;
  publicationStatus: PublicationStatus;
  verified: boolean;
  intensity: IntensityLevel;
  longevity: string; // e.g. "7–9 hours"
  sillage: string; // e.g. "Moderate aura"
  bestOccasions: string[];
  seasonality: string[];
  inspiredByOrCharacter?: string;
  decantAvailable?: boolean;
  decantOptions?: DecantOption[];
}

export interface QuizAnswers {
  purpose: string;
  preferredFamilies: ScentFamily[];
  preferredNotes: string[];
  dislikedNotes: string[];
  occasions: string[];
  intensity: IntensityLevel | 'any';
  budgetGHS: number;
  familiarity: 'beginner' | 'curious' | 'aficionado';
}

export interface RecommendationScore {
  product: Product;
  matchScore: number;
  matchBreakdown: {
    family: number;
    notes: number;
    occasion: number;
    budget: number;
    intensity: number;
  };
  reasoning: string[];
  matchingNotes: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedPrice?: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  city: string; // e.g., 'Accra', 'Kumasi', 'Tema', 'Takoradi', 'Other'
  address: string;
  landmark?: string;
  notes?: string;
}

export type DeliveryMethod = 'standard_accra' | 'express_accra' | 'nationwide_courier' | 'pickup_studio';
export type PaymentMethod = 'momo' | 'card' | 'bank_transfer' | 'whatsapp_assisted';
export type PaymentStatus = 'pending' | 'verified' | 'failed';
export type OrderStatus = 'confirmed' | 'processing' | 'dispatched' | 'delivered';

export interface Order {
  id: string;
  reference: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  paymentReference?: string;
  createdAt: string;
}

export interface FeatureFlags {
  cataloguePublication: boolean;
  whatsAppOrdering: boolean;
  customerAccounts: boolean;
  onlineCheckout: boolean;
  paymentsLive: boolean; // default false for safety
  decantSales: boolean; // default false (requires regulatory approval)
  giftBundles: boolean;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'responded';
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  user: string;
  details: string;
  timestamp: string;
}

export interface UserPreferences {
  savedQuizAnswers?: QuizAnswers;
  favoriteFamilies: ScentFamily[];
  favoriteNotes: string[];
  dislikedNotes: string[];
  preferredIntensity: IntensityLevel | 'any';
  consentGranted: boolean;
  updatedAt: string;
}

export type ThemeOption = 'luxe_noir' | 'terracotta' | 'monochrome' | 'botanical' | 'plum';

export interface ThemePaletteInfo {
  id: ThemeOption;
  name: string;
  subtitle: string;
  primary: string;
  accent: string;
  bg: string;
}

export interface SiteContent {
  heroHeadline: string;
  heroSubtitle?: string;
  heroSubcopy: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  announcementStrip: string;
  missionHeadline: string;
  missionText: string;
  howItWorksStep1: string;
  howItWorksStep2: string;
  howItWorksStep3: string;
  philosophyHeadline: string;
  philosophyText: string;
  ourStoryTitle: string;
  ourStoryText1: string;
  ourStoryText2: string;
  contactAddress: string;
  contactHours: string;
  contactEmail: string;
  whatsappLink: string;
  instagramLink: string;
  tiktokLink: string;
  updatedAt?: string;
}


