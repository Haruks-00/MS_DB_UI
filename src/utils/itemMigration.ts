import type { ItemData, LegacyItemData } from '@/types';

/**
 * アイテムデータのマイグレーションユーティリティ
 *
 * 旧形式: items: [1, 2, 3] または ["5", "10"]
 * 新形式: items: [{ itemId: 1, isVirtual: false }, { itemId: 2, isVirtual: false }, ...]
 */

/**
 * アイテムデータが旧形式（数値または文字列の配列）かどうかを判定する
 * @param items - アイテム配列
 * @returns 旧形式の場合true
 */
export const isOldFormat = (items: unknown): items is LegacyItemData[] => {
  if (!Array.isArray(items) || items.length === 0) {
    return false;
  }
  // 最初の要素が数値または文字列なら旧形式
  const firstItem = items[0];
  return typeof firstItem === 'number' || typeof firstItem === 'string';
};

/**
 * 旧形式のアイテムデータを新形式に変換する
 * @param oldItems - 旧形式のアイテム配列（数値または文字列）
 * @returns 新形式のアイテム配列
 */
export const migrateToNewFormat = (oldItems: LegacyItemData[]): ItemData[] => {
  if (!Array.isArray(oldItems)) {
    return [];
  }

  return oldItems
    .map((itemId) => {
      const numericId = Number(itemId);
      // NaNチェック: 無効な値は除外
      if (isNaN(numericId)) {
        if (import.meta.env.DEV) {
          console.warn(`Invalid item ID detected: ${itemId}`);
        }
        return null;
      }
      return {
        itemId: numericId,
        isVirtual: false,
      } as ItemData;
    })
    .filter((item): item is ItemData => item !== null); // 無効なアイテムを除外
};

/**
 * アイテムデータを自動的に新形式に変換する（旧形式の場合のみ）
 * @param items - アイテム配列（旧形式または新形式）
 * @returns 新形式のアイテム配列
 */
export const ensureNewFormat = (items: ItemData[] | LegacyItemData[] | null | undefined): ItemData[] => {
  if (!items) {
    return [];
  }

  if (isOldFormat(items)) {
    return migrateToNewFormat(items);
  }

  return items as ItemData[];
};

/**
 * 実アイテムのみを抽出する
 * @param items - アイテム配列
 * @returns 実アイテムのみの配列
 */
export const getRealItems = (items: ItemData[] | LegacyItemData[] | null | undefined): ItemData[] => {
  return ensureNewFormat(items).filter((item) => !item.isVirtual);
};

/**
 * 仮想アイテムのみを抽出する
 * @param items - アイテム配列
 * @returns 仮想アイテムのみの配列
 */
export const getVirtualItems = (items: ItemData[] | LegacyItemData[] | null | undefined): ItemData[] => {
  return ensureNewFormat(items).filter((item) => item.isVirtual);
};

/**
 * 実アイテムの数を取得する
 * @param items - アイテム配列
 * @returns 実アイテムの数
 */
export const getRealItemCount = (items: ItemData[] | LegacyItemData[] | null | undefined): number => {
  return getRealItems(items).length;
};

/**
 * 仮想アイテムの数を取得する
 * @param items - アイテム配列
 * @returns 仮想アイテムの数
 */
export const getVirtualItemCount = (items: ItemData[] | LegacyItemData[] | null | undefined): number => {
  return getVirtualItems(items).length;
};
