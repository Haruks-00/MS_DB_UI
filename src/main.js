import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
// Firebaseの初期化を遅延読み込みに変更
// import "./firebase-init.js";
import vuetify from "./plugins/vuetify";
import "./assets/styles/global.css";
import {
  performanceTracker,
  setPerformanceWarnings,
} from "./utils/performance";

// パフォーマンス監視の開始
performanceTracker.startMarker("app-init");

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(vuetify);

// パフォーマンス警告の設定
setPerformanceWarnings({
  loadTime: 2000, // 2秒以上で警告
  memoryUsage: 60, // 60%以上で警告
});

app.mount("#app");

// アプリ初期化完了の測定
performanceTracker.endMarker("app-init");

// 開発環境でのパフォーマンス情報表示
if (import.meta.env.DEV) {
  console.log("🚀 アプリケーションが起動しました");
  console.log("📊 パフォーマンス情報:", performanceTracker.getAllMeasures());
}
