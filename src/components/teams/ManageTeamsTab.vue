<template>
  <div>
    <!-- INFO: h2に見出し用のクラスを追加して、下部に余白を設ける -->
    <h2 class="mb-4">編成管理</h2>
    <v-row>
      <v-col cols="12" md="6">
        <!-- INFO: TeamListコンポーネント -->
        <team-list
          :data-loaded="dataLoaded"
          :teams="teams"
          :accounts="accounts"
          :owned-characters-data="ownedCharactersData"
          :character-masters-map="characterMastersMap"
          :item-masters-map="itemMastersMap"
          :selected-team-id="teamForm.id   "
          @select-team="selectTeam"
          @delete-team="handleDeleteTeam"
        />
      </v-col>
      
      <v-col cols="12" md="6">
        <!-- INFO: TeamFormコンポーネント -->
        <team-form
          :team="teamForm"
          :accounts="accounts"
          :owned-characters-data="ownedCharactersData"
          :character-masters-map="characterMastersMap"
          :item-masters-map="itemMastersMap"
          :is-saving="isSaving"
          @save-team="handleSaveTeam"
          @reset-form="resetTeamForm"
          @update:team="handleTeamUpdate"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import firebase from 'firebase/compat/app';
import { databaseService } from '../../services/database.js';
import TeamList from './TeamList.vue';
import TeamForm from './TeamForm.vue';

const props = defineProps({
  userId: { type: String, required: true },
  dataLoaded: { type: Boolean, required: true },
  teams: { type: Array, required: true },
  accounts: { type: Array, required: true },
  ownedCharactersData: { type: Map, required: true },
  characterMastersMap: { type: Map, required: true },
  itemMastersMap: { type: Map, required: true },
});

const emit = defineEmits(['team-added', 'team-updated', 'team-deleted']);

const isSaving = ref(false);

/**
 * [概要] チームフォームの初期状態を生成するファクトリ関数
 * @returns {Object} チームフォームの初期データ
 */
const createInitialTeamFormState = () => ({
  id: null,
  name: '',
  type: '',
  slots: Array(4).fill().map(() => ({
    selectedAccountId: '',
    selectedOwnedId: '',
    characterSearch: ''
  })),
});

// INFO: フォームのデータは親であるこのコンポーネントが責任を持ちます
const teamForm = reactive(createInitialTeamFormState());

const handleTeamUpdate = (updatedTeam) => {
  // TeamFormから渡された新しいteamオブジェクトでteamFormを更新する
  Object.assign(teamForm, updatedTeam);
};

/**
 * [概要] TeamListで選択されたチームの情報をフォームに反映する
 * @param {Object} team - 選択されたチームオブジェクト
 */
const selectTeam = (team) => {
  Object.assign(teamForm, {
    id: team.id,
    name: team.name,
    type: team.type,
    // NOTE: slotsはディープコピーして、元のteamオブジェクトに影響を与えないようにします
    slots: JSON.parse(JSON.stringify(team.characters.map (char => ({
      selectedAccountId: char.accountId,
      selectedOwnedId: char.ownedCharacterId,
      characterSearch: ''
    }))))
  });
};

/**
 * [概要] フォームの状態を初期状態にリセットする
 */
const resetTeamForm = () => {
  Object.assign(teamForm, createInitialTeamFormState());
};

/**
 * [概要] TeamFormからのイベントを受けてチームを保存/更新する
 */
const handleSaveTeam = async () => {
  if (!(teamForm.name   && teamForm.type && teamForm.slots.every(slot => slot.selectedAccountId && slot.selectedOwnedId))) {
    alert('編成名、タイプ、4体のキャラを全て選択してください。');
    return;
  }
  isSaving.value = true;
  const teamData = {
    userId: props.userId,
    name: teamForm.name,
    type: teamForm.type,
    characters: teamForm.slots.map  (s => ({ accountId: s.selectedAccountId, ownedCharacterId: s.selectedOwnedId }))
  };
  
  try {
    const id = teamForm.id;
    Object.assign(teamData, id ? { updatedAt: firebase.firestore.FieldValue.serverTimestamp() } : { createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    const result = await databaseService.saveTeam(id, teamData);
    
    if (id) {
      // NOTE: ローカルのteams配列を直接更新する代わりに、親へのイベント通知に統一します
      emit('team-updated', { ...teamData, id });
      alert('編成を更新しました。');
    } else {
      const newTeam = { ...teamData, id: result.id , createdAt: { toDate: () => new Date() } };
      emit('team-added', newTeam);
      alert('編成を保存しました。');
      resetTeamForm();
    }
  } catch (error) {
    console.error('編成保存失敗:', error);
    alert('エラー: ' + error.message);
  } finally {
    isSaving.value = false;
  }
};

/**
 * [概要] TeamListからのイベントを受けてチームを削除する
 * @param {string} teamId - 削除対象のチームID
 */
const handleDeleteTeam = async (teamId) => {
  if (confirm('この編成を本当に削除しますか？')) {
    try {
      await databaseService.deleteTeam(teamId);
      emit('team-deleted', teamId);
      alert('編成を削除しました。');
      if (teamForm.id === teamId) {
        resetTeamForm();
      }
    } catch (error) {
      console.error('編成削除失敗:', error);
      alert('エラー: ' + error.message);
    }
  }
};
</script>