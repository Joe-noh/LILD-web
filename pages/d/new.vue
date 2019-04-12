<template>
  <v-app light>
    <v-content>
      <form>
        <p>aaaaaaa</p>
        <input>
      </form>
    </v-content>
  </v-app>
</template>

<script>
import requireLogin from '@/mixins/require-login'

export default {
  components: {},
  mixins: [requireLogin],
  transition: 'fade',
  data() {
    return {
      isSubmitting: false
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
