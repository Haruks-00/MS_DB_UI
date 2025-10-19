import { defineStore } from 'pinia';
import type { UIState } from '@/types';

/**
 * UI Store
 * アプリケーションのUI状態を管理します
 */
export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    activeTab: 'characters',
    selectedAccountId: null,
    loading: false,
    snackbar: {
      show: false,
      message: '',
      color: 'success',
    },
    pinnedCharacterIds: [],
  }),

  getters: {
    /**
     * スナックバーが表示されているかどうか
     */
    isSnackbarVisible: (state): boolean => state.snackbar.show,

    /**
     * ローディング中かどうか
     */
    isLoading: (state): boolean => state.loading,

    /**
     * アカウントが選択されているかどうか
     */
    hasSelectedAccount: (state): boolean => state.selectedAccountId !== null,
  },

  actions: {
    /**
     * アクティブなタブを設定
     */
    setActiveTab(tab: string): void {
      this.activeTab = tab;
      if (import.meta.env.DEV) {
        console.log('UI Store: Active tab changed to', tab);
      }
    },

    /**
     * 選択されたアカウントIDを設定
     */
    setSelectedAccountId(accountId: string | null): void {
      this.selectedAccountId = accountId;
      if (import.meta.env.DEV) {
        console.log('UI Store: Selected account changed to', accountId);
      }
    },

    /**
     * ローディング状態を設定
     */
    setLoading(loading: boolean): void {
      this.loading = loading;
    },

    /**
     * スナックバーを表示
     */
    showSnackbar(message: string, color: string = 'success'): void {
      this.snackbar = {
        show: true,
        message,
        color,
      };
      if (import.meta.env.DEV) {
        console.log('UI Store: Snackbar shown', { message, color });
      }
    },

    /**
     * 成功メッセージを表示
     */
    showSuccess(message: string): void {
      this.showSnackbar(message, 'success');
    },

    /**
     * エラーメッセージを表示
     */
    showError(message: string): void {
      this.showSnackbar(message, 'error');
    },

    /**
     * 情報メッセージを表示
     */
    showInfo(message: string): void {
      this.showSnackbar(message, 'info');
    },

    /**
     * 警告メッセージを表示
     */
    showWarning(message: string): void {
      this.showSnackbar(message, 'warning');
    },

    /**
     * スナックバーを非表示
     */
    hideSnackbar(): void {
      this.snackbar.show = false;
    },

    /**
     * UI状態をリセット（ログアウト時などに使用）
     */
    resetUI(): void {
      this.activeTab = 'characters';
      this.selectedAccountId = null;
      this.loading = false;
      this.snackbar = {
        show: false,
        message: '',
        color: 'success',
      };
      this.pinnedCharacterIds = [];
      if (import.meta.env.DEV) {
        console.log('UI Store: UI state reset');
      }
    },

    /**
     * キャラクターのピン留めをトグル
     */
    togglePinnedCharacter(masterId: number): void {
      const index = this.pinnedCharacterIds.indexOf(masterId);
      if (index > -1) {
        // 既にピン留めされている場合は削除
        this.pinnedCharacterIds.splice(index, 1);
      } else {
        // ピン留めされていない場合は追加
        this.pinnedCharacterIds.push(masterId);
      }
      if (import.meta.env.DEV) {
        console.log('UI Store: Pinned characters updated', this.pinnedCharacterIds);
      }
    },

    /**
     * キャラクターがピン留めされているか確認
     */
    isPinned(masterId: number): boolean {
      return this.pinnedCharacterIds.includes(masterId);
    },

    /**
     * 全てのピン留めを解除
     */
    clearPinnedCharacters(): void {
      this.pinnedCharacterIds = [];
      if (import.meta.env.DEV) {
        console.log('UI Store: All pinned characters cleared');
      }
    },
  },
});
