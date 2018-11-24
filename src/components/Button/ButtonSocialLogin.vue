<template>
  <v-flex text-xs-center>
    <button @click="onGoogleLogin" class="loginBtn loginBtn--google">Login With Google</button>
    <button @click="onFacebookLogin" class="loginBtn loginBtn--facebook">Login With Facebook</button>
  </v-flex>
</template>

<script>
import Firebase from 'firebase'

export default {
  methods: {
    onGoogleLogin () {
      var provider = new Firebase.auth.GoogleAuthProvider()
      Firebase.auth().signInWithPopup(provider)
        .then(
          user => this.$router.replace('dashboard')
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    onFacebookLogin () {
      var provider = new Firebase.auth.FacebookAuthProvider()
      Firebase.auth().signInWithPopup(provider)
          .then(
            user => this.$router.replace('dashboard')
          )
          .catch(
            error => {
              console.log(error)
            }
          )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 20px;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  font-size: 16px;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}


/* Facebook */
.loginBtn--facebook {
  background-color: #66615B;
  background-image: linear-gradient(#66615B, #66615B);
  font-family: "Roboto";
  text-shadow: 0 -1px 0 #66615B;
}
.loginBtn--facebook:before {
  border-right: #49453f 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #66615B;
  background-image: linear-gradient(#66615B, #66615B);
}


/* Google */
.loginBtn--google {
  font-family: "Roboto";
  background: #66615B;
}
.loginBtn--google:before {
  border-right: #49453f 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #66615B;
}
</style>