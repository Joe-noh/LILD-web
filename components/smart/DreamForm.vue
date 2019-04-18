<template>
  <v-container>
    <v-layout column justify-start fill-height>
      <v-form class="form">
        <v-text-field prepend-icon="calendar_today" type="date" :value="date" @input="handleDateInput" />
        <v-switch prepend-icon="visibility_off" :value="secret" @change="handleSecretChange" />
        <v-textarea solo flat background-color="#FFFEFA" placeholder="How was your dream?" rows="7" class="mt-3" :value="body" @input="handleBodyInput" />
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    date: state => state.dreamForm.date,
    secret: state => state.dreamForm.secret,
    body: state => state.dreamForm.body
  }),
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
