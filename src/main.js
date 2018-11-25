import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/index'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
const firebase = require('firebase')
require('firebase/firestore')

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable */

firebase.auth().onAuthStateChanged(function(user) {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
  })
})

