<template>
  <v-app light>
    <v-content>
      <profile-header :user="user" class="mt-3" />
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
import ProfileHeader from '@/components/dumb/ProfileHeader.vue'
import DreamList from '@/components/dumb/DreamList.vue'
import NewDreamButton from '@/components/dumb/NewDreamButton.vue'

export default {
  components: {
    ProfileHeader,
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
  async fetch({ store, params }) {
    store.commit('userDreams/clear')
    store.commit('header/title', '')
    store.commit('header/isDreamForm', false)
    await store.dispatch('user/fetch', { id: params.userId })
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
