import { Prisma } from '@prisma/client';
import { prisma } from '../config/db';

// Mirrors every column on the `news` table
export interface NewsRecord {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featuredImage: string | null;
    tag: string | null; // Product Launch | Company Update | Event
    isPublished: boolean;
    publishedAt: Date | null;
    createdAt: Date;
}

export function findAllPublishedNews() {
    return prisma.news.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' },
    });
}

export function findAllNewsAdmin() {
    return prisma.news.findMany({ orderBy: { createdAt: 'desc' } });
}

export function findNewsBySlug(slug: string) {
    return prisma.news.findUnique({ where: { slug } });
}

export function findNewsById(id: string) {
    return prisma.news.findUnique({ where: { id } });
}

export function createNews(data: Prisma.NewsCreateInput) {
    return prisma.news.create({ data });
}

export function updateNews(id: string, data: Prisma.NewsUpdateInput) {
    return prisma.news.update({ where: { id }, data });
}

export function deleteNews(id: string) {
    return prisma.news.delete({ where: { id } });
}