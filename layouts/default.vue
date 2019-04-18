<template>
  <v-app light>
    <global-header />

    <nuxt />
  </v-app>
</template>

<script>
import GlobalHeader from '@/components/smart/GLobalHeader.vue'

export default {
  components: {
    GlobalHeader
  }
}
</script>
