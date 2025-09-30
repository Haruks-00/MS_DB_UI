import { describe, it, expect } from 'vitest'
import {
  isOldFormat,
  migrateToNewFormat,
  ensureNewFormat,
  getRealItems,
  getVirtualItems,
  getRealItemCount,
  getVirtualItemCount
} from '../../src/utils/itemMigration.js'

describe('itemMigration', () => {
  describe('isOldFormat', () => {
    it('旧形式（数値配列）をtrueと判定する', () => {
      const oldItems = [1, 2, 3]
      expect(isOldFormat(oldItems)).toBe(true)
    })

    it('新形式（オブジェクト配列）をfalseと判定する', () => {
      const newItems = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: true }
      ]
      expect(isOldFormat(newItems)).toBe(false)
    })

    it('空配列をfalseと判定する', () => {
      expect(isOldFormat([])).toBe(false)
    })

    it('nullをfalseと判定する', () => {
      expect(isOldFormat(null)).toBe(false)
    })

    it('undefinedをfalseと判定する', () => {
      expect(isOldFormat(undefined)).toBe(false)
    })
  })

  describe('migrateToNewFormat', () => {
    it('旧形式を新形式に変換する', () => {
      const oldItems = [1, 2, 3]
      const newItems = migrateToNewFormat(oldItems)

      expect(newItems).toHaveLength(3)
      expect(newItems[0]).toEqual({ itemId: 1, isVirtual: false })
      expect(newItems[1]).toEqual({ itemId: 2, isVirtual: false })
      expect(newItems[2]).toEqual({ itemId: 3, isVirtual: false })
    })

    it('空配列を空配列に変換する', () => {
      const oldItems = []
      const newItems = migrateToNewFormat(oldItems)

      expect(newItems).toHaveLength(0)
    })

    it('nullを空配列に変換する', () => {
      const newItems = migrateToNewFormat(null)
      expect(newItems).toHaveLength(0)
    })

    it('文字列の数値も数値に変換する', () => {
      const oldItems = ['1', '2', '3']
      const newItems = migrateToNewFormat(oldItems)

      expect(newItems[0].itemId).toBe(1)
      expect(typeof newItems[0].itemId).toBe('number')
    })
  })

  describe('ensureNewFormat', () => {
    it('旧形式を自動的に新形式に変換する', () => {
      const oldItems = [1, 2]
      const result = ensureNewFormat(oldItems)

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({ itemId: 1, isVirtual: false })
    })

    it('新形式はそのまま返す', () => {
      const newItems = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: true }
      ]
      const result = ensureNewFormat(newItems)

      expect(result).toEqual(newItems)
    })

    it('nullを空配列に変換する', () => {
      const result = ensureNewFormat(null)
      expect(result).toHaveLength(0)
    })

    it('undefinedを空配列に変換する', () => {
      const result = ensureNewFormat(undefined)
      expect(result).toHaveLength(0)
    })
  })

  describe('getRealItems', () => {
    it('実アイテムのみを抽出する', () => {
      const items = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: true },
        { itemId: 3, isVirtual: false }
      ]
      const realItems = getRealItems(items)

      expect(realItems).toHaveLength(2)
      expect(realItems[0].itemId).toBe(1)
      expect(realItems[1].itemId).toBe(3)
    })

    it('旧形式からも実アイテムを抽出する（全て実アイテム扱い）', () => {
      const oldItems = [1, 2, 3]
      const realItems = getRealItems(oldItems)

      expect(realItems).toHaveLength(3)
      expect(realItems[0].itemId).toBe(1)
    })

    it('仮想アイテムのみの場合は空配列を返す', () => {
      const items = [
        { itemId: 1, isVirtual: true },
        { itemId: 2, isVirtual: true }
      ]
      const realItems = getRealItems(items)

      expect(realItems).toHaveLength(0)
    })
  })

  describe('getVirtualItems', () => {
    it('仮想アイテムのみを抽出する', () => {
      const items = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: true },
        { itemId: 3, isVirtual: true }
      ]
      const virtualItems = getVirtualItems(items)

      expect(virtualItems).toHaveLength(2)
      expect(virtualItems[0].itemId).toBe(2)
      expect(virtualItems[1].itemId).toBe(3)
    })

    it('実アイテムのみの場合は空配列を返す', () => {
      const items = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: false }
      ]
      const virtualItems = getVirtualItems(items)

      expect(virtualItems).toHaveLength(0)
    })

    it('旧形式の場合は空配列を返す（旧形式は全て実アイテム）', () => {
      const oldItems = [1, 2, 3]
      const virtualItems = getVirtualItems(oldItems)

      expect(virtualItems).toHaveLength(0)
    })
  })

  describe('getRealItemCount', () => {
    it('実アイテムの数を返す', () => {
      const items = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: true },
        { itemId: 3, isVirtual: false }
      ]
      const count = getRealItemCount(items)

      expect(count).toBe(2)
    })

    it('旧形式の数を返す（全て実アイテム扱い）', () => {
      const oldItems = [1, 2, 3]
      const count = getRealItemCount(oldItems)

      expect(count).toBe(3)
    })
  })

  describe('getVirtualItemCount', () => {
    it('仮想アイテムの数を返す', () => {
      const items = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: true },
        { itemId: 3, isVirtual: true }
      ]
      const count = getVirtualItemCount(items)

      expect(count).toBe(2)
    })

    it('旧形式では0を返す（旧形式は全て実アイテム）', () => {
      const oldItems = [1, 2, 3]
      const count = getVirtualItemCount(oldItems)

      expect(count).toBe(0)
    })
  })
})