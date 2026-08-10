import { Prisma } from '@prisma/client';
import { prisma } from '../config/db';

// Mirrors every column on the `services` table
export interface ServiceRecord {
    id: string;
    name: string;
    slug: string;
    description: string;
    serviceType: string; // interior_painting | exterior_painting | waterproofing | tile_coating | construction_chemicals_application
    images: Prisma.JsonValue;
    isFeatured: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ServiceFilters {
    type?: string;
    featured?: boolean;
}

export function findAllServices(filters: ServiceFilters = {}) {
    const where: Prisma.ServiceWhereInput = { isActive: true };

    if (filters.type && filters.type !== 'all') where.serviceType = filters.type;
    if (filters.featured) where.isFeatured = true;

    return prisma.service.findMany({ where, orderBy: { createdAt: 'desc' } });
}

export function findServiceBySlug(slug: string) {
    return prisma.service.findUnique({ where: { slug } });
}

export function findServiceById(id: string) {
    return prisma.service.findUnique({ where: { id } });
}

export function createService(data: Prisma.ServiceCreateInput) {
    return prisma.service.create({ data });
}

export function updateService(id: string, data: Prisma.ServiceUpdateInput) {
    return prisma.service.update({ where: { id }, data });
}

export function deleteService(id: string) {
    return prisma.service.delete({ where: { id } });
}