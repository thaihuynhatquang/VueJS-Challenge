<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card round>
          <v-toolbar dark color="#66615B">
            <v-toolbar-title>Login</v-toolbar-title>
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
                    clearable
                    :rules="[rules.required, rules.email]"
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
                    prepend-icon="lock"
                    hint="At least 6 characters"
                    :rules="[rules.required, rules.counter]"
                    :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    required>
                  </v-text-field>
                </v-layout>
                <v-layout row>
                  <v-flex text-xs-center>
                    <v-btn dark color="#66615B" type="submit">
                      Login
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row row-wrap>
                  <v-flex text-xs-center>
                    <v-card-text>
                      Don't have an account? <router-link to="/signup">Sign Up Now</router-link>
                    </v-card-text>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex text-xs-center>
                    <strong>OR</strong>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex text-xs-center>
                    <v-card-text>
                      <h3>LOG IN WITH</h3>
                    </v-card-text>
                    <button-social-login></button-social-login>
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
  import ButtonSocialLogin from '../Button/ButtonSocialLogin.vue'
  const firebase = require('firebase')
  // Required for side-effects
  require('firebase/firestore')

  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        rules: {
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          required: value => !!value || 'Required.',
          counter: value => value.length >= 6 || 'At least 6 characters'
        }
      }
    },
    components: {
      buttonSocialLogin: ButtonSocialLogin
    },
    methods: {
      onSignin () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => this.$router.replace('dashboard')
        )
        .catch(
          error => {
            console.log(error)
            var errorCode = error.code
            var errorMessage = error.message
            if (errorCode === 'auth/user-not-found') {
              alert('Error: User not found')
            } else if (errorCode === 'auth/wrong-password') {
              alert('The password is incorrect')
            } else alert(errorMessage)
          }
        )
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
