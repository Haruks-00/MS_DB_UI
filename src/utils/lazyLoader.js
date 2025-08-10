/**
 * 遅延読み込み用のユーティリティ
 */

// コンポーネントの遅延読み込み
export const lazyLoadComponent = (importFunc) => {
  return () => importFunc();
};

// Firebaseサービスの遅延読み込み
export const lazyLoadFirebase = async () => {
  const { getFirebaseInstances } = await import("../firebase-init.js");
  return getFirebaseInstances();
};

// データベースサービスの遅延読み込み
export const lazyLoadDatabase = async () => {
  const { db } = await lazyLoadFirebase();
  return db;
};

// 認証サービスの遅延読み込み
export const lazyLoadAuth = async () => {
  const { auth } = await lazyLoadFirebase();
  return auth;
};

// パフォーマンス測定用
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${end - start}ms`);
  return result;
};
