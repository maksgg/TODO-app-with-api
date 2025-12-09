/**
 * API Interceptors
 *
 * Modular interceptors for axios
 * - Request interceptor for adding token
 */

import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

import { tokenManager } from "./tokenManager";

export const AUTH_HEADER = "Authorization";

/**
 * Request Interceptor
 * Adds authorization token to each request based on authMode
 */
export function setupRequestInterceptor(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const extendedConfig = config as InternalAxiosRequestConfig & {
        authMode?: "default" | "public" | "optional"
      };

      // Determine auth mode (default is 'default')
      const authMode = extendedConfig.authMode || "default";

      // For 'public' mode, never add auth header
      if (authMode === "public") {
        return config;
      }

      // For 'default' and 'optional' modes, add token if available
      const authHeader = tokenManager.getAuthHeader();
      if (authHeader) {
        config.headers.set(AUTH_HEADER, authHeader);
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
}

/**
 * Setup all interceptors
 */
export function setupInterceptors(axiosInstance: AxiosInstance): void {
  setupRequestInterceptor(axiosInstance);
}
