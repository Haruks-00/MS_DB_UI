import { createApp } from "vue";
import App from "./App.vue";
import "./firebase-init.js";
import vuetify from "./plugins/vuetify";
import "./assets/styles/global.css";

const app = createApp(App);

app.use(vuetify);

app.mount("#app");
