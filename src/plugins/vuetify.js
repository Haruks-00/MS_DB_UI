import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import { createVuetify } from "vuetify";

/**
 * [概要] Vuetifyインスタンスを作成し、エクスポートする
 * @note 洗練されたUIデザインのためのテーマとデフォルト設定
 */
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#667eea",
          secondary: "#764ba2",
          accent: "#f093fb",
          success: "#4facfe",
          warning: "#43e97b",
          error: "#fa709a",
          info: "#00f2fe",
          surface: "#ffffff",
          background: "#f5f7fa",
          "on-surface": "#1a202c",
          "on-background": "#1a202c",
        },
      },
    },
  },
  defaults: {
    VCard: {
      variant: "elevated",
      elevation: 4,
      rounded: "lg",
    },
    VBtn: {
      variant: "elevated",
      rounded: "lg",
      class: "text-none font-weight-bold",
    },
    VTextField: {
      variant: "outlined",
      density: "comfortable",
      rounded: "lg",
    },
    VSelect: {
      variant: "outlined",
      density: "comfortable",
      rounded: "lg",
    },
    VList: {
      density: "comfortable",
    },
    VListItem: {
      rounded: "lg",
    },
    VChip: {
      rounded: "lg",
      variant: "tonal",
    },
    VAvatar: {
      rounded: "lg",
    },
    VIcon: {
      size: "20",
    },
  },
});
