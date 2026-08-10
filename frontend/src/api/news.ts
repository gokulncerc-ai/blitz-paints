import { apiFetch } from './client';
import { NewsArticle } from '../types';

export function getNews() {
  return apiFetch<NewsArticle[]>('/news');
}

export function getNewsBySlug(slug: string) {
  return apiFetch<NewsArticle>(`/news/${slug}`);
}