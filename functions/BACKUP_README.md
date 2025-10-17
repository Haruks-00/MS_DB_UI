# 自動バックアップシステム

Firebase Cloud FunctionsとCloud Storageを使用した、週次フルバックアップと日次差分バックアップのシステムです。

## 機能概要

### 週次フルバックアップ
- **実行タイミング**: 毎週月曜日 0時（日本時間）
- **対象データ**: 全ての所持キャラクター情報
- **保存先**: `gs://[your-bucket]/backups/full/YYYY-MM-DD_full_backup.csv`
- **Cloud Function**: `weeklyFullBackup`

### 日次差分バックアップ
- **実行タイミング**: 毎日 0時（日本時間）
- **対象データ**: 前日以降に新規追加された所持キャラクター情報（createdAtベース）
- **保存先**: `gs://[your-bucket]/backups/incremental/YYYY-MM-DD_incremental_backup.csv`
- **Cloud Function**: `dailyIncrementalBackup`
- **注意**: アイテム変更などの更新は含まれません

## アーキテクチャ

```
functions/src/
├── types/
│   └── index.ts              # 型定義
├── utils/
│   └── csvGenerator.ts       # CSV生成ロジック
├── backup/
│   ├── fullBackup.ts         # フルバックアップ実装
│   └── incrementalBackup.ts  # 差分バックアップ実装
├── storage/
│   └── upload.ts             # Cloud Storage連携
└── index.ts                  # Cloud Functionsエントリーポイント
```

## セットアップ手順

### 1. Firebase Projectの設定確認

```bash
firebase projects:list
firebase use [your-project-id]
```

### 2. Cloud Storageバケットの確認

**推奨方法: Firebase Console（最も簡単）**

1. ブラウザで以下のURLを開く:
   ```
   https://console.firebase.google.com/project/[your-project-id]/storage
   ```

2. Cloud Storageが有効化されていない場合は「使ってみる」ボタンをクリック

3. デフォルトバケット名を確認（通常 `[your-project-id].appspot.com`）

**代替方法: gcloud CLI（上級者向け）**

gcloud CLIを使用する場合は、事前にプロジェクト設定が必要です:

```bash
# 1. gcloud CLIの初期化（初回のみ）
gcloud init

# 2. プロジェクトIDを設定
gcloud config set project [your-project-id]

# 3. 設定確認
gcloud config get-value project

# 4. バケット一覧を表示
gsutil ls
```

### 3. Firestoreのインデックス作成

差分バックアップで使用するクエリのために、以下のインデックスを作成してください:

**コレクショングループ**: `owned_characters`
- フィールド: `createdAt` (昇順)

**作成方法**:

1. Firebase Consoleから作成（推奨）:
   ```
   https://console.firebase.google.com/project/[your-project-id]/firestore/indexes
   ```
   - 「インデックスを作成」をクリック
   - コレクションID: `owned_characters`
   - **コレクショングループ**: ✅ チェック
   - フィールドパス: `createdAt`
   - 順序: `昇順`

2. または、初回実行時のエラーURLから自動作成（最も簡単）

### 4. 前提条件の確認

既存の `owned_characters` ドキュメントに `createdAt` フィールドが存在することを確認してください。

**注意**: 本システムでは `createdAt` フィールドを使用するため、**差分バックアップは新規追加されたキャラクターのみが対象**となります。アイテム変更などの更新は週次フルバックアップでのみ記録されます。

`createdAt` フィールドが存在しない場合は、キャラクター追加時に自動的に設定されるようフロントエンドコードを確認してください。

### 5. デプロイ

```bash
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions
```

## デプロイされるCloud Functions

デプロイ後、以下の2つのCloud Functionsが作成されます:

1. **weeklyFullBackup**
   - リージョン: asia-northeast1 (東京)
   - トリガー: Pub/Sub (スケジュール: 毎週月曜0時)

2. **dailyIncrementalBackup**
   - リージョン: asia-northeast1 (東京)
   - トリガー: Pub/Sub (スケジュール: 毎日0時)

## 手動実行

Firebase Consoleから手動でCloud Functionsを実行できます:

1. Firebase Console → Functions
2. 実行したいFunctionを選択
3. 「テスト」タブから実行

または、Firebase CLIを使用:

```bash
# フルバックアップを手動実行
firebase functions:shell
> weeklyFullBackup()

# 差分バックアップを手動実行
> dailyIncrementalBackup()
```

## バックアップ履歴の確認

バックアップの実行履歴は、Firestoreの `backup_history` コレクションに保存されます:

```javascript
// Firestore構造
backup_history/
  {documentId}/
    - type: 'full' | 'incremental'
    - startTime: Timestamp
    - endTime: Timestamp
    - recordCount: number
    - status: 'success' | 'failed'
    - errorMessage: string | null
    - filePath: string
    - createdAt: Timestamp
```

## CSV形式

エクスポートされるCSVは以下の形式です:

```csv
図鑑No,名前,属性,種類,アカウント,わくわく1,わくわく2,わくわく3
191,"アグナムート",火,限定,テストアカウント,攻撃力アップ,,,
```

- BOM付きUTF-8エンコード
- 名前は常にダブルクォートで囲む
- 図鑑番号順にソート

## Cloud Storageのファイル保持期間設定（オプション）

古いバックアップファイルを自動削除するには、Cloud Storageのライフサイクルルールを設定します:

```bash
# ライフサイクル設定ファイルを作成
cat > lifecycle.json << 'EOF'
{
  "lifecycle": {
    "rule": [
      {
        "action": {"type": "Delete"},
        "condition": {
          "age": 90,
          "matchesPrefix": ["backups/incremental/"]
        }
      },
      {
        "action": {"type": "Delete"},
        "condition": {
          "age": 365,
          "matchesPrefix": ["backups/full/"]
        }
      }
    ]
  }
}
EOF

# ライフサイクルルールを適用
gsutil lifecycle set lifecycle.json gs://[your-bucket-name]
```

この設定により:
- 差分バックアップは90日後に削除
- フルバックアップは365日後に削除

## トラブルシューティング

### デプロイエラー: "Cloud Scheduler API has not been used"

Cloud Scheduler APIを有効化:
```bash
gcloud services enable cloudscheduler.googleapis.com --project=[your-project-id]
```

### エラー: "Missing or insufficient permissions"

Cloud Functionsのサービスアカウントに必要な権限を付与:
- Cloud Datastore User
- Storage Object Admin

```bash
gcloud projects add-iam-policy-binding [your-project-id] \
  --member="serviceAccount:[your-project-id]@appspot.gserviceaccount.com" \
  --role="roles/datastore.user"

gcloud projects add-iam-policy-binding [your-project-id] \
  --member="serviceAccount:[your-project-id]@appspot.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"
```

### エラー: "gsutil: command requires a project id"

`gsutil ls` コマンドでプロジェクトIDが設定されていないエラーが出る場合:

```bash
# プロジェクトIDを設定
gcloud config set project [your-project-id]

# 設定確認
gcloud config get-value project

# 再度実行
gsutil ls
```

または、Firebase Consoleから確認することを推奨します（セットアップ手順2を参照）。

### バックアップが空になる（差分バックアップの場合）

以下の可能性があります:

1. `createdAt` フィールドが既存のドキュメントに存在しない
2. 前回バックアップ以降に新規追加されたキャラクターがない（正常動作）
3. インデックスが正しく作成されていない

セットアップ手順3と4を確認してください。

## ログの確認

```bash
# 直近のログを確認
firebase functions:log

# 特定のFunctionのログのみ表示
firebase functions:log --only weeklyFullBackup
firebase functions:log --only dailyIncrementalBackup
```

## コスト見積もり

### Cloud Functions
- 実行回数: 週1回（フル）+ 日7回（差分）= 月35回程度
- 実行時間: 1回あたり10-60秒程度
- **推定コスト**: ほぼ無料（無料枠内）

### Cloud Storage
- 保存データ: 1ファイル約100KB - 1MB
- 月間ファイル数: フル4個 + 差分30個 = 約34個
- **推定コスト**: $0.02/月以下

### Firestore読み取り
- フルバックアップ: 全ドキュメント読み取り
- 差分バックアップ: 変更分のみ
- **推定コスト**: 無料枠内で収まる可能性が高い

## 今後の拡張案

- [ ] Slackやメールでバックアップ完了通知
- [ ] バックアップファイルの自動リストア機能
- [ ] Web UIからのバックアップ管理画面
- [ ] 圧縮形式（ZIP）での保存
- [ ] 複数リージョンへのバックアップ
