// Path: frontend/src/types/service.types.ts
// Mirrors backend/src/models/service.model.ts

export type ServiceType =
    | 'interior_painting'
    | 'exterior_painting'
    | 'waterproofing'
    | 'tile_coating'
    | 'construction_chemicals_application';

export interface Service {
    id: string;
    name: string;
    slug: string;
    description: string;
    serviceType: ServiceType;
    images: string[];
    isFeatured: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ServiceQueryParams {
    type?: string;
    featured?: string | boolean;
    [key: string]: string | number | boolean | undefined;
}