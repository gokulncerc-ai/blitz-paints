// Path: frontend/src/types/project.types.ts
// Mirrors backend/src/models/project.model.ts

export type ProjectCategory = 'interior' | 'exterior' | 'waterproofing';

export interface ProjectItem {
    id: string;
    title: string;
    category: ProjectCategory | string;
    beforeImage: string;
    afterImage: string;
    location: string | null;
    isActive: boolean;
    createdAt: string;
}

export interface ProjectQueryParams {
    category?: string;
    [key: string]: string | number | boolean | undefined;
}