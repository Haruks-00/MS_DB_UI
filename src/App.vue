<!-- src/App.vue -->
<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>キャラクター管理</v-toolbar-title>
      <v-spacer></v-spacer>
      <auth-status :user="user" @login="handleLogin" @logout="handleLogout" />

      <template v-if="user" v-slot:extension>
        <v-tabs v-model="activeTab" align-with-title>
          <v-tab v-for="tab in tabs" :key="tab.id  " :value="tab.id">
            {{ tab.name  }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <div v-if="user">
          <account-selector
            :accounts="accounts"
            v-model="selectedAccountId"
            :visible="isAccountControlVisible"
            class="mb-4"
          />
          
          <v-window v-if="dataLoaded" v-model="activeTab">
            <!-- NOTE: 全てのv-window-itemに一意なkey属性を追加し、Vueがコンポーネントを正しく再描画できるようにします -->
            <v-window-item value="view-all" key="view-all">
              <view-all-characters-tab
                :data-loaded="dataLoaded"
                :accounts="accounts"
                :character-masters="characterMasters"
                :item-masters="itemMasters"
                :gacha-masters="gachaMasters"
                :owned-count-map="ownedCountMap"
                :owned-characters-data="ownedCharactersData"
                :item-masters-map="itemMastersMap"
              />
            </v-window-item>
            
            <v-window-item value="add-owned" key="add-owned">
              <add-owned-character-tab 
                :character-masters="characterMasters"
                :character-masters-map="characterMastersMap"
                :selected-account-id="selectedAccountId"
                :owned-count-map="ownedCountMap"
                @character-added="handleCharacterAdded"
              />
            </v-window-item>

            <v-window-item value="manage-items" key="manage-items">
              <manage-items-tab
                :selected-account-id="selectedAccountId"
                :owned-characters-data="ownedCharactersData"
                :character-masters-map="characterMastersMap"
                :item-masters="itemMasters"
                :item-masters-map="itemMastersMap"
                @items-updated="handleItemsUpdated"
                @items-moved="handleItemsMoved"
              />
            </v-window-item>

            <v-window-item value="manage-teams" key="manage-teams">
              <manage-teams-tab
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
            </v-window-item>

            <v-window-item value="add-master" key="add-master">
              <add-master-character-tab
                :gacha-masters="gachaMasters"
                @master-added="handleMasterDataChanged"
              />
            </v-window-item>
            
            <v-window-item value="edit-master" key="edit-master">
              <edit-master-character-tab
                :character-masters="characterMasters"
                :gacha-masters="gachaMasters"
                @master-updated="handleMasterDataChanged"
              />
            </v-window-item>
          </v-window>
          <div v-else class="text-center pa-10">
            <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
            <p class="mt-4">データを読み込んでいます...</p>
          </div>

        </div>
        <div v-else class="text-center pa-10">
          <h2>ようこそ</h2>
          <p>Googleアカウントでログインして、機能をご利用ください。</p>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { authService } from './services/auth.js';
import { databaseService } from './services/database.js';
import AuthStatus from './components/auth/AuthStatus.vue';
import AccountSelector from './components/shared/AccountSelector.vue';
import ViewAllCharactersTab from './components/characters/ViewAllCharactersTab.vue';
import AddOwnedCharacterTab from './components/characters/AddOwnedCharacterTab.vue';
import ManageItemsTab from './components/items/ManageItemsTab.vue';
import ManageTeamsTab from './components/teams/ManageTeamsTab.vue';
import AddMasterCharacterTab from './components/characters/AddMasterCharacterTab.vue';
import EditMasterCharacterTab from './components/characters/EditMasterCharacterTab.vue';

const user = ref(null);
const isAuthReady = ref(false);
const dataLoaded = ref(false);

const accounts = ref([]);
const characterMasters = ref([]);
const itemMasters = ref([]);
const gachaMasters = ref([]);
const teams = ref([]);

const itemMastersMap = ref(new Map());
const ownedCountMap = ref(new Map());
const ownedCharactersData = ref(new Map());
const characterMastersMap = ref(new Map());

const activeTab = ref('view-all');
const selectedAccountId = ref(null);

const tabs = ref([
  { id: 'view-all', name: '所持状況一覧' },
  { id: 'add-owned', name: '所持キャラ追加' },
  { id: 'manage-items', name: 'アイテム管理' },
  { id: 'manage-teams', name: '編成管理' },
  { id: 'add-master', name: 'マスター追加' },
  { id: 'edit-master', name: 'マスター編集' },
]);

const isAccountControlVisible = computed(() => {
  return activeTab.value === 'add-owned' || activeTab.value === 'manage-items';
});

authService.onAuthStateChanged(newUser => {
  user.value = newUser;
  isAuthReady.value = true;
  if (newUser) {
    loadInitialData();
  } else {
    resetLoadedData();
  }
});

const handleLogin = () => {
  authService.loginWithGoogle().catch(() => alert("ログインに失敗しました。"));
};

const handleLogout = () => {
  authService.logout();
};

const resetLoadedData = () => {
  dataLoaded.value = false;
  accounts.value = [];
  characterMasters.value = [];
  itemMasters.value = [];
  gachaMasters.value = [];
  teams.value = [];
  itemMastersMap.value = new Map();
  ownedCountMap.value = new Map();
  ownedCharactersData.value = new Map();
  characterMastersMap.value = new Map();
  selectedAccountId.value = null;
};

async function loadInitialData() {
  if (dataLoaded.value) return;
  if (!user.value) return;
  console.log("初期データの読み込みを開始...");
  try {
    const processedData = await databaseService.loadAndProcessInitialData(user.value.uid);
    
    accounts.value = processedData.accounts;
    characterMasters.value = processedData.characterMasters;
    itemMasters.value = processedData.itemMasters;
    gachaMasters.value = processedData.gachaMasters;
    teams.value = processedData.teams;
    itemMastersMap.value = processedData.itemMastersMap;
    ownedCountMap.value = processedData.ownedCountMap;
    ownedCharactersData.value = processedData.ownedCharactersData;
    characterMastersMap.value = processedData.characterMastersMap;
    
    if (accounts.value.length > 0) {
      selectedAccountId.value = accounts.value[0].id;
    }
    dataLoaded.value = true;
    console.log("初期データの読み込み完了");
  } catch (e) { 
    console.error("データ読み込みエラー:", e);
    alert(`データ読み込みエラー: ${e.message}`); 
  }
}

const handleCharacterAdded = ({ accountId, newCharacter }) => {
  if (!ownedCharactersData.value.has(accountId)) {
    ownedCharactersData.value.set(accountId, []);
  }
  ownedCharactersData.value.get(accountId).push(newCharacter);

  const masterId = newCharacter.characterMasterId;
  const countKey = `${masterId}-${accountId}`;
  const currentCount = ownedCountMap.value.get(countKey) || 0;
  ownedCountMap.value.set(countKey, currentCount + 1);
};

const handleItemsUpdated = ({ accountId, ownedCharacterId, items }) => {
  const accountChars = ownedCharactersData.value.get(accountId) || [];
  const charToUpdate = accountChars.find(c => c.id            === ownedCharacterId);
  if (charToUpdate) {
    charToUpdate.items = items; 
  }
};

const handleItemsMoved = ({ accountId, from, to }) => {
  const accountChars = ownedCharactersData.value.get(accountId) || [];
  const fromChar = accountChars.find(c => c.id === from.id   );
  const toChar = accountChars.find(c => c.id === to.id  );
  if (fromChar) fromChar.items = from.items; 
  if (toChar) toChar.items = to.items; 
};

const handleTeamAdded = (newTeam) => {
  teams.value.unshift(newTeam);
};

const handleTeamUpdated = (updatedTeam) => {
  const index = teams.value.findIndex(t => t.id     === updatedTeam.id  );
  if (index > -1) {
    teams.value[index] = { ...teams.value[index], ...updatedTeam };
  }
};

const handleTeamDeleted = (teamId) => {
  teams.value = teams.value.filter(t => t.id !== teamId);
};

const handleMasterDataChanged = () => {
  location.reload();
};
</script>