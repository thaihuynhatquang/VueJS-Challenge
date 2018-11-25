<template>
    <v-toolbar fixed dark color="#66615B">
      <v-toolbar-title>Master Chart</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat to="/signup" v-if="!user">Register</v-btn>
      <v-btn flat to="/signin" v-if="!user">Login</v-btn>
      <v-btn flat @click="signOut" v-if="user">Log out</v-btn>
    </v-toolbar>
</template>

<script>
  const firebase = require('firebase')
  // Required for side-effects
  require('firebase/firestore')

  export default {
    computed: {
      user () {
        return this.$store.getters.getUser
      }
    },
    methods: {
      signOut: function () {
        firebase.auth().signOut()
          .then(() => {
            this.$router.replace('signin')
          })
      }
    }
  }
</script>

<style>

</style>