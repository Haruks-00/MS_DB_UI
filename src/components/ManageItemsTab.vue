<template>
  <div id="tab-manage-items" class="tab-content">
    <h2>アイテム管理</h2>
    <div class="form-section">
      <h3>所持キャラクターのアイテムを変更</h3>
      <label>キャラクター検索:</label>
      <input type="text" v-model="updateForm.search " placeholder="キャラクター名で検索">
      <label for="item-char-selector">キャラクター選択:</label>
      <select id="item-char-selector" v-model="updateForm.selectedOwnedId" size="10" style="width:100%">
        <option v-for="char in manageableCharactersForUpdate" :key="char.id        " :value="char.id">
          {{ formatCharForDisplay(char, true) }}
        </option>
      </select>
      <label>アイテム (最大3つまで):</label>
      <div class="item-select-container">
        <select v-model="updateForm.items[0]">
          <option value="">(アイテムなし)</option>
          <option v-for="item in itemMasters" :key="item.id             " :value="item.id">[{{ item.id }}] {{ item.name     }}</option>
        </select>
        <select v-model="updateForm.items[1]">
          <option value="">(アイテムなし)</option>
          <option v-for="item in itemMasters" :key="item.id" :value="item.id">[{{ item.id }}] {{ item.name }}</option>
        </select>
        <select v-model="updateForm.items[2]">
          <option value="">(アイテムなし)</option>
          <option v-for="item in itemMasters" :key="item.id" :value="item.id">[{{ item.id }}] {{ item.name }}</option>
        </select>
      </div>
      <br>
      <button @click="handleUpdateItems" :disabled="!updateForm.selectedOwnedId || isUpdating">
        {{ isUpdating ? '更新中...' : 'アイテムを更新' }}
      </button>
    </div>
    <div class="form-section">
      <h3>キャラクター間でアイテムを移動</h3>
      <div style="display: flex; gap: 20px;">
        <div style="flex: 1;">
          <label>移動元キャラクター検索:</label>
          <input type="text" v-model="moveForm.from.search " placeholder="移動元の名前で検索">
          <label>移動元キャラクター選択:</label>
          <select v-model="moveForm.from.selectedId" size="8" style="width:100%;">
            <option v-for="char in manageableCharactersForMoveFrom" :key="char.id" :value="char.id">
              {{ formatCharForDisplay(char, true) }}
            </option>
          </select>
        </div>
        <div style="flex: 1;">
          <label>移動するアイテムを選択:</label>
          <div id="items-to-move-container" style="height: 180px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; background-color: #fff; margin-top: 5px;">
            <div v-if="!moveForm.from.selectedId"><small>移動元キャラクターを選択してください。</small></div>
            <div v-else-if="!movableItems.length"><small>移動できるアイテムがありません。</small></div>
            <div v-for="item in movableItems" :key="item.id">
              <input type="checkbox" :id="'item-move-' + item.id" :value="item.id" v-model="moveForm.selectedItemIds">
              <label :for="'item-move-' + item.id">{{ item.name }}</label>
            </div>
          </div>
        </div>
        <div style="flex: 1;">
          <label>移動先キャラクター検索:</label>
          <input type="text" v-model="moveForm.to  .search " placeholder="移動先の名前で検索">
          <label>移動先キャラクター選択:</label>
          <select v-model="moveForm.to.selectedId" size="8" style="width:100%;">
            <option v-for="char in manageableCharactersForMoveTo" :key="char.id" :value="char.id">
              {{ formatCharForDisplay(char, true) }}
            </option>
          </select>
        </div>
      </div>
      <br>
      <button @click="handleMoveItems" :disabled="!moveForm.from.selectedId || !moveForm.to.selectedId || moveForm.selectedItemIds.length === 0 || isMoving">
        {{ isMoving ? '移動中...' : '選択したアイテムを移動' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { formatOwnedCharDisplayName } from '../utils/formatters.js';
import { databaseService } from '../services/database.js';

const props = defineProps({
  selectedAccountId: { type: String, default: null },
  ownedCharactersData: { type: Map, required: true },
  characterMastersMap: { type: Map, required: true },
  itemMasters: { type: Array, required: true },
  itemMastersMap: { type: Map, required: true },
});

const emit = defineEmits(['items-updated', 'items-moved']);

// INFO: 2つのフォームの状態をそれぞれ `reactive` で管理します
const updateForm = reactive({ search: '', selectedOwnedId: null, items: ["", "", ""] });
const moveForm = reactive({ from: { search: '', selectedId: null }, to: { search: '', selectedId: null }, selectedItemIds: [] });
const isUpdating = ref(false);
const isMoving = ref(false);

const currentOwnedCharacters = computed(() => {
  if (!props.selectedAccountId || !props.ownedCharactersData.has(props.selectedAccountId)) return [];
  const ownedList = props.ownedCharactersData.get(props.selectedAccountId) || [];
  return ownedList.map (char => {
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

const resetForms = () => {
    Object.assign(updateForm, { search: '', selectedOwnedId: null, items: ["", "", ""] });
    Object.assign(moveForm, { from: { search: '', selectedId: null }, to: { search: '', selectedId: null }, selectedItemIds: [] });
};

watch(() => props.selectedAccountId, resetForms);

watch(() => updateForm.selectedOwnedId, (newId) => {
  if (!newId) {
    updateForm.items = ["", "", ""];
    return;
  }
  const character = currentOwnedCharacters.value.find(c => c.id === newId);
  if (character && character.items) {
    const itemIds = character.items.map (String);
    updateForm.items = [itemIds[0] || "", itemIds[1] || "", itemIds[2] || ""];
  } else {
    updateForm.items = ["", "", ""];
  }
});

watch(() => moveForm.from.selectedId, () => {
  moveForm.selectedItemIds = [];
});

const handleUpdateItems = async () => {
  if (!updateForm.selectedOwnedId) return;
  isUpdating.value = true;
  try {
    const itemsToUpdate = updateForm.items.filter(Boolean).map(Number);
    await databaseService.updateCharacterItems(props.selectedAccountId, updateForm.selectedOwnedId, itemsToUpdate);
    
    emit('items-updated', {
      accountId: props.selectedAccountId,
      ownedCharacterId: updateForm.selectedOwnedId,
      items: itemsToUpdate,
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
    const itemIdsToMove = moveForm.selectedItemIds.map (Number);

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