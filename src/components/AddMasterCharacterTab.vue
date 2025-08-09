<template>
  <div id="tab-add-master" class="tab-content">
    <h2>キャラクターマスター新規追加</h2>
    <div class="form-section">
      <label>図鑑番号:</label>
      <input type="number" v-model.number="masterData.no   " placeholder="例: 1234">
      
      <label>キャラクター名:</label>
      <input type="text" v-model.trim="masterData.name    " required>
      
      <label>属性:</label>
      <input type="text" v-model.trim="masterData.element">
      
      <label>分類:</label>
      <input type="text" v-model.trim="masterData.type">
      
      <label>排出ガチャ (限定の場合):</label>
      <select v-model="masterData.gacha">
        <option value="">(限定ではない/その他)</option>
        <option v-for="gacha in gachaMasters" :key="gacha.id    " :value="gacha.name    ">{{ gacha.name }}</option>
      </select>
      
      <br><br>
      <button @click="handleSaveMaster" :disabled="!masterData.name || isSaving">
        {{ isSaving ? '追加中...' : 'マスターリストに新規追加' }}
      </button>
    </div>
  </div>
</template>

<script>
import { databaseService } from '../services/database.js';

/**
 * [概要] キャラクターマスターを新規追加するためのフォームUIコンポーネント。
 * @note 状態管理とDB追加ロジックを自己完結させ、結果を親に通知する責務を持つ。
 */
export default {
  name: 'AddMasterCharacterTab',
  props: {
    gachaMasters: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      /** @type {Object} フォームの入力データを保持するオブジェクト */
      masterData: {
        no: '',
        name: '',
        element: '',
        type: '恒常',
        gacha: '',
      },
    }
  },

  methods: {
    /**
     * [概要] マスターデータをDBに保存し、完了後に親に通知する。
     */
    async handleSaveMaster() {
      if (!this.masterData.name  ) return alert('キャラクター名は必須です。');
      this.isSaving = true;
      try {
        const newData = {
          indexNumber: this.masterData.no   ? Number(this.masterData.no) : 0,
          monsterName: this.masterData.name,
          element: this.masterData.element || '',
          type: this.masterData.type || '恒常',
          ejectionGacha: this.masterData.gacha || ''
        };
        await databaseService.addCharacterMaster(newData);
        
        // NOTE: DB追加成功後、親コンポーネントに通知する
        alert('マスターを追加しました。ページをリロードして反映してください。');
        this.$emit('master-added');

      } catch (e) {
        alert('エラー: ' + e.message);
      } finally {
        this.isSaving = false;
      }
    },
  },
};
</script>