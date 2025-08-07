// src/App.vue
<!-- #region COMPONENT: App -->
<template>
  <!-- #region TEMPLATE -->
  <div id="app-root" class="container" v-cloak>
    <div class="main-header">
      <h1>キャラクター管理</h1>
      <div id="auth-container">
        <div v-if="user">
          <p>ようこそ, {{ user.displayName }} さん</p>
          <button @click="handleLogout">ログアウト</button>
        </div>
        <div v-else>
          <p>データを表示・編集するにはログインしてください。</p>
          <button @click="handleLogin">Googleでログイン</button>
        </div>
      </div>
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
      <div id="account-controls" v-show="isAccountControlVisible">
        <label for="account-selector">管理対象アカウント:</label>
        <select id="account-selector" v-model="selectedAccountId">
          <option v-for="account in accounts" :key="account.id" :value="account.id">{{ account.name }}</option>
        </select>
      </div>
      
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
        :selected-account-id="selectedAccountId"
        :owned-count-map="ownedCountMap"
        :is-adding="addChar.isAdding"
        @add-character="addOwnedCharacter"
      />

      <manage-items-tab
        v-if="activeTab === 'manage-items'"
        :selected-account-id="selectedAccountId"
        :owned-characters-data="ownedCharactersData"
        :character-masters-map="characterMastersMap"
        :item-masters="itemMasters"
        :item-masters-map="itemMastersMap"
        :is-updating="itemManage.isUpdating"
        :is-moving="itemMove.isMoving"
        @update-items="updateItems"
        @move-items="moveItems"
      />
      
      <manage-teams-tab
        v-if="activeTab === 'manage-teams'"
        :data-loaded="dataLoaded"
        :teams="teams"
        :accounts="accounts"
        :owned-characters-data="ownedCharactersData"
        :character-masters-map="characterMastersMap"
        :item-masters-map="itemMastersMap"
        :is-saving="teamManage.isSaving"
        @save-team="handleSaveTeam"
        @delete-team="deleteTeam"
      />

      <div id="tab-add-master" class="tab-content" v-if="activeTab === 'add-master'">
        <h2>キャラクターマスター新規追加</h2>
        <div class="form-section">
          <label>図鑑番号:</label><input type="number" v-model.number="master.no " placeholder="例: 1234">
          <label>キャラクター名:</label><input type="text" v-model.trim="master.name  " required>
          <label>属性:</label><input type="text" v-model.trim="master.element">
          <label>分類:</label><input type="text" v-model.trim="master.type">
          <label>排出ガチャ (限定の場合):</label>
          <select v-model="master.gacha">
            <option value="">(限定ではない/その他)</option>
            <option v-for="gacha in gachaMasters" :key="gacha.id" :value="gacha.name">{{ gacha.name }}</option>
          </select>
          <br><br>
          <button @click="saveMaster" :disabled="!master.name || master.isSaving">{{ master.isSaving ? '追加中...' : 'マスターリストに新規追加' }}</button>
        </div>
      </div>
      <div id="tab-edit-master" class="tab-content" v-if="activeTab === 'edit-master'">
        <h2>キャラクターマスター編集</h2>
        <div class="form-section">
            <label>キャラクター検索:</label><input type="text" v-model="editMaster.search " placeholder="編集したいキャラクター名で検索">
            <label>編集するキャラクターを選択:</label>
            <select v-model="editMaster.selectedMasterId" size="10" style="width:100%">
              <option v-for="master in editableMasters" :key="master.id" :value="master.id">[{{ master.indexNumber || '?' }}] {{ master.monsterName }}</option>
            </select>
        </div>
        <div class="form-section" v-if="editMaster.selectedMasterId">
          <h3>編集フォーム</h3>
          <label>図鑑番号:</label><input type="number" v-model.number="editMaster.no " placeholder="例: 1234">
          <label>キャラクター名:</label><input type="text" v-model.trim="editMaster.name " required>
          <label>属性:</label><input type="text" v-model.trim="editMaster.element">
          <label>分類:</label><input type="text" v-model.trim="editMaster.type">
          <label>排出ガチャ (限定の場合):</label>
          <select v-model="editMaster.gacha">
            <option value="">(限定ではない/その他)</option>
            <option v-for="gacha in gachaMasters" :key="gacha.id" :value="gacha.name">{{ gacha.name }}</option>
          </select>
          <br><br>
          <button @click="updateMaster" :disabled="!editMaster.selectedMasterId || editMaster.isUpdating">{{ editMaster.isUpdating ? '更新中...' : 'マスター情報を更新' }}</button>
        </div>
      </div>
    </div>
  </div>
  <!-- #endregion -->
</template>

<script>
// #region SCRIPT
// #region IMPORTS
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { authService } from './services/auth.js';
import { databaseService } from './services/database.js';
import AddOwnedCharacterTab from './components/AddOwnedCharacterTab.vue';
import ManageItemsTab from './components/ManageItemsTab.vue';
import ManageTeamsTab from './components/ManageTeamsTab.vue';
import ViewAllCharactersTab from './components/ViewAllCharactersTab.vue'; // @temp: ADDED
// #endregion

export default {
  // #region COMPONENT_CONFIG
  name: 'App',
  components: { AddOwnedCharacterTab, ManageItemsTab, ManageTeamsTab, ViewAllCharactersTab, }, // @temp: MODIFIED
  // #endregion
  
  // #region STATE_MANAGEMENT
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

      // INFO: 各コンポーネントが管理する状態（将来的にはコンポーネント内に移動）
      addChar: { isAdding: false },
      itemManage: { isUpdating: false },
      itemMove: { isMoving: false },
      teamManage: { isSaving: false },
      master: { no: '', name: '', element: '', type: '恒常', gacha: '', isSaving: false },
      editMaster: { search: '', selectedMasterId: null, no: '', name: '', element: '', type: '', gacha: '', isUpdating: false },
    }
  },
  // #endregion

  // #region LIFECYCLE_HOOKS
  created() {
    authService.onAuthStateChanged(user => {
      this.user = user;
      this.isAuthReady = true;
      if (user) { this.loadInitialData(); } else { this.resetLoadedData(); }
    });
  },
  // #endregion

  // #region COMPUTED_PROPERTIES
  computed: {
    isAccountControlVisible() { return this.activeTab === 'add-owned' || this.activeTab === 'manage-items'; },
    editableMasters() { if (!this.characterMasters.length) return []; const lowerSearch = this.editMaster.search .toLowerCase(); return this.characterMasters.filter(master => !lowerSearch || master.monsterName.toLowerCase().includes(lowerSearch)); },
  },
  // #endregion

  // #region WATCHERS
  watch: {
    'editMaster.selectedMasterId'(newId) {
      if (!newId) { Object.assign(this.editMaster, { name: '', no: '', element: '', type: '', gacha: '' }); return; }
      const master = this.characterMastersMap.get(newId);
      if (master) { Object.assign(this.editMaster, { name: master.monsterName, no: master.indexNumber, element: master.element, type: master.type, gacha: master.ejectionGacha }); }
    },
  },
  // #endregion
  
  // #region METHODS
  methods: {
    // #region AUTHENTICATION_METHODS
    handleLogin() { authService.loginWithGoogle().catch(() => alert("ログインに失敗しました。")); },
    handleLogout() { authService.logout(); },
    // #endregion

    // #region DATA_HANDLING_METHODS
    resetLoadedData() { Object.assign(this, { dataLoaded: false, accounts: [], characterMasters: [], itemMasters: [], gachaMasters: [], teams: [], itemMastersMap: new Map(), ownedCountMap: new Map(), ownedCharactersData: new Map(), characterMastersMap: new Map(), selectedAccountId: null }); },
    async loadInitialData() {
      if (this.dataLoaded) return;
      if (!this.user) return;
      console.log("初期データの読み込みを開始...");
      try {
        const [accountsSnap, mastersSnap, itemsSnap, ownedCharsSnap, gachaMastersSnap, teamsSnap] = await databaseService.loadInitialDataRaw(this.user.uid);
        
        // NOTE: 各種マスターデータを取得・整形・キャッシュ
        this.accounts = accountsSnap.docs.map (doc => { const data = doc.data       (); return { id: doc.id    , name: data.Name  || `アカウント${data.id  }`, numericId: data.id, indexNumber: data.indexNumber }; }).sort((a, b) => (a.numericId || 999) - (b.numericId || 999));
        this.characterMasters = mastersSnap.docs.map (doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => (a.indexNumber || 999999) - (b.indexNumber || 999999));
        this.characterMastersMap = new Map(this.characterMasters.map(m => [m.id, m]));
        this.itemMasters = itemsSnap.docs.map (doc => ({...doc.data(), id: Number(doc.data().id) })).sort((a, b) => a.id - b.id  );
        this.itemMastersMap = new Map(this.itemMasters.map (item => [item.id, item.name]));
        this.gachaMasters = gachaMastersSnap.docs.map (doc => doc.data()).sort((a,b) => a.id - b.id);
        this.teams = teamsSnap.docs.map (doc => ({ ...doc.data(), id: doc.id }));

        // NOTE: パフォーマンスのために所持キャラデータをMap構造に変換
        const ownedCharsDataMap = new Map();
        const ownedCountMap = new Map();
        ownedCharsSnap.forEach(doc => {
          const data = doc.data();
          const accountId = doc.ref.parent.parent.id ;
          const masterId = data.characterMasterId;
          const countKey = `${masterId}-${accountId}`;
          ownedCountMap.set(countKey, (ownedCountMap.get(countKey) || 0) + 1);
          if (!ownedCharsDataMap.has(accountId)) ownedCharsDataMap.set(accountId, []);
          ownedCharsDataMap.get(accountId).push({ ...data, id: doc.id });
        });
        this.ownedCharactersData = ownedCharsDataMap;
        this.ownedCountMap = ownedCountMap;
        
        if (this.accounts.length > 0) this.selectedAccountId = this.accounts[0].id;
        this.dataLoaded = true;
        console.log("初期データの読み込み完了");
      } catch (e) { console.error("データ読み込みエラー:", e); alert(`データ読み込みエラー: ${e.message}`); }
    },
    // #endregion

    // #region CHILD_COMPONENT_HANDLERS
    getOwnedCount(masterId, accountId) { return this.ownedCountMap.get(`${masterId}-${accountId}`) || 0; },
    
    async addOwnedCharacter(masterId) {
      if (!masterId || !this.selectedAccountId) return alert('追加するキャラとアカウントを選択してください。');
      if (this.getOwnedCount(masterId, this.selectedAccountId) >= 2) return alert('このキャラは既に2体所持しています。');
      this.addChar.isAdding = true;
      try {
        const master = this.characterMastersMap.get(masterId);
        if (!master) throw new Error('キャラのマスター情報が見つかりません。');
        const newOwnedCharData = { characterMasterId: masterId, monsterName: master.monsterName, items: [], createdAt: firebase.firestore.FieldValue.serverTimestamp() };
        const docRef = await databaseService.addOwnedCharacter(this.selectedAccountId, newOwnedCharData);
        
        // NOTE: DB追加後、ローカルの状態も更新して即時反映させる
        const newLocalChar = { ...newOwnedCharData, id: docRef.id , createdAt: { toDate: () => new Date() }};
        if (!this.ownedCharactersData.has(this.selectedAccountId)) { this.$set(this.ownedCharactersData, this.selectedAccountId, []); }
        this.ownedCharactersData.get(this.selectedAccountId).push(newLocalChar);
        const countKey = `${masterId}-${this.selectedAccountId}`;
        this.$set(this.ownedCountMap, countKey, (this.ownedCountMap.get(countKey) || 0) + 1);
        alert(`「${master.monsterName}」を所持リストに追加しました。`);
      } catch (error) { console.error('キャラ追加失敗:', error); alert('エラー: ' + error.message); } 
      finally { this.addChar.isAdding = false; }
    },
    
    async updateItems({ ownedCharacterId, items }) {
      if (!ownedCharacterId) return;
      this.itemManage.isUpdating = true;
      try {
        await databaseService.updateCharacterItems(this.selectedAccountId, ownedCharacterId, items);
        const accountChars = this.ownedCharactersData.get(this.selectedAccountId) || [];
        const charToUpdate = accountChars.find(c => c.id === ownedCharacterId);
        if (charToUpdate) { this.$set(charToUpdate, 'items', items); }
        alert('アイテムを更新しました。');
      } catch(e) { alert('エラー: ' + e.message); } 
      finally { this.itemManage.isUpdating = false; }
    },
    
    async moveItems({ from, to, selectedItemIds }) {
      this.itemMove.isMoving = true;
      try {
        if (from.id     === to.id     || !from.id || !to.id) throw new Error('有効な移動元と移動先を選択してください。');
        if (selectedItemIds.length === 0) throw new Error('移動するアイテムを選択してください。');
        const accountChars = this.ownedCharactersData.get(this.selectedAccountId) || [];
        const fromChar = accountChars.find(c => c.id === from.id);
        const toChar = accountChars.find(c => c.id === to.id);
        if (!fromChar || !toChar) throw new Error('キャラクター情報が見つかりません。');
        const numericIds = selectedItemIds.map (Number);
        if ((toChar.items?.length || 0) + numericIds.length > 3) throw new Error(`移動先のアイテム所持数が上限を超えます。`);
        
        // NOTE: 移動元と移動先の新しいアイテムリストを作成
        const newFromItems = (fromChar.items || []).map(Number).filter(id => !numericIds.includes(id));
        const newToItems = [...(toChar.items || []).map(Number), ...numericIds];
        
        // NOTE: トランザクションでDBを更新し、成功後にローカルを更新
        await databaseService.moveCharacterItems(this.selectedAccountId, { id: from.id, items: newFromItems }, { id: to.id, items: newToItems });
        this.$set(fromChar, 'items', newFromItems);
        this.$set(toChar, 'items', newToItems);
        alert('アイテムを移動しました。');
      } catch (e) { alert(`エラー: ${e.message}`); } 
      finally { this.itemMove.isMoving = false; }
    },
    
    async handleSaveTeam(teamFormData) {
      this.teamManage.isSaving = true;
      const teamData = { userId: this.user.uid, name: teamFormData.name , type: teamFormData.type, characters: teamFormData.slots.map (s => ({ accountId: s.selectedAccountId, ownedCharacterId: s.selectedOwnedId })) };
      try {
        const id = teamFormData.id ;
        Object.assign(teamData, id ? { updatedAt: firebase.firestore.FieldValue.serverTimestamp() } : { createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        const result = await databaseService.saveTeam(id, teamData);
        if (id) {
          const index = this.teams.findIndex(t => t.id === id);
          if (index > -1) this.$set(this.teams, index, { ...this.teams[index], ...teamData });
          alert('編成を更新しました。');
        } else {
          const newTeam = { ...teamData, id: result.id , createdAt: { toDate: () => new Date() } };
          this.teams.unshift(newTeam);
          alert('編成を保存しました。');
        }
      } catch (error) { console.error('編成保存失敗:', error); alert('エラー: ' + error.message); } 
      finally { this.teamManage.isSaving = false; }
    },
    
    async deleteTeam(teamId) {
      try {
        await databaseService.deleteTeam(teamId);
        this.teams = this.teams.filter(t => t.id !== teamId);
        alert('編成を削除しました。');
      } catch (error) { console.error('編成削除失敗:', error); alert('エラー: ' + error.message); }
    },
    // #endregion

    // #region MASTER_DATA_MANAGEMENT_METHODS
    async saveMaster() {
      if (!this.master.name  ) return alert('キャラクター名は必須です。');
      this.master.isSaving = true;
      try {
        const newData = { indexNumber: this.master.no   ? Number(this.master.no) : 0, monsterName: this.master.name, element: this.master.element || '', type: this.master.type || '恒常', ejectionGacha: this.master.gacha || '' };
        await databaseService.addCharacterMaster(newData);
        // WARNING: マスターデータの変更は影響範囲が大きいため、安全のためリロードを促す
        alert('マスターを追加しました。ページをリロードして反映してください。');
        location.reload();
      } catch(e) { alert('エラー: ' + e.message); } 
      finally { this.master.isSaving = false; }
    },
    
    async updateMaster() {
      if (!this.editMaster.selectedMasterId || !this.editMaster.name  ) return alert('キャラを選択し名前を入力してください。');
      this.editMaster.isUpdating = true;
      try {
        const updatedData = { monsterName: this.editMaster.name, indexNumber: this.editMaster.no   ? Number(this.editMaster.no) : 0, element: this.editMaster.element, type: this.editMaster.type, ejectionGacha: this.editMaster.gacha };
        await databaseService.updateCharacterMaster(this.editMaster.selectedMasterId, updatedData);
        // WARNING: マスターデータの変更は影響範囲が大きいため、安全のためリロードを促す
        alert('マスター情報を更新しました。ページをリロードしてください。');
        location.reload();
      } catch (e) { alert('更新に失敗: ' + e.message); } 
      finally { this.editMaster.isUpdating = false; }
    },
    // #endregion
  },
  // #endregion
}
// #endregion
</script>

<style>
/* #region STYLES */
body { font-family: 'Segoe UI', Meiryo, sans-serif; padding: 20px; background-color: #f4f7f9; color: #333; }
.container { max-width: 95%; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
h1, h2, h3 { border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; color: #1a237e; }
.main-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; }
.main-header h1 { margin: 0; border-bottom: none; padding-bottom: 0; }
#auth-container { text-align: right; }
#auth-container div { display: flex; align-items: center; gap: 10px; }
#auth-container p { margin: 0; }
#auth-container button { padding: 8px 12px; font-size: 14px; white-space: nowrap; }
#account-controls { margin-bottom: 20px; padding: 15px; background-color: #e8eaf6; border-radius: 5px; margin-top: -20px; border-top-left-radius: 0; border-top-right-radius: 0; border: 1px solid #ccc; border-top: none; }
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
/* #endregion */
</style>
<!-- #endregion -->