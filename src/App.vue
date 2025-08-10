<!-- src/App.vue -->
<template>
  <v-app>
    <!-- 洗練されたヘッダーデザイン -->
    <v-app-bar
      app
      color="primary"
      dark
      elevation="0"
      class="premium-header"
      height="80"
    >
      <div class="d-flex align-center w-100">
        <!-- ロゴ部分 -->
        <div class="d-flex align-center mr-6">
          <v-icon
            icon="mdi-dragon"
            size="36"
            class="mr-3 animate-pulse"
            color="white"
          />
          <v-toolbar-title class="text-h4 font-weight-bold gradient-text-white">
            キャラクター管理
          </v-toolbar-title>
        </div>

        <v-spacer></v-spacer>

        <!-- 認証ステータス -->
        <auth-status
          :user="user"
          @login="handleLogin"
          @logout="handleLogout"
          class="mr-4"
        />
      </div>

      <!-- タブナビゲーション -->
      <template v-if="user" v-slot:extension>
        <div class="w-100 premium-tabs-container">
          <v-tabs
            v-model="activeTab"
            align-with-title
            color="white"
            class="premium-tabs"
            height="60"
          >
            <v-tab
              v-for="tab in tabs"
              :key="tab.id"
              :value="tab.id"
              class="premium-tab"
            >
              <v-icon :icon="tab.icon" class="mr-2" />
              {{ tab.name }}
            </v-tab>
          </v-tabs>
        </div>
      </template>
    </v-app-bar>

    <v-main>
      <!-- メインコンテンツエリア -->
      <v-container class="pa-md-6 main-container">
        <div v-if="user" class="animate-fade-in-up">
          <!-- アカウントセレクター -->
          <account-selector
            :accounts="accounts"
            v-model="selectedAccountId"
            :visible="isAccountControlVisible"
            class="mb-6 premium-account-selector"
          />

          <!-- タブコンテンツ -->
          <v-window
            v-if="dataLoaded"
            v-model="activeTab"
            class="premium-window"
          >
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

          <!-- ローディング表示 -->
          <div v-else class="text-center pa-16 premium-loading">
            <v-progress-circular
              indeterminate
              color="primary"
              size="80"
              width="6"
              class="mb-6"
            />
            <p class="text-h6 text-grey-darken-1">
              データを読み込んでいます...
            </p>
          </div>
        </div>

        <!-- 未認証時の表示 -->
        <div v-else class="text-center pa-16 premium-welcome">
          <v-icon
            icon="mdi-dragon"
            size="120"
            color="primary"
            class="mb-8 animate-pulse"
          />
          <h1 class="text-h3 font-weight-bold gradient-text mb-4">
            キャラクター管理システム
          </h1>
          <p class="text-h6 text-grey-darken-1 mb-8">
            ログインして、あなたのキャラクターを管理しましょう
          </p>
          <v-btn
            color="primary"
            size="x-large"
            rounded="xl"
            class="px-8 py-4"
            @click="handleLogin"
          >
            <v-icon icon="mdi-login" class="mr-2" />
            ログイン
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { authService } from "./services/auth.js";
import { databaseService } from "./services/database.js";
import AuthStatus from "./components/auth/AuthStatus.vue";
import AccountSelector from "./components/shared/AccountSelector.vue";
import ViewAllCharactersTab from "./components/characters/ViewAllCharactersTab.vue";
import AddOwnedCharacterTab from "./components/characters/AddOwnedCharacterTab.vue";
import ManageItemsTab from "./components/items/ManageItemsTab.vue";
import ManageTeamsTab from "./components/teams/ManageTeamsTab.vue";
import AddMasterCharacterTab from "./components/characters/AddMasterCharacterTab.vue";
import EditMasterCharacterTab from "./components/characters/EditMasterCharacterTab.vue";

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

const activeTab = ref("view-all");
const selectedAccountId = ref(null);

const tabs = ref([
  { id: "view-all", name: "所持状況一覧", icon: "mdi-account-multiple" },
  { id: "add-owned", name: "所持キャラ追加", icon: "mdi-account-plus" },
  { id: "manage-items", name: "アイテム管理", icon: "mdi-sword-cross" },
  { id: "manage-teams", name: "編成管理", icon: "mdi-account-group" },
  { id: "add-master", name: "マスター追加", icon: "mdi-database-plus" },
  { id: "edit-master", name: "マスター編集", icon: "mdi-database-edit" },
]);

const isAccountControlVisible = computed(() => {
  return activeTab.value === "add-owned" || activeTab.value === "manage-items";
});

authService.onAuthStateChanged((newUser) => {
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

  // ▼▼▼ ここから変更 ▼▼▼
  console.time("Total Load Time"); // 全体時間の計測開始
  console.log("初期データの読み込みを開始...");

  try {
    console.time("Data Processing Time"); // データ処理時間の計測開始
    const processedData = await databaseService.loadAndProcessInitialData(
      user.value.uid
    );
    console.timeEnd("Data Processing Time"); // データ処理時間の計測終了

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

    // NOTE: Vueが画面を更新するのを待つために、nextTickを挟むとより正確な描画時間が見えることがある
    // await nextTick(); // 必要ならこの行を有効化する (import { nextTick } from 'vue'; が必要)

    dataLoaded.value = true;
    console.log("初期データの読み込み完了");
  } catch (e) {
    console.error("データ読み込みエラー:", e);
    alert(`データ読み込みエラー: ${e.message}`);
  } finally {
    console.timeEnd("Total Load Time"); // 全体時間の計測終了
  }
  // ▲▲▲ ここまで変更 ▲▲▲
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
  const charToUpdate = accountChars.find((c) => c.id === ownedCharacterId);
  if (charToUpdate) {
    charToUpdate.items = items;
  }
};

const handleItemsMoved = ({ accountId, from, to }) => {
  const accountChars = ownedCharactersData.value.get(accountId) || [];
  const fromChar = accountChars.find((c) => c.id === from.id);
  const toChar = accountChars.find((c) => c.id === to.id);
  if (fromChar) fromChar.items = from.items;
  if (toChar) toChar.items = to.items;
};

const handleTeamAdded = (newTeam) => {
  teams.value.unshift(newTeam);
};

const handleTeamUpdated = (updatedTeam) => {
  const index = teams.value.findIndex((t) => t.id === updatedTeam.id);
  if (index > -1) {
    teams.value[index] = { ...teams.value[index], ...updatedTeam };
  }
};

const handleTeamDeleted = (teamId) => {
  teams.value = teams.value.filter((t) => t.id !== teamId);
};

const handleMasterDataChanged = () => {
  location.reload();
};
</script>

<style scoped>
/* プレミアムヘッダーのスタイル */
.premium-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.gradient-text-white {
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* プレミアムタブのスタイル */
.premium-tabs-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px 16px 0 0;
  margin: 0 16px;
}

.premium-tabs {
  background: transparent !important;
}

.premium-tab {
  font-weight: 600;
  letter-spacing: 0.025em;
  transition: all 0.3s ease;
  border-radius: 12px 12px 0 0;
  margin: 0 4px;
}

.premium-tab:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* メインコンテナのスタイル */
.main-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: calc(100vh - 140px);
}

/* プレミアムアカウントセレクター */
.premium-account-selector {
  animation: fadeInUp 0.8s ease-out;
}

/* プレミアムウィンドウ */
.premium-window {
  animation: fadeInUp 1s ease-out;
}

/* プレミアムローディング */
.premium-loading {
  animation: fadeInUp 0.6s ease-out;
}

/* プレミアムウェルカム */
.premium-welcome {
  animation: fadeInUp 1.2s ease-out;
}

/* アニメーション */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .premium-header {
    height: 70px;
  }

  .premium-tabs-container {
    margin: 0 8px;
  }

  .main-container {
    padding: 16px;
  }
}
</style>
