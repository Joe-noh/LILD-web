<template>
  <v-app light>
    <v-content>
      <dream-list :dreams="dreams" />
      <no-ssr>
        <infinite-loading spinner="spiral" @infinite="fetchMore">
          <div slot="no-more"></div>
          <div slot="no-results">No dreams yet.</div>
        </infinite-loading>
      </no-ssr>
    </v-content>
    <new-dream-button v-if="isLoggedIn" />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import infiniteLoading from 'vue-infinite-loading'
import DreamList from '@/components/dumb/DreamList.vue'
import NewDreamButton from '@/components/dumb/NewDreamButton.vue'

export default {
  components: {
    DreamList,
    NewDreamButton,
    infiniteLoading
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
      isLoggedIn: state => state.currentUser.isLoggedIn,
      hasMoreDreams: state => state.feed.hasMore
    })
  },
  async fetch({ store }) {
    await store.dispatch('header/feed')
  },
  methods: {
    async fetchMore(infiniteLoader) {
      try {
        await this.$store.dispatch('feed/fetchMoreDreams')
      } catch (e) {
        console.log(e)
      } finally {
        if (this.hasMoreDreams) {
          infiniteLoader.loaded()
        } else {
          infiniteLoader.complete()
        }
      }
    }
  }
}
</script>
