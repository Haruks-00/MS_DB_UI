import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  test: {
    environment: 'jsdom',
    globals: true,
    css: {
      modules: {
        classNameStrategy: 'stable'
      }
    },
    server: {
      deps: {
        inline: ['vuetify']
      }
    },
    setupFiles: ['./tests/setup.js']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "vuetify/styles";`
      }
    }
  }
})