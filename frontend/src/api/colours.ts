import { apiFetch, buildQuery } from './client';
import { ColourShade, ColourQueryParams } from '../types';

export function getColours(params?: ColourQueryParams) {
  return apiFetch<ColourShade[]>(`/colours${buildQuery(params)}`);
}