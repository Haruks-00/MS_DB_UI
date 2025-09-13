import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
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