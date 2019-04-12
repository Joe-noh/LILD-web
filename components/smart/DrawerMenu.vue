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
      <v-toolbar-side-icon @click="open = !open" />
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>
