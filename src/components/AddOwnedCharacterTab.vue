<template>
  <div id="tab-add-owned" class="tab-content">
    <h2>所持キャラ追加</h2>
    <div class="form-section">
      <label>キャラクター検索:</label>
      <input type="text" v-model="search" placeholder="キャラクター名で検索">
      <label for="addable-char-selector">追加可能なキャラクター:</label>
      <select id="addable-char-selector" v-model="selectedMasterId" size="15" style="width:100%">
        <option v-for="master in addableCharacters" :key="master.id                " :value="master.id">
          [{{ master.indexNumber || '?' }}] {{ master.monsterName }} ({{ getOwnedCountForMaster(master.id) }}/2 所持)
        </option>
      </select>
      <br><br>
      <button @click="handleAddCharacter" :disabled="!selectedMasterId || isAdding">
        {{ isAdding ? '追加中...' : 'このキャラクターを所持リストに追加' }}
      </button>
    </div>
  </div>
</template>

<script>
/**
 * [概要] 所持キャラクターを追加するためのタブUIコンポーネント。
 * @note 親コンポーネントからキャラクターマスターやアカウント情報を受け取り、
 *       キャラクター追加のイベントを親に通知する責務を持つ。
 */
export default {
  // #region COMPONENT_CONFIG
  name: 'AddOwnedCharacterTab',
  props: {
    /**
     * @property {Array} characterMasters - 全キャラクターマスターのリスト
     */
    characterMasters: {
      type: Array,
      required: true,
    },
    /**
     * @property {String} selectedAccountId - 現在選択されているアカウントID
     */
    selectedAccountId: {
      type: String,
      default: null,
    },
    /**
     * @property {Map<string, number>} ownedCountMap - 'masterId-accountId'をキーとする所持数マップ
     */
    ownedCountMap: {
      type: Map,
      required: true,
    },
    /**
     * @property {Boolean} isAdding - 追加処理が実行中かどうかのフラグ
     */
    isAdding: {
      type: Boolean,
      default: false,
    }
  },
  
  data() {
    return {
      /** @type {string} 検索用の文字列 */
      search: '',
      /** @type {string | null} 選択されたキャラクターマスターID */
      selectedMasterId: null,
    }
  },
  
  computed: {
    /**
     * [概要] 検索条件と所持状況に基づき、追加可能なキャラクターのリストを返す。
     * @returns {Array} 追加可能なキャラクターの配列
     */
    addableCharacters() {
      // INFO: アカウントが選択されていない場合は空リストを返す
      if (!this.selectedAccountId) return [];

      const lowerSearch = this.search .toLowerCase();
      return this.characterMasters.filter(master => {
        const isNotFull = this.getOwnedCountForMaster(master.id) < 2;
        const matchesSearch = !lowerSearch || master.monsterName.toLowerCase().includes(lowerSearch);
        return isNotFull && matchesSearch;
      });
    },
  },

  watch: {
    /**
     * INFO: 選択中のアカウントが変更されたら、選択中のキャラをリセットする。
     */
    selectedAccountId() {
      this.selectedMasterId = null;
    }
  },
  
  methods: {
    /**
     * [概要] 特定マスターIDの所持数を返す
     * @param {string} masterId - キャラクターマスターID
     * @returns {number} 所持数
     */
    getOwnedCountForMaster(masterId) {
      if (!this.selectedAccountId) return 0;
      return this.ownedCountMap.get(`${masterId}-${this.selectedAccountId}`) || 0;
    },

    /**
     * [概要] キャラクター追加ボタンがクリックされた時の処理。
     * @note 実際の追加処理は親に委譲するため、イベントを発行する。
     */
    handleAddCharacter() {
      this.$emit('add-character', this.selectedMasterId);
    }
  } 
}
</script>
