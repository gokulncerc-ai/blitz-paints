// Path: frontend/src/api/services.ts
import { apiFetch, buildQuery } from './client';
import { Service, ServiceQueryParams } from '../types';

export function getServices(params?: ServiceQueryParams) {
  return apiFetch<Service[]>(`/services${buildQuery(params)}`);
}

export function getServiceBySlug(slug: string) {
  return apiFetch<Service>(`/services/${slug}`);
}