import axios from "axios";

// TODO: Export constants for token management
// Hint: You'll need TOKEN_TYPE, ACCESS_TOKEN, AUTH_HEADER
export const TOKEN_TYPE = "Bearer";
export const ACCESS_TOKEN = "accessToken";
export const AUTH_HEADER = "Authorization";

// TODO: Setup base URL from environment variable
const baseUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}` : "/api";

// TODO: Create axios instance with base configuration
const request = axios.create({
  baseURL: baseUrl,
  // TODO: Add other default configurations if needed
});

// TODO: Add request interceptor to automatically include auth token
request.interceptors.request.use(
  (config) => {
    // TODO: Get access token from localStorage

    // TODO: Add token to headers if it exists

    return config;
  },
  (error) => {
    // TODO: Handle request errors
    return Promise.reject(error);
  },
);

// TODO: Add response interceptor for error handling
request.interceptors.response.use(
  (response) => {
    // TODO: Handle successful responses
    return response;
  },
  (error) => {
    // TODO: Handle different types of errors
    // const { response } = error;

    // TODO: Handle 401 Unauthorized errors

    // TODO: Handle other common errors (403, 404, 500, etc.)

    return Promise.reject(error);
  },
);

export default request;
