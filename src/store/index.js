import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          res => {
            const newUser = {
              id: res.user.uid
            }
            commit('setUser', newUser)
            // console.log('Register success')
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          res => {
            const newUser = {
              id: res.user.uid
            }
            commit('setUser', newUser)
            console.log('Login success')
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    }
  }
})
