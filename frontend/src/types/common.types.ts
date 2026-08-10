// Path: frontend/src/types/common.types.ts
// Shared shapes used across every API response.

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
}