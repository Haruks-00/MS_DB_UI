/**
 * 遅延読み込み用のユーティリティ
 */

import type firebase from "firebase/compat/app";
import "firebase/compat/firestore";

/**
 * Firebaseインスタンス
 */
interface FirebaseInstances {
  app: firebase.app.App;
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
}

/**
 * コンポーネントの遅延読み込み
 */
export const lazyLoadComponent = <T>(
  importFunc: () => Promise<T>
): (() => Promise<T>) => {
  return () => importFunc();
};

/**
 * Firebaseサービスの遅延読み込み
 */
export const lazyLoadFirebase = async (): Promise<FirebaseInstances> => {
  const { getFirebaseInstances } = await import("../firebase-init");
  return getFirebaseInstances();
};

/**
 * データベースサービスの遅延読み込み
 */
export const lazyLoadDatabase = async (): Promise<firebase.firestore.Firestore> => {
  const { db } = await lazyLoadFirebase();
  return db;
};

/**
 * 認証サービスの遅延読み込み
 */
export const lazyLoadAuth = async (): Promise<firebase.auth.Auth> => {
  const { auth } = await lazyLoadFirebase();
  return auth;
};

/**
 * パフォーマンス測定用
 */
export const measurePerformance = <T>(name: string, fn: () => T): T => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  if (import.meta.env.DEV) {
    console.log(`${name} took ${end - start}ms`);
  }
  return result;
};
