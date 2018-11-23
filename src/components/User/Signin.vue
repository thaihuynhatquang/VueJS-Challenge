<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-toolbar color="#66615B">
            <v-toolbar-title class="white--text">Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                    name="email" 
                    label="Email" 
                    id="email" 
                    v-model="email"
                    type="email"
                    prepend-icon="person"
                    required>
                  </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    name="password" 
                    label="Password" 
                    id="password" 
                    v-model="password"
                    type="password"
                    prepend-icon="lock"
                    required>
                  </v-text-field>
                </v-layout>
                <v-layout row>
                  <v-flex text-xs-center>
                    <v-btn color="#66615B" class="white--text" type="submit">
                      Login
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex text-xs-center>
                    <v-card-text>
                      Don't have an account? <router-link to="/signup">Sign Up Now</router-link>
                    </v-card-text>
                  </v-flex>
                </v-layout>
                <v-layout align-center justify-center>
                  <!-- <v-flex> -->
                    <v-card-text>
                      OR
                    </v-card-text>
                  <!-- </v-flex> -->
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
  </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/home')
        }
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
