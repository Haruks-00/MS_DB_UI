<template>
  <div>
    <h2 class="mb-4">アイテム管理</h2>
    <v-form>
      <v-card variant="outlined" class="mb-5">
        <v-card-title>所持キャラクターのアイテムを変更</v-card-title>
        <v-card-text class="pa-md-4">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <!-- NOTE: 検索フィールドとリストがCharacterSelectorに置き換わりました -->
                <CharacterSelector
                  v-model="updateForm.selectedOwnedId"
                  :items="currentOwnedCharacters"
                  label="変更対象のキャラクターを検索"
                  list-height="300px"
                >
                  <template #item="{ item }">
                    <v-list-item-title>{{
                      formatCharForDisplay(item, true)
                    }}</v-list-item-title>
                  </template>
                </CharacterSelector>
              </v-col>
              <v-col cols="12" md="6">
                <!-- INFO: 3つのselectを、単一のv-select(multiple)に統合し、UIを改善します -->
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
                ></v-select>
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
                >
                  アイテムを更新
                </v-btn>
                <v-alert
                  v-if="updateForm.items.length > 3"
                  type="error"
                  dense
                  class="mt-2"
                  >アイテムは3つまでしか選択できません。</v-alert
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>

      <v-card variant="outlined">
        <v-card-title>キャラクター間でアイテムを移動</v-card-title>
        <v-card-text class="pa-md-4">
          <v-container>
            <v-row>
              <!-- From Column -->
              <v-col cols="12" md="4">
                <h6 class="text-subtitle-1 mb-2">移動元</h6>
                <CharacterSelector
                  v-model="moveForm.from.selectedId"
                  :items="currentOwnedCharacters"
                  label="移動元キャラクターを検索"
                  list-height="250px"
                  :disabled-items="[moveForm.to.selectedId].filter(Boolean)"
                >
                  <template #item="{ item }">
                    <v-list-item-title>{{
                      formatCharForDisplay(item, true)
                    }}</v-list-item-title>
                  </template>
                </CharacterSelector>
              </v-col>
              <!-- Items Column -->
              <v-col cols="12" md="4">
                <h6 class="text-subtitle-1 mb-2">移動するアイテム</h6>
                <v-card
                  variant="outlined"
                  style="height: 318px; overflow-y: auto"
                >
                  <v-card-text>
                    <div v-if="!moveForm.from.selectedId">
                      <small>移動元キャラクターを選択してください。</small>
                    </div>
                    <div v-else-if="!movableItems.length">
                      <small>移動できるアイテムがありません。</small>
                    </div>
                    <v-checkbox
                      v-for="item in movableItems"
                      :key="item.id"
                      v-model="moveForm.selectedItemIds"
                      :label="item.name"
                      :value="item.id"
                      dense
                      hide-details
                    ></v-checkbox>
                  </v-card-text>
                </v-card>
              </v-col>
              <!-- To Column -->
              <v-col cols="12" md="4">
                <h6 class="text-subtitle-1 mb-2">移動先</h6>
                <CharacterSelector
                  v-model="moveForm.to.selectedId"
                  :items="currentOwnedCharacters"
                  label="移動先キャラクターを検索"
                  list-height="250px"
                  :disabled-items="[moveForm.from.selectedId].filter(Boolean)"
                >
                  <template #item="{ item }">
                    <v-list-item-title>{{
                      formatCharForDisplay(item, true)
                    }}</v-list-item-title>
                  </template>
                </CharacterSelector>
              </v-col>
            </v-row>
            <v-row class="mt-2">
              <v-col>
                <v-btn
                  :loading="isMoving"
                  :disabled="
                    !moveForm.from.selectedId ||
                    !moveForm.to.selectedId ||
                    moveForm.selectedItemIds.length === 0 ||
                    isMoving
                  "
                  @click="handleMoveItems"
                  color="secondary"
                  block
                  size="large"
                >
                  選択したアイテムを移動
                </v-btn>
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
