<template>
  <v-app>
    <v-content fluid id="backgroundImage">
      <app-header></app-header>
      <router-view></router-view>
      <app-footer></app-footer>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/UI/Header.vue'
import Footer from './components/UI/Footer.vue'

export default {
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
  }
}
</script>
<<style>
  #backgroundImage {
    background-image: url('./assets/Background.png');
    background-size: 100% 100%;
    background-position: top;
    background-attachment: fixed;
  }
</style>
