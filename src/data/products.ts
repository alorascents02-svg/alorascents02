import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'alo-prd-001',
    slug: 'velours-nocturne',
    name: 'Velours Nocturne',
    brand: 'Alora Fragrance House',
    productType: 'eau_de_parfum',
    fragranceFamily: 'Warm Woody',
    notes: {
      top: ['Black Fig', 'Pink Peppercorn', 'Bergamot'],
      heart: ['Dark Plum', 'Smoked Cedarwood', 'Orris Butter'],
      base: ['Bourbon Vanilla', 'Rich Amber', 'Indonesian Patchouli']
    },
    description: 'An intoxicating evening composition celebrating deep nocturnal warmth. Velours Nocturne opens with ripe black fig and sparkling pink peppercorn before giving way to smoked cedarwood and sumptuous dark plum. Authentic luxury decants let you test wear this rich fragrance on your skin in Accra’s tropical climate before committing to a full bottle.',
    shortDescription: 'Deep smoked cedarwood, velvety black fig, and warm bourbon amber.',
    size: '100ml / 3.4 fl. oz.',
    price: 360,
    currency: 'GH₵',
    images: [
      '/src/assets/images/luxury_perfume_decants_1791695120764.jpg',
      '/src/assets/images/hero_luxury_perfume_editorial_1791688544047.jpg'
    ],
    availability: 'in_stock',
    stockCount: 24,
    publicationStatus: 'published',
    verified: true,
    intensity: 'strong',
    longevity: '8–10 hours',
    sillage: 'Generous aura',
    bestOccasions: ['Evening & Date Night', 'Special Celebration', 'Night Out'],
    seasonality: ['Harmattan', 'All Seasons Evening'],
    inspiredByOrCharacter: 'Signature Niche Woody Amber',
    decantAvailable: true,
    decantOptions: [
      { size: '3ml Sample Decant', price: 35 },
      { size: '5ml Travel Decant', price: 55 },
      { size: '10ml Deluxe Decant', price: 95 },
      { size: 'Full Bottle (100ml)', price: 360 }
    ]
  },
  {
    id: 'alo-prd-002',
    slug: 'rose-et-ambre',
    name: 'Rose & Amber Wood',
    brand: 'Alora Fragrance House',
    productType: 'eau_de_parfum',
    fragranceFamily: 'Crisp Floral',
    notes: {
      top: ['Damask Rose Petals', 'Mandarin Zest', 'Saffron'],
      heart: ['Rose Absolute', 'Warm Amber', 'Cashmere Wood'],
      base: ['White Musk', 'Madagascar Vanilla', 'Atlas Cedar']
    },
    description: 'A contemporary reimagining of classic damascena rose. Instead of powdery sweetness, Rose & Amber Wood infuses crimson rose petals with glowing golden amber and spicy saffron. Elegant, magnetic, and completely non-cloying even on sun-drenched afternoons in Accra.',
    shortDescription: 'Luminous damask rose bathed in warm amber and radiant saffron.',
    size: '100ml / 3.4 fl. oz.',
    price: 340,
    currency: 'GH₵',
    images: [
      '/src/assets/images/fragrance_rose_amber_1791638079597.jpg',
      '/src/assets/images/luxury_perfume_decants_1791695120764.jpg'
    ],
    availability: 'in_stock',
    stockCount: 18,
    publicationStatus: 'published',
    verified: true,
    intensity: 'moderate',
    longevity: '7–9 hours',
    sillage: 'Refined moderate',
    bestOccasions: ['Daily Signature', 'Special Celebration', 'Office & Business'],
    seasonality: ['Year Round'],
    inspiredByOrCharacter: 'Contemporary Floriental',
    decantAvailable: true,
    decantOptions: [
      { size: '3ml Sample Decant', price: 35 },
      { size: '5ml Travel Decant', price: 50 },
      { size: '10ml Deluxe Decant', price: 90 },
      { size: 'Full Bottle (100ml)', price: 340 }
    ]
  },
  {
    id: 'alo-prd-003',
    slug: 'bergamot-cedarwood',
    name: 'Bergamot & White Cedar',
    brand: 'Alora Fragrance House',
    productType: 'eau_de_parfum',
    fragranceFamily: 'Fresh Citrus & Aquatic',
    notes: {
      top: ['Sun-ripened Bergamot', 'Italian Lemon', 'Crisp Mint Leaf'],
      heart: ['Neroli', 'Marine Sea Salt', 'White Ginger'],
      base: ['Virginia Cedarwood', 'Clean Vetiver', 'Solar Musk']
    },
    description: 'Built specifically for brisk daytime elegance. Crisp citrus notes are anchored by bleached cedarwood and mineral sea salt, preventing the early evaporation common with light citrus perfumes in high humidity. Clean, invigorating, and impeccably polished.',
    shortDescription: 'Bracing bergamot, sea salt spray, and crisp Virginia cedar.',
    size: '100ml / 3.4 fl. oz.',
    price: 310,
    currency: 'GH₵',
    images: [
      '/src/assets/images/fragrance_citrus_fresh_1791638090560.jpg',
      '/src/assets/images/luxury_decant_bar_aesthetic_1791695150602.jpg'
    ],
    availability: 'in_stock',
    stockCount: 30,
    publicationStatus: 'published',
    verified: true,
    intensity: 'moderate',
    longevity: '6–8 hours',
    sillage: 'Fresh intimate-to-moderate',
    bestOccasions: ['Daily Signature', 'Office & Business', 'Tropical Heat & Day Out'],
    seasonality: ['Sunny Warmth', 'Daily Wear'],
    inspiredByOrCharacter: 'Citrus Aromatic Refinement',
    decantAvailable: true,
    decantOptions: [
      { size: '3ml Sample Decant', price: 30 },
      { size: '5ml Travel Decant', price: 48 },
      { size: '10ml Deluxe Decant', price: 85 },
      { size: 'Full Bottle (100ml)', price: 310 }
    ]
  },
  {
    id: 'alo-prd-004',
    slug: 'smoked-sandalwood-elixir',
    name: 'Smoked Sandalwood Elixir',
    brand: 'Alora Fragrance House',
    productType: 'eau_de_parfum',
    fragranceFamily: 'Warm Woody',
    notes: {
      top: ['Cardamom', 'Cypress Leaf', 'Nutmeg'],
      heart: ['Smoked Sandalwood', 'Papyrus', 'Leather Accord'],
      base: ['Cedarwood', 'Dark Amber', 'Haitian Vetiver']
    },
    description: 'A masterclass in textural woody elegance. Dry Australian sandalwood is infused with gently smoked spices and aged papyrus, evoking private libraries and calm courtyard evenings. Available in pocket travel decants and full flacons.',
    shortDescription: 'Creamy smoked sandalwood, green cardamom, and rich papyrus.',
    size: '100ml / 3.4 fl. oz.',
    price: 380,
    currency: 'GH₵',
    images: [
      '/src/assets/images/fragrance_woody_oud_1791638100194.jpg',
      '/src/assets/images/luxury_perfume_decants_1791695120764.jpg'
    ],
    availability: 'in_stock',
    stockCount: 15,
    publicationStatus: 'published',
    verified: true,
    intensity: 'bold',
    longevity: '9–12 hours',
    sillage: 'Commanding presence',
    bestOccasions: ['Evening & Date Night', 'Special Celebration', 'Office & Business'],
    seasonality: ['Harmattan', 'All Evening'],
    inspiredByOrCharacter: 'Artisanal Niche Woody',
    decantAvailable: true,
    decantOptions: [
      { size: '3ml Sample Decant', price: 38 },
      { size: '5ml Travel Decant', price: 60 },
      { size: '10ml Deluxe Decant', price: 105 },
      { size: 'Full Bottle (100ml)', price: 380 }
    ]
  },
  {
    id: 'alo-prd-005',
    slug: 'sol-vanille-body-splash',
    name: 'Sol Vanille Fine Body Splash',
    brand: 'Alora Fragrance House',
    productType: 'body_splash',
    fragranceFamily: 'Amber & Gourmand',
    notes: {
      top: ['Toasted Coconut', 'Caramelized Sugar'],
      heart: ['Tahitian Vanilla Bean', 'Solar Jasmine'],
      base: ['Warm Sand Accord', 'Creamy Tonka']
    },
    description: 'An airy, everyday hydrating body splash mist featuring creamy Tahitian vanilla, golden toasted coconut, and gentle tonka bean. Designed for generous all-over re-application throughout warm sunny days or casual outings in Kokrobite and Ada.',
    shortDescription: 'Golden Tahitian vanilla bean, sun-warmed coconut, and soft tonka body splash.',
    size: '250ml Flacon',
    price: 130,
    currency: 'GH₵',
    images: [
      '/src/assets/images/luxury_body_splash_mist_1791695141478.jpg',
      '/src/assets/images/fragrance_gourmand_amber_1791688553675.jpg'
    ],
    availability: 'in_stock',
    stockCount: 42,
    publicationStatus: 'published',
    verified: true,
    intensity: 'intimate',
    longevity: '4–5 hours',
    sillage: 'Soft intimate trail',
    bestOccasions: ['Daily Signature', 'Tropical Heat & Day Out', 'Casual Weekend'],
    seasonality: ['Sunny Warmth', 'Daily'],
    inspiredByOrCharacter: 'Gourmand Body Splash Comfort',
    decantAvailable: true,
    decantOptions: [
      { size: '30ml Travel Mist', price: 35 },
      { size: '100ml Portable Flacon', price: 75 },
      { size: '250ml Full Bottle', price: 130 }
    ]
  },
  {
    id: 'alo-prd-006',
    slug: 'vetiver-basil-perfume-oil',
    name: 'Vetiver & Holy Basil Pure Perfume Oil',
    brand: 'Alora Fragrance House',
    productType: 'perfume_oil',
    fragranceFamily: 'Aromatic Green',
    notes: {
      top: ['Sweet Basil', 'Grapefruit Rind', 'Crushed Mint'],
      heart: ['Geranium', 'Clary Sage', 'Black Tea'],
      base: ['Earthy Vetiver', 'Oakmoss', 'Golden Amber']
    },
    description: 'An alcohol-free, 100% concentrated botanical perfume oil crafted with skin-loving carrier oils for direct pulse-point application. The holy basil and earthbound vetiver create a grounding, green halo with incredible longevity of over 10 hours.',
    shortDescription: 'Concentrated pulse-point perfume oil with crushed sweet basil and earthy vetiver.',
    size: '12ml Rollerball Flacon',
    price: 160,
    currency: 'GH₵',
    images: [
      '/src/assets/images/luxury_perfume_oil_attar_1791695130931.jpg',
      '/src/assets/images/fragrance_botanical_green_1791688563784.jpg'
    ],
    availability: 'in_stock',
    stockCount: 20,
    publicationStatus: 'published',
    verified: true,
    intensity: 'intimate',
    longevity: '10–12 hours',
    sillage: 'Intimate skin scent',
    bestOccasions: ['Daily Signature', 'Office & Business', 'Mindful Moments'],
    seasonality: ['Year Round'],
    inspiredByOrCharacter: 'Pure Concentrated Perfume Oil',
    decantAvailable: true,
    decantOptions: [
      { size: '3ml Sample Roller', price: 45 },
      { size: '6ml Pocket Roller', price: 85 },
      { size: '12ml Full Flacon', price: 160 }
    ]
  },
  {
    id: 'alo-prd-007',
    slug: 'oud-cashmere-perfume-oil',
    name: 'Oud & Royal Cashmere Concentrated Perfume Oil',
    brand: 'Alora Fragrance House',
    productType: 'perfume_oil',
    fragranceFamily: 'Warm Woody',
    notes: {
      top: ['Saffron Thread', 'Nutmeg', 'Cardamom'],
      heart: ['Smoked Agarwood (Oud)', 'Cashmere Woods', 'Labdanum'],
      base: ['Dark Amber Resin', 'Atlas Cedar', 'Civet Accord']
    },
    description: 'An exquisite, alcohol-free concentrated perfume oil (Attar). Pure luxury formulated with rich Cambodian oud and melted amber. A single drop applied to pulse points lasts from morning until the next day.',
    shortDescription: 'Pure concentrated attar oil with Cambodian oud, saffron, and cashmere.',
    size: '12ml Crystal Dropper & Roller',
    price: 195,
    currency: 'GH₵',
    images: [
      '/src/assets/images/luxury_perfume_oil_attar_1791695130931.jpg'
    ],
    availability: 'in_stock',
    stockCount: 16,
    publicationStatus: 'published',
    verified: true,
    intensity: 'bold',
    longevity: '12–16 hours',
    sillage: 'Magnetic aura',
    bestOccasions: ['Special Celebration', 'Evening & Date Night'],
    seasonality: ['Harmattan', 'All Seasons Evening'],
    inspiredByOrCharacter: 'Pure Royal Attar Oil',
    decantAvailable: true,
    decantOptions: [
      { size: '3ml Sample Roller', price: 55 },
      { size: '6ml Pocket Roller', price: 105 },
      { size: '12ml Full Crystal Flacon', price: 195 }
    ]
  },
  {
    id: 'alo-prd-008',
    slug: 'amber-santal-bundle',
    name: 'The Golden Hours Duo (Gift Set)',
    brand: 'Alora Fragrance House',
    productType: 'gift_bundle',
    fragranceFamily: 'Amber & Gourmand',
    notes: {
      top: ['Blood Orange', 'Damask Rose', 'Bergamot'],
      heart: ['Smoked Sandalwood', 'Orris', 'Vanilla Pod'],
      base: ['Warm Amber', 'Cedarwood', 'Solar Musk']
    },
    description: 'Curated gift pairing featuring our 50ml Rose & Amber Wood alongside the 12ml Pure Sandalwood Perfume Oil Rollerball. Packaged in Alora Fragrance House’s signature presentation box with personalized wax-sealed note card.',
    shortDescription: '50ml Eau de Parfum and 12ml Pure Perfume Oil in signature presentation packaging.',
    size: '50ml EDP + 12ml Oil',
    price: 450,
    currency: 'GH₵',
    images: [
      '/src/assets/images/luxury_decant_bar_aesthetic_1791695150602.jpg',
      '/src/assets/images/hero_alora_perfume_1791638069050.jpg'
    ],
    availability: 'in_stock',
    stockCount: 12,
    publicationStatus: 'published',
    verified: true,
    intensity: 'moderate',
    longevity: '8–10 hours',
    sillage: 'Layerable flexibility',
    bestOccasions: ['Special Celebration', 'Gifting', 'Evening & Date Night'],
    seasonality: ['All Seasons'],
    inspiredByOrCharacter: 'Curated Alora Fragrance House Gift'
  },
  {
    id: 'alo-prd-009',
    slug: 'niche-discovery-decant-vault',
    name: 'Niche Discovery Decant Vault (5 x 5ml)',
    brand: 'Alora Fragrance House',
    productType: 'decant',
    fragranceFamily: 'Warm Woody',
    notes: {
      top: ['Bergamot', 'Pink Peppercorn', 'Damask Rose'],
      heart: ['Smoked Cedar', 'Orris', 'Amber'],
      base: ['Bourbon Vanilla', 'Oud', 'Vetiver']
    },
    description: 'The ultimate decant discovery collection. Five premium 5ml glass atomizers with gold spray nozzles, containing our top 5 most coveted luxury fragrances. Test wear each one over 30 days to discover your true signature before buying full bottles.',
    shortDescription: 'Five 5ml hand-decanted luxury travel atomizers (Velours, Rose, Cedar, Sandalwood & Oud).',
    size: '5 x 5ml Glass Atomizers',
    price: 240,
    currency: 'GH₵',
    images: [
      '/src/assets/images/luxury_perfume_decants_1791695120764.jpg',
      '/src/assets/images/luxury_decant_bar_aesthetic_1791695150602.jpg'
    ],
    availability: 'in_stock',
    stockCount: 25,
    publicationStatus: 'published',
    verified: true,
    intensity: 'strong',
    longevity: '8–12 hours',
    sillage: 'Full spectrum',
    bestOccasions: ['Discovery & Sampling', 'Gifting', 'Travel'],
    seasonality: ['Year Round'],
    inspiredByOrCharacter: 'Curated Decant Vault',
    decantAvailable: true,
    decantOptions: [
      { size: '5 x 3ml Discovery Set', price: 160 },
      { size: '5 x 5ml Discovery Vault', price: 240 },
      { size: '5 x 10ml Deluxe Vault', price: 420 }
    ]
  }
];

export const SCENT_FAMILIES_INFO = [
  {
    name: 'Warm Woody' as const,
    description: 'Grounding, sophisticated compositions anchored in sandalwood, cedar, and smoked resins.',
    character: 'Rich, contemplative, durable',
    commonNotes: ['Sandalwood', 'Cedarwood', 'Patchouli', 'Fig', 'Cardamom']
  },
  {
    name: 'Crisp Floral' as const,
    description: 'Modern botanical bouquets paired with crisp spices and mineral warmth, avoiding cloying sweetness.',
    character: 'Radiant, romantic, elegant',
    commonNotes: ['Damask Rose', 'Saffron', 'Jasmine', 'Neroli', 'White Musk']
  },
  {
    name: 'Fresh Citrus & Aquatic' as const,
    description: 'Crisp sunlit zest layered over sea salt and dry woods, engineered for coastal humidity.',
    character: 'Invigorating, clean, luminous',
    commonNotes: ['Bergamot', 'Lemon', 'Sea Salt', 'Mint', 'Solar Musk']
  },
  {
    name: 'Amber & Gourmand' as const,
    description: 'Indulgent yet balanced accords of vanilla bean, warm resin, tonka, and roasted spices.',
    character: 'Sensual, comforting, velvety',
    commonNotes: ['Bourbon Vanilla', 'Tonka Bean', 'Amber', 'Coconut', 'Caramel']
  },
  {
    name: 'Aromatic Green' as const,
    description: 'Crisp herbal vitality with fresh cut basil, geranium leaves, clary sage, and damp vetiver.',
    character: 'Natural, intellectual, grounding',
    commonNotes: ['Holy Basil', 'Vetiver', 'Clary Sage', 'Black Tea', 'Geranium']
  }
];
