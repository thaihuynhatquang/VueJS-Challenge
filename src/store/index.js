import Vue from 'vue'
import Vuex from 'vuex'
import stocks from './modules/stocks'
const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    setUser: state => {
      state.user = firebase.auth().currentUser
    }
  },
  actions: {
    setUser: context => {
      context.commit('setUser')
    }
  },
  modules: {
    stocks
  }
})
