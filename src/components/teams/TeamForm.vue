<template>
  <v-card class="h-100" elevation="3" rounded="lg">
    <v-card-title class="bg-primary text-white pa-4">
      <v-icon icon="mdi-account-edit" class="mr-2"></v-icon>
      {{ team.id ? "編成編集" : "新規編成作成" }}
    </v-card-title>

    <v-card-subtitle class="pa-4 bg-grey-lighten-5">
      <v-btn
        @click="$emit('reset-form')"
        size="small"
        variant="tonal"
        color="primary"
        prepend-icon="mdi-plus"
      >
        新規作成フォームを開く
      </v-btn>
    </v-card-subtitle>

    <template
      v-if="
        accounts.length > 0 &&
        ownedCharactersData.size > 0 &&
        characterMastersMap.size > 0
      "
    >
      <v-card-text class="pa-6">
        <!-- INFO: より美しいフォームフィールド -->
        <v-text-field
          :model-value="team.name"
          @update:model-value="(value) => updateTeamProperty('name', value)"
          label="編成名"
          variant="outlined"
          placeholder="例: 天魔の孤城 第1の間"
          class="mb-6"
          color="primary"
          prepend-inner-icon="mdi-format-title"
        ></v-text-field>

        <v-select
          :model-value="team.type"
          @update:model-value="(value) => updateTeamProperty('type', value)"
          :items="teamTypes"
          label="タイプ"
          variant="outlined"
          class="mb-8"
          color="primary"
          prepend-inner-icon="mdi-tag"
        ></v-select>

        <!-- INFO: より美しいキャラクター編成セクション -->
        <div class="character-formation-section">
          <div class="d-flex align-center mb-4">
            <v-icon
              icon="mdi-account-multiple"
              color="primary"
              class="mr-2"
            ></v-icon>
            <h4 class="text-h5 font-weight-bold text-primary">
              キャラクター編成 (4体)
            </h4>
          </div>

          <v-row>
            <v-col
              v-for="(slot, index) in team.slots"
              :key="index"
              cols="12"
              md="6"
            >
              <!-- INFO: より美しいスロットカード -->
              <v-card
                elevation="2"
                class="pa-4 h-100 character-slot-card"
                :class="
                  slot.selectedAccountId
                    ? 'border-primary border-2'
                    : 'border-grey-lighten-3 border'
                "
                rounded="lg"
                style="min-height: 400px"
              >
                <div class="d-flex align-center mb-4">
                  <v-avatar size="32" color="primary" class="mr-3">
                    <span class="text-white font-weight-bold">{{
                      index + 1
                    }}</span>
                  </v-avatar>
                  <h5 class="text-h6 font-weight-bold">
                    スロット {{ index + 1 }}
                  </h5>
                </div>

                <v-select
                  :model-value="slot.selectedAccountId"
                  @update:model-value="
                    (value) => updateSlot(index, 'selectedAccountId', value)
                  "
                  :items="accounts"
                  item-title="name"
                  item-value="id"
                  label="アカウント"
                  variant="outlined"
                  density="compact"
                  class="mb-3"
                  color="primary"
                  prepend-inner-icon="mdi-account"
                ></v-select>

                <!-- INFO: より美しいキャラクターセレクター -->
                <CharacterSelector
                  :model-value="slot.selectedOwnedId"
                  @update:model-value="
                    (charId) => handleCharClick(index, charId)
                  "
                  :items="getCharactersForSlot(slot)"
                  label="キャラクターを選択"
                  list-height="280px"
                  variant="filled"
                  :disabled="!slot.selectedAccountId"
                  :disabled-items="getSelectedIdsInOtherSlots(index)"
                  no-data-text="先にアカウントを選択"
                  :density="'comfortable'"
                  :list-density="'comfortable'"
                  :primary-color="'primary'"
                  :search-bg-color="'grey-lighten-5'"
                  :card-elevation="2"
                  prepend-inner-icon="mdi-account-search"
                >
                  <template #item="{ item }">
                    <v-list-item-title>{{
                      formatCharForDisplay(item, true)
                    }}</v-list-item-title>
                  </template>
                </CharacterSelector>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card-text>

      <!-- INFO: より美しいアクションボタン -->
      <v-card-actions class="pa-6 bg-grey-lighten-5">
        <v-spacer></v-spacer>
        <v-btn
          :loading="isSaving"
          :disabled="!isTeamFormValid || isSaving"
          @click="$emit('save-team')"
          color="primary"
          size="large"
          variant="elevated"
          prepend-icon="mdi-content-save"
          class="px-8"
        >
          {{ isSaving ? "保存中..." : team.id ? "編成を更新" : "編成を保存" }}
        </v-btn>
      </v-card-actions>
    </template>

    <!-- INFO: データ未読み込み時の表示 -->
    <div v-else class="pa-8 text-center">
      <v-progress-circular
        indeterminate
        color="primary"
        size="48"
      ></v-progress-circular>
      <div class="mt-3 text-body-1 text-medium-emphasis">
        データを読み込んでいます...
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { computed } from "vue";
import { formatOwnedCharDisplayName } from "../../utils/formatters.js";
import CharacterSelector from "../shared/CharacterSelector.vue"; // INFO: 共通コンポーネントをインポート

const props = defineProps({
  team: { type: Object, required: true },
  accounts: { type: Array, required: true },
  ownedCharactersData: { type: Map, required: true },
  characterMastersMap: { type: Map, required: true },
  itemMastersMap: { type: Map, required: true },
  isSaving: { type: Boolean, default: false },
});

const emit = defineEmits(["save-team", "reset-form", "update:team"]);

const updateTeamProperty = (field, value) => {
  const newTeam = JSON.parse(JSON.stringify(props.team));
  newTeam[field] = value;
  emit("update:team", newTeam);
};

const updateSlot = (slotIndex, field, value) => {
  // props.team   のコピーをスプレッド構文で作成
  const newTeam = {
    ...props.team,
    slots: props.team.slots.map((s, i) => {
      if (i === slotIndex) {
        // 更新対象のスロットだけを新しいオブジェクトに置き換える
        return { ...s, [field]: value };
      }
      return s; // それ以外のスロットはそのまま
    }),
  };

  // アカウントが変更されたら、キャラクター選択をリセット
  if (field === "selectedAccountId") {
    newTeam.slots[slotIndex].selectedOwnedId = null;
  }

  emit("update:team", newTeam);
};

// INFO: タイプはフォーム内で定義して良い情報です
const teamTypes = ['禁忌', '天魔(試練)', '天魔(庭園)','星墓', '轟絶', '黎絶'];

const isTeamFormValid = computed(() => {
  return (
    props.team.name &&
    props.team.type &&
    props.team.slots.every(
      (slot) => slot.selectedAccountId && slot.selectedOwnedId
    )
  );
});

const getCharactersForSlot = (slot) => {
  if (!slot.selectedAccountId) return [];
  const ownedList = props.ownedCharactersData.get(slot.selectedAccountId) || [];
  return ownedList
    .map((char) => {
      const master = props.characterMastersMap.get(char.characterMasterId);
      return {
        ...char,
        accountId: slot.selectedAccountId,
        indexNumber: master?.indexNumber || 999999,
        monsterName: master?.monsterName || "不明",
      };
    })
    .sort((a, b) => a.indexNumber - b.indexNumber);
};

/**
 * [概要] 指定されたスロット以外で選択されているキャラクターIDのリストを取得する。
 * @note INFO: CharacterSelectorの:disabled-itemsプロパティに渡すために新設しました。
 * @param {number} currentIndex - 現在のスロットのインデックス
 * @returns {Array<string>} 選択済みのキャラクターIDの配列
 */
const getSelectedIdsInOtherSlots = (currentIndex) => {
  return props.team.slots
    .filter((slot, index) => index !== currentIndex && slot.selectedOwnedId)
    .map((slot) => slot.selectedOwnedId);
};

const formatCharForDisplay = (char, includeItems) => {
  return formatOwnedCharDisplayName(
    char,
    includeItems,
    props.characterMastersMap,
    props.ownedCharactersData,
    props.itemMastersMap,
    char.accountId
  );
};

/**
 * [概要] CharacterSelectorからの選択イベントをハンドリングする。
 * @param {number} slotIndex - スロットのインデックス
 * @param {string | null} charId - 選択されたキャラクターID
 */
const handleCharClick = (slotIndex, charId) => {
  updateSlot(slotIndex, "selectedOwnedId", charId);
};
</script>
