export type ProductType =
    | 'interior_wall_coating'
    | 'exterior_wall_coating'
    | 'primer'
    | 'specialty_coating'
    | 'waterproofing'
    | 'tile_chemicals'
    | 'construction_chemicals';

export type PriceRange = 'budget' | 'economy' | 'medium' | 'premium' | 'luxury';

export interface ProductCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    isActive: boolean;
    createdAt: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    categoryId: string | null;
    category?: ProductCategory | null;
    productType: ProductType;
    priceRange: PriceRange;
    basePrice: string | number | null;
    coverageArea: string | null;
    finish: string | null;
    lowVoc: boolean;
    antiAlgae: boolean;
    images: string[];
    isFeatured: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Intentionally loose (plain strings) - these come from tab/dropdown state
// on the frontend and get serialized straight into a query string, so we
// don't force the stricter ProductType/PriceRange unions here.
export interface ProductQueryParams {
    type?: string;
    priceRange?: string;
    featured?: string | boolean;
    search?: string;
    categoryId?: string;
    [key: string]: string | number | boolean | undefined;
}