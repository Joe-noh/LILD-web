<template>
  <v-layout column align-center>
    <v-layout row>
      <v-avatar size="64" class="mb-2">
        <img :src="user.avatarUrl">
      </v-avatar>
    </v-layout>
    <v-layout row>
      <span class="profile-header__name">{{ user.name }}</span>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.profile-header__name
  font-size: 12pt
  color: $lild-colors.black
</style>
