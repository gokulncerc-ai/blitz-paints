// Path: backend/src/models/product.model.ts

import { Prisma } from '@prisma/client';
import { prisma } from '../config/db';

// Mirrors every column on the `products` table in schema.prisma
export interface ProductRecord {
    id: string;
    name: string;
    slug: string;
    description: string;
    categoryId: string | null;
    productType: string;       // interior_wall_coating | exterior_wall_coating | primer | waterproofing | tile_chemicals | construction_chemicals
    priceRange: string;        // budget | economy | medium | premium | luxury
    basePrice: Prisma.Decimal | null;
    coverageArea: string | null;
    finish: string | null;
    availablePacks: string[];
    lowVoc: boolean;
    antiAlgae: boolean;
    images: Prisma.JsonValue;
    isFeatured: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductFilters {
    type?: string;
    priceRange?: string;
    featured?: boolean;
    search?: string;
    categoryId?: string;
}

export function findAllProducts(filters: ProductFilters = {}) {
    const where: Prisma.ProductWhereInput = { isActive: true };

    if (filters.type && filters.type !== 'all') where.productType = filters.type;
    if (filters.priceRange && filters.priceRange !== 'all') where.priceRange = filters.priceRange;
    if (filters.featured) where.isFeatured = true;
    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.search) {
        where.OR = [
            { name: { contains: filters.search, mode: 'insensitive' } },
            { description: { contains: filters.search, mode: 'insensitive' } },
        ];
    }

    return prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
    });
}

export function findProductBySlug(slug: string) {
    return prisma.product.findUnique({
        where: { slug },
        include: { category: true },
    });
}

export function findProductById(id: string) {
    return prisma.product.findUnique({ where: { id } });
}

export function createProduct(data: Prisma.ProductCreateInput) {
    return prisma.product.create({ data });
}

export function updateProduct(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({ where: { id }, data });
}

export function deleteProduct(id: string) {
    return prisma.product.delete({ where: { id } });
}