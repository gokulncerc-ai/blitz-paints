import { Prisma } from '@prisma/client';
import { prisma } from '../config/db';

// Mirrors every column on the `projects` table
export interface ProjectRecord {
    id: string;
    title: string;
    category: string; // interior | exterior | waterproofing
    beforeImage: string;
    afterImage: string;
    location: string | null;
    isActive: boolean;
    createdAt: Date;
}

export interface ProjectFilters {
    category?: string;
}

export function findAllProjects(filters: ProjectFilters = {}) {
    const where: Prisma.ProjectWhereInput = { isActive: true };
    if (filters.category && filters.category !== 'all') where.category = filters.category;

    return prisma.project.findMany({ where, orderBy: { createdAt: 'desc' } });
}

export function findProjectById(id: string) {
    return prisma.project.findUnique({ where: { id } });
}

export function createProject(data: Prisma.ProjectCreateInput) {
    return prisma.project.create({ data });
}

export function updateProject(id: string, data: Prisma.ProjectUpdateInput) {
    return prisma.project.update({ where: { id }, data });
}

export function deleteProject(id: string) {
    return prisma.project.delete({ where: { id } });
}