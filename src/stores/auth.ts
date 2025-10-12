import { defineStore } from 'pinia';
import type { AuthState, User } from '@/types';
import { authService } from '@/services/auth';

/**
 * Auth Store
 * 認証状態を管理します
 */
export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthReady: false,
  }),

  getters: {
    /**
     * ユーザーがログインしているかどうか
     */
    isLoggedIn: (state): boolean => state.user !== null,

    /**
     * 現在のユーザーID
     */
    userId: (state): string | null => state.user?.uid || null,

    /**
     * 現在のユーザー名
     */
    userName: (state): string | null => state.user?.displayName || null,

    /**
     * 現在のユーザーのメールアドレス
     */
    userEmail: (state): string | null => state.user?.email || null,
  },

  actions: {
    /**
     * ユーザー情報を設定
     */
    setUser(user: User | null): void {
      this.user = user;
      if (import.meta.env.DEV) {
        console.log('Auth Store: User set', user?.uid || 'null');
      }
    },

    /**
     * 認証準備完了フラグを設定
     */
    setAuthReady(ready: boolean): void {
      this.isAuthReady = ready;
      if (import.meta.env.DEV) {
        console.log('Auth Store: Auth ready', ready);
      }
    },

    /**
     * Googleログイン
     */
    async loginWithGoogle(): Promise<void> {
      try {
        const userCredential = await authService.loginWithGoogle();
        this.setUser(userCredential.user);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Auth Store: Login failed', error);
        }
        throw error;
      }
    },

    /**
     * ログアウト
     */
    async logout(): Promise<void> {
      try {
        await authService.logout();
        this.setUser(null);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Auth Store: Logout failed', error);
        }
        throw error;
      }
    },

    /**
     * 認証状態の変化を監視
     */
    async initAuthListener(): Promise<void> {
      await authService.onAuthStateChanged((user) => {
        this.setUser(user);
        if (!this.isAuthReady) {
          this.setAuthReady(true);
        }
      });
    },
  },
});
