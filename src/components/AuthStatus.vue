<template>
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

<style scoped>
#auth-container {
  text-align: right;
}
#auth-container div {
  display: flex;
  align-items: center;
  gap: 10px;
}
#auth-container p {
  margin: 0;
}
#auth-container button {
  padding: 8px 12px;
  font-size: 14px;
  white-space: nowrap;
}
</style>