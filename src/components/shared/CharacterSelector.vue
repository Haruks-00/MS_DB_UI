<template>
  <!-- INFO: 検索フィールドとリスト表示部を分離したUI構造 -->
  <v-text-field
    v-model="search"
    :label="label"
    :variant="variant"
    :clearable="clearable"
    :prepend-inner-icon="prependInnerIcon"
    :disabled="disabled"
    hide-details
    class="mb-2"
  ></v-text-field>

  <v-card :variant="listCardVariant" :height="listHeight" :disabled="disabled">
    <v-list
      :model-value="[modelValue]"
      @update:selected="handleSelection"
      style="overflow-y: auto; height: 100%"
    >
      <v-list-item v-if="filteredItems.length === 0">
        <v-list-item-title class="text-center text-grey">
          {{ noDataText }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item
        v-for="item in filteredItems"
        :key="item.id    "
        :value="item.id"
        :disabled="disabledItems.includes(item.id)"
      >
        <!-- INFO: #itemスロットを公開し、親コンポーネントが表示を完全に上書きできるようにする -->
        <slot name="item" :item="item">
          <!-- NOTE: デフォルトの表示形式 -->
          <v-list-item-title>{{
            getTitle(item)
          }}</v-list-item-title>
          <v-list-item-subtitle v-if="item.subtitle">{{
            item.subtitle
          }}</v-list-item-subtitle>
        </slot>

        <template
          v-if="disabledItems.includes(item.id)"
          v-slot:append
        >
          <v-chip size="x-small" color="warning" variant="tonal"
            >選択済</v-chip
          >
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";
/**
 * @file 汎用的なキャラクター選択コンポーネント (検索/リスト分離型)
 */

const props = defineProps({
  modelValue: { type: [String, null], required: true },
  items: { type: Array, required: true },
  itemTitle: { type: [String, Function], default: "monsterName" },
  disabledItems: { type: Array, default: () => [] },
  label: { type: String, default: "キャラクター名で検索" },
  variant: { type: String, default: "outlined" },
  clearable: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  prependInnerIcon: { type: String, default: "mdi-magnify" },
  listHeight: { type: [String, Number], default: "300px" },
  listCardVariant: { type: String, default: "outlined" },
  noDataText: { type: String, default: "該当するキャラクターがいません" },
});

const emit = defineEmits(["update:modelValue"]);

const search = ref("");

/**
 * [概要] 検索文字列に基づいて表示アイテムをフィルタリングする。
 */
const filteredItems = computed(() => {
  if (!search.value) return props.items;
  const lowerSearch = search.value.toLowerCase();
  return props.items.filter((item) => {
    const title = getTitle(item).toLowerCase();
    return title.includes(lowerSearch);
  });
});

/**
 * [概要] itemTitleプロパティに応じて、アイテムの表示タイトルを取得する。
 */
const getTitle = (item) => {
  if (typeof props.itemTitle === "function") {
    return props.itemTitle(item);
  }
  return item[props.itemTitle] || "";
};

/**
 * [概要] v-listでの選択をハンドリングし、v-modelを更新する。
 * @note v-listのv-model:selectedは選択された項目のvalueを配列で返すため、
 *       配列の最初の要素を取得してemitします。
 */
const handleSelection = (selectedArray) => {
  const selectedId = selectedArray.length > 0 ? selectedArray[0] : null;
  // NOTE: 現在の値と異なる場合のみemitし、不要な更新を防ぐ
  if (props.modelValue !== selectedId) {
    emit("update:modelValue", selectedId);
  }
};
</script>