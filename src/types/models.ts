// ========================================
// ドメインモデル型定義
// ========================================

/**
 * キャラクターマスターデータ
 */
export interface CharacterMaster {
  id: string;
  name: string; // 互換性のために残すが、実際のDBではmonsterNameを使用
  monsterName?: string; // 実際のDBフィールド名
  indexNumber?: number; // 図鑑番号
  element?: string; // 属性（火・水・木・光・闇）
  type?: string; // 種類（恒常・限定・コラボ・α）
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
  isEL?: boolean; // アイテムのレベル。trueの場合EL、falseまたは未定義の場合L
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
