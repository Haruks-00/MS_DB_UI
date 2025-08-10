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
    class="mb-4 character-selector-search premium-search"
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
        class="search-icon"
      />
    </template>
  </v-text-field>

  <!-- リスト表示部の改善 -->
  <v-card
    :variant="listCardVariant"
    :height="listHeight"
    :disabled="disabled"
    class="character-selector-card premium-card"
    :elevation="cardElevation"
    :border="cardBorder"
    style="display: flex; flex-direction: column"
  >
    <!-- ヘッダー部分 -->
    <v-card-title
      class="d-flex align-center justify-end pa-4 pb-3 premium-card-header"
      v-if="modelValue"
    >
      <v-chip size="small" color="success" variant="tonal" class="premium-chip">
        選択中
      </v-chip>
    </v-card-title>

    <!-- リスト部分 -->
    <v-list
      :model-value="[modelValue]"
      @update:selected="handleSelection"
      class="character-selector-list premium-list"
      :density="listDensity"
      style="overflow-y: auto; max-height: calc(100% - 60px)"
    >
      <!-- データなしの場合 -->
      <v-list-item
        v-if="filteredItems.length === 0"
        class="no-data-item premium-no-data"
      >
        <v-list-item-title class="text-center text-grey-darken-1 py-12">
          <v-icon
            icon="mdi-information-outline"
            size="64"
            class="mb-4 no-data-icon"
            color="grey-lighten-1"
          />
          <div class="text-h6">{{ noDataText }}</div>
        </v-list-item-title>
      </v-list-item>

      <!-- キャラクターリスト -->
      <v-list-item
        v-for="(item, index) in filteredItems"
        :key="item.id"
        :value="item.id"
        :disabled="disabledItems.includes(item.id)"
        class="character-item premium-item"
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
                class="mr-4 premium-avatar"
                :color="getAvatarColor(item)"
                :class="{ 'selected-avatar': modelValue === item.id }"
              >
                <v-icon
                  :icon="getAvatarIcon(item)"
                  :color="modelValue === item.id ? 'white' : 'primary'"
                  size="20"
                  class="avatar-icon"
                />
              </v-avatar>

              <!-- テキスト情報 -->
              <div class="flex-grow-1 premium-text-content">
                <v-list-item-title
                  class="font-weight-bold text-h6"
                  :class="{ 'text-primary': modelValue === item.id }"
                >
                  {{ getTitle(item) }}
                </v-list-item-title>
                <v-list-item-subtitle
                  v-if="item.subtitle"
                  class="text-body-2 text-grey-darken-1 mt-1"
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
              size="small"
              color="warning"
              variant="tonal"
              class="mr-3 premium-status-chip"
            >
              選択済
            </v-chip>

            <!-- 選択状態インジケーター -->
            <v-icon
              v-if="modelValue === item.id"
              icon="mdi-check-circle"
              color="success"
              size="24"
              class="selection-indicator premium-check"
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
  listDensity: { type: String, default: "compact" },
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
/* プレミアム検索フィールド */
.premium-search {
  transition: all 0.3s ease;
  border-radius: 16px;
}

.premium-search:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.search-icon {
  transition: all 0.3s ease;
}

.search-icon:hover {
  transform: scale(1.1);
}

/* プレミアムカード */
.premium-card {
  transition: all 0.4s ease;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.premium-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
}

.premium-card-header {
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1) 0%,
    rgba(118, 75, 162, 0.1) 100%
  );
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
}

.premium-chip {
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

/* プレミアムリスト */
.premium-list {
  border-radius: 0 0 20px 20px;
  overflow-y: auto !important;
  scrollbar-width: thin;
  scrollbar-color: rgba(102, 126, 234, 0.5) transparent;
}

.premium-list::-webkit-scrollbar {
  width: 8px;
}

.premium-list::-webkit-scrollbar-track {
  background: transparent;
}

.premium-list::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
}

.premium-list::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}

/* プレミアムアイテム */
.premium-item {
  transition: all 0.3s ease;
  border-radius: 16px;
  margin: 4px 12px;
  min-height: 64px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
}

.premium-item:hover {
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1) 0%,
    rgba(118, 75, 162, 0.1) 100%
  );
  transform: translateX(8px) scale(1.02);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.premium-item--selected {
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.15) 0%,
    rgba(118, 75, 162, 0.15) 100%
  );
  border-left: 6px solid #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
}

.premium-item--disabled {
  opacity: 0.6;
  background: rgba(158, 158, 158, 0.1);
}

.premium-item--disabled:hover {
  transform: none;
  background: rgba(158, 158, 158, 0.1);
}

/* プレミアムアバター */
.premium-avatar {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.premium-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.selected-avatar {
  transform: scale(1.15);
  border: 2px solid #667eea;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.avatar-icon {
  transition: all 0.3s ease;
}

/* プレミアムテキストコンテンツ */
.premium-text-content {
  transition: all 0.3s ease;
}

/* プレミアムステータスチップ */
.premium-status-chip {
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

/* プレミアムチェック */
.premium-check {
  animation: fadeInScale 0.4s ease;
  filter: drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3));
}

/* プレミアムノーデータ */
.premium-no-data {
  min-height: 160px;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.05) 0%,
    rgba(118, 75, 162, 0.05) 100%
  );
}

.no-data-icon {
  opacity: 0.6;
  transition: all 0.3s ease;
}

.no-data-icon:hover {
  opacity: 0.8;
  transform: scale(1.1);
}

/* アニメーション */
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
  .premium-card {
    margin: 0 -8px;
    border-radius: 16px;
  }

  .premium-item {
    margin: 2px 8px;
    border-radius: 12px;
  }

  .premium-item:hover {
    transform: translateX(4px) scale(1.01);
  }

  .premium-avatar {
    size: 36px;
  }
}

/* レガシースタイル（後方互換性のため） */
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
  margin: 1px 6px;
  min-height: 48px;
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
</style>
