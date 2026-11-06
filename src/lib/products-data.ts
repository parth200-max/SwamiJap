import { Product, Category } from "@/types";

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Handbags",
    slug: "handbags",
    description: "Structured and everyday handbags designed for versatile use.",
  },
  {
    id: "cat-2",
    name: "Sling Bags",
    slug: "sling-bags",
    description: "Compact sling and crossbody bags for easy all-day carry.",
  },
  {
    id: "cat-3",
    name: "Laptop Bags",
    slug: "laptop-bags",
    description: "Padded, organised bags built for work and commuting.",
  },
  {
    id: "cat-4",
    name: "Wallets & Accessories",
    slug: "wallets-accessories",
    description: "Slim wallets, card holders, and everyday carry accessories.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  const normalized = slug.toLowerCase().trim();
  const direct = INITIAL_CATEGORIES.find((c) => c.slug === normalized);
  if (direct) return direct;

  if (normalized === "handpurse" || normalized === "shoulder-bags" || normalized === "shoulder-bag") {
    return {
      id: "cat-1",
      name: normalized === "handpurse" ? "Handpurse" : "Shoulder Bags",
      slug: normalized,
      description: "Structured and everyday handbags and shoulder silhouettes crafted for versatile use.",
    };
  }

  if (normalized === "pouches" || normalized === "organiser" || normalized === "organizer") {
    return {
      id: "cat-4",
      name: normalized === "pouches" ? "Pouches" : "Organiser",
      slug: normalized,
      description: "Daily pouches, zip organizers, card holders, and everyday carry accessories.",
    };
  }

  return undefined;
}

// Prices are in INR
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Everyday Structured Tote",
    name: "Everyday Structured Tote",
    slug: "everyday-structured-tote",
    tagline: "A clean, spacious tote for everything your day demands.",
    description:
      "The Everyday Structured Tote is designed for the person who carries a lot without wanting it to show. A wide main compartment, a zip pocket inside, and a flat base keep things upright and accessible. The strap is adjustable and sits comfortably on the shoulder.",
    details: [
      "Vegan leather exterior with fabric lining",
      "Internal zip pocket and two open slip pockets",
      "Magnetic snap closure",
      "Flat base with protective feet",
      "Adjustable shoulder strap included",
    ],
    price: 2799,
    compareAt: 3499,
    compareAtPrice: 3499,
    inventory: 14,
    stock: 14,
    sku: "SJ-TOT-01",
    isFeatured: true,
    status: "ACTIVE",
    isArchived: false,
    weight: "0.82 kg",
    dimensions: "38 × 30 × 14 cm",
    material: "Vegan Leather",
    color: "Black",
    categoryId: "cat-1",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-2",
    title: "Crescent Sling Bag",
    name: "Crescent Sling Bag",
    slug: "crescent-sling-bag",
    tagline: "Light, minimal, and always within reach.",
    description:
      "The Crescent Sling sits neatly against the body and moves with you. It fits a phone, cards, a compact, and earbuds comfortably. The adjustable strap crosses cleanly from shoulder to hip and the curved shape keeps it out of the way.",
    details: [
      "Smooth faux leather with microfibre lining",
      "One main zip compartment with interior card slots",
      "Front slip pocket for quick access",
      "Adjustable, padded crossbody strap",
    ],
    price: 1499,
    compareAt: null,
    compareAtPrice: null,
    inventory: 8,
    stock: 8,
    sku: "SJ-SLG-02",
    isFeatured: true,
    status: "ACTIVE",
    isArchived: false,
    weight: "0.38 kg",
    dimensions: "24 × 16 × 7 cm",
    material: "Faux Leather",
    color: "Tan",
    categoryId: "cat-2",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1200&q=85",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-3",
    title: "Commuter Laptop Bag",
    name: "Commuter Laptop Bag",
    slug: "commuter-laptop-bag",
    tagline: "Built for the daily commute. Fits a 15-inch laptop.",
    description:
      "The Commuter Laptop Bag is designed around a workday. A padded laptop sleeve fits up to 15 inches, a front organiser panel holds your cables and stationery, and the top handle and shoulder strap give you two ways to carry. Water-resistant exterior keeps things protected on the way in.",
    details: [
      "Water-resistant polyester exterior",
      "Padded laptop sleeve fits up to 15.6 inches",
      "Front organiser panel with pen loops and card slots",
      "Padded top handle and adjustable shoulder strap",
      "Trolley sleeve on the back",
    ],
    price: 3299,
    compareAt: 3999,
    compareAtPrice: 3999,
    inventory: 5,
    stock: 5,
    sku: "SJ-LAP-03",
    isFeatured: true,
    status: "ACTIVE",
    isArchived: false,
    weight: "0.95 kg",
    dimensions: "42 × 30 × 12 cm",
    material: "Polyester",
    color: "Charcoal Grey",
    categoryId: "cat-3",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-4",
    title: "Weekend Duffel",
    name: "Weekend Duffel",
    slug: "weekend-duffel",
    tagline: "Everything for two days, nothing unnecessary.",
    description:
      "A straightforward weekend bag with enough room to pack for two or three days without overpacking. The top carries flat, the base holds its shape, and the side pocket keeps your essentials separate. Comes with a padded, removable shoulder strap.",
    details: [
      "Canvas exterior with faux leather trim",
      "Large main compartment with zip closure",
      "External side pocket and end zip pockets",
      "Padded, detachable shoulder strap and carry handles",
    ],
    price: 3999,
    compareAt: null,
    compareAtPrice: null,
    inventory: 11,
    stock: 11,
    sku: "SJ-DFL-04",
    isFeatured: true,
    status: "ACTIVE",
    isArchived: false,
    weight: "1.1 kg",
    dimensions: "50 × 28 × 24 cm",
    material: "Canvas & Faux Leather",
    color: "Olive",
    categoryId: "cat-1",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=85",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-5",
    title: "Mini Belt Bag",
    name: "Mini Belt Bag",
    slug: "mini-belt-bag",
    tagline: "Keep it close. Keep it minimal.",
    description:
      "A small, focused belt bag that clips on easily and wears either at the waist or across the chest. Holds your phone, cards, keys, and not much else — which is sometimes exactly what you need. The strap is fully adjustable.",
    details: [
      "Smooth faux leather exterior",
      "One main zip compartment",
      "Small front zip pocket",
      "Adjustable clip-on webbing strap",
    ],
    price: 999,
    compareAt: null,
    compareAtPrice: null,
    inventory: 22,
    stock: 22,
    sku: "SJ-BLT-05",
    isFeatured: false,
    status: "ACTIVE",
    isArchived: false,
    weight: "0.22 kg",
    dimensions: "18 × 11 × 5 cm",
    material: "Faux Leather",
    color: "Black",
    categoryId: "cat-2",
    images: [
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1200&q=85",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-6",
    title: "Slim Card Wallet",
    name: "Slim Card Wallet",
    slug: "slim-card-wallet",
    tagline: "Cards and cash. Nothing more needed.",
    description:
      "A slim bifold wallet that holds up to eight cards and a few notes without the bulk. The stitching is clean, the snap is firm, and the material holds up to everyday handling.",
    details: [
      "Smooth faux leather exterior",
      "8 card slots across two sides",
      "Centre note compartment",
      "Slim profile — fits any pocket",
    ],
    price: 699,
    compareAt: 899,
    compareAtPrice: 899,
    inventory: 35,
    stock: 35,
    sku: "SJ-WLT-06",
    isFeatured: false,
    status: "ACTIVE",
    isArchived: false,
    weight: "0.08 kg",
    dimensions: "11 × 9 × 1 cm",
    material: "Faux Leather",
    color: "Black",
    categoryId: "cat-4",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
