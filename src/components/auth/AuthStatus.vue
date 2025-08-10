<template>
  <div>
    <!-- INFO: ログインしている場合の表示 -->
    <div v-if="user">
      <!-- INFO: v-menuを使って、クリックで開くドロップダウンメニューを作成します -->
      <v-menu location="bottom">
        <!-- INFO: v-slot:activatorで、メニューを開くトリガーとなる要素を指定します -->
        <template v-slot:activator="{ props }">
          <!-- INFO: v-btnにiconプロパティを付けると円形のアイコンボタンになります -->
          <v-btn icon v-bind="props" variant="text" class="minimal-user-button">
            <!-- INFO: ユーザーのGoogleアカウントのプロフィール画像を表示します -->
            <v-avatar color="primary" size="32" class="minimal-avatar">
              <v-img
                v-if="user.photoURL"
                :src="user.photoURL"
                :alt="user.displayName"
              ></v-img>
              <!-- NOTE: 画像がない場合はイニシャルなどを表示できます -->
              <span v-else class="text-body-2 font-weight-medium">{{
                user.displayName?.charAt(0)
              }}</span>
            </v-avatar>
          </v-btn>
        </template>

        <!-- INFO: メニューのコンテンツ部分です -->
        <v-list class="minimal-menu">
          <v-list-item
            :title="user.displayName"
            :subtitle="user.email"
            class="minimal-menu-item"
          ></v-list-item>
          <v-divider class="minimal-divider"></v-divider>
          <v-list-item
            @click="handleLogout"
            prepend-icon="mdi-logout"
            class="minimal-menu-item"
          >
            <v-list-item-title class="text-body-2"
              >ログアウト</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- INFO: ログインしていない場合の表示 -->
    <div v-else>
      <v-btn
        @click="handleLogin"
        prepend-icon="mdi-google"
        variant="outlined"
        color="primary"
        class="minimal-login-button"
      >
        Googleでログイン
      </v-btn>
    </div>
  </div>
</template>

<script setup>
/**
 * [概要] 親から渡されるプロパティを定義します。
 */
const props = defineProps({
  /**
   * @property {Object | null} user - Firebaseのユーザーオブジェクト。nullの場合は未ログイン状態。
   */
  user: {
    type: Object,
    default: null,
  },
});

/**
 * [概要] 親コンポーネントに通知するイベントを定義します。
 */
const emit = defineEmits(["login", "logout"]);

/**
 * [概要] ログインボタンクリック時に`login`イベントを発行する。
 */
const handleLogin = () => {
  emit("login");
};

/**
 * [概要] ログアウトボタンクリック時に`logout`イベントを発行する。
 */
const handleLogout = () => {
  emit("logout");
};
</script>

<style scoped>
.minimal-user-button {
  padding: 4px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.minimal-user-button:hover {
  background: var(--grey-100);
}

.minimal-avatar {
  border: 2px solid var(--grey-200);
  transition: border-color 0.2s ease;
}

.minimal-menu {
  border: 1px solid var(--grey-200);
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.minimal-menu-item {
  padding: 12px 16px;
  transition: background-color 0.2s ease;
}

.minimal-menu-item:hover {
  background: var(--grey-100);
}

.minimal-divider {
  margin: 4px 0;
  border-color: var(--grey-200);
}

.minimal-login-button {
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  font-weight: 500;
  text-transform: none;
  transition: all 0.2s ease;
}

.minimal-login-button:hover {
  background: var(--primary-color);
  color: white;
}
</style>
