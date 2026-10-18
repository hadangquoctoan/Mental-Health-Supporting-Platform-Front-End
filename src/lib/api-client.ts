import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/lib/auth-tokens";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingQueue: Array<(token: string | null) => void> = [];

function flushQueue(token: string | null) {
  pendingQueue.forEach((resolve) => resolve(token));
  pendingQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!original || error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push((token) => {
          if (!token) {
            reject(error);
            return;
          }
          original.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(original));
        });
      });
    }

    isRefreshing = true;
    try {
      const currentRefresh = getRefreshToken();
      const { data } = await axios.post<{
        accessToken: string;
        refreshToken: string;
      }>(
        `${API_BASE_URL}/auth/refresh`,
        currentRefresh ? { refreshToken: currentRefresh } : {},
        { withCredentials: true },
      );
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      flushQueue(data.accessToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return apiClient(original);
    } catch (refreshError) {
      flushQueue(null);
      clearTokens();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
