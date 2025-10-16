# MS_DB_UI プロジェクト概要

## プロジェクト名
MS_DB_UI - キャラクター管理システム

## 目的
ゲームのキャラクターとアイテムを管理するWebアプリケーション

## 技術スタック

### フロントエンド
- **フレームワーク**: Vue 3 (Composition API with script setup)
- **言語**: TypeScript 5.9.3 + JavaScript（段階的移行完了）
- **状態管理**: Pinia 2.3.0
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
- vue-tsc 3.1.1

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
│   ├── stores/             # Pinia Store（状態管理）
│   │   ├── auth.ts         # 認証状態管理
│   │   ├── data.ts         # データ状態管理
│   │   ├── ui.ts           # UI状態管理
│   │   └── index.ts        # Store統合
│   ├── services/           # ビジネスロジック（TypeScript）
│   │   ├── auth.ts         # 認証サービス
│   │   └── database.ts     # データベースサービス
│   ├── utils/              # ユーティリティ関数（TypeScript）
│   │   ├── cache.ts        # キャッシュ管理
│   │   ├── performance.ts  # パフォーマンストラッキング
│   │   ├── formatters.ts   # データフォーマット
│   │   ├── lazyLoader.ts   # 遅延読み込み
│   │   └── itemMigration.ts # アイテムマイグレーション
│   ├── types/              # TypeScript型定義
│   │   ├── models.ts       # ドメインモデル型
│   │   ├── firebase.ts     # Firebase型
│   │   └── index.ts        # 型統合
│   ├── plugins/            # Vueプラグイン
│   │   └── vuetify.js      # Vuetify設定
│   ├── assets/             # 静的アセット
│   ├── App.vue             # ルートコンポーネント
│   ├── main.js             # エントリーポイント
│   └── firebase-init.js    # Firebase初期化
├── tests/                  # テストファイル
├── functions/              # Cloud Functions
├── dist/                   # ビルド成果物
└── temp/                   # 一時ファイル
```

## アーキテクチャの特徴

### Pinia Store による状態管理
- **props drilling を完全に排除**
- コンポーネントは直接Storeにアクセス
- 3つの責任分離されたStore:
  - `authStore`: 認証状態（ユーザー、ログイン状態）
  - `dataStore`: マスターデータと所持データ
  - `uiStore`: UI状態（選択中のタブ、アカウント、スナックバー）

### TypeScript移行完了
- Phase 1-3完了（基盤層、サービス層、ユーティリティ層）
- 全ての`.js`ファイルを`.ts`に移行完了
- **重要**: importパスには拡張子を付けない（Viteの自動解決に委ねる）
  - ✅ 正: `from "@/services/database"`
  - ❌ 誤: `from "@/services/database.ts"` または `.js`

### モジュール解決規則
- **静的import**: 拡張子なし
- **動的import**: 拡張子なし（`import("../firebase-init")`）
- Viteが自動的に`.ts`または`.js`を解決
- tsconfig.jsonで`"moduleResolution": "bundler"`を使用

## 主要機能

### 1. 認証機能
- Google OAuth認証
- 認証状態の管理（Pinia authStore）
- ログイン/ログアウト

### 2. キャラクター管理
- 所持キャラクター一覧表示
- 新規キャラクター追加
- キャラクターマスターデータの管理
- 所持数のカウント

### 3. アイテム管理
- キャラクターへのアイテム装備
- 実アイテム（最大3個）+ 仮想アイテム（最大3個）= 合計最大6個
- アイテムの移動
- 「外す予定」フラグ機能
- アイテムマスターデータの管理

### 4. チーム編成管理
- チーム編成の作成（4キャラクター）
- チーム編成の編集
- チーム編成の削除
- タイプ別フィルタリング（禁忌、天魔、星墓、轟絶、黎絶）

### 5. マスターデータ管理
- キャラクターマスターの追加/編集
- アイテムマスターの管理
- ガチャマスターの管理

## パフォーマンス最適化

### 実装済み
- Firebase初期化の遅延読み込み
- キャッシュ機構の実装（所持状況データ30分キャッシュ）
- パフォーマンストラッキング
- データ読み込みの最適化
- Pinia Storeによる効率的な状態管理

### 監視項目
- アプリ初期化時間
- データ読み込み時間
- メモリ使用量

## データ構造

### Firestore コレクション
- `accounts` - ユーザーアカウント情報
- `character_masters` - キャラクターマスターデータ
- `itemMasters` - アイテムマスターデータ
- `gachaMasters` - ガチャマスターデータ
- `accounts/{accountId}/owned_characters` - 所持キャラクターデータ（サブコレクション）
- `teams` - チーム編成データ

### アイテムデータ形式（新形式）
```typescript
interface ItemData {
  itemId: number;        // アイテムID
  isVirtual: boolean;    // 仮想アイテムフラグ
  willRemove?: boolean;  // 外す予定フラグ（実アイテムのみ）
}
```

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run type-check

# テスト実行
npm test

# テストカバレッジ
npm run test:coverage
```

## 環境設定
- `.env.local` - Firebase設定（Gitには含まれない）
- `.firebaserc` - Firebaseプロジェクト設定
- `firebase.json` - Firebase Hosting設定
- `tsconfig.json` - TypeScript設定
- `vite.config.js` - Vite設定

## 既知の注意点

### Import規則
- **すべてのimportで拡張子を省略する**
- 動的importでも拡張子なし: `import("../firebase-init")`
- これを守らないとViteのモジュール解決が失敗する

### ブラウザキャッシュ
- コードを大きく変更した後はハードリロード推奨（Ctrl+Shift+R）
- 開発サーバー再起動でViteキャッシュをクリア

## リポジトリ
- GitHub: https://github.com/Haruks-00/MS_DB_UI
- メインブランチ: main
