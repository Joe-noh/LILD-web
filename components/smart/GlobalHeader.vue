<template>
  <div>
    <v-navigation-drawer v-model="open" class="drawer" temporary app>
      <v-list v-if="isLoggedIn">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="currentUser.avatarUrl">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ currentUser.name }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider />

        <v-list-tile replace to="/" @click="open = false">
          <v-list-tile-action>
            <v-icon>people</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Top</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile replace :to="{ path: `/u/${currentUser.id}` }" @click="open = false">
          <v-list-tile-action>
            <v-icon>sentiment_satisfied</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Page</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider />

        <v-list-tile @click="logout">
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <template v-else>
        <v-list>
          <v-list-tile @click="loginWith('Google')">
            <v-list-tile-action>
              <v-icon color="#C44343">account_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Login with Google</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="loginWith('Twitter')">
            <v-list-tile-action>
              <v-icon color="#1A90D9">account_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title color="#C44343">Login with Twitter</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-toolbar dense app :color="colors.white">
      <v-toolbar-side-icon v-if="showMenuButton" @click="open = !open" />
      <v-btn v-else-if="showBackButton" icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer />

      <v-btn v-if="showSubmitButton" depressed round small dark class="text-none pl-3 pr-3" @click="submitDream">
        {{ submitButtonLabel }}
      </v-btn>
      <v-avatar v-else size="36" @click="toMyPage">
        <img :src="currentUser.avatarUrl" :alt="currentUser.name" small>
      </v-avatar>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import colors from '@/mixins/colors'

export default {
  mixins: [colors],
  data() {
    return {
      open: false,
      aboutToLogin: false
    }
  },
  computed: {
    ...mapState({
      title: state => state.header.title,
      mode: state => state.header.mode,
      currentUser: state => state.currentUser,
      isLoggedIn: state => state.currentUser.isLoggedIn
    }),
    showMenuButton() {
      return this.mode !== 'dream/new'
    },
    showBackButton() {
      return this.mode === 'dream/new'
    },
    showSubmitButton() {
      return this.mode.startsWith('dream/')
    },
    submitButtonLabel() {
      return this.$store.state.dreamForm.secret ? 'Save as Private' : 'Save'
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    toMyPage() {
      this.$router.push(`/u/${this.currentUser.id}`)
      this.open = false
    },
    async loginWith(provider) {
      if (this.aboutToLogin) return

      this.open = false
      this.aboutToLogin = true

      try {
        await this.$store.dispatch(`currentUser/loginWith${provider}`)
        this.$router.replace('/')
      } finally {
        this.aboutToLogin = false
      }
    },
    async logout() {
      this.open = false
      await this.$store.dispatch('currentUser/logout')
      this.$router.replace('/')
    },
    async submitDream() {
      try {
        await this.$store.dispatch('dreamForm/create')
        this.$router.replace('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.drawer
  background-color: $lild-colors.off-white
</style>
