<template>
  <div>
    <h2>編成管理</h2>
    <!-- INFO: 2カラムレイアウトをVuetifyのグリッドシステムで構築 -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card variant="outlined">
          <v-card-title>編成一覧</v-card-title>
          <v-card-text>
            <v-select
              v-model="teamFilters.type"
              :items="['', ...teamTypes]"
              label="タイプで絞り込み"
              variant="outlined"
              clearable
            ></v-select>
            <!-- INFO: チームリストをv-listで表現 -->
            <v-list
              lines="three"
              select-strategy="single-independent"
              style="height: 70vh; overflow-y: auto"
              class="border rounded"
            >
              <v-list-subheader v-if="filteredTeams.length > 0"
                >{{ filteredTeams.length }}件の編成</v-list-subheader
              >
              <div v-if="!dataLoaded" class="text-center pa-4">
                データを読み込んでいます...
              </div>
              <div
                v-else-if="filteredTeams.length === 0"
                class="text-center pa-4"
              >
                該当する編成がありません。
              </div>
              <!-- INFO: 複雑なリスト項目は、v-list-itemのデフォルトスロットを使ってカスタムレイアウトを作成 -->
              <v-list-item
                v-for="team in filteredTeams"
                :key="team.id"
                @click="selectTeam(team)"
                :active="teamForm.id === team.id"
                class="mb-2 border rounded"
              >
                <template v-slot:default>
                  <div class="d-flex align-center w-100">
                    <div class="flex-grow-1">
                      <v-list-item-title class="font-weight-bold">{{
                        team.name
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        team.type
                      }}</v-list-item-subtitle>
                    </div>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      size="small"
                      color="grey"
                      @click.stop="handleDeleteTeam(team.id)"
                    ></v-btn>
                  </div>
                  <!-- INFO: テーブルの代わりにシンプルなグリッドでキャラクター情報を表示 -->
                  <v-row dense class="mt-2 text-caption">
                    <v-col v-for="(_, index) in Array(4)" :key="index" cols="3">
                      <div
                        class="border rounded pa-1"
                        style="font-size: 0.7rem; line-height: 1.2"
                      >
                        <div
                          class="font-weight-bold text-truncate"
                          :title="getTeamSlotDetails(team, index).characterName"
                        >
                          {{ getTeamSlotDetails(team, index).characterName }}
                        </div>
                        <div
                          class="text-truncate"
                          :title="getTeamSlotDetails(team, index).accountName"
                        >
                          {{ getTeamSlotDetails(team, index).accountName }}
                        </div>
                        <v-divider class="my-1"></v-divider>
                        <div
                          v-for="itemIndex in 2"
                          :key="itemIndex"
                          class="text-truncate"
                          :title="
                            getTeamSlotDetails(team, index).items[itemIndex - 1]
                          "
                        >
                          {{
                            getTeamSlotDetails(team, index).items[
                              itemIndex - 1
                            ] || "—"
                          }}
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card variant="outlined">
          <v-card-title>{{
            teamForm.id ? "編成編集" : "新規編成作成"
          }}</v-card-title>
          <v-card-subtitle>
            <v-btn
              @click="resetTeamForm"
              size="small"
              variant="tonal"
              class="mt-2"
              >新規作成フォームを開く</v-btn
            >
          </v-card-subtitle>
          <v-card-text>
            <v-text-field
              v-model.trim="teamForm.name"
              label="編成名"
              variant="outlined"
              placeholder="例: 天魔の孤城 第1の間"
            ></v-text-field>
            <v-select
              v-model="teamForm.type"
              :items="teamTypes"
              label="タイプ"
              variant="outlined"
            ></v-select>

            <h4 class="mt-4 mb-2">キャラクター編成 (4体)</h4>
            <v-row>
              <v-col
                v-for="(slot, index) in teamForm.slots"
                :key="index"
                cols="12"
                md="6"
              >
                <v-card variant="tonal" class="pa-2">
                  <h5>スロット {{ index + 1 }}</h5>
                  <v-select
                    v-model="slot.selectedAccountId"
                    :items="accounts"
                    item-title="name"
                    item-value="id"
                    label="アカウント"
                    variant="outlined"
                    density="compact"
                  ></v-select>
                  <v-text-field
                    v-model="slot.characterSearch"
                    label="キャラ名で検索"
                    variant="outlined"
                    density="compact"
                    clearable
                  ></v-text-field>
                  <!-- INFO: v-for内のv-listのv-modelはテンプレート内で直接ハンドリングします -->
                  <v-card variant="outlined">
                    <v-list
                      :model-value="[slot.selectedOwnedId]"
                      @update:model-value="
                        (newValue) =>
                          (slot.selectedOwnedId = newValue[0] || null)
                      "
                      style="height: 150px; overflow-y: auto"
                      density="compact"
                    >
                      <v-list-item v-if="!slot.selectedAccountId"
                        ><small>先にアカウントを選択</small></v-list-item
                      >
                      <v-list-item
                        v-for="char in getCharactersForSlot(slot)"
                        :key="char.id"
                        :value="char.id"
                        :disabled="isCharSelectedInOtherSlot(char.id, index)"
                      >
                        <v-list-item-title>{{
                          formatCharForDisplay(char, false)
                        }}</v-list-item-title>
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
              @click="handleSaveTeam"
              color="primary"
              size="large"
            >
              {{
                isSaving
                  ? "保存中..."
                  : teamForm.id
                  ? "編成を更新"
                  : "編成を保存"
              }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import firebase from "firebase/compat/app";
import { formatOwnedCharDisplayName } from "../../utils/formatters.js";
import { databaseService } from "../../services/database.js";

const props = defineProps({
  userId: { type: String, required: true },
  dataLoaded: { type: Boolean, required: true },
  teams: { type: Array, required: true },
  accounts: { type: Array, required: true },
  ownedCharactersData: { type: Map, required: true },
  characterMastersMap: { type: Map, required: true },
  itemMastersMap: { type: Map, required: true },
});

const emit = defineEmits(["team-added", "team-updated", "team-deleted"]);

const teamTypes = ["禁忌", "天魔", "庭園", "轟絶", "黎絶"];
const teamFilters = reactive({ type: "" });
const isSaving = ref(false);

/**
 * [概要] teamFormの初期状態を生成するヘルパー関数
 * @returns {Object} 新しいteamFormオブジェクト
 */
const createInitialTeamFormState = () => ({
  id: null,
  name: "",
  type: "",
  slots: Array(4)
    .fill()
    .map(() => ({
      selectedAccountId: "",
      selectedOwnedId: "",
      characterSearch: "",
    })),
});

const teamForm = reactive(createInitialTeamFormState());

const filteredTeams = computed(() => {
  return !teamFilters.type
    ? props.teams
    : props.teams.filter((team) => team.type === teamFilters.type);
});

const isTeamFormValid = computed(() => {
  return (
    teamForm.name &&
    teamForm.type &&
    teamForm.slots.every(
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
  const lowerSearch = slot.characterSearch.toLowerCase();
  return !lowerSearch
    ? charList
    : charList.filter((char) =>
        char.monsterName.toLowerCase().includes(lowerSearch)
      );
};

const isCharSelectedInOtherSlot = (ownedId, currentIndex) => {
  return !ownedId
    ? false
    : teamForm.slots.some(
        (slot, index) =>
          index !== currentIndex && slot.selectedOwnedId === ownedId
      );
};

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
  return {
    characterName: master?.monsterName || "不明",
    accountName: account?.name || "不明",
    items: (ownedChar.items || [])
      .map((id) => props.itemMastersMap.get(Number(id)) || `不明ID:${id}`)
      .filter(Boolean),
  };
};

const selectTeam = (team) => {
  // INFO: リアクティブオブジェクトは直接代入せず、プロパティを更新する
  Object.assign(teamForm, {
    id: team.id,
    name: team.name,
    type: team.type,
    slots: team.characters.map((char) => ({
      selectedAccountId: char.accountId,
      selectedOwnedId: char.ownedCharacterId,
      characterSearch: "",
    })),
  });
};

const resetTeamForm = () => {
  Object.assign(teamForm, createInitialTeamFormState());
};

const handleSaveTeam = async () => {
  if (!isTeamFormValid.value) {
    alert("編成名、タイプ、4体のキャラを全て選択してください。");
    return;
  }
  isSaving.value = true;
  const teamData = {
    userId: props.userId,
    name: teamForm.name,
    type: teamForm.type,
    characters: teamForm.slots.map((s) => ({
      accountId: s.selectedAccountId,
      ownedCharacterId: s.selectedOwnedId,
    })),
  };

  try {
    const id = teamForm.id;
    Object.assign(
      teamData,
      id
        ? { updatedAt: firebase.firestore.FieldValue.serverTimestamp() }
        : { createdAt: firebase.firestore.FieldValue.serverTimestamp() }
    );
    const result = await databaseService.saveTeam(id, teamData);

    if (id) {
      emit("team-updated", { ...teamData, id });
      alert("編成を更新しました。");
    } else {
      const newTeam = {
        ...teamData,
        id: result.id,
        createdAt: { toDate: () => new Date() },
      };
      emit("team-added", newTeam);
      alert("編成を保存しました。");
      resetTeamForm();
    }
  } catch (error) {
    console.error("編成保存失敗:", error);
    alert("エラー: " + error.message);
  } finally {
    isSaving.value = false;
  }
};

const handleDeleteTeam = async (teamId) => {
  if (confirm("この編成を本当に削除しますか？")) {
    try {
      await databaseService.deleteTeam(teamId);
      emit("team-deleted", teamId);
      alert("編成を削除しました。");
      if (teamForm.id === teamId) {
        resetTeamForm();
      }
    } catch (error) {
      console.error("編成削除失敗:", error);
      alert("エラー: " + error.message);
    }
  }
};

const formatCharForDisplay = (char, includeItems) => {
  return formatOwnedCharDisplayName(
    char,
    includeItems,
    props.characterMastersMap,
    props.itemMastersMap
  );
};
</script>
