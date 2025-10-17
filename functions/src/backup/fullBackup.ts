import * as admin from "firebase-admin";
import type {
  CharacterMaster,
  OwnedCharacterWithAccount,
  ItemMaster,
  BackupMetadata,
} from "../types";

/**
 * Firestoreから全データを取得する
 */
async function fetchAllData(db: admin.firestore.Firestore) {
  // 並列でデータ取得
  const [
    accountsSnapshot,
    characterMastersSnapshot,
    itemMastersSnapshot,
    ownedCharactersSnapshot,
  ] = await Promise.all([
    db.collection("accounts").get(),
    db.collection("character_masters").get(),
    db.collection("itemMasters").get(),
    db.collectionGroup("owned_characters").get(),
  ]);

  return {
    accountsSnapshot,
    characterMastersSnapshot,
    itemMastersSnapshot,
    ownedCharactersSnapshot,
  };
}

/**
 * スナップショットからデータを変換
 */
function transformData(snapshots: {
  accountsSnapshot: admin.firestore.QuerySnapshot;
  characterMastersSnapshot: admin.firestore.QuerySnapshot;
  itemMastersSnapshot: admin.firestore.QuerySnapshot;
  ownedCharactersSnapshot: admin.firestore.QuerySnapshot;
}) {
  const {
    accountsSnapshot,
    characterMastersSnapshot,
    itemMastersSnapshot,
    ownedCharactersSnapshot,
  } = snapshots;

  // アカウントデータのMap作成
  const accountsMap = new Map<string, string>();
  accountsSnapshot.forEach(doc => {
    const data = doc.data();
    accountsMap.set(doc.id, data.Name || `アカウント${doc.id}`);
  });

  // キャラクターマスターデータ
  const characterMasters: CharacterMaster[] = characterMastersSnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  } as CharacterMaster));

  // アイテムマスターデータ
  const itemMasters: ItemMaster[] = itemMastersSnapshot.docs.map(doc => ({
    ...doc.data(),
    id: Number(doc.data().id),
  } as ItemMaster));

  const itemMastersMap = new Map<number, string>(
    itemMasters.map(item => [item.id, item.name])
  );

  // 所持キャラクターデータ（アカウント情報付き）
  const ownedCharacters: OwnedCharacterWithAccount[] = [];
  ownedCharactersSnapshot.forEach(doc => {
    const data = doc.data();
    const accountId = doc.ref.parent.parent?.id;
    if (!accountId) return;

    const accountName = accountsMap.get(accountId) || `アカウント${accountId}`;

    ownedCharacters.push({
      ...data,
      id: doc.id,
      accountId,
      accountName,
      characterMasterId: data.characterMasterId,
      items: data.items || [],
    } as OwnedCharacterWithAccount);
  });

  return {
    characterMasters,
    itemMastersMap,
    ownedCharacters,
  };
}

/**
 * フルバックアップを実行する
 *
 * @returns バックアップメタデータ
 */
export async function executeFullBackup(): Promise<BackupMetadata> {
  const startTime = new Date();

  try {
    const db = admin.firestore();

    // 全データ取得
    console.log("Fetching all data from Firestore...");
    const snapshots = await fetchAllData(db);

    // データ変換
    console.log("Transforming data...");
    const { ownedCharacters } = transformData(snapshots);

    const fileName = `${startTime.toISOString().split("T")[0]}_full_backup.csv`;

    console.log(`Full backup completed: ${ownedCharacters.length} records`);

    return {
      type: "full",
      timestamp: startTime,
      recordCount: ownedCharacters.length,
      filePath: `backups/full/${fileName}`,
    };
  } catch (error) {
    console.error("Full backup failed:", error);
    throw error;
  }
}
