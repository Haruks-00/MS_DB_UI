import Vue from 'vue';
import App from './App.vue';

// INFO: firebaseの初期化処理はアプリケーションの起動時に一度だけ実行します。
// 将来的にサービスが増えても、ここが起点となるため管理が容易です。
import './firebase-init.js'; 

new Vue({
  render: h => h(App),
}).$mount('#app');