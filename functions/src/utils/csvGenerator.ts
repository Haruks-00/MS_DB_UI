import type {
  CharacterMaster,
  OwnedCharacterWithAccount,
} from "../types";

/**
 * CSV特殊文字をエスケープする
 * カンマ、ダブルクォート、改行を含む場合はダブルクォートで囲み、
 * ダブルクォート自体は2つ連続で表現する
 */
const escapeCSVValue = (value: string | number): string => {
  const strValue = String(value);

  // カンマ、ダブルクォート、改行を含む場合
  if (strValue.includes(",") || strValue.includes("\"") || strValue.includes("\n")) {
    // ダブルクォートを2つに
    const escaped = strValue.replace(/"/g, "\"\"");
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
  const escaped = value.replace(/"/g, "\"\"");
  // 常にダブルクォートで囲む
  return `"${escaped}"`;
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

  const numericId = typeof itemId === "string" ? parseInt(itemId, 10) : itemId;
  return itemMastersMap.get(numericId) || `アイテム${itemId}`;
};

/**
 * 所持キャラクターとマスターデータからCSV形式の文字列を生成
 * BOM付きUTF-8でエンコードされたCSVを返す
 *
 * @param characterMasters キャラクターマスターデータの配列
 * @param ownedCharacters 所持キャラクターデータの配列（アカウント情報付き）
 * @param itemMastersMap アイテムマスターデータのMap (optional)
 * @returns BOM付きUTF-8のCSV文字列
 */
export const generateCSV = (
  characterMasters: CharacterMaster[],
  ownedCharacters: OwnedCharacterWithAccount[],
  itemMastersMap?: Map<number, string>
): string => {
  // マスターデータをMapに変換して高速検索
  const masterMap = new Map<string, CharacterMaster>();
  characterMasters.forEach(master => {
    masterMap.set(master.id, master);
  });

  // CSV行を格納する配列
  const rows: string[] = [];

  // ヘッダー行
  rows.push("図鑑No,名前,属性,種類,アカウント,わくわく1,わくわく2,わくわく3");

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
      itemNames.push("");
    }

    // CSVの1行を構築
    const row = [
      master.indexNumber !== undefined ? master.indexNumber : "", // 図鑑No
      escapeNameField(master.monsterName || master.name), // モンスター名（常にダブルクォートで囲む）
      master.element || "", // 属性
      master.type || "", // 種類
      escapeCSVValue(ownedChar.accountName),
      escapeCSVValue(itemNames[0]),
      escapeCSVValue(itemNames[1]),
      escapeCSVValue(itemNames[2]),
    ].join(",");

    rows.push(row);
  });

  // BOM付きUTF-8として返す
  return "\uFEFF" + rows.join("\n");
};
