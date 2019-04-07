<template>
  <v-layout column justify-start align-center fill-height>
    <v-card v-for="dream in dreams" :key="dream.id">
      {{ dream.body }}
    </v-card>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import requireLogin from '@/mixins/require-login'

export default {
  layout: 'with-header',
  mixins: [requireLogin],
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      dreams: state => state.feed.dreams
    })
  },
  mounted() {
    if (this.dreams.length === 0) {
      this.$store.dispatch('feed/fetchDreams')
    }
  }
}
</script>
