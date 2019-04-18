<template>
  <v-app light>
    <v-content>
      <dream-form />
    </v-content>
  </v-app>
</template>

<script>
import { format } from 'date-fns'
import requireLogin from '@/mixins/require-login'
import DreamForm from '@/components/smart/DreamForm.vue'

export default {
  components: {
    DreamForm
  },
  mixins: [requireLogin],
  transition: 'fade',
  data() {
    return {
      isSubmitting: false
    }
  },
  async fetch({ store }) {
    const today = format(new Date(), 'YYYY-MM-DD')

    await store.dispatch('header/newDream')
    await store.dispatch('dreamForm/initialize', { date: today })
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
