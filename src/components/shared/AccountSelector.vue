<template>
  <div id="account-controls" v-show="visible">
    <v-select
      v-model="selectedId"
      :items="accounts"
      item-title="name"
      item-value="id"
      label="管理対象アカウント"
      variant="outlined"
      density="compact"
    ></v-select>
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
