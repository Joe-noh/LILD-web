<template>
  <v-app light>
    <v-content>
      <dream-list :dreams="dreams" />
      <no-ssr>
        <infinite-loading spinner="spiral" @infinite="fetchMore">
          <div slot="no-more" />
          <div slot="no-results" />
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
      dreams: state => state.taggedDreams.dreams,
      isLoggedIn: state => state.currentUser.isLoggedIn
    })
  },
  async fetch({ store }) {
    await store.dispatch('header/feed')
    store.commit('taggedDreams/clear')
  },
  methods: {
    async fetchMore(infiniteLoader) {
      this.$store.commit('taggedDreams/setPath', { path: `/v1/tags/${this.$route.params.tagId}/dreams` })
      let result

      try {
        result = await this.$store.dispatch('taggedDreams/fetchMoreDreams')
      } catch (e) {
        console.log(e)
      } finally {
        if (result.hasMore) {
          infiniteLoader.loaded()
        } else {
          infiniteLoader.complete()
        }
      }
    }
  }
}
</script>
