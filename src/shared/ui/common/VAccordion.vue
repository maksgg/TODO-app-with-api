<script setup lang="ts">
type Size = "sm" | "md" | "lg" | "full";

type Item = {
  id: string | number;
  title: string;
  content?: string;
  disabled?: boolean;
};

type AccordionProps = {
  modelValue: (string | number)[];
  items?: Item[];
  icon?: string;
  size?: Size;
  variant?: "primary" | "custom";
  accordion?: boolean;
};

const props = withDefaults(defineProps<AccordionProps>(),{
  items: () => [],
  modelValue: () => [],
  icon: "chevron-down",
  size: "md",
  variant: "primary",
  accordion: false,
});
const emit = defineEmits<{ "update:modelValue": [value: (string | number)[]] }>();

const isItemOpen = (id: string | number): boolean => props.modelValue.includes(id);

const handleItemClick = (id: string | number) => {
  const newModelValue = [...props.modelValue];
  const index = newModelValue.indexOf(id);

  if(props.accordion) {
    newModelValue.splice(index, 1);
  }

  if (index === -1) {
    newModelValue.push(id);
  } else {
    newModelValue.splice(index, 1);
  }

  emit("update:modelValue", newModelValue);
};

const contentSize: Record<Size, string> = {
  sm: "w-[20rem]",
  md: "w-[40rem]",
  lg: "w-[50rem]",
  full: "w-full",
};
const styleAccordion: Record<AccordionProps["variant"], string> = {
  primary: "bg-white border-t shadow-md",
  custom: "bg-green-500 border-t border-white text-white shadow-md border-none mt-1 mb-1",
};
</script>

<template>
  <ul :class="['flex flex-col', contentSize[props.size]]">
    <li
      v-for="item in props.items"
      :key="item.id"
      :class="[
        'flex flex-col justify-between items-center gap-1 p-2',
        styleAccordion[props.variant],
      ]"
    >
      <div class="flex justify-between w-full">
        <div>
          <slot :item="item">
            {{ item.title }}
          </slot>
        </div>
        <button
          type="button"
          class="flex items-center"
          :disabled="item.disabled"
          @click="handleItemClick(item.id)"
        >
          <VueFeather
            :type="props.icon"
            :class="['transition-all duration-300',
                     isItemOpen(item.id) ? 'rotate-180' : 'rotate-0']"
          />
        </button>
      </div>
      <div
        :class="[
          'self-start grid transition-[grid-template-rows] duration-300',
          isItemOpen(item.id) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        ]"
      >
        <div class="overflow-hidden">
          <slot
            name="content"
            :item="item"
          >
            {{ item.content }}
          </slot>
        </div>
      </div>
    </li>
  </ul>
</template>
