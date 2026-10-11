export interface JournalArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  image: string;
  excerpt: string;
  content: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: 'fragrance-longevity-ghana-tropical-climate',
    title: 'Wearing Fragrance in Tropical Warmth: Longevity, Projection & Skin Chemistry',
    subtitle: 'Why certain scents evaporate quickly in Accra’s humidity, and how high-concentration formulation changes the game.',
    category: 'Fragrance Literacy',
    readTime: '4 min read',
    publishedDate: 'October 2026',
    author: 'House of ALORA Team',
    image: '/src/assets/images/luxury_decant_bar_aesthetic_1791695150602.jpg',
    excerpt: 'High heat accelerates evaporation while tropical humidity interacts with natural perspiration. Here is the science of why ALORA anchors formulas in amber, cedar, and resinous base notes.',
    content: [
      'Fragrance wear in Ghana is governed by a distinct olfactory reality. The combination of coastal moisture in Accra and intense midday temperatures dramatically speeds up the evaporation of volatile top notes like citrus and light aldehydes.',
      'Most mass-market commercial sprays are formulated in European laboratories calibrated for temperate 18°C climates. On West African skin, these fragrances often disappear within 90 minutes, leading shoppers to feel disappointed with their investment.',
      'At House of ALORA, we deliberate over base-note fixation. By compounding our Eau de Parfums with higher percentages of dense molecular bases—such as aged Haitian vetiver, smoked cedarwood, and resinous amber—we ensure the scent forms an intimate, durable bond with the skin that radiates consistently for 8 to 12 hours.',
      'A practical tip for everyday wear: apply unscented shea butter or light jojoba oil to pulse points before misting. Moisture acts as an olfactory primer, holding fragrant volatile oils in suspension and preventing premature dissipation.'
    ]
  },
  {
    slug: 'demystifying-the-fragrance-pyramid',
    title: 'The Architecture of a Scent: Reading Top, Heart, and Base Notes',
    subtitle: 'How to understand the evolution of your perfume from initial spritz to 8-hour dry down.',
    category: 'Guide',
    readTime: '3 min read',
    publishedDate: 'October 2026',
    author: 'House of ALORA Team',
    image: '/src/assets/images/fragrance_rose_amber_1791638079597.jpg',
    excerpt: 'Never judge a fragrance solely on the opening spritz. Discover how the heart and base define who you are throughout the day.',
    content: [
      'The fragrance pyramid is the classic blueprint of perfumery: Top notes deliver the energetic opening greeting (minutes 0 to 20); Heart notes express the emotional character of the perfume (hours 1 to 4); and Base notes provide the foundation that lingers on your collar and skin (hours 4 to 12+).',
      'When sampling in retail environments, shoppers often make instant decisions within 30 seconds. This evaluates only the opening top notes, leaving the true personality of the dry down unexplored.',
      'ALORA’s fragrance discovery experience is structured to present full olfactory transparency. We document all verified notes so you know exactly which resin, flower, or wood will stay with you into the evening.'
    ]
  },
  {
    slug: 'affordable-luxury-without-gatekeeping',
    title: 'Affordable Luxury Without Compromise: The ALORA Philosophy',
    subtitle: 'Why exceptional scent profiles do not need to cost thousands of Cedis.',
    category: 'Philosophy',
    readTime: '5 min read',
    publishedDate: 'October 2026',
    author: 'House of ALORA Team',
    image: '/src/assets/images/hero_alora_perfume_1791638069050.jpg',
    excerpt: 'Demystifying perfume compounding costs, eliminating retail markups, and delivering accessible luxury directly to Ghanaian fragrance enthusiasts.',
    content: [
      'For decades, luxury perfumery was wrapped in artificial exclusivity: exorbitant celebrity endorsements, excessive retail packaging markups, and prestige pricing designed to gatekeep quality.',
      'The raw perfume concentrates themselves, even from premier compounding houses, represent only a fraction of those inflated prices. ALORA was founded to dismantle this disparity.',
      'We focus investment where it counts: exceptional compound quality, skin-safe IFRA-compliant ingredients, weather-tested longevity, and direct customer care via local delivery and WhatsApp concierge. Accessible luxury is not a compromise; it is our commitment.'
    ]
  }
];
