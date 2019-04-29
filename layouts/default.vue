<template>
  <v-app light>
    <global-header />

    <nuxt />
  </v-app>
</template>

<script>
import GlobalHeader from '@/components/smart/GlobalHeader.vue'

export default {
  components: {
    GlobalHeader
  },
  mounted() {
    this.$store.dispatch('currentUser/refresh')
  }
}
</script>
