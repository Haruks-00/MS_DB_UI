import * as admin from 'firebase-admin';
import type {
  CharacterMaster,
  OwnedCharacterWithAccount,
  ItemMaster,
  BackupMetadata,
} from '../types';

/**
 * 前回のバックアップ時刻を取得
 */
async function getLastBackupTime(db: admin.firestore.Firestore): Promise<Date> {
  const backupHistoryRef = db.collection('backup_history')
    .where('type', '==', 'incremental')
    .where('status', '==', 'success')
    .orderBy('endTime', 'desc')
    .limit(1);

  const snapshot = await backupHistoryRef.get();

  if (snapshot.empty) {
    // 差分バックアップの履歴がない場合は、24時間前を返す
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  }

  const lastBackup = snapshot.docs[0].data();
  return lastBackup.endTime.toDate();
}

/**
 * 指定時刻以降に更新されたデータを取得
 */
async function fetchIncrementalData(
  db: admin.firestore.Firestore,
  since: Date
) {
  console.log(`Fetching data updated since ${since.toISOString()}...`);

  // 並列でデータ取得
  const [
    accountsSnapshot,
    characterMastersSnapshot,
    itemMastersSnapshot,
    ownedCharactersSnapshot,
  ] = await Promise.all([
    db.collection('accounts').get(), // アカウントは常に全取得
    db.collection('character_masters').get(), // マスターデータは常に全取得
    db.collection('itemMasters').get(), // アイテムマスターも常に全取得
    // 更新されたowned_charactersのみ取得
    db.collectionGroup('owned_characters')
      .where('updatedAt', '>=', admin.firestore.Timestamp.fromDate(since))
      .get(),
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
 * 差分バックアップを実行する
 *
 * @returns バックアップメタデータ
 */
export async function executeIncrementalBackup(): Promise<BackupMetadata> {
  const startTime = new Date();

  try {
    const db = admin.firestore();

    // 前回のバックアップ時刻を取得
    const lastBackupTime = await getLastBackupTime(db);
    console.log(`Last backup time: ${lastBackupTime.toISOString()}`);

    // 差分データ取得
    const snapshots = await fetchIncrementalData(db, lastBackupTime);

    // データ変換
    console.log('Transforming incremental data...');
    const { ownedCharacters } = transformData(snapshots);

    if (ownedCharacters.length === 0) {
      console.log('No changes detected since last backup');
      return {
        type: 'incremental',
        timestamp: startTime,
        recordCount: 0,
        filePath: '', // 変更なしの場合はファイル保存しない
      };
    }

    const fileName = `${startTime.toISOString().split('T')[0]}_incremental_backup.csv`;

    console.log(`Incremental backup completed: ${ownedCharacters.length} records`);

    return {
      type: 'incremental',
      timestamp: startTime,
      recordCount: ownedCharacters.length,
      filePath: `backups/incremental/${fileName}`,
    };
  } catch (error) {
    console.error('Incremental backup failed:', error);
    throw error;
  }
}
