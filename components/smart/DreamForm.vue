<template>
  <v-container>
    <v-layout column justify-start fill-height>
      <v-form class="form">
        <v-text-field prepend-icon="calendar_today" type="date" :value="date" @input="handleDateInput" />
        <v-switch prepend-icon="visibility_off" :value="secret" @change="handleSecretChange" />
        <v-textarea solo flat :background-color="colors.white" placeholder="How was your dream?" rows="7" class="mt-3" :value="body" @input="handleBodyInput" />
        <div>
          <v-chip v-if="tags.length === 0" :color="colors.red" dark @click.stop="toggleTagModal">
            Add Tags
          </v-chip>
          <template v-else>
            <v-chip v-for="tag in tags" :key="tag.name" class="tag-chip" outline :text-color="colors.red" @click="handleTagClick(tag)">
              #{{ tag.name }}
            </v-chip>
          </template>
          <v-chip :color="colors.red" dark class="tag-chip" @click.stop="toggleTagModal">
            <v-icon small>
              add
            </v-icon>
          </v-chip>
          <v-dialog v-model="showTagModal" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
              <v-toolbar dense :color="colors.white">
                <v-btn icon @click="toggleTagModal">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-toolbar>
            </v-card>
          </v-dialog>
        </div>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import colors from '@/mixins/colors'

export default {
  mixins: [colors],
  props: {
    showTagModal: {
      type: Boolean,
      required: true
    }
  },
  computed: mapState({
    date: state => state.dreamForm.date,
    secret: state => state.dreamForm.secret,
    body: state => state.dreamForm.body,
    tags: state => state.dreamForm.tags
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
    },
    handleTagClick(tag) {
      console.log(tag)
    },
    toggleTagModal() {
      this.$emit('toggle-modal')
    }
  }
}
</script>

<style lang="stylus" scoped>
.form
  font-family: serif

.tag-chip
  cursor: pointer
</style>
