import { Prisma } from '@prisma/client';
import { prisma } from '../config/db';

// Mirrors every column on the `gallery` table
export interface GalleryRecord {
    id: string;
    title: string | null;
    imageUrl: string;
    category: string; // projects | products | team | events | other
    isActive: boolean;
    createdAt: Date;
}

export interface GalleryFilters {
    category?: string;
}

export function findAllGallery(filters: GalleryFilters = {}) {
    const where: Prisma.GalleryWhereInput = { isActive: true };
    if (filters.category && filters.category !== 'all') where.category = filters.category;

    return prisma.gallery.findMany({ where, orderBy: { createdAt: 'desc' } });
}

export function findGalleryById(id: string) {
    return prisma.gallery.findUnique({ where: { id } });
}

export function createGalleryItem(data: Prisma.GalleryCreateInput) {
    return prisma.gallery.create({ data });
}

export function updateGalleryItem(id: string, data: Prisma.GalleryUpdateInput) {
    return prisma.gallery.update({ where: { id }, data });
}

export function deleteGalleryItem(id: string) {
    return prisma.gallery.delete({ where: { id } });
}