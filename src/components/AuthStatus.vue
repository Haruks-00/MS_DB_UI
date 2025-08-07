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

<script>
/**
 * [概要] ユーザーの認証状態を表示し、ログイン/ログアウトアクションを親に通知するコンポーネント。
 * @note UIの表示責務のみを持ち、認証のビジネスロジックは持たない。
 */
export default {
  name: 'AuthStatus',
  props: {
    /**
     * @property {Object | null} user - Firebaseのユーザーオブジェクト。nullの場合は未ログイン状態。
     */
    user: {
      type: Object,
      default: null,
    },
  },
  methods: {
    /**
     * [概要] ログインボタンクリック時に`login`イベントを発行する。
     */
    handleLogin() {
      // INFO: 実際のログイン処理は親コンポーネントに委譲する
      this.$emit('login');
    },
    /**
     * [概要] ログアウトボタンクリック時に`logout`イベントを発行する。
     */
    handleLogout() {
      // INFO: 実際のログアウト処理は親コンポーネントに委譲する
      this.$emit('logout');
    },
  },
}
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