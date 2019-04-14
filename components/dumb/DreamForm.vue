<template>
  <v-container>
    <v-layout column justify-start fill-height>
      <v-form class="form">
        <v-text-field prepend-icon="calendar_today" type="date" @input="handleDateInput" />
        <v-switch prepend-icon="visibility_off" @change="handleSecretChange" />
        <v-textarea solo flat background-color="#FFFEFA" placeholder="How was your dream?" rows="7" class="mt-3" @input="handleBodyInput" />
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      secret: false,
      body: ''
    }
  },
  methods: {
    handleDateInput(date) {
      this.$store.commit('dreamForm/setDate', { date })
    },
    handleSecretChange(secret) {
      this.$store.commit('dreamForm/setSecret', { secret })
    },
    handleBodyInput(body) {
      this.$store.commit('dreamForm/setBody', { body })
    }
  }
}
</script>

<style lang="stylus" scoped>
.form
  font-family: serif
</style>
