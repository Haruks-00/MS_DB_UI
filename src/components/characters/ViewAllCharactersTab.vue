<template>
  <div class="pa-6">
    <!-- INFO: ミニマルな見出しデザイン -->
    <div class="d-flex align-center mb-6">
      <v-icon
        icon="mdi-account-multiple"
        size="28"
        color="primary"
        class="mr-3"
      ></v-icon>
      <h2 class="text-h5 font-weight-medium text-primary">所持状況一覧</h2>
    </div>

    <!-- INFO: ミニマルなフィルターセクション -->
    <v-card class="mb-6 minimal-filter-card">
      <v-card-title class="minimal-card-title pa-4">
        <v-icon icon="mdi-filter-variant" class="mr-2" size="20"></v-icon>
        フィルターとオプション
      </v-card-title>

      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title class="pa-4 minimal-panel-title">
            <v-icon
              start
              icon="mdi-filter-variant"
              color="primary"
              size="20"
            ></v-icon>
            <span class="text-body-1 font-weight-medium"
              >詳細フィルターを開く</span
            >
          </v-expansion-panel-title>
          <v-expansion-panel-text class="pa-6">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model.lazy="filters.charSearch"
                    label="キャラクター名 or 図鑑番号"
                    variant="outlined"
                    density="compact"
                    clearable
                    color="primary"
                    prepend-inner-icon="mdi-account-search"
                    class="minimal-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="filters.element"
                    :items="['火', '水', '木', '光', '闇']"
                    label="属性"
                    variant="outlined"
                    density="compact"
                    clearable
                    color="primary"
                    prepend-inner-icon="mdi-fire"
                    class="minimal-select"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="filters.itemSearch"
                    :items="itemMasters"
                    item-title="name"
                    item-value="id"
                    label="アイテム名"
                    variant="outlined"
                    density="compact"
                    clearable
                    color="primary"
                    prepend-inner-icon="mdi-sword-cross"
                    class="minimal-select"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="filters.type"
                    :items="['恒常_or_限定', ...characterTypes]"
                    label="分類 (Type)"
                    variant="outlined"
                    density="compact"
                    clearable
                    color="primary"
                    prepend-inner-icon="mdi-tag"
                    class="minimal-select"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="filters.gachaSearch"
                    :items="gachaMasters"
                    item-title="name"
                    item-value="name"
                    label="排出ガチャ"
                    variant="outlined"
                    density="compact"
                    clearable
                    color="primary"
                    prepend-inner-icon="mdi-gift"
                    class="minimal-select"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="filters.totalOwnership"
                    :items="[
                      { value: 'all_unowned', title: '全アカウントで未所持' },
                      { value: 'four_or_more', title: '合計4体以上' },
                      {
                        value: 'one_in_each',
                        title: '各アカウントで1体以上所持',
                      },
                    ]"
                    label="全体の所持状況"
                    variant="outlined"
                    density="compact"
                    clearable
                    color="primary"
                    prepend-inner-icon="mdi-account-group"
                    class="minimal-select"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-divider class="my-4 minimal-divider"></v-divider>
                  <div class="d-flex align-center mb-3">
                    <v-icon
                      icon="mdi-account"
                      color="secondary"
                      class="mr-2"
                      size="20"
                    ></v-icon>
                    <v-subheader class="text-body-1 font-weight-medium"
                      >単一アカウントでの絞り込み</v-subheader
                    >
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="filters.account"
                    :items="accounts"
                    item-title="name"
                    item-value="id"
                    label="アカウント"
                    variant="outlined"
                    density="compact"
                    clearable
                    color="secondary"
                    prepend-inner-icon="mdi-account"
                    class="minimal-select"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="filters.ownership"
                    :items="[
                      { value: 'owned', title: '所持' },
                      { value: 'unowned', title: '未所持' },
                      { value: 'one', title: '1体所持' },
                      { value: 'two', title: '2体所持' },
                    ]"
                    label="所持状況 (指定アカウント内)"
                    variant="outlined"
                    density="compact"
                    clearable
                    color="secondary"
                    prepend-inner-icon="mdi-check-circle"
                    class="minimal-select"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions class="pa-4 minimal-actions">
              <v-btn
                @click="showExtraColumns = !showExtraColumns"
                variant="outlined"
                color="info"
                prepend-icon="mdi-eye"
                class="minimal-button"
              >
                {{ showExtraColumns ? "詳細を非表示" : "詳細を表示" }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                @click="resetFilters"
                color="secondary"
                variant="outlined"
                prepend-icon="mdi-refresh"
                class="minimal-button"
              >
                リセット
              </v-btn>
            </v-card-actions>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <!-- INFO: ミニマルな統計情報表示 -->
    <v-card class="mb-4 minimal-stats-card">
      <v-card-text class="pa-4">
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex align-center">
            <v-icon
              icon="mdi-chart-bar"
              color="primary"
              class="mr-2"
              size="20"
            ></v-icon>
            <span class="text-body-1 font-weight-medium"
              >表示件数: {{ filteredMasters.length }} /
              {{ characterMasters.length }}</span
            >
          </div>
          <v-chip
            :color="
              filteredMasters.length === characterMasters.length
                ? 'success'
                : 'warning'
            "
            variant="outlined"
            class="minimal-chip"
          >
            {{
              filteredMasters.length === characterMasters.length
                ? "全件表示"
                : "フィルター適用中"
            }}
          </v-chip>
        </div>
      </v-card-text>
    </v-card>

    <!-- INFO: より美しいテーブル -->
    <v-card elevation="3" rounded="lg">
      <v-card-title class="bg-primary text-white pa-4">
        <v-icon icon="mdi-table" class="mr-2"></v-icon>
        キャラクター所持状況
      </v-card-title>

      <v-card-text class="pa-0">
        <v-data-table-virtual
          :items="filteredMasters"
          :headers="headers"
          :loading="!dataLoaded"
          height="70vh"
          density="compact"
          fixed-header
          class="table-fixed"
          :fixed-columns="true"
        >
          <!-- キャラ名列のカスタムスロット -->
          <template v-slot:item.monsterName="{ item }">
            <div class="d-flex align-center">
              <v-avatar
                size="32"
                :color="getElementColor(item.element)"
                class="mr-3"
              >
                <span class="text-caption text-white font-weight-bold">{{
                  item.element || "?"
                }}</span>
              </v-avatar>
              <span class="font-weight-medium">{{
                item.monsterName || "—"
              }}</span>
            </div>
          </template>

          <!-- 属性列のカスタムスロット -->
          <template v-slot:item.element="{ item }">
            <v-chip
              :color="getElementColor(item.element)"
              variant="tonal"
              size="small"
            >
              {{ item.element || "—" }}
            </v-chip>
          </template>

          <!-- 分類列のカスタムスロット -->
          <template v-slot:item.type="{ item }">
            <v-chip
              :color="getTypeColor(item.type)"
              variant="tonal"
              size="small"
            >
              {{ item.type || "—" }}
            </v-chip>
          </template>

          <!-- 排出ガチャ列のカスタムスロット -->
          <template v-slot:item.ejectionGacha="{ item }">
            <span class="text-caption">{{
              item.ejectionGacha || "—"
            }}</span>
          </template>

          <!-- アカウント別所持状況の動的スロット -->
          <template 
            v-for="acc in accounts" 
            :key="acc.id" 
            v-slot:[`item.account_${acc.id}_1`]="{ item }"
          >
            <div
              :class="[getOwnedStatusClass(item.id, acc.id, 1), 'account-cell']"
              class="text-center"
            >
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <div
                    v-bind="props"
                    class="cell-content"
                    v-html="getDisplayCellContent(item.id, acc.id, 0)"
                  ></div>
                </template>
                <span v-html="getTooltipContent(item.id, acc.id, 0)"></span>
              </v-tooltip>
            </div>
          </template>

          <template 
            v-for="acc in accounts" 
            :key="acc.id" 
            v-slot:[`item.account_${acc.id}_2`]="{ item }"
          >
            <div
              :class="[getOwnedStatusClass(item.id, acc.id, 2), 'account-cell']"
              class="text-center"
            >
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <div
                    v-bind="props"
                    class="cell-content"
                    v-html="getDisplayCellContent(item.id, acc.id, 1)"
                  ></div>
                </template>
                <span v-html="getTooltipContent(item.id, acc.id, 1)"></span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table-virtual>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

const props = defineProps({
  dataLoaded: { type: Boolean, required: true },
  accounts: { type: Array, required: true },
  characterMasters: { type: Array, required: true },
  itemMasters: { type: Array, required: true },
  gachaMasters: { type: Array, required: true },
  ownedCountMap: { type: Map, required: true },
  ownedCharactersData: { type: Map, required: true },
  itemMastersMap: { type: Map, required: true },
});

const showExtraColumns = ref(false);

const createInitialFiltersState = () => ({
  charSearch: "",
  element: "",
  itemSearch: "",
  type: "",
  gachaSearch: "",
  totalOwnership: "",
  account: "",
  ownership: "",
});

const filters = reactive(createInitialFiltersState());

const characterTypes = computed(() => {
  return Array.from(
    new Set(props.characterMasters.map((m) => m.type).filter(Boolean))
  ).sort();
});

const headers = computed(() => {
  const basicHeaders = [
    { title: 'No.', key: 'indexNumber', align: 'center', sortable: true, width: 80 },
    { title: 'キャラ名', key: 'monsterName', align: 'start', sortable: true, width: 200 }
  ];

  if (showExtraColumns.value) {
    basicHeaders.push(
      { title: '属性', key: 'element', align: 'center', sortable: true, width: 100 },
      { title: '分類', key: 'type', align: 'center', sortable: true, width: 100 },
      { title: '排出ガチャ', key: 'ejectionGacha', align: 'center', sortable: true, width: 100 }
    );
  }

  // アカウント別の列を動的に追加
  props.accounts.forEach(acc => {
    // アカウント名から数字部分を抽出（例：「アカウント1」→「1」）
    const accountNumber = acc.indexNumber || acc.name.match(/\d+/)?.[0] || acc.id;
    basicHeaders.push(
      { title: `${accountNumber}-1`, key: `account_${acc.id}_1`, align: 'center', sortable: false, width: 78 },
      { title: `${accountNumber}-2`, key: `account_${acc.id}_2`, align: 'center', sortable: false, width: 78 }
    );
  });

  return basicHeaders;
});

const filteredMasters = computed(() => {
  if (!props.dataLoaded) return [];

  const {
    charSearch,
    element,
    itemSearch,
    type,
    gachaSearch,
    totalOwnership,
    account,
    ownership,
  } = filters;
  const lowerCharSearch = charSearch.toLowerCase();
  const searchItemId = itemSearch ? Number(itemSearch) : null;

  return props.characterMasters.filter((master) => {
    if (
      lowerCharSearch &&
      !master.monsterName.toLowerCase().includes(lowerCharSearch) &&
      !(master.indexNumber + "").includes(lowerCharSearch)
    )
      return false;
    if (element && master.element !== element) return false;
    if (type) {
      if (type === "恒常_or_限定") {
        if (master.type !== "恒常" && master.type !== "限定") return false;
      } else {
        if (master.type !== type) return false;
      }
    }
    if (gachaSearch && (master.ejectionGacha || "") !== gachaSearch)
      return false;

    if (searchItemId) {
      let hasItem = false;
      const targetAccount = account || null;
      if (targetAccount) {
        hasItem = (props.ownedCharactersData.get(targetAccount) || []).some(
          (char) =>
            char.characterMasterId === master.id &&
            char.items?.some((itemId) => Number(itemId) === searchItemId)
        );
      } else {
        for (const ownedChars of props.ownedCharactersData.values()) {
          if (
            ownedChars.some(
              (char) =>
                char.characterMasterId === master.id &&
                char.items?.some((itemId) => Number(itemId) === searchItemId)
            )
          ) {
            hasItem = true;
            break;
          }
        }
      }
      if (!hasItem) return false;
    }

    const totalOwnedCount = props.accounts.reduce(
      (sum, acc) => sum + getOwnedCount(master.id, acc.id),
      0
    );
    if (totalOwnership === "all_unowned" && totalOwnedCount > 0) return false;
    if (totalOwnership === "four_or_more" && totalOwnedCount < 4) return false;
    if (
      totalOwnership === "one_in_each" &&
      !props.accounts.every((acc) => getOwnedCount(master.id, acc.id) >= 1)
    )
      return false;

    if (account && ownership) {
      const countInAccount = getOwnedCount(master.id, account);
      if (ownership === "owned" && countInAccount === 0) return false;
      if (ownership === "unowned" && countInAccount > 0) return false;
      if (ownership === "one" && countInAccount !== 1) return false;
      if (ownership === "two" && countInAccount !== 2) return false;
    }

    return true;
  });
});

const getOwnedCount = (masterId, accountId) => {
  return props.ownedCountMap.get(`${masterId}-${accountId}`) || 0;
};

const getDisplayCellContent = (masterId, accountId, index) => {
  const ownedList = (props.ownedCharactersData.get(accountId) || []).filter(
    (c) => c.characterMasterId === masterId
  );
  if (!ownedList || ownedList.length <= index) return "—";

  // アイテム名をすべて表示するように修正
  const itemNames = (ownedList[index].items || [])
    .map((id) => props.itemMastersMap.get(Number(id)))
    .filter(Boolean)
    .join("<br>"); // 改行区切りで表示

  return itemNames ? `✔️<br>${itemNames}` : "✔️";
};

/**
 * [概要] ツールチップに表示する内容を取得する。
 */
const getTooltipContent = (masterId, accountId, index) => {
  const ownedList = (props.ownedCharactersData.get(accountId) || []).filter(
    (c) => c.characterMasterId === masterId
  );
  if (!ownedList || ownedList.length <= index) return "未所持";

  const itemNames = (ownedList[index].items || [])
    .map((id) => props.itemMastersMap.get(Number(id)))
    .filter(Boolean)
    .join("<br>");

  return itemNames || "アイテムなし";
};

const getOwnedStatusClass = (masterId, accountId, requiredCount) => {
  return getOwnedCount(masterId, accountId) >= requiredCount
    ? "status-owned"
    : "status-unowned";
};

/**
 * [概要] 属性に応じた色を返す
 * @param {string} element - 属性
 * @returns {string} 色のクラス名
 */
const getElementColor = (element) => {
  const colorMap = {
    火: "red",
    水: "blue",
    木: "green",
    光: "amber",
    闇: "deep-purple",
  };
  return colorMap[element] || "grey";
};

/**
 * [概要] タイプに応じた色を返す
 * @param {string} type - タイプ
 * @returns {string} 色のクラス名
 */
const getTypeColor = (type) => {
  const colorMap = {
    恒常: "success",
    限定: "warning",
    コラボ: "info",
    イベント: "secondary",
  };
  return colorMap[type] || "grey";
};

const resetFilters = () => {
  Object.assign(filters, createInitialFiltersState());
};
</script>

<style scoped>
/* ミニマルフィルターカード */
.minimal-filter-card {
  border: 1px solid var(--grey-200);
  border-radius: 8px;
  background: #ffffff;
}

.minimal-card-title {
  background: var(--grey-100);
  color: var(--grey-800);
  font-weight: 500;
  border-bottom: 1px solid var(--grey-200);
}

.minimal-panel-title {
  background: var(--grey-50);
  border-bottom: 1px solid var(--grey-200);
}

.minimal-actions {
  background: var(--grey-50);
  border-top: 1px solid var(--grey-200);
}

.minimal-button {
  border: 1px solid var(--grey-300);
  color: var(--grey-700);
  font-weight: 500;
  text-transform: none;
  transition: all 0.2s ease;
}

.minimal-button:hover {
  background: var(--grey-100);
  border-color: var(--grey-400);
}

/* ミニマル統計カード */
.minimal-stats-card {
  border: 1px solid var(--grey-200);
  border-radius: 8px;
  background: #ffffff;
}

.minimal-chip {
  border: 1px solid currentColor;
  font-weight: 500;
}

/* ミニマル入力フィールド */
.minimal-input :deep(.v-field) {
  border-radius: 6px;
  border: 1px solid var(--grey-300);
  transition: border-color 0.2s ease;
}

.minimal-input :deep(.v-field:hover) {
  border-color: var(--grey-400);
}

.minimal-input :deep(.v-field--focused) {
  border-color: var(--primary-color);
}

/* ミニマルセレクトフィールド */
.minimal-select :deep(.v-field) {
  border-radius: 6px;
  border: 1px solid var(--grey-300);
  transition: border-color 0.2s ease;
}

.minimal-select :deep(.v-field:hover) {
  border-color: var(--grey-400);
}

.minimal-select :deep(.v-field--focused) {
  border-color: var(--primary-color);
}

/* ミニマル区切り線 */
.minimal-divider {
  border-color: var(--grey-200);
}

/* テーブルのミニマルスタイル */
.v-table {
  border: 1px solid var(--grey-200);
  border-radius: 8px;
  overflow: hidden;
}

.v-table th {
  background: var(--grey-100);
  color: var(--grey-800);
  font-weight: 500;
  border-bottom: 1px solid var(--grey-200);
}

.v-table td {
  border-bottom: 1px solid var(--grey-200);
  padding: 12px 16px;
}

.v-table tr:hover {
  background: var(--grey-50);
}

/* 属性別の背景色（ミニマル版） */
.v-table .element-火 {
  background-color: #ffebee;
}

.v-table .element-水 {
  background-color: #e3f2fd;
}

.v-table .element-木 {
  background-color: #e8f5e9;
}

.v-table .element-光 {
  background-color: #fffde7;
}

.v-table .element-闇 {
  background-color: #f3e5f5;
}

/* テーブルレイアウトの最適化 */
.table-fixed {
  table-layout: fixed !important;
  width: 100% !important;
}

/* すべてのテーブル関連要素に固定レイアウト適用 */
.table-fixed table,
.table-fixed .v-data-table-virtual table,
.table-fixed .v-data-table__wrapper table,
.table-fixed .v-table table {
  table-layout: fixed !important;
  width: 100% !important;
}

/* Vuetifyの内部テーブル要素も強制固定 */
.v-data-table-virtual table {
  table-layout: fixed !important;
  width: 100% !important;
}

/* キャラ名列の幅を完全固定 */
.table-fixed th:nth-child(2),
.table-fixed td:nth-child(2) {
  width: 200px !important;
  max-width: 200px !important;
  min-width: 200px !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
}

/* キャラクター名の表示を最適化 */
.table-fixed td:nth-child(2) .d-flex {
  width: 200px !important;
  max-width: 200px !important;
  min-width: 200px !important;
  box-sizing: border-box;
  overflow: hidden;
}

.table-fixed td:nth-child(2) .font-weight-medium {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 140px !important;
  width: 140px;
  flex-shrink: 1;
  flex-grow: 0;
}

/* アバターサイズも固定 */
.table-fixed td:nth-child(2) .v-avatar {
  width: 32px !important;
  min-width: 32px !important;
  max-width: 32px !important;
  flex-shrink: 0;
  margin-right: 12px;
}

/* 図鑑番号列の幅を制限 */
.table-fixed th:nth-child(1),
.table-fixed td:nth-child(1) {
  width: 80px;
  max-width: 80px;
  min-width: 80px;
}

/* 属性・分類・排出ガチャ列の幅を制限 */
.table-fixed th:nth-child(3),
.table-fixed td:nth-child(3),
.table-fixed th:nth-child(4),
.table-fixed td:nth-child(4),
.table-fixed th:nth-child(5),
.table-fixed td:nth-child(5) {
  width: 100px;
  max-width: 100px;
  min-width: 100px;
}

/* アイテムセルの幅を調整して折り返しを防ぐ */
.table-fixed th:nth-child(n + 6),
.table-fixed td:nth-child(n + 6) {
  width: 78px !important;
  max-width: 78px !important;
  min-width: 78px !important;
  table-layout: fixed;
}

.table-fixed tr {
  height: auto !important;
  min-height: 110px;
}

.table-fixed td {
  vertical-align: top;
  padding-top: 16px;
}

.table-fixed .cell-content {
  max-height: none;
  overflow: visible;
  text-overflow: clip;
  display: block;
  -webkit-line-clamp: unset;
  -webkit-box-orient: unset;
  word-break: normal;
  white-space: normal;
}

/* セルコンテンツの統一スタイル */
.table-fixed .cell-content {
  font-size: 0.75rem;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 70px !important;
  min-width: 70px;
  max-width: 70px;
  display: block;
  padding: 2px;
  box-sizing: border-box;
}

/* セルの高さを統一（1列目以外） */
.table-fixed tr {
  height: 110px !important;
  min-height: 110px;
}

.table-fixed td {
  vertical-align: top;
  padding: 16px 8px;
  height: 110px;
}

/* 1列目（図鑑No.）は他の列より低く */
.table-fixed td:nth-child(1) {
  height: 60px !important;
  min-height: 60px;
  vertical-align: middle;
}

/* セルコンテンツの位置調整 */
.table-fixed .cell-content {
  display: flex;
  align-items: flex-start;
  min-height: 78px;
  justify-content: center;
  width: 100%;
}

/* アイテムなしの場合の表示調整 */
.table-fixed td:has(.cell-content:contains("—")) {
  text-align: center;
}

/* 所持状況セルの統一スタイル */
.table-fixed .status-owned,
.table-fixed .status-unowned {
  height: 110px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/* アカウント別セルの統一スタイル */
.account-cell {
  height: 110px !important;
  width: 60px !important;
  min-width: 60px !important;
  max-width: 60px !important;
  padding: 16px 8px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
}

/* 「—」表示の場合も同じ幅を確保 */
.account-cell .cell-content {
  width: 60px !important;
  min-width: 60px !important;
  max-width: 60px !important;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 78px;
}

/* 「—」文字のみの場合の特別スタイル */
.account-cell .cell-content:contains("—"),
.account-cell .cell-content[innerHTML="—"] {
  width: 60px !important;
  min-width: 60px !important;
  max-width: 60px !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #999;
}

/* v-data-table-virtualのデフォルトヘッダーを薄くする */
.table-fixed .v-data-table__th {
  height: 28px !important;
  min-height: 28px !important;
  max-height: 28px !important;
  padding: 4px 8px !important;
  font-size: 0.75rem !important;
  line-height: 1.3 !important;
  font-weight: 500 !important;
}

/* ヘッダーを固定 */
.table-fixed thead {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
}

/* ヘッダーの統一スタイル（薄くする） */
.table-fixed thead th {
  background: var(--grey-100) !important;
  border-bottom: 1px solid var(--grey-300) !important;
  height: 6px !important;
  min-height: 6px !important;
  max-height: 6px !important;
  padding: 2px 4px !important;
  font-size: 0.7rem !important;
  line-height: 1.2 !important;
  font-weight: 500 !important;
  vertical-align: middle;
}

/* v-data-table-virtualのヘッダーセルも薄くする */
.table-fixed .v-data-table__th {
  height: 6px !important;
  min-height: 6px !important;
  max-height: 6px !important;
  padding: 2px 4px !important;
  font-size: 0.7rem !important;
  line-height: 1.2 !important;
  font-weight: 500 !important;
}

/* 列幅の完全固定 */
.table-fixed th,
.table-fixed td {
  box-sizing: border-box;
  overflow: hidden;
}

/* 各列の幅を明示的に設定 */
.table-fixed th:nth-child(1), .table-fixed td:nth-child(1) { width: 80px !important; }
.table-fixed th:nth-child(2), .table-fixed td:nth-child(2) { width: 200px !important; }
.table-fixed th:nth-child(3), .table-fixed td:nth-child(3) { width: 100px !important; }
.table-fixed th:nth-child(4), .table-fixed td:nth-child(4) { width: 100px !important; }
.table-fixed th:nth-child(5), .table-fixed td:nth-child(5) { width: 100px !important; }

/* アカウント列（6列目以降）は78pxで統一 */
.table-fixed th:nth-child(n+6), .table-fixed td:nth-child(n+6) { 
  width: 78px !important;
  min-width: 78px !important;
  max-width: 78px !important;
}

/* Vuetifyの動的幅変更を無効化 */
.table-fixed .v-data-table__th,
.table-fixed .v-data-table__td {
  width: unset !important;
  min-width: unset !important;
  max-width: unset !important;
}

/* より具体的な幅設定で上書き */
.table-fixed .v-data-table__th:nth-child(1), 
.table-fixed .v-data-table__td:nth-child(1) { 
  width: 80px !important; 
  min-width: 80px !important;
  max-width: 80px !important;
}

.table-fixed .v-data-table__th:nth-child(2), 
.table-fixed .v-data-table__td:nth-child(2) { 
  width: 200px !important; 
  min-width: 200px !important;
  max-width: 200px !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
}

/* キャラクター名列のコンテンツエリアも固定 */
.table-fixed .v-data-table__td:nth-child(2) > * {
  width: 200px !important;
  max-width: 200px !important;
  overflow: hidden;
  box-sizing: border-box;
}

.table-fixed .v-data-table__th:nth-child(n+6), 
.table-fixed .v-data-table__td:nth-child(n+6) { 
  width: 78px !important; 
  min-width: 78px !important;
  max-width: 78px !important;
}
</style>
