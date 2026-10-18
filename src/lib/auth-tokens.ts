let accessToken: string | null = null;
let refreshToken: string | null = null;

const REFRESH_STORAGE_KEY = "mh_refresh_token";

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function getRefreshToken(): string | null {
  if (refreshToken) return refreshToken;
  if (typeof window === "undefined") return null;
  refreshToken = window.localStorage.getItem(REFRESH_STORAGE_KEY);
  return refreshToken;
}

export function setRefreshToken(token: string | null): void {
  refreshToken = token;
  if (typeof window === "undefined") return;
  if (token) {
    window.localStorage.setItem(REFRESH_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(REFRESH_STORAGE_KEY);
  }
}

export function clearTokens(): void {
  accessToken = null;
  refreshToken = null;
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(REFRESH_STORAGE_KEY);
  }
}
