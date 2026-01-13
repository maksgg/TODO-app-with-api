import { createPinia } from "pinia";
import { createApp } from "vue";
import VueFeather from "vue-feather";

import App from "./App.vue";
import router from "./router";

import { i18n } from "@/features/i18n/composables/useI18n";
import { setupApiClient } from "@/shared/api";

import "./main.scss";

// Setup API client interceptors for token management
setupApiClient();

// Create Vue app instance
const app = createApp(App);

// Install plugins
app.use(createPinia());
app.use(router);
app.use(i18n);

// Register global component
app.component("VueFeather", VueFeather);

// Mount the app
app.mount("#app");
