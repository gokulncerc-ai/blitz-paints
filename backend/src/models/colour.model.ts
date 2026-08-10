import { Prisma } from '@prisma/client';
import { prisma } from '../config/db';

// Mirrors every column on the `colour_shades` table
export interface ColourShadeRecord {
    id: string;
    name: string;
    hexCode: string;
    family: string | null; // reds | yellows | greens | blues | purples | neutrals
    createdAt: Date;
}

export interface ColourFilters {
    family?: string;
}

export function findAllColours(filters: ColourFilters = {}) {
    const where: Prisma.ColourShadeWhereInput = {};
    if (filters.family && filters.family !== 'all') where.family = filters.family;

    return prisma.colourShade.findMany({ where, orderBy: { family: 'asc' } });
}

export function findColourById(id: string) {
    return prisma.colourShade.findUnique({ where: { id } });
}

export function createColour(data: Prisma.ColourShadeCreateInput) {
    return prisma.colourShade.create({ data });
}

export function updateColour(id: string, data: Prisma.ColourShadeUpdateInput) {
    return prisma.colourShade.update({ where: { id }, data });
}

export function deleteColour(id: string) {
    return prisma.colourShade.delete({ where: { id } });
}