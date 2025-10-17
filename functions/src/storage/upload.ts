import * as admin from 'firebase-admin';
import type { BackupMetadata } from '../types';

/**
 * CSVをCloud Storageにアップロードする
 *
 * @param csvContent CSV文字列
 * @param filePath ファイルパス (例: backups/full/2025-10-17_full_backup.csv)
 * @returns アップロード成功したファイルのURL
 */
export async function uploadToStorage(
  csvContent: string,
  filePath: string
): Promise<string> {
  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);

    // CSVをアップロード
    await file.save(csvContent, {
      metadata: {
        contentType: 'text/csv;charset=utf-8',
        metadata: {
          uploadedAt: new Date().toISOString(),
        },
      },
    });

    console.log(`File uploaded successfully: ${filePath}`);

    // 署名付きURLを生成（7日間有効）
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7日後
    });

    return url;
  } catch (error) {
    console.error('Failed to upload to Cloud Storage:', error);
    throw error;
  }
}

/**
 * バックアップ履歴をFirestoreに保存する
 *
 * @param metadata バックアップメタデータ
 * @param status バックアップステータス
 * @param errorMessage エラーメッセージ（オプショナル）
 */
export async function saveBackupHistory(
  metadata: BackupMetadata,
  status: 'success' | 'failed',
  errorMessage?: string
): Promise<void> {
  try {
    const db = admin.firestore();
    const backupHistoryRef = db.collection('backup_history');

    await backupHistoryRef.add({
      type: metadata.type,
      startTime: metadata.timestamp,
      endTime: new Date(),
      recordCount: metadata.recordCount,
      status,
      errorMessage: errorMessage || null,
      filePath: metadata.filePath,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Backup history saved: ${metadata.type} - ${status}`);
  } catch (error) {
    console.error('Failed to save backup history:', error);
    // 履歴保存失敗はバックアップ失敗とはみなさない
  }
}
