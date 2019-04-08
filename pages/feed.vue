<template>
  <dream-list :dreams="dreams" />
</template>

<script>
import { mapState } from 'vuex'
import requireLogin from '@/mixins/require-login'
import DreamList from '@/components/DreamList.vue'

export default {
  layout: 'with-header',
  components: {
    DreamList
  },
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
