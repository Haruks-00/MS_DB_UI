<template>
  <v-card variant="outlined">
    <v-card-title>{{ team.id ? "編成編集" : "新規編成作成" }}</v-card-title>
    <v-card-subtitle>
      <v-btn
        @click="$emit('reset-form')"
        size="small"
        variant="tonal"
        class="mt-2"
        >新規作成フォームを開く</v-btn
      >
    </v-card-subtitle>
    <template
      v-if="
        accounts.length > 0 &&
        ownedCharactersData.size > 0 &&
        characterMastersMap.size > 0
      "
    >
      <v-card-text>
        <!-- NOTE: v-modelで親コンポーネントのteamFormオブジェクトを直接参照します -->
        <v-text-field
          :model-value="team.name"
          @update:model-value="(value) => updateTeamProperty('name', value)"
          label="編成名"
          variant="outlined"
          placeholder="例: 天魔の孤城 第1の間"
        ></v-text-field>
        <v-select
          :model-value="team.type"
          @update:model-value="(value) => updateTeamProperty('type', value)"
          :items="teamTypes"
          label="タイプ"
          variant="outlined"
        ></v-select>

        <h4 class="mt-4 mb-2">キャラクター編成 (4体)</h4>
        <v-row>
          <v-col
            v-for="(slot, index) in team.slots"
            :key="index"
            cols="12"
            md="6"
          >
            <v-card variant="tonal" class="pa-2">
              <h5>スロット {{ index + 1 }}</h5>
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
              ></v-select>
              <v-text-field
                :model-value="slot.characterSearch"
                @update:model-value="
                  (value) => updateSlot(index, 'characterSearch', value)
                "
                label="キャラ名で検索"
                variant="outlined"
                density="compact"
                clearable
              ></v-text-field>
              <v-card variant="outlined">
                <v-list
                  style="height: 150px; overflow-y: auto"
                  density="compact"
                >
                  <v-list-item v-if="!slot.selectedAccountId">
                    <small>先にアカウントを選択</small>
                  </v-list-item>

                  <v-list-item
                    v-for="char in getCharactersForSlot(slot)"
                    :key="char.id"
                    :value="char.id"
                    :active="slot.selectedOwnedId === char.id"
                    :disabled="isCharSelectedInOtherSlot(char.id, index)"
                    @click="handleCharClick(index, char.id)"
                  >
                    <v-list-item-title>
                      {{ formatCharForDisplay(char, false) }}
                    </v-list-item-title>
                    <template
                      v-slot:append
                      v-if="isCharSelectedInOtherSlot(char.id, index)"
                    >
                      <v-chip size="x-small" color="warning" variant="tonal"
                        >選択済</v-chip
                      >
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :loading="isSaving"
          :disabled="!isTeamFormValid || isSaving"
          @click="$emit('save-team')"
          color="primary"
          size="large"
        >
          {{ isSaving ? "保存中..." : team.id ? "編成を更新" : "編成を保存" }}
        </v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script setup>
import { computed } from "vue";
import { formatOwnedCharDisplayName } from "../../utils/formatters.js";

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
    newTeam.slots[slotIndex].characterSearch = "";
  }

  emit("update:team", newTeam);
};

// INFO: タイプはフォーム内で定義して良い情報です
const teamTypes = ["禁忌", "天魔", "庭園", "轟絶", "黎絶"];

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
  const charList = ownedList
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
  const lowerSearch = (slot.characterSearch || "").toLowerCase();
  return !lowerSearch
    ? charList
    : charList.filter((char) =>
        char.monsterName.toLowerCase().includes(lowerSearch)
      );
};

const isCharSelectedInOtherSlot = (ownedId, currentIndex) => {
  return !ownedId
    ? false
    : props.team.slots.some(
        (slot, index) =>
          index !== currentIndex && slot.selectedOwnedId === ownedId
      );
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

const handleCharClick = (slotIndex, charId) => {
  updateSlot(slotIndex, "selectedOwnedId", charId);
};
</script>
