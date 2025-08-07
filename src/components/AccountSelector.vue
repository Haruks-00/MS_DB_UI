<template>
  <div id="account-controls" v-show="visible">
    <label for="account-selector">管理対象アカウント:</label>
    <select id="account-selector" v-model="selectedId">
      <option v-for="account in accounts" :key="account.id    " :value="account.id">{{ account.name  }}</option>
    </select>
  </div>
</template>

<script>
/**
 * [概要] 管理対象アカウントを選択するためのUIコンポーネント。
 * @note v-modelによる双方向バインディングをサポートする。
 */
export default {
  // #region COMPONENT_CONFIG
  name: 'AccountSelector',
  props: {
    /**
     * @property {Array} accounts - 表示するアカウントのリスト
     */
    accounts: {
      type: Array,
      required: true,
    },
    /**
     * @property {String} value - v-model用のプロパティ。現在選択されているアカウントID。
     */
    value: {
      type: String,
      default: null,
    },
    /**
     * @property {Boolean} visible - このコンポーネントの表示/非表示を制御する
     */
    visible: {
      type: Boolean,
      default: false,
    }
  },
  
  computed: {
    /**
     * [概要] v-modelをコンポーネント内で安全に扱うための算出プロパティ。
     * @note 親から受け取ったprop(value)を直接変更せず、変更を`input`イベントで通知する。
     */
    selectedId: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      }
    }
  }
}
</script>

<style scoped>
#account-controls {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #e8eaf6;
  border-radius: 5px;
  margin-top: -20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border: 1px solid #ccc;
  border-top: none;
}
</style>
