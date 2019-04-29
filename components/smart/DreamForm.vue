<template>
  <v-container>
    <v-layout column justify-start fill-height>
      <v-form class="form">
        <v-text-field prepend-icon="calendar_today" type="date" :value="date" @input="handleDateInput" />
        <v-switch prepend-icon="visibility_off" :value="secret" @change="handleSecretChange" />
        <v-textarea solo flat :background-color="colors.white" placeholder="How was your dream?" rows="7" class="mt-3" :value="body" @input="handleBodyInput" />
        <div @click.stop="toggleTagModal">
          <v-chip v-if="tags.length === 0" :color="colors.red" dark outline>
            Add Tags
          </v-chip>
          <template v-else>
            <v-chip v-for="tag in tags" :key="tag.name" class="tag-chip" outline :text-color="colors.red">
              #{{ tag.name }}
            </v-chip>
          </template>
        </div>
      </v-form>
    </v-layout>

    <v-dialog v-model="showTagModal" fullscreen transition="dialog-bottom-transition">
      <v-card :color="colors.offWhite">
        <v-toolbar dense :color="colors.white">
          <v-btn icon @click="toggleTagModal">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="new-tag-form">
          <v-autocomplete
            autofocus
            background-color="transparent"
            flat
            hide-details
            item-text="name"
            item-value="name"
            prefix="#"
            prepend-icon="search"
            single-line
            :items="searchResult"
            :hide-no-data="!search"
            :search-input.sync="search">
            <v-list-tile slot="no-data" @click="handleTagging(search)">
              <v-list-tile-content>
                <v-list-tile-title>Create new tag #{{ search }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <template v-slot:item="item">
              <div @click="handleTagging(item.item.name)" style="width: 100%;">
                {{ item.item.name }}
              </div>
            </template>
          </v-autocomplete>
          <div class="tag-chips-wrapper">
            <v-chip v-for="tag in tags" :key="tag.name" class="tag-chip" close outline :text-color="colors.red" @input="handleTagClick(tag)">
              #{{ tag.name }}
            </v-chip>
          </div>
        </div>
      </v-card>
    </v-dialog>
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
  data() {
    return {
      loading: false,
      search: ''
    }
  },
  computed: mapState({
    date: state => state.dreamForm.date,
    secret: state => state.dreamForm.secret,
    body: state => state.dreamForm.body,
    tags: state => state.dreamForm.tags,
    searchResult: state => state.dreamForm.searchResult
  }),
  watch: {
    search(val) {
      if (val && (val.includes(' ') || val.includes('　'))) {
        this.handleTagging(val.trim())
      } else {
        this.$store.dispatch('dreamForm/search', { query: val })
      }
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
    },
    handleTagClick(tag) {
      this.$store.commit('dreamForm/removeTag', { name: tag.name })
    },
    handleTagging(name) {
      this.$store.commit('dreamForm/addTag', { name })
      this.search = null
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

.new-tag-form
  font-family: serif
  padding: 0 16px

.tag-chips-wrapper
  margin-top: 16px
</style>
