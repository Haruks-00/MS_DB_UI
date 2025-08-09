import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  // INFO: GitHub Pagesのリポジトリ名に合わせてベースパスを設定
  base: '/MS_DB_UI/', 
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
  ],
});