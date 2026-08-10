import { apiFetch, buildQuery } from './client';
import { ProjectItem, ProjectQueryParams } from '../types';

export function getProjects(params?: ProjectQueryParams) {
  return apiFetch<ProjectItem[]>(`/projects${buildQuery(params)}`);
}