<template>
  <div class="pa-6">
    <!-- INFO: より洗練された見出しデザイン -->
    <div class="d-flex align-center mb-6">
      <v-icon
        icon="mdi-sword-cross"
        size="32"
        color="primary"
        class="mr-3"
      ></v-icon>
      <h2 class="text-h4 font-weight-bold text-primary">アイテム管理</h2>
    </div>

    <v-form>
      <!-- INFO: より美しいアイテム更新セクション -->
      <v-card elevation="3" rounded="lg" class="mb-6">
        <v-card-title class="bg-primary text-white pa-4">
          <v-icon icon="mdi-update" class="mr-2"></v-icon>
          所持キャラクターのアイテムを変更
        </v-card-title>
        <v-card-text class="pa-6">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <!-- INFO: より美しいキャラクターセレクター -->
                <div class="mb-4">
                  <div class="d-flex align-center mb-3">
                    <v-icon
                      icon="mdi-account-search"
                      color="primary"
                      class="mr-2"
                    ></v-icon>
                    <h6 class="text-h6 font-weight-medium">対象キャラクター</h6>
                  </div>
                  <CharacterSelector
                    v-model="updateForm.selectedOwnedId"
                    :items="currentOwnedCharacters"
                    label="変更対象のキャラクターを検索"
                    list-height="300px"
                    color="primary"
                    prepend-inner-icon="mdi-account-search"
                  >
                    <template #item="{ item }">
                      <v-list-item-title>{{
                        formatCharForDisplay(item, true)
                      }}</v-list-item-title>
                    </template>
                  </CharacterSelector>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <!-- INFO: より美しいアイテム選択 -->
                <div class="mb-4">
                  <div class="d-flex align-center mb-3">
                    <v-icon
                      icon="mdi-sword-cross"
                      color="primary"
                      class="mr-2"
                    ></v-icon>
                    <h6 class="text-h6 font-weight-medium">アイテム選択</h6>
                  </div>
                  <v-select
                    v-model="updateForm.items"
                    :items="dataStore.itemMasters"
                    item-title="name"
                    item-value="id"
                    label="アイテム (最大4つまで)"
                    multiple
                    chips
                    clearable
                    variant="outlined"
                    :disabled="!updateForm.selectedOwnedId"
                    color="primary"
                    prepend-inner-icon="mdi-sword-cross"
                  ></v-select>

                  <!-- INFO: より美しい更新ボタン -->
                  <v-btn
                    :loading="isUpdating"
                    :disabled="
                      !updateForm.selectedOwnedId ||
                      isUpdating ||
                      updateForm.items.length > 4
                    "
                    @click="handleUpdateItems"
                    color="primary"
                    block
                    size="large"
                    variant="elevated"
                    prepend-icon="mdi-update"
                    class="mt-4"
                  >
                    {{ isUpdating ? "更新中..." : "アイテムを更新" }}
                  </v-btn>

                  <!-- INFO: より美しいエラー表示 -->
                  <v-alert
                    v-if="updateForm.items.length > 4"
                    type="error"
                    variant="tonal"
                    class="mt-3"
                    prepend-icon="mdi-alert-circle"
                  >
                    アイテムは4つまでしか選択できません。
                  </v-alert>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>

      <!-- INFO: より美しいアイテム移動セクション -->
      <v-card elevation="3" rounded="lg">
        <v-card-title class="bg-secondary text-white pa-4">
          <v-icon icon="mdi-swap-horizontal" class="mr-2"></v-icon>
          キャラクター間でアイテムを移動
        </v-card-title>
        <v-card-text class="pa-6">
          <v-container>
            <!-- アイテムフィルタ -->
            <v-row class="mb-4">
              <v-col cols="12">
                <v-select
                  v-model="moveForm.itemFilter"
                  :items="dataStore.itemMasters"
                  item-title="name"
                  item-value="id"
                  label="アイテムでフィルタ（外す予定のキャラを優先表示）"
                  clearable
                  variant="outlined"
                  color="secondary"
                  prepend-inner-icon="mdi-filter"
                  density="comfortable"
                >
                  <template v-slot:prepend-inner>
                    <v-icon icon="mdi-filter" color="secondary"></v-icon>
                  </template>
                </v-select>
              </v-col>
            </v-row>

            <v-row>
              <!-- INFO: より美しい移動元セクション -->
              <v-col cols="12" md="4">
                <div class="text-center mb-4">
                  <v-avatar size="48" color="secondary" class="mb-2">
                    <v-icon
                      icon="mdi-arrow-left"
                      size="24"
                      color="white"
                    ></v-icon>
                  </v-avatar>
                  <h6 class="text-h6 font-weight-bold text-secondary">
                    移動元
                  </h6>
                </div>
                <CharacterSelector
                  v-model="moveForm.from.selectedId"
                  :items="filteredOwnedCharacters"
                  label="移動元キャラクターを検索"
                  list-height="250px"
                  :disabled-items="[moveForm.to.selectedId].filter(Boolean)"
                  color="secondary"
                  prepend-inner-icon="mdi-account-arrow-left"
                >
                  <template #item="{ item }">
                    <v-list-item-title>{{
                      formatCharForDisplay(item, true)
                    }}</v-list-item-title>
                  </template>
                </CharacterSelector>
              </v-col>

              <!-- INFO: より美しいアイテム選択セクション -->
              <v-col cols="12" md="4">
                <div class="text-center mb-4">
                  <v-avatar size="48" color="info" class="mb-2">
                    <v-icon
                      icon="mdi-sword-cross"
                      size="24"
                      color="white"
                    ></v-icon>
                  </v-avatar>
                  <h6 class="text-h6 font-weight-bold text-info">
                    移動するアイテム
                  </h6>
                </div>
                <v-card
                  elevation="2"
                  rounded="lg"
                  style="height: 318px; overflow-y: auto"
                  class="border-info border"
                >
                  <v-card-text class="pa-4">
                    <div
                      v-if="!moveForm.from.selectedId"
                      class="text-center pa-4"
                    >
                      <v-icon
                        icon="mdi-information"
                        size="48"
                        color="grey-lighten-1"
                      ></v-icon>
                      <div class="mt-2 text-body-2 text-medium-emphasis">
                        移動元キャラクターを選択してください。
                      </div>
                    </div>
                    <div
                      v-else-if="!movableItems.length"
                      class="text-center pa-4"
                    >
                      <v-icon
                        icon="mdi-inbox-outline"
                        size="48"
                        color="grey-lighten-1"
                      ></v-icon>
                      <div class="mt-2 text-body-2 text-medium-emphasis">
                        移動できるアイテムがありません。
                      </div>
                    </div>
                    <div v-else>
                      <div class="mb-3">
                        <v-chip
                          color="info"
                          variant="tonal"
                          size="small"
                          class="mb-2"
                        >
                          {{ movableItems.length }}個のアイテム
                        </v-chip>
                      </div>
                      <v-checkbox
                        v-for="item in movableItems"
                        :key="item.id"
                        v-model="moveForm.selectedItemIds"
                        :label="item.name"
                        :value="item.id"
                        density="compact"
                        hide-details
                        color="info"
                        class="mb-2"
                      ></v-checkbox>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- INFO: より美しい移動先セクション -->
              <v-col cols="12" md="4">
                <div class="text-center mb-4">
                  <v-avatar size="48" color="success" class="mb-2">
                    <v-icon
                      icon="mdi-arrow-right"
                      size="24"
                      color="white"
                    ></v-icon>
                  </v-avatar>
                  <h6 class="text-h6 font-weight-bold text-success">移動先</h6>
                </div>
                <CharacterSelector
                  v-model="moveForm.to.selectedId"
                  :items="allOwnedCharacters"
                  label="移動先キャラクターを検索"
                  list-height="250px"
                  :disabled-items="[moveForm.from.selectedId].filter(Boolean)"
                  color="success"
                  prepend-inner-icon="mdi-account-arrow-right"
                >
                  <template #item="{ item }">
                    <v-list-item-title>{{
                      formatCharForDisplay(item, true)
                    }}</v-list-item-title>
                  </template>
                </CharacterSelector>
              </v-col>
            </v-row>

            <!-- INFO: より美しい移動ボタン -->
            <v-row class="mt-6">
              <v-col>
                <div class="d-flex justify-center">
                  <v-btn
                    :loading="isMoving"
                    :disabled="
                      !moveForm.from.selectedId ||
                      !moveForm.to.selectedId ||
                      moveForm.selectedItemIds.length === 0 ||
                      isMoving
                    "
                    @click="handleMoveItems"
                    color="success"
                    size="large"
                    variant="elevated"
                    prepend-icon="mdi-swap-horizontal"
                    class="px-8"
                  >
                    {{ isMoving ? "移動中..." : "選択したアイテムを移動" }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-form>

    <!-- INFO: アイテム移動予定サマリー -->
    <ItemSummaryCards
      :selected-account-id="uiStore.selectedAccountId"
      :owned-characters-data="dataStore.ownedCharactersData"
      :character-masters-map="dataStore.characterMastersMap"
      :item-masters="dataStore.itemMasters"
      :item-masters-map="dataStore.itemMastersMap"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { formatOwnedCharDisplayName } from "../../utils/formatters";
import { databaseService } from "../../services/database";
import { ensureNewFormat, getRealItems } from "../../utils/itemMigration";
import CharacterSelector from "../shared/CharacterSelector.vue";
import ItemSummaryCards from "./ItemSummaryCards.vue";
import { useDataStore } from "@/stores/data";
import { useUIStore } from "@/stores/ui";

// Pinia Storeを使用
const dataStore = useDataStore();
const uiStore = useUIStore();

const emit = defineEmits(["items-updated", "items-moved"]);

const updateForm = reactive({ selectedOwnedId: null, items: [] });
const moveForm = reactive({
  from: { selectedId: null },
  to: { selectedId: null },
  selectedItemIds: [],
  itemFilter: null, // アイテム名フィルタ
});
const isUpdating = ref(false);
const isMoving = ref(false);

// 全所持キャラクター（フィルタなし、移動先用）
const allOwnedCharacters = computed(() => {
  if (
    !uiStore.selectedAccountId ||
    !dataStore.ownedCharactersData.has(uiStore.selectedAccountId)
  )
    return [];
  const ownedList =
    dataStore.ownedCharactersData.get(uiStore.selectedAccountId) || [];

  return ownedList
    .map((char) => {
      const master = dataStore.characterMastersMap.get(char.characterMasterId);
      return {
        ...char,
        id: char.id,
        indexNumber: master?.indexNumber || 999999,
        monsterName: master?.monsterName || "不明",
      };
    })
    .sort((a, b) => a.indexNumber - b.indexNumber);
});

// フィルタ適用済みキャラクター（移動元用）
const filteredOwnedCharacters = computed(() => {
  let characters = [...allOwnedCharacters.value];

  // アイテムフィルタが指定されている場合
  if (moveForm.itemFilter) {
    const filteredItemId = Number(moveForm.itemFilter);

    characters = characters.filter((char) => {
      if (!char.items || char.items.length === 0) return false;

      // 新形式に変換してからチェック
      const normalizedItems = ensureNewFormat(char.items);

      // 指定されたアイテムIDを持ち、かつ仮想アイテムでないものがあるかチェック
      return normalizedItems.some((item) => {
        return item.itemId === filteredItemId && !item.isVirtual;
      });
    });

    // willRemove優先でソート
    characters.sort((a, b) => {
      // 新形式に変換してからアイテムを検索
      const aNormalizedItems = ensureNewFormat(a.items || []);
      const bNormalizedItems = ensureNewFormat(b.items || []);

      const aItem = aNormalizedItems.find((item) => item.itemId === filteredItemId);
      const bItem = bNormalizedItems.find((item) => item.itemId === filteredItemId);

      const aWillRemove = aItem?.willRemove || false;
      const bWillRemove = bItem?.willRemove || false;

      // willRemove: trueを優先（降順）
      if (aWillRemove && !bWillRemove) return -1;
      if (!aWillRemove && bWillRemove) return 1;

      // 同じwillRemove状態なら図鑑番号でソート
      return a.indexNumber - b.indexNumber;
    });
  }

  return characters;
});

// 後方互換性のため、currentOwnedCharactersはallOwnedCharactersのエイリアスとする
const currentOwnedCharacters = computed(() => allOwnedCharacters.value);

const movableItems = computed(() => {
  if (!moveForm.from.selectedId) return [];
  const fromChar = currentOwnedCharacters.value.find(
    (c) => c.id === moveForm.from.selectedId
  );
  if (!fromChar || !fromChar.items) return [];

  // 新形式に変換し、実アイテムのみを取得
  const realItems = getRealItems(fromChar.items);
  return realItems.map((item) => ({
    id: item.itemId,
    name: dataStore.itemMastersMap.get(item.itemId) || `不明(ID:${item.itemId})`,
  }));
});

const resetForms = () => {
  Object.assign(updateForm, { selectedOwnedId: null, items: [] });
  Object.assign(moveForm, {
    from: { selectedId: null },
    to: { selectedId: null },
    selectedItemIds: [],
  });
};

watch(() => uiStore.selectedAccountId, resetForms);

watch(
  () => updateForm.selectedOwnedId,
  (newId) => {
    if (!newId) {
      updateForm.items = [];
      return;
    }
    const character = currentOwnedCharacters.value.find((c) => c.id === newId);
    // 新形式に変換し、実アイテムのみを取得してitemIdを抽出
    const realItems = getRealItems(character?.items || []);
    updateForm.items = realItems.map(item => item.itemId);
  }
);

watch(
  () => moveForm.from.selectedId,
  () => {
    moveForm.selectedItemIds = [];
  }
);

const handleUpdateItems = async () => {
  if (!updateForm.selectedOwnedId) return;
  if (updateForm.items.length > 4) return alert("アイテムは4つまでです。");
  isUpdating.value = true;
  try {
    // 新形式に変換して保存
    const newFormatItems = updateForm.items.map(itemId => ({
      itemId: Number(itemId),
      isVirtual: false
    }));

    await databaseService.updateCharacterItems(
      uiStore.selectedAccountId,
      updateForm.selectedOwnedId,
      newFormatItems
    );

    emit("items-updated", {
      accountId: uiStore.selectedAccountId,
      ownedCharacterId: updateForm.selectedOwnedId,
      items: newFormatItems,
    });
    alert("アイテムを更新しました。");
  } catch (e) {
    alert("エラー: " + e.message);
  } finally {
    isUpdating.value = false;
  }
};

const handleMoveItems = async () => {
  isMoving.value = true;
  try {
    const fromId = moveForm.from.selectedId;
    const toId = moveForm.to.selectedId;
    const itemIdsToMove = moveForm.selectedItemIds;

    if (fromId === toId || !fromId || !toId)
      throw new Error("有効な移動元と移動先を選択してください。");
    if (itemIdsToMove.length === 0)
      throw new Error("移動するアイテムを選択してください。");

    const fromChar = currentOwnedCharacters.value.find((c) => c.id === fromId);
    const toChar = currentOwnedCharacters.value.find((c) => c.id === toId);
    if (!fromChar || !toChar)
      throw new Error("キャラクター情報が見つかりません。");

    // 新形式に変換して実アイテムのみを取得
    const fromRealItems = getRealItems(fromChar.items || []);
    const toRealItems = getRealItems(toChar.items || []);

    if (toRealItems.length + itemIdsToMove.length > 4)
      throw new Error(`移動先のアイテム所持数が上限を超えます。`);

    // 移動後のアイテムを新形式で構築
    const newFromItems = fromRealItems
      .filter((item) => !itemIdsToMove.includes(item.itemId))
      .map(item => ({ itemId: item.itemId, isVirtual: false }));

    const newToItems = [
      ...toRealItems.map(item => ({ itemId: item.itemId, isVirtual: false })),
      ...itemIdsToMove.map(itemId => ({ itemId: Number(itemId), isVirtual: false }))
    ];

    await databaseService.moveCharacterItems(
      uiStore.selectedAccountId,
      { id: fromId, items: newFromItems },
      { id: toId, items: newToItems }
    );

    emit("items-moved", {
      accountId: uiStore.selectedAccountId,
      from: { id: fromId, items: newFromItems },
      to: { id: toId, items: newToItems },
    });

    alert("アイテムを移動しました。");
    moveForm.from.selectedId = null;
    moveForm.to.selectedId = null;
    moveForm.selectedItemIds = [];
  } catch (e) {
    alert(`エラー: ${e.message}`);
  } finally {
    isMoving.value = false;
  }
};

const formatCharForDisplay = (char, includeItems) => {
  return formatOwnedCharDisplayName(
    char,
    includeItems,
    dataStore.characterMastersMap,
    dataStore.ownedCharactersData,
    dataStore.itemMastersMap,
    uiStore.selectedAccountId
  );
};
/**
 * [概要] アイテムIDの配列から、表示用のアイテム名文字列を生成する。
 * @param {Array<number|string>} itemIds - アイテムIDの配列
 * @returns {string} カンマ区切りのアイテム名、または'アイテムなし'
 */
const formatItemNames = (items) => {
  if (!items || items.length === 0) return "アイテムなし";
  return items
    .map((item) => {
      const itemId = typeof item === 'object' ? item.itemId : item;
      const isEL = typeof item === 'object' ? item.isEL : false;
      const itemName = dataStore.itemMastersMap.get(Number(itemId))?.name || `不明(ID:${itemId})`;
      return isEL ? `${itemName}（EL）` : itemName;
    })
    .join("、 ");
};
</script>
