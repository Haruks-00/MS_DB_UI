<template>
  <!-- 検索フィールドの改善 -->
  <v-text-field
    v-model="search"
    :label="label"
    :variant="variant"
    :clearable="clearable"
    :prepend-inner-icon="prependInnerIcon"
    :disabled="disabled"
    hide-details
    class="mb-4 character-selector-search"
    :density="density"
    :color="primaryColor"
    :bg-color="searchBgColor"
    :focused="isSearchFocused"
    @focus="isSearchFocused = true"
    @blur="isSearchFocused = false"
  >
    <template v-slot:prepend-inner>
      <v-icon
        :color="isSearchFocused ? primaryColor : 'grey'"
        :icon="prependInnerIcon"
        size="20"
      />
    </template>
  </v-text-field>

  <!-- リスト表示部の改善 -->
  <v-card
    :variant="listCardVariant"
    :height="listHeight"
    :disabled="disabled"
    class="character-selector-card"
    :elevation="cardElevation"
    :border="cardBorder"
    style="display: flex; flex-direction: column"
  >
    <!-- ヘッダー部分 -->
    <v-card-title class="d-flex align-center justify-space-between pa-4 pb-2">
      <span class="text-subtitle-2 font-weight-medium">
        {{ items.length }}件中 {{ filteredItems.length }}件表示
      </span>
      <v-chip
        v-if="modelValue"
        size="small"
        color="success"
        variant="tonal"
        class="ml-2"
      >
        選択中
      </v-chip>
    </v-card-title>

    <!-- リスト部分 -->
    <v-list
      :model-value="[modelValue]"
      @update:selected="handleSelection"
      class="character-selector-list"
      :density="listDensity"
      style="overflow-y: auto; max-height: calc(100% - 80px)"
    >
      <!-- データなしの場合 -->
      <v-list-item v-if="filteredItems.length === 0" class="no-data-item">
        <v-list-item-title class="text-center text-grey-darken-1 py-8">
          <v-icon icon="mdi-information-outline" size="48" class="mb-2" />
          <div>{{ noDataText }}</div>
        </v-list-item-title>
      </v-list-item>

      <!-- キャラクターリスト -->
      <v-list-item
        v-for="(item, index) in filteredItems"
        :key="item.id"
        :value="item.id"
        :disabled="disabledItems.includes(item.id)"
        class="character-item"
        :class="{
          'character-item--selected': modelValue === item.id,
          'character-item--disabled': disabledItems.includes(item.id),
        }"
        @click="handleItemClick(item)"
      >
        <!-- デフォルト表示形式 -->
        <template v-slot:default>
          <slot name="item" :item="item">
            <div class="d-flex align-center w-100">
              <!-- アバター/アイコン -->
              <v-avatar
                size="40"
                class="mr-3"
                :color="getAvatarColor(item)"
                :class="{ 'selected-avatar': modelValue === item.id }"
              >
                <v-icon
                  :icon="getAvatarIcon(item)"
                  :color="modelValue === item.id ? 'white' : 'primary'"
                  size="20"
                />
              </v-avatar>

              <!-- テキスト情報 -->
              <div class="flex-grow-1">
                <v-list-item-title
                  class="font-weight-medium"
                  :class="{ 'text-primary': modelValue === item.id }"
                >
                  {{ getTitle(item) }}
                </v-list-item-title>
                <v-list-item-subtitle
                  v-if="item.subtitle"
                  class="text-caption text-grey-darken-1"
                >
                  {{ item.subtitle }}
                </v-list-item-subtitle>
              </div>
            </div>
          </slot>
        </template>

        <!-- 右側のアクション -->
        <template v-slot:append>
          <div class="d-flex align-center">
            <!-- 選択済み表示 -->
            <v-chip
              v-if="disabledItems.includes(item.id)"
              size="x-small"
              color="warning"
              variant="tonal"
              class="mr-2"
            >
              選択済
            </v-chip>

            <!-- 選択状態インジケーター -->
            <v-icon
              v-if="modelValue === item.id"
              icon="mdi-check-circle"
              color="success"
              size="20"
              class="selection-indicator"
            />
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";
/**
 * @file 汎用的なキャラクター選択コンポーネント (検索/リスト分離型)
 * @description UI改善版 - アニメーション、視覚的フィードバック、レスポンシブ対応
 */

const props = defineProps({
  modelValue: { type: [String, null], required: true },
  items: { type: Array, required: true },
  itemTitle: { type: [String, Function], default: "monsterName" },
  disabledItems: { type: Array, default: () => [] },
  label: { type: String, default: "キャラクター名で検索" },
  variant: { type: String, default: "outlined" },
  clearable: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  prependInnerIcon: { type: String, default: "mdi-magnify" },
  listHeight: { type: [String, Number], default: "400px" },
  listCardVariant: { type: String, default: "elevated" },
  noDataText: { type: String, default: "該当するキャラクターがいません" },
  density: { type: String, default: "comfortable" },
  listDensity: { type: String, default: "comfortable" },
  primaryColor: { type: String, default: "primary" },
  searchBgColor: { type: String, default: "grey-lighten-5" },
  cardElevation: { type: [Number, String], default: 2 },
  cardBorder: { type: [Boolean, String], default: true },
});

const emit = defineEmits(["update:modelValue"]);

const search = ref("");
const isSearchFocused = ref(false);

/**
 * [概要] 検索文字列に基づいて表示アイテムをフィルタリングする。
 */
const filteredItems = computed(() => {
  if (!search.value) return props.items;
  const lowerSearch = search.value.toLowerCase();
  return props.items.filter((item) => {
    const title = getTitle(item).toLowerCase();
    return title.includes(lowerSearch);
  });
});

/**
 * [概要] itemTitleプロパティに応じて、アイテムの表示タイトルを取得する。
 */
const getTitle = (item) => {
  if (typeof props.itemTitle === "function") {
    return props.itemTitle(item);
  }
  return item[props.itemTitle] || "";
};

/**
 * [概要] アバターの色を取得する
 */
const getAvatarColor = (item) => {
  if (props.modelValue === item.id) {
    return props.primaryColor;
  }
  return props.disabledItems.includes(item.id)
    ? "grey-lighten-3"
    : "primary-lighten-5";
};

/**
 * [概要] アバターのアイコンを取得する
 */
const getAvatarIcon = (item) => {
  // キャラクタータイプに応じてアイコンを変更
  if (item.type === "player") return "mdi-account";
  if (item.type === "monster") return "mdi-dragon";
  if (item.type === "npc") return "mdi-account-tie";
  return "mdi-account-circle"; // デフォルト
};

/**
 * [概要] アイテムクリック時の処理
 */
const handleItemClick = (item) => {
  if (!props.disabledItems.includes(item.id)) {
    emit("update:modelValue", item.id);
  }
};

/**
 * [概要] v-listでの選択をハンドリングし、v-modelを更新する。
 */
const handleSelection = (selectedArray) => {
  const selectedId = selectedArray.length > 0 ? selectedArray[0] : null;
  if (props.modelValue !== selectedId) {
    emit("update:modelValue", selectedId);
  }
};
</script>

<style scoped>
.character-selector-search {
  transition: all 0.3s ease;
}

.character-selector-search:hover {
  transform: translateY(-1px);
}

.character-selector-card {
  transition: all 0.3s ease;
  border-radius: 12px;
}

.character-selector-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.character-selector-list {
  border-radius: 0 0 12px 12px;
  overflow-y: auto !important;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
}

.character-selector-list::-webkit-scrollbar {
  width: 8px;
}

.character-selector-list::-webkit-scrollbar-track {
  background: transparent;
}

.character-selector-list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.character-selector-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.character-item {
  transition: all 0.2s ease;
  border-radius: 8px;
  margin: 2px 8px;
  min-height: 64px;
  display: flex;
  align-items: center;
}

.character-item:hover {
  background-color: rgb(var(--v-theme-primary-lighten-5)) !important;
  transform: translateX(4px);
}

.character-item--selected {
  background-color: rgb(var(--v-theme-primary-lighten-4)) !important;
  border-left: 4px solid rgb(var(--v-theme-primary));
}

.character-item--disabled {
  opacity: 0.6;
  background-color: rgb(var(--v-theme-grey-lighten-4)) !important;
}

.character-item--disabled:hover {
  transform: none;
  background-color: rgb(var(--v-theme-grey-lighten-4)) !important;
}

.selected-avatar {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

.selection-indicator {
  animation: fadeInScale 0.3s ease;
}

.no-data-item {
  min-height: 120px;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* レスポンシブ対応 */
@media (max-width: 600px) {
  .character-selector-card {
    margin: 0 -8px;
  }

  .character-item {
    margin: 1px 4px;
  }

  .character-item:hover {
    transform: translateX(2px);
  }
}
</style>
