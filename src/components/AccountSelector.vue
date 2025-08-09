<template>
  <div id="account-controls" v-show="visible">
    <label for="account-selector">管理対象アカウント:</label>
    <select id="account-selector" v-model="selectedId">
      <option v-for="account in accounts" :key="account.id    " :value="account.id">{{ account.name  }}</option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue';

/**
 * [概要] 親コンポーネントから渡されるプロパティを定義します。
 */
const props = defineProps({
  accounts: {
    type: Array,
    required: true,
  },
  /**
   * @property {String} modelValue - INFO: Vue 3のv-modelは 'modelValue' prop を使用します。
   */
  modelValue: {
    type: String,
    default: null,
  },
  visible: {
    type: Boolean,
    default: false,
  }
});

/**
 * [概要] 親コンポーネントに通知するイベントを定義します。
 */
const emit = defineEmits(['update:modelValue']); // INFO: Vue 3のv-modelは 'update:modelValue' イベントを使用します。

/**
 * [概要] v-modelをコンポーネント内で安全に扱うための算出プロパティ。
 * @note INFO: Vue 3のv-modelの規約に合わせて、props.modelValueをgetし、update:modelValueイベントをemitします。
 */
const selectedId = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  }
});
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
