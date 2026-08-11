// Path: backend/prisma/seed.ts
// Run with: pnpm run seed
// 1. Deletes leftover/duplicate rows from earlier seed runs.
// 2. Upserts (keyed on slug) the correct 14 brochure products, including
//    the new `finish` field and a `specialty_coating` productType for
//    Sunstone + Jade (previously miscategorised as primer/tile_chemicals).

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Slugs from earlier seed runs that duplicate / predate the final 14 —
// safe to delete every run since deleteMany is a no-op if they're already gone.
const STALE_SLUGS = [
  "sunstone-foundation-coat",   // superseded by sunstone-high-gloss-foundation-coat
  "jade-tile-roof-coat",        // superseded by jade-roof-tile-coat
  "weather-shield-exterior",    // orphan from the very first seed, not a real brochure product
];

interface ProductSeed {
  name: string;
  slug: string;
  description: string;
  productType: string;
  priceRange: string;
  basePrice: number;
  coverageArea: string;
  finish: string;
  availablePacks: string[];
  lowVoc: boolean;
  antiAlgae: boolean;
  images: string[];
  isFeatured: boolean;
}
const AVAILABLE_PACKS = ['1 Litre', '4 Litre', '10 Litre', '20 Litre'];
const products: ProductSeed[] = [
  {
    name: "Pyrite Two-in-One Economy Primer",
    slug: "pyrite-two-in-one-economy-primer",
    description:
      "Two in One Exterior wall primer is a water-based primer suitable for water-based top coats like distempers and plastic emulsions. Prepared with 100% acrylic binders, micro fine pigments and extenders along with performance additives, suitable for both interior and exterior application on plastered surfaces and masonry works. Quick drying, polymer-modified, water thinnable undercoat that diminishes curing hassles and wastage, fills fine pores and crevices, and prepares the wall for base coat (putty) and painting.",
    productType: "primer",
    priceRange: "economy",
    basePrice: 1150,
    coverageArea: "110 - 130 Sq.ft/Coat",
    finish: "Matt",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: true,
    antiAlgae: false,
    images: ["/images/paints/PyriteTwoinOnePrimer.png"],
    isFeatured: false,
  },
  {
    name: "Exterior Waterproof Primer",
    slug: "exterior-waterproof-primer",
    description:
      "Blitz Pyrite Series Exterior Waterproof Primer is suitable to protect the building's exterior walls from water damage and extreme weather conditions. Prepared with 100% acrylic binders, micro fine pigments and extenders. Makes the surface less absorbent and withstands harsh environmental conditions. Quick drying, polymer-modified, water thinnable undercoat product for direct use on cement plasters, RCC structures and repainting surfaces.",
    productType: "primer",
    priceRange: "medium",
    basePrice: 1550,
    coverageArea: "100 - 120 Sq.ft/Coat",
    finish: "Matt",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: true,
    antiAlgae: false,
    images: ["/images/paints/ExteriorWaterproofPrimer.png"],
    isFeatured: false,
  },
  {
    name: "Exterior Damp Proof Primer",
    slug: "exterior-damp-proof-primer",
    description:
      "Blitz Pyrite Series Damp Proof Primer is blended with acrylic modified binders and special additives that take care of minor cracks and dampness, acting as a damp barrier coat in the exterior painting system. Elongates up to 120% and covers minor cracks. Designed with crack binding and anti-carbonation technology along with efflorescence control, and provides sunlight reflective property. Quick drying, water thinnable undercoat that can be used directly on cement plasters, RCC structures and repainting surfaces.",
    productType: "primer",
    priceRange: "medium",
    basePrice: 1650,
    coverageArea: "100 - 110 Sq.ft/Coat",
    finish: "Matt",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: true,
    antiAlgae: false,
    images: ["/images/paints/ExteriorDampProofPrimer.png"],
    isFeatured: false,
  },

  // ---- Exterior Emulsions (5) ----
  {
    name: "Calcite Economy Two-in-One Emulsion",
    slug: "calcite-economy-two-in-one-emulsion",
    description:
      "Blitz Paints Calcite is a Two in One Exterior Emulsion - a water-based exterior wall finish suitable for dry to moderately humid climatic conditions. Offers excellent resistance to chalking, cracking and weathering compared to cement paint, with better anti-fungal and anti-algal properties and mild washability. Stylish matte finish with good covering and film formation.",
    productType: "exterior_wall_coating",
    priceRange: "economy",
    basePrice: 1350,
    coverageArea: "65 - 75 Sq.ft/2 Coats",
    finish: "Matt",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: false,
    antiAlgae: true,
    images: ["/images/paints/CalciteEconomyTwoinOneEmulsion.png"],
    isFeatured: false,
  },
  {
    name: "Fluorite Medium Exterior Emulsion",
    slug: "fluorite-medium-exterior-emulsion",
    description:
      "A modified acrylic emulsion pigmented with titanium dioxide and other light-fast, alkali resisting additives. Good flow, levelling, covering and colour retention properties. An ideal smooth and matt coating for external areas, usable as interior and exterior emulsion on concrete, plaster, masonry, brickwork, etc. Better resistance to algae and fungi development, with moderately high resistance to chalking, cracking and weathering.",
    productType: "exterior_wall_coating",
    priceRange: "premium",
    basePrice: 2450,
    coverageArea: "65 - 75 Sq.ft/2 Coats",
    finish: "Matt",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: true,
    antiAlgae: true,
    images: ["/images/paints/FluoriteMediumExteriorEmulsion.png"],
    isFeatured: true,
  },
  {
    name: "Onyx Sheen Exterior Emulsion",
    slug: "onyx-sheen-exterior-emulsion",
    description:
      "Blitz Paints Onyx Emulsion is a premium quality sheen finish exterior paint that offers maximum colour performance to protect your home for years. Its unique acrylic formulation delivers a strong paint film with unparalleled resistance to dirt pick-up, flaking and chalking, good washability, and prevents fungal growth and dirt pickup on walls.",
    productType: "exterior_wall_coating",
    priceRange: "premium",
    basePrice: 2650,
    coverageArea: "65 - 75 Sq.ft/2 Coats",
    finish: "High Sheen",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: true,
    antiAlgae: true,
    images: ["/images/paints/OnyxSheenExteriorEmulsion.png"],
    isFeatured: true,
  },
  {
    name: "Opal Premium Exterior Emulsion",
    slug: "opal-premium-exterior-emulsion",
    description:
      "Blitz Paints Opal is a water-based, modified acrylic, weatherproof emulsion with silicon additives, specially formulated to withstand extreme tropical conditions of high rainfall, humidity and heat. Excellent resistance to algae and fungi growth prevents black spots on walls. Extremely good protection against alkali and UV degradation ensures colours don't fade, with best-in-class cleanability and dirt pickup resistance. Its waterproofing properties form an effective barrier against water penetration.",
    productType: "exterior_wall_coating",
    priceRange: "luxury",
    basePrice: 3100,
    coverageArea: "65 - 75 Sq.ft/2 Coats",
    finish: "High Sheen",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: true,
    antiAlgae: true,
    images: ["/images/paints/OpalPremiumExteriorEmulsion.png"],
    isFeatured: true,
  },
  {
    name: "Amber Premium Damp Proof Emulsion",
    slug: "amber-premium-damp-proof-emulsion",
    description:
      "Blitz Amber is a luxury category high-performance exterior emulsion specially designed for heavy rainfall areas. Gives robust film strength and unmatched gloss with damp proof and waterproof property, high dirt resistance, stain repellency and protection against heavy rain, heat, algae and fungal growth.",
    productType: "exterior_wall_coating",
    priceRange: "luxury",
    basePrice: 2950,
    coverageArea: "65 - 75 Sq.ft/2 Coats",
    finish: "High Sheen",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: true,
    antiAlgae: true,
    images: ["/images/paints/AmberPremiumDampProofEmulsion.png"],
    isFeatured: true,
  },

  // ---- Interior Emulsions (4) ----
  {
    name: "Citrine Economy Interior Emulsion",
    slug: "citrine-economy-interior-emulsion",
    description:
      "Blitz Paints Citrine Emulsion is an interior wall finish that can be applied on all types of smooth plaster, false ceiling, asbestos sheets, concrete, etc. Provides excellent durability for a smooth finish, with mild washability with soap solution. Water-based polymer serves as a strong binder contributing to durability, adhesion and superior coverage compared to standard emulsions.",
    productType: "interior_wall_coating",
    priceRange: "economy",
    basePrice: 1250,
    coverageArea: "85 - 90 Sq.ft/2 Coats",
    finish: "Smooth Sheen",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: false,
    antiAlgae: false,
    images: ["/images/paints/CitrineEconomyInteriorEmulsion.png"],
    isFeatured: false,
  },
  {
    name: "Garnet Glossy Interior Emulsion",
    slug: "garnet-glossy-interior-emulsion",
    description:
      "Blitz Paints Garnet Emulsion provides essential protection to interior walls with a glossy finish. A premium acrylic-based emulsion offering long-lasting, smooth and glossy finish, a variety of shades, higher coverage, good washability and excellent colour retention. Removes wall stains easily and keeps the interior looking as good as new for a long time.",
    productType: "interior_wall_coating",
    priceRange: "premium",
    basePrice: 2100,
    coverageArea: "65 - 75 Sq.ft/2 Coats",
    finish: "Gloss",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: false,
    antiAlgae: false,
    images: ["/images/paints/GarnetGlossyInteriorEmulsion.png"],
    isFeatured: true,
  },
  {
    name: "Howlite Sheen Interior Emulsion",
    slug: "howlite-sheen-interior-emulsion",
    description:
      "Blitz Howlite High Sheen is a premium interior emulsion designed to give walls a rich sheen look that lasts. Superior grade and high emulsion content gives very high film strength with superior adhesion, high sheen and ultra smooth finish. Has an elastomeric film with crack bridging ability that helps bridge hairline cracks, plus superior cleanability and stain resistance from its moderately high washable property.",
    productType: "interior_wall_coating",
    priceRange: "premium",
    basePrice: 2200,
    coverageArea: "65 - 75 Sq.ft/2 Coats",
    finish: "High Sheen",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: false,
    antiAlgae: false,
    images: ["/images/paints/HowliteSheenInteriorEmulsion.png"],
    isFeatured: false,
  },
  {
    name: "Azurite Premium Interior Emulsion",
    slug: "azurite-premium-interior-emulsion",
    description:
      "Blitz Azurite Ultra High Sheen emulsion offers excellent adhesion with best-in-segment coverage and crack filling properties for interior walls. Engineered with ultra-high performance emulsions and elastomeric acrylic polymer for high elasticity, superior dust repellency and water repellency, providing long-term protection even under challenging climatic conditions.",
    productType: "interior_wall_coating",
    priceRange: "premium",
    basePrice: 2400,
    coverageArea: "65 - 75 Sq.ft/2 Coats",
    finish: "Ultra Sheen",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: true,
    antiAlgae: false,
    images: ["/images/paints/AzuritePremiumInteriorEmulsion.png"],
    isFeatured: true,
  },

  // ---- Specialty Coatings (2) ----
  {
    name: "Sunstone High Gloss Foundation Coat",
    slug: "sunstone-high-gloss-foundation-coat",
    description:
      "Blitz Paints Sunstone Emulsion is a glossy finish exterior emulsion for foundation, compound walls, exterior and interior borders, flower pots, etc. Its unique acrylic formulation delivers a strong paint film with unparalleled resistance to dirt pick-up, flaking and chalking, good scrub resistance and washability, and easily removes stains for a polished glossy look. Available in Black, Grey, Terracotta and Brown.",
    productType: "specialty_coating",
    priceRange: "luxury",
    basePrice: 1950,
    coverageArea: "65 - 75 Sq.ft/2 Coats",
    finish: "Gloss",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: true,
    antiAlgae: true,
    images: ["/images/paints/SunstoneHighGlossFoundationCoat.png"],
    isFeatured: true,
  },
  {
    name: "Jade Roof & Tile Coat",
    slug: "jade-roof-tile-coat",
    description:
      "Blitz Paints Jade, Roof & Floor Tile Guard is a water-based high-performance acrylic emulsion coating formulated for high durability on roof and floor tiles. Provides superior sheen finish and strength, protects roof tiles from algae and fungus, and is highly durable even in heavy rain. Good slip resistance for floor/paver tile applications, with flexible adhesion that absorbs stress from movement, vibration or thermal expansion. Available in Black, White, Golden Yellow, Silver Grey, Terracotta Red, Grape Brown, Iron Ore Grey and Antique Brown.",
    productType: "specialty_coating",
    priceRange: "premium",
    basePrice: 1800,
    coverageArea: "65 - 75 Sq.ft/2 Coats",
    finish: "Sheen",
    availablePacks: AVAILABLE_PACKS,
    lowVoc: true,
    antiAlgae: true,
    images: ["/images/paints/JadeRoofTileCoat.png"],
    isFeatured: true,
  },
];

async function main() {
  // 1. Clean out stale/duplicate rows from earlier seed runs.
  const deleted = await prisma.product.deleteMany({
    where: { slug: { in: STALE_SLUGS } },
  });
  console.log(`Removed ${deleted.count} stale product row(s)`);

  // 2. Upsert the correct 14.
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        productType: p.productType,
        priceRange: p.priceRange,
        basePrice: p.basePrice,
        coverageArea: p.coverageArea,
        finish: p.finish,
        availablePacks: p.availablePacks,
        lowVoc: p.lowVoc,
        antiAlgae: p.antiAlgae,
        images: p.images,
        isFeatured: p.isFeatured,
      },
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        productType: p.productType,
        priceRange: p.priceRange,
        basePrice: p.basePrice,
        coverageArea: p.coverageArea,
        finish: p.finish,
        availablePacks: p.availablePacks,
        lowVoc: p.lowVoc,
        antiAlgae: p.antiAlgae,
        images: p.images,
        isFeatured: p.isFeatured,
      },
    });
    console.log(`Upserted: ${p.name}`);
  }
  // Services - matches the 3 rows already in the local Postgres `services`
  // table, upserted (keyed on slug) so this is safe to re-run.
  interface ServiceSeed {
    name: string;
    slug: string;
    description: string;
    serviceType: string;
    images: string[];
    isFeatured: boolean;
  }

  const services: ServiceSeed[] = [
    {
      name: "WaterProofing Solutions",
      slug: "waterproofing-solutions",
      description: "Advance damp protection for roofs, basements, and bathrooms.",
      serviceType: "waterproofing",
      images: ["/images/services/waterproofing.jpg"],
      isFeatured: true,
    },
    {
      name: "Painting Services",
      slug: "painting-services",
      description: "Premium interior & exterior application with flawless finish and long lasting beauty.",
      serviceType: "interior_painting",
      images: ["/images/services/painting-services.jpg"],
      isFeatured: true,
    },
    {
      name: "Tiles & Chemicals",
      slug: "tiles-and-chemicals",
      description: "High performance tile adhesives, polymers and construction chemicals.",
      serviceType: "tile_coating",
      images: ["/images/services/tiles-chemicals.jpg"],
      isFeatured: true,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        description: s.description,
        serviceType: s.serviceType,
        images: s.images,
        isFeatured: s.isFeatured,
      },
      create: {
        name: s.name,
        slug: s.slug,
        description: s.description,
        serviceType: s.serviceType,
        images: s.images,
        isFeatured: s.isFeatured,
      },
    });
    console.log(`Upserted service: ${s.name}`);
  }
  // News - matches the 3 rows already in the local Postgres `news` table,
  // upserted (keyed on slug) so this is safe to re-run.
  interface NewsSeed {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    tag: string;
    isPublished: boolean;
    publishedAt: Date;
  }

  const news: NewsSeed[] = [
    {
      title: "Blitz Paints at Kerala Builders Expo 2026",
      slug: "blitz-paints-kerala-builders-expo-2026",
      excerpt: "Meet our team and explore our latest innovations.",
      content: "Full article content goes here.",
      featuredImage: "/images/news/builders-expo.jpg",
      tag: "Event",
      isPublished: true,
      publishedAt: new Date("2026-07-30"),
    },
    {
      title: "Blitz Paint - Expand to Central Kerala - New Dealer Network",
      slug: "expand-central-kerala-dealer-network",
      excerpt: "Growing our reach with new authorized dealers.",
      content: "Full article content goes here.",
      featuredImage: "/images/news/dealer-network.jpg",
      tag: "Company Update",
      isPublished: true,
      publishedAt: new Date("2026-07-30"),
    },
    {
      title: "Introducing Garnet Interior Emulsion - Now Better than Ever",
      slug: "introducing-garnet-interior-emulsion",
      excerpt: "A refreshed formula with richer coverage and lower VOC.",
      content: "Full article content goes here.",
      featuredImage: "/images/news/garnet-launch.jpg",
      tag: "Product Launch",
      isPublished: true,
      publishedAt: new Date("2026-07-30"),
    },
  ];

  for (const n of news) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: {
        title: n.title,
        excerpt: n.excerpt,
        content: n.content,
        featuredImage: n.featuredImage,
        tag: n.tag,
        isPublished: n.isPublished,
        publishedAt: n.publishedAt,
      },
      create: {
        title: n.title,
        slug: n.slug,
        excerpt: n.excerpt,
        content: n.content,
        featuredImage: n.featuredImage,
        tag: n.tag,
        isPublished: n.isPublished,
        publishedAt: n.publishedAt,
      },
    });
    console.log(`Upserted news: ${n.title}`);
  }
  // Colour shades - larger sample palette across every ColourFamily
  const palette = [
    // reds
    ['Crimson Red', '#C81E3A', 'reds'],
    ['Fire Red', '#E8422A', 'reds'],
    ['Ruby Red', '#9B111E', 'reds'],
    ['Brick Red', '#B5432D', 'reds'],
    // oranges
    ['Coral Peach', '#F3906B', 'oranges'],
    ['Amber Orange', '#F0891E', 'oranges'],
    ['Burnt Orange', '#CC5500', 'oranges'],
    ['Tangerine', '#F28C28', 'oranges'],
    // yellows
    ['Sunflower Yellow', '#F6D82F', 'yellows'],
    ['Lemon Zest', '#F7E85B', 'yellows'],
    ['Golden Wheat', '#E8C547', 'yellows'],
    ['Mustard', '#D4AC0D', 'yellows'],
    // greens
    ['Olive Green', '#7C8A3E', 'greens'],
    ['Meadow Green', '#4CAF3E', 'greens'],
    ['Forest Green', '#1F7A3D', 'greens'],
    ['Sage Green', '#6FBF8B', 'greens'],
    ['Pine Green', '#2E5339', 'greens'],
    ['Lime Green', '#8DC63F', 'greens'],
    // teals
    ['Teal Green', '#1E8A6E', 'teals'],
    ['Aqua Mint', '#3FD6C0', 'teals'],
    ['Deep Teal', '#0F5C5C', 'teals'],
    ['Turquoise', '#30D5C8', 'teals'],
    // blues
    ['Sky Blue', '#8FCBE0', 'blues'],
    ['Ocean Blue', '#2E7FD6', 'blues'],
    ['Denim Blue', '#5C74C4', 'blues'],
    ['Navy Blue', '#1B2A6B', 'blues'],
    ['Cobalt Blue', '#0047AB', 'blues'],
    ['Powder Blue', '#B0E0E6', 'blues'],
    // purples
    ['Royal Purple', '#5B2A86', 'purples'],
    ['Violet', '#7A3FC4', 'purples'],
    ['Lavender', '#B399D4', 'purples'],
    ['Plum', '#673147', 'purples'],
    // pinks
    ['Blush Pink', '#F4C2C2', 'pinks'],
    ['Rose Pink', '#EF5FA7', 'pinks'],
    ['Magenta', '#C71585', 'pinks'],
    ['Salmon Pink', '#FA8072', 'pinks'],
    // browns
    ['Terracotta', '#C3672E', 'browns'],
    ['Coffee Brown', '#7A4B2A', 'browns'],
    ['Chocolate', '#4E2A1E', 'browns'],
    ['Tan', '#C8A165', 'browns'],
    // neutrals
    ['Slate Grey', '#6E7679', 'neutrals'],
    ['Charcoal', '#33393B', 'neutrals'],
    ['Stone Grey', '#A8A296', 'neutrals'],
    ['Warm Beige', '#E6D8C3', 'neutrals'],
    // whites
    ['Pure White', '#FFFFFF', 'whites'],
    ['Ivory', '#FFFFF0', 'whites'],
    ['Off White', '#F5F5F0', 'whites'],
    ['Pearl White', '#F2F3F4', 'whites'],
  ];

  await prisma.colourShade.createMany({
    data: palette.map(([name, hexCode, family]) => ({ name, hexCode, family })),
    skipDuplicates: true,
  });

  console.log("Product seed complete - 14 products in database");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });