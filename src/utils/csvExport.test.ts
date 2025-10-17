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
        { itemId: 100, isVirtual: false },
        { itemId: 101, isVirtual: false },
        { itemId: 102, isVirtual: false },
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
          [100, 'アイテム100'],
          [101, 'アイテム101'],
          [102, 'アイテム102'],
        ]),
      };

      const result = generateCSV(exportData);
      const lines = result.split('\n');

      expect(lines[1]).toContain('アイテム100');
      expect(lines[1]).toContain('アイテム101');
      expect(lines[1]).toContain('アイテム102');
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
        { itemId: 100, isVirtual: false },
        { itemId: 101, isVirtual: true }, // 仮アイテム
        { itemId: 102, isVirtual: false },
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
          [100, 'アイテム100'],
          [101, '仮アイテム'],
          [102, 'アイテム102'],
        ]),
      };

      const result = generateCSV(exportData);
      const lines = result.split('\n');

      expect(lines[1]).toContain('アイテム100');
      expect(lines[1]).not.toContain('仮アイテム');
      expect(lines[1]).toContain('アイテム102');
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

    it('図鑑番号順にソートされること', () => {
      const characterMasters: CharacterMaster[] = [
        { id: 'char3', name: 'キャラC', monsterName: 'キャラC', indexNumber: 300, element: '木', type: '恒常', rarity: 6, gachaId: 'gacha1' },
        { id: 'char1', name: 'キャラA', monsterName: 'キャラA', indexNumber: 100, element: '火', type: '恒常', rarity: 6, gachaId: 'gacha1' },
        { id: 'char2', name: 'キャラB', monsterName: 'キャラB', indexNumber: 200, element: '水', type: '恒常', rarity: 6, gachaId: 'gacha1' },
      ];

      const ownedCharacters: OwnedCharacterWithAccount[] = [
        { id: 'owned3', characterMasterId: 'char3', items: [], accountName: 'テストアカウント' },
        { id: 'owned1', characterMasterId: 'char1', items: [], accountName: 'テストアカウント' },
        { id: 'owned2', characterMasterId: 'char2', items: [], accountName: 'テストアカウント' },
      ];

      const exportData: ExportData = {
        characterMasters,
        ownedCharacters,
        accountName: 'テストアカウント',
      };

      const result = generateCSV(exportData);
      const lines = result.split('\n').filter(line => line.trim() !== '');

      // ヘッダー行 + データ行3つ
      expect(lines.length).toBe(4);

      // 図鑑番号順にソートされているか確認
      expect(lines[1]).toContain('100'); // 最初のデータ行はindexNumber: 100
      expect(lines[1]).toContain('"キャラA"');
      expect(lines[2]).toContain('200'); // 2番目のデータ行はindexNumber: 200
      expect(lines[2]).toContain('"キャラB"');
      expect(lines[3]).toContain('300'); // 3番目のデータ行はindexNumber: 300
      expect(lines[3]).toContain('"キャラC"');
    });

    it('アイテムIDを日本語文字列にマッピングすること', () => {
      const characterMaster: CharacterMaster = {
        id: 'char1',
        name: 'テストキャラ',
        monsterName: 'テストキャラ',
        indexNumber: 1,
        element: '火',
        type: '恒常',
        rarity: 6,
        gachaId: 'gacha1',
      };

      const items: ItemData[] = [
        { itemId: 1, isVirtual: false },
        { itemId: 14, isVirtual: false },
        { itemId: 27, isVirtual: false },
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
          [1, 'アイテム名1'],  // 実際のDBに保存されている名前
          [14, 'アイテム名14'],
          [27, 'アイテム名27'],
        ]),
      };

      const result = generateCSV(exportData);
      const lines = result.split('\n');

      // アイテムIDが日本語文字列にマッピングされている
      expect(lines[1]).toContain('同族・加撃');  // ID 1 → 同族・加撃
      expect(lines[1]).toContain('戦型・加撃速'); // ID 14 → 戦型・加撃速
      expect(lines[1]).toContain('ハート');       // ID 27 → ハート

      // 元のアイテム名は含まれない
      expect(lines[1]).not.toContain('アイテム名1');
      expect(lines[1]).not.toContain('アイテム名14');
      expect(lines[1]).not.toContain('アイテム名27');
    });

    it('マッピングされていないアイテムIDはitemMastersMapの値をそのまま使用すること', () => {
      const characterMaster: CharacterMaster = {
        id: 'char1',
        name: 'テストキャラ',
        monsterName: 'テストキャラ',
        indexNumber: 1,
        element: '火',
        type: '恒常',
        rarity: 6,
        gachaId: 'gacha1',
      };

      const items: ItemData[] = [
        { itemId: 999, isVirtual: false }, // マッピングに存在しないID
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
          [999, '未知のアイテム'],
        ]),
      };

      const result = generateCSV(exportData);
      const lines = result.split('\n');

      // マッピングされていない場合はitemMastersMapの値をそのまま使用
      expect(lines[1]).toContain('未知のアイテム');
    });

    it('アカウント名から「アカウント」を削除して番号のみ表示すること', () => {
      const characterMaster: CharacterMaster = {
        id: 'char1',
        name: 'テストキャラ',
        monsterName: 'テストキャラ',
        indexNumber: 1,
        element: '火',
        type: '恒常',
        rarity: 6,
        gachaId: 'gacha1',
      };

      const ownedCharacters: OwnedCharacterWithAccount[] = [
        { id: 'owned1', characterMasterId: 'char1', items: [], accountName: 'アカウント1' },
        { id: 'owned2', characterMasterId: 'char1', items: [], accountName: 'アカウント2' },
        { id: 'owned3', characterMasterId: 'char1', items: [], accountName: 'アカウント10' },
      ];

      const exportData: ExportData = {
        characterMasters: [characterMaster],
        ownedCharacters,
        accountName: 'アカウント1',
      };

      const result = generateCSV(exportData);
      const lines = result.split('\n');

      // 「アカウント」が削除され、番号のみが表示される
      expect(lines[1]).toContain(',1,');  // アカウント1 → 1
      expect(lines[2]).toContain(',2,');  // アカウント2 → 2
      expect(lines[3]).toContain(',10,'); // アカウント10 → 10

      // 「アカウント」という文字列は含まれない
      expect(lines[1]).not.toContain('アカウント1');
      expect(lines[2]).not.toContain('アカウント2');
      expect(lines[3]).not.toContain('アカウント10');
    });

    it('アカウント名が「アカウント」で始まらない場合はそのまま表示すること', () => {
      const characterMaster: CharacterMaster = {
        id: 'char1',
        name: 'テストキャラ',
        monsterName: 'テストキャラ',
        indexNumber: 1,
        element: '火',
        type: '恒常',
        rarity: 6,
        gachaId: 'gacha1',
      };

      const ownedCharacter: OwnedCharacterWithAccount = {
        id: 'owned1',
        characterMasterId: 'char1',
        items: [],
        accountName: 'メインアカウント',
      };

      const exportData: ExportData = {
        characterMasters: [characterMaster],
        ownedCharacters: [ownedCharacter],
        accountName: 'メインアカウント',
      };

      const result = generateCSV(exportData);
      const lines = result.split('\n');

      // 「アカウント」で始まらない場合はそのまま表示
      expect(lines[1]).toContain('メインアカウント');
    });
  });
});
