import Vue from 'vue'
import Router from 'vue-router'
import Signin from '../components/User/Signin.vue'
import Signup from '../components/User/Signup.vue'
import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
  {path: '', component: Signin},
  {path: '/signup', component: Signup},
  {path: '/home', component: Home}
  ],
  mode: 'history'
})
