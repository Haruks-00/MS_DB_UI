<template>
  <div class="pa-6">
    <!-- INFO: より洗練された見出しデザイン -->
    <div class="d-flex align-center mb-6">
      <v-icon
        icon="mdi-account-multiple"
        size="32"
        color="primary"
        class="mr-3"
      ></v-icon>
      <h2 class="text-h4 font-weight-bold text-primary">所持状況一覧</h2>
    </div>

    <!-- INFO: より美しいフィルターセクション -->
    <v-card elevation="3" rounded="lg" class="mb-6">
      <v-card-title class="bg-primary text-white pa-4">
        <v-icon icon="mdi-filter-variant" class="mr-2"></v-icon>
        フィルターとオプション
      </v-card-title>

      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title class="pa-4">
            <v-icon start icon="mdi-filter-variant" color="primary"></v-icon>
            <span class="text-h6 font-weight-medium">詳細フィルターを開く</span>
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
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-divider class="my-4"></v-divider>
                  <div class="d-flex align-center mb-3">
                    <v-icon
                      icon="mdi-account"
                      color="secondary"
                      class="mr-2"
                    ></v-icon>
                    <v-subheader class="text-h6 font-weight-medium"
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
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions class="pa-4 bg-grey-lighten-5">
              <v-btn
                @click="showExtraColumns = !showExtraColumns"
                variant="tonal"
                color="info"
                prepend-icon="mdi-eye"
              >
                {{ showExtraColumns ? "詳細を非表示" : "詳細を表示" }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                @click="resetFilters"
                color="secondary"
                variant="outlined"
                prepend-icon="mdi-refresh"
              >
                リセット
              </v-btn>
            </v-card-actions>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <!-- INFO: より美しい統計情報表示 -->
    <v-card elevation="2" rounded="lg" class="mb-4">
      <v-card-text class="pa-4">
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex align-center">
            <v-icon icon="mdi-chart-bar" color="primary" class="mr-2"></v-icon>
            <span class="text-h6 font-weight-medium"
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
            variant="tonal"
            size="small"
          >
            {{
              Math.round(
                (filteredMasters.length / characterMasters.length) * 100
              )
            }}% 表示中
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
        <v-table
          fixed-header
          height="70vh"
          density="compact"
          class="table-fixed"
        >
          <thead>
            <tr>
              <th rowspan="2" class="text-center pa-4">図鑑No.</th>
              <th rowspan="2" class="text-center pa-4">キャラ名</th>
              <th
                rowspan="2"
                v-show="showExtraColumns"
                class="text-center pa-4"
              >
                属性
              </th>
              <th
                rowspan="2"
                v-show="showExtraColumns"
                class="text-center pa-4"
              >
                分類
              </th>
              <th
                rowspan="2"
                v-show="showExtraColumns"
                class="text-center pa-4"
              >
                排出ガチャ
              </th>
              <th
                v-for="acc in accounts"
                :key="acc.id"
                colspan="2"
                class="text-center pa-4 bg-grey-lighten-4"
              >
                <div class="d-flex align-center justify-center">
                  <v-avatar size="24" color="primary" class="mr-2">
                    <span class="text-caption text-white font-weight-bold">{{
                      acc.name.charAt(0)
                    }}</span>
                  </v-avatar>
                  {{ acc.name }}
                </div>
              </th>
            </tr>
            <tr>
              <template v-for="acc in accounts" :key="acc.id">
                <th class="text-center pa-2 bg-grey-lighten-4">1</th>
                <th class="text-center pa-2 bg-grey-lighten-4">2</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!dataLoaded">
              <td :colspan="5 + accounts.length * 2" class="text-center pa-8">
                <div class="d-flex flex-column align-center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    size="48"
                  ></v-progress-circular>
                  <div class="mt-3 text-body-1 text-medium-emphasis">
                    データを読み込んでいます...
                  </div>
                </div>
              </td>
            </tr>
            <tr v-else-if="filteredMasters.length === 0">
              <td :colspan="5 + accounts.length * 2" class="text-center pa-8">
                <div class="d-flex flex-column align-center">
                  <v-icon
                    icon="mdi-inbox-outline"
                    size="64"
                    color="grey-lighten-1"
                  ></v-icon>
                  <div class="mt-3 text-body-1 text-medium-emphasis">
                    該当するキャラクターがいません
                  </div>
                </div>
              </td>
            </tr>
            <tr
              v-for="master in filteredMasters"
              :key="master.id"
              class="character-row"
            >
              <td class="text-center pa-4 font-weight-bold">
                {{ master.indexNumber || "—" }}
              </td>
              <td class="pa-4">
                <div class="d-flex align-center">
                  <v-avatar
                    size="32"
                    :color="getElementColor(master.element)"
                    class="mr-3"
                  >
                    <span class="text-caption text-white font-weight-bold">{{
                      master.element || "?"
                    }}</span>
                  </v-avatar>
                  <span class="font-weight-medium">{{
                    master.monsterName || "—"
                  }}</span>
                </div>
              </td>
              <td
                v-show="showExtraColumns"
                :class="'element-' + (master.element || '').toLowerCase()"
                class="text-center pa-4"
              >
                <v-chip
                  :color="getElementColor(master.element)"
                  variant="tonal"
                  size="small"
                >
                  {{ master.element || "—" }}
                </v-chip>
              </td>
              <td v-show="showExtraColumns" class="text-center pa-4">
                <v-chip
                  :color="getTypeColor(master.type)"
                  variant="tonal"
                  size="small"
                >
                  {{ master.type || "—" }}
                </v-chip>
              </td>
              <td v-show="showExtraColumns" class="text-center pa-4">
                <span class="text-caption">{{
                  master.ejectionGacha || "—"
                }}</span>
              </td>
              <template v-for="acc in accounts" :key="acc.id">
                <td
                  :class="getOwnedStatusClass(master.id, acc.id, 1)"
                  class="text-center pa-2"
                >
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <div
                        v-bind="props"
                        class="cell-content"
                        v-html="getDisplayCellContent(master.id, acc.id, 0)"
                      ></div>
                    </template>
                    <span
                      v-html="getTooltipContent(master.id, acc.id, 0)"
                    ></span>
                  </v-tooltip>
                </td>
                <td
                  :class="getOwnedStatusClass(master.id, acc.id, 2)"
                  class="text-center pa-2"
                >
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <div
                        v-bind="props"
                        class="cell-content"
                        v-html="getDisplayCellContent(master.id, acc.id, 1)"
                      ></div>
                    </template>
                    <span
                      v-html="getTooltipContent(master.id, acc.id, 1)"
                    ></span>
                  </v-tooltip>
                </td>
              </template>
            </tr>
          </tbody>
        </v-table>
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
/* 全体的なスタイリング */
.character-row:hover {
  background-color: rgba(25, 118, 210, 0.05) !important;
}

/* レスポンシブ対応 */
@media (max-width: 960px) {
  .pa-6 {
    padding: 16px !important;
  }

  .mb-6 {
    margin-bottom: 24px !important;
  }
}

/* カスタムスクロールバー */
.v-table::-webkit-scrollbar {
  width: 8px;
}

.v-table::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.v-table::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.v-table::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>

<style>
/* INFO: v-table内でカスタムスタイルを適用するため、scopedを外しています */
.v-table .status-owned {
  text-align: center;
  font-weight: bold;
  background-color: #e8f5e9; /* Light green */
}
.v-table .status-unowned {
  text-align: center;
  color: #bdbdbd; /* Lighter grey */
}
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
  table-layout: fixed;
}

/* キャラ名列の幅を制限 */
.table-fixed th:nth-child(2),
.table-fixed td:nth-child(2) {
  width: 200px; /* キャラ名列の幅を200pxに制限 */
  max-width: 200px;
  min-width: 200px;
}

/* キャラクター名の表示を最適化 */
.table-fixed td:nth-child(2) .d-flex {
  width: 100%;
}

.table-fixed td:nth-child(2) .font-weight-medium {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 140px; /* アバター分を除いた幅 */
}

/* 図鑑番号列の幅を制限 */
.table-fixed th:nth-child(1),
.table-fixed td:nth-child(1) {
  width: 80px; /* 図鑑番号列の幅を80pxに制限 */
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
  width: 100px; /* 各列の幅を100pxに制限 */
  max-width: 100px;
  min-width: 100px;
}

/* アイテムセルの幅を調整して折り返しを防ぐ */
.table-fixed th:nth-child(n + 2),
.table-fixed td:nth-child(n + 3) {
  width: 78px; /* アイテムセルの幅を78pxに制限 */
  max-width: 78px;
  min-width: 78px;
}

.table-fixed tr {
  /* アイテムの数に応じて高さを自動調整 */
  height: auto !important;
  min-height: 110px; /* 最小高さを設定 */
}

.table-fixed td {
  /* アイテムが多い場合でも見やすく上揃えに変更 */
  vertical-align: top;
  padding-top: 16px; /* 上部に適度な余白を追加 */
}

.table-fixed .cell-content {
  /* アイテムをすべて表示するように制限を解除 */
  max-height: none; /* 高さ制限を解除 */
  overflow: visible; /* オーバーフローを表示 */
  text-overflow: clip; /* 省略記号を無効化 */
  display: block; /* ブロック表示に変更 */
  -webkit-line-clamp: unset; /* 行数制限を解除 */
  -webkit-box-orient: unset; /* ボックス方向を解除 */
  word-break: normal; /* 単語の途中での改行を許可 */
  white-space: normal; /* アイテム名を改行して表示 */
}

/* アイテム名の改行を有効化 */
.table-fixed .cell-content br {
  display: inline; /* 改行を有効化して複数行表示 */
}

/* アイテムの文字サイズを小さくする */
.table-fixed .cell-content {
  font-size: 0.75rem; /* 14px相当 */
  line-height: 1.2; /* 行間を調整 */
}
</style>
