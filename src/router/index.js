import Vue from 'vue'
import Router from 'vue-router'
import Signin from '../components/Auth/Signin.vue'
import Signup from '../components/Auth/Signup.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'
const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')
Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/signin'
    },
    {
      path: '/',
      redirect: '/signin'
    },
    {
      path: '/signin',
      component: Signin,
      name: 'signin'
    },
    {
      path: '/signup',
      component: Signup,
      name: 'singup'
    },
    {
      path: '/dashboard',
      component: Dashboard,
      name: 'dashboard',
      meta: {
        requiresAuth: true
      }
    }],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let currentUser = firebase.auth().currentUser
  if (requiresAuth && !currentUser) {
    next('/signin')
  } else if (!requiresAuth && currentUser) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
