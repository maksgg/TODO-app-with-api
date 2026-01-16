<script setup lang="ts">
import { computed, ref } from "vue";

import VButton from "./VButton.vue";
import VLoader from "./VLoader.vue";

import { TableParams } from "@/shared/types";
import VTableSortIcon from "@/shared/ui/common/VTableSortIcon.vue";
import { firstLetterUp } from "@/shared/utils/index";

type TableHeader = {
  key: string;
  label: string;
  textAlign?: string;
  width?: string;
};
type ToolbarConfig = {
  key: string;
  label: string;
  options: { name: string; value: string; }[]
};

type Pagination = {
  hasMore: boolean;
  limit: number;
};

type TableProps = {
  header: TableHeader[];
  rows: Record<string, any>[];
  loader?: boolean;
  sortAble?: boolean;
  showFilters?: boolean;
  searchable?: boolean;
  toolbarConfig?: ToolbarConfig[];
  pagination: Pagination;
};

const {
  header = [],
  rows = [],
  loader = false,
  sortAble = true,
  showFilters = true,
  searchable = false,
  toolbarConfig = [],
  pagination = { hasMore: false, limit: 20 },
} = defineProps<TableProps>();

const GRID_COLUMNS_MAP: Record<number, string> = {
  1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4",
  5: "grid-cols-5", 6: "grid-cols-6", 7: "grid-cols-7", 8: "grid-cols-8",
  9: "grid-cols-9", 10: "grid-cols-10", 11: "grid-cols-11", 12: "grid-cols-12",
};

const gridFrames = computed(() => {
  const hasCustomWidth = header.some(el => el.width);

  if (!hasCustomWidth) {
    return {
      class: GRID_COLUMNS_MAP[header.length] || "grid-cols-none",
      style: {},
    };
  }

  return {
    class: "",
    style: {
      gridTemplateColumns: header.map(el => el.width || "1fr").join(" "),
    },
  };
});

const sortState = ref<{ sort: string, order: "asc" | "desc" }>({
  sort: "",
  order: "asc",
});

const shouldShowFilter = (head: TableHeader): boolean => {
  if(!showFilters) return;

  const technicalKeys = ["actions", "id", "edit", "status", "member"];
  const isTechnical = technicalKeys.some(el => head.key.toLowerCase().includes(el));
  const hasNoLabel = !head.label || head.label.trim() === "";

  return !isTechnical && !hasNoLabel;
};

const emit = defineEmits<{ "request": [params: TableParams] }>();

const sorted = (columnKey: string) => {
  if (sortState.value.sort === columnKey) {
    sortState.value.order = sortState.value.order === "asc" ? "desc" : "asc";
  } else {
    sortState.value.sort = columnKey;
    sortState.value.order = "asc";
  }

  emit("request", { ...sortState.value, ...pagination });
};

const loadMore = () => {
  const paginationPayload = {
    limit:  pagination.limit + 20,
    hasMore: pagination.hasMore,
  };
  if (!pagination.hasMore) return;

  emit("request", { ...sortState.value, ...paginationPayload });
};
</script>

<template>
  <div
    class="relative self-center flex flex-col w-full
    bg-primary text-text-color overflow-auto no-scrollbar"
  >
    <div
      v-if="loader"
      :class="[`absolute inset-0 z-50 flex items-center justify-center bg-white/60
      backdrop-blur-[2px] transition-all duration-300`
      ]"
    >
      <VLoader size="lg" />
    </div>
    <div class="sticky top-0 z-50 bg-primary">
      <div
        v-if="searchable"
        :class="['grid border-line-color bg-primary py-6', gridFrames]"
        :style="gridFrames.style"
      >
        <slot
          name="toolBar"
          :tool-bar="toolbarConfig"
          :sort="sorted"
        />
      </div>
      <div
        :class="['grid border-line-color bg-primary shadow-md',
                 gridFrames
        ]"
        :style="gridFrames.style"
      >
        <div
          v-for="head in header"
          :key="head.key"
          :class="[
            'p-2 font-medium overflow-hidden bg-table-head',
            sortAble && shouldShowFilter(head) ? 'flex': head.textAlign
          ]"
        >
          <slot
            :name="`head-${head.key}`"
            :column="head"
          >
            {{ head.label }}
            <button
              v-if="sortAble && shouldShowFilter(head)"
              class="ml-auto"
              @click="sorted(head.key)"
            >
              <VTableSortIcon
                :active="sortState.sort === head.key"
                :order="sortState.order"
              />
            </button>
          </slot>
        </div>
      </div>
    </div>
    <div
      v-for="(row, index) in rows"
      :key="index"
      :class="['grid border-line-color bg-primary hover:bg-gray-100 transition', gridFrames]"
      :style="gridFrames.style"
    >
      <div
        v-for="col in header"
        :key="col.key"
        :class="[
          col.textAlign, 'pt-4 pb-2 pl-2 border-b text-sm',
          col.key === 'actions' ? 'overflow-visible' : 'truncate'
        ]"
      >
        <slot
          :name="`col-${col.key}`"
          :row="row"
          :index="index"
        >
          {{ firstLetterUp(row[col.key]) }}
        </slot>
      </div>
    </div>
    <VButton
      v-if="pagination.hasMore"
      text="Load more"
      class="mt-5 self-center"
      :loader="loader"
      :disabled="loader"
      @click="loadMore"
    />
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Для Chrome, Safari та Opera */
}

.no-scrollbar {
  -ms-overflow-style: none;  /* Для Internet Explorer та Edge */
  scrollbar-width: none;  /* Для Firefox */
}
</style>
