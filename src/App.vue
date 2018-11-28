<template>
  <v-app>
    <v-content id="backgroundImage">
      <app-header></app-header>
      <transition name="flip" mode="out-in">
        <router-view></router-view>
      </transition>
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

  .flip-enter {
      /*transform: rotateY(0deg);*/
  }

  .flip-enter-active {
      animation: flip-in  0.5s ease-out forwards;
  }

  .flip-leave {
      /*transform: rotateY(0deg);*/
  }

  .flip-leave-active {
      animation: flip-out 0.5s ease-out forwards;
  }

  @keyframes flip-out {
      from {
          transform: rotateY(0deg);
      }
      to {
          transform: rotateY(90deg);
      }
  }

  @keyframes flip-in {
      from {
          transform: rotateY(90deg);
      }
      to {
          transform: rotateY(0deg);
      }
  }
</style>
