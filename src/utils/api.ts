import axios, { AxiosError } from "axios";
import type { AxiosResponse } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

// API Base URL from environment variables - using Next.js internal API routes
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

// Log network requests for debugging purposes
const logRequest = (config: InternalAxiosRequestConfig) => {
  return config;
};
// Request interceptors
api.interceptors.request.use(logRequest);

// Response interceptors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only attempt to refresh the token if we get a 401 and haven't tried yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/api/auth/refresh-token"
    ) {
      if (isRefreshing) {
        try {
          // Wait for the current refresh to complete
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.post(
          `/api/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: undefined,
            },
          }
        );

        const newToken = data.accessToken;

        // Update stored token

        // Process queue with new token
        processQueue(null, newToken);

        // Return original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
