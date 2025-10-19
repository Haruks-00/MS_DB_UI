# コンポーネントガイド

## コンポーネント一覧

### ルートコンポーネント

#### App.vue
**場所**: `src/App.vue`
**役割**: アプリケーションのルートコンポーネント

**主要機能**:
- 認証状態の管理
- タブナビゲーション
- 初期データの読み込みとグローバル状態管理
- アカウント選択機能

**主要なState**:
```javascript
user: ref(null)                        // 認証ユーザー
accounts: ref([])                      // アカウント一覧
characterMasters: ref([])              // キャラクターマスター
itemMasters: ref([])                   // アイテムマスター
gachaMasters: ref([])                  // ガチャマスター
teams: ref([])                         // チーム編成
ownedCharactersData: ref(new Map())    // 所持キャラクターデータ
ownedCountMap: ref(new Map())          // 所持数マップ
characterMastersMap: ref(new Map())    // キャラクターマスターマップ
itemMastersMap: ref(new Map())         // アイテムマスターマップ
activeTab: ref("view-all")             // アクティブなタブ
selectedAccountId: ref(null)           // 選択中のアカウントID
```

**主要なメソッド**:
- `loadInitialData()` - 初期データの読み込み
- `handleLogin()` - ログイン処理
- `handleLogout()` - ログアウト処理
- `handleCharacterAdded()` - キャラクター追加時の処理
- `handleItemsUpdated()` - アイテム更新時の処理
- `handleTeamAdded/Updated/Deleted()` - チーム編成の変更処理

**タブ構成**:
1. `view-all` - 所持状況一覧
2. `add-owned` - 所持キャラ追加
3. `manage-items` - アイテム管理
4. `manage-teams` - 編成管理
5. `add-master` - マスター追加
6. `edit-master` - マスター編集

---

## 認証コンポーネント

### AuthStatus.vue
**場所**: `src/components/auth/AuthStatus.vue`
**役割**: 認証状態の表示とログイン/ログアウトボタン

**Props**:
- `user` - 認証ユーザーオブジェクト

**Emits**:
- `login` - ログインボタンクリック時
- `logout` - ログアウトボタンクリック時

**使用例**:
```vue
<auth-status
  :user="user"
  @login="handleLogin"
  @logout="handleLogout"
/>
```

---

## キャラクター管理コンポーネント

### ViewAllCharactersTab.vue
**場所**: `src/components/characters/ViewAllCharactersTab.vue`
**役割**: 全キャラクターの所持状況一覧表示

**Props**:
- `dataLoaded` - データ読み込み完了フラグ
- `accounts` - アカウント一覧
- `characterMasters` - キャラクターマスター配列
- `itemMasters` - アイテムマスター配列
- `gachaMasters` - ガチャマスター配列
- `ownedCountMap` - 所持数マップ
- `ownedCharactersData` - 所持キャラクターデータマップ
- `itemMastersMap` - アイテムマスターマップ
- `characterMastersMap` - キャラクターマスターマップ

**Emits**:
- `items-updated` - アイテム更新時

**主要機能**:
- キャラクターのフィルタリング（レアリティ、ガチャ、所持状況）
- キャラクター詳細の表示
- アイテム装備状況の表示・編集
- **ピン留め機能** (新機能)

**ピン留め機能の詳細**:
- **UIストア連携**: `uiStore.isPinned()`, `uiStore.togglePinnedCharacter()`を使用
- **Computed Properties**:
  - `pinnedItems`: ピン留めされたキャラクターのみを抽出
  - `unpinnedItems`: ピン留めされていないキャラクターを抽出
  - `displayItems`: ピン留め行を先頭に配置した統合リスト
- **getItemClass**: 行にクラスを付与する関数（ピン留め行に`pinned-row`クラス）
- **UI**:
  - キャラ名の横にピンアイコンボタン表示
  - ピン留め時: `mdi-pin` (amber色)
  - 非ピン留め時: `mdi-pin-outline` (grey色)
- **スタイル**:
  - ピン留め行は`position: sticky`でヘッダー直下に固定
  - 薄い黄色背景(`#fffbea`)で視覚的に区別
  - 黄色の境界線で明確に分離
  - 複数行のピン留めに対応(最大5行まで動的にtop位置を計算)

---

### AddOwnedCharacterTab.vue
**場所**: `src/components/characters/AddOwnedCharacterTab.vue`
**役割**: 新規所持キャラクターの追加

**Props**:
- `characterMasters` - キャラクターマスター配列
- `characterMastersMap` - キャラクターマスターマップ
- `selectedAccountId` - 選択中のアカウントID
- `ownedCountMap` - 所持数マップ

**Emits**:
- `character-added` - キャラクター追加完了時
  - payload: `{ accountId, newCharacter }`

**主要機能**:
- キャラクター検索・選択
- アカウントへのキャラクター追加
- 所持数の自動カウント

---

### AddMasterCharacterTab.vue
**場所**: `src/components/characters/AddMasterCharacterTab.vue`
**役割**: キャラクターマスターデータの追加

**Props**:
- `gachaMasters` - ガチャマスター配列

**Emits**:
- `master-added` - マスターデータ追加完了時

**主要機能**:
- 新規キャラクターマスターの登録
- ガチャへの紐付け

---

### EditMasterCharacterTab.vue
**場所**: `src/components/characters/EditMasterCharacterTab.vue`
**役割**: キャラクターマスターデータの編集

**Props**:
- `characterMasters` - キャラクターマスター配列
- `gachaMasters` - ガチャマスター配列

**Emits**:
- `master-updated` - マスターデータ更新完了時

**主要機能**:
- 既存キャラクターマスターの編集
- マスターデータの削除

---

### ItemEditModal.vue
**場所**: `src/components/characters/ItemEditModal.vue`
**役割**: キャラクターのアイテム装備編集モーダル

**Props**:
- `modelValue` - モーダル表示状態
- `character` - 編集対象のキャラクター
- `itemMasters` - アイテムマスター配列

**Emits**:
- `update:modelValue` - モーダル状態の更新
- `save` - 保存ボタンクリック時
  - payload: `{ items }`

**主要機能**:
- アイテムの装備/解除
- アイテムの並び替え

---

## アイテム管理コンポーネント

### ManageItemsTab.vue
**場所**: `src/components/items/ManageItemsTab.vue`
**役割**: アイテムの装備管理とキャラクター間の移動

**Props**:
- `selectedAccountId` - 選択中のアカウントID
- `ownedCharactersData` - 所持キャラクターデータマップ
- `characterMastersMap` - キャラクターマスターマップ
- `itemMasters` - アイテムマスター配列
- `itemMastersMap` - アイテムマスターマップ

**Emits**:
- `items-updated` - アイテム更新時
  - payload: `{ accountId, ownedCharacterId, items }`
- `items-moved` - アイテム移動時
  - payload: `{ accountId, from, to }`

**主要機能**:
- キャラクター選択
- アイテムの装備管理
- アイテムのキャラクター間移動

---

## チーム編成コンポーネント

### ManageTeamsTab.vue
**場所**: `src/components/teams/ManageTeamsTab.vue`
**役割**: チーム編成の管理画面

**Props**:
- `userId` - ユーザーID
- `dataLoaded` - データ読み込み完了フラグ
- `teams` - チーム配列
- `accounts` - アカウント一覧
- `ownedCharactersData` - 所持キャラクターデータマップ
- `characterMastersMap` - キャラクターマスターマップ
- `itemMastersMap` - アイテムマスターマップ

**Emits**:
- `team-added` - チーム追加時
- `team-updated` - チーム更新時
- `team-deleted` - チーム削除時

**主要機能**:
- チーム一覧表示
- チームの作成/編集/削除
- チームメンバーの管理

---

### TeamForm.vue
**場所**: `src/components/teams/TeamForm.vue`
**役割**: チーム編成フォーム

**Props**:
- `team` - 編集対象のチーム（新規の場合はnull）
- `accounts` - アカウント一覧
- `ownedCharactersData` - 所持キャラクターデータマップ
- `characterMastersMap` - キャラクターマスターマップ

**Emits**:
- `save` - 保存ボタンクリック時
  - payload: `{ teamData }`
- `cancel` - キャンセルボタンクリック時

**主要機能**:
- チーム名の入力
- アカウント選択
- メンバーの選択・編集

---

### TeamList.vue
**場所**: `src/components/teams/TeamList.vue`
**役割**: チーム一覧の表示

**Props**:
- `teams` - チーム配列
- `characterMastersMap` - キャラクターマスターマップ
- `itemMastersMap` - アイテムマスターマップ

**Emits**:
- `edit` - 編集ボタンクリック時
  - payload: `team`
- `delete` - 削除ボタンクリック時
  - payload: `teamId`

**主要機能**:
- チーム一覧の表示
- チームの詳細表示
- 編集/削除アクション

---

## 共通コンポーネント

### AccountSelector.vue
**場所**: `src/components/shared/AccountSelector.vue`
**役割**: アカウント選択UI

**Props**:
- `accounts` - アカウント一覧
- `modelValue` - 選択中のアカウントID
- `visible` - 表示/非表示

**Emits**:
- `update:modelValue` - 選択アカウント変更時

**主要機能**:
- アカウントの選択
- 条件付き表示制御

---

### CharacterSelector.vue
**場所**: `src/components/shared/CharacterSelector.vue`
**役割**: キャラクター選択UI

**Props**:
- `characters` - キャラクター配列
- `characterMastersMap` - キャラクターマスターマップ
- `modelValue` - 選択中のキャラクターID

**Emits**:
- `update:modelValue` - 選択キャラクター変更時

**主要機能**:
- キャラクターの検索・フィルタリング
- キャラクターの選択

---

### CacheStatus.vue
**場所**: `src/components/shared/CacheStatus.vue`
**役割**: キャッシュ状態の表示

**主要機能**:
- キャッシュヒット率の表示
- キャッシュサイズの表示
- キャッシュクリア機能

---

### CacheTest.vue
**場所**: `src/components/shared/CacheTest.vue`
**役割**: キャッシュ機能のテスト用コンポーネント

**主要機能**:
- キャッシュ動作の検証
- パフォーマンステスト

---

## Pinia Stores

### UIStore (`src/stores/ui.ts`)
**役割**: アプリケーションのUI状態を管理

**State**:
```typescript
{
  activeTab: string;                   // アクティブなタブ
  selectedAccountId: string | null;    // 選択中のアカウントID
  loading: boolean;                    // ローディング状態
  snackbar: {                          // スナックバー情報
    show: boolean;
    message: string;
    color: string;
  };
  pinnedCharacterIds: number[];        // ピン留めされたキャラクターID配列
}
```

**Getters**:
- `isSnackbarVisible`: スナックバー表示状態
- `isLoading`: ローディング状態
- `hasSelectedAccount`: アカウント選択状態

**Actions**:
- `setActiveTab(tab)`: アクティブなタブを設定
- `setSelectedAccountId(accountId)`: 選択されたアカウントIDを設定
- `setLoading(loading)`: ローディング状態を設定
- `showSnackbar(message, color)`: スナックバーを表示
- `showSuccess/Error/Info/Warning(message)`: 各種メッセージを表示
- `hideSnackbar()`: スナックバーを非表示
- `resetUI()`: UI状態をリセット（ピン留めも含む）
- **`togglePinnedCharacter(masterId)`**: キャラクターのピン留めをトグル
- **`isPinned(masterId)`**: キャラクターがピン留めされているか確認
- **`clearPinnedCharacters()`**: 全てのピン留めを解除

**テスト**: `tests/stores/ui.spec.ts` (7つのテストケース完備)

---

## コンポーネント間のデータフロー

```
App.vue (State Container)
  │
  ├─→ AuthStatus.vue
  │     └─→ emit: login/logout
  │
  ├─→ AccountSelector.vue
  │     └─→ v-model: selectedAccountId
  │
  └─→ v-window
        │
        ├─→ ViewAllCharactersTab.vue
        │     ├─→ props: all master data + owned data
        │     ├─→ uses: uiStore (ピン留め機能)
        │     └─→ emit: items-updated
        │
        ├─→ AddOwnedCharacterTab.vue
        │     ├─→ props: characterMasters, selectedAccountId
        │     └─→ emit: character-added
        │
        ├─→ ManageItemsTab.vue
        │     ├─→ props: selectedAccountId, ownedCharactersData
        │     └─→ emit: items-updated, items-moved
        │
        ├─→ ManageTeamsTab.vue
        │     ├─→ props: teams, accounts, ownedCharactersData
        │     └─→ emit: team-added/updated/deleted
        │
        ├─→ AddMasterCharacterTab.vue
        │     └─→ emit: master-added
        │
        └─→ EditMasterCharacterTab.vue
              └─→ emit: master-updated
```

## コンポーネント設計の原則

1. **単一責任の原則**: 各コンポーネントは1つの明確な責務を持つ
2. **Props Down, Events Up**: データはpropsで下に、イベントはemitで上に
3. **再利用性**: 共通コンポーネントは汎用的に設計
4. **パフォーマンス**: 不要な再レンダリングを避ける
5. **型安全性**: propsとemitsを明示的に定義
6. **状態管理**: グローバルな状態はPinia Storeで管理
7. **テスト駆動**: 新機能はテストファーストで開発
