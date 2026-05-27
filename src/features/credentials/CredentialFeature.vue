<script setup lang="ts">
import { useI18n } from "vue-i18n";

import VContainer from "@/shared/ui/common/VContainer.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";

const { t } =  useI18n();
const developersInfo = [
  {
    jobTitle: t("credentials.developer"),
    name: t("credentials.maksym_zhovmir"),
    techStack: `${t("credentials.front_end")} (JS, TS, Vue 3, Pinia, Vue Router, Composition API)`,
    email: "maks.zhovmir.97@gmail.com",
    linkedIn: "https://www.linkedin.com/in/maks-zhovmir-82864b27b/",
    worksLabel: "GitHub",
    worksLink: "https://github.com/maksgg",
  },
  {
    jobTitle: t("credentials.designer"),
    name: t("credentials.anastasiia_orieshyna"),
    techStack: `UX/UI ${t("credentials.designer")}`,
    email: "anastasiiaorieshyna@gmail.com",
    linkedIn: "https://www.linkedin.com/in/anastasiia-orieshyna/",
    worksLabel: "Behance",
    worksLink: "https://www.behance.net/orieshynaanastasiia",
  },
];
</script>

<template>
  <VTitle :title="$t('credentials.design_&_development_contributors')" />
  <div class="flex justify-between gap-4">
    <VContainer
      v-for="info in developersInfo"
      :key="info.jobTitle"
      class="w-full shadow-custom-shadow"
    >
      <div class="flex flex-col gap-4">
        <span
          class="flex justify-center items-center text-body-emphasis text-txt-intro
          bg-list-card-border px-4 py-3 rounded-lg w-28"
        >
          {{ info.jobTitle.toUpperCase() }}
        </span>
        <h4 class="text-ui-btn text-txt-primary">
          {{ info.name }}
        </h4>
        <span class="text-data-body text-secondary border-b border-border-default pb-4">
          {{ info.techStack }}
        </span>
      </div>
      <div class="flex flex-col gap-3 mt-4 text-body-m">
        <a
          :href="`mailto:${info.email}`"
          class="text-primary hover:text-border-hover"
        >
          {{ info.email }}
        </a>
        <a
          :href="info.linkedIn"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:text-border-hover"
        >
          LinkedIn
        </a>
        <a
          :href="info.worksLink"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:text-border-hover"
        >
          {{ info.worksLabel }}
        </a>
      </div>
    </VContainer>
  </div>
</template>
