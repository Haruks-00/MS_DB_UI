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
                    :items="itemMasters"
                    item-title="name"
                    item-value="id"
                    label="アイテム (最大3つまで)"
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
                      updateForm.items.length > 3
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
                    v-if="updateForm.items.length > 3"
                    type="error"
                    variant="tonal"
                    class="mt-3"
                    prepend-icon="mdi-alert-circle"
                  >
                    アイテムは3つまでしか選択できません。
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
                  :items="currentOwnedCharacters"
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
                  :items="currentOwnedCharacters"
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
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { formatOwnedCharDisplayName } from "../../utils/formatters.js";
import { databaseService } from "../../services/database.js";
import CharacterSelector from "../shared/CharacterSelector.vue";

const props = defineProps({
  selectedAccountId: { type: String, default: null },
  ownedCharactersData: { type: Map, required: true },
  characterMastersMap: { type: Map, required: true },
  itemMasters: { type: Array, required: true },
  itemMastersMap: { type: Map, required: true },
});

const emit = defineEmits(["items-updated", "items-moved"]);

const updateForm = reactive({ selectedOwnedId: null, items: [] });
const moveForm = reactive({
  from: { selectedId: null },
  to: { selectedId: null },
  selectedItemIds: [],
});
const isUpdating = ref(false);
const isMoving = ref(false);

const currentOwnedCharacters = computed(() => {
  if (
    !props.selectedAccountId ||
    !props.ownedCharactersData.has(props.selectedAccountId)
  )
    return [];
  const ownedList =
    props.ownedCharactersData.get(props.selectedAccountId) || [];
  return ownedList
    .map((char) => {
      const master = props.characterMastersMap.get(char.characterMasterId);
      // NOTE: subtitleプロパティを追加して、リスト表示の柔軟性を高めます
      return {
        ...char,
        id: char.id,
        indexNumber: master?.indexNumber || 999999,
        monsterName: master?.monsterName || "不明",
      };
    })
    .sort((a, b) => a.indexNumber - b.indexNumber);
});

const movableItems = computed(() => {
  if (!moveForm.from.selectedId) return [];
  const fromChar = currentOwnedCharacters.value.find(
    (c) => c.id === moveForm.from.selectedId
  );
  if (!fromChar || !fromChar.items) return [];
  return fromChar.items.map((itemId) => ({
    id: Number(itemId),
    name: props.itemMastersMap.get(Number(itemId)) || `不明(ID:${itemId})`,
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

watch(() => props.selectedAccountId, resetForms);

watch(
  () => updateForm.selectedOwnedId,
  (newId) => {
    if (!newId) {
      updateForm.items = [];
      return;
    }
    const character = currentOwnedCharacters.value.find((c) => c.id === newId);
    updateForm.items = character?.items?.map(Number) || [];
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
  if (updateForm.items.length > 3) return alert("アイテムは3つまでです。");
  isUpdating.value = true;
  try {
    await databaseService.updateCharacterItems(
      props.selectedAccountId,
      updateForm.selectedOwnedId,
      updateForm.items
    );

    emit("items-updated", {
      accountId: props.selectedAccountId,
      ownedCharacterId: updateForm.selectedOwnedId,
      items: updateForm.items,
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

    if ((toChar.items?.length || 0) + itemIdsToMove.length > 3)
      throw new Error(`移動先のアイテム所持数が上限を超えます。`);

    const newFromItems = (fromChar.items || [])
      .map(Number)
      .filter((id) => !itemIdsToMove.includes(id));
    const newToItems = [...(toChar.items || []).map(Number), ...itemIdsToMove];

    await databaseService.moveCharacterItems(
      props.selectedAccountId,
      { id: fromId, items: newFromItems },
      { id: toId, items: newToItems }
    );

    emit("items-moved", {
      accountId: props.selectedAccountId,
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
    props.characterMastersMap,
    props.ownedCharactersData,
    props.itemMastersMap,
    props.selectedAccountId
  );
};
/**
 * [概要] アイテムIDの配列から、表示用のアイテム名文字列を生成する。
 * @param {Array<number|string>} itemIds - アイテムIDの配列
 * @returns {string} カンマ区切りのアイテム名、または'アイテムなし'
 */
const formatItemNames = (itemIds) => {
  if (!itemIds || itemIds.length === 0) return "アイテムなし";
  return itemIds
    .map((id) => props.itemMastersMap.get(Number(id))?.name || `不明(ID:${id})`)
    .join("、 ");
};
</script>
