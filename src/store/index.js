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
              id: res.user.uid,
              email: res.user.email
            }
            commit('setUser', newUser)
            console.log('Register success')
          }
        )
        .catch(
          error => {
            console.log(error)
            var errorCode = error.code
            var errorMessage = error.message
            if (errorCode === 'auth/email-already-in-use') {
              alert('Error: Email already in use')
            } else if (errorCode === 'auth/weak-password') {
              alert('The password is too weak. ' + errorMessage)
            } else alert(errorMessage)
          }
        )
    },
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          res => {
            const newUser = {
              id: res.user.uid,
              email: res.user.email
            }
            commit('setUser', newUser)
            console.log('Login success ' + newUser.email)
          }
        )
        .catch(
          error => {
            console.log(error)
            var errorCode = error.code
            var errorMessage = error.message
            if (errorCode === 'auth/user-not-found') {
              alert('Error: User not found')
            } else if (errorCode === 'auth/wrong-password') {
              alert('The password is incorrect')
            } else alert(errorMessage)
          }
        )
    },
    googleLogin ({commit}) {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(
          res => {
            const newUser = {
              id: res.user.uid,
              email: res.user.email
            }
            commit('setUser', newUser)
            console.log('Login success ' + newUser.email)
          }
        )
        .catch(
          error => {
            console.log(error)
          })
    }
  }
})
