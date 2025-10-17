import { describe, it, expect } from 'vitest';
import { generateCSV, type ExportData, type OwnedCharacterWithAccount } from './csvExport';
import type { CharacterMaster, ItemData } from '@/types';

describe('csvExport', () => {
  describe('generateCSV', () => {
    it('CSVヘッダーを正しく生成すること', () => {
      const exportData: ExportData = {
        characterMasters: [],
        ownedCharacters: [],
        accountName: 'テストアカウント',
      };

      const result = generateCSV(exportData);

      expect(result).toContain('図鑑No,名前,属性,種類,アカウント,わくわく1,わくわく2,わくわく3');
    });

    it('所持キャラクター1体を正しくCSV形式に変換すること', () => {
      const characterMaster: CharacterMaster = {
        id: 'char1',
        name: 'アグナムート',
        monsterName: 'アグナムート',
        indexNumber: 191,
        element: '火',
        type: '限定',
        rarity: 6,
        gachaId: 'gacha1',
      };

      const ownedCharacter: OwnedCharacterWithAccount = {
        id: 'owned1',
        characterMasterId: 'char1',
        items: [],
        accountName: 'テストアカウント',
      };

      const exportData: ExportData = {
        characterMasters: [characterMaster],
        ownedCharacters: [ownedCharacter],
        accountName: 'テストアカウント',
      };

      const result = generateCSV(exportData);
      const lines = result.split('\n');

      // ヘッダー行 + データ行1つ
      expect(lines.length).toBeGreaterThanOrEqual(2);
      expect(lines[1]).toContain('191'); // 図鑑番号
      expect(lines[1]).toContain('"アグナムート"'); // 名前は常にダブルクォートで囲む
      expect(lines[1]).toContain('火'); // 属性
      expect(lines[1]).toContain('限定'); // 種類
      expect(lines[1]).toContain('テストアカウント');
    });

    it('アイテムを3つ持つキャラクターを正しく変換すること', () => {
      const characterMaster: CharacterMaster = {
        id: 'char1',
        name: 'スサノオ',
        monsterName: 'スサノオ',
        indexNumber: 193,
        element: '水',
        type: '恒常',
        rarity: 6,
        gachaId: 'gacha1',
      };

      const items: ItemData[] = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: false },
        { itemId: 3, isVirtual: false },
      ];

      const ownedCharacter: OwnedCharacterWithAccount = {
        id: 'owned1',
        characterMasterId: 'char1',
        items,
        accountName: 'テストアカウント',
      };

      const exportData: ExportData = {
        characterMasters: [characterMaster],
        ownedCharacters: [ownedCharacter],
        accountName: 'テストアカウント',
        itemMastersMap: new Map([
          [1, 'アイテム1'],
          [2, 'アイテム2'],
          [3, 'アイテム3'],
        ]),
      };

      const result = generateCSV(exportData);
      const lines = result.split('\n');

      expect(lines[1]).toContain('アイテム1');
      expect(lines[1]).toContain('アイテム2');
      expect(lines[1]).toContain('アイテム3');
    });

    it('仮アイテム（isVirtual: true）を除外すること', () => {
      const characterMaster: CharacterMaster = {
        id: 'char1',
        name: 'ハンターキング',
        monsterName: 'ハンターキング',
        indexNumber: 195,
        element: '木',
        type: '恒常',
        rarity: 6,
        gachaId: 'gacha1',
      };

      const items: ItemData[] = [
        { itemId: 1, isVirtual: false },
        { itemId: 2, isVirtual: true }, // 仮アイテム
        { itemId: 3, isVirtual: false },
      ];

      const ownedCharacter: OwnedCharacterWithAccount = {
        id: 'owned1',
        characterMasterId: 'char1',
        items,
        accountName: 'テストアカウント',
      };

      const exportData: ExportData = {
        characterMasters: [characterMaster],
        ownedCharacters: [ownedCharacter],
        accountName: 'テストアカウント',
        itemMastersMap: new Map([
          [1, 'アイテム1'],
          [2, '仮アイテム'],
          [3, 'アイテム3'],
        ]),
      };

      const result = generateCSV(exportData);
      const lines = result.split('\n');

      expect(lines[1]).toContain('アイテム1');
      expect(lines[1]).not.toContain('仮アイテム');
      expect(lines[1]).toContain('アイテム3');
    });

    it('複数のキャラクターを正しくCSV形式に変換すること', () => {
      const characterMasters: CharacterMaster[] = [
        { id: 'char1', name: 'キャラ1', monsterName: 'キャラ1', indexNumber: 100, element: '火', type: '恒常', rarity: 6, gachaId: 'gacha1' },
        { id: 'char2', name: 'キャラ2', monsterName: 'キャラ2', indexNumber: 200, element: '水', type: '限定', rarity: 5, gachaId: 'gacha2' },
      ];

      const ownedCharacters: OwnedCharacterWithAccount[] = [
        { id: 'owned1', characterMasterId: 'char1', items: [], accountName: 'テストアカウント' },
        { id: 'owned2', characterMasterId: 'char2', items: [], accountName: 'テストアカウント' },
      ];

      const exportData: ExportData = {
        characterMasters,
        ownedCharacters,
        accountName: 'テストアカウント',
      };

      const result = generateCSV(exportData);
      const lines = result.split('\n');

      // ヘッダー行 + データ行2つ
      expect(lines.length).toBeGreaterThanOrEqual(3);
      expect(result).toContain('"キャラ1"');
      expect(result).toContain('"キャラ2"');
    });

    it('BOM付きUTF-8でエンコードされていること', () => {
      const exportData: ExportData = {
        characterMasters: [],
        ownedCharacters: [],
        accountName: 'テストアカウント',
      };

      const result = generateCSV(exportData);

      // BOM（\uFEFF）が先頭に含まれているか確認
      expect(result.charCodeAt(0)).toBe(0xfeff);
    });

    it('CSV特殊文字（カンマ、ダブルクォート）を正しくエスケープすること', () => {
      const characterMaster: CharacterMaster = {
        id: 'char1',
        name: 'テスト"キャラ"、カンマあり',
        monsterName: 'テスト"キャラ"、カンマあり',
        indexNumber: 999,
        element: '光',
        type: 'コラボ',
        rarity: 6,
        gachaId: 'gacha1',
      };

      const ownedCharacter: OwnedCharacterWithAccount = {
        id: 'owned1',
        characterMasterId: 'char1',
        items: [],
        accountName: 'テスト,アカウント',
      };

      const exportData: ExportData = {
        characterMasters: [characterMaster],
        ownedCharacters: [ownedCharacter],
        accountName: 'テストアカウント',
      };

      const result = generateCSV(exportData);

      // ダブルクォートでエスケープされている
      expect(result).toContain('"テスト""キャラ""、カンマあり"');
      expect(result).toContain('"テスト,アカウント"');
    });

    it('存在しないcharacterMasterIdを持つキャラクターはスキップすること', () => {
      const characterMasters: CharacterMaster[] = [
        { id: 'char1', name: 'キャラ1', monsterName: 'キャラ1', indexNumber: 100, element: '火', type: '恒常', rarity: 6, gachaId: 'gacha1' },
      ];

      const ownedCharacters: OwnedCharacterWithAccount[] = [
        { id: 'owned1', characterMasterId: 'char1', items: [], accountName: 'テストアカウント' },
        { id: 'owned2', characterMasterId: 'char_not_exist', items: [], accountName: 'テストアカウント' }, // 存在しないID
      ];

      const exportData: ExportData = {
        characterMasters,
        ownedCharacters,
        accountName: 'テストアカウント',
      };

      const result = generateCSV(exportData);
      const lines = result.split('\n').filter(line => line.trim() !== '');

      // ヘッダー行 + データ行1つのみ（存在しないキャラはスキップ）
      expect(lines.length).toBe(2);
      expect(result).toContain('"キャラ1"');
    });
  });
});
