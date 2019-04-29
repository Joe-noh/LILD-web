<template>
  <v-app light>
    <v-content>
      <dream-list :dreams="dreams" />
    </v-content>
    <new-dream-button v-if="isLoggedIn" />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import DreamList from '@/components/dumb/DreamList.vue'
import NewDreamButton from '@/components/dumb/NewDreamButton.vue'

export default {
  components: {
    DreamList,
    NewDreamButton
  },
  transition: 'fade',
  data() {
    return {
      drawer: false,
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      dreams: state => state.feed.dreams,
      isLoggedIn: state => state.currentUser.isLoggedIn
    })
  },
  async fetch({ store }) {
    await store.dispatch('header/feed')
  },
  mounted() {
    this.$store.dispatch('feed/fetchDreams')
  }
}
</script>
