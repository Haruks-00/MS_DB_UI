import type {
  User,
  Account,
  CharacterMaster,
  ItemMaster,
  GachaMaster,
  Team,
  OwnedCharacter
} from './models';

// ========================================
// Pinia Store型定義
// ========================================

/**
 * Auth Store State
 */
export interface AuthState {
  user: User | null;
  isAuthReady: boolean;
}

/**
 * Data Store State
 */
export interface DataState {
  dataLoaded: boolean;
  accounts: Account[];
  characterMasters: CharacterMaster[];
  itemMasters: ItemMaster[];
  gachaMasters: GachaMaster[];
  teams: Team[];
  ownedCharactersData: Map<string, OwnedCharacter[]>;
  ownedCountMap: Map<string, number>;
  characterMastersMap: Map<string, CharacterMaster>;
  itemMastersMap: Map<number, string>;
}

/**
 * UI Store State
 */
export interface UIState {
  activeTab: string;
  selectedAccountId: string | null;
  loading: boolean;
  snackbar: {
    show: boolean;
    message: string;
    color: string;
  };
}
