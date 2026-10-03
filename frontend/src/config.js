const configuredApiUrl = process.env.REACT_APP_API_URL?.trim().replace(/\/+$/, '');

const apiBaseUrl = configuredApiUrl || (
  process.env.NODE_ENV === 'production' ? null : 'http://localhost:8000/api/v1'
);

export function apiUrl(path) {
  if (!apiBaseUrl) {
    throw new Error('REACT_APP_API_URL is not configured.');
  }

  return `${apiBaseUrl}${path}`;
}