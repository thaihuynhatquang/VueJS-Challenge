<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card>
          <v-toolbar dark color="#66615B">
            <v-toolbar-title>Create New Account</v-toolbar-title>
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
                    <v-btn dark color="#66615B" type="submit">
                      Sign up
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex text-xs-center>
                    <v-card-text>
                      Already have an account? <router-link to="/signin">Sign In</router-link>
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
                      SIGN UP WITH
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
  import Firebase from 'firebase'
  import ButtonSocialLogin from '../Button/ButtonSocialLogin.vue'

  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    components: {
      buttonSocialLogin: ButtonSocialLogin
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Password does not match' : 'Password matched'
      }
    },
    methods: {
      onSignup () {
        Firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => this.$router.replace('dashboard')
        )
        .catch(
          error => {
            var errorCode = error.code
            var errorMessage = error.message
            if (errorCode === 'auth/email-already-in-use') {
              alert('Error: Email already in use')
            } else if (errorCode === 'auth/weak-password') {
              alert('The password is too weak. ' + errorMessage)
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
