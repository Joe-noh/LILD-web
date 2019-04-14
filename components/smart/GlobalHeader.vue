<template>
  <div>
    <v-navigation-drawer v-model="open" temporary app>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>apps</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dense app>
      <v-toolbar-side-icon v-if="showMenuButton" @click="open = !open" />
      <v-btn v-else-if="showBackButton" icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer />

      <v-btn v-if="showSubmitButton" icon @click="submitDream">
        <v-icon>check</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      open: false
    }
  },
  computed: {
    ...mapState({
      title: state => state.header.title,
      mode: state => state.header.mode
    }),
    showMenuButton() {
      return this.mode !== 'dream/new'
    },
    showBackButton() {
      return this.mode === 'dream/new'
    },
    showSubmitButton() {
      return this.mode.startsWith('dream/')
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    submitDream() {
      this.$store.dispatch('dreamForm/create')
    }
  }
}
</script>
