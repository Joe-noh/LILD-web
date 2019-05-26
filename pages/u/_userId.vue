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
    <new-dream-button v-if="isMyPage" />
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
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      dreams: state => state.userDreams.dreams,
      isLoggedIn: state => state.currentUser.isLoggedIn
    }),
    isMyPage() {
      return this.isLoggedIn && this.user.id === this.$route.params.userId
    }
  },
  async mounted() {
    this.$store.commit('userDreams/clear')
    await this.$store.dispatch('user/fetch', { id: this.$route.params.userId })
    await this.$store.dispatch('header/userDreams', { user: this.user })
  },
  methods: {
    async fetchMore(infiniteLoader) {
      this.$store.commit('userDreams/setPath', { path: `/v1/users/${this.$route.params.userId}/dreams` })
      let result

      try {
        result = await this.$store.dispatch('userDreams/fetchMoreDreams')
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
