// Path: frontend/src/types/enquiry.types.ts
// Mirrors backend/src/models/enquiry.model.ts

import { PaginationMeta } from './common.types';

export type EnquiryType = 'product' | 'service' | 'general';
export type EnquiryStatus = 'pending' | 'contacted' | 'resolved' | 'closed';

export interface EnquiryInput {
    name: string;
    email: string;
    phone: string;
    pincode: string;
    state: string;
    enquiryType: EnquiryType;
    productId?: string;
    serviceId?: string;
    message?: string;
}

export interface Enquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    pincode: string;
    state: string;
    enquiryType: EnquiryType;
    message: string | null;
    productId: string | null;
    serviceId: string | null;
    status: EnquiryStatus;
    createdAt: string;
    product?: { id: string; name: string; slug: string } | null;
    service?: { id: string; name: string; slug: string } | null;
}

// Admin-only (Phase 2) - the listing/status endpoints exist on the backend
// already (guarded by attachUser), so these types are ready even though no
// admin page calls them yet in Phase 1.
export interface EnquiryListParams {
    state?: string;
    pincode?: string;
    status?: EnquiryStatus | string;
    page?: number;
    limit?: number;
    [key: string]: string | number | boolean | undefined;
}

export interface EnquiryListResponse {
    enquiries: Enquiry[];
    pagination: PaginationMeta;
}