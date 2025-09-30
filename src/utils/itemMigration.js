/**
 * アイテムデータのマイグレーションユーティリティ
 *
 * 旧形式: items: [1, 2, 3]
 * 新形式: items: [{ itemId: 1, isVirtual: false }, { itemId: 2, isVirtual: false }, ...]
 */

/**
 * アイテムデータが旧形式（数値配列）かどうかを判定する
 * @param {Array} items - アイテム配列
 * @returns {boolean} 旧形式の場合true
 */
export const isOldFormat = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return false
  }
  // 最初の要素が数値なら旧形式
  return typeof items[0] === 'number'
}

/**
 * 旧形式のアイテムデータを新形式に変換する
 * @param {Array<number>} oldItems - 旧形式のアイテム配列
 * @returns {Array<{itemId: number, isVirtual: boolean}>} 新形式のアイテム配列
 */
export const migrateToNewFormat = (oldItems) => {
  if (!Array.isArray(oldItems)) {
    return []
  }

  return oldItems.map(itemId => ({
    itemId: Number(itemId),
    isVirtual: false
  }))
}

/**
 * アイテムデータを自動的に新形式に変換する（旧形式の場合のみ）
 * @param {Array} items - アイテム配列（旧形式または新形式）
 * @returns {Array<{itemId: number, isVirtual: boolean}>} 新形式のアイテム配列
 */
export const ensureNewFormat = (items) => {
  if (!items) {
    return []
  }

  if (isOldFormat(items)) {
    return migrateToNewFormat(items)
  }

  return items
}

/**
 * 実アイテムのみを抽出する
 * @param {Array<{itemId: number, isVirtual: boolean}>} items - アイテム配列
 * @returns {Array<{itemId: number, isVirtual: boolean}>} 実アイテムのみの配列
 */
export const getRealItems = (items) => {
  return ensureNewFormat(items).filter(item => !item.isVirtual)
}

/**
 * 仮想アイテムのみを抽出する
 * @param {Array<{itemId: number, isVirtual: boolean}>} items - アイテム配列
 * @returns {Array<{itemId: number, isVirtual: boolean}>} 仮想アイテムのみの配列
 */
export const getVirtualItems = (items) => {
  return ensureNewFormat(items).filter(item => item.isVirtual)
}

/**
 * 実アイテムの数を取得する
 * @param {Array<{itemId: number, isVirtual: boolean}>} items - アイテム配列
 * @returns {number} 実アイテムの数
 */
export const getRealItemCount = (items) => {
  return getRealItems(items).length
}

/**
 * 仮想アイテムの数を取得する
 * @param {Array<{itemId: number, isVirtual: boolean}>} items - アイテム配列
 * @returns {number} 仮想アイテムの数
 */
export const getVirtualItemCount = (items) => {
  return getVirtualItems(items).length
}