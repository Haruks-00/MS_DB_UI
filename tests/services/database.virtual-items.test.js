import { describe, it, expect } from 'vitest'

/**
 * 仮想アイテム機能のテスト
 *
 * データ構造:
 * items: [
 *   { itemId: 1, isVirtual: false },  // 実アイテム
 *   { itemId: 2, isVirtual: true }    // 仮想アイテム
 * ]
 */

describe('仮想アイテム機能', () => {
  describe('データ構造の検証', () => {
    it('実アイテムのみのデータが正しく扱える', () => {
      const items = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: false }
      ]

      const realItems = items.filter(item => !item.isVirtual)
      expect(realItems).toHaveLength(2)
      expect(realItems[0].itemId).toBe(1)
      expect(realItems[1].itemId).toBe(2)
    })

    it('仮想アイテムのみのデータが正しく扱える', () => {
      const items = [
        { itemId: 1, isVirtual: true },
        { itemId: 2, isVirtual: true }
      ]

      const virtualItems = items.filter(item => item.isVirtual)
      expect(virtualItems).toHaveLength(2)
      expect(virtualItems[0].itemId).toBe(1)
      expect(virtualItems[1].itemId).toBe(2)
    })

    it('実アイテムと仮想アイテムが混在するデータが正しく扱える', () => {
      const items = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: true },
        { itemId: 3, isVirtual: false }
      ]

      const realItems = items.filter(item => !item.isVirtual)
      const virtualItems = items.filter(item => item.isVirtual)

      expect(realItems).toHaveLength(2)
      expect(virtualItems).toHaveLength(1)
      expect(realItems[0].itemId).toBe(1)
      expect(virtualItems[0].itemId).toBe(2)
    })

    it('アイテムが3個まで保持できる', () => {
      const items = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: true },
        { itemId: 3, isVirtual: false }
      ]

      expect(items).toHaveLength(3)
    })

    it('同じアイテムIDで実と仮想を区別できる', () => {
      // 同じキャラに同じアイテムの実と仮想を持てる仕様の場合
      const items = [
        { itemId: 1, isVirtual: false },
        { itemId: 1, isVirtual: true }
      ]

      const realItem = items.find(item => item.itemId === 1 && !item.isVirtual)
      const virtualItem = items.find(item => item.itemId === 1 && item.isVirtual)

      expect(realItem).toBeDefined()
      expect(virtualItem).toBeDefined()
      expect(realItem.isVirtual).toBe(false)
      expect(virtualItem.isVirtual).toBe(true)
    })
  })

  describe('マイグレーション処理', () => {
    it('旧形式のデータ(数値配列)を新形式に変換できる', () => {
      const oldFormatItems = [1, 2, 3]

      const newFormatItems = oldFormatItems.map(itemId => ({
        itemId,
        isVirtual: false
      }))

      expect(newFormatItems).toHaveLength(3)
      expect(newFormatItems[0]).toEqual({ itemId: 1, isVirtual: false })
      expect(newFormatItems[1]).toEqual({ itemId: 2, isVirtual: false })
      expect(newFormatItems[2]).toEqual({ itemId: 3, isVirtual: false })
    })

    it('空配列を正しく変換できる', () => {
      const oldFormatItems = []

      const newFormatItems = oldFormatItems.map(itemId => ({
        itemId,
        isVirtual: false
      }))

      expect(newFormatItems).toHaveLength(0)
    })

    it('未定義のitemsを空配列として扱える', () => {
      const character = { characterMasterId: 1 }

      const items = character.items || []
      const newFormatItems = items.map(itemId => ({
        itemId,
        isVirtual: false
      }))

      expect(newFormatItems).toHaveLength(0)
    })
  })

  describe('制約の検証', () => {
    it('実アイテム + 仮想アイテムが3個以下であることを検証できる', () => {
      const validItems = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: true },
        { itemId: 3, isVirtual: false }
      ]

      expect(validItems.length).toBeLessThanOrEqual(3)
    })

    it('実アイテム + 仮想アイテムが3個を超える場合にエラーを検出できる', () => {
      const invalidItems = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: true },
        { itemId: 3, isVirtual: false },
        { itemId: 4, isVirtual: true }
      ]

      const isValid = invalidItems.length <= 3
      expect(isValid).toBe(false)
    })
  })

  describe('仮想アイテムの表示ロジック', () => {
    it('実アイテムのみの場合、チェックマークと名前を表示', () => {
      const item = { itemId: 1, isVirtual: false }
      const itemName = 'エクスカリバー'

      const displayText = item.isVirtual
        ? `📋 ${itemName}`
        : `✔️ ${itemName}`

      expect(displayText).toBe('✔️ エクスカリバー')
    })

    it('仮想アイテムの場合、クリップボードマークと名前を表示', () => {
      const item = { itemId: 1, isVirtual: true }
      const itemName = 'エクスカリバー'

      const displayText = item.isVirtual
        ? `📋 ${itemName}`
        : `✔️ ${itemName}`

      expect(displayText).toBe('📋 エクスカリバー')
    })
  })

  describe('仮想アイテムのフィルタリング', () => {
    it('仮想アイテムを持つキャラクターを抽出できる', () => {
      const characters = [
        {
          id: 'char1',
          characterMasterId: 1,
          items: [
            { itemId: 1, isVirtual: false },
            { itemId: 2, isVirtual: false }
          ]
        },
        {
          id: 'char2',
          characterMasterId: 2,
          items: [
            { itemId: 1, isVirtual: false },
            { itemId: 2, isVirtual: true }
          ]
        },
        {
          id: 'char3',
          characterMasterId: 3,
          items: [
            { itemId: 1, isVirtual: true }
          ]
        }
      ]

      const hasVirtualItem = (char) => {
        return char.items?.some(item => item.isVirtual) || false
      }

      const charsWithVirtualItems = characters.filter(hasVirtualItem)

      expect(charsWithVirtualItems).toHaveLength(2)
      expect(charsWithVirtualItems[0].id).toBe('char2')
      expect(charsWithVirtualItems[1].id).toBe('char3')
    })

    it('仮想アイテム数でフィルタリングできる', () => {
      const characters = [
        {
          id: 'char1',
          characterMasterId: 1,
          items: [
            { itemId: 1, isVirtual: true }
          ]
        },
        {
          id: 'char2',
          characterMasterId: 2,
          items: [
            { itemId: 1, isVirtual: true },
            { itemId: 2, isVirtual: true }
          ]
        },
        {
          id: 'char3',
          characterMasterId: 3,
          items: [
            { itemId: 1, isVirtual: true },
            { itemId: 2, isVirtual: true },
            { itemId: 3, isVirtual: true }
          ]
        }
      ]

      const getVirtualItemCount = (char) => {
        return char.items?.filter(item => item.isVirtual).length || 0
      }

      const oneVirtualItem = characters.filter(char => getVirtualItemCount(char) === 1)
      const twoVirtualItems = characters.filter(char => getVirtualItemCount(char) === 2)
      const threeVirtualItems = characters.filter(char => getVirtualItemCount(char) === 3)

      expect(oneVirtualItem).toHaveLength(1)
      expect(twoVirtualItems).toHaveLength(1)
      expect(threeVirtualItems).toHaveLength(1)
    })
  })
})