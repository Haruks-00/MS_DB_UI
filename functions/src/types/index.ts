/**
 * バックアップシステムの型定義
 */

/**
 * キャラクターマスターデータ
 */
export interface CharacterMaster {
  id: string;
  name: string;
  monsterName?: string;
  indexNumber?: number;
  element?: string;
  type?: string;
  rarity: number;
  gachaId: string;
  createdAt?: Date | FirebaseFirestore.Timestamp;
  updatedAt?: Date | FirebaseFirestore.Timestamp;
}

/**
 * アイテムデータ
 */
export interface ItemData {
  itemId: number | string;
  isVirtual?: boolean;
}

/**
 * 所持キャラクターデータ
 */
export interface OwnedCharacter {
  id: string;
  characterMasterId: string;
  items: ItemData[];
  createdAt?: Date | FirebaseFirestore.Timestamp;
  updatedAt?: Date | FirebaseFirestore.Timestamp;
}

/**
 * アカウントデータ
 */
export interface Account {
  id: string;
  name: string;
  numericId?: number;
  indexNumber?: number;
}

/**
 * アイテムマスターデータ
 */
export interface ItemMaster {
  id: number;
  name: string;
}

/**
 * バックアップ用の所持キャラクターデータ（アカウント情報付き）
 */
export interface OwnedCharacterWithAccount extends OwnedCharacter {
  accountName: string;
  accountId: string;
}

/**
 * バックアップタイプ
 */
export type BackupType = "full" | "incremental";

/**
 * バックアップメタデータ
 */
export interface BackupMetadata {
  type: BackupType;
  timestamp: Date;
  recordCount: number;
  filePath: string;
}

/**
 * バックアップ履歴
 */
export interface BackupHistory {
  id?: string;
  type: BackupType;
  startTime: Date;
  endTime: Date;
  recordCount: number;
  status: "success" | "failed";
  errorMessage?: string;
  filePath: string;
}
