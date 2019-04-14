<template>
  <v-app light>
    <v-content>
      <dream-form />
    </v-content>
  </v-app>
</template>

<script>
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
  async fetch({ store }) {
    await store.dispatch('header/newDream')
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
