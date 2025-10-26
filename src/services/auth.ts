import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { lazyLoadAuth } from "../utils/lazyLoader";

/**
 * Googleアカウントでのログインを試みます。
 * @returns ログイン成功時のユーザー情報
 * @throws ログイン失敗時にエラーをスローします
 */
const loginWithGoogle = async (): Promise<firebase.auth.UserCredential> => {
  const auth = await lazyLoadAuth();
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider).catch((error: Error) => {
    // エラーはコンソールに出力し、呼び出し元で処理できるようにPromiseをrejectします
    if (import.meta.env.DEV) {
      console.error("ログインエラーの詳細:", error);
    }
    // Promiseチェーンでエラーを伝播させるために再スローします
    throw error;
  });
};

/**
 * 現在のユーザーをログアウトさせます。
 * @returns Promise<void>
 */
const logout = async (): Promise<void> => {
  const auth = await lazyLoadAuth();
  return auth.signOut();
};

/**
 * 認証状態の変化を監視し、変更があるたびにコールバック関数を実行します。
 * @param onAuthStateChangedCallback - 認証状態が変化したときに呼び出される関数。引数としてユーザーオブジェクトまたはnullを受け取ります。
 * @returns 監視を解除するための関数
 */
const onAuthStateChanged = async (
  onAuthStateChangedCallback: (user: firebase.User | null) => void
): Promise<firebase.Unsubscribe> => {
  const auth = await lazyLoadAuth();
  return auth.onAuthStateChanged(onAuthStateChangedCallback);
};

/**
 * 認証サービス
 * 各関数をオブジェクトにまとめてエクスポートすることで、利用側が `authService.loginWithGoogle()` のように使えるようにします
 */
export const authService = {
  loginWithGoogle,
  logout,
  onAuthStateChanged,
};
