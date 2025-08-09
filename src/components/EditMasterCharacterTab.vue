<template>
  <div id="tab-edit-master" class="tab-content">
    <h2>キャラクターマスター編集</h2>
    <div class="form-section">
        <label>キャラクター検索:</label>
        <input type="text" v-model="form.search " placeholder="編集したいキャラクター名で検索">
        <label>編集するキャラクターを選択:</label>
        <select v-model="form.selectedMasterId" size="10" style="width:100%">
          <option v-for="master in editableMasters" :key="master.id  " :value="master.id">
            [{{ master.indexNumber || '?' }}] {{ master.monsterName }}
          </option>
        </select>
    </div>
    <div class="form-section" v-if="form.selectedMasterId">
      <h3>編集フォーム</h3>
      <label>図鑑番号:</label>
      <input type="number" v-model.number="form.no " placeholder="例: 1234">
      <label>キャラクター名:</label>
      <input type="text" v-model.trim="form.name " required>
      <label>属性:</label>
      <input type="text" v-model.trim="form.element">
      <label>分類:</label>
      <input type="text" v-model.trim="form.type">
      <label>排出ガチャ (限定の場合):</label>
      <select v-model="form.gacha">
        <option value="">(限定ではない/その他)</option>
        <option v-for="gacha in gachaMasters" :key="gacha.id   " :value="gacha.name  ">{{ gacha.name }}</option>
      </select>
      <br><br>
      <button @click="handleUpdateMaster" :disabled="!form.selectedMasterId || isUpdating">
        {{ isUpdating ? '更新中...' : 'マスター情報を更新' }}
      </button>
    </div>
  </div>
</template>

<script>
import { databaseService } from '../services/database.js';

/**
 * [概要] キャラクターマスターを編集するためのフォームUIコンポーネント。
 * @note 状態管理とDB更新ロジックを自己完結させ、結果を親に通知する責務を持つ。
 */
export default {
  name: 'EditMasterCharacterTab',
  props: {
    characterMasters: { type: Array, required: true },
    gachaMasters: { type: Array, required: true },
  },

  data() {
    return {
      /** @type {Object} フォームの検索、選択、入力データを保持するオブジェクト */
      form: {
        search: '',
        selectedMasterId: null,
        no: '',
        name: '',
        element: '',
        type: '',
        gacha: '',
      },
      isUpdating: false,
    };
  },
  
  computed: {
    /**
     * [概要] 検索文字列に基づいて編集可能なマスターリストをフィルタリングする。
     * @returns {Array<Object>} フィルタリングされたキャラクターマスターの配列
     */
    editableMasters() {
      if (!this.characterMasters.length) return [];
      const lowerSearch = this.form.search .toLowerCase();
      return this.characterMasters.filter(master => !lowerSearch || master.monsterName.toLowerCase().includes(lowerSearch));
    },
    /**
     * [概要] IDによる高速アクセスのため、マスターリストをMap形式に変換する。
     * @returns {Map<string, Object>} キャラクターマスターIDをキーとするMap
     */
    characterMastersMap() {
      return new Map(this.characterMasters.map  (m => [m.id  , m]));
    }
  },

  watch: {
    /**
     * [概要] 選択されたマスターIDが変更された際にフォームを更新する。
     * @param {string | null} newId - 新しく選択されたマスターID
     */
    'form.selectedMasterId'(newId) {
      if (!newId) {
        // INFO: 選択が解除されたらフォームをリセット
        Object.assign(this.form, { name: '', no: '', element: '', type: '', gacha: '' });
        return;
      }
      const master = this.characterMastersMap.get(newId);
      if (master) {
        Object.assign(this.form, {
          name: master.monsterName,
          no: master.indexNumber,
          element: master.element,
          type: master.type,
          gacha: master.ejectionGacha
        });
      }
    },
  },

  methods: {
    async handleUpdateMaster() {
      if (!this.form.selectedMasterId || !this.form.name  ) return alert('キャラを選択し名前を入力してください。');
      this.isUpdating = true;
      try {
        const updatedData = {
          monsterName: this.form.name,
          indexNumber: this.form.no   ? Number(this.form.no) : 0,
          element: this.form.element,
          type: this.form.type,
          ejectionGacha: this.form.gacha
        };
        await databaseService.updateCharacterMaster(this.form.selectedMasterId, updatedData);
        
        // NOTE: DB更新成功後、親コンポーネントに通知する
        alert('マスター情報を更新しました。ページをリロードしてください。');
        this.$emit('master-updated');

      } catch (e) {
        alert('更新に失敗: ' + e.message);
      } finally {
        this.isUpdating = false;
      }
    },
  },
};
</script>
