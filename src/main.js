import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import firebase from "firebase/compat/app";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import SkeletonCards from 'vue-ultimate-skeleton-cards'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);
import KProgress from 'k-progress';
Vue.component('k-progress', KProgress);

Vue.use(SkeletonCards)

Vue.config.productionTip = false
const config = {
  apiKey: "AIzaSyD5weTu3aIXnsQgFx6dmCcSjRP4f6dL_lY",
  authDomain: "innovation-hand.firebaseapp.com",
  databaseURL: "https://innovation-hand-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "innovation-hand",
  storageBucket: "innovation-hand.appspot.com",
  messagingSenderId: "901859590127",
  appId: "1:901859590127:web:1948cf7249dd6a00ca001a",
  measurementId: "G-5ERZNJG7E9"
};
firebase.initializeApp(config)


new Vue({
  router,
  el: '#app',
  render: h => h(App),
}).$mount('#app')
