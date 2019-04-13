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
      <v-toolbar-side-icon v-if="trailing == 'menu'" @click="open = !open" />
      <v-btn v-else-if="trailing == 'back'" icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
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
  computed: mapState({
    title: state => state.header.title,
    trailing: state => state.header.trailing
  }),
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
