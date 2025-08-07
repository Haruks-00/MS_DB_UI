<template>
  <div id="tab-manage-items" class="tab-content">
    <h2>アイテム管理</h2>
    <div class="form-section">
      <h3>所持キャラクターのアイテムを変更</h3>
      <label>キャラクター検索:</label>
      <input type="text" v-model="updateForm.search " placeholder="キャラクター名で検索">
      <label for="item-char-selector">キャラクター選択:</label>
      <select id="item-char-selector" v-model="updateForm.selectedOwnedId" size="10" style="width:100%">
        <option v-for="char in manageableCharactersForUpdate" :key="char.id              " :value="char.id">
          {{ formatOwnedCharDisplayName(char, true) }}
        </option>
      </select>
      <label>アイテム (最大3つまで):</label>
      <div class="item-select-container">
        <select v-model="updateForm.items[0]">
          <option value="">(アイテムなし)</option>
          <option v-for="item in itemMasters" :key="item.id                 " :value="item.id">[{{ item.id }}] {{ item.name       }}</option>
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
              {{ formatOwnedCharDisplayName(char, true) }}
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
              {{ formatOwnedCharDisplayName(char, true) }}
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
/**
 * [概要] アイテムの変更・移動を行うタブUIコンポーネント。
 * @note 親からデータを受け取り、UIの状態管理に責務を持つ。DB更新は親に通知する。
 */
export default {
  name: 'ManageItemsTab',
  props: {
    selectedAccountId: { type: String, default: null },
    ownedCharactersData: { type: Map, required: true },
    characterMastersMap: { type: Map, required: true },
    itemMasters: { type: Array, required: true },
    itemMastersMap: { type: Map, required: true },
    isUpdating: { type: Boolean, default: false },
    isMoving: { type: Boolean, default: false },
  },

  data() {
    return {
      updateForm: {
        search: '',
        selectedOwnedId: null,
        items: ["", "", ""],
      },
      moveForm: {
        from: { search: '', selectedId: null },
        to: { search: '', selectedId: null },
        selectedItemIds: [],
      },
    }
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
      const fromChar = this.currentOwnedCharacters.find(c => c.id         === this.moveForm.from.selectedId);
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
    /**
     * [概要] 親コンポーネントにアイテム更新イベントを通知する
     */
    handleUpdateItems() {
      this.$emit('update-items', {
        ownedCharacterId: this.updateForm.selectedOwnedId,
        items: this.updateForm.items.filter(Boolean).map(Number)
      });
    },
    /**
     * [概要] 親コンポーネントにアイテム移動イベントを通知する
     */
    handleMoveItems() {
      this.$emit('move-items', {
        from: { id: this.moveForm.from.selectedId },
        to: { id: this.moveForm.to.selectedId },
        selectedItemIds: this.moveForm.selectedItemIds,
      });
    },

    /**
     * [概要] 所持キャラクターの表示名をフォーマットする
     * @param {Object} char - 所持キャラクターオブジェクト
     * @param {boolean} includeItems - アイテム情報を含めるか
     * @returns {string} フォーマットされた表示名
     * @note App.vueにも同じメソッドが存在する。本来は共通化すべきだが、リファクタリングの段階的措置としてコピーを許容。
     */
    formatOwnedCharDisplayName(char, includeItems = false) {
      const master = this.characterMastersMap.get(char.characterMasterId);
      const charName = master ? master.monsterName : '不明';
      let targetAccountId = char.accountId || this.selectedAccountId;
      if (!targetAccountId) return `${charName} (アカウント不明)`;
      const sameMasterChars = (this.ownedCharactersData.get(targetAccountId) || []).filter(c => c.characterMasterId === char.characterMasterId);
      const charIndex = sameMasterChars.findIndex(c => c.id === char.id);
      let text = `${charName} (${charIndex >= 0 ? charIndex + 1 : '？'}体目)`;
      if (includeItems) {
        text += ` [${(char.items || []).map(id => this.itemMastersMap.get(Number(id))).filter(Boolean).join(', ') || 'アイテムなし'}]`;
      }
      return text;
    },
  }
}
</script>