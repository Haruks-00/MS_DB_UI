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
                    multiple
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
                    multiple
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
                    multiple
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
                    multiple
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="filters.totalOwnership"
                    :items="[
                      { value: 'all_unowned', title: '未所持' },
                      { value: 'one_total', title: '合計1体' },
                      { value: 'two_total', title: '合計2体' },
                      { value: 'three_total', title: '合計3体' },
                      { value: 'four_total', title: '合計4体' },
                      { value: 'five_or_more', title: '合計それ以上（5体以上）' },
                      {
                        value: 'one_in_each',
                        title: '各アカウントで1体以上所持',
                      },
                    ]"
                    multiple
                    label="全体の所持状況"
                    variant="outlined"
                    density="compact"
                    clearable
                    color="primary"
                    prepend-inner-icon="mdi-account-group"
                    class="minimal-select"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="filters.columnFilter"
                    :items="[
                      { value: 'has_zero_item_character', title: 'アイテム0つ所持キャラが居る列' },
                      { value: 'has_one_item_character', title: 'アイテム1つ所持キャラが居る列' },
                      { value: 'has_two_item_character', title: 'アイテム2つ所持キャラが居る列' },
                      { value: 'has_three_item_character', title: 'アイテム3つ所持キャラが居る列' },
                      { value: 'has_virtual_item_character', title: '仮想アイテム所持キャラが居る列' },
                    ]"
                    multiple
                    label="列単位での絞り込み"
                    variant="outlined"
                    density="compact"
                    clearable
                    color="primary"
                    prepend-inner-icon="mdi-view-column"
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
          <div class="d-flex align-center gap-4">
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
            <!-- 一括表示切り替えボタン -->
            <v-btn-toggle
              v-model="globalDisplayMode"
              mandatory
              density="comfortable"
              color="primary"
            >
              <v-btn value="current" size="small">
                <v-icon size="small" class="mr-1">mdi-eye</v-icon>
                全て現在
              </v-btn>
              <v-btn value="planned" size="small">
                <v-icon size="small" class="mr-1">mdi-eye-outline</v-icon>
                全て予定後
              </v-btn>
            </v-btn-toggle>
          </div>
          <div class="d-flex align-center gap-2">
            <!-- CSVエクスポートボタン -->
            <v-btn
              @click="exportToCSV"
              :loading="isExporting"
              color="success"
              variant="outlined"
              prepend-icon="mdi-file-export"
              class="minimal-button"
            >
              CSVエクスポート
            </v-btn>
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
          :items="displayItems"
          :headers="headers"
          :loading="!dataLoaded"
          height="70vh"
          density="compact"
          fixed-header
          class="table-fixed"
          :fixed-columns="true"
          :item-class="getItemClass"
        >
          <!-- キャラ名列のカスタムスロット -->
          <template v-slot:item.monsterName="{ item }">
            <div class="character-name-cell">
              <div class="d-flex align-center">
                <v-avatar
                  size="32"
                  :color="getElementColor(item.element)"
                  class="mr-2"
                >
                  <span class="text-caption text-white font-weight-bold">{{
                    item.element || "?"
                  }}</span>
                </v-avatar>
                <span class="character-name">{{
                  item.monsterName || "—"
                }}</span>
                <!-- ピン留めボタン -->
                <v-btn
                  @click.stop="uiStore.togglePinnedCharacter(item.id)"
                  :icon="uiStore.isPinned(item.id) ? 'mdi-pin' : 'mdi-pin-outline'"
                  :color="uiStore.isPinned(item.id) ? 'amber' : 'grey'"
                  variant="text"
                  size="x-small"
                  density="compact"
                  class="ml-1 pin-btn"
                ></v-btn>
              </div>
              <!-- 行単位の表示切り替えボタン（仮想アイテムがある場合のみ表示） -->
              <v-btn
                v-if="hasVirtualItems(item.id)"
                @click.stop="toggleRowDisplayMode(item.id)"
                :color="getRowDisplayMode(item.id) === 'current' ? 'primary' : 'orange'"
                variant="tonal"
                size="x-small"
                class="row-toggle-btn mt-1"
              >
                <v-icon size="x-small">{{ getRowDisplayMode(item.id) === 'current' ? 'mdi-eye' : 'mdi-eye-outline' }}</v-icon>
                <span class="ml-1">{{ getRowDisplayMode(item.id) === 'current' ? '現在' : '予定後' }}</span>
              </v-btn>
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
              @click="openItemEditModal(item.id, acc.id, 0)"
              style="cursor: pointer;"
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
              @click="openItemEditModal(item.id, acc.id, 1)"
              style="cursor: pointer;"
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

    <!-- アイテム編集モーダル -->
    <ItemEditModal
      v-model="isModalOpen"
      :character="editingCharacter"
      :is-new-character="editingCharacter?.isNew || false"
      @save="handleSaveItems"
      @remove-character="handleRemoveCharacter"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useDataStore } from "@/stores/data";
import { useUIStore } from "@/stores/ui";
import ItemEditModal from "./ItemEditModal.vue";
import { ensureNewFormat } from "../../utils/itemMigration";
import { generateCSV, downloadCSV } from "@/utils/csvExport";

// Pinia Storeを使用
const dataStore = useDataStore();
const uiStore = useUIStore();

const emit = defineEmits(['items-updated']);

// CSVエクスポート状態
const isExporting = ref(false);

const showExtraColumns = ref(false);

// アイテム編集モーダル用の状態
const isModalOpen = ref(false);
const editingCharacter = ref(null);
const editingAccountId = ref(null);

// 行ごとのアイテム表示モード管理（masterId単位）
const rowDisplayModes = ref(new Map());

// グローバルな表示モード（一括切り替え用）
const globalDisplayMode = ref('current');

// グローバル表示モードが変更されたら、仮想アイテムを持つ全ての行を一括切り替え
watch(globalDisplayMode, (newMode) => {
  // 全キャラクターマスターをループ
  dataStore.characterMasters.forEach((master) => {
    // 仮想アイテムを持つキャラクターのみ対象
    if (hasVirtualItems(master.id)) {
      rowDisplayModes.value.set(master.id, newMode);
    }
  });
});

const createInitialFiltersState = () => ({
  charSearch: "",
  element: [],
  itemSearch: [],
  type: [],
  gachaSearch: [],
  totalOwnership: [],
  account: "",
  ownership: "",
  columnFilter: [],
});

const filters = reactive(createInitialFiltersState());

// テンプレートで使用するためのcomputed プロパティ
const characterMasters = computed(() => dataStore.characterMasters);
const accounts = computed(() => dataStore.accounts);
const itemMasters = computed(() => dataStore.itemMasters);
const gachaMasters = computed(() => dataStore.gachaMasters);
const itemMastersMap = computed(() => dataStore.itemMastersMap);
const characterMastersMap = computed(() => dataStore.characterMastersMap);
const dataLoaded = computed(() => dataStore.dataLoaded);

const characterTypes = computed(() => {
  return Array.from(
    new Set(dataStore.characterMasters.map((m) => m.type).filter(Boolean))
  ).sort();
});

const headers = computed(() => {
  const basicHeaders = [
    { title: '図鑑No.', key: 'indexNumber', align: 'center', sortable: true, width: 80 },
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
  dataStore.accounts.forEach(acc => {
    // アカウント名から数字部分を抽出（例：「アカウント1」→「1」）
    const accountNumber = acc.indexNumber || acc.name.match(/\d+/)?.[0] || acc.id;
    basicHeaders.push(
      { title: `${accountNumber}-1`, key: `account_${acc.id}_1`, align: 'center', sortable: false, width: 78 },
      { title: `${accountNumber}-2`, key: `account_${acc.id}_2`, align: 'center', sortable: false, width: 78 }
    );
  });

  return basicHeaders;
});

/**
 * フィルタリング後のキャラクターマスター
 */
const filteredMasters = computed(() => {
  if (!dataStore.dataLoaded) return [];

  const {
    charSearch,
    element,
    itemSearch,
    type,
    gachaSearch,
    totalOwnership,
    account,
    ownership,
    columnFilter,
  } = filters;
  const lowerCharSearch = charSearch.toLowerCase();
  const searchItemIds = itemSearch.map(id => Number(id));

  return dataStore.characterMasters.filter((master) => {
    if (
      lowerCharSearch &&
      !master.monsterName.toLowerCase().includes(lowerCharSearch) &&
      !(master.indexNumber + "").includes(lowerCharSearch)
    )
      return false;
    if (element.length > 0 && !element.includes(master.element)) return false;
    if (type.length > 0) {
      let typeMatch = false;
      for (const selectedType of type) {
        if (selectedType === "恒常_or_限定") {
          if (master.type === "恒常" || master.type === "限定") {
            typeMatch = true;
            break;
          }
        } else {
          if (master.type === selectedType) {
            typeMatch = true;
            break;
          }
        }
      }
      if (!typeMatch) return false;
    }
    if (gachaSearch.length > 0 && !gachaSearch.includes(master.ejectionGacha || ""))
      return false;

    if (searchItemIds.length > 0) {
      let hasItem = false;
      const targetAccount = account || null;

      for (const searchItemId of searchItemIds) {
        if (targetAccount) {
          if ((dataStore.ownedCharactersData.get(targetAccount) || []).some(
            (char) => {
              if (char.characterMasterId !== master.id) return false;
              if (!char.items || char.items.length === 0) return false;

              // 新形式に変換してからチェック
              const normalizedItems = ensureNewFormat(char.items);
              return normalizedItems.some((item) => item.itemId === searchItemId);
            }
          )) {
            hasItem = true;
            break;
          }
        } else {
          let foundInAnyAccount = false;
          for (const ownedChars of dataStore.ownedCharactersData.values()) {
            if (
              ownedChars.some(
                (char) => {
                  if (char.characterMasterId !== master.id) return false;
                  if (!char.items || char.items.length === 0) return false;

                  // 新形式に変換してからチェック
                  const normalizedItems = ensureNewFormat(char.items);
                  return normalizedItems.some((item) => item.itemId === searchItemId);
                }
              )
            ) {
              foundInAnyAccount = true;
              break;
            }
          }
          if (foundInAnyAccount) {
            hasItem = true;
            break;
          }
        }
      }
      if (!hasItem) return false;
    }

    // 全体の所持状況フィルタ（複数選択対応）
    if (totalOwnership && totalOwnership.length > 0) {
      const totalOwnedCount = dataStore.accounts.reduce(
        (sum, acc) => sum + getOwnedCount(master.id, acc.id),
        0
      );

      let matchesAnyCondition = false;
      for (const condition of totalOwnership) {
        if (condition === "all_unowned" && totalOwnedCount === 0) {
          matchesAnyCondition = true;
          break;
        }
        if (condition === "one_total" && totalOwnedCount === 1) {
          matchesAnyCondition = true;
          break;
        }
        if (condition === "two_total" && totalOwnedCount === 2) {
          matchesAnyCondition = true;
          break;
        }
        if (condition === "three_total" && totalOwnedCount === 3) {
          matchesAnyCondition = true;
          break;
        }
        if (condition === "four_total" && totalOwnedCount === 4) {
          matchesAnyCondition = true;
          break;
        }
        if (condition === "five_or_more" && totalOwnedCount >= 5) {
          matchesAnyCondition = true;
          break;
        }
        if (
          condition === "one_in_each" &&
          dataStore.accounts.every((acc) => getOwnedCount(master.id, acc.id) >= 1)
        ) {
          matchesAnyCondition = true;
          break;
        }
      }
      if (!matchesAnyCondition) return false;
    }

    if (account && ownership) {
      const countInAccount = getOwnedCount(master.id, account);
      if (ownership === "owned" && countInAccount === 0) return false;
      if (ownership === "unowned" && countInAccount > 0) return false;
      if (ownership === "one" && countInAccount !== 1) return false;
      if (ownership === "two" && countInAccount !== 2) return false;
    }

    // 列フィルタ処理: アイテム0つ、1つ、2つ、3つ、仮想アイテム所持キャラが居る列の絞り込み（複数選択対応）
    if (columnFilter && columnFilter.length > 0) {
      let matchesAnyColumnCondition = false;

      for (const condition of columnFilter) {
        let hasMatchingCharacter = false;

        for (const acc of dataStore.accounts) {
          const accountChars = dataStore.ownedCharactersData.get(acc.id) || [];
          const masterChars = accountChars.filter(char => char.characterMasterId === master.id);

          if (condition === 'has_zero_item_character' &&
              masterChars.some(char => !char.items || char.items.length === 0)) {
            hasMatchingCharacter = true;
            break;
          }
          if (condition === 'has_one_item_character' &&
              masterChars.some(char => char.items && char.items.length === 1)) {
            hasMatchingCharacter = true;
            break;
          }
          if (condition === 'has_two_item_character' &&
              masterChars.some(char => char.items && char.items.length === 2)) {
            hasMatchingCharacter = true;
            break;
          }
          if (condition === 'has_three_item_character' &&
              masterChars.some(char => char.items && char.items.length === 3)) {
            hasMatchingCharacter = true;
            break;
          }
          if (condition === 'has_virtual_item_character' &&
              masterChars.some(char => {
                const items = char.items || [];
                return items.some(item => {
                  // 新形式: { itemId: 1, isVirtual: true }
                  return typeof item === 'object' && item.isVirtual === true;
                });
              })) {
            hasMatchingCharacter = true;
            break;
          }
        }

        if (hasMatchingCharacter) {
          matchesAnyColumnCondition = true;
          break;
        }
      }

      if (!matchesAnyColumnCondition) return false;
    }

    return true;
  });
});

/**
 * ピン留めされたキャラクターマスター
 */
const pinnedItems = computed(() => {
  return filteredMasters.value.filter((master) =>
    uiStore.isPinned(master.id)
  );
});

/**
 * ピン留めされていないキャラクターマスター
 */
const unpinnedItems = computed(() => {
  return filteredMasters.value.filter((master) =>
    !uiStore.isPinned(master.id)
  );
});

/**
 * 表示用のアイテムリスト（ピン留め行を先頭に配置）
 */
const displayItems = computed(() => {
  return [...pinnedItems.value, ...unpinnedItems.value];
});

/**
 * 行にクラスを付与する関数（ピン留め行用）
 */
const getItemClass = (item) => {
  return uiStore.isPinned(item.id) ? 'pinned-row' : '';
};

const getOwnedCount = (masterId, accountId) => {
  return dataStore.ownedCountMap.get(`${masterId}-${accountId}`) || 0;
};

const getDisplayCellContent = (masterId, accountId, index) => {
  const ownedList = (dataStore.ownedCharactersData.get(accountId) || []).filter(
    (c) => c.characterMasterId === masterId
  );
  if (!ownedList || ownedList.length <= index) return "—";

  const items = ownedList[index].items || [];

  // セルごとの表示モードに応じてアイテムをフィルタリング
  const displayMode = getCellDisplayMode(masterId, accountId, index);
  const filteredItems = items.filter((item) => {
    const isVirtual = typeof item === 'object' ? item.isVirtual : false;
    const willRemove = typeof item === 'object' ? item.willRemove : false;

    if (displayMode === 'current') {
      // 現在モード: 実アイテムのみ（外す予定も含む）
      return !isVirtual;
    } else {
      // 予定適用後モード: 外す予定でないすべてのアイテム
      return !willRemove;
    }
  });

  // アイテムを実/仮想/外す予定に分けて表示
  const itemLines = filteredItems
    .map((item) => {
      // 新形式の場合: { itemId: 1, isVirtual: false, willRemove: false }
      // 旧形式の場合: 1（数値）
      const itemId = typeof item === 'object' ? item.itemId : item;
      const isVirtual = typeof item === 'object' ? item.isVirtual : false;
      const willRemove = typeof item === 'object' ? item.willRemove : false;
      const isEL = typeof item === 'object' ? item.isEL : false;
      const itemName = dataStore.itemMastersMap.get(Number(itemId));

      if (!itemName) return null;

      // ELバッジを追加（isEL=trueの場合）
      const elBadge = isEL ? ' <span class="el-badge">EL</span>' : '';

      // 外す予定のアイテムは赤色で表示（現在モードのみ）
      if (displayMode === 'current' && willRemove) {
        return `<span class="will-remove-item item-name">${itemName}${elBadge}</span>`;
      }
      // 仮想アイテムはオレンジ色で表示（予定適用後モードのみ）
      if (isVirtual) {
        return `<span class="virtual-item item-name">${itemName}${elBadge}</span>`;
      }
      // 通常の実アイテム
      return `<span class="item-name">${itemName}${elBadge}</span>`;
    })
    .filter(Boolean)
    .join("<br>");

  return itemLines ? `✔️<br>${itemLines}` : "✔️";
};

/**
 * [概要] ツールチップに表示する内容を取得する。
 */
const getTooltipContent = (masterId, accountId, index) => {
  const ownedList = (dataStore.ownedCharactersData.get(accountId) || []).filter(
    (c) => c.characterMasterId === masterId
  );
  if (!ownedList || ownedList.length <= index) return "未所持";

  const items = ownedList[index].items || [];

  const itemLines = items
    .map((item) => {
      const itemId = typeof item === 'object' ? item.itemId : item;
      const isVirtual = typeof item === 'object' ? item.isVirtual : false;
      const itemName = dataStore.itemMastersMap.get(Number(itemId));

      if (!itemName) return null;

      if (isVirtual) {
        return itemName;
      }
      return itemName;
    })
    .filter(Boolean)
    .join("<br>");

  return itemLines || "アイテムなし";
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

/**
 * 行の表示モードを取得（デフォルトは'current'）
 */
const getRowDisplayMode = (masterId) => {
  return rowDisplayModes.value.get(masterId) || 'current';
};

/**
 * 行の表示モードを切り替え
 */
const toggleRowDisplayMode = (masterId) => {
  const currentMode = getRowDisplayMode(masterId);
  const newMode = currentMode === 'current' ? 'planned' : 'current';
  rowDisplayModes.value.set(masterId, newMode);
};

/**
 * その行に仮想アイテム（つける予定）が存在するかチェック
 */
const hasVirtualItems = (masterId) => {
  // 全アカウントのキャラクターをチェック
  for (const acc of dataStore.accounts) {
    const ownedList = (dataStore.ownedCharactersData.get(acc.id) || []).filter(
      (c) => c.characterMasterId === masterId
    );

    for (const char of ownedList) {
      const items = char.items || [];
      // 仮想アイテムが1つでもあればtrueを返す
      const hasVirtual = items.some((item) => {
        return typeof item === 'object' && item.isVirtual === true;
      });
      if (hasVirtual) return true;
    }
  }

  return false;
};

// 後方互換性のため、セル単位の関数も残す（行単位に委譲）
const getCellDisplayMode = (masterId, accountId, index) => {
  return getRowDisplayMode(masterId);
};

const toggleCellDisplayMode = (masterId, accountId, index) => {
  toggleRowDisplayMode(masterId);
};

/**
 * セルをクリックしたときにアイテム編集モーダルを開く
 */
const openItemEditModal = (masterId, accountId, index) => {
  const ownedList = (dataStore.ownedCharactersData.get(accountId) || []).filter(
    (c) => c.characterMasterId === masterId
  );

  if (!ownedList || ownedList.length <= index) {
    // 未所持の場合は仮のcharacterオブジェクトを生成
    editingCharacter.value = {
      characterMasterId: masterId,
      accountId: accountId,
      items: [],
      isNew: true
    };
    editingAccountId.value = accountId;
    isModalOpen.value = true;
    return;
  }

  editingCharacter.value = ownedList[index];
  editingAccountId.value = accountId;
  isModalOpen.value = true;
};

/**
 * モーダルで保存されたアイテムを処理する
 */
const handleSaveItems = async ({ character, items, isNew }) => {
  if (isNew) {
    // 新規追加の場合
    emit('items-updated', {
      accountId: editingAccountId.value,
      characterMasterId: character.characterMasterId,
      items,
      isNew: true
    });
  } else {
    // 既存の編集の場合
    emit('items-updated', {
      accountId: editingAccountId.value,
      ownedCharacterId: character.id,
      items,
      isNew: false
    });
  }
};

/**
 * キャラクターを未所持に戻す
 */
const handleRemoveCharacter = async () => {
  if (!editingCharacter.value || !editingCharacter.value.isNew) {
    return;
  }

  // 新規追加モード時のみ動作（既存キャラの削除は処理しない）
  // モーダルを閉じるだけで、実際には何もしない（まだ保存されていないため）
  isModalOpen.value = false;
};

/**
 * CSVエクスポートを実行
 */
const exportToCSV = async () => {
  try {
    isExporting.value = true;

    // 全アカウントの全所持キャラクターをまとめて取得
    const allOwnedCharacters = [];
    dataStore.accounts.forEach(account => {
      const accountChars = dataStore.ownedCharactersData.get(account.id) || [];
      accountChars.forEach(char => {
        allOwnedCharacters.push({
          ...char,
          accountName: account.name,
        });
      });
    });

    // CSVデータを生成
    const csvContent = generateCSV({
      characterMasters: dataStore.characterMasters,
      ownedCharacters: allOwnedCharacters,
      accountName: '', // 各キャラクターに個別のaccountNameがあるため不要
      itemMastersMap: dataStore.itemMastersMap,
    });

    // ファイル名を生成（日時付き）
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const timeStr = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    const filename = `characters_export_${dateStr}_${timeStr}.csv`;

    // ダウンロード
    downloadCSV(csvContent, filename);

    uiStore.showSuccess('CSVエクスポートが完了しました');
  } catch (error) {
    console.error('CSVエクスポートエラー:', error);
    uiStore.showError('CSVエクスポートに失敗しました');
  } finally {
    isExporting.value = false;
  }
};

// テスト用にコンポーネントのメソッドとプロパティを公開
defineExpose({
  rowDisplayModes,
  cellDisplayModes: rowDisplayModes, // 後方互換性
  getRowDisplayMode,
  getCellDisplayMode,
  toggleRowDisplayMode,
  toggleCellDisplayMode,
  isModalOpen,
  editingCharacter,
  filters,
  exportToCSV,
});
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

/* キャラクター名セルの表示を最適化 */
.character-name-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  padding: 4px 0;
}

.character-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 140px;
  font-weight: 500;
  font-size: 0.875rem;
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
  min-height: 140px;
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
  white-space: normal;
  overflow: hidden;
  width: 70px !important;
  min-width: 70px;
  max-width: 70px;
  display: block;
  padding: 2px;
  box-sizing: border-box;
}

/* セルの高さを統一（1列目以外） */
.table-fixed tr {
  height: 140px !important;
  min-height: 140px;
}

.table-fixed td {
  vertical-align: top;
  padding: 16px 8px;
  height: 140px;
}

/* 1列目（図鑑No.）は他の列より低く */
.table-fixed td:nth-child(1) {
  height: 60px !important;
  min-height: 60px;
  vertical-align: middle;
}

/* セルコンテンツの位置調整 */
.table-fixed .cell-content {
  display: block;
  text-align: center;
  min-height: 78px;
  width: 100%;
}

/* アイテムなしの場合の表示調整 */
.table-fixed td:has(.cell-content:contains("—")) {
  text-align: center;
}

/* 所持状況セルの統一スタイル */
.table-fixed .status-owned,
.table-fixed .status-unowned {
  height: 140px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/* アカウント別セルの統一スタイル */
.account-cell {
  height: 140px !important;
  width: 60px !important;
  min-width: 60px !important;
  max-width: 60px !important;
  padding: 16px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

/* 行単位の表示切り替えボタン */
.row-toggle-btn {
  font-size: 0.7rem !important;
  padding: 2px 6px !important;
  min-width: 60px !important;
  height: 24px !important;
  text-transform: none !important;
  font-weight: 500 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}

/* 「—」表示の場合も同じ幅を確保 */
.account-cell .cell-content {
  width: 60px !important;
  min-width: 60px !important;
  max-width: 60px !important;
  text-align: center;
  display: block;
  min-height: 78px;
}

/* 「—」文字のみの場合の特別スタイル */
.account-cell .cell-content:contains("—"),
.account-cell .cell-content[innerHTML="—"] {
  width: 60px !important;
  min-width: 60px !important;
  max-width: 60px !important;
  display: block !important;
  text-align: center;
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
  width: 60px !important;
  min-width: 60px !important;
  max-width: 60px !important;
  text-align: center !important;
}

/* 仮想アイテムのスタイル（オレンジ） */
:deep(.virtual-item) {
  color: #FF9800;
}

/* 外す予定アイテムのスタイル（赤） */
:deep(.will-remove-item) {
  color: #F44336;
}

/* アイテム名の途中で改行しない */
:deep(.item-name) {
  white-space: nowrap;
  display: inline-block;
  font-size: 0.7rem;
}

/* ピン留めボタンのスタイル */
.pin-btn {
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.pin-btn:hover {
  opacity: 1;
}

/* ピン留め行のスタイル */
:deep(.pinned-row) {
  position: sticky !important;
  background-color: #fffbea !important; /* 薄い黄色 */
  border-bottom: 2px solid #fbbf24 !important; /* 黄色の境界線 */
  z-index: 5 !important;
}

/* ピン留め行のトップ位置を動的に設定 */
:deep(.pinned-row:nth-of-type(1)) {
  top: 28px !important; /* ヘッダー高さ分 */
}

:deep(.pinned-row:nth-of-type(2)) {
  top: calc(28px + 140px) !important; /* ヘッダー + 1行目の高さ */
}

:deep(.pinned-row:nth-of-type(3)) {
  top: calc(28px + 280px) !important; /* ヘッダー + 2行分の高さ */
}

:deep(.pinned-row:nth-of-type(4)) {
  top: calc(28px + 420px) !important; /* ヘッダー + 3行分の高さ */
}

:deep(.pinned-row:nth-of-type(5)) {
  top: calc(28px + 560px) !important; /* ヘッダー + 4行分の高さ */
}

/* ピン留め行のホバー効果 */
:deep(.pinned-row:hover) {
  background-color: #fef3c7 !important; /* より濃い黄色 */
}

/* ELバッジのスタイル */
.el-badge {
  display: inline-block;
  background-color: #ff6b6b;
  color: white;
  font-size: 0.65rem;
  font-weight: bold;
  padding: 1px 4px;
  border-radius: 3px;
  margin-left: 3px;
  vertical-align: middle;
}

</style>
