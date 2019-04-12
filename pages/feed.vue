<template>
  <v-app light>
    <drawer-menu />
    <v-content>
      <dream-list :dreams="dreams" />
    </v-content>
    <new-dream-button />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import requireLogin from '@/mixins/require-login'
import DrawerMenu from '@/components/smart/DrawerMenu.vue'
import DreamList from '@/components/dumb/DreamList.vue'
import NewDreamButton from '@/components/dumb/NewDreamButton.vue'

export default {
  components: {
    DrawerMenu,
    DreamList,
    NewDreamButton
  },
  mixins: [requireLogin],
  data() {
    return {
      drawer: false,
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
