<template>
    <v-toolbar dark color="#66615B">
      <v-toolbar-title>Master Chart</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat to="/signup" v-if="!user">Register</v-btn>
      <v-btn flat to="/signin" v-if="!user">Login</v-btn>
      <v-btn flat @click="signOut" v-if="user">Log out</v-btn>
    </v-toolbar>
</template>

<script>
  import Firebase from 'firebase'

  export default {
    computed: {
      user () {
        return this.$store.getters.getUser
      }
    },
    methods: {
      signOut: function () {
        Firebase.auth().signOut()
          .then(() => {
            this.$router.replace('signin')
          })
      }
    }
  }
</script>

<style>

</style>