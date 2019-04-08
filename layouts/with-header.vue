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
      <nuxt />
    </v-content>
    <v-btn dark fixed bottom right fab to="/d/new">
      <v-icon>add</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    }
  }
}
</script>
