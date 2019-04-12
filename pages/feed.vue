<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>apps</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dense app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
    </v-toolbar>
    <v-content>
      <dream-list :dreams="dreams" />
    </v-content>
    <v-btn dark fixed bottom right fab to="/d/new">
      <v-icon>add</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import requireLogin from '@/mixins/require-login'
import DreamList from '@/components/DreamList.vue'

export default {
  components: {
    DreamList
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
