<template>
  <v-content>
    <v-layout column justify-space-around align-center fill-height>
      <logo />

      <v-layout shrink column justify-start align-center class="login-buttons">
        <v-btn dark large block depressed color="#C44343" :disabled="isButtonsDisabled" class="text-none" @click="loginWith('Google')">
          Login with Google
        </v-btn>
        <v-btn dark large block depressed color="#1A90D9" :disabled="isButtonsDisabled" class="text-none" @click="loginWith('Twitter')">
          Login with Twitter
        </v-btn>
      </v-layout>
    </v-layout>
  </v-content>
</template>

<script>
import Logo from '~/components/dumb/Logo.vue'

export default {
  layout: 'without-header',
  components: {
    Logo
  },
  data() {
    return {
      isButtonsDisabled: false
    }
  },
  methods: {
    async loginWith(provider) {
      this.isButtonsDisabled = true

      try {
        await this.$store.dispatch(`currentUser/loginWith${provider}`)
        this.$router.replace('/feed')
      } finally {
        this.isButtonsDisabled = false
      }
    }
  }
}
</script>

<style scoped>
.login-buttons {
  width: 80%;
  max-width: 300px;
}
</style>
