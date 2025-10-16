# TypeScript移行計画書 - Strangler Figパターン

**作成日**: 2025-10-13
**プロジェクト**: MS_DB_UI - キャラクター管理システム
**移行戦略**: Strangler Fig Pattern (段階的置き換え)
**目標**: JavaScript + Vue 3 → TypeScript + Vue 3 (Vuetify, CSS最小化)

---

## 目次

1. [エグゼクティブサマリー](#1-エグゼクティブサマリー)
2. [Strangler Figパターンとは](#2-strangler-figパターンとは)
3. [移行の目的と期待効果](#3-移行の目的と期待効果)
4. [ビジネスクリティカル度による優先順位](#4-ビジネスクリティカル度による優先順位)
5. [移行フェーズ詳細](#5-移行フェーズ詳細)
6. [技術スタック](#6-技術スタック)
7. [TypeScript設定](#7-typescript設定)
8. [型定義戦略](#8-型定義戦略)
9. [Vuetify活用によるCSS削減戦略](#9-vuetify活用によるcss削減戦略)
10. [移行手順 - 各フェーズの詳細](#10-移行手順---各フェーズの詳細)
11. [テスト戦略](#11-テスト戦略)
12. [リスク管理とロールバック](#12-リスク管理とロールバック)
13. [チーム体制とコミュニケーション](#13-チーム体制とコミュニケーション)
14. [成功指標 (KPI)](#14-成功指標-kpi)
15. [タイムライン](#15-タイムライン)

---

## 1. エグゼクティブサマリー

### 現状
- **言語**: JavaScript (ES6+)
- **フレームワーク**: Vue 3 Composition API + Vuetify 3.9.4
- **主要な問題**: 型安全性の欠如、ランタイムエラー、リファクタリング困難

### 移行アプローチ
**Strangler Figパターン**を採用し、既存システムを稼働させたまま、段階的にTypeScriptへ移行します。

- **移行期間**: 8〜12週間（4フェーズ）
- **並行稼働**: JavaScript版とTypeScript版を共存させる
- **リスク**: 最小化（各フェーズ後にロールバック可能）
- **ビジネス影響**: ゼロダウンタイム

### 期待効果
- **型安全性**: コンパイル時エラー検出率 80%以上向上
- **開発効率**: IDE補完による生産性 30%向上
- **バグ削減**: ランタイムエラー 50%削減
- **保守性**: コードの可読性・保守性向上

---

## 2. Strangler Figパターンとは

### 概念
植物の「絞め殺しイチジク（Strangler Fig）」から名付けられたパターン。古い木（レガシーコード）に巻き付き、徐々に置き換えていく様子に似ています。

### 特徴
1. **段階的置き換え**: 一度に全てを書き換えず、機能単位で移行
2. **並行稼働**: 新旧システムが共存する期間を設ける
3. **リスク最小化**: 各段階で検証し、問題があれば即座にロールバック
4. **ビジネス継続性**: ユーザーへの影響ゼロ

### 実装戦略
```
┌─────────────────────────────────┐
│   レガシーコード (JavaScript)    │
│  ┌─────────────────────────┐   │
│  │  新コード (TypeScript)   │   │  ← Phase 1
│  │  ┌─────────────────┐    │   │
│  │  │  新コード (TS)  │    │   │  ← Phase 2
│  │  │  ┌─────────┐   │    │   │
│  │  │  │新(TS)  │   │    │   │  ← Phase 3
│  │  │  └─────────┘   │    │   │
│  │  └─────────────────┘    │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
         ↓ 最終的に完全置き換え
┌─────────────────────────────────┐
│   完全TypeScript化システム       │
└─────────────────────────────────┘
```

---

## 3. 移行の目的と期待効果

### 3.1 目的

#### 主要目的
1. **型安全性の確保**: コンパイル時のエラー検出
2. **開発効率の向上**: IDEの補完機能による生産性向上
3. **保守性の向上**: 明示的な型によるコード可読性向上
4. **バグの削減**: ランタイムエラーの事前検出

#### 副次的目的
5. **技術的負債の解消**: レガシーコード整理の機会
6. **モダン化**: 最新のベストプラクティス適用
7. **チームスキル向上**: TypeScript習得

### 3.2 期待効果（定量的）

| 指標 | 現状 | 目標 | 改善率 |
|------|------|------|--------|
| コンパイル時エラー検出 | 0% | 80% | +80% |
| IDE補完精度 | 30% | 95% | +65% |
| ランタイムエラー | 100件/月 | 50件/月 | -50% |
| コードレビュー時間 | 2h/PR | 1h/PR | -50% |
| リファクタリング時間 | 8h/機能 | 4h/機能 | -50% |
| 新規開発速度 | 1週/機能 | 0.7週/機能 | +30% |

### 3.3 期待効果（定性的）

- **コードの自己文書化**: 型定義がドキュメントの役割を果たす
- **安全なリファクタリング**: 型チェックによる破壊的変更の検出
- **チーム協業の向上**: 明示的な契約による認識齟齬の削減
- **採用競争力**: モダンな技術スタックによる人材獲得

---

## 4. ビジネスクリティカル度による優先順位

### 4.1 評価軸

各モジュールを以下の3軸で評価:
1. **ビジネスインパクト** (1-5点): ビジネス価値への影響度
2. **技術的リスク** (1-5点): バグ発生時の影響範囲
3. **移行容易性** (1-5点, 逆点): 複雑度（低いほど移行しやすい）

**優先度スコア** = (ビジネスインパクト × 2) + (技術的リスク × 1.5) + (移行容易性 × 1)

### 4.2 モジュール評価表

| モジュール | ビジネス<br>インパクト | 技術的<br>リスク | 移行<br>容易性 | 優先度<br>スコア | 優先順位 | フェーズ |
|-----------|------------|----------|----------|-----------|---------|---------|
| **services/database.js** | 5 | 5 | 3 | **20.5** | 🥇 1位 | Phase 1 |
| **services/auth.js** | 5 | 5 | 4 | **21.5** | 🥇 1位 | Phase 1 |
| **utils/itemMigration.js** | 4 | 4 | 4 | **14.0** | 🥈 2位 | Phase 1 |
| **types/** (新規作成) | 5 | 3 | 5 | **19.5** | 🥇 1位 | Phase 1 |
| **stores/** (Pinia) | 4 | 4 | 3 | **14.0** | 🥈 2位 | Phase 2 |
| **utils/cache.js** | 3 | 3 | 4 | **11.5** | 🥉 3位 | Phase 2 |
| **utils/formatters.js** | 2 | 2 | 5 | **10.0** | 🥉 3位 | Phase 2 |
| **components/shared/** | 3 | 2 | 4 | **11.0** | 🥉 3位 | Phase 2 |
| **components/characters/** | 4 | 3 | 2 | **14.5** | 🥈 2位 | Phase 3 |
| **components/items/** | 3 | 3 | 3 | **12.5** | 🥉 3位 | Phase 3 |
| **components/teams/** | 3 | 3 | 3 | **12.5** | 🥉 3位 | Phase 3 |
| **App.vue** | 5 | 5 | 2 | **19.5** | 🥇 1位 | Phase 4 |
| **composables/** (新規) | 3 | 2 | 4 | **11.0** | 🥉 3位 | Phase 4 |

### 4.3 優先順位の理由

#### 🥇 最優先 (Phase 1): サービス層・型定義
- **理由**: 全てのコンポーネントが依存する基盤
- **影響範囲**: 全システム
- **メリット**: 型定義により以降の移行が容易化

#### 🥈 高優先 (Phase 2): 状態管理・ユーティリティ・共通コンポーネント
- **理由**: 多数のコンポーネントから参照される
- **影響範囲**: 中〜大
- **メリット**: 状態管理の型安全化による全体の品質向上

#### 🥉 中優先 (Phase 3): 機能別コンポーネント
- **理由**: 独立性が高く、個別に移行可能
- **影響範囲**: 小〜中
- **メリット**: 並行作業が可能

#### Phase 4: ルートコンポーネント・統合
- **理由**: 最後に全体を統合
- **影響範囲**: 全システム
- **メリット**: 完全なTypeScript化

---

## 5. 移行フェーズ詳細

### Phase 0: 準備フェーズ (1週間)
**目標**: TypeScript環境構築、チーム教育

### Phase 1: 基盤層移行 (2〜3週間)
**目標**: サービス層・型定義のTypeScript化

### Phase 2: 状態管理・共通層移行 (2〜3週間)
**目標**: Pinia導入、ユーティリティ・共通コンポーネントのTypeScript化

### Phase 3: 機能層移行 (3〜4週間)
**目標**: 機能別コンポーネントのTypeScript化

### Phase 4: 統合・最適化フェーズ (1〜2週間)
**目標**: 完全TypeScript化、レガシーコード削除、最適化

---

## 6. 技術スタック

### 6.1 移行後のスタック

| カテゴリ | 技術 | バージョン | 備考 |
|---------|------|-----------|------|
| **言語** | TypeScript | ^5.3.0 | 最新安定版 |
| **フレームワーク** | Vue 3 | ^3.4.31 | Composition API |
| **UIライブラリ** | Vuetify | ^3.9.4 | Material Design |
| **状態管理** | Pinia | ^2.1.0 | Vue 3公式推奨 |
| **ビルドツール** | Vite | ^5.4.19 | TypeScript対応 |
| **テスト** | Vitest | ^3.2.4 | TypeScript対応 |
| **リンター** | ESLint | ^8.x | TypeScript対応 |
| **フォーマッター** | Prettier | ^3.x | TypeScript対応 |
| **型チェック** | vue-tsc | ^1.8.0 | Vue用TypeScriptチェッカー |

### 6.2 新規追加パッケージ

```bash
# TypeScript関連
npm install -D typescript@^5.3.0
npm install -D @typescript-eslint/parser@^6.0.0
npm install -D @typescript-eslint/eslint-plugin@^6.0.0
npm install -D vue-tsc@^1.8.0

# Pinia (状態管理)
npm install pinia@^2.1.0

# 型定義
npm install -D @types/node
npm install -D @types/jsdom

# Vuetify型定義（既に含まれている可能性あり）
# Vuetify 3.9.4には型定義が含まれているため追加不要
```

### 6.3 既存パッケージの更新

```bash
# Firebaseを最新版に更新
npm install firebase@^10.7.0  # または最新版

# その他の依存関係も可能な限り最新化
npm update
```

---

## 7. TypeScript設定

### 7.1 tsconfig.json

```json
{
  "compilerOptions": {
    // 基本設定
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",

    // モジュール解決
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "isolatedModules": true,

    // 型チェック
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,

    // Vue.js関連
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,

    // パス解決
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/types/*": ["./src/types/*"],
      "@/services/*": ["./src/services/*"],
      "@/stores/*": ["./src/stores/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/components/*": ["./src/components/*"]
    },

    // その他
    "forceConsistentCasingInFileNames": true,
    "noEmit": true
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ],
  "references": [
    { "path": "./tsconfig.node.json" }
  ]
}
```

### 7.2 tsconfig.node.json

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts", "vitest.config.ts"]
}
```

### 7.3 段階的なstrictモード有効化

Phase 1では緩い設定から開始し、徐々に厳格化:

```json
// Phase 1: 緩い設定
{
  "strict": false,
  "noImplicitAny": false,
  "strictNullChecks": false
}

// Phase 2: 中程度
{
  "strict": false,
  "noImplicitAny": true,
  "strictNullChecks": false
}

// Phase 3〜4: 厳格
{
  "strict": true
}
```

---

## 8. 型定義戦略

### 8.1 ディレクトリ構造

```
src/
├── types/
│   ├── index.ts                  # 型定義の統合エクスポート
│   ├── models.ts                 # ドメインモデル型定義
│   ├── firebase.ts               # Firebase関連型定義
│   ├── components.ts             # コンポーネントProps型定義
│   ├── store.ts                  # Pinia Store型定義
│   └── utils.ts                  # ユーティリティ型定義
```

### 8.2 主要な型定義

#### src/types/models.ts

```typescript
// ========================================
// ドメインモデル型定義
// ========================================

/**
 * キャラクターマスターデータ
 */
export interface CharacterMaster {
  id: string;
  name: string;
  rarity: number;
  gachaId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * アイテムマスターデータ
 */
export interface ItemMaster {
  id: string;
  name: string;
  type: string;
  stats: Record<string, number>;
  description?: string;
}

/**
 * ガチャマスターデータ
 */
export interface GachaMaster {
  id: string;
  name: string;
  characters: string[];
  startDate?: Date;
  endDate?: Date;
}

/**
 * アイテムデータ (新形式)
 */
export interface ItemData {
  itemId: number | string;
  isVirtual: boolean;
}

/**
 * 所持キャラクターデータ
 */
export interface OwnedCharacter {
  id: string;
  characterMasterId: string;
  items: ItemData[];
  addedAt?: Date;
}

/**
 * アカウントデータ
 */
export interface Account {
  id: string;
  name: string;
  userId: string;
  createdAt?: Date;
}

/**
 * チームメンバー
 */
export interface TeamMember {
  ownedCharacterId: string;
  position: number;
}

/**
 * チームデータ
 */
export interface Team {
  id: string;
  name: string;
  accountId: string;
  members: TeamMember[];
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * ユーザーデータ
 */
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
```

#### src/types/firebase.ts

```typescript
import type {
  User as FirebaseUser,
  UserCredential
} from 'firebase/auth';

import type {
  DocumentReference,
  QueryDocumentSnapshot,
  CollectionReference
} from 'firebase/firestore';

// Firebase型の再エクスポート
export type { FirebaseUser, UserCredential, DocumentReference };

/**
 * Firestoreドキュメントデータ型
 */
export interface FirestoreDocument {
  id: string;
  [key: string]: any;
}

/**
 * Firestoreコレクションパス型
 */
export type CollectionPath =
  | 'users'
  | 'characterMasters'
  | 'itemMasters'
  | 'gachaMasters';

/**
 * Firestoreサブコレクションパス型
 */
export type SubCollectionPath =
  | 'accounts'
  | 'teams'
  | 'ownedCharacters';
```

#### src/types/components.ts

```typescript
import type {
  CharacterMaster,
  ItemMaster,
  OwnedCharacter,
  Account,
  Team,
  ItemData
} from './models';

// ========================================
// コンポーネントProps型定義
// ========================================

/**
 * ViewAllCharactersTab Props
 */
export interface ViewAllCharactersTabProps {
  dataLoaded: boolean;
  accounts: Account[];
  characterMasters: CharacterMaster[];
  itemMasters: ItemMaster[];
  gachaMasters: GachaMaster[];
  ownedCountMap: Map<string, number>;
  ownedCharactersData: Map<string, OwnedCharacter[]>;
  itemMastersMap: Map<string, ItemMaster>;
  characterMastersMap: Map<string, CharacterMaster>;
}

/**
 * AddOwnedCharacterTab Props
 */
export interface AddOwnedCharacterTabProps {
  characterMasters: CharacterMaster[];
  characterMastersMap: Map<string, CharacterMaster>;
  selectedAccountId: string | null;
  ownedCountMap: Map<string, number>;
}

/**
 * ItemEditModal Props
 */
export interface ItemEditModalProps {
  modelValue: boolean;
  character: OwnedCharacter | null;
  itemMasters: ItemMaster[];
}

// ========================================
// コンポーネントEmits型定義
// ========================================

/**
 * ItemsUpdated イベントペイロード
 */
export interface ItemsUpdatedPayload {
  accountId: string;
  ownedCharacterId: string;
  characterMasterId?: string;
  items: ItemData[];
  isNew?: boolean;
}

/**
 * CharacterAdded イベントペイロード
 */
export interface CharacterAddedPayload {
  accountId: string;
  newCharacter: OwnedCharacter;
}

/**
 * ItemsMoved イベントペイロード
 */
export interface ItemsMovedPayload {
  accountId: string;
  from: {
    id: string;
    items: ItemData[];
  };
  to: {
    id: string;
    items: ItemData[];
  };
}
```

#### src/types/store.ts

```typescript
import type {
  User,
  Account,
  CharacterMaster,
  ItemMaster,
  GachaMaster,
  Team,
  OwnedCharacter
} from './models';

// ========================================
// Pinia Store型定義
// ========================================

/**
 * Auth Store State
 */
export interface AuthState {
  user: User | null;
  isAuthReady: boolean;
}

/**
 * Data Store State
 */
export interface DataState {
  dataLoaded: boolean;
  accounts: Account[];
  characterMasters: CharacterMaster[];
  itemMasters: ItemMaster[];
  gachaMasters: GachaMaster[];
  teams: Team[];
  ownedCharactersData: Map<string, OwnedCharacter[]>;
  ownedCountMap: Map<string, number>;
  characterMastersMap: Map<string, CharacterMaster>;
  itemMastersMap: Map<string, ItemMaster>;
}

/**
 * UI Store State
 */
export interface UIState {
  activeTab: string;
  selectedAccountId: string | null;
  loading: boolean;
  snackbar: {
    show: boolean;
    message: string;
    color: string;
  };
}
```

### 8.3 型定義のベストプラクティス

1. **明示的な型定義**: `any`の使用を最小限に
2. **Utility Types活用**: `Partial<T>`, `Required<T>`, `Pick<T>`, `Omit<T>`
3. **ジェネリクス**: 再利用可能な型定義
4. **型ガード**: 実行時の型安全性確保
5. **ブランド型**: 文字列型の区別

---

## 9. Vuetify活用によるCSS削減戦略

### 9.1 現状の課題

- カスタムCSSが散在
- `pixel-rpg.css`の用途不明
- Vuetifyの機能を十分に活用していない

### 9.2 Vuetify中心の設計方針

#### 原則
1. **Vuetifyコンポーネントを最大限活用**: カスタムスタイル最小化
2. **Vuetifyテーマシステム**: 色・スペーシングはテーマで管理
3. **Utilityクラス**: Vuetifyの組み込みユーティリティクラス使用
4. **カスタムCSS**: 本当に必要な場合のみ、Scoped CSS

### 9.3 Vuetify設定の最適化

#### src/plugins/vuetify.ts

```typescript
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
  // アイコン設定
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },

  // テーマ設定
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
      // ピクセルRPG風テーマ（オプション）
      pixelRpg: {
        dark: false,
        colors: {
          primary: '#8B4513',
          secondary: '#FFD700',
          accent: '#FF4500',
          background: '#F5DEB3',
          surface: '#FAEBD7',
        },
      },
    },
  },

  // デフォルト設定
  defaults: {
    VBtn: {
      color: 'primary',
      variant: 'elevated',
    },
    VCard: {
      elevation: 2,
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
    },
  },
});
```

### 9.4 CSS削減の具体例

#### Before (カスタムCSS多用)

```vue
<template>
  <div class="character-card">
    <div class="character-header">
      <h3 class="character-name">{{ character.name }}</h3>
    </div>
    <div class="character-body">
      <!-- 内容 -->
    </div>
  </div>
</template>

<style scoped>
.character-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.character-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}
.character-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
/* ... さらに多くのスタイル ... */
</style>
```

#### After (Vuetify中心、CSS最小化)

```vue
<template>
  <v-card class="ma-2">
    <v-card-title class="d-flex justify-space-between">
      <span class="text-h6">{{ character.name }}</span>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <!-- 内容 -->
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* カスタムスタイルがほぼ不要！ */
</style>
```

### 9.5 Vuetifyユーティリティクラス活用

```vue
<template>
  <!-- スペーシング -->
  <div class="ma-4 pa-2">         <!-- margin: 16px, padding: 8px -->
  <div class="mt-2 mb-4">          <!-- margin-top: 8px, margin-bottom: 16px -->

  <!-- フレックスボックス -->
  <div class="d-flex justify-space-between align-center">

  <!-- テキスト -->
  <span class="text-h5 font-weight-bold text-primary">

  <!-- 表示制御 -->
  <div class="d-none d-md-flex">  <!-- モバイルで非表示、デスクトップでflex -->

  <!-- グリッド -->
  <v-row>
    <v-col cols="12" md="6">
      <!-- 内容 -->
    </v-col>
  </v-row>
</template>
```

### 9.6 CSS削減目標

| ファイル | 現状 | 目標 | 削減率 |
|---------|------|------|--------|
| global.css | 〜200行 | 〜50行 | -75% |
| pixel-rpg.css | 不明 | 削除または統合 | -100% |
| コンポーネント内CSS | 多数 | 最小限 | -80% |
| **合計** | **推定1000行+** | **<200行** | **-80%** |

---

## 10. 移行手順 - 各フェーズの詳細

### Phase 0: 準備フェーズ (1週間)

#### 目標
TypeScript環境構築、チーム教育、既存コードの調査

#### タスク

1. **環境構築** (1日)
   - [ ] TypeScript関連パッケージインストール
   - [ ] `tsconfig.json`作成
   - [ ] Vite設定更新
   - [ ] ESLint/Prettier TypeScript対応

2. **チーム教育** (2日)
   - [ ] TypeScript基礎トレーニング
   - [ ] Vue 3 + TypeScript ベストプラクティス共有
   - [ ] Strangler Figパターン説明
   - [ ] 移行計画レビュー

3. **既存コード調査** (2日)
   - [ ] `app.js`と`App.vue`の重複確認
   - [ ] 使用されていないコードの特定
   - [ ] 依存関係マップ作成
   - [ ] 移行難易度の再評価

4. **テスト基盤強化** (1日)
   - [ ] 既存テストのTypeScript対応準備
   - [ ] テストカバレッジ測定
   - [ ] E2Eテスト環境確認

#### 成果物
- [ ] TypeScript開発環境
- [ ] チーム教育資料
- [ ] 依存関係マップ
- [ ] Phase 1実施計画詳細版

#### リスク対応
- **リスク**: チームのTypeScript習熟度不足
- **対策**: ペアプログラミング、コードレビュー強化

---

### Phase 1: 基盤層移行 (2〜3週間)

#### 目標
サービス層・型定義のTypeScript化、最重要基盤の移行

#### Week 1: 型定義・認証サービス

**Day 1-2: 型定義作成**
- [ ] `src/types/`ディレクトリ作成
- [ ] `models.ts`: ドメインモデル型定義
- [ ] `firebase.ts`: Firebase型定義
- [ ] `components.ts`: コンポーネントProps/Emits型定義
- [ ] `store.ts`: Store型定義
- [ ] `utils.ts`: ユーティリティ型定義
- [ ] `index.ts`: 型定義の統合エクスポート

**Day 3-4: 認証サービス移行**
- [ ] `src/services/auth.js` → `auth.ts`に変換
- [ ] Firebase Auth型定義適用
- [ ] エラーハンドリングの型安全化
- [ ] ユニットテスト作成/更新
- [ ] 動作確認（既存コンポーネントから利用可能か）

**Day 5: 統合テスト**
- [ ] 認証フロー全体のテスト
- [ ] 既存JavaScriptコードとの互換性確認
- [ ] パフォーマンス測定

#### Week 2: データベースサービス

**Day 1-3: データベースサービス移行**
- [ ] `src/services/database.js` → `database.ts`に変換
- [ ] Firestore操作の型定義適用
- [ ] 関数の戻り値型明示化
- [ ] エラーハンドリング改善
- [ ] ユニットテスト作成/更新

**Day 4-5: アイテムマイグレーション移行**
- [ ] `src/utils/itemMigration.js` → `itemMigration.ts`
- [ ] `ItemData`型の厳格化
- [ ] 型ガード関数実装
- [ ] ユニットテスト強化

#### Week 3: 統合・検証

**Day 1-2: 統合テスト**
- [ ] サービス層全体の統合テスト
- [ ] 既存コンポーネントからの利用確認
- [ ] パフォーマンス測定
- [ ] エラーケースの検証

**Day 3-4: ドキュメント作成**
- [ ] 型定義ドキュメント
- [ ] APIドキュメント
- [ ] 移行ガイド（チーム向け）

**Day 5: レビュー・リリース**
- [ ] コードレビュー
- [ ] QAテスト
- [ ] Phase 1リリース
- [ ] Phase 2計画確認

#### 成果物
- [ ] TypeScript化されたサービス層
- [ ] 包括的な型定義
- [ ] テストスイート
- [ ] APIドキュメント

#### 成功基準
- [ ] 全てのサービス層がTypeScript化
- [ ] 型エラー0件
- [ ] テストカバレッジ >80%
- [ ] 既存機能の動作確認完了
- [ ] パフォーマンス劣化なし

#### ロールバック条件
- 重大なバグ発生
- パフォーマンス10%以上劣化
- テストカバレッジ <70%

---

### Phase 2: 状態管理・共通層移行 (2〜3週間)

#### 目標
Pinia導入、ユーティリティ・共通コンポーネントのTypeScript化

#### Week 1: Pinia導入

**Day 1-2: Pinia Store設計**
- [ ] Storeアーキテクチャ設計
  - `useAuthStore`: 認証状態
  - `useDataStore`: データ管理（キャラ、アイテム、ガチャ）
  - `useUIStore`: UI状態（タブ、通知、ローディング）
- [ ] 型定義完成（`types/store.ts`）

**Day 3-4: Pinia Store実装**
- [ ] `src/stores/`ディレクトリ作成
- [ ] `auth.ts`: 認証Store実装
- [ ] `data.ts`: データStore実装
- [ ] `ui.ts`: UIStore実装
- [ ] Storeのテスト作成

**Day 5: App.vueリファクタリング開始**
- [ ] `App.vue`からStoreへ状態移行開始
- [ ] グローバルrefをStore呼び出しに置き換え
- [ ] 動作確認

#### Week 2: ユーティリティ・共通コンポーネント

**Day 1-2: ユーティリティ移行**
- [ ] `utils/cache.js` → `cache.ts`
- [ ] `utils/formatters.js` → `formatters.ts`
- [ ] `utils/performance.js` → `performance.ts`
- [ ] `utils/lazyLoader.js` → `lazyLoader.ts`
- [ ] ユニットテスト更新

**Day 3-5: 共通コンポーネント移行**
- [ ] `components/shared/AccountSelector.vue` → TypeScript化
- [ ] `components/shared/CharacterSelector.vue` → TypeScript化
- [ ] `components/shared/CacheStatus.vue` → TypeScript化
- [ ] `components/auth/AuthStatus.vue` → TypeScript化
- [ ] Vuetifyコンポーネント活用、CSS削減
- [ ] コンポーネントテスト作成

#### Week 3: 統合・検証

**Day 1-2: 統合テスト**
- [ ] Store全体の動作確認
- [ ] 共通コンポーネントの動作確認
- [ ] パフォーマンス測定

**Day 3-4: App.vueリファクタリング完了**
- [ ] 全てのグローバル状態をStoreに移行
- [ ] propsドリリング削減確認
- [ ] コンポーネント間通信の型安全性確認

**Day 5: レビュー・リリース**
- [ ] コードレビュー
- [ ] QAテスト
- [ ] Phase 2リリース

#### 成果物
- [ ] Pinia Stores（型安全）
- [ ] TypeScript化されたユーティリティ
- [ ] TypeScript化された共通コンポーネント
- [ ] リファクタリングされたApp.vue

#### 成功基準
- [ ] 全ての状態管理がPiniaに移行
- [ ] propsドリリング削減 >70%
- [ ] 共通コンポーネントのTypeScript化完了
- [ ] CSS削減 >50%
- [ ] テストカバレッジ >75%

---

### Phase 3: 機能層移行 (3〜4週間)

#### 目標
機能別コンポーネントのTypeScript化、CSS削減

#### Week 1: キャラクター管理コンポーネント (Part 1)

**Day 1-2: ViewAllCharactersTab**
- [ ] `ViewAllCharactersTab.vue` TypeScript化
- [ ] Props/Emits型定義適用
- [ ] Vuetify活用、CSS削減
- [ ] コンポーネントテスト作成

**Day 3-4: ItemEditModal**
- [ ] `ItemEditModal.vue` TypeScript化
- [ ] v-modelの型安全化
- [ ] Vuetify Dialog活用
- [ ] コンポーネントテスト作成

**Day 5: 統合テスト**
- [ ] キャラクター表示・編集フローテスト

#### Week 2: キャラクター管理コンポーネント (Part 2)

**Day 1-2: AddOwnedCharacterTab**
- [ ] `AddOwnedCharacterTab.vue` TypeScript化
- [ ] フォームバリデーション型安全化
- [ ] Vuetify Form活用

**Day 3-4: マスター管理タブ**
- [ ] `AddMasterCharacterTab.vue` TypeScript化
- [ ] `EditMasterCharacterTab.vue` TypeScript化

**Day 5: 統合テスト**
- [ ] キャラクター管理全機能テスト

#### Week 3: アイテム・チーム管理

**Day 1-2: ManageItemsTab**
- [ ] `ManageItemsTab.vue` TypeScript化
- [ ] ドラッグ&ドロップの型安全化
- [ ] Vuetify活用

**Day 3-5: チーム管理コンポーネント**
- [ ] `ManageTeamsTab.vue` TypeScript化
- [ ] `TeamForm.vue` TypeScript化
- [ ] `TeamList.vue` TypeScript化
- [ ] コンポーネントテスト作成

#### Week 4: 統合・検証

**Day 1-3: 全機能統合テスト**
- [ ] 全タブの動作確認
- [ ] ユーザーフローテスト
- [ ] パフォーマンス測定
- [ ] アクセシビリティチェック

**Day 4-5: レビュー・リリース**
- [ ] コードレビュー
- [ ] QAテスト
- [ ] Phase 3リリース

#### 成果物
- [ ] TypeScript化された全コンポーネント
- [ ] 包括的なコンポーネントテスト
- [ ] CSS大幅削減

#### 成功基準
- [ ] 全コンポーネントのTypeScript化完了
- [ ] CSS削減 >80%
- [ ] テストカバレッジ >85%
- [ ] 型エラー0件

---

### Phase 4: 統合・最適化フェーズ (1〜2週間)

#### 目標
完全TypeScript化、レガシーコード削除、最適化

#### Week 1: 完全TypeScript化

**Day 1-2: App.vue完全移行**
- [ ] `App.vue` 完全TypeScript化
- [ ] `app.js`削除（重複コード整理）
- [ ] Composables抽出（必要に応じて）
  - `useCharacterData.ts`
  - `useTeamManagement.ts`

**Day 3: エントリーポイント整理**
- [ ] `main.js` → `main.ts`
- [ ] `firebase-init.js` → `firebase-init.ts`
- [ ] プラグイン統合確認

**Day 4-5: レガシーコード削除**
- [ ] 使用されていない`.js`ファイル削除
- [ ] `pixel-rpg.css`削除または統合
- [ ] 不要なコメント削除
- [ ] Import整理

#### Week 2: 最適化・リリース

**Day 1-2: パフォーマンス最適化**
- [ ] バンドルサイズ分析
- [ ] ツリーシェイキング確認
- [ ] 遅延ロード最適化
- [ ] 型チェックパフォーマンス改善

**Day 3: 最終テスト**
- [ ] E2Eテスト全実行
- [ ] パフォーマンステスト
- [ ] セキュリティチェック
- [ ] アクセシビリティチェック

**Day 4: ドキュメント完成**
- [ ] README更新
- [ ] 開発ガイド作成
- [ ] 型定義ドキュメント完成
- [ ] コントリビューションガイド

**Day 5: 本番リリース**
- [ ] 最終コードレビュー
- [ ] 本番環境デプロイ
- [ ] モニタリング設定
- [ ] プロジェクト完了レポート

#### 成果物
- [ ] 完全TypeScript化されたコードベース
- [ ] 最適化されたビルド
- [ ] 包括的なドキュメント
- [ ] プロジェクト完了レポート

#### 成功基準
- [ ] JavaScriptファイル0件（設定ファイル除く）
- [ ] 型エラー0件
- [ ] テストカバレッジ >90%
- [ ] バンドルサイズ削減 >20%
- [ ] CSS削減 >80%
- [ ] パフォーマンス改善または維持

---

## 11. テスト戦略

### 11.1 テストレベル

#### 1. ユニットテスト
- **対象**: 全サービス、ユーティリティ、Store
- **ツール**: Vitest + @vue/test-utils
- **カバレッジ目標**: >85%

#### 2. コンポーネントテスト
- **対象**: 全Vueコンポーネント
- **ツール**: Vitest + @vue/test-utils
- **カバレッジ目標**: >75%

#### 3. 統合テスト
- **対象**: Store + Service層の統合
- **頻度**: 各Phaseごと

#### 4. E2Eテスト（オプション）
- **対象**: 主要なユーザーフロー
- **ツール**: Playwright または Cypress
- **頻度**: Phase 4で実施

### 11.2 型テスト

TypeScriptの型チェック自体がテストの役割を果たす:

```bash
# 型チェック
npm run type-check

# package.jsonに追加
"scripts": {
  "type-check": "vue-tsc --noEmit"
}
```

### 11.3 テストの自動化

#### package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest watch",
    "type-check": "vue-tsc --noEmit",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix",
    "format": "prettier --write src/"
  }
}
```

### 11.4 CI/CDでのテスト実行

#### .github/workflows/test.yml

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Unit tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## 12. リスク管理とロールバック

### 12.1 主要リスク

| リスク | 影響度 | 発生確率 | 対策 |
|--------|--------|----------|------|
| **型定義の不整合** | 高 | 中 | 段階的な型導入、厳密なレビュー |
| **パフォーマンス劣化** | 高 | 低 | 継続的なパフォーマンス測定 |
| **テストカバレッジ不足** | 中 | 中 | 各Phase後にカバレッジ確認 |
| **チームの習熟度不足** | 中 | 高 | 事前トレーニング、ペアプロ |
| **予期しないバグ** | 高 | 中 | 包括的なテスト、段階的リリース |
| **スケジュール遅延** | 中 | 中 | バッファ期間確保、優先順位調整 |

### 12.2 ロールバック戦略

#### Phase単位のロールバック

各Phaseはgitブランチで管理し、問題発生時は即座にロールバック可能:

```bash
# Phase 1ブランチ
git checkout -b phase1-typescript-services

# マージ前にテスト
npm run test:coverage
npm run type-check

# 問題なければmain/developへマージ
git checkout develop
git merge phase1-typescript-services

# 問題発生時はrevert
git revert <commit-hash>
```

#### ロールバック条件

以下のいずれかが発生した場合、即座にロールバック:
1. **重大なバグ**: ユーザーデータ損失、認証不可など
2. **パフォーマンス劣化**: 10%以上の速度低下
3. **テスト失敗**: カバレッジ目標未達成
4. **型エラー**: 解決不能な型エラー多数発生

#### ロールバック手順

1. **即座にrevert**: GitHubで該当コミットをrevert
2. **原因調査**: エラーログ、パフォーマンスデータ分析
3. **修正計画**: 問題の修正方針決定
4. **再実施**: 修正後に再度Phase実施

### 12.3 Feature Flagによる段階的有効化（オプション）

TypeScript版とJavaScript版を共存させ、徐々に切り替え:

```typescript
// src/config/features.ts
export const features = {
  useTypescriptServices: import.meta.env.VITE_USE_TS_SERVICES === 'true',
  useTypescriptComponents: import.meta.env.VITE_USE_TS_COMPONENTS === 'true',
};

// 使用例
import { features } from '@/config/features';
import { authService as authServiceJS } from './services/auth.js';
import { authService as authServiceTS } from './services/auth';

const authService = features.useTypescriptServices ? authServiceTS : authServiceJS;
```

---

## 13. チーム体制とコミュニケーション

### 13.1 推奨チーム構成

- **プロジェクトリーダー** (1名): 全体統括、意思決定
- **TypeScript移行リード** (1名): 技術的リード、コードレビュー
- **開発者** (2〜4名): 実装、テスト
- **QAエンジニア** (1名): テスト計画、品質保証

### 13.2 コミュニケーション

#### 定例ミーティング
- **毎日**: 15分スタンドアップ（進捗、ブロッカー共有）
- **週次**: 1時間レビュー会（成果物レビュー、次週計画）
- **Phase終了時**: レトロスペクティブ（振り返り）

#### ドキュメント
- **進捗管理**: GitHub Projects または Jira
- **技術メモ**: Notion, Confluence, または Markdown
- **Q&A**: Slack チャンネル `#typescript-migration`

### 13.3 教育・サポート

#### TypeScript研修
- **Phase 0**: 基礎トレーニング（2日間）
- **Phase 1〜3**: ペアプログラミング
- **継続**: 毎週のナレッジシェアセッション

#### リソース
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
- [Vue 3 + TypeScript ガイド](https://vuejs.org/guide/typescript/overview.html)
- [Vuetify TypeScript ガイド](https://vuetifyjs.com/en/features/typescript/)

---

## 14. 成功指標 (KPI)

### 14.1 技術指標

| 指標 | 現状 | Phase 1 | Phase 2 | Phase 3 | Phase 4 (目標) |
|------|------|---------|---------|---------|----------------|
| **TypeScript化率** | 0% | 30% | 60% | 90% | 100% |
| **型エラー数** | - | <10 | <5 | <2 | 0 |
| **テストカバレッジ** | 20% | 75% | 80% | 85% | 90% |
| **バンドルサイズ** | 100% | 100% | 95% | 90% | <85% |
| **CSS行数** | 1000+ | 800 | 400 | 300 | <200 |

### 14.2 品質指標

| 指標 | 現状 | 目標 |
|------|------|------|
| **ランタイムエラー** | 100件/月 | <50件/月 |
| **コンパイル時エラー検出** | 0% | >80% |
| **コードレビュー時間** | 2h/PR | <1h/PR |
| **新機能開発速度** | 1週/機能 | 0.7週/機能 |

### 14.3 チーム指標

| 指標 | 目標 |
|------|------|
| **TypeScript習熟度** | 全員が基本操作可能 |
| **コミット頻度** | 毎日1回以上 |
| **PRレビュー時間** | 24時間以内 |
| **ブロッカー解消時間** | 当日中 |

---

## 15. タイムライン

### 15.1 ガントチャート

```
Week  1   2   3   4   5   6   7   8   9   10  11  12
Phase 0 |==|
Phase 1     |======|======|
Phase 2                 |======|======|
Phase 3                         |======|======|======|
Phase 4                                         |======|
```

### 15.2 詳細スケジュール

| フェーズ | 期間 | 開始日 | 終了日 | マイルストーン |
|---------|------|--------|--------|---------------|
| **Phase 0** | 1週間 | Week 1 | Week 1 | 環境構築完了 |
| **Phase 1** | 2〜3週間 | Week 2 | Week 4 | サービス層TypeScript化 |
| **Phase 2** | 2〜3週間 | Week 4 | Week 6 | Pinia導入、共通層TypeScript化 |
| **Phase 3** | 3〜4週間 | Week 6 | Week 10 | 全コンポーネントTypeScript化 |
| **Phase 4** | 1〜2週間 | Week 10 | Week 12 | 完全TypeScript化、本番リリース |

### 15.3 重要日程

- **Week 1 終了**: キックオフミーティング、Phase 0完了
- **Week 4 終了**: Phase 1完了、中間レビュー
- **Week 6 終了**: Phase 2完了、進捗確認
- **Week 10 終了**: Phase 3完了、統合テスト開始
- **Week 12 終了**: プロジェクト完了、本番リリース
- **Week 13**: ポストモーテム、ドキュメント整理

---

## 付録

### A. 参考資料

#### TypeScript
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

#### Vue 3 + TypeScript
- [Vue 3 TypeScript Guide](https://vuejs.org/guide/typescript/overview.html)
- [Vue 3 Composition API with TypeScript](https://vuejs.org/guide/typescript/composition-api.html)

#### Vuetify
- [Vuetify 3 Documentation](https://vuetifyjs.com/)
- [Vuetify TypeScript Guide](https://vuetifyjs.com/en/features/typescript/)

#### Pinia
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Pinia TypeScript](https://pinia.vuejs.org/core-concepts/#typescript)

#### Strangler Figパターン
- [Martin Fowler - StranglerFigApplication](https://martinfowler.com/bliki/StranglerFigApplication.html)

### B. チェックリスト

#### Phase 0 完了チェックリスト
- [ ] TypeScript環境構築完了
- [ ] チーム全員がTypeScript基礎理解
- [ ] 移行計画承認
- [ ] Phase 1タスク詳細化

#### Phase 1 完了チェックリスト
- [ ] サービス層TypeScript化完了
- [ ] 型定義完成
- [ ] テストカバレッジ >80%
- [ ] 型エラー0件
- [ ] パフォーマンス劣化なし

#### Phase 2 完了チェックリスト
- [ ] Pinia導入完了
- [ ] ユーティリティTypeScript化完了
- [ ] 共通コンポーネントTypeScript化完了
- [ ] CSS削減 >50%
- [ ] テストカバレッジ >75%

#### Phase 3 完了チェックリスト
- [ ] 全コンポーネントTypeScript化完了
- [ ] CSS削減 >80%
- [ ] テストカバレッジ >85%
- [ ] 型エラー0件

#### Phase 4 完了チェックリスト
- [ ] JavaScriptファイル0件
- [ ] レガシーコード削除完了
- [ ] ドキュメント完成
- [ ] 本番リリース完了
- [ ] ポストモーテム実施

### C. よくある質問 (FAQ)

#### Q1: なぜStrangler Figパターンを採用するのか?
**A**: 一度に全てを書き換えるビッグバン移行はリスクが高すぎます。Strangler Figパターンは段階的に移行できるため、各フェーズで検証とロールバックが可能で、ビジネス継続性を保てます。

#### Q2: 移行中にJavaScriptとTypeScriptが混在して問題ないか?
**A**: Viteはデフォルトで両方をサポートしており、問題ありません。TypeScriptファイルからJavaScriptファイルをimportすることも可能です（型チェックは緩くなりますが）。

#### Q3: Piniaは必須か?
**A**: 必須ではありませんが、TypeScriptとの相性が良く、現在のApp.vueの複雑な状態管理を改善できるため、強く推奨します。

#### Q4: CSSを80%削減するのは現実的か?
**A**: Vuetifyの機能を最大限活用すれば可能です。Vuetifyはユーティリティクラス、テーマシステム、コンポーネントのデフォルトスタイルが充実しているため、カスタムCSSをほとんど書かずに済みます。

#### Q5: 移行中にバグが見つかったらどうするか?
**A**: 各Phaseはgitブランチで管理しているため、問題があれば即座にrevertできます。また、重大なバグの場合はロールバック条件に該当するため、そのPhaseを中断し、修正後に再実施します。

#### Q6: TypeScriptの学習コストは?
**A**: 基礎は1〜2日で習得可能です。Phase 0でトレーニングを実施し、Phase 1以降はペアプログラミングで実践的に学びます。

---

## まとめ

この移行計画は、**Strangler Figパターン**を用いてリスクを最小化しながら、段階的にTypeScript化を進める戦略です。

### 重要なポイント

1. **段階的移行**: 一度に全てを書き換えず、4つのフェーズに分けて移行
2. **ビジネスクリティカル優先**: サービス層から優先的に移行
3. **ロールバック可能**: 各フェーズ後に検証、問題があれば即座に戻せる
4. **Vuetify活用**: CSS削減80%を目指す
5. **型安全性**: コンパイル時エラー検出率80%以上を目標

### 期待される成果

- **品質向上**: 型安全性によるバグ削減50%
- **開発効率**: IDE補完による生産性30%向上
- **保守性向上**: コードの可読性・保守性大幅改善
- **技術的負債解消**: レガシーコードの整理

### 次のステップ

1. **承認**: この移行計画をチーム・ステークホルダーに提示し、承認を得る
2. **Phase 0開始**: 環境構築・チーム教育開始
3. **継続的改善**: 各Phase後の振り返りで計画を改善

---

**作成者**: Claude (Serena MCP)
**最終更新**: 2025-10-13
**バージョン**: 1.0
