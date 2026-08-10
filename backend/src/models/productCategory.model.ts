import { Prisma } from '@prisma/client';
import { prisma } from '../config/db';

// Mirrors every column on the `product_categories` table
export interface ProductCategoryRecord {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    isActive: boolean;
    createdAt: Date;
}

export function findAllCategories() {
    return prisma.productCategory.findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' },
    });
}

export function findCategoryBySlug(slug: string) {
    return prisma.productCategory.findUnique({
        where: { slug },
        include: { products: true },
    });
}

export function findCategoryById(id: string) {
    return prisma.productCategory.findUnique({ where: { id } });
}

export function createCategory(data: Prisma.ProductCategoryCreateInput) {
    return prisma.productCategory.create({ data });
}

export function updateCategory(id: string, data: Prisma.ProductCategoryUpdateInput) {
    return prisma.productCategory.update({ where: { id }, data });
}

export function deleteCategory(id: string) {
    return prisma.productCategory.delete({ where: { id } });
}