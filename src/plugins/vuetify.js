import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import { createVuetify } from "vuetify";

/**
 * [概要] Vuetifyインスタンスを作成し、エクスポートする
 * @note ミニマル&フラットデザインのためのテーマとデフォルト設定
 */
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#1976d2",
          secondary: "#424242",
          accent: "#42a5f5",
          success: "#4caf50",
          warning: "#ff9800",
          error: "#f44336",
          info: "#2196f3",
          surface: "#ffffff",
          background: "#fafafa",
          "on-surface": "#212121",
          "on-background": "#212121",
        },
      },
    },
  },
  defaults: {
    VCard: {
      variant: "outlined",
      elevation: 0,
      rounded: "md",
    },
    VBtn: {
      variant: "outlined",
      rounded: "md",
      class: "text-none font-weight-medium",
    },
    VTextField: {
      variant: "outlined",
      density: "compact",
      rounded: "md",
    },
    VSelect: {
      variant: "outlined",
      density: "compact",
      rounded: "md",
    },
    VList: {
      density: "compact",
    },
    VListItem: {
      rounded: "sm",
    },
    VChip: {
      rounded: "md",
      variant: "outlined",
    },
    VAvatar: {
      rounded: "md",
    },
    VIcon: {
      size: "20",
    },
  },
});
