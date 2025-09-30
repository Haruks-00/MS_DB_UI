# アーキテクチャ設計

## アプリケーションアーキテクチャ

### レイヤー構造

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (Vue Components - .vue files)      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│         Service Layer               │
│  (auth.js, database.js)             │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│         Data Layer                  │
│  (Firebase Firestore)               │
└─────────────────────────────────────┘
```

## コンポーネント設計

### 1. ルートコンポーネント (App.vue)
- **役割**: アプリケーション全体の状態管理
- **主要な責務**:
  - 認証状態の監視
  - 初期データの読み込み
  - タブナビゲーション制御
  - グローバルな状態管理

### 2. 機能別コンポーネント

#### 認証系 (components/auth/)
- `AuthStatus.vue` - 認証ステータス表示とログイン/ログアウトUI

#### キャラクター系 (components/characters/)
- `ViewAllCharactersTab.vue` - 全キャラクター一覧表示
- `AddOwnedCharacterTab.vue` - 所持キャラクター追加フォーム
- `AddMasterCharacterTab.vue` - マスターデータ追加フォーム
- `EditMasterCharacterTab.vue` - マスターデータ編集フォーム
- `ItemEditModal.vue` - アイテム編集モーダル

#### アイテム系 (components/items/)
- `ManageItemsTab.vue` - アイテム装備管理

#### チーム編成系 (components/teams/)
- `ManageTeamsTab.vue` - チーム編成管理画面
- `TeamForm.vue` - チーム編成フォーム
- `TeamList.vue` - チーム一覧表示

#### 共通系 (components/shared/)
- `AccountSelector.vue` - アカウント選択UI
- `CharacterSelector.vue` - キャラクター選択UI
- `CacheStatus.vue` - キャッシュ状態表示
- `CacheTest.vue` - キャッシュテスト用

## サービス層設計

### auth.js
```javascript
機能:
- loginWithGoogle() - Google OAuth認証
- logout() - ログアウト
- onAuthStateChanged(callback) - 認証状態監視
```

### database.js
```javascript
主要機能:
- loadAndProcessInitialData(userId) - 初期データ一括読み込み
  - ensureNewFormat()によるアイテムデータの自動マイグレーション
- updateCharacterItems(accountId, charId, items) - アイテム更新
- moveCharacterItems(accountId, from, to) - アイテム移動（バッチ処理）
- データのキャッシュ管理
- Firestoreとのデータ同期
```

### itemMigration.js (2025-06-30追加)
```javascript
主要機能:
- isOldFormat(items) - 旧形式（数値/文字列配列）の検出
- migrateToNewFormat(oldItems) - 旧形式から新形式への変換
- ensureNewFormat(items) - 自動マイグレーション
- getRealItems(items) - 実アイテムのみを抽出
- getVirtualItems(items) - 仮想アイテムのみを抽出

アイテムデータ形式:
- 旧形式: [1, 2, 3] または ["5", "10"] (数値/文字列配列)
- 新形式: [{ itemId: 1, isVirtual: false }, ...] (オブジェクト配列)
```

## 状態管理パターン

### リアクティブステート (App.vue)
- `user` - 認証ユーザー情報
- `accounts` - アカウント一覧
- `characterMasters` - キャラクターマスターデータ
- `itemMasters` - アイテムマスターデータ
- `gachaMasters` - ガチャマスターデータ
- `teams` - チーム編成データ
- `ownedCharactersData` - 所持キャラクターデータ (Map)
- `ownedCountMap` - 所持数カウント (Map)
- `characterMastersMap` - キャラクターマスターマップ (Map)
- `itemMastersMap` - アイテムマスターマップ (Map)

### データフロー
```
1. ユーザーログイン
   ↓
2. loadInitialData() 実行
   ↓
3. databaseService.loadAndProcessInitialData()
   ↓
4. Firestoreから複数コレクションを並行読み込み
   ↓
5. データ処理・Map生成
   - ensureNewFormat()でアイテムデータを自動マイグレーション
   - 旧形式（数値配列・文字列配列）→新形式（オブジェクト配列）
   ↓
6. リアクティブステートに反映
   ↓
7. 子コンポーネントへprops経由で配布
   ↓
8. コンポーネントでgetRealItems()を使用して実アイテムのみを処理
```

## データベース設計

### Firestore コレクション構造

```
users/{userId}/
  ├── accounts/{accountId}
  │     ├── id: string
  │     └── name: string
  │
  ├── teams/{teamId}
  │     ├── name: string
  │     ├── accountId: string
  │     ├── members: array
  │     └── createdAt: timestamp
  │
  └── accounts/{accountId}/
        └── ownedCharacters/{characterId}
              ├── characterMasterId: string
              ├── items: array
              └── addedAt: timestamp

Global Collections:
├── characterMasters/{masterId}
│     ├── name: string
│     ├── rarity: number
│     └── gachaId: string
│
├── itemMasters/{itemId}
│     ├── name: string
│     ├── type: string
│     └── stats: object
│
└── gachaMasters/{gachaId}
      ├── name: string
      └── characters: array
```

## パフォーマンス最適化戦略

### 1. データ読み込み最適化
- **並列読み込み**: Promise.all()で複数コレクションを同時取得
- **キャッシュ機構**: cache.js による読み込み済みデータの再利用
- **遅延初期化**: Firebase初期化を遅延させる

### 2. レンダリング最適化
- **v-window-item**: 各タブに一意のkey属性を設定
- **Computed Properties**: 頻繁な再計算を避ける
- **条件付きレンダリング**: v-if/v-showの適切な使い分け

### 3. メモリ管理
- **Map構造**: 高速なルックアップのためMapを使用
- **パフォーマンストラッキング**: performance.js で監視

## エラーハンドリング

### 認証エラー
```javascript
authService.loginWithGoogle()
  .catch(() => alert("ログインに失敗しました。"));
```

### データ読み込みエラー
```javascript
try {
  await loadInitialData();
} catch (e) {
  console.error("データ読み込みエラー:", e);
  alert(`データ読み込みエラー: ${e.message}`);
}
```

## セキュリティ

### Firebase セキュリティルール
- ユーザー認証必須
- 自分のデータのみアクセス可能
- マスターデータは読み取り専用

### 環境変数管理
- `.env.local` - Firebase認証情報（Git除外）
- `.gitignore` - 機密情報の保護

## デプロイメント

### Firebase Hosting
- ビルド成果物: `dist/`
- デプロイコマンド: `firebase deploy`
- 設定ファイル: `firebase.json`

### CI/CD
- GitHub Actions対応準備
- `.github/` ディレクトリ存在
