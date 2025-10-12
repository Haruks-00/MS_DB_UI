import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  // INFO: GitHub Pagesのリポジトリ名に合わせてベースパスを設定
  base: "/MS_DB_UI/",
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
  ],
  build: {
    // チャンクサイズの最適化
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vue関連を分離
          vue: ["vue"],
          // Vuetify関連を分離
          vuetify: ["vuetify"],
        },
      },
    },
    // アセットの最適化
    assetsInlineLimit: 4096,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // 開発サーバーの最適化
  server: {
    hmr: true,
  },
  // 依存関係の最適化
  optimizeDeps: {
    include: ["vue", "vuetify"],
  },
  // パスエイリアスとFirebaseの解決設定
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "firebase/app": "firebase/app",
      "firebase/firestore": "firebase/firestore",
      "firebase/auth": "firebase/auth",
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  // PWA対応
  define: {
    __PWA_ENABLED__: true,
  },
});
