<!-- src/App.vue -->
<template>
  <v-app>
    <!-- ミニマルヘッダーデザイン -->
    <v-app-bar
      app
      color="white"
      elevation="0"
      class="minimal-header"
      height="64"
    >
      <div class="d-flex align-center w-100">
        <!-- ロゴ部分 -->
        <div class="d-flex align-center mr-8">
          <v-icon icon="mdi-dragon" size="28" class="mr-3" color="primary" />
          <v-toolbar-title class="text-h5 font-weight-medium text-primary">
            キャラクター管理
          </v-toolbar-title>
        </div>

        <v-spacer></v-spacer>

        <!-- 認証ステータス -->
        <auth-status
          @login="handleLogin"
          @logout="handleLogout"
          class="mr-4"
        />
      </div>

      <!-- タブナビゲーション -->
      <template v-if="authStore.isLoggedIn" v-slot:extension>
        <div class="w-100 minimal-tabs-container">
          <v-tabs
            v-model="uiStore.activeTab"
            align-with-title
            color="primary"
            class="minimal-tabs"
            height="48"
          >
            <v-tab
              v-for="tab in tabs"
              :key="tab.id"
              :value="tab.id"
              class="minimal-tab"
            >
              <v-icon :icon="tab.icon" class="mr-2" size="20" />
              {{ tab.name }}
            </v-tab>
          </v-tabs>
        </div>
      </template>
    </v-app-bar>

    <v-main>
      <!-- メインコンテンツエリア -->
      <v-container class="pa-6 main-container">
        <div v-if="authStore.isLoggedIn">
          <!-- アカウントセレクター -->
          <account-selector
            :accounts="dataStore.accounts"
            v-model="uiStore.selectedAccountId"
            :visible="isAccountControlVisible"
            class="mb-6 minimal-account-selector"
          />

          <!-- タブコンテンツ -->
          <v-window
            v-if="dataStore.dataLoaded"
            v-model="uiStore.activeTab"
            class="minimal-window"
          >
            <!-- NOTE: 全てのv-window-itemに一意なkey属性を追加し、Vueがコンポーネントを正しく再描画できるようにします -->
            <v-window-item value="view-all" key="view-all">
              <view-all-characters-tab
                @items-updated="handleItemsUpdated"
              />
            </v-window-item>

            <v-window-item value="add-owned" key="add-owned">
              <add-owned-character-tab
                @character-added="handleCharacterAdded"
              />
            </v-window-item>

            <v-window-item value="manage-items" key="manage-items">
              <manage-items-tab
                @items-updated="handleItemsUpdated"
                @items-moved="handleItemsMoved"
              />
            </v-window-item>

            <v-window-item value="manage-teams" key="manage-teams">
              <manage-teams-tab
                @team-added="handleTeamAdded"
                @team-updated="handleTeamUpdated"
                @team-deleted="handleTeamDeleted"
              />
            </v-window-item>

            <v-window-item value="add-master" key="add-master">
              <add-master-character-tab
                @master-added="handleMasterDataChanged"
              />
            </v-window-item>

            <v-window-item value="edit-master" key="edit-master">
              <edit-master-character-tab
                @master-updated="handleMasterDataChanged"
              />
            </v-window-item>
          </v-window>

          <!-- ローディング表示 -->
          <div v-else class="text-center pa-16 minimal-loading">
            <v-progress-circular
              indeterminate
              color="primary"
              size="64"
              width="4"
              class="mb-6"
            />
            <p class="text-body-1 text-grey-darken-1">
              データを読み込んでいます...
            </p>
          </div>
        </div>

        <!-- 未認証時の表示 -->
        <div v-else class="text-center pa-16 minimal-welcome">
          <v-icon icon="mdi-dragon" size="80" color="primary" class="mb-6" />
          <h1 class="text-h4 font-weight-medium text-primary mb-4">
            キャラクター管理システム
          </h1>
          <p class="text-body-1 text-grey-darken-1 mb-8">
            ログインして、あなたのキャラクターを管理しましょう
          </p>
          <v-btn
            color="primary"
            size="large"
            variant="outlined"
            class="px-8"
            @click="handleLogin"
          >
            <v-icon icon="mdi-login" class="mr-2" />
            ログイン
          </v-btn>
        </div>
      </v-container>
    </v-main>

    <!-- スナックバー -->
    <v-snackbar
      v-model="uiStore.snackbar.show"
      :color="uiStore.snackbar.color"
      :timeout="3000"
    >
      {{ uiStore.snackbar.message }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="uiStore.hideSnackbar"
        >
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useDataStore } from "@/stores/data";
import { useUIStore } from "@/stores/ui";
import AuthStatus from "./components/auth/AuthStatus.vue";
import AccountSelector from "./components/shared/AccountSelector.vue";
import ViewAllCharactersTab from "./components/characters/ViewAllCharactersTab.vue";
import AddOwnedCharacterTab from "./components/characters/AddOwnedCharacterTab.vue";
import ManageItemsTab from "./components/items/ManageItemsTab.vue";
import ManageTeamsTab from "./components/teams/ManageTeamsTab.vue";
import AddMasterCharacterTab from "./components/characters/AddMasterCharacterTab.vue";
import EditMasterCharacterTab from "./components/characters/EditMasterCharacterTab.vue";
import type { ItemData, OwnedCharacter, Team } from "@/types";
import { databaseService } from "@/services/database";

// Piniaストアを使用
const authStore = useAuthStore();
const dataStore = useDataStore();
const uiStore = useUIStore();

const tabs = ref([
  { id: "view-all", name: "所持状況一覧", icon: "mdi-account-multiple" },
  { id: "add-owned", name: "所持キャラ追加", icon: "mdi-account-plus" },
  { id: "manage-items", name: "アイテム管理", icon: "mdi-sword-cross" },
  { id: "manage-teams", name: "編成管理", icon: "mdi-account-group" },
  { id: "add-master", name: "マスター追加", icon: "mdi-database-plus" },
  { id: "edit-master", name: "マスター編集", icon: "mdi-database-edit" },
]);

const isAccountControlVisible = computed(() => {
  return uiStore.activeTab === "add-owned" || uiStore.activeTab === "manage-items";
});

// 認証状態の初期化
onMounted(() => {
  // 認証リスナーを設定
  authStore.initAuthListener();
});

// 認証状態の変化を監視してデータロード
watch(
  () => authStore.user,
  (newUser) => {
    if (newUser && authStore.userId) {
      loadInitialData();
    } else {
      // ログアウト時はデータをリセット
      dataStore.resetData();
      uiStore.resetUI();
    }
  }
);

// ログイン処理
const handleLogin = async (): Promise<void> => {
  try {
    await authStore.loginWithGoogle();
    // watcherが自動的にデータをロードします
  } catch (error) {
    uiStore.showError("ログインに失敗しました");
  }
};

// ログアウト処理
const handleLogout = async (): Promise<void> => {
  await authStore.logout();
  // watcherが自動的にデータをリセットします
};

// 初期データロード
async function loadInitialData(): Promise<void> {
  if (dataStore.dataLoaded) return;
  if (!authStore.userId) return;

  try {
    uiStore.setLoading(true);

    if (import.meta.env.DEV) {
      console.time("Total Load Time");
      console.log("初期データの読み込みを開始...");
    }

    await dataStore.loadInitialData(authStore.userId);

    // 最初のアカウントを選択
    if (dataStore.accounts.length > 0) {
      uiStore.setSelectedAccountId(dataStore.accounts[0].id);
    }

    if (import.meta.env.DEV) {
      console.log("初期データの読み込み完了");
      console.timeEnd("Total Load Time");
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("データ読み込みエラー:", error);
    }
    uiStore.showError(`データ読み込みエラー: ${(error as Error).message}`);
  } finally {
    uiStore.setLoading(false);
  }
}

// キャラクター追加ハンドラ
const handleCharacterAdded = async ({ accountId, newCharacter }: { accountId: string; newCharacter: OwnedCharacter }): Promise<void> => {
  // ローカル状態を更新
  const characters = dataStore.ownedCharactersData.get(accountId) || [];
  characters.push(newCharacter);
  dataStore.updateOwnedCharactersForAccount(accountId, characters);

  uiStore.showSuccess("キャラクターを追加しました");
};

// アイテム更新ハンドラ
const handleItemsUpdated = async ({
  accountId,
  ownedCharacterId,
  characterMasterId,
  items,
  isNew
}: {
  accountId: string;
  ownedCharacterId?: string;
  characterMasterId: string;
  items: ItemData[];
  isNew?: boolean;
}): Promise<void> => {
  try {
    if (isNew) {
      // 新規追加の場合
      await dataStore.addOwnedCharacter(accountId, {
        characterMasterId,
        items,
      });
      uiStore.showSuccess("キャラクターを追加しました");
    } else {
      // 既存のアイテム更新の場合
      if (!ownedCharacterId) {
        throw new Error("ownedCharacterIdが必要です");
      }

      await databaseService.updateCharacterItems(accountId, ownedCharacterId, items);

      // ローカル状態を更新
      const accountChars = dataStore.ownedCharactersData.get(accountId) || [];
      const charToUpdate = accountChars.find((c) => c.id === ownedCharacterId);
      if (charToUpdate) {
        charToUpdate.items = items;
      }
      dataStore.updateOwnedCharactersForAccount(accountId, accountChars);

      uiStore.showSuccess("アイテムを更新しました");
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("アイテム更新エラー:", error);
    }
    uiStore.showError(`アイテム更新エラー: ${(error as Error).message}`);
  }
};

// アイテム移動ハンドラ
const handleItemsMoved = ({ accountId, from, to }: {
  accountId: string;
  from: { id: string; items: ItemData[] };
  to: { id: string; items: ItemData[] }
}): void => {
  const accountChars = dataStore.ownedCharactersData.get(accountId) || [];
  const fromChar = accountChars.find((c) => c.id === from.id);
  const toChar = accountChars.find((c) => c.id === to.id);
  if (fromChar) fromChar.items = from.items;
  if (toChar) toChar.items = to.items;
  dataStore.updateOwnedCharactersForAccount(accountId, accountChars);
};

// チーム追加ハンドラ
const handleTeamAdded = (newTeam: Team): void => {
  const teams = [newTeam, ...dataStore.teams];
  dataStore.setTeams(teams);
  uiStore.showSuccess("チームを追加しました");
};

// チーム更新ハンドラ
const handleTeamUpdated = (updatedTeam: Team): void => {
  const teams = dataStore.teams.map((t) =>
    t.id === updatedTeam.id ? { ...t, ...updatedTeam } : t
  );
  dataStore.setTeams(teams);
  uiStore.showSuccess("チームを更新しました");
};

// チーム削除ハンドラ
const handleTeamDeleted = (teamId: string): void => {
  const teams = dataStore.teams.filter((t) => t.id !== teamId);
  dataStore.setTeams(teams);
  uiStore.showSuccess("チームを削除しました");
};

// マスターデータ変更ハンドラ
const handleMasterDataChanged = (): void => {
  location.reload();
};
</script>

<style scoped>
/* ミニマルヘッダーのスタイル */
.minimal-header {
  background: #ffffff !important;
  border-bottom: 1px solid #e0e0e0;
}

/* ミニマルタブのスタイル */
.minimal-tabs-container {
  background: #fafafa;
  border-top: 1px solid #e0e0e0;
}

.minimal-tabs {
  background: transparent !important;
}

.minimal-tab {
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: background-color 0.2s ease;
  border-radius: 0;
  margin: 0;
}

.minimal-tab:hover {
  background: #f5f5f5;
}

/* メインコンテナのスタイル */
.main-container {
  background: #fafafa;
  min-height: calc(100vh - 112px);
}

/* ミニマルアカウントセレクター */
.minimal-account-selector {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

/* ミニマルウィンドウ */
.minimal-window {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

/* ミニマルローディング */
.minimal-loading {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

/* ミニマルウェルカム */
.minimal-welcome {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .minimal-header {
    height: 56px;
  }

  .minimal-tabs-container {
    margin: 0;
  }

  .main-container {
    padding: 16px;
  }
}
</style>
