<template>
  <v-container>
    <v-layout column justify-start fill-height>
      <dream-card v-for="dream in dreams" :key="dream.id" :dream="dream" />
    </v-layout>
  </v-container>
</template>

<script>
import DreamCard from '@/components/dumb/DreamCard.vue'

export default {
  components: {
    DreamCard
  },
  props: {
    dreams: {
      type: Array,
      required: true
    }
  }
}
</script>
