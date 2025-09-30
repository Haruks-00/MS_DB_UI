# MS_DB_UI プロジェクト概要

## プロジェクト名
MS_DB_UI - キャラクター管理システム

## 目的
ゲームのキャラクターとアイテムを管理するWebアプリケーション

## 技術スタック

### フロントエンド
- **フレームワーク**: Vue 3 (Composition API with script setup)
- **UIライブラリ**: Vuetify 3.9.4
- **アイコン**: Material Design Icons (@mdi/font)
- **ビルドツール**: Vite 5.4.19
- **テストフレームワーク**: Vitest 3.2.4

### バックエンド
- **Firebase 9.6.1**
  - Authentication (Google認証)
  - Firestore (データベース)
  - Cloud Functions

### 開発ツール
- @vue/test-utils 2.4.6
- jsdom 26.1.0
- terser 5.43.1

## プロジェクト構造

```
MS_DB_UI/
├── src/
│   ├── components/          # Vueコンポーネント
│   │   ├── auth/           # 認証関連コンポーネント
│   │   ├── characters/     # キャラクター管理コンポーネント
│   │   ├── items/          # アイテム管理コンポーネント
│   │   ├── teams/          # チーム編成コンポーネント
│   │   └── shared/         # 共通コンポーネント
│   ├── services/           # ビジネスロジック
│   │   ├── auth.js        # 認証サービス
│   │   └── database.js    # データベースサービス
│   ├── utils/             # ユーティリティ関数
│   │   ├── cache.js       # キャッシュ管理
│   │   ├── performance.js # パフォーマンストラッキング
│   │   ├── formatters.js  # データフォーマット
│   │   ├── lazyLoader.js  # 遅延読み込み
│   │   └── itemMigration.js # アイテムマイグレーション
│   ├── plugins/           # Vueプラグイン
│   │   └── vuetify.js    # Vuetify設定
│   ├── assets/           # 静的アセット
│   ├── App.vue           # ルートコンポーネント
│   └── main.js           # エントリーポイント
├── tests/                # テストファイル
├── functions/            # Cloud Functions
├── dist/                 # ビルド成果物
└── temp/                 # 一時ファイル

## 主要機能

### 1. 認証機能
- Google OAuth認証
- 認証状態の管理
- ログイン/ログアウト

### 2. キャラクター管理
- 所持キャラクター一覧表示
- 新規キャラクター追加
- キャラクターマスターデータの管理
- 所持数のカウント

### 3. アイテム管理
- キャラクターへのアイテム装備
- アイテムの移動
- アイテムマスターデータの管理

### 4. チーム編成管理
- チーム編成の作成
- チーム編成の編集
- チーム編成の削除

### 5. マスターデータ管理
- キャラクターマスターの追加/編集
- アイテムマスターの管理
- ガチャマスターの管理

## パフォーマンス最適化

### 実装済み
- Firebase初期化の遅延読み込み
- キャッシュ機構の実装
- パフォーマンストラッキング
- データ読み込みの最適化

### 監視項目
- アプリ初期化時間
- データ読み込み時間
- メモリ使用量

## データ構造

### Firestore コレクション
- `accounts` - ユーザーアカウント情報
- `characterMasters` - キャラクターマスターデータ
- `itemMasters` - アイテムマスターデータ
- `gachaMasters` - ガチャマスターデータ
- `ownedCharacters` - 所持キャラクターデータ
- `teams` - チーム編成データ

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# テスト実行
npm test
```

## 環境設定
- `.env.local` - Firebase設定（Gitには含まれない）
- `.firebaserc` - Firebaseプロジェクト設定
- `firebase.json` - Firebase Hosting設定

## リポジトリ
- GitHub: https://github.com/Haruks-00/MS_DB_UI
