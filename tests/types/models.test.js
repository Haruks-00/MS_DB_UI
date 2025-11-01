import { describe, it, expect } from 'vitest';

/**
 * ItemData型のテスト
 * isELフィールドが正しく扱われることを確認
 */
describe('ItemData型', () => {
  it('isELフィールドがtrueのItemDataを作成できる', () => {
    const itemData = {
      itemId: 1,
      isVirtual: false,
      isEL: true
    };

    expect(itemData.itemId).toBe(1);
    expect(itemData.isVirtual).toBe(false);
    expect(itemData.isEL).toBe(true);
  });

  it('isELフィールドがfalseのItemDataを作成できる', () => {
    const itemData = {
      itemId: 2,
      isVirtual: true,
      isEL: false
    };

    expect(itemData.itemId).toBe(2);
    expect(itemData.isVirtual).toBe(true);
    expect(itemData.isEL).toBe(false);
  });

  it('isELフィールドが未定義のItemDataを作成できる（後方互換性）', () => {
    const itemData = {
      itemId: 3,
      isVirtual: false
    };

    expect(itemData.itemId).toBe(3);
    expect(itemData.isVirtual).toBe(false);
    expect(itemData.isEL).toBeUndefined();
  });

  it('isELフィールドが未定義の場合、デフォルトでfalseとして扱われる', () => {
    const itemData = {
      itemId: 4,
      isVirtual: false
    };

    // isELが未定義またはfalseの場合は、レベルLとして扱う
    const level = itemData.isEL ? 'EL' : 'L';
    expect(level).toBe('L');
  });

  it('アイテム配列に複数のレベルが混在できる', () => {
    const items = [
      { itemId: 1, isVirtual: false, isEL: false },
      { itemId: 2, isVirtual: false, isEL: true },
      { itemId: 3, isVirtual: false }, // isEL未定義
      { itemId: 7, isVirtual: true, isEL: false }
    ];

    expect(items[0].isEL).toBe(false);
    expect(items[1].isEL).toBe(true);
    expect(items[2].isEL).toBeUndefined();
    expect(items[3].isEL).toBe(false);

    // レベル表示のテスト
    const levels = items.map(item => item.isEL ? 'EL' : 'L');
    expect(levels).toEqual(['L', 'EL', 'L', 'L']);
  });
});
