import Vue from 'vue'
import Router from 'vue-router'
import Signin from '../components/User/Signin.vue'
import Signup from '../components/User/Signup.vue'
import Dashboard from '../components/Dashboard.vue'
import Firebase from 'firebase'

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
  let currentUser = Firebase.auth().currentUser
  if (requiresAuth && !currentUser) {
    next('/signin')
  } else if (!requiresAuth && currentUser) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
