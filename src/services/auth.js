import firebase from "firebase/compat/app";
// INFO: Firebaseの認証インスタンスを遅延読み込みに変更
import { lazyLoadAuth } from "../utils/lazyLoader.js";

/**
 * @description Googleアカウントでのログインを試みます。
 * @returns {Promise<firebase.auth.UserCredential>} ログイン成功時のユーザー情報
 * @throws {Error} ログイン失敗時にエラーをスローします
 */
const loginWithGoogle = async () => {
  const auth = await lazyLoadAuth();
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider).catch((error) => {
    // INFO: エラーはコンソールに出力し、呼び出し元で処理できるようにPromiseをrejectします
    console.error("ログインエラーの詳細:", error);
    // NOTE: Promiseチェーンでエラーを伝播させるために再スローします
    throw error;
  });
};

/**
 * @description 現在のユーザーをログアウトさせます。
 * @returns {Promise<void>}
 */
const logout = async () => {
  const auth = await lazyLoadAuth();
  return auth.signOut();
};

/**
 * @description 認証状態の変化を監視し、変更があるたびにコールバック関数を実行します。
 * @param {function(firebase.User | null): void} onAuthStateChangedCallback - 認証状態が変化したときに呼び出される関数。引数としてユーザーオブジェクトまたはnullを受け取ります。
 * @returns {firebase.Unsubscribe} - 監視を解除するための関数。
 */
const onAuthStateChanged = async (onAuthStateChangedCallback) => {
  const auth = await lazyLoadAuth();
  return auth.onAuthStateChanged(onAuthStateChangedCallback);
};

// INFO: 各関数をオブジェクトにまとめてエクスポートすることで、利用側が `authService.login()` のように使えるようにします
export const authService = {
  loginWithGoogle,
  logout,
  onAuthStateChanged,
};
