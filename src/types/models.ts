// ========================================
// ドメインモデル型定義
// ========================================

/**
 * キャラクターマスターデータ
 */
export interface CharacterMaster {
  id: string;
  name: string;
  rarity: number;
  gachaId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * アイテムマスターデータ
 */
export interface ItemMaster {
  id: string;
  name: string;
  type: string;
  stats: Record<string, number>;
  description?: string;
}

/**
 * ガチャマスターデータ
 */
export interface GachaMaster {
  id: string;
  name: string;
  characters: string[];
  startDate?: Date;
  endDate?: Date;
}

/**
 * アイテムデータ (新形式)
 */
export interface ItemData {
  itemId: number | string;
  isVirtual: boolean;
}

/**
 * アイテムデータ (旧形式 - 互換性のため)
 */
export type LegacyItemData = number | string;

/**
 * 所持キャラクターデータ
 */
export interface OwnedCharacter {
  id: string;
  characterMasterId: string;
  items: ItemData[];
  addedAt?: Date;
}

/**
 * アカウントデータ
 */
export interface Account {
  id: string;
  name: string;
  userId?: string;
  createdAt?: Date;
}

/**
 * チームメンバー
 */
export interface TeamMember {
  ownedCharacterId: string;
  position: number;
}

/**
 * チームデータ
 */
export interface Team {
  id: string;
  name: string;
  accountId: string;
  members: TeamMember[];
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * ユーザーデータ
 */
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
