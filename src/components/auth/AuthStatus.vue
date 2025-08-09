<template>
  <div>
    <!-- INFO: ログインしている場合の表示 -->
    <div v-if="user">
      <!-- INFO: v-menuを使って、クリックで開くドロップダウンメニューを作成します -->
      <v-menu location="bottom">
        <!-- INFO: v-slot:activatorで、メニューを開くトリガーとなる要素を指定します -->
        <template v-slot:activator="{ props }">
          <!-- INFO: v-btnにiconプロパティを付けると円形のアイコンボタンになります -->
          <v-btn icon v-bind="props">
            <!-- INFO: ユーザーのGoogleアカウントのプロフィール画像を表示します -->
            <v-avatar color="primary" size="small">
              <v-img v-if="user.photoURL" :src="user.photoURL" :alt="user.displayName"></v-img>
              <!-- NOTE: 画像がない場合はイニシャルなどを表示できます -->
              <span v-else class="text-h6">{{ user.displayName?.charAt(0) }}</span>
            </v-avatar>
          </v-btn>
        </template>
        
        <!-- INFO: メニューのコンテンツ部分です -->
        <v-list>
          <v-list-item
            :title="user.displayName"
            :subtitle="user.email "
          ></v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="handleLogout" prepend-icon="mdi-logout">
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    
    <!-- INFO: ログインしていない場合の表示 -->
    <div v-else>
      <v-btn @click="handleLogin" prepend-icon="mdi-google" color="white">
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
const emit = defineEmits(['login', 'logout']);

/**
 * [概要] ログインボタンクリック時に`login`イベントを発行する。
 */
const handleLogin = () => {
  emit('login');
};

/**
 * [概要] ログアウトボタンクリック時に`logout`イベントを発行する。
 */
const handleLogout = () => {
  emit('logout');
};
</script>
