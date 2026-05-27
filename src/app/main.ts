import { createApi, createApiClient, tokenManager } from "@ametie/vue-muza-use";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { toast } from "vue-sonner";

import App from "./App.vue";
import router from "./router";

import { i18n } from "@/shared/composables/useI18n";
import { useThemeStore } from "@/shared/stores/useThemeStore";

import "./main.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

const themeStore = useThemeStore();
themeStore.initTheme();

export const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  authOptions: {
    refreshUrl: "/auth/refresh",
    onTokenRefreshed: ({ data }) => tokenManager.setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }),
    refreshPayload: () => ({
      refreshToken: tokenManager.getRefreshToken(),
    }),
    onTokenRefreshFailed: () => {
      tokenManager.clearTokens();
      router.push("/auth");
    },
  },
});

app.use(createApi({
  axios: api,
  onError: (error) => toast.error(error.message),
}));

// Mount the app
app.mount("#app");
