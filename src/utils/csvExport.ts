import type { CharacterMaster, OwnedCharacter, ItemData } from '@/types';

/**
 * エクスポート用の所持キャラクターデータ（アカウント名付き）
 */
export interface OwnedCharacterWithAccount extends OwnedCharacter {
  accountName: string;
}

/**
 * CSVエクスポートに必要なデータ
 */
export interface ExportData {
  characterMasters: CharacterMaster[];
  ownedCharacters: OwnedCharacterWithAccount[];
  accountName: string; // 互換性のため残すが、各キャラクターのaccountNameを優先
  itemMastersMap?: Map<number, string>;
}

/**
 * CSV特殊文字をエスケープする
 * カンマ、ダブルクォート、改行を含む場合はダブルクォートで囲み、
 * ダブルクォート自体は2つ連続で表現する
 */
const escapeCSVValue = (value: string | number): string => {
  const strValue = String(value);

  // カンマ、ダブルクォート、改行を含む場合
  if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n')) {
    // ダブルクォートを2つに
    const escaped = strValue.replace(/"/g, '""');
    return `"${escaped}"`;
  }

  return strValue;
};

/**
 * アイテムIDからアイテム名を取得
 */
const getItemName = (
  itemId: number | string,
  itemMastersMap?: Map<number, string>
): string => {
  if (!itemMastersMap) {
    return `アイテム${itemId}`;
  }

  const numericId = typeof itemId === 'string' ? parseInt(itemId, 10) : itemId;
  return itemMastersMap.get(numericId) || `アイテム${itemId}`;
};

/**
 * 所持キャラクターとマスターデータからCSV形式の文字列を生成
 * BOM付きUTF-8でエンコードされたCSVを返す
 */
export const generateCSV = (exportData: ExportData): string => {
  const { characterMasters, ownedCharacters, accountName, itemMastersMap } = exportData;

  // マスターデータをMapに変換して高速検索
  const masterMap = new Map<string, CharacterMaster>();
  characterMasters.forEach(master => {
    masterMap.set(master.id, master);
  });

  // CSV行を格納する配列
  const rows: string[] = [];

  // ヘッダー行
  rows.push('図鑑No,名前,属性,種類,アカウント,わくわく1,わくわく2,わくわく3');

  // データ行
  ownedCharacters.forEach(ownedChar => {
    const master = masterMap.get(ownedChar.characterMasterId);

    // マスターデータが存在しない場合はスキップ
    if (!master) {
      return;
    }

    // 仮アイテムを除外したアイテムリストを作成
    const realItems = ownedChar.items.filter(item => !item.isVirtual);

    // アイテム名を取得（最大3つまで）
    const itemNames = realItems
      .slice(0, 3)
      .map(item => getItemName(item.itemId, itemMastersMap));

    // 3つに満たない場合は空文字で埋める
    while (itemNames.length < 3) {
      itemNames.push('');
    }

    // アカウント名を取得（個別のaccountNameがあればそれを優先）
    const charAccountName = ownedChar.accountName || accountName;

    // CSVの1行を構築
    const row = [
      master.indexNumber !== undefined ? master.indexNumber : '', // 図鑑No
      escapeCSVValue(master.monsterName || master.name), // モンスター名（monsterNameを優先、なければnameを使用）
      master.element || '', // 属性
      master.type || '', // 種類
      escapeCSVValue(charAccountName),
      escapeCSVValue(itemNames[0]),
      escapeCSVValue(itemNames[1]),
      escapeCSVValue(itemNames[2]),
    ].join(',');

    rows.push(row);
  });

  // BOM付きUTF-8として返す
  return '\uFEFF' + rows.join('\n');
};

/**
 * CSV文字列をBlobに変換してダウンロード
 */
export const downloadCSV = (csvContent: string, filename: string): void => {
  // BlobオブジェクトとしてCSVを作成
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // ダウンロードリンクを作成
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  // リンクをクリックしてダウンロード
  document.body.appendChild(link);
  link.click();

  // クリーンアップ
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
