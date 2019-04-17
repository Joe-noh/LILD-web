<template>
  <v-app light>
    <v-content>
      <dream-form :initial-date="today" :initial-secret="false" initial-body="" />
    </v-content>
  </v-app>
</template>

<script>
import { format } from 'date-fns'
import requireLogin from '@/mixins/require-login'
import DreamForm from '@/components/dumb/DreamForm.vue'

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
  computed: {
    today() {
      return format(new Date(), 'YYYY-MM-DD')
    }
  },
  async fetch({ store }) {
    await store.dispatch('header/newDream')
    await store.dispatch('dreamForm/clear')
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
