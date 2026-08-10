import { apiFetch, buildQuery } from './client';
import { GalleryItem, GalleryQueryParams } from '../types';

export function getGallery(params?: GalleryQueryParams) {
  return apiFetch<GalleryItem[]>(`/gallery${buildQuery(params)}`);
}