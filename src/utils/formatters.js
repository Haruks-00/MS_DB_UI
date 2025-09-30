import { getRealItems } from "./itemMigration.js";

/**
 * [概要] 所持キャラクターの表示名をフォーマットする。
 * @param {Object} char - フォーマット対象の所持キャラクターオブジェクト
 * @param {boolean} includeItems - アイテム情報を含めるか
 * @param {Map<string, Object>} characterMastersMap - キャラクターマスターのMap
 * @param {Map<string, Array<Object>>} ownedCharactersData - 全アカウントの所持キャラクターデータMap
 * @param {Map<number, string>} itemMastersMap - アイテムマスターのMap
 * @param {string | null} [currentAccountId=null] - 現在のアカウントID (charにaccountIdがない場合のフォールバック)
 * @returns {string} フォーマットされた表示名
 */
export const formatOwnedCharDisplayName = (
  char,
  includeItems,
  characterMastersMap,
  ownedCharactersData,
  itemMastersMap,
  currentAccountId = null
) => {
  if (!char) return "キャラクター情報なし";

  const master = characterMastersMap.get(char.characterMasterId);
  const charName = master ? master.monsterName : "不明";

  // INFO: キャラクターオブジェクトにaccountIdがない場合、引数で渡されたものをフォールバックとして使用
  const targetAccountId = char.accountId || currentAccountId;
  if (!targetAccountId) {
    return `${charName} (アカウント不明)`;
  }

  const sameMasterChars = (
    ownedCharactersData.get(targetAccountId) || []
  ).filter((c) => c.characterMasterId === char.characterMasterId);
  const charIndex = sameMasterChars.findIndex((c) => c.id === char.id);
  let text = `${charName} (${charIndex >= 0 ? charIndex + 1 : "？"}体目)`;

  if (includeItems) {
    // 新形式に変換して実アイテムのみを取得
    const realItems = getRealItems(char.items || []);
    const itemNames = realItems
      .map((item) => itemMastersMap.get(item.itemId))
      .filter(Boolean)
      .join("、");

    // NOTE: itemNamesが空文字列でない場合のみ、角括弧付きで追加します
    if (itemNames) {
      text += `[${itemNames}]`;
    }
  }
  return text;
};
