<template>
  <v-app>
    <v-content>
    <app-header></app-header>
      <v-img
        alt="This is a background"
        height="900px"
        :src="require('@/assets/Background.png')"
      >
        <router-view></router-view>
      </v-img>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {

  data () {
    return {
    }
  },
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  methods: {
    setUser () {
      this.$store.dispatch('setUser')
    }
  },
  created () {
    // when the app is created run the set user method
    // this uses Vuex to check if a user is signed in
    // check out mutations in the store.js file
    this.setUser()
  },
  name: 'App'
}
</script>
