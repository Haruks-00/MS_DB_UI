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
/**
 * [概要] キャラクターマスターを新規追加するためのフォームUIコンポーネント。
 * @note フォーム入力値の管理に責務を持ち、保存処理は親コンポーネントに委譲する。
 */
export default {
  name: 'AddMasterCharacterTab',
  props: {
    /**
     * @property {Array} gachaMasters - 排出ガチャのマスターデータリスト
     */
    gachaMasters: {
      type: Array,
      required: true,
    },
    /**
     * @property {Boolean} isSaving - 保存処理が実行中かどうかのフラグ
     */
    isSaving: {
      type: Boolean,
      default: false,
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
     * [概要] 保存ボタンクリック時に`save-master`イベントを発行する。
     */
    handleSaveMaster() {
      // INFO: 実際の保存処理は親コンポーネントに委譲する
      this.$emit('save-master', this.masterData);
    },
  },
}
</script>