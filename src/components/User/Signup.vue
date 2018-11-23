<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-toolbar color="#66615B">
            <v-toolbar-title class="white--text">Create New Account</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
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
                  <v-text-field
                    name="confirmPassword" 
                    label="Confirm Password" 
                    id="confirmPassword" 
                    v-model="confirmPassword"
                    type="password"
                    prepend-icon="lock"
                    :rules="[comparePasswords]">
                  </v-text-field>
                </v-layout>
                <v-layout row>
                  <v-flex text-xs-center>
                    <v-btn color="#66615B" class="white--text" type="submit">
                      Sign up
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex text-xs-center>
                    <v-card-text>
                      Already have an account? <router-link to="/">Sign In</router-link>
                    </v-card-text>
                  </v-flex>
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
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Password does not match' : 'Password matched'
      },
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
      onSignup () {
        console.log({email: this.email, password: this.password, confirmPassword: this.confirmPassword})
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
