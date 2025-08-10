<template>
  <div id="account-controls" v-show="visible" class="minimal-account-selector">
    <v-select
      v-model="selectedId"
      :items="accounts"
      item-title="name"
      item-value="id"
      label="管理対象アカウント"
      variant="outlined"
      density="compact"
      color="primary"
      prepend-inner-icon="mdi-account-multiple"
      class="minimal-select"
      hide-details
    ></v-select>
  </div>
</template>

<script setup>
import { computed } from "vue";

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
  },
});

/**
 * [概要] 親コンポーネントに通知するイベントを定義します。
 */
const emit = defineEmits(["update:modelValue"]); // INFO: Vue 3のv-modelは 'update:modelValue' イベントを使用します。

/**
 * [概要] v-modelをコンポーネント内で安全に扱うための算出プロパティ。
 * @note INFO: Vue 3のv-modelの規約に合わせて、props.modelValueをgetし、update:modelValueイベントをemitします。
 */
const selectedId = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>

<style scoped>
.minimal-account-selector {
  background: #ffffff;
  border: 1px solid var(--grey-200);
  border-radius: 8px;
  padding: 16px;
  transition: border-color 0.2s ease;
}

.minimal-account-selector:hover {
  border-color: var(--grey-300);
}

.minimal-select {
  background: transparent;
}

.minimal-select :deep(.v-field) {
  border-radius: 6px;
  border: 1px solid var(--grey-300);
  transition: border-color 0.2s ease;
}

.minimal-select :deep(.v-field:hover) {
  border-color: var(--grey-400);
}

.minimal-select :deep(.v-field--focused) {
  border-color: var(--primary-color);
}

.minimal-select :deep(.v-field__input) {
  font-weight: 500;
}

.minimal-select :deep(.v-label) {
  color: var(--grey-600);
  font-weight: 500;
}
</style>
