<template>
  <v-card class="pa-3 mb-3 fluid dream-card">
    <v-layout row align-start>
      <v-avatar size="36" class="mr-3">
        <img :src="dream.user.avatarUrl">
      </v-avatar>
      <v-layout column>
        <p class="dream-card__body mb-2">{{ dream.body }}</p>
        <v-layout row wrap class="mb-2">
          <a v-for="tag in dream.tags" :key="tag.id" class="mr-1 dream-card__tag">
            #{{ tag.name }}
          </a>
        </v-layout>
        <v-layout row justify-end align-start>
          <v-icon v-if="dream.secret" size="18" class="mr-2 dream-card__visibility">
            visibility_off
          </v-icon>
          <span class="dream-card__date">{{ dream.date | readableDate }}</span>
        </v-layout>
      </v-layout>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    dream: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.dream-card
  background: $lild-colors.white

.dream-card__body
  font-family: serif
  font-size: 11pt
  overflow-wrap: break-word
  white-space: pre-wrap
  line-height: 1.8

.dream-card__tag
  font-family: serif
  font-size: 11pt
  color: $lild-colors.red
  overflow: auto;
  overflow-wrap: break-word
  line-height: 1.5

.dream-card__visibility
  color: $lild-colors.gray

.dream-card__date
  font-family: serif
  font-size: 10pt
  text-align: right
</style>
