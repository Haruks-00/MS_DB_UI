<!-- src/App.vue -->
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
          <option v-for="account in accounts" :key="account.id            " :value="account.id">{{ account.name     }}</option>
        </select>
      </div>
      <div id="tab-view-all" class="tab-content" v-if="activeTab === 'view-all'">
        <h2>所持状況一覧</h2>
        <div class="search-filters">
          <div>
            <label>キャラクター名:</label>
            <input type="text" v-model.lazy="filters.charSearch" placeholder="名前 or 図鑑番号">
          </div>
          <div>
            <label>属性:</label>
            <select v-model="filters.element">
              <option value="">すべて</option>
              <option v-for="e in ['火', '水', '木', '光', '闇']" :key="e" :value="e">{{ e }}</option>
            </select>
          </div>
          <div>
            <label>アイテム名:</label>
            <select v-model="filters.itemSearch">
              <option value="">すべて</option>
              <option v-for="item in itemMasters" :key="item.id                                  " :value="item.id">{{ item.name             }}</option>
            </select>
          </div>
          <div>
            <label>分類 (Type):</label>
            <select v-model="filters.type">
              <option value="">すべて</option>
              <option value="恒常_or_限定">恒常 or 限定</option>
              <option v-for="t in characterTypes" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <div>
            <label>排出ガチャ:</label>
            <select v-model="filters.gachaSearch">
              <option value="">すべて</option>
              <option v-for="gacha in gachaMasters" :key="gacha.id          " :value="gacha.name            ">{{ gacha.name }}</option>
            </select>
          </div>
          <div>
            <label>全体の所持状況:</label>
            <select v-model="filters.totalOwnership">
              <option value="">すべて</option>
              <option value="all_unowned">全アカウントで未所持 (合計0体)</option>
              <option value="four_or_more">全アカウントで合計4体以上</option>
              <option value="one_in_each">各アカウントで1体以上所持</option>
            </select>
          </div>
          <div style="flex-basis: 100%; border-top: 1px dashed #ccc; padding-top: 15px; margin-top: 10px;">
            <label style="font-weight: normal;">--- 単一アカウントでの絞り込み ---</label>
          </div>
          <div>
            <label>アカウント:</label>
            <select v-model="filters.account">
              <option value="">指定しない</option>
              <option v-for="account in accounts" :key="account.id" :value="account.id">{{ account.name }}</option>
            </select>
          </div>
          <div>
            <label>所持状況 (指定アカウント内):</label>
            <select v-model="filters.ownership">
              <option value="">すべて</option>
              <option value="owned">所持</option>
              <option value="unowned">未所持</option>
              <option value="one">1体所持</option>
              <option value="two">2体所持</option>
            </select>
          </div>
        </div>
        <div class="filter-buttons">
          <button @click="resetFilters">リセット</button>
          <button @click="showExtraColumns = !showExtraColumns">詳細表示/非表示</button>
        </div>
        <div id="status-bar">表示件数: {{ filteredMasters.length }} / {{ characterMasters.length }}</div>
        <div style="overflow-x: auto;">
          <table id="all-characters-table">
            <thead>
              <tr>
                <th rowspan="2">図鑑No.</th><th rowspan="2">キャラ名</th>
                <th rowspan="2" v-show="showExtraColumns">属性</th>
                <th rowspan="2" v-show="showExtraColumns">分類</th>
                <th rowspan="2" v-show="showExtraColumns">排出ガチャ</th>
                <th v-for="acc in accounts" :key="acc.id                                          " colspan="2">{{ acc.name     }}</th>
              </tr>
              <tr>
                <template v-for="acc in accounts"><th :key="acc.id + '-1'">1</th><th :key="acc.id + '-2'">2</th></template>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!dataLoaded">
                <td :colspan="2 + (showExtraColumns ? 3 : 0) + accounts.length * 2">データを読み込んでいます...</td>
              </tr>
              <tr v-else-if="filteredMasters.length === 0">
                <td :colspan="2 + (showExtraColumns ? 3 : 0) + accounts.length * 2">該当するキャラクターがいません</td>
              </tr>
              <tr v-for="master in filteredMasters" :key="master.id                ">
                <td>{{ master.indexNumber || '—' }}</td>
                <td>{{ master.monsterName || '—' }}</td>
                <td v-show="showExtraColumns" :class="'element-' + (master.element || '').toLowerCase()">{{ master.element || '—' }}</td>
                <td v-show="showExtraColumns">{{ master.type || '—' }}</td>
                <td v-show="showExtraColumns">{{ master.ejectionGacha || '—' }}</td>
                <template v-for="acc in accounts">
                  <td :key="acc.id + '-1'" :class="getOwnedStatusClass(master.id, acc.id, 1)" v-html="getDisplayCellContent(master.id, acc.id, 0)"></td>
                  <td :key="acc.id + '-2'" :class="getOwnedStatusClass(master.id, acc.id, 2)" v-html="getDisplayCellContent(master.id, acc.id, 1)"></td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- INFO: ここで新しいコンポーネントを使用 -->
      <add-owned-character-tab 
        v-if="activeTab === 'add-owned'"
        :character-masters="characterMasters"
        :selected-account-id="selectedAccountId"
        :owned-count-map="ownedCountMap"
        :is-adding="addChar.isAdding"
        @add-character="addOwnedCharacter"
      />

      <div id="tab-manage-items" class="tab-content" v-if="activeTab === 'manage-items'">
        <h2>アイテム管理</h2>
        <div class="form-section">
          <h3>所持キャラクターのアイテムを変更</h3>
          <label>キャラクター検索:</label>
          <input type="text" v-model="itemManage.search  " placeholder="キャラクター名で検索">
          <label for="item-char-selector">キャラクター選択:</label>
          <select id="item-char-selector" v-model="itemManage.selectedOwnedId" size="10" style="width:100%">
            <option v-for="char in itemManageableCharacters" :key="char.id                          " :value="char.id">
              {{ formatOwnedCharDisplayName(char, true) }}
            </option>
          </select>
          <label>アイテム (最大3つまで):</label>
          <div class="item-select-container">
            <select v-model="itemManage.items[0]">
              <option value="">(アイテムなし)</option>
              <option v-for="item in itemMasters" :key="item.id" :value="item.id">[{{ item.id }}] {{ item.name }}</option>
            </select>
            <select v-model="itemManage.items[1]">
              <option value="">(アイテムなし)</option>
              <option v-for="item in itemMasters" :key="item.id" :value="item.id">[{{ item.id }}] {{ item.name }}</option>
            </select>
            <select v-model="itemManage.items[2]">
              <option value="">(アイテムなし)</option>
              <option v-for="item in itemMasters" :key="item.id" :value="item.id">[{{ item.id }}] {{ item.name }}</option>
            </select>
          </div>
          <br>
          <button @click="updateItems" :disabled="!itemManage.selectedOwnedId || itemManage.isUpdating">
            {{ itemManage.isUpdating ? '更新中...' : 'アイテムを更新' }}
          </button>
        </div>
        <div class="form-section">
          <h3>キャラクター間でアイテムを移動</h3>
          <div style="display: flex; gap: 20px;">
            <div style="flex: 1;">
              <label>移動元キャラクター検索:</label>
              <input type="text" v-model="itemMove.from.search  " placeholder="移動元の名前で検索">
              <label>移動元キャラクター選択:</label>
              <select v-model="itemMove.from.selectedId" size="8" style="width:100%;">
                <option v-for="char in itemMoveFromCharacters" :key="char.id" :value="char.id">
                  {{ formatOwnedCharDisplayName(char, true) }}
                </option>
              </select>
            </div>
            <div style="flex: 1;">
              <label>移動するアイテムを選択:</label>
              <div id="items-to-move-container" style="height: 180px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; background-color: #fff; margin-top: 5px;">
                <div v-if="!itemMove.from.selectedId"><small>移動元キャラクターを選択してください。</small></div>
                <div v-else-if="!movableItems.length"><small>移動できるアイテムがありません。</small></div>
                <div v-for="item in movableItems" :key="item.id">
                  <input type="checkbox" :id="'item-move-' + item.id" :value="item.id" v-model="itemMove.selectedItemIds">
                  <label :for="'item-move-' + item.id">{{ item.name }}</label>
                </div>
              </div>
            </div>
            <div style="flex: 1;">
              <label>移動先キャラクター検索:</label>
              <input type="text" v-model="itemMove.to     .search " placeholder="移動先の名前で検索">
              <label>移動先キャラクター選択:</label>
              <select v-model="itemMove.to.selectedId" size="8" style="width:100%;">
                <option v-for="char in itemMoveToCharacters" :key="char.id" :value="char.id">
                  {{ formatOwnedCharDisplayName(char, true) }}
                </option>
              </select>
            </div>
          </div>
          <br>
          <button @click="moveItems" :disabled="!itemMove.from.selectedId || !itemMove.to.selectedId || itemMove.selectedItemIds.length === 0 || itemMove.isMoving">
            {{ itemMove.isMoving ? '移動中...' : '選択したアイテムを移動' }}
          </button>
        </div>
      </div>
      <div id="tab-manage-teams" class="tab-content" v-if="activeTab === 'manage-teams'">
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
              <li v-for="team in filteredTeams" :key="team.id        " @click="selectTeam(team)" :class="{ active: teamForm.id       === team.id }">
                <div class="team-list-item-header">
                  <strong>{{ team.name     }}</strong>
                  <span>({{ team.type }})</span>
                  <button class="delete-btn-small" @click.stop="deleteTeam(team.id)">削除</button>
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
              <input type="text" v-model.trim="teamForm.name  " placeholder="例: 天魔の孤城 第1の間">
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
                  <option v-for="acc in accounts" :key="acc.id" :value="acc.id">{{ acc.name }}</option>
                </select>
                <label>キャラクター:</label>
                <input type="text" v-model="slot.characterSearch" placeholder="キャラ名で検索">
                <select v-model="slot.selectedOwnedId" size="5" style="width: 100%;">
                  <option v-if="!slot.selectedAccountId" value="">先にアカウントを選択</option>
                  <option v-for="char in getCharactersForSlot(slot)" :key="char.id" :value="char.id" :disabled="isCharSelectedInOtherSlot(char.id, index)">
                    {{ formatOwnedCharDisplayName(char, true) }} {{ isCharSelectedInOtherSlot(char.id, index) ? '(選択済)' : '' }}
                  </option>
                </select>
              </div>
            </div>
            <br>
            <button @click="handleSaveTeam" :disabled="!isTeamFormValid || teamForm.isSaving" class="save-button">{{ teamForm.isSaving ? '保存中...' : (teamForm.id ? '編成を更新' : '編成を保存') }}</button>
          </div>
        </div>
      </div>
      <div id="tab-add-master" class="tab-content" v-if="activeTab === 'add-master'">
        <h2>キャラクターマスター新規追加</h2>
        <div class="form-section">
          <label>図鑑番号:</label><input type="number" v-model.number="master.no  " placeholder="例: 1234">
          <label>キャラクター名:</label><input type="text" v-model.trim="master.name    " required>
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
            <label>キャラクター検索:</label><input type="text" v-model="editMaster.search  " placeholder="編集したいキャラクター名で検索">
            <label>編集するキャラクターを選択:</label>
            <select v-model="editMaster.selectedMasterId" size="10" style="width:100%">
              <option v-for="master in editableMasters" :key="master.id" :value="master.id">[{{ master.indexNumber || '?' }}] {{ master.monsterName }}</option>
            </select>
        </div>
        <div class="form-section" v-if="editMaster.selectedMasterId">
          <h3>編集フォーム</h3>
          <label>図鑑番号:</label><input type="number" v-model.number="editMaster.no  " placeholder="例: 1234">
          <label>キャラクター名:</label><input type="text" v-model.trim="editMaster.name  " required>
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
import AddOwnedCharacterTab from './components/AddOwnedCharacterTab.vue'; // NOTE: 新規コンポーネントをインポート
// #endregion

export default {
  // #region COMPONENT_CONFIG
  name: 'App',
  components: {
    AddOwnedCharacterTab, // NOTE: コンポーネントを登録
  },
  // #endregion
  
  // #region STATE_MANAGEMENT
  data() {
    return {
      user: null, isAuthReady: false, dataLoaded: false,
      accounts: [], characterMasters: [], itemMasters: [], gachaMasters: [], teams: [],
      itemMastersMap: new Map(), ownedCountMap: new Map(), ownedCharactersData: new Map(), characterMastersMap: new Map(),
      activeTab: 'view-all', showExtraColumns: false, selectedAccountId: null,
      filters: { charSearch: '', element: '', itemSearch: '', type: '', gachaSearch: '', totalOwnership: '', account: '', ownership: '' },
      
      // NOTE: addCharは非同期処理の状態管理のみに責務を縮小
      addChar: { isAdding: false },

      itemManage: { search: '', selectedOwnedId: null, items: ["", "", ""], isUpdating: false },
      itemMove: { from: { search: '', selectedId: null }, to: { search: '', selectedId: null }, selectedItemIds: [], isMoving: false },
      master: { no: '', name: '', element: '', type: '恒常', gacha: '', isSaving: false },
      editMaster: { search: '', selectedMasterId: null, no: '', name: '', element: '', type: '', gacha: '', isUpdating: false },
      teamTypes: ['禁忌', '天魔', '庭園', '轟絶', '黎絶'], teamFilters: { type: '' },
      teamForm: { id: null, name: '', type: '', isSaving: false, slots: Array(4).fill().map(() => ({ selectedAccountId: '', selectedOwnedId: '', characterSearch: '' })) },
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
    characterTypes() { return Array.from(new Set(this.characterMasters.map  (m => m.type).filter(Boolean))).sort(); },
    filteredMasters() {
      if (!this.dataLoaded) return [];
      const { charSearch, element, itemSearch, type, gachaSearch, totalOwnership, account, ownership } = this.filters;
      const lowerCharSearch = charSearch.toLowerCase();
      const searchItemId = itemSearch ? Number(itemSearch) : null;
      return this.characterMasters.filter(master => {
        if (lowerCharSearch && !master.monsterName.toLowerCase().includes(lowerCharSearch) && !(master.indexNumber+'').includes(lowerCharSearch)) return false;
        if (element && master.element !== element) return false;
        if (type) { if (type === '恒常_or_限定') { if (master.type !== '恒常' && master.type !== '限定') return false; } else { if (master.type !== type) return false; } }
        if (gachaSearch && (master.ejectionGacha || '') !== gachaSearch) return false;
        if (searchItemId) {
          let hasItem = false;
          const targetAccount = account || null;
          if (targetAccount) {
            hasItem = (this.ownedCharactersData.get(targetAccount) || []).some(char => char.characterMasterId === master.id && char.items?.some(itemId => Number(itemId) === searchItemId));
          } else {
            for (const ownedChars of this.ownedCharactersData.values()) {
              if (ownedChars.some(char => char.characterMasterId === master.id && char.items?.some(itemId => Number(itemId) === searchItemId))) { hasItem = true; break; }
            }
          }
          if (!hasItem) return false;
        }
        const totalOwnedCount = this.accounts.reduce((sum, acc) => sum + this.getOwnedCount(master.id, acc.id), 0);
        if (totalOwnership === 'all_unowned' && totalOwnedCount > 0) return false;
        if (totalOwnership === 'four_or_more' && totalOwnedCount < 4) return false;
        if (totalOwnership === 'one_in_each' && !this.accounts.every(acc => this.getOwnedCount(master.id, acc.id) >= 1)) return false;
        if (account && ownership) {
          const countInAccount = this.getOwnedCount(master.id, account);
          if (ownership === 'owned' && countInAccount === 0) return false;
          if (ownership === 'unowned' && countInAccount > 0) return false;
          if (ownership === 'one' && countInAccount !== 1) return false;
          if (ownership === 'two' && countInAccount !== 2) return false;
        }
        return true;
      });
    },
    
    // NOTE: `addableCharacters` は子コンポーネントに移動しました

    currentOwnedCharacters() {
      if (!this.selectedAccountId || !this.dataLoaded) return [];
      const ownedList = this.ownedCharactersData.get(this.selectedAccountId) || [];
      return ownedList.map  (char => {
        const master = this.characterMastersMap.get(char.characterMasterId);
        return { ...char, indexNumber: master?.indexNumber || 999999, monsterName: master?.monsterName || '不明' };
      }).sort((a, b) => a.indexNumber - b.indexNumber);
    },
    itemManageableCharacters() { const lowerSearch = this.itemManage.search .toLowerCase(); return this.currentOwnedCharacters.filter(char => !lowerSearch || char.monsterName.toLowerCase().includes(lowerSearch)); },
    itemMoveFromCharacters() { const lowerSearch = this.itemMove.from.search .toLowerCase(); return this.currentOwnedCharacters.filter(char => (!lowerSearch || char.monsterName.toLowerCase().includes(lowerSearch)) && char.id !== this.itemMove.to  .selectedId); },
    itemMoveToCharacters() { const lowerSearch = this.itemMove.to.search .toLowerCase(); return this.currentOwnedCharacters.filter(char => (!lowerSearch || char.monsterName.toLowerCase().includes(lowerSearch)) && char.id !== this.itemMove.from.selectedId); },
    movableItems() { if (!this.itemMove.from.selectedId) return []; const fromChar = this.currentOwnedCharacters.find(c => c.id === this.itemMove.from.selectedId); if (!fromChar || !fromChar.items) return []; return fromChar.items.map (itemId => ({ id: Number(itemId), name: this.itemMastersMap.get(Number(itemId)) || `不明(ID:${itemId})` })); },
    editableMasters() { if (!this.characterMasters.length) return []; const lowerSearch = this.editMaster.search .toLowerCase(); return this.characterMasters.filter(master => !lowerSearch || master.monsterName.toLowerCase().includes(lowerSearch)); },
    filteredTeams() { return !this.teamFilters.type ? this.teams : this.teams.filter(team => team.type === this.teamFilters.type); },
    isTeamFormValid() { return this.teamForm.name   && this.teamForm.type && this.teamForm.slots.every(slot => slot.selectedAccountId && slot.selectedOwnedId); },
  },
  // #endregion

  // #region WATCHERS
  watch: {
    'itemManage.selectedOwnedId'(newId) {
      if (!newId) { this.itemManage.items = ["", "", ""]; return; }
      const character = this.currentOwnedCharacters.find(c => c.id === newId);
      if (character && character.items) {
        const itemIds = character.items.map (String);
        this.itemManage.items = [ itemIds[0] || "", itemIds[1] || "", itemIds[2] || "" ];
      } else { this.itemManage.items = ["", "", ""]; }
    },
    'itemMove.from.selectedId'() { this.itemMove.selectedItemIds = []; },
    selectedAccountId() {
      // NOTE: 子コンポーネントが自身の状態をリセットするため、App.vue側のリセット処理は不要
      // this.addChar.selectedMasterId = null;
      this.itemManage.selectedOwnedId = null;
      this.itemMove.from.selectedId = null;
      this.itemMove.to.selectedId = null;
    },
    'editMaster.selectedMasterId'(newId) {
      if (!newId) { Object.assign(this.editMaster, { name: '', no: '', element: '', type: '', gacha: '' }); return; }
      const master = this.characterMastersMap.get(newId);
      if (master) { Object.assign(this.editMaster, { name: master.monsterName, no: master.indexNumber, element: master.element, type: master.type, gacha: master.ejectionGacha }); }
    },
  },
  // #endregion
  
  // #region METHODS
  methods: {
    handleLogin() { authService.loginWithGoogle().catch(() => alert("ログインに失敗しました。")); },
    handleLogout() { authService.logout(); },
    resetLoadedData() { Object.assign(this, { dataLoaded: false, accounts: [], characterMasters: [], itemMasters: [], gachaMasters: [], teams: [], itemMastersMap: new Map(), ownedCountMap: new Map(), ownedCharactersData: new Map(), characterMastersMap: new Map(), selectedAccountId: null }); },
    async loadInitialData() {
      if (this.dataLoaded) return;
      if (!this.user) return;
      console.log("初期データの読み込みを開始...");
      try {
        const [accountsSnap, mastersSnap, itemsSnap, ownedCharsSnap, gachaMastersSnap, teamsSnap] = await databaseService.loadInitialDataRaw(this.user.uid);
        this.accounts = accountsSnap.docs.map (doc => { const data = doc.data       (); return { id: doc.id    , name: data.Name  || `アカウント${data.id  }`, numericId: data.id, indexNumber: data.indexNumber }; }).sort((a, b) => (a.numericId || 999) - (b.numericId || 999));
        this.characterMasters = mastersSnap.docs.map (doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => (a.indexNumber || 999999) - (b.indexNumber || 999999));
        this.characterMastersMap = new Map(this.characterMasters.map(m => [m.id, m]));
        this.itemMasters = itemsSnap.docs.map (doc => ({...doc.data(), id: Number(doc.data().id) })).sort((a, b) => a.id - b.id  );
        this.itemMastersMap = new Map(this.itemMasters.map (item => [item.id, item.name]));
        this.gachaMasters = gachaMastersSnap.docs.map (doc => doc.data()).sort((a,b) => a.id - b.id);
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
        this.teams = teamsSnap.docs.map (doc => ({ ...doc.data(), id: doc.id }));
        if (this.accounts.length > 0) this.selectedAccountId = this.accounts[0].id;
        this.dataLoaded = true;
        console.log("初期データの読み込み完了");
      } catch (e) { console.error("データ読み込みエラー:", e); alert(`データ読み込みエラー: ${e.message}`); }
    },
    getOwnedCount(masterId, accountId) { return this.ownedCountMap.get(`${masterId}-${accountId}`) || 0; },
    getDisplayCellContent(masterId, accountId, index) {
      const ownedList = (this.ownedCharactersData.get(accountId) || []).filter(c => c.characterMasterId === masterId);
      if (!ownedList || ownedList.length <= index) return '—';
      const itemNames = (ownedList[index].items || []).map(id => this.itemMastersMap.get(Number(id))).filter(Boolean);
      return itemNames.length > 0 ? '✔️<br>' + itemNames.join('<br>') : '✔️';
    },
    getOwnedStatusClass(masterId, accountId, requiredCount) { return this.getOwnedCount(masterId, accountId) >= requiredCount ? 'status-owned' : 'status-unowned'; },
    resetFilters() { this.filters = { charSearch: '', element: '', itemSearch: '', type: '', gachaSearch: '', totalOwnership: '', account: '', ownership: '' }; },
    formatOwnedCharDisplayName(char, includeItems = false) {
      const master = this.characterMastersMap.get(char.characterMasterId);
      const charName = master ? master.monsterName : '不明';
      let targetAccountId = char.accountId || this.selectedAccountId;
      if (!targetAccountId) return `${charName} (アカウント不明)`;
      const sameMasterChars = (this.ownedCharactersData.get(targetAccountId) || []).filter(c => c.characterMasterId === char.characterMasterId);
      const charIndex = sameMasterChars.findIndex(c => c.id === char.id);
      let text = `${charName} (${charIndex >= 0 ? charIndex + 1 : '？'}体目)`;
      if (includeItems) { text += ` [${(char.items || []).map(id => this.itemMastersMap.get(Number(id))).filter(Boolean).join(', ') || 'アイテムなし'}]`; }
      return text;
    },
    
    /**
     * [概要] 所持キャラクターを追加する。
     * @param {string} masterId - 追加するキャラクターのマスターID。子コンポーネントから受け取る。
     * @note データベースへの書き込みとローカル状態の更新を行う。
     */
    async addOwnedCharacter(masterId) {
      if (!masterId || !this.selectedAccountId) return alert('追加するキャラとアカウントを選択してください。');
      if (this.getOwnedCount(masterId, this.selectedAccountId) >= 2) return alert('このキャラは既に2体所持しています。');
      this.addChar.isAdding = true;
      try {
        const master = this.characterMastersMap.get(masterId);
        if (!master) throw new Error('キャラのマスター情報が見つかりません。');
        
        // HACK: firebase.firestore.FieldValue.serverTimestamp()はローカルでの即時反映が難しいため、
        //       クライアント側では new Date() で代用し、UIに素早く反映させる。
        const newOwnedCharData = { characterMasterId: masterId, monsterName: master.monsterName, items: [], createdAt: firebase.firestore.FieldValue.serverTimestamp() };
        const docRef = await databaseService.addOwnedCharacter(this.selectedAccountId, newOwnedCharData);
        
        // INFO: ローカルの状態を即時更新してUIに反映
        const newLocalChar = { ...newOwnedCharData, id: docRef.id , createdAt: { toDate: () => new Date() }};
        if (!this.ownedCharactersData.has(this.selectedAccountId)) {
          this.$set(this.ownedCharactersData, this.selectedAccountId, []);
        }
        this.ownedCharactersData.get(this.selectedAccountId).push(newLocalChar);
        
        const countKey = `${masterId}-${this.selectedAccountId}`;
        this.$set(this.ownedCountMap, countKey, (this.ownedCountMap.get(countKey) || 0) + 1);

        alert(`「${master.monsterName}」を所持リストに追加しました。`);
        
        // INFO: 子コンポーネントの選択をリセットするため、ここでは何もしない（子は自身のwatchでリセットされる）
      } catch (error) { 
        console.error('キャラ追加失敗:', error); 
        alert('エラー: ' + error.message); 
      } finally { 
        this.addChar.isAdding = false; 
      }
    },
    async updateItems() {
      if (!this.itemManage.selectedOwnedId) return;
      this.itemManage.isUpdating = true;
      try {
        const newItems = this.itemManage.items.filter(Boolean).map(Number);
        await databaseService.updateCharacterItems(this.selectedAccountId, this.itemManage.selectedOwnedId, newItems);
        const charToUpdate = this.currentOwnedCharacters.find(c => c.id === this.itemManage.selectedOwnedId);
        if (charToUpdate) charToUpdate.items = newItems;
        alert('アイテムを更新しました。');
      } catch(e) { alert('エラー: ' + e.message); } 
      finally { this.itemManage.isUpdating = false; }
    },
    async moveItems() {
      this.itemMove.isMoving = true;
      const { from, to, selectedItemIds } = this.itemMove;
      try {
        if (from.selectedId === to.selectedId || !from.selectedId || !to.selectedId) throw new Error('有効な移動元と移動先を選択してください。');
        if (selectedItemIds.length === 0) throw new Error('移動するアイテムを選択してください。');
        const fromChar = this.currentOwnedCharacters.find(c => c.id === from.selectedId);
        const toChar = this.currentOwnedCharacters.find(c => c.id === to.selectedId);
        const numericIds = selectedItemIds.map (Number);
        if ((toChar.items?.length || 0) + numericIds.length > 3) throw new Error(`移動先のアイテム所持数が上限を超えます。`);
        const newFromItems = (fromChar.items || []).map(Number).filter(id => !numericIds.includes(id));
        const newToItems = [...(toChar.items || []).map(Number), ...numericIds];
        await databaseService.moveCharacterItems(this.selectedAccountId, { id: from.selectedId, items: newFromItems }, { id: to.selectedId, items: newToItems });
        fromChar.items = newFromItems;
        toChar.items = newToItems;
        this.itemMove.selectedItemIds = [];
        alert('アイテムを移動しました。');
      } catch (e) { alert(`エラー: ${e.message}`); } 
      finally { this.itemMove.isMoving = false; }
    },
    async saveMaster() {
      if (!this.master.name  ) return alert('キャラクター名は必須です。');
      this.master.isSaving = true;
      try {
        const newData = { indexNumber: this.master.no   ? Number(this.master.no) : 0, monsterName: this.master.name, element: this.master.element || '', type: this.master.type || '恒常', ejectionGacha: this.master.gacha || '' };
        await databaseService.addCharacterMaster(newData);
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
        alert('マスター情報を更新しました。ページをリロードしてください。');
        location.reload();
      } catch (e) { alert('更新に失敗: ' + e.message); } 
      finally { this.editMaster.isUpdating = false; }
    },
    getCharactersForSlot(slot) {
      if (!slot.selectedAccountId) return [];
      const ownedList = this.ownedCharactersData.get(slot.selectedAccountId) || [];
      const charList = ownedList.map(char => {
        const master = this.characterMastersMap.get(char.characterMasterId);
        return { ...char, accountId: slot.selectedAccountId, indexNumber: master?.indexNumber || 999999, monsterName: master?.monsterName || '不明'};
      }).sort((a,b) => a.indexNumber - b.indexNumber);
      const lowerSearch = slot.characterSearch.toLowerCase();
      return !lowerSearch ? charList : charList.filter(char => char.monsterName.toLowerCase().includes(lowerSearch));
    },
    isCharSelectedInOtherSlot(ownedId, currentIndex) { return !ownedId ? false : this.teamForm.slots.some((slot, index) => index !== currentIndex && slot.selectedOwnedId === ownedId); },
    getTeamSlotDetails(team, slotIndex) {
      const emptySlot = { characterName: '—', accountName: '—', items: [] };
      if (!team.characters || !this.dataLoaded || slotIndex >= team.characters.length) return emptySlot;
      const charSlot = team.characters[slotIndex];
      const account = this.accounts.find(acc => acc.id === charSlot.accountId);
      const ownedChar = (this.ownedCharactersData.get(charSlot.accountId) || []).find(c => c.id === charSlot.ownedCharacterId);
      if (!ownedChar) return { characterName: 'キャラ不明', accountName: account?.name || '不明', items: [] };
      const master = this.characterMastersMap.get(ownedChar.characterMasterId);
      return { characterName: master?.monsterName || '不明', accountName: account?.name || '不明', items: (ownedChar.items || []).map(id => this.itemMastersMap.get(Number(id)) || `不明ID:${id}`).filter(Boolean) };
    },
    selectTeam(team) { this.teamForm = { ...this.teamForm, id: team.id, name: team.name, type: team.type, slots: team.characters.map (char => ({ selectedAccountId: char.accountId, selectedOwnedId: char.ownedCharacterId, characterSearch: '' })) }; },
    resetTeamForm() { this.teamForm = { id: null, name: '', type: '', isSaving: false, slots: Array(4).fill().map(() => ({ selectedAccountId: '', selectedOwnedId: '', characterSearch: '' })) }; },
    async handleSaveTeam() {
      if (!this.isTeamFormValid) return alert('編成名、タイプ、4体のキャラを全て選択してください。');
      this.teamForm.isSaving = true;
      const teamData = { userId: this.user.uid, name: this.teamForm.name, type: this.teamForm.type, characters: this.teamForm.slots.map (s => ({ accountId: s.selectedAccountId, ownedCharacterId: s.selectedOwnedId })) };
      try {
        const id = this.teamForm.id  ;
        Object.assign(teamData, id ? { updatedAt: firebase.firestore.FieldValue.serverTimestamp() } : { createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        const result = await databaseService.saveTeam(id, teamData);
        if (id) {
          const index = this.teams.findIndex(t => t.id === id);
          if (index > -1) this.$set(this.teams, index, { ...this.teams[index], ...teamData });
          alert('編成を更新しました。');
        } else {
          const newTeam = { ...teamData, id: result.id , createdAt: { toDate: () => new Date() } };
          this.teams.unshift(newTeam);
          this.selectTeam(newTeam);
          alert('編成を保存しました。');
        }
      } catch (error) { console.error('編成保存失敗:', error); alert('エラー: ' + error.message); } 
      finally { this.teamForm.isSaving = false; }
    },
    async deleteTeam(teamId) {
      if (!confirm('この編成を本当に削除しますか？')) return;
      try {
        await databaseService.deleteTeam(teamId);
        this.teams = this.teams.filter(t => t.id !== teamId);
        if (this.teamForm.id === teamId) this.resetTeamForm();
        alert('編成を削除しました。');
      } catch (error) { console.error('編成削除失敗:', error); alert('エラー: ' + error.message); }
    },
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
.team-list-panel { flex: 1; }
.team-form-panel { flex: 1; }
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