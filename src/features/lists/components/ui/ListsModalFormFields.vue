<script setup lang="ts">
import VColorPicker from "@/shared/ui/common/VColorPicker.vue";
import VInput from "@/shared/ui/common/VInput.vue";

const model = defineModel<{
  title: string;
  hexColor: string;
}>();

const hexColors = [
  { id: "#3B82F6", color: "#3B82F6" },
  { id: "#8B5CF6", color: "#8B5CF6" },
  { id: "#14B8A6", color: "#14B8A6" },
  { id: "#22C55E", color: "#22C55E" },
  { id: "#FACC15", color: "#FACC15" },
  { id: "#FB923C", color: "#FB923C" },
  { id: "#EF4444", color: "#EF4444" },
  { id: "#EC4899", color: "#EC4899" },
];
</script>

<template>
  <div class="flex flex-col gap-2 text-left">
    <VInput
      v-model="model.title"
      :label="$t('lists.modal.list_name')"
      :placeholder="$t('lists.modal.enter_list_name')"
    />
    <VColorPicker
      v-model="model.hexColor"
      :title="$t('lists.modal.list_color')"
      :items="hexColors"
    />
  </div>
</template>
