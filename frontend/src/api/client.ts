// Thin fetch wrapper: builds the base URL, attaches the admin token if present,
// parses JSON, and throws readable errors. Also exports buildQuery() so every
// resource file builds query strings the same way.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
export const API_BASE_URL = BASE_URL;
const ADMIN_TOKEN_KEY = 'blitz_admin_token';

function getStoredToken(): string | null {
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    // localStorage can throw in private browsing / storage-disabled contexts
    return null;
  }
}

// Turns { type: 'exterior_wall_coating', featured: true, search: undefined }
// into "?type=exterior_wall_coating&featured=true" - drops undefined/null/''.
export function buildQuery(params?: Record<string, string | number | boolean | undefined | null>): string {
  if (!params) return '';
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    usp.set(key, String(value));
  });
  const query = usp.toString();
  return query ? `?${query}` : '';
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  // Some endpoints (e.g. future DELETE routes) may return an empty body
  const text = await res.text();
  const json = text ? JSON.parse(text) : { success: res.ok, data: null };

  if (!res.ok || json.success === false) {
    throw new Error(json.message || `Request failed with status ${res.status}`);
  }

  return json.data as T;
}