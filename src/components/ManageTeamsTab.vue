<template>
  <div id="tab-manage-teams" class="tab-content">
    <h2>編成管理</h2>
    <div class="team-management-container">
      <div class="team-list-panel">
        <h3>編成一覧</h3>
        <div class="form-section" style="padding: 0;">
          <label>タイプで絞り込み:</label>
          <select v-model="teamFilters.type" style="width: 100%;">
            <option value="">すべて</option>
            <option v-for="type in teamTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <ul class="team-list">
          <li v-if="!dataLoaded">データを読み込んでいます...</li>
          <li v-else-if="filteredTeams.length === 0">該当する編成がありません。</li>
          <li v-for="team in filteredTeams" :key="team.id" @click="selectTeam(team)" :class="{ active: teamForm.id === team.id }">
            <div class="team-list-item-header">
              <strong>{{ team.name   }}</strong>
              <span>({{ team.type }})</span>
              <button class="delete-btn-small" @click.stop="handleDeleteTeam(team.id)">削除</button>
            </div>
            <table class="team-detail-table">
              <thead><tr><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead>
              <tbody>
                <tr><td v-for="(_, index) in Array(4)" :key="index" :title="getTeamSlotDetails(team, index).characterName">{{ getTeamSlotDetails(team, index).characterName }}</td></tr>
                <tr><td v-for="(_, index) in Array(4)" :key="index">{{ getTeamSlotDetails(team, index).accountName }}</td></tr>
                <tr v-for="itemIndex in 3" :key="itemIndex"><td v-for="(_, slotIndex) in Array(4)" :key="slotIndex" :title="getTeamSlotDetails(team, slotIndex).items[itemIndex - 1]">{{ getTeamSlotDetails(team, slotIndex).items[itemIndex - 1] || '—' }}</td></tr>
              </tbody>
            </table>
          </li>
        </ul>
      </div>
      <div class="team-form-panel">
        <h3>{{ teamForm.id ? '編成編集' : '新規編成作成' }}</h3>
        <button @click="resetTeamForm" style="margin-bottom: 15px;">新規作成フォームを開く</button>
        <div class="form-section">
          <label>編成名:</label>
          <input type="text" v-model.trim="teamForm.name " placeholder="例: 天魔の孤城 第1の間">
          <label>タイプ:</label>
          <select v-model="teamForm.type">
            <option disabled value="">タイプを選択</option>
            <option v-for="type in teamTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <h4>キャラクター編成 (4体)</h4>
        <div class="team-slots-container">
          <div v-for="(slot, index) in teamForm.slots" :key="index" class="team-slot">
            <h5>スロット {{ index + 1 }}</h5>
            <label>アカウント:</label>
            <select v-model="slot.selectedAccountId">
              <option value="" disabled>アカウント選択</option>
              <option v-for="acc in accounts" :key="acc.id " :value="acc.id">{{ acc.name }}</option>
            </select>
            <label>キャラクター:</label>
            <input type="text" v-model="slot.characterSearch" placeholder="キャラ名で検索">
            <select v-model="slot.selectedOwnedId" size="5" style="width: 100%;">
              <option v-if="!slot.selectedAccountId" value="">先にアカウントを選択</option>
              <option v-for="char in getCharactersForSlot(slot)" :key="char.id" :value="char.id" :disabled="isCharSelectedInOtherSlot(char.id, index)">
                {{ formatCharForDisplay(char, true) }} {{ isCharSelectedInOtherSlot(char.id, index) ? '(選択済)' : '' }}
              </option>
            </select>
          </div>
        </div>
        <br>
        <button @click="handleSaveTeam" :disabled="!isTeamFormValid || isSaving" class="save-button">
          {{ isSaving ? '保存中...' : (teamForm.id ? '編成を更新' : '編成を保存') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatOwnedCharDisplayName } from '../utils/formatters.js';
/**
 * [概要] 編成の閲覧・作成・編集・削除を行うタブUIコンポーネント。
 */
export default {
  name: 'ManageTeamsTab',
  props: {
    dataLoaded: { type: Boolean, required: true },
    teams: { type: Array, required: true },
    accounts: { type: Array, required: true },
    ownedCharactersData: { type: Map, required: true },
    characterMastersMap: { type: Map, required: true },
    itemMastersMap: { type: Map, required: true },
    isSaving: { type: Boolean, default: false },
  },

  data() {
    return {
      teamTypes: ['禁忌', '天魔', '庭園', '轟絶', '黎絶'],
      teamFilters: { type: '' },
      teamForm: {
        id: null,
        name: '',
        type: '',
        slots: Array(4).fill().map(() => ({
          selectedAccountId: '',
          selectedOwnedId: '',
          characterSearch: ''
        })),
      },
    }
  },

  computed: {
    filteredTeams() {
      return !this.teamFilters.type ? this.teams : this.teams.filter(team => team.type === this.teamFilters.type);
    },
    isTeamFormValid() {
      return this.teamForm.name  && this.teamForm.type && this.teamForm.slots.every(slot => slot.selectedAccountId && slot.selectedOwnedId);
    },
  },

  methods: {
    getCharactersForSlot(slot) {
      if (!slot.selectedAccountId) return [];
      const ownedList = this.ownedCharactersData.get(slot.selectedAccountId) || [];
      const charList = ownedList.map (char => {
        const master = this.characterMastersMap.get(char.characterMasterId);
        return { ...char, accountId: slot.selectedAccountId, indexNumber: master?.indexNumber || 999999, monsterName: master?.monsterName || '不明' };
      }).sort((a,b) => a.indexNumber - b.indexNumber);
      const lowerSearch = slot.characterSearch.toLowerCase();
      return !lowerSearch ? charList : charList.filter(char => char.monsterName.toLowerCase().includes(lowerSearch));
    },
    isCharSelectedInOtherSlot(ownedId, currentIndex) {
      return !ownedId ? false : this.teamForm.slots.some((slot, index) => index !== currentIndex && slot.selectedOwnedId === ownedId);
    },
    getTeamSlotDetails(team, slotIndex) {
      const emptySlot = { characterName: '—', accountName: '—', items: [] };
      if (!team.characters || !this.dataLoaded || slotIndex >= team.characters.length) return emptySlot;
      const charSlot = team.characters[slotIndex];
      const account = this.accounts.find(acc => acc.id === charSlot.accountId);
      const ownedChar = (this.ownedCharactersData.get(charSlot.accountId) || []).find(c => c.id === charSlot.ownedCharacterId);
      if (!ownedChar) return { characterName: 'キャラ不明', accountName: account?.name || '不明', items: [] };
      const master = this.characterMastersMap.get(ownedChar.characterMasterId);
      return {
        characterName: master?.monsterName || '不明',
        accountName: account?.name || '不明',
        items: (ownedChar.items || []).map(id => this.itemMastersMap.get(Number(id)) || `不明ID:${id}`).filter(Boolean)
      };
    },
    selectTeam(team) {
      this.teamForm = {
        ...this.teamForm,
        id: team.id,
        name: team.name,
        type: team.type,
        slots: team.characters.map (char => ({
          selectedAccountId: char.accountId,
          selectedOwnedId: char.ownedCharacterId,
          characterSearch: ''
        }))
      };
    },
    resetTeamForm() {
      this.teamForm = {
        id: null,
        name: '',
        type: '',
        slots: Array(4).fill().map(() => ({
          selectedAccountId: '',
          selectedOwnedId: '',
          characterSearch: ''
        }))
      };
    },
    handleSaveTeam() {
      if (!this.isTeamFormValid) {
        alert('編成名、タイプ、4体のキャラを全て選択してください。');
        return;
      }
      this.$emit('save-team', { ...this.teamForm });
    },
    handleDeleteTeam(teamId) {
      if (confirm('この編成を本当に削除しますか？')) {
        this.$emit('delete-team', teamId);
        // INFO: もし削除対象が編集中だったらフォームをリセットする
        if (this.teamForm.id  === teamId) {
          this.resetTeamForm();
        }
      }
    },
    formatCharForDisplay(char, includeItems) {
      return formatOwnedCharDisplayName(char, includeItems, this.characterMastersMap, this.ownedCharactersData, this.itemMastersMap, null);
    },
  }
}
</script>