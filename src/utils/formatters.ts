import { getRealItems } from "./itemMigration";
import type { OwnedCharacter, CharacterMaster } from "@/types";

/**
 * [概要] 所持キャラクターの表示名をフォーマットする。
 * @param char - フォーマット対象の所持キャラクターオブジェクト
 * @param includeItems - アイテム情報を含めるか
 * @param characterMastersMap - キャラクターマスターのMap
 * @param ownedCharactersData - 全アカウントの所持キャラクターデータMap
 * @param itemMastersMap - アイテムマスターのMap
 * @param currentAccountId - 現在のアカウントID (charにaccountIdがない場合のフォールバック)
 * @returns フォーマットされた表示名
 */
export const formatOwnedCharDisplayName = (
  char: OwnedCharacter & { accountId?: string },
  includeItems: boolean,
  characterMastersMap: Map<string, CharacterMaster>,
  ownedCharactersData: Map<string, OwnedCharacter[]>,
  itemMastersMap: Map<number, string>,
  currentAccountId: string | null = null
): string => {
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
      .map((item) => itemMastersMap.get(item.itemId as number))
      .filter(Boolean)
      .join("、");

    // NOTE: itemNamesが空文字列でない場合のみ、角括弧付きで追加します
    if (itemNames) {
      text += `[${itemNames}]`;
    }
  }
  return text;
};
