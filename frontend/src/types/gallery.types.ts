// Path: frontend/src/types/gallery.types.ts
// Mirrors backend/src/models/gallery.model.ts

export type GalleryCategory = 'projects' | 'products' | 'team' | 'events' | 'other';

export interface GalleryItem {
    id: string;
    title: string | null;
    imageUrl: string;
    category: GalleryCategory | string;
    isActive: boolean;
    createdAt: string;
}

export interface GalleryQueryParams {
    category?: string;
    [key: string]: string | number | boolean | undefined;
}