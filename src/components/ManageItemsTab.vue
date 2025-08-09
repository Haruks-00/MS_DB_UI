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

<script>
import { formatOwnedCharDisplayName } from '../utils/formatters.js';
import { databaseService } from '../services/database.js';

/**
 * [概要] アイテムの変更・移動を行うタブUIコンポーネント。
 * @note 状態管理とDB更新ロジックを自己完結させ、結果を親に通知する責務を持つ。
 */
export default {
  name: 'ManageItemsTab',
  props: {
    selectedAccountId: { type: String, default: null },
    ownedCharactersData: { type: Map, required: true },
    characterMastersMap: { type: Map, required: true },
    itemMasters: { type: Array, required: true },
    itemMastersMap: { type: Map, required: true },
  },

  data() {
    return {
      updateForm: { search: '', selectedOwnedId: null, items: ["", "", ""] },
      moveForm: { from: { search: '', selectedId: null }, to: { search: '', selectedId: null }, selectedItemIds: [] },
      isUpdating: false,
      isMoving: false,
    };
  },

  computed: {
    /**
     * [概要] 現在選択中のアカウントが所持するキャラクターのリストを返す
     * @returns {Array} 所持キャラクターオブジェクトの配列
     */
    currentOwnedCharacters() {
      if (!this.selectedAccountId || !this.ownedCharactersData.has(this.selectedAccountId)) return [];
      const ownedList = this.ownedCharactersData.get(this.selectedAccountId) || [];
      return ownedList.map  (char => {
        const master = this.characterMastersMap.get(char.characterMasterId);
        return { ...char, indexNumber: master?.indexNumber || 999999, monsterName: master?.monsterName || '不明' };
      }).sort((a, b) => a.indexNumber - b.indexNumber);
    },
    manageableCharactersForUpdate() {
      const lowerSearch = this.updateForm.search .toLowerCase();
      return this.currentOwnedCharacters.filter(char => !lowerSearch || char.monsterName.toLowerCase().includes(lowerSearch));
    },
    manageableCharactersForMoveFrom() {
      const lowerSearch = this.moveForm.from.search .toLowerCase();
      return this.currentOwnedCharacters.filter(char => (!lowerSearch || char.monsterName.toLowerCase().includes(lowerSearch)) && char.id !== this.moveForm.to  .selectedId);
    },
    manageableCharactersForMoveTo() {
      const lowerSearch = this.moveForm.to.search .toLowerCase();
      return this.currentOwnedCharacters.filter(char => (!lowerSearch || char.monsterName.toLowerCase().includes(lowerSearch)) && char.id !== this.moveForm.from.selectedId);
    },
    movableItems() {
      if (!this.moveForm.from.selectedId) return [];
      const fromChar = this.currentOwnedCharacters.find(c => c.id === this.moveForm.from.selectedId);
      if (!fromChar || !fromChar.items) return [];
      return fromChar.items.map (itemId => ({ id: Number(itemId), name: this.itemMastersMap.get(Number(itemId)) || `不明(ID:${itemId})` }));
    },
  },

  watch: {
    selectedAccountId() {
      // INFO: アカウントが切り替わったらフォームをリセットする
      this.updateForm = { search: '', selectedOwnedId: null, items: ["", "", ""] };
      this.moveForm = { from: { search: '', selectedId: null }, to: { search: '', selectedId: null }, selectedItemIds: [] };
    },
    'updateForm.selectedOwnedId'(newId) {
      if (!newId) {
        this.updateForm.items = ["", "", ""];
        return;
      }
      const character = this.currentOwnedCharacters.find(c => c.id === newId);
      if (character && character.items) {
        const itemIds = character.items.map (String);
        this.updateForm.items = [itemIds[0] || "", itemIds[1] || "", itemIds[2] || ""];
      } else {
        this.updateForm.items = ["", "", ""];
      }
    },
    'moveForm.from.selectedId'() {
      this.moveForm.selectedItemIds = [];
    },
  },

  methods: {
    async handleUpdateItems() {
      if (!this.updateForm.selectedOwnedId) return;
      this.isUpdating = true;
      try {
        const itemsToUpdate = this.updateForm.items.filter(Boolean).map(Number);
        await databaseService.updateCharacterItems(this.selectedAccountId, this.updateForm.selectedOwnedId, itemsToUpdate);
        
        // NOTE: DB更新成功後、親にローカルデータ更新を依頼
        this.$emit('items-updated', {
          accountId: this.selectedAccountId,
        ownedCharacterId: this.updateForm.selectedOwnedId,
          items: itemsToUpdate,
        });
        alert('アイテムを更新しました。');
      } catch (e) {
        alert('エラー: ' + e.message);
      } finally {
        this.isUpdating = false;
      }
    },
    
    async handleMoveItems() {
      this.isMoving = true;
      try {
        const fromId = this.moveForm.from.selectedId;
        const toId = this.moveForm.to.selectedId;
        const itemIdsToMove = this.moveForm.selectedItemIds.map (Number);

        if (fromId === toId || !fromId || !toId) throw new Error('有効な移動元と移動先を選択してください。');
        if (itemIdsToMove.length === 0) throw new Error('移動するアイテムを選択してください。');
        
        const fromChar = this.currentOwnedCharacters.find(c => c.id === fromId);
        const toChar = this.currentOwnedCharacters.find(c => c.id === toId);
        if (!fromChar || !toChar) throw new Error('キャラクター情報が見つかりません。');
        
        if ((toChar.items?.length || 0) + itemIdsToMove.length > 3) throw new Error(`移動先のアイテム所持数が上限を超えます。`);
        
        const newFromItems = (fromChar.items || []).map(Number).filter(id => !itemIdsToMove.includes(id));
        const newToItems = [...(toChar.items || []).map(Number), ...itemIdsToMove];
        
        await databaseService.moveCharacterItems(this.selectedAccountId, { id: fromId, items: newFromItems }, { id: toId, items: newToItems });

        // NOTE: DB更新成功後、親にローカルデータ更新を依頼
        this.$emit('items-moved', {
            accountId: this.selectedAccountId,
            from: { id: fromId, items: newFromItems },
            to: { id: toId, items: newToItems },
        });

        alert('アイテムを移動しました。');
        // INFO: フォームをリセットして次の操作に備える
        this.moveForm.from.selectedId = null;
        this.moveForm.to.selectedId = null;
        this.moveForm.selectedItemIds = [];

      } catch (e) {
        alert(`エラー: ${e.message}`);
      } finally {
        this.isMoving = false;
      }
    },
    
    formatCharForDisplay(char, includeItems) {
      // INFO: テンプレートから直接呼び出すために、thisのコンテキストを渡すラッパーを用意
      return formatOwnedCharDisplayName(char, includeItems, this.characterMastersMap, this.ownedCharactersData, this.itemMastersMap, this.selectedAccountId);
    },
  }
}
</script>