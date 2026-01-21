import heroPerfume from '@/assets/hero-perfume.jpg';
import categoryLuxuryPerfumes from '@/assets/category-luxury-perfumes.jpg';
import categoryPerfumes from '@/assets/category-perfumes.jpg';
import categoryClothing from '@/assets/category-clothing.jpg';
import categoryAccessories from '@/assets/category-accessories.jpg';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'luxury-perfumes' | 'perfumes' | 'clothing' | 'accessories';
  image: string;
  notes?: string;
  size?: string;
  inStock: boolean;
  details?: string[];
}

export const products: Product[] = [
  // Luxury Perfumes
  {
    id: 'lp-001',
    name: 'Noir Absolu',
    description: 'An intoxicating blend of oud, amber, and black rose',
    price: 450,
    category: 'luxury-perfumes',
    image: categoryLuxuryPerfumes,
    notes: 'Top: Bergamot, Saffron | Heart: Black Rose, Oud | Base: Amber, Musk',
    size: '100ml',
    inStock: true,
    details: [
      'Handcrafted in Grasse, France',
      'Limited edition bottle design',
      'Concentration: Extrait de Parfum',
      'Longevity: 12+ hours',
    ],
  },
  {
    id: 'lp-002',
    name: 'Golden Elixir',
    description: 'Precious essences of jasmine and sandalwood',
    price: 520,
    category: 'luxury-perfumes',
    image: categoryLuxuryPerfumes,
    notes: 'Top: Neroli | Heart: Jasmine Sambac | Base: Sandalwood, Vanilla',
    size: '75ml',
    inStock: true,
    details: [
      'Rare Indian sandalwood',
      'Hand-picked jasmine flowers',
      'Crystal bottle with gold accents',
      'Concentration: Parfum',
    ],
  },
  {
    id: 'lp-003',
    name: 'Velvet Night',
    description: 'Mysterious and seductive with deep amber notes',
    price: 480,
    category: 'luxury-perfumes',
    image: categoryLuxuryPerfumes,
    notes: 'Top: Pink Pepper | Heart: Iris | Base: Amber, Benzoin',
    size: '100ml',
    inStock: true,
    details: [
      'Exclusive amber from the Middle East',
      'Artisanal maceration process',
      'Magnetic cap closure',
      'Concentration: Extrait de Parfum',
    ],
  },
  // Perfumes
  {
    id: 'p-001',
    name: 'Blanc Pétale',
    description: 'Fresh and floral with white flower bouquet',
    price: 180,
    category: 'perfumes',
    image: categoryPerfumes,
    notes: 'Top: Lemon | Heart: White Rose, Peony | Base: White Musk',
    size: '50ml',
    inStock: true,
    details: [
      'Light and elegant',
      'Perfect for day wear',
      'Concentration: Eau de Parfum',
    ],
  },
  {
    id: 'p-002',
    name: 'Ambre Sauvage',
    description: 'Wild and untamed amber essence',
    price: 220,
    category: 'perfumes',
    image: categoryPerfumes,
    notes: 'Top: Cardamom | Heart: Labdanum | Base: Amber, Vetiver',
    size: '75ml',
    inStock: true,
    details: [
      'Unisex fragrance',
      'Bold and confident',
      'Concentration: Eau de Parfum',
    ],
  },
  {
    id: 'p-003',
    name: 'Rose Impériale',
    description: 'Regal rose with a modern twist',
    price: 195,
    category: 'perfumes',
    image: categoryPerfumes,
    notes: 'Top: Raspberry | Heart: Damask Rose | Base: Patchouli, Oud',
    size: '50ml',
    inStock: true,
    details: [
      'Bulgarian rose essence',
      'Sophisticated elegance',
      'Concentration: Eau de Parfum',
    ],
  },
  {
    id: 'p-004',
    name: 'Cèdre Mystique',
    description: 'Woody and spiritual cedarwood blend',
    price: 175,
    category: 'perfumes',
    image: categoryPerfumes,
    notes: 'Top: Juniper | Heart: Cedarwood | Base: Incense, Leather',
    size: '50ml',
    inStock: false,
    details: [
      'Atlas cedarwood',
      'Meditative and calming',
      'Concentration: Eau de Parfum',
    ],
  },
  // Clothing
  {
    id: 'c-001',
    name: 'Silk Noir Robe',
    description: 'Luxurious black silk lounging robe',
    price: 890,
    category: 'clothing',
    image: categoryClothing,
    size: 'One Size',
    inStock: true,
    details: [
      '100% Mulberry silk',
      'Hand-finished edges',
      'Matching silk belt',
      'Dry clean only',
    ],
  },
  {
    id: 'c-002',
    name: 'Cashmere Wrap',
    description: 'Ultra-soft cashmere wrap in champagne',
    price: 650,
    category: 'clothing',
    image: categoryClothing,
    size: '200cm x 70cm',
    inStock: true,
    details: [
      'Grade A Mongolian cashmere',
      'Lightweight and warm',
      'Gift box included',
    ],
  },
  {
    id: 'c-003',
    name: 'Velvet Evening Jacket',
    description: 'Statement velvet jacket in midnight blue',
    price: 1200,
    category: 'clothing',
    image: categoryClothing,
    size: 'S, M, L',
    inStock: true,
    details: [
      'Italian velvet',
      'Silk lining',
      'Gold button details',
      'Tailored fit',
    ],
  },
  // Accessories
  {
    id: 'a-001',
    name: 'Crystal Perfume Atomizer',
    description: 'Hand-cut crystal atomizer with gold accents',
    price: 280,
    category: 'accessories',
    image: categoryAccessories,
    size: '15ml capacity',
    inStock: true,
    details: [
      'Lead-free crystal',
      '24k gold-plated accents',
      'Refillable design',
      'Velvet pouch included',
    ],
  },
  {
    id: 'a-002',
    name: 'Leather Travel Case',
    description: 'Premium leather case for fragrance bottles',
    price: 320,
    category: 'accessories',
    image: categoryAccessories,
    size: 'Fits 3 bottles up to 100ml',
    inStock: true,
    details: [
      'Full-grain Italian leather',
      'Velvet-lined interior',
      'Magnetic closure',
      'Personalization available',
    ],
  },
  {
    id: 'a-003',
    name: 'Gold Perfume Pendant',
    description: 'Wearable perfume vessel in 18k gold',
    price: 1500,
    category: 'accessories',
    image: categoryAccessories,
    size: '5ml capacity',
    inStock: true,
    details: [
      '18k solid gold',
      'Handcrafted by artisans',
      'Includes gold chain',
      'Certificate of authenticity',
    ],
  },
  {
    id: 'a-004',
    name: 'Marble Tray',
    description: 'Display tray in Carrara marble',
    price: 180,
    category: 'accessories',
    image: categoryAccessories,
    size: '30cm x 20cm',
    inStock: true,
    details: [
      'Genuine Carrara marble',
      'Gold brass handles',
      'Each piece is unique',
      'Protective felt base',
    ],
  },
];

export const categories = [
  {
    id: 'luxury-perfumes',
    name: 'Luxury Perfumes',
    description: 'Our most exclusive and rare fragrances',
    image: categoryLuxuryPerfumes,
  },
  {
    id: 'perfumes',
    name: 'Perfumes',
    description: 'Signature scents for every occasion',
    image: categoryPerfumes,
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Refined pieces for the discerning',
    image: categoryClothing,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Elegant additions to your collection',
    image: categoryAccessories,
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export { heroPerfume };
