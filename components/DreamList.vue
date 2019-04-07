<template>
  <v-layout column justify-start align-center fill-height class="pl-2 pr-2">
    <dream-card v-for="dream in dreams" :dream="dream" :key="dream.id" class="mt-3" />
  </v-layout>
</template>

<script>
import DreamCard from '@/components/DreamCard.vue'

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
