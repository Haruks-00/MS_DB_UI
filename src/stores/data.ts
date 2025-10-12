import { defineStore } from 'pinia';
import type {
  DataState,
  Account,
  CharacterMaster,
  ItemMaster,
  GachaMaster,
  Team,
  OwnedCharacter,
} from '@/types';
import { databaseService } from '@/services/database';

/**
 * Data Store
 * アプリケーションのマスターデータと所持データを管理します
 */
export const useDataStore = defineStore('data', {
  state: (): DataState => ({
    dataLoaded: false,
    accounts: [],
    characterMasters: [],
    itemMasters: [],
    gachaMasters: [],
    teams: [],
    ownedCharactersData: new Map(),
    ownedCountMap: new Map(),
    characterMastersMap: new Map(),
    itemMastersMap: new Map(),
  }),

  getters: {
    /**
     * 指定したアカウントの所持キャラクター一覧を取得
     */
    getOwnedCharactersByAccount: (state) => {
      return (accountId: string): OwnedCharacter[] => {
        return state.ownedCharactersData.get(accountId) || [];
      };
    },

    /**
     * 指定したキャラクターマスターIDの所持数を取得
     */
    getOwnedCount: (state) => {
      return (characterMasterId: string, accountId: string): number => {
        const key = `${characterMasterId}-${accountId}`;
        return state.ownedCountMap.get(key) || 0;
      };
    },

    /**
     * 指定したキャラクターマスターIDのマスターデータを取得
     */
    getCharacterMaster: (state) => {
      return (characterMasterId: string): CharacterMaster | undefined => {
        return state.characterMastersMap.get(characterMasterId);
      };
    },

    /**
     * 指定したアイテムIDのアイテム名を取得
     */
    getItemName: (state) => {
      return (itemId: number): string => {
        return state.itemMastersMap.get(itemId) || `アイテム${itemId}`;
      };
    },

    /**
     * 指定したアカウントIDのアカウント情報を取得
     */
    getAccount: (state) => {
      return (accountId: string): Account | undefined => {
        return state.accounts.find((account) => account.id === accountId);
      };
    },
  },

  actions: {
    /**
     * 初期データをロード
     */
    async loadInitialData(userId: string): Promise<void> {
      if (this.dataLoaded) {
        if (import.meta.env.DEV) {
          console.log('Data Store: Data already loaded');
        }
        return;
      }

      try {
        if (import.meta.env.DEV) {
          console.log('Data Store: Loading initial data for user', userId);
        }

        const data = await databaseService.loadAndProcessInitialData(userId);

        this.accounts = data.accounts;
        this.characterMasters = data.characterMasters;
        this.characterMastersMap = data.characterMastersMap;
        this.itemMasters = data.itemMasters;
        this.itemMastersMap = data.itemMastersMap;
        this.gachaMasters = data.gachaMasters;
        this.teams = data.teams;
        this.ownedCharactersData = data.ownedCharactersData;
        this.ownedCountMap = data.ownedCountMap;

        this.dataLoaded = true;

        if (import.meta.env.DEV) {
          console.log('Data Store: Initial data loaded successfully', {
            accounts: this.accounts.length,
            characterMasters: this.characterMasters.length,
            itemMasters: this.itemMasters.length,
          });
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Data Store: Failed to load initial data', error);
        }
        throw error;
      }
    },

    /**
     * 所持キャラクターデータを更新
     */
    updateOwnedCharactersForAccount(accountId: string, characters: OwnedCharacter[]): void {
      this.ownedCharactersData.set(accountId, characters);

      // 所持数マップも更新
      characters.forEach((char) => {
        const key = `${char.characterMasterId}-${accountId}`;
        const currentCount = this.ownedCountMap.get(key) || 0;
        this.ownedCountMap.set(key, currentCount);
      });
    },

    /**
     * 所持キャラクターを追加
     */
    async addOwnedCharacter(accountId: string, characterData: Partial<OwnedCharacter>): Promise<void> {
      try {
        const docRef = await databaseService.addOwnedCharacter(accountId, characterData);

        // ローカルステートを更新
        const characters = this.ownedCharactersData.get(accountId) || [];
        const newCharacter: OwnedCharacter = {
          id: docRef.id,
          characterMasterId: characterData.characterMasterId || '',
          items: characterData.items || [],
          addedAt: new Date(),
        };
        characters.push(newCharacter);
        this.ownedCharactersData.set(accountId, characters);

        // 所持数を更新
        const key = `${newCharacter.characterMasterId}-${accountId}`;
        this.ownedCountMap.set(key, (this.ownedCountMap.get(key) || 0) + 1);

        if (import.meta.env.DEV) {
          console.log('Data Store: Character added', docRef.id);
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Data Store: Failed to add character', error);
        }
        throw error;
      }
    },

    /**
     * チーム一覧を更新
     */
    setTeams(teams: Team[]): void {
      this.teams = teams;
    },

    /**
     * チームを保存
     */
    async saveTeam(teamId: string | null, teamData: Partial<Team>): Promise<void> {
      try {
        await databaseService.saveTeam(teamId, teamData);

        // ローカルステートを更新
        if (teamId) {
          const index = this.teams.findIndex((t) => t.id === teamId);
          if (index !== -1) {
            this.teams[index] = { ...this.teams[index], ...teamData };
          }
        } else {
          // 新規作成の場合は再ロードが必要（IDが不明なため）
          // 実際のアプリケーションでは、戻り値のドキュメント参照からIDを取得して追加する
        }

        if (import.meta.env.DEV) {
          console.log('Data Store: Team saved', teamId || 'new');
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Data Store: Failed to save team', error);
        }
        throw error;
      }
    },

    /**
     * チームを削除
     */
    async deleteTeam(teamId: string): Promise<void> {
      try {
        await databaseService.deleteTeam(teamId);

        // ローカルステートを更新
        this.teams = this.teams.filter((t) => t.id !== teamId);

        if (import.meta.env.DEV) {
          console.log('Data Store: Team deleted', teamId);
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Data Store: Failed to delete team', error);
        }
        throw error;
      }
    },

    /**
     * データをリセット（ログアウト時などに使用）
     */
    resetData(): void {
      this.dataLoaded = false;
      this.accounts = [];
      this.characterMasters = [];
      this.itemMasters = [];
      this.gachaMasters = [];
      this.teams = [];
      this.ownedCharactersData = new Map();
      this.ownedCountMap = new Map();
      this.characterMastersMap = new Map();
      this.itemMastersMap = new Map();

      if (import.meta.env.DEV) {
        console.log('Data Store: Data reset');
      }
    },
  },
});
