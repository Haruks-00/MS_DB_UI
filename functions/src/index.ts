import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { executeFullBackup } from './backup/fullBackup';
import { executeIncrementalBackup } from './backup/incrementalBackup';
import { uploadToStorage, saveBackupHistory } from './storage/upload';
import { generateCSV } from './utils/csvGenerator';

// Firebase Admin SDK初期化
admin.initializeApp();

/**
 * 週次フルバックアップ（毎週月曜日0時に実行）
 * Cloud Schedulerから呼び出される想定
 */
export const weeklyFullBackup = functions
  .region('asia-northeast1') // 東京リージョン
  .pubsub.schedule('0 0 * * 1') // 毎週月曜0時（UTC）
  .timeZone('Asia/Tokyo')
  .onRun(async (context) => {
    console.log('Starting weekly full backup...');

    try {
      // フルバックアップ実行
      const metadata = await executeFullBackup();

      // CSV生成（再取得）
      const db = admin.firestore();
      const [accountsSnap, mastersSnap, itemsSnap, ownedCharsSnap] = await Promise.all([
        db.collection('accounts').get(),
        db.collection('character_masters').get(),
        db.collection('itemMasters').get(),
        db.collectionGroup('owned_characters').get(),
      ]);

      // データ変換
      const accountsMap = new Map<string, string>();
      accountsSnap.forEach(doc => {
        const data = doc.data();
        accountsMap.set(doc.id, data.Name || `アカウント${doc.id}`);
      });

      const characterMasters = mastersSnap.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      const itemMastersMap = new Map<number, string>();
      itemsSnap.forEach(doc => {
        const data = doc.data();
        itemMastersMap.set(Number(data.id), data.name);
      });

      const ownedCharacters: any[] = [];
      ownedCharsSnap.forEach(doc => {
        const data = doc.data();
        const accountId = doc.ref.parent.parent?.id;
        if (!accountId) return;

        ownedCharacters.push({
          ...data,
          id: doc.id,
          accountId,
          accountName: accountsMap.get(accountId) || `アカウント${accountId}`,
          characterMasterId: data.characterMasterId,
          items: data.items || [],
        });
      });

      // CSV生成
      const csvContent = generateCSV(characterMasters as any, ownedCharacters, itemMastersMap);

      // Cloud Storageにアップロード
      const fileUrl = await uploadToStorage(csvContent, metadata.filePath);
      console.log(`Full backup uploaded: ${fileUrl}`);

      // バックアップ履歴を保存
      await saveBackupHistory(metadata, 'success');

      return { success: true, recordCount: metadata.recordCount, fileUrl };
    } catch (error) {
      console.error('Weekly full backup failed:', error);

      // エラー履歴を保存
      await saveBackupHistory(
        {
          type: 'full',
          timestamp: new Date(),
          recordCount: 0,
          filePath: '',
        },
        'failed',
        error instanceof Error ? error.message : String(error)
      );

      throw error;
    }
  });

/**
 * 日次差分バックアップ（毎日0時に実行）
 * Cloud Schedulerから呼び出される想定
 */
export const dailyIncrementalBackup = functions
  .region('asia-northeast1') // 東京リージョン
  .pubsub.schedule('0 0 * * *') // 毎日0時（UTC）
  .timeZone('Asia/Tokyo')
  .onRun(async (context) => {
    console.log('Starting daily incremental backup...');

    try {
      // 差分バックアップ実行
      const metadata = await executeIncrementalBackup();

      // 変更がない場合はスキップ
      if (metadata.recordCount === 0) {
        console.log('No changes detected, skipping upload');
        await saveBackupHistory(metadata, 'success');
        return { success: true, recordCount: 0, message: 'No changes' };
      }

      // CSV生成（再取得）
      const db = admin.firestore();
      const lastBackupTime = new Date();
      lastBackupTime.setDate(lastBackupTime.getDate() - 1);

      const [accountsSnap, mastersSnap, itemsSnap, ownedCharsSnap] = await Promise.all([
        db.collection('accounts').get(),
        db.collection('character_masters').get(),
        db.collection('itemMasters').get(),
        db.collectionGroup('owned_characters')
          .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(lastBackupTime))
          .get(),
      ]);

      // データ変換
      const accountsMap = new Map<string, string>();
      accountsSnap.forEach(doc => {
        const data = doc.data();
        accountsMap.set(doc.id, data.Name || `アカウント${doc.id}`);
      });

      const characterMasters = mastersSnap.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      const itemMastersMap = new Map<number, string>();
      itemsSnap.forEach(doc => {
        const data = doc.data();
        itemMastersMap.set(Number(data.id), data.name);
      });

      const ownedCharacters: any[] = [];
      ownedCharsSnap.forEach(doc => {
        const data = doc.data();
        const accountId = doc.ref.parent.parent?.id;
        if (!accountId) return;

        ownedCharacters.push({
          ...data,
          id: doc.id,
          accountId,
          accountName: accountsMap.get(accountId) || `アカウント${accountId}`,
          characterMasterId: data.characterMasterId,
          items: data.items || [],
        });
      });

      // CSV生成
      const csvContent = generateCSV(characterMasters as any, ownedCharacters, itemMastersMap);

      // Cloud Storageにアップロード
      const fileUrl = await uploadToStorage(csvContent, metadata.filePath);
      console.log(`Incremental backup uploaded: ${fileUrl}`);

      // バックアップ履歴を保存
      await saveBackupHistory(metadata, 'success');

      return { success: true, recordCount: metadata.recordCount, fileUrl };
    } catch (error) {
      console.error('Daily incremental backup failed:', error);

      // エラー履歴を保存
      await saveBackupHistory(
        {
          type: 'incremental',
          timestamp: new Date(),
          recordCount: 0,
          filePath: '',
        },
        'failed',
        error instanceof Error ? error.message : String(error)
      );

      throw error;
    }
  });
