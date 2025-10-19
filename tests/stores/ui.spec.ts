import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUIStore } from '../../src/stores/ui';

describe('UIStore - ピン留め機能', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('初期状態ではpinnedCharacterIdsが空配列である', () => {
    const store = useUIStore();
    expect(store.pinnedCharacterIds).toEqual([]);
  });

  it('togglePinnedCharacterでキャラクターIDを追加できる', () => {
    const store = useUIStore();
    store.togglePinnedCharacter(1);
    expect(store.pinnedCharacterIds).toContain(1);
  });

  it('togglePinnedCharacterで既にピン留めされているIDを削除できる', () => {
    const store = useUIStore();
    store.togglePinnedCharacter(1);
    expect(store.pinnedCharacterIds).toContain(1);

    store.togglePinnedCharacter(1);
    expect(store.pinnedCharacterIds).not.toContain(1);
  });

  it('複数のキャラクターをピン留めできる', () => {
    const store = useUIStore();
    store.togglePinnedCharacter(1);
    store.togglePinnedCharacter(2);
    store.togglePinnedCharacter(3);

    expect(store.pinnedCharacterIds).toEqual([1, 2, 3]);
  });

  it('isPinnedでピン留め状態を確認できる', () => {
    const store = useUIStore();
    store.togglePinnedCharacter(1);

    expect(store.isPinned(1)).toBe(true);
    expect(store.isPinned(2)).toBe(false);
  });

  it('clearPinnedCharactersで全てのピン留めを解除できる', () => {
    const store = useUIStore();
    store.togglePinnedCharacter(1);
    store.togglePinnedCharacter(2);
    store.togglePinnedCharacter(3);

    expect(store.pinnedCharacterIds).toHaveLength(3);

    store.clearPinnedCharacters();
    expect(store.pinnedCharacterIds).toEqual([]);
  });

  it('resetUIでピン留めも含めて全てリセットされる', () => {
    const store = useUIStore();
    store.togglePinnedCharacter(1);
    store.setActiveTab('add-owned');
    store.setSelectedAccountId('account-1');

    store.resetUI();

    expect(store.pinnedCharacterIds).toEqual([]);
    expect(store.activeTab).toBe('characters');
    expect(store.selectedAccountId).toBe(null);
  });
});
