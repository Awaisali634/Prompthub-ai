/**
 * API Endpoint URL Resolver
 * 
 * In standard web development, requests use relative paths ('/api/...').
 * In packaged native Android builds (Capacitor), requests route to the hosted backend
 * server using VITE_API_BASE_URL (or fallback to window.location.origin).
 */

export const getApiUrl = (endpoint: string): string => {
  const envBase = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || '';
  if (envBase) {
    if (envBase.endsWith('/') && endpoint.startsWith('/')) {
      return `${envBase}${endpoint.slice(1)}`;
    }
    return `${envBase}${endpoint}`;
  }
  return endpoint;
};
