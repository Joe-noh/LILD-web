<template>
  <v-app light>
    <v-content>
      <dream-form :show-tag-modal="showTagModal" @toggle-modal="showTagModal = !showTagModal" />
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
      showTagModal: false
    }
  },
  async fetch({ store }) {
    const today = format(new Date(), 'YYYY-MM-DD')

    await store.dispatch('header/newDream')
    await store.dispatch('dreamForm/initialize', { date: today })
  },
  beforeRouteLeave(to, from, next) {
    if (this.showTagModal) {
      this.showTagModal = false
      next(false)
    } else {
      next()
    }
  }
}
</script>
