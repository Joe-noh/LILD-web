<template>
  <v-layout column justify-center align-center fill-height>
    <logo />
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  mounted() {
    this.$store.dispatch('currentUser/login', { idToken: 'aaa' })
  }
}
</script>
