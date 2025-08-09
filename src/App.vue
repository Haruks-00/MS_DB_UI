<template>
  <div id="app-root" class="container" v-cloak>
    <div class="main-header">
      <h1>キャラクター管理</h1>
      <auth-status :user="user" @login="handleLogin" @logout="handleLogout" />
    </div>
    <div v-if="user">
      <div class="tab-nav">
        <button class="tab-btn" :class="{ active: activeTab === 'view-all' }" @click="activeTab = 'view-all'">所持状況一覧</button>
        <button class="tab-btn" :class="{ active: activeTab === 'add-owned' }" @click="activeTab = 'add-owned'">所持キャラ追加</button>
        <button class="tab-btn" :class="{ active: activeTab === 'manage-items' }" @click="activeTab = 'manage-items'">アイテム管理</button>
        <button class="tab-btn" :class="{ active: activeTab === 'manage-teams' }" @click="activeTab = 'manage-teams'">編成管理</button>
        <button class="tab-btn" :class="{ active: activeTab === 'add-master' }" @click="activeTab = 'add-master'">マスター追加</button>
        <button class="tab-btn" :class="{ active: activeTab === 'edit-master' }" @click="activeTab = 'edit-master'">マスター編集</button>
      </div>
      
      <account-selector
        :accounts="accounts"
        v-model="selectedAccountId"
        :visible="isAccountControlVisible"
      />
      
      <view-all-characters-tab
        v-if="activeTab === 'view-all'"
        :data-loaded="dataLoaded"
        :accounts="accounts"
        :character-masters="characterMasters"
        :item-masters="itemMasters"
        :gacha-masters="gachaMasters"
        :owned-count-map="ownedCountMap"
        :owned-characters-data="ownedCharactersData"
        :item-masters-map="itemMastersMap"
      />
      
      <add-owned-character-tab 
        v-if="activeTab === 'add-owned'"
        :character-masters="characterMasters"
        :character-masters-map="characterMastersMap"
        :selected-account-id="selectedAccountId"
        :owned-count-map="ownedCountMap"
        @character-added="handleCharacterAdded"
      />

      <manage-items-tab
        v-if="activeTab === 'manage-items'"
        :selected-account-id="selectedAccountId"
        :owned-characters-data="ownedCharactersData"
        :character-masters-map="characterMastersMap"
        :item-masters="itemMasters"
        :item-masters-map="itemMastersMap"
        @items-updated="handleItemsUpdated"
        @items-moved="handleItemsMoved"
      />
      
      <manage-teams-tab
        v-if="activeTab === 'manage-teams'"
        :user-id="user.uid"
        :data-loaded="dataLoaded"
        :teams="teams"
        :accounts="accounts"
        :owned-characters-data="ownedCharactersData"
        :character-masters-map="characterMastersMap"
        :item-masters-map="itemMastersMap"
        @team-added="handleTeamAdded"
        @team-updated="handleTeamUpdated"
        @team-deleted="handleTeamDeleted"
      />

      <add-master-character-tab
        v-if="activeTab === 'add-master'"
        :gacha-masters="gachaMasters"
        @master-added="handleMasterDataChanged"
      />
      
      <edit-master-character-tab
        v-if="activeTab === 'edit-master'"
        :character-masters="characterMasters"
        :gacha-masters="gachaMasters"
        @master-updated="handleMasterDataChanged"
      />

    </div>
  </div>
</template>

<script>
import { authService } from './services/auth.js';
import { databaseService } from './services/database.js';
import AuthStatus from './components/AuthStatus.vue';
import AccountSelector from './components/AccountSelector.vue';
import ViewAllCharactersTab from './components/ViewAllCharactersTab.vue';
import AddOwnedCharacterTab from './components/AddOwnedCharacterTab.vue';
import ManageItemsTab from './components/ManageItemsTab.vue';
import ManageTeamsTab from './components/ManageTeamsTab.vue';
import AddMasterCharacterTab from './components/AddMasterCharacterTab.vue';
import EditMasterCharacterTab from './components/EditMasterCharacterTab.vue';

export default {
  name: 'App',
  components: {
    AuthStatus,
    AccountSelector,
    ViewAllCharactersTab,
    AddOwnedCharacterTab,
    ManageItemsTab,
    ManageTeamsTab,
    AddMasterCharacterTab,
    EditMasterCharacterTab,
  },
  
  data() {
    return {
      // INFO: 全体的なアプリケーション状態
      user: null, isAuthReady: false, dataLoaded: false,
      
      // INFO: Firestoreから取得するマスターデータとユーザーデータ
      accounts: [], characterMasters: [], itemMasters: [], gachaMasters: [], teams: [],
      
      // INFO: パフォーマンス向上のためのデータ構造
      itemMastersMap: new Map(), ownedCountMap: new Map(), ownedCharactersData: new Map(), characterMastersMap: new Map(),
      
      // INFO: UIの状態管理
      activeTab: 'view-all', selectedAccountId: null,
    }
  },

  created() {
    authService.onAuthStateChanged(user => {
      this.user = user;
      this.isAuthReady = true;
      if (user) { this.loadInitialData(); } else { this.resetLoadedData(); }
    });
  },

  computed: {
    isAccountControlVisible() { return this.activeTab === 'add-owned' || this.activeTab === 'manage-items'; },
  },

  methods: {
    handleLogin() { authService.loginWithGoogle().catch(() => alert("ログインに失敗しました。")); },
    handleLogout() { authService.logout(); },

    resetLoadedData() { Object.assign(this, { dataLoaded: false, accounts: [], characterMasters: [], itemMasters: [], gachaMasters: [], teams: [], itemMastersMap: new Map(), ownedCountMap: new Map(), ownedCharactersData: new Map(), characterMastersMap: new Map(), selectedAccountId: null }); },
    async loadInitialData() {
      if (this.dataLoaded) return;
      if (!this.user) return;
      console.log("初期データの読み込みを開始...");
      try {
        const processedData = await databaseService.loadAndProcessInitialData(this.user.uid);
        
        // INFO: サービスから受け取った整形済みのデータをまとめてコンポーネントのdataにセットします
        Object.assign(this, processedData);
        
        if (this.accounts.length > 0) this.selectedAccountId = this.accounts[0].id;
        this.dataLoaded = true;
        console.log("初期データの読み込み完了");
      } catch (e) { 
        console.error("データ読み込みエラー:", e);
        alert(`データ読み込みエラー: ${e.message}`); 
      }
    },
    /**
     * [概要] AddOwnedCharacterTabからの通知を受け、ローカルの状態を更新する。
     * @param {Object} payload - { accountId, newCharacter } を含むオブジェクト
     */
    handleCharacterAdded({ accountId, newCharacter }) {
      // INFO: 子コンポーネントがDB更新済みのため、このメソッドはローカル状態の更新に専念する
      if (!this.ownedCharactersData.has(accountId)) {
        this.$set(this.ownedCharactersData, accountId, []);
      }
      this.ownedCharactersData.get(accountId).push(newCharacter);

      const masterId = newCharacter.characterMasterId;
      const countKey = `${masterId}-${accountId}`;
      const currentCount = this.ownedCountMap.get(countKey) || 0;
      this.$set(this.ownedCountMap, countKey, currentCount + 1);
    },
    
    /**
     * [概要] ManageItemsTabからの通知を受け、キャラクターのアイテム情報をローカルで更新する。
     * @param {Object} payload - { accountId, ownedCharacterId, items }
     */
    handleItemsUpdated({ accountId, ownedCharacterId, items }) {
      const accountChars = this.ownedCharactersData.get(accountId) || [];
        const charToUpdate = accountChars.find(c => c.id === ownedCharacterId);
      if (charToUpdate) {
        this.$set(charToUpdate, 'items', items);
      }
    },

    /**
     * [概要] ManageItemsTabからの通知を受け、アイテム移動をローカルで反映する。
     * @param {Object} payload - { accountId, from: {id, items}, to: {id, items} }
     */
    handleItemsMoved({ accountId, from, to }) {
      const accountChars = this.ownedCharactersData.get(accountId) || [];
      const fromChar = accountChars.find(c => c.id === from.id );
      const toChar = accountChars.find(c => c.id === to.id );
      if (fromChar) {
        this.$set(fromChar, 'items', from.items);
      }
      if (toChar) {
        this.$set(toChar, 'items', to.items);
      }
    },
    
    // NOTE: 以下、新しく追加された編成管理ハンドラ
    handleTeamAdded(newTeam) {
          this.teams.unshift(newTeam);
    },
    handleTeamUpdated(updatedTeam) {
      const index = this.teams.findIndex(t => t.id === updatedTeam.id );
      if (index > -1) {
        this.$set(this.teams, index, { ...this.teams[index], ...updatedTeam });
      }
    },
    handleTeamDeleted(teamId) {
        this.teams = this.teams.filter(t => t.id !== teamId);
    },

    /**
     * [概要] マスターデータが変更された際のハンドラ。
     * @note マスターデータの変更は影響範囲が大きいため、安全策としてページをリロードする。
     */
    handleMasterDataChanged() {
      // WARNING: マスターデータのローカル状態を整合性を持って更新するのは複雑なため、
      //          現時点では最も安全なリロード戦略をとる。
        location.reload();
    },
  },
}
</script>

<style>
body { font-family: 'Segoe UI', Meiryo, sans-serif; padding: 20px; background-color: #f4f7f9; color: #333; }
.container { max-width: 95%; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
h1, h2, h3 { border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; color: #1a237e; }
.main-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; }
.main-header h1 { margin: 0; border-bottom: none; padding-bottom: 0; }
.tab-nav { margin-bottom: 20px; }
.tab-nav button { padding: 10px 15px; margin-right: 5px; border: 1px solid #ccc; background-color: #f8f8f8; cursor: pointer; font-size: 16px; border-radius: 5px 5px 0 0; }
.tab-nav button.active { background-color: #1a237e; color: white; border-bottom: 1px solid #1a237e; }
.tab-content { padding: 20px; border: 1px solid #ccc; border-top: none; border-radius: 0 0 5px 5px; }
label { font-weight: bold; margin-right: 10px; display: block; margin-top: 15px; }
input[type="text"], input[type="number"], select { width: 100%; box-sizing: border-box; padding: 10px; margin-top: 5px; border-radius: 4px; border: 1px solid #ccc; font-size: 16px; }
button { background-color: #3f51b5; color: white; border: none; cursor: pointer; padding: 12px 20px; font-size: 16px; border-radius: 4px; transition: background-color 0.2s; }
button:hover { background-color: #303f9f; }
button:disabled { background-color: #9e9e9e; cursor: not-allowed; }
table { border-collapse: collapse; width: 100%; margin-top: 20px; table-layout: fixed; }
th, td { border: 1px solid #ccc; padding: 12px; text-align: left; }
th { background-color: #e8eaf6; vertical-align: middle; }
td { height: 4em; vertical-align: top; white-space: normal; word-break: break-all; line-height: 1.2; }
th[colspan="2"] { text-align: center; background-color: #d1d8f0; }
th[rowspan="2"] { vertical-align: middle; }
td.status-owned { text-align: center; font-weight: bold; color: #4caf50; }
td.status-unowned { text-align: center; color: #9e9e9e; }
.form-section { margin-bottom: 30px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; background-color: #fafafa; }
.item-select-container { display: flex; gap: 15px; margin-top: 10px; }
.item-select-container select { flex: 1; }
.search-filters { display: flex; gap: 15px; margin-bottom: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px; flex-wrap: wrap; }
.search-filters > div { flex: 1; min-width: 200px; }
.filter-buttons { display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap; }
.filter-buttons button { padding: 8px 15px; font-size: 14px; }
td.element-火 { background-color: #ffebee; }
td.element-水 { background-color: #e3f2fd; }
td.element-木 { background-color: #e8f5e9; }
td.element-光 { background-color: #fffde7; }
td.element-闇 { background-color: #f3e5f5; }
#status-bar { margin-top: 10px; font-size: 14px; color: #555; }
#items-to-move-container div { display: flex; align-items: center; margin-bottom: 5px; }
#items-to-move-container .movable-item-checkbox { margin-right: 8px; }
#items-to-move-container label { margin-top: 0; cursor: pointer; }
[v-cloak] { display: none; }
.team-management-container { display: flex; gap: 20px; }
.team-list-panel { flex: 1; max-width: 50%; }
.team-form-panel { flex: 1; max-width: 50%; }
.team-list { list-style: none; padding: 0; max-height: 70vh; overflow-y: auto; border: 1px solid #ccc; border-radius: 5px; }
.team-list li { padding: 10px; border-bottom: 1px solid #eee; cursor: pointer; transition: background-color 0.2s; }
.team-list li:hover { background-color: #f5f5f5; }
.team-list li.active { background-color: #e8eaf6; }
.team-slots-container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.team-slot { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
.team-detail-table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; table-layout: fixed; }
.team-detail-table th, .team-detail-table td { border: 1px solid #ddd; padding-left: 4px; padding-right: 4px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.team-detail-table th { background-color: #f2f2f2; font-weight: bold; padding-top: 2px; padding-bottom: 2px; }
.team-detail-table td { padding-top: 1px; padding-bottom: 1px; height: 1em; }
.team-detail-table tbody tr:nth-child(1) td { height: 1em; font-weight: bold; }
.team-detail-table tbody tr:nth-child(2) td { font-size: 12px; color: #555; padding-top: 2px; padding-bottom: 2px; }
.team-list-item-header { position: relative; padding-right: 50px; }
.delete-btn-small { position: absolute; top: 50%; right: 0; transform: translateY(-50%); padding: 4px 8px; font-size: 12px; background-color: #f44336; }
.delete-btn-small:hover { background-color: #d32f2f; }
.save-button { width: 100%; padding: 15px; font-size: 18px; }
</style>