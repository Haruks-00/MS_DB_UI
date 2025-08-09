<template>
  <div>
    <h2>アイテム管理</h2>
    <v-form>
      <v-card variant="outlined" class="mb-5">
        <v-card-title>所持キャラクターのアイテムを変更</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="updateForm.search  " label="キャラクター検索" variant="outlined" clearable prepend-inner-icon="mdi-magnify"></v-text-field>
                <v-card variant="outlined">
                  <v-list v-model:selected="updateSelectedIdProxy" style="height: 300px; overflow-y: auto;">
                    <v-list-item v-for="char in manageableCharactersForUpdate" :key="char.id        " :value="char.id">
                      <v-list-item-title>{{ formatCharForDisplay(char, false) }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
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
                  :disabled="!updateForm.selectedOwnedId || isUpdating || updateForm.items.length > 3"
                  @click="handleUpdateItems"
                  color="primary"
                  block
                  size="large"
                >
                  アイテムを更新
                </v-btn>
                <v-alert v-if="updateForm.items.length > 3" type="error" dense class="mt-2">アイテムは3つまでしか選択できません。</v-alert>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>

      <v-card variant="outlined">
        <v-card-title>キャラクター間でアイテムを移動</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- From Column -->
              <v-col cols="12" md="4">
                <v-text-field v-model="moveForm.from.search  " label="移動元キャラクター検索" variant="outlined" clearable prepend-inner-icon="mdi-magnify"></v-text-field>
                <v-card variant="outlined">
                  <v-list v-model:selected="moveFromSelectedIdProxy" style="height: 250px; overflow-y: auto;">
                    <v-list-item v-for="char in manageableCharactersForMoveFrom" :key="char.id" :value="char.id">
                      <v-list-item-title>{{ formatCharForDisplay(char, false) }}</v-list-item-title>
                      <v-list-item-subtitle>アイテム数: {{ char.items?.length || 0 }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
              <!-- Items Column -->
              <v-col cols="12" md="4">
                <p class="font-weight-bold mb-2">移動するアイテムを選択:</p>
                <v-card variant="outlined" style="height: 318px; overflow-y: auto;">
                  <v-card-text>
            <div v-if="!moveForm.from.selectedId"><small>移動元キャラクターを選択してください。</small></div>
            <div v-else-if="!movableItems.length"><small>移動できるアイテムがありません。</small></div>
                    <v-checkbox v-for="item in movableItems" :key="item.id  " v-model="moveForm.selectedItemIds" :label="item.name " :value="item.id" dense hide-details></v-checkbox>
                  </v-card-text>
                </v-card>
              </v-col>
              <!-- To Column -->
              <v-col cols="12" md="4">
                <v-text-field v-model="moveForm.to       .search " label="移動先キャラクター検索" variant="outlined" clearable prepend-inner-icon="mdi-magnify"></v-text-field>
                <v-card variant="outlined">
                  <v-list v-model:selected="moveToSelectedIdProxy" style="height: 250px; overflow-y: auto;">
                    <v-list-item v-for="char in manageableCharactersForMoveTo" :key="char.id" :value="char.id">
                      <v-list-item-title>{{ formatCharForDisplay(char, false) }}</v-list-item-title>
                      <v-list-item-subtitle>アイテム数: {{ char.items?.length || 0 }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  :loading="isMoving"
                  :disabled="!moveForm.from.selectedId || !moveForm.to.selectedId || moveForm.selectedItemIds.length === 0 || isMoving"
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
import { ref, reactive, computed, watch } from 'vue';
import { formatOwnedCharDisplayName } from '../../utils/formatters.js';
import { databaseService } from '../../services/database.js';

const props = defineProps({
  selectedAccountId: { type: String, default: null },
  ownedCharactersData: { type: Map, required: true },
  characterMastersMap: { type: Map, required: true },
  itemMasters: { type: Array, required: true },
  itemMastersMap: { type: Map, required: true },
});

const emit = defineEmits(['items-updated', 'items-moved']);

// NOTE: updateForm.itemsを配列に変更し、v-select(multiple)に対応させます
const updateForm = reactive({ search: '', selectedOwnedId: null, items: [] });
const moveForm = reactive({ from: { search: '', selectedId: null }, to: { search: '', selectedId: null }, selectedItemIds: [] });
const isUpdating = ref(false);
const isMoving = ref(false);

const currentOwnedCharacters = computed(() => {
  if (!props.selectedAccountId || !props.ownedCharactersData.has(props.selectedAccountId)) return [];
  const ownedList = props.ownedCharactersData.get(props.selectedAccountId) || [];
  return ownedList.map  (char => {
    const master = props.characterMastersMap.get(char.characterMasterId);
    return { ...char, indexNumber: master?.indexNumber || 999999, monsterName: master?.monsterName || '不明' };
  }).sort((a, b) => a.indexNumber - b.indexNumber);
});

const manageableCharactersForUpdate = computed(() => {
  const lowerSearch = updateForm.search.toLowerCase();
  return currentOwnedCharacters.value.filter(char => !lowerSearch || char.monsterName.toLowerCase().includes(lowerSearch));
});

const manageableCharactersForMoveFrom = computed(() => {
  const lowerSearch = moveForm.from.search.toLowerCase();
  return currentOwnedCharacters.value.filter(char => 
    (!lowerSearch || char.monsterName.toLowerCase().includes(lowerSearch)) && char.id !== moveForm.to.selectedId
  );
});

const manageableCharactersForMoveTo = computed(() => {
  const lowerSearch = moveForm.to.search .toLowerCase();
  return currentOwnedCharacters.value.filter(char => 
    (!lowerSearch || char.monsterName.toLowerCase().includes(lowerSearch)) && char.id !== moveForm.from.selectedId
  );
});

const movableItems = computed(() => {
  if (!moveForm.from.selectedId) return [];
  const fromChar = currentOwnedCharacters.value.find(c => c.id     === moveForm.from.selectedId);
  if (!fromChar || !fromChar.items) return [];
  return fromChar.items.map (itemId => ({ id: Number(itemId), name: props.itemMastersMap.get(Number(itemId)) || `不明(ID:${itemId})` }));
});

const updateSelectedIdProxy = computed({
  get: () => updateForm.selectedOwnedId ? [updateForm.selectedOwnedId] : [],
  set: (val) => { updateForm.selectedOwnedId = val[0] || null; }
});
const moveFromSelectedIdProxy = computed({
  get: () => moveForm.from.selectedId ? [moveForm.from.selectedId] : [],
  set: (val) => { moveForm.from.selectedId = val[0] || null; }
});
const moveToSelectedIdProxy = computed({
  get: () => moveForm.to.selectedId ? [moveForm.to.selectedId] : [],
  set: (val) => { moveForm.to.selectedId = val[0] || null; }
});

const resetForms = () => {
    Object.assign(updateForm, { search: '', selectedOwnedId: null, items: [] });
    Object.assign(moveForm, { from: { search: '', selectedId: null }, to: { search: '', selectedId: null }, selectedItemIds: [] });
};

watch(() => props.selectedAccountId, resetForms);

watch(() => updateForm.selectedOwnedId, (newId) => {
  if (!newId) {
    updateForm.items = [];
    return;
  }
  const character = currentOwnedCharacters.value.find(c => c.id === newId);
  // INFO: アイテムIDを文字列から数値に変換してv-modelにセットします
  updateForm.items = character?.items?.map(Number) || [];
});

watch(() => moveForm.from.selectedId, () => {
  moveForm.selectedItemIds = [];
});

const handleUpdateItems = async () => {
  if (!updateForm.selectedOwnedId) return;
  if (updateForm.items.length > 3) return alert('アイテムは3つまでです。');
  isUpdating.value = true;
  try {
    // INFO: v-selectから得られる値は既に数値の配列なので、そのまま利用できます
    await databaseService.updateCharacterItems(props.selectedAccountId, updateForm.selectedOwnedId, updateForm.items);
    
    emit('items-updated', {
      accountId: props.selectedAccountId,
      ownedCharacterId: updateForm.selectedOwnedId,
      items: updateForm.items,
    });
    alert('アイテムを更新しました。');
  } catch (e) {
    alert('エラー: ' + e.message);
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

    if (fromId === toId || !fromId || !toId) throw new Error('有効な移動元と移動先を選択してください。');
    if (itemIdsToMove.length === 0) throw new Error('移動するアイテムを選択してください。');
    
    const fromChar = currentOwnedCharacters.value.find(c => c.id === fromId);
    const toChar = currentOwnedCharacters.value.find(c => c.id === toId);
    if (!fromChar || !toChar) throw new Error('キャラクター情報が見つかりません。');
    
    if ((toChar.items?.length || 0) + itemIdsToMove.length > 3) throw new Error(`移動先のアイテム所持数が上限を超えます。`);
    
    const newFromItems = (fromChar.items || []).map(Number).filter(id => !itemIdsToMove.includes(id));
    const newToItems = [...(toChar.items || []).map(Number), ...itemIdsToMove];
    
    await databaseService.moveCharacterItems(props.selectedAccountId, { id: fromId, items: newFromItems }, { id: toId, items: newToItems });

    emit('items-moved', {
      accountId: props.selectedAccountId,
      from: { id: fromId, items: newFromItems },
      to: { id: toId, items: newToItems },
    });

    alert('アイテムを移動しました。');
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
  return formatOwnedCharDisplayName(char, includeItems, props.characterMastersMap, props.ownedCharactersData, props.itemMastersMap, props.selectedAccountId);
};
</script>