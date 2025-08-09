<template>
  <div id="tab-add-owned" class="tab-content">
    <h2>所持キャラクター追加</h2>
    <div class="form-section">
      <label>キャラクター検索:</label>
      <input type="text" v-model="search" placeholder="キャラクター名で検索">
      <label for="addable-char-selector">追加可能なキャラクター:</label>
      <select id="addable-char-selector" v-model="selectedMasterId" size="15" style="width:100%">
        <option v-for="master in addableCharacters" :key="master.id" :value="master.id">
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
import firebase from 'firebase/compat/app';
import { databaseService } from '../services/database.js';

/**
 * [概要] 所持キャラクターを追加するためのタブUIコンポーネント。
 * @note 状態管理とDB追加ロジックを自己完結させ、結果を親に通知する責務を持つ。
 */
export default {
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
     * @property {Map<string, Object>} characterMastersMap - 高速検索用のキャラクターマスターMap
     */
    characterMastersMap: {
      type: Map,
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
  },

  data() {
    return {
      /** @type {string} 検索用の文字列 */
      search: '',
      /** @type {string | null} 選択されたキャラクターマスターID */
      selectedMasterId: null,
      /** @type {boolean} 追加処理が実行中かどうかのフラグ（内部管理） */
      isAdding: false,
    };
  },

  computed: {
    /**
     * [概要] 検索条件と所持状況に基づき、追加可能なキャラクターのリストを返す。
     * @returns {Array<Object>} 追加可能なキャラクターの配列
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
     * [概要] 選択中のアカウントが変更されたら、選択中のキャラをリセットする。
     * @note ユーザーがアカウントを切り替えた際の意図しない追加を防ぐ。
     */
    selectedAccountId() {
      this.selectedMasterId = null;
    }
  },
  
  methods: {
    /**
     * [概要] 特定マスターIDの所持数を返すヘルパー関数。
     * @param {string} masterId - キャラクターマスターID
     * @returns {number} 所持数
     */
    getOwnedCountForMaster(masterId) {
      if (!this.selectedAccountId) return 0;
      return this.ownedCountMap.get(`${masterId}-${this.selectedAccountId}`) || 0;
    },

    /**
     * [概要] キャラクター追加ボタンがクリックされた際の処理。
     * @note DBへのキャラクター追加処理を呼び出し、完了後に親へ通知する。
     */
    async handleAddCharacter() {
      if (!this.selectedMasterId || !this.selectedAccountId) return alert('追加するキャラとアカウントを選択してください。');
      // NOTE: 算出プロパティではなく、このメソッド内でも明示的にチェックする
      if (this.getOwnedCountForMaster(this.selectedMasterId) >= 2) return alert('このキャラは既に2体所持しています。');
      
      this.isAdding = true;
      try {
        const master = this.characterMastersMap.get(this.selectedMasterId);
        if (!master) throw new Error('キャラのマスター情報が見つかりません。');
        
        const newOwnedCharData = {
          characterMasterId: this.selectedMasterId,
          monsterName: master.monsterName,
          items: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };

        // INFO: DBサービスを呼び出してキャラクターを追加
        const docRef = await databaseService.addOwnedCharacter(this.selectedAccountId, newOwnedCharData);
        
        // NOTE: DB追加後、ローカル状態を即時反映させるため、新しいキャラクターデータを親コンポーネントに通知する
        const newLocalChar = { ...newOwnedCharData, id: docRef.id , createdAt: { toDate: () => new Date() } };
        this.$emit('character-added', { accountId: this.selectedAccountId, newCharacter: newLocalChar });

        alert(`「${master.monsterName}」を所持リストに追加しました。`);
        this.selectedMasterId = null; // INFO: 追加後は選択をリセット
      } catch (error) {
        console.error('キャラ追加失敗:', error);
        alert('エラー: ' + error.message);
      } finally {
        this.isAdding = false;
      }
    }
  },
};
</script>