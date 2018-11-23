<template>
  <v-app>
    <v-toolbar color="#66615B">
      <v-toolbar-title class="white--text">Homepage</v-toolbar-title>
    </v-toolbar>
    
    <v-content>
      <v-img
        alt="This is a background"
        height="900"
        :src="require('@/assets/Background.png')"
      >
        <router-view></router-view>
      </v-img>
    </v-content>

  </v-app>
</template>

<script>
export default {

  data () {
    return {
    }
  },
  name: 'App'
}
</script>
