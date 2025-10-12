import type {
  User as FirebaseUser,
  UserCredential
} from 'firebase/auth';

import type {
  DocumentReference,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';

// Firebase型の再エクスポート
export type { FirebaseUser, UserCredential, DocumentReference, QueryDocumentSnapshot, DocumentData };

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

/**
 * Firebase初期化設定
 */
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
