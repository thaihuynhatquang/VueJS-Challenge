import Vue from 'vue'
import App from './App'
import Firebase from 'firebase'
import router from './router'
import { store } from './store/index'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable */
let config = {
  apiKey: "AIzaSyAq3FQdzSLUoWXD16rTG52RqqYTYzGMPxs",
  authDomain: "case-study-teko.firebaseapp.com",
  databaseURL: "https://case-study-teko.firebaseio.com",
  projectId: "case-study-teko",
  storageBucket: "case-study-teko.appspot.com",
  messagingSenderId: "611535883029"
};

Firebase.initializeApp(config)
Firebase.auth().onAuthStateChanged(function(user) {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
  })
})

