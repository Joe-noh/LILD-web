<template>
  <v-app light>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch('currentUser/refresh')
  }
}
</script>
