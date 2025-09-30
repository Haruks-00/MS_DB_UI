<template>
  <v-card class="h-100" elevation="3" rounded="lg">
    <v-card-title class="bg-primary text-white pa-4">
      <v-icon icon="mdi-format-list-bulleted" class="mr-2"></v-icon>
      編成一覧
    </v-card-title>

    <v-card-text class="pa-4">
      <!-- INFO: より美しいフィルター -->
      <v-select
        v-model="teamFilters.type"
        :items="['', ...teamTypes]"
        label="タイプで絞り込み"
        variant="outlined"
        clearable
        density="compact"
        prepend-inner-icon="mdi-filter"
        class="mb-4"
        color="primary"
      ></v-select>

      <!-- INFO: より美しいチームリスト -->
      <div class="team-list-container" style="height: 65vh; overflow-y: auto">
        <div v-if="!dataLoaded" class="text-center pa-8">
          <v-progress-circular
            indeterminate
            color="primary"
            size="48"
          ></v-progress-circular>
          <div class="mt-3 text-body-1 text-medium-emphasis">
            データを読み込んでいます...
          </div>
        </div>

        <div v-else-if="filteredTeams.length === 0" class="text-center pa-8">
          <v-icon
            icon="mdi-inbox-outline"
            size="64"
            color="grey-lighten-1"
          ></v-icon>
          <div class="mt-3 text-body-1 text-medium-emphasis">
            該当する編成がありません
          </div>
        </div>

        <!-- INFO: より美しいチームアイテム -->
        <div
          v-for="team in filteredTeams"
          :key="team.id"
          @click="selectTeam(team)"
          :class="[
            'team-item mb-3 pa-4 rounded-lg cursor-pointer transition-all',
            selectedTeamId === team.id
              ? 'bg-primary-lighten-5 border-primary border-2'
              : 'bg-grey-lighten-5 border-grey-lighten-3 border',
          ]"
          style="min-height: 120px"
        >
          <div class="d-flex align-center justify-space-between mb-3">
            <div class="flex-grow-1">
              <h3 class="text-h6 font-weight-bold text-primary mb-1">
                {{ team.name }}
              </h3>
              <v-chip
                :color="getTypeColor(team.type)"
                size="small"
                variant="tonal"
                class="font-weight-medium"
              >
                {{ team.type }}
              </v-chip>
            </div>
            <v-btn
              icon="mdi-delete"
              variant="text"
              size="small"
              color="error"
              @click.stop="deleteTeam(team.id)"
              class="ml-2"
            ></v-btn>
          </div>

          <!-- INFO: より美しいキャラクターグリッド -->
          <v-row dense>
            <v-col v-for="(_, index) in Array(4)" :key="index" cols="3">
              <div
                class="character-slot pa-2 rounded text-center"
                :class="
                  getTeamSlotDetails(team, index).characterName !== '—'
                    ? 'bg-white'
                    : 'bg-grey-lighten-4'
                "
              >
                <div
                  class="text-caption font-weight-bold text-truncate mb-1"
                  :title="getTeamSlotDetails(team, index).characterName"
                >
                  {{ getTeamSlotDetails(team, index).characterName }}
                </div>
                <div
                  class="text-caption text-truncate mb-1"
                  :title="getTeamSlotDetails(team, index).accountName"
                >
                  {{ getTeamSlotDetails(team, index).accountName }}
                </div>
                <v-divider class="my-1"></v-divider>
                <div
                  v-for="itemIndex in 4"
                  :key="itemIndex"
                  class="text-caption text-truncate"
                  :title="getTeamSlotDetails(team, index).items[itemIndex - 1]"
                >
                  {{
                    getTeamSlotDetails(team, index).items[itemIndex - 1] || "—"
                  }}
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { reactive, computed } from "vue";
import { getRealItems } from "../../utils/itemMigration.js";

const props = defineProps({
  dataLoaded: { type: Boolean, required: true },
  teams: { type: Array, required: true },
  accounts: { type: Array, required: true },
  ownedCharactersData: { type: Map, required: true },
  characterMastersMap: { type: Map, required: true },
  itemMastersMap: { type: Map, required: true },
  selectedTeamId: { type: String, default: null },
});

const emit = defineEmits(["select-team", "delete-team"]);

const teamTypes = ['禁忌', '天魔(試練)', '天魔(庭園)','星墓', '轟絶', '黎絶'];
const teamFilters = reactive({ type: "" });

const filteredTeams = computed(() => {
  return !teamFilters.type
    ? props.teams
    : props.teams.filter((team) => team.type === teamFilters.type);
});

/**
 * [概要] チームタイプに応じた色を返す
 * @param {string} type - チームタイプ
 * @returns {string} 色のクラス名
 */
const getTypeColor = (type) => {
  const colorMap = {
    禁忌: "deep-purple",
    '天魔(試練)': "red-darken-2",
    '天魔(庭園)': "green-darken-2",
    星墓: "blue-darken-2",
    轟絶: "orange-darken-2",
    黎絶: "blue-darken-2",
  };
  return colorMap[type] || "grey";
};

/**
 * [概要] チームの特定スロットの詳細情報を返す
 * @note このロジックはManageTeamsTabからそのまま移植されました
 */
const getTeamSlotDetails = (team, slotIndex) => {
  const emptySlot = { characterName: "—", accountName: "—", items: [] };
  if (
    !team.characters ||
    !props.dataLoaded ||
    slotIndex >= team.characters.length
  )
    return emptySlot;
  const charSlot = team.characters[slotIndex];
  const account = props.accounts.find((acc) => acc.id === charSlot.accountId);
  const ownedChar = (
    props.ownedCharactersData.get(charSlot.accountId) || []
  ).find((c) => c.id === charSlot.ownedCharacterId);
  if (!ownedChar)
    return {
      characterName: "キャラ不明",
      accountName: account?.name || "不明",
      items: [],
    };
  const master = props.characterMastersMap.get(ownedChar.characterMasterId);

  // 新形式に変換して実アイテムのみを取得
  const realItems = getRealItems(ownedChar.items || []);
  const itemNames = realItems
    .map((item) => props.itemMastersMap.get(item.itemId) || `不明ID:${item.itemId}`)
    .filter(Boolean);

  return {
    characterName: master?.monsterName || "不明",
    accountName: account?.name || "不明",
    items: itemNames,
  };
};

/**
 * [概要] 親にチーム選択イベントを通知する
 */
const selectTeam = (team) => {
  emit("select-team", team);
};

/**
 * [概要] 親にチーム削除イベントを通知する
 */
const deleteTeam = (teamId) => {
  emit("delete-team", teamId);
};
</script>
