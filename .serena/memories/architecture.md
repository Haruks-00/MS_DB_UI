# アーキテクチャ設計

## アプリケーションアーキテクチャ

### レイヤー構造

```
┌─────────────────────────────────────┐
│      Presentation Layer             │
│  (Vue Components - .vue files)      │
│  ↕ Pinia Stores (状態管理)          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│         Service Layer               │
│  (auth.ts, database.ts)             │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│         Data Layer                  │
│  (Firebase Firestore)               │
└─────────────────────────────────────┘
```

## Pinia Store アーキテクチャ

### Store構成

```
Pinia Stores
├── authStore (src/stores/auth.ts)
│   ├── State
│   │   ├── user: User | null
│   │   └── isAuthReady: boolean
│   ├── Getters
│   │   └── isAuthenticated
│   └── Actions
│       ├── login()
│       ├── logout()
│       └── initAuth()
│
├── dataStore (src/stores/data.ts)
│   ├── State
│   │   ├── dataLoaded: boolean
│   │   ├── accounts: Account[]
│   │   ├── characterMasters: CharacterMaster[]
│   │   ├── itemMasters: ItemMaster[]
│   │   ├── gachaMasters: GachaMaster[]
│   │   ├── teams: Team[]
│   │   ├── ownedCharactersData: Map<string, OwnedCharacter[]>
│   │   ├── ownedCountMap: Map<string, number>
│   │   ├── characterMastersMap: Map<string, CharacterMaster>
│   │   └── itemMastersMap: Map<number, string>
│   ├── Getters
│   │   └── (各種データアクセサ)
│   └── Actions
│       ├── loadInitialData()
│       ├── addCharacter()
│       ├── updateItems()
│       └── (その他CRUD操作)
│
└── uiStore (src/stores/ui.ts)
    ├── State
    │   ├── activeTab: string
    │   ├── selectedAccountId: string | null
    │   ├── loading: boolean
    │   ├── snackbar: { show, message, color }
    │   └── pinnedCharacterIds: number[]  ← 2025/10/19追加
    ├── Getters
    │   ├── isSnackbarVisible
    │   ├── isLoading
    │   └── hasSelectedAccount
    └── Actions
        ├── setActiveTab()
        ├── setSelectedAccountId()
        ├── showSnackbar() / showSuccess() / showError()
        ├── togglePinnedCharacter()  ← 2025/10/19追加
        ├── isPinned()               ← 2025/10/19追加
        ├── clearPinnedCharacters()  ← 2025/10/19追加
        └── resetUI()
```

### Store間の依存関係

```
authStore (認証) → dataStore (データ読み込み) → uiStore (UI状態)
     ↓                    ↓                        ↓
  ユーザー情報      マスターデータ           表示制御
                  所持データ              ピン留め状態
```

## コンポーネント設計

### 1. ルートコンポーネント (App.vue)
- **役割**: アプリケーション全体のコーディネーター
- **主要な責務**:
  - 認証状態の監視（authStore経由）
  - 初期データの読み込み（dataStore経由）
  - タブナビゲーション制御（uiStore経由）
  - グローバルな状態管理

### 2. 機能別コンポーネント

#### 認証系 (components/auth/)
- `AuthStatus.vue` - 認証ステータス表示とログイン/ログアウトUI

#### キャラクター系 (components/characters/)
- `ViewAllCharactersTab.vue` - 全キャラクター一覧表示（**ピン留め機能含む**）
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

### auth.ts
```typescript
機能:
- loginWithGoogle() - Google OAuth認証
- logout() - ログアウト
- onAuthStateChanged(callback) - 認証状態監視
```

### database.ts
```typescript
主要機能:
- loadAndProcessInitialData(userId) - 初期データ一括読み込み
  - ensureNewFormat()によるアイテムデータの自動マイグレーション
- updateCharacterItems(accountId, charId, items) - アイテム更新
- moveCharacterItems(accountId, from, to) - アイテム移動（バッチ処理）
- データのキャッシュ管理
- Firestoreとのデータ同期
```

### itemMigration.ts
```typescript
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

### Pinia Store中心のアーキテクチャ

```
┌──────────────────────────────────────────┐
│          Vue Components                  │
│  (props drilling なし)                   │
└──────────────────────────────────────────┘
           ↓ ↑ (直接アクセス)
┌──────────────────────────────────────────┐
│          Pinia Stores                    │
│  ├── authStore                           │
│  ├── dataStore                           │
│  └── uiStore (ピン留め状態含む)          │
└──────────────────────────────────────────┘
           ↓ ↑
┌──────────────────────────────────────────┐
│          Services Layer                  │
│  (auth.ts, database.ts)                  │
└──────────────────────────────────────────┘
           ↓ ↑
┌──────────────────────────────────────────┐
│          Firebase Firestore              │
└──────────────────────────────────────────┘
```

### データフロー（Pinia Store経由）

```
1. ユーザーログイン
   ↓ authStore.login()
2. authStore.user が更新される
   ↓ watch(authStore.user)
3. dataStore.loadInitialData() 実行
   ↓ databaseService経由でFirestore読み込み
4. ensureNewFormat()でアイテムデータ自動マイグレーション
   ↓
5. dataStoreのstate更新
   ↓ リアクティブに反映
6. コンポーネントがdataStoreから直接データ取得
   ↓ computed(() => dataStore.characterMasters)
7. uiStoreでピン留め状態を管理
   ↓ uiStore.togglePinnedCharacter(masterId)
8. 画面更新（Vue Reactivity System）
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
- **キャッシュ機構**: cache.ts による読み込み済みデータの再利用
- **遅延初期化**: Firebase初期化を遅延させる
- **Pinia Store**: 中央集権的なキャッシュとして機能

### 2. レンダリング最適化
- **v-window-item**: 各タブに一意のkey属性を設定
- **Computed Properties**: 頻繁な再計算を避ける（Pinia Storeのgetters活用）
- **条件付きレンダリング**: v-if/v-showの適切な使い分け
- **仮想スクロール**: v-data-table-virtualで大量データ表示

### 3. メモリ管理
- **Map構造**: 高速なルックアップのためMapを使用（dataStore内）
- **パフォーマンストラッキング**: performance.ts で監視
- **セッションストレージ**: ピン留め状態はPinia（メモリ内）のみ

## ピン留め機能のアーキテクチャ（2025年10月19日追加）

### 実装概要
- **Store**: uiStore.pinnedCharacterIds (number[])
- **コンポーネント**: ViewAllCharactersTab.vue
- **スタイル**: position: sticky + 動的top計算

### データフロー
```
1. ユーザーがピンアイコンをクリック
   ↓
2. uiStore.togglePinnedCharacter(masterId)
   ↓ リアクティブにstate更新
3. computed pinnedItems / unpinnedItems が再計算
   ↓
4. displayItems = [...pinnedItems, ...unpinnedItems]
   ↓
5. テーブル再描画（ピン留め行が先頭に）
   ↓
6. getItemClass()でピン留め行に'pinned-row'クラス付与
   ↓
7. CSS (position: sticky) で固定表示
```

### テスト戦略
- **TDD（テスト駆動開発）**: tests/stores/ui.spec.ts
- 7つのテストケースで完全カバー
- Vitestで自動テスト

## エラーハンドリング

### 認証エラー
```typescript
authStore.login()
  .catch(() => uiStore.showError("ログインに失敗しました。"));
```

### データ読み込みエラー
```typescript
try {
  await dataStore.loadInitialData();
} catch (e) {
  console.error("データ読み込みエラー:", e);
  uiStore.showError(`データ読み込みエラー: ${e.message}`);
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
