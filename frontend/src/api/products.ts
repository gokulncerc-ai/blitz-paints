// Path: frontend/src/api/products.ts
import { apiFetch, buildQuery } from './client';
import { Product, ProductQueryParams } from '../types';

export function getProducts(params?: ProductQueryParams) {
  return apiFetch<Product[]>(`/products${buildQuery(params)}`);
}

export function getProductBySlug(slug: string) {
  return apiFetch<Product>(`/products/${slug}`);
}