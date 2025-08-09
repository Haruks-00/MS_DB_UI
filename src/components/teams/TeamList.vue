<template>
  <v-card variant="outlined">
    <v-card-title>編成一覧</v-card-title>
    <v-card-text>
      <v-select
        v-model="teamFilters.type"
        :items="['', ...teamTypes]"
        label="タイプで絞り込み"
        variant="outlined"
        clearable
        density="compact"
      ></v-select>
      <!-- INFO: チームリストをv-listで表現 -->
      <v-list lines="three" select-strategy="single-independent" style="height: 70vh; overflow-y: auto;" class="border rounded">
        <v-list-subheader v-if="filteredTeams.length > 0">{{ filteredTeams.length }}件の編成</v-list-subheader>
        <div v-if="!dataLoaded" class="text-center pa-4">データを読み込んでいます...</div>
        <div v-else-if="filteredTeams.length === 0" class="text-center pa-4">該当する編成がありません。</div>
        <!-- INFO: 複雑なリスト項目は、v-list-itemのデフォルトスロットを使ってカスタムレイアウトを作成 -->
        <v-list-item
          v-for="team in filteredTeams"
          :key="team.id    "
          @click="selectTeam(team)"
          :active="selectedTeamId === team.id"
          class="mb-2 border rounded"
        >
          <template v-slot:default>
            <div class="d-flex align-center w-100">
              <div class="flex-grow-1">
                <v-list-item-title class="font-weight-bold">{{ team.name   }}</v-list-item-title>
                <v-list-item-subtitle>{{ team.type }}</v-list-item-subtitle>
              </div>
              <v-btn icon="mdi-delete" variant="text" size="small" color="grey" @click.stop="deleteTeam(team.id)"></v-btn>
            </div>
            <!-- INFO: テーブルの代わりにシンプルなグリッドでキャラクター情報を表示 -->
            <v-row dense class="mt-2 text-caption">
              <v-col v-for="(_, index) in Array(4)" :key="index" cols="3">
                <div class="border rounded pa-1" style="font-size: 0.7rem; line-height: 1.2;">
                  <div class="font-weight-bold text-truncate" :title="getTeamSlotDetails(team, index).characterName">{{ getTeamSlotDetails(team, index).characterName }}</div>
                  <div class="text-truncate" :title="getTeamSlotDetails(team, index).accountName">{{ getTeamSlotDetails(team, index).accountName }}</div>
                  <v-divider class="my-1"></v-divider>
                  <div v-for="itemIndex in 2" :key="itemIndex" class="text-truncate" :title="getTeamSlotDetails(team, index).items[itemIndex - 1]">{{ getTeamSlotDetails(team, index).items[itemIndex - 1] || '—' }}</div>
                </div>
              </v-col>
            </v-row>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { reactive, computed } from 'vue';

const props = defineProps({
  dataLoaded: { type: Boolean, required: true },
  teams: { type: Array, required: true },
  accounts: { type: Array, required: true },
  ownedCharactersData: { type: Map, required: true },
  characterMastersMap: { type: Map, required: true },
  itemMastersMap: { type: Map, required: true },
  selectedTeamId: { type: String, default: null },
});

const emit = defineEmits(['select-team', 'delete-team']);

const teamTypes = ['禁忌', '天魔', '庭園', '轟絶', '黎絶'];
const teamFilters = reactive({ type: '' });

const filteredTeams = computed(() => {
  return !teamFilters.type ? props.teams : props.teams.filter(team => team.type === teamFilters.type);
});

/**
 * [概要] チームの特定スロットの詳細情報を返す
 * @note このロジックはManageTeamsTabからそのまま移植されました
 */
const getTeamSlotDetails = (team, slotIndex) => {
  const emptySlot = { characterName: '—', accountName: '—', items: [] };
  if (!team.characters || !props.dataLoaded || slotIndex >= team.characters.length) return emptySlot;
  const charSlot = team.characters[slotIndex];
  const account = props.accounts.find(acc => acc.id   === charSlot.accountId);
  const ownedChar = (props.ownedCharactersData.get(charSlot.accountId) || []).find(c => c.id === charSlot.ownedCharacterId);
  if (!ownedChar) return { characterName: 'キャラ不明', accountName: account?.name || '不明', items: [] };
  const master = props.characterMastersMap.get(ownedChar.characterMasterId);
  return {
    characterName: master?.monsterName || '不明',
    accountName: account?.name || '不明',
    items: (ownedChar.items || []).map(id => props.itemMastersMap.get(Number(id)) || `不明ID:${id}`).filter(Boolean)
  };
};

/**
 * [概要] 親にチーム選択イベントを通知する
 */
const selectTeam = (team) => {
  emit('select-team', team);
};

/**
 * [概要] 親にチーム削除イベントを通知する
 */
const deleteTeam = (teamId) => {
  emit('delete-team', teamId);
};
</script>