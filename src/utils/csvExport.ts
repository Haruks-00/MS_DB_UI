import type { CharacterMaster, OwnedCharacter } from '@/types';

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
 * 名前欄専用のエスケープ関数
 * 常にダブルクォートで囲み、内部のダブルクォートは2つ連続で表現する
 */
const escapeNameField = (value: string): string => {
  // ダブルクォートをエスケープ
  const escaped = value.replace(/"/g, '""');
  // 常にダブルクォートで囲む
  return `"${escaped}"`;
};

/**
 * アイテムIDから表示用の日本語文字列へのマッピング
 * CSV出力時に使用する
 */
const ITEM_ID_TO_DISPLAY_NAME: Map<number, string> = new Map([
  [1, '同族・加撃'],
  [2, '同族・加撃速'],
  [3, '同族・加命撃'],
  [4, '同族・加速'],
  [5, '同族・加命'],
  [6, '同族・加速命'],
  [7, '撃種・加撃'],
  [8, '撃種・加撃速'],
  [9, '撃種・加命撃'],
  [10, '撃種・加速'],
  [11, '撃種・加命'],
  [12, '撃種・加速命'],
  [13, '戦型・加撃'],
  [14, '戦型・加撃速'],
  [15, '戦型・加命撃'],
  [16, '戦型・加速'],
  [17, '戦型・加命'],
  [18, '戦型・加速命'],
  [19, '熱き友撃'],
  [20, 'ケガ減り'],
  [21, '将命削り'],
  [22, '兵命削り'],
  [23, '一撃失心'],
  [24, '速必殺'],
  [25, '毒がまん'],
  [26, 'ちび癒し'],
  [27, 'ハート'],
  [28, '学び'],
  [29, '荒稼ぎ'],
  [30, 'スピクリ'],
  [31, 'Sランク'],
  [32, 'スコア稼ぎ'],
]);

/**
 * アイテムIDからアイテム名を取得
 * CSV出力時は ITEM_ID_TO_DISPLAY_NAME のマッピングを優先する
 */
const getItemName = (
  itemId: number | string,
  itemMastersMap?: Map<number, string>
): string => {
  const numericId = typeof itemId === 'string' ? parseInt(itemId, 10) : itemId;

  // CSV出力用のマッピングがあればそれを使用
  const displayName = ITEM_ID_TO_DISPLAY_NAME.get(numericId);
  if (displayName) {
    return displayName;
  }

  // マッピングがない場合はitemMastersMapの値を使用
  if (!itemMastersMap) {
    return `アイテム${itemId}`;
  }

  return itemMastersMap.get(numericId) || `アイテム${itemId}`;
};

/**
 * アカウント名を短縮する
 * 「アカウント」で始まる場合は「アカウント」を削除して番号のみ返す
 * それ以外の場合はそのまま返す
 */
const shortenAccountName = (accountName: string): string => {
  // 「アカウント」で始まる場合は削除
  if (accountName.startsWith('アカウント')) {
    return accountName.substring(5); // 「アカウント」は5文字（ア・カ・ウ・ン・ト）
  }
  return accountName;
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

  // 所持キャラクターを図鑑番号順にソート
  const sortedOwnedCharacters = [...ownedCharacters].sort((a, b) => {
    const masterA = masterMap.get(a.characterMasterId);
    const masterB = masterMap.get(b.characterMasterId);

    // マスターデータが存在しない場合は後ろに回す
    if (!masterA) return 1;
    if (!masterB) return -1;

    // 図鑑番号でソート（undefinedの場合は最後に）
    const indexA = masterA.indexNumber ?? Number.MAX_SAFE_INTEGER;
    const indexB = masterB.indexNumber ?? Number.MAX_SAFE_INTEGER;

    return indexA - indexB;
  });

  // データ行
  sortedOwnedCharacters.forEach(ownedChar => {
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

    // アカウント名を取得（個別のaccountNameがあればそれを優先）し、短縮する
    const charAccountName = ownedChar.accountName || accountName;
    const shortenedAccountName = shortenAccountName(charAccountName);

    // CSVの1行を構築
    const row = [
      master.indexNumber !== undefined ? master.indexNumber : '', // 図鑑No
      escapeNameField(master.monsterName || master.name), // モンスター名（常にダブルクォートで囲む）
      master.element || '', // 属性
      master.type || '', // 種類
      escapeCSVValue(shortenedAccountName),
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
