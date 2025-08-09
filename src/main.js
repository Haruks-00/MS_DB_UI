import { createApp } from 'vue';
import App from './App.vue';
import './firebase-init.js'; 
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(vuetify)

app.mount('#app')