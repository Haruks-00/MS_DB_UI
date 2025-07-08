const appTemplate = `
<div id="app" class="container" v-cloak>
  <!-- 変更点1: 認証エリアをVueで管理 -->
  <div class="main-header">
    <h1>キャラクター管理</h1>
    <!-- 認証エリアをヘッダー内に移動 -->
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

  <!-- 変更点2: メインコンテンツ全体を v-if="user" で囲む -->
  <div v-if="user">
    <div class="tab-nav">
      <button class="tab-btn" :class="{ active: activeTab === 'view-all' }" @click="activeTab = 'view-all'">所持状況一覧</button>
      <button class="tab-btn" :class="{ active: activeTab === 'add-owned' }" @click="activeTab = 'add-owned'">所持キャラ追加</button>
      <button class="tab-btn" :class="{ active: activeTab === 'manage-items' }" @click="activeTab = 'manage-items'">アイテム管理</button>
      <button class="tab-btn" :class="{ active: activeTab === 'add-master' }" @click="activeTab = 'add-master'">マスター追加</button>
      <button class="tab-btn" :class="{ active: activeTab === 'edit-master' }" @click="activeTab = 'edit-master'">マスター編集</button>
    </div>

    <!-- アカウントコントロールをタブナビの下に移動 -->
    <div id="account-controls" v-show="isAccountControlVisible">
      <label for="account-selector">管理対象アカウント:</label>
      <select id="account-selector" v-model="selectedAccountId">
        <option v-for="account in accounts" :key="account.id" :value="account.id">{{ account.name }}</option>
      </select>
    </div>

    <!-- ここから下のタブコンテンツは変更なし -->
    <!-- タブ1: 所持状況一覧 -->
    <div id="tab-view-all" class="tab-content" v-if="activeTab === 'view-all'">
      <!-- 中身は変更なし -->
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
            <option v-for="item in itemMasters" :key="item.id" :value="item.id">{{ item.name }}</option>
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
            <option v-for="gacha in gachaMasters" :key="gacha.id" :value="gacha.name">{{ gacha.name }}</option>
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
              <th v-for="acc in accounts" :key="acc.id" colspan="2">{{ acc.name }}</th>
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
            <tr v-for="master in filteredMasters" :key="master.id">
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
    
    <!-- タブ2: 所持キャラ追加 -->
    <div id="tab-add-owned" class="tab-content" v-if="activeTab === 'add-owned'">
      <!-- 中身は変更なし -->
      <h2>所持キャラ追加</h2>
      <div class="form-section">
        <label>キャラクター検索:</label>
        <input type="text" v-model="addChar.search" placeholder="キャラクター名で検索">
        <label for="addable-char-selector">追加可能なキャラクター:</label>
        <select id="addable-char-selector" v-model="addChar.selectedMasterId" size="15" style="width:100%">
          <option v-for="master in addableCharacters" :key="master.id" :value="master.id">
            [{{ master.indexNumber || '?' }}] {{ master.monsterName }} ({{ getOwnedCount(master.id, selectedAccountId) }}/2 所持)
          </option>
        </select>
        <br><br>
        <button @click="addOwnedCharacter" :disabled="!addChar.selectedMasterId || addChar.isAdding">
          {{ addChar.isAdding ? '追加中...' : 'このキャラクターを所持リストに追加' }}
        </button>
      </div>
    </div>
    
    <!-- タブ3: アイテム管理 -->
    <div id="tab-manage-items" class="tab-content" v-if="activeTab === 'manage-items'">
      <!-- 中身は変更なし -->
      <h2>アイテム管理</h2>
      <div class="form-section">
        <h3>所持キャラクターのアイテムを変更</h3>
        <label>キャラクター検索:</label>
        <input type="text" v-model="itemManage.search" placeholder="キャラクター名で検索">
        <label for="item-char-selector">キャラクター選択:</label>
        <select id="item-char-selector" v-model="itemManage.selectedOwnedId" size="10" style="width:100%">
          <option v-for="char in itemManageableCharacters" :key="char.id" :value="char.id">
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
            <input type="text" v-model="itemMove.from.search" placeholder="移動元の名前で検索">
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
            <input type="text" v-model="itemMove.to.search" placeholder="移動先の名前で検索">
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

    <!-- タブ4: マスター追加 -->
    <div id="tab-add-master" class="tab-content" v-if="activeTab === 'add-master'">
      <!-- 中身は変更なし -->
      <h2>キャラクターマスター新規追加</h2>
      <div class="form-section">
        <label>図鑑番号:</label>
        <input type="number" v-model.number="master.no" placeholder="例: 1234">
        <label>キャラクター名:</label>
        <input type="text" v-model.trim="master.name" required>
        <label>属性:</label>
        <input type="text" v-model.trim="master.element">
        <label>分類:</label>
        <input type="text" v-model.trim="master.type">
        <label>排出ガチャ (限定の場合):</label>
        <select v-model="master.gacha">
          <option value="">(限定ではない/その他)</option>
          <option v-for="gacha in gachaMasters" :key="gacha.id" :value="gacha.name">{{ gacha.name }}</option>
        </select>
        <br><br>
        <button @click="saveMaster" :disabled="!master.name || master.isSaving">
          {{ master.isSaving ? '追加中...' : 'マスターリストに新規追加' }}
        </button>
      </div>
    </div>
    
    <!-- タブ5: マスター編集 -->
    <div id="tab-edit-master" class="tab-content" v-if="activeTab === 'edit-master'">
      <!-- 中身は変更なし -->
      <h2>キャラクターマスター編集</h2>
      <div class="form-section">
          <label>キャラクター検索:</label>
          <input type="text" v-model="editMaster.search" placeholder="編集したいキャラクター名で検索">
          <label>編集するキャラクターを選択:</label>
          <select v-model="editMaster.selectedMasterId" size="10" style="width:100%">
            <option v-for="master in editableMasters" :key="master.id" :value="master.id">
              [{{ master.indexNumber || '?' }}] {{ master.monsterName }}
            </option>
          </select>
      </div>
      <div class="form-section" v-if="editMaster.selectedMasterId">
        <h3>編集フォーム</h3>
        <label>図鑑番号:</label>
        <input type="number" v-model.number="editMaster.no" placeholder="例: 1234">
        <label>キャラクター名:</label>
        <input type="text" v-model.trim="editMaster.name" required>
        <label>属性:</label>
        <input type="text" v-model.trim="editMaster.element">
        <label>分類:</label>
        <input type="text" v-model.trim="editMaster.type">
        <label>排出ガチャ (限定の場合):</label>
        <select v-model="editMaster.gacha">
          <option value="">(限定ではない/その他)</option>
          <option v-for="gacha in gachaMasters" :key="gacha.id" :value="gacha.name">{{ gacha.name }}</option>
        </select>
        <br><br>
        <button @click="updateMaster" :disabled="!editMaster.selectedMasterId || editMaster.isUpdating">
          {{ editMaster.isUpdating ? '更新中...' : 'マスター情報を更新' }}
        </button>
      </div>
    </div>

  </div> <!-- v-if="user" の閉じタグ -->
</div>
`;

new Vue({
    el: '#app',
    template: appTemplate,
    data: {
      // --- 変更点4: 認証情報をVueのdataに追加 ---
      user: null, // ログインユーザー情報を保持
      isAuthReady: false, // Firebase Authの準備完了フラグ

      // --- Global State & Data (変更なし) ---
      dataLoaded: false,
      accounts: [],
      characterMasters: [],
      itemMasters: [],
      gachaMasters: [],
      itemMastersMap: new Map(),
      ownedCountMap: new Map(),
      ownedCharactersData: new Map(),
      
      // --- UI State (変更なし) ---
      activeTab: 'view-all',
      showExtraColumns: false,
      selectedAccountId: null,

      // --- Filters for Tab 1 (変更なし) ---
      filters: {
        charSearch: '', element: '', itemSearch: '', type: '', gachaSearch: '', 
        totalOwnership: '', account: '', ownership: '',
      },

      // --- State for Tab 2 (変更なし) ---
      addChar: { search: '', selectedMasterId: null, isAdding: false },

      // --- State for Tab 3 (変更なし) ---
      itemManage: { search: '', selectedOwnedId: null, items: ["", "", ""], isUpdating: false },
      itemMove: { from: { search: '', selectedId: null }, to: { search: '', selectedId: null }, selectedItemIds: [], isMoving: false },

      // --- State for Tab 4 (変更なし) ---
      master: { no: '', name: '', element: '', type: '恒常', gacha: '', isSaving: false },
      
      // --- State for New Tab 5 (変更なし) ---
      editMaster: { search: '', selectedMasterId: null, no: '', name: '', element: '', type: '', gacha: '', isUpdating: false },
    },
    // 変更点5: createdフックで認証状態を監視
    created() {
      auth.onAuthStateChanged(user => {
        this.user = user; // ユーザー情報をVueのdataにセット
        this.isAuthReady = true; // 認証準備完了

        if (user) {
          // ログイン済みなら、初期データを読み込む
          this.loadInitialData();
        } else {
          // ログアウトしたら、ロード済みデータをリセット
          this.resetLoadedData();
        }
      });
    },
    computed: {
      // computedプロパティは変更なし
      isAccountControlVisible() { return this.activeTab === 'add-owned' || this.activeTab === 'manage-items'; },
      characterTypes() { const types = new Set(this.characterMasters.map(m => m.type).filter(Boolean)); return Array.from(types).sort(); },
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
            
            if (account) {
              const ownedCharsInAccount = this.ownedCharactersData.get(account) || [];
              // ▼▼▼ 修正 ▼▼▼
              // includes() から some() と緩やかな比較(==)に変更
              hasItem = ownedCharsInAccount.some(char => 
                char.characterMasterId === master.id && char.items?.some(itemId => itemId == searchItemId)
              );
              // ▲▲▲ 修正 ▲▲▲
            } 
            else {
              for (const ownedChars of this.ownedCharactersData.values()) {
                // ▼▼▼ 修正 ▼▼▼
                // includes() から some() と緩やかな比較(==)に変更
                if (ownedChars.some(char => char.characterMasterId === master.id && char.items?.some(itemId => itemId == searchItemId))) {
                  hasItem = true;
                  break; 
                }
                // ▲▲▲ 修正 ▲▲▲
              }
            }

            if (!hasItem) {
              return false;
            }
          }

          const totalOwnedCount = this.accounts.reduce((sum, acc) => sum + (this.getOwnedCount(master.id, acc.id) || 0), 0);
          if (totalOwnership === 'all_unowned' && totalOwnedCount > 0) return false;
          if (totalOwnership === 'four_or_more' && totalOwnedCount < 4) return false;
          if (totalOwnership === 'one_in_each' && !this.accounts.every(acc => (this.getOwnedCount(master.id, acc.id) || 0) >= 1)) return false;
          
          if (account && ownership) {
            const countInAccount = this.getOwnedCount(master.id, account) || 0;
            if (ownership === 'owned' && countInAccount === 0) return false;
            if (ownership === 'unowned' && countInAccount > 0) return false;
            if (ownership === 'one' && countInAccount !== 1) return false;
            if (ownership === 'two' && countInAccount !== 2) return false;
          }
          
          return true;
        });
      },
      addableCharacters() { if (!this.selectedAccountId) return []; const lowerSearch = this.addChar.search.toLowerCase(); return this.characterMasters.filter(master => { const count = this.getOwnedCount(master.id, this.selectedAccountId); return count < 2 && (!lowerSearch || master.monsterName.toLowerCase().includes(lowerSearch)); }); },
      currentOwnedCharacters() { if (!this.selectedAccountId) return []; return (this.ownedCharactersData.get(this.selectedAccountId) || []).map(char => { const master = this.characterMasters.find(m => m.id === char.characterMasterId); return { ...char, indexNumber: master?.indexNumber || 999999, monsterName: master?.monsterName || char.monsterName }; }).sort((a, b) => a.indexNumber - b.indexNumber); },
      itemManageableCharacters() { const lowerSearch = this.itemManage.search.toLowerCase(); return this.currentOwnedCharacters.filter(char => !lowerSearch || (char.monsterName && char.monsterName.toLowerCase().includes(lowerSearch)) ); },
      itemMoveFromCharacters() { const lowerSearch = this.itemMove.from.search.toLowerCase(); return this.currentOwnedCharacters.filter(char => (!lowerSearch || (char.monsterName && char.monsterName.toLowerCase().includes(lowerSearch))) && char.id !== this.itemMove.to.selectedId ); },
      itemMoveToCharacters() { const lowerSearch = this.itemMove.to.search.toLowerCase(); return this.currentOwnedCharacters.filter(char => (!lowerSearch || (char.monsterName && char.monsterName.toLowerCase().includes(lowerSearch))) && char.id !== this.itemMove.from.selectedId ); },
      movableItems() { if (!this.itemMove.from.selectedId) return []; const fromChar = this.currentOwnedCharacters.find(c => c.id === this.itemMove.from.selectedId); if (!fromChar || !fromChar.items || fromChar.items.length === 0) return []; return fromChar.items.map(itemId => { return { id: Number(itemId), name: this.itemMastersMap.get(Number(itemId)) || `不明なアイテム(ID:${itemId})` }; }); },
      editableMasters() { if (!this.characterMasters.length) return []; const lowerSearch = this.editMaster.search.toLowerCase(); return this.characterMasters.filter(master => { return !lowerSearch || master.monsterName.toLowerCase().includes(lowerSearch); }); }
    },
    watch: {
      // watchプロパティは変更なし
      'itemManage.selectedOwnedId'(newId) { if (!newId) { this.itemManage.items = ["", "", ""]; return; } const character = this.itemManageableCharacters.find(c => c.id === newId); if (character && character.items) { this.itemManage.items = [ character.items[0] || "", character.items[1] || "", character.items[2] || "" ]; } else { this.itemManage.items = ["", "", ""]; } },
      'itemMove.from.selectedId'() { this.itemMove.selectedItemIds = []; },
      selectedAccountId() { this.addChar.selectedMasterId = null; this.itemManage.selectedOwnedId = null; this.itemMove.from.selectedId = null; this.itemMove.to.selectedId = null; },
      'editMaster.selectedMasterId'(newId) { if (!newId) { this.editMaster.name = ''; this.editMaster.no = ''; this.editMaster.element = ''; this.editMaster.type = ''; this.editMaster.gacha = ''; return; } const master = this.characterMasters.find(m => m.id === newId); if (master) { this.editMaster.name = master.monsterName; this.editMaster.no = master.indexNumber; this.editMaster.element = master.element; this.editMaster.type = master.type; this.editMaster.gacha = master.ejectionGacha; } },
    },
    methods: {
      // 変更点6: ログイン・ログアウトメソッドを追加
      handleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch(error => {
          console.error("ログインエラーの詳細:", error); 
          console.error("エラーコード:", error.code); 
          console.error("エラーメッセージ:", error.message); 
          alert("ログインに失敗しました。");
        });
      },
      handleLogout() {
        auth.signOut();
      },
      // 変更点7: データをリセットするメソッドを追加
      resetLoadedData() {
        this.dataLoaded = false;
        this.accounts = [];
        this.characterMasters = [];
        this.itemMasters = [];
        this.gachaMasters = [];
        this.itemMastersMap = new Map();
        this.ownedCountMap = new Map();
        this.ownedCharactersData = new Map();
        this.selectedAccountId = null;
      },

      // 以下、既存のメソッド群 (変更なし)
      async loadInitialData() {
        // すでにデータが読み込まれている場合は何もしない
        if (this.dataLoaded) return;
        
        console.log("初期データの読み込みを開始します...");
        try {
          const [accountsSnap, mastersSnap, itemsSnap, ownedCharsSnap, gachaMastersSnap] = await Promise.all([
            db.collection('accounts').get(),
            db.collection('character_masters').get(),
            db.collection('itemMasters').get(),
            db.collectionGroup('owned_characters').get(),
            db.collection('gachaMasters').get()
          ]);
          
          this.accounts = accountsSnap.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.Name || `アカウント${data.id}`,
              numericId: data.id,
              indexNumber: data.indexNumber
            };
          }).sort((a, b) => (a.numericId || 999) - (b.numericId || 999));
          this.characterMasters = mastersSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => (a.indexNumber || 999999) - (b.indexNumber || 999999));
          this.itemMasters = itemsSnap.docs.map(doc => ({...doc.data(), id: Number(doc.data().id) })).sort((a, b) => a.id - b.id);
          this.gachaMasters = gachaMastersSnap.docs.map(doc => doc.data()).sort((a,b) => a.id - b.id);
          this.itemMastersMap = new Map(this.itemMasters.map(item => [item.id, item.name]));
          
          ownedCharsSnap.forEach(doc => {
            const data = doc.data();
            const accountId = doc.ref.parent.parent.id;
            const masterId = data.characterMasterId;
            const countKey = `${masterId}-${accountId}`;
            this.ownedCountMap.set(countKey, (this.ownedCountMap.get(countKey) || 0) + 1);
            if (!this.ownedCharactersData.has(accountId)) this.ownedCharactersData.set(accountId, []);
            this.ownedCharactersData.get(accountId).push({ ...data, id: doc.id });
          });
          
          if(this.accounts.length > 0) {
            this.selectedAccountId = this.accounts[0].id;
          }
          this.dataLoaded = true;
          console.log("初期データの読み込み完了");
        } catch (e) {
          console.error("データ読み込みエラー:", e);
          alert("データの読み込みに失敗しました。");
        }
      },
      getOwnedCount(masterId, accountId) { return this.ownedCountMap.get(`${masterId}-${accountId}`) || 0; },
      getDisplayCellContent(masterId, accountId, index) { // index: 0=1体目, 1=2体目
        const ownedList = this.ownedCharactersData.get(accountId)?.filter(c => c.characterMasterId === masterId);
        
        if (!ownedList || ownedList.length <= index) {
          return '—';
        }
        
        const char = ownedList[index];
        const itemNames = (char.items || [])
          .map(id => this.itemMastersMap.get(Number(id)))
          .filter(Boolean); // nullやundefinedを除外
        
        if (itemNames.length > 0) {
          // アイテム名を<br>で連結し、先頭にチェックマークと改行を追加
          return '✔️<br>' + itemNames.join('<br>');
        } else {
          return '✔️';
        }
      },
      getOwnedStatusClass(masterId, accountId, requiredCount) { return this.getOwnedCount(masterId, accountId) >= requiredCount ? 'status-owned' : 'status-unowned'; },
      resetFilters() { this.filters = { charSearch: '', element: '', itemSearch: '', type: '', gachaSearch: '', totalOwnership: '', account: '', ownership: '' }; },
      formatOwnedCharDisplayName(char, includeItems = false) { const ownedList = this.currentOwnedCharacters.filter(c => c.characterMasterId === char.characterMasterId); const charIndex = ownedList.findIndex(c => c.id === char.id); let text = `${char.monsterName} (${charIndex + 1}体目)`; if (includeItems) { const itemNames = (char.items || []).map(id => this.itemMastersMap.get(Number(id))).filter(Boolean).join(', '); text += ` [${itemNames || 'アイテムなし'}]`; } return text; },
      async addOwnedCharacter() { if (!this.addChar.selectedMasterId || !this.selectedAccountId) return; this.addChar.isAdding = true; try { const masterData = this.characterMasters.find(m => m.id === this.addChar.selectedMasterId); const newOwnedCharacter = { characterMasterId: masterData.id, monsterName: masterData.monsterName, element: masterData.element || '', type: masterData.type || '', items: [], ejectionGacha: masterData.ejectionGacha || '', createdAt: firebase.firestore.FieldValue.serverTimestamp() }; const docRef = await db.collection('accounts').doc(this.selectedAccountId).collection('owned_characters').add(newOwnedCharacter); const countKey = `${masterData.id}-${this.selectedAccountId}`; this.ownedCountMap.set(countKey, (this.ownedCountMap.get(countKey) || 0) + 1); if (!this.ownedCharactersData.has(this.selectedAccountId)) { this.ownedCharactersData.set(this.selectedAccountId, []); } this.ownedCharactersData.get(this.selectedAccountId).push({ ...newOwnedCharacter, id: docRef.id }); this.$forceUpdate(); this.addChar.selectedMasterId = null; alert(`${masterData.monsterName} を所持リストに追加しました。`); } catch (e) { alert('エラーが発生しました: ' + e.message); } finally { this.addChar.isAdding = false; } },
      async updateItems() { if (!this.itemManage.selectedOwnedId) return; this.itemManage.isUpdating = true; try { const newItems = this.itemManage.items.filter(Boolean).map(Number); await db.collection('accounts').doc(this.selectedAccountId).collection('owned_characters').doc(this.itemManage.selectedOwnedId).update({ items: newItems }); const ownedList = this.ownedCharactersData.get(this.selectedAccountId); const charToUpdate = ownedList.find(c => c.id === this.itemManage.selectedOwnedId); if (charToUpdate) charToUpdate.items = newItems; this.$forceUpdate(); alert('アイテムを更新しました。'); } catch(e) { alert('エラーが発生しました: ' + e.message); } finally { this.itemManage.isUpdating = false; } },
      async moveItems() {
        this.itemMove.isMoving = true;
        const { from, to, selectedItemIds } = this.itemMove;
        try {
          if (from.selectedId === to.selectedId) throw new Error('移動元と移動先は異なるキャラクターを選択してください。');
          if (selectedItemIds.length === 0) throw new Error('移動するアイテムを1つ以上選択してください。');

          const ownedList = this.ownedCharactersData.get(this.selectedAccountId);
          const fromChar = ownedList.find(c => c.id === from.selectedId);
          const toChar = ownedList.find(c => c.id === to.selectedId);
          
          // ▼▼▼ 修正: 必ず数値に変換してから比較・結合する ▼▼▼
          // 移動するアイテムIDの配列（数値）
          const numericSelectedItemIds = selectedItemIds.map(Number);

          if ((toChar.items?.length || 0) + numericSelectedItemIds.length > 3) {
            throw new Error(`移動先のアイテム所持数が上限（3つ）を超えてしまいます。`);
          }

          // 移動元のアイテムリストから、移動対象を確実に除外する
          const newFromItems = (fromChar.items || [])
            .map(Number) // 文字列も数値に変換
            .filter(id => !numericSelectedItemIds.includes(id));

          // 移動先のアイテムリストと、移動するアイテムを結合する
          const newToItems = [
            ...((toChar.items || []).map(Number)), // 既存アイテムも念のため数値に
            ...numericSelectedItemIds
          ];
          // ▲▲▲ 修正ここまで ▲▲▲

          const batch = db.batch();
          const fromRef = db.collection('accounts').doc(this.selectedAccountId).collection('owned_characters').doc(from.selectedId);
          const toRef = db.collection('accounts').doc(this.selectedAccountId).collection('owned_characters').doc(to.selectedId);
          
          batch.update(fromRef, { items: newFromItems });
          batch.update(toRef, { items: newToItems });
          
          await batch.commit();
          
          // Vueインスタンスのデータも更新
          fromChar.items = newFromItems;
          toChar.items = newToItems;
          this.$forceUpdate();
          this.itemMove.selectedItemIds = [];
          alert(`${numericSelectedItemIds.length}個のアイテムを移動しました。`);
        } catch (e) {
          alert(`エラー: ${e.message}`);
        } finally {
          this.itemMove.isMoving = false;
        }
      },
      async saveMaster() { if (!this.master.name) return alert('キャラクター名は必須です。'); this.master.isSaving = true; try { const newData = { indexNumber: this.master.no ? Number(this.master.no) : 0, monsterName: this.master.name, element: this.master.element || '', type: this.master.type || '恒常', ejectionGacha: this.master.gacha || '' }; await db.collection('character_masters').add(newData); alert('マスターを追加しました。ページをリロードして反映してください。'); location.reload(); } catch(e) { alert('エラー: ' + e.message); } finally { this.master.isSaving = false; } },
      async updateMaster() { if (!this.editMaster.selectedMasterId || !this.editMaster.name) { alert('キャラクターを選択し、名前を入力してください。'); return; } this.editMaster.isUpdating = true; try { const masterId = this.editMaster.selectedMasterId; const updatedData = { monsterName: this.editMaster.name, indexNumber: this.editMaster.no ? Number(this.editMaster.no) : 0, element: this.editMaster.element, type: this.editMaster.type, ejectionGacha: this.editMaster.gacha, }; await db.collection('character_masters').doc(masterId).update(updatedData); const masterIndex = this.characterMasters.findIndex(m => m.id === masterId); if (masterIndex > -1) { this.$set(this.characterMasters, masterIndex, { ...this.characterMasters[masterIndex], ...updatedData }); } this.ownedCharactersData.forEach(ownedList => { ownedList.forEach(ownedChar => { if (ownedChar.characterMasterId === masterId) { ownedChar.monsterName = updatedData.monsterName; } }); }); this.$forceUpdate(); alert(`${updatedData.monsterName} の情報を更新しました。`); } catch (e) { alert('マスター情報の更新に失敗しました: ' + e.message); console.error(e); } finally { this.editMaster.isUpdating = false; } }
    }
  });

