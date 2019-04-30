export const state = () => ({
  dreams: [],
  cursor: {
    before: null,
    after: null
  },
  hasMore: false
})

export const mutations = {
  setDreams(state, { dreams }) {
    state.dreams = dreams
  },

  appendDreams(state, { dreams }) {
    state.dreams = state.dreams.concat(dreams)
  },

  prependDream(state, { dream }) {
    state.dreams.unshift(dream)
  },

  setCursor(state, { cursor }) {
    state.cursor = cursor
  },

  setHasMore(state, { hasMore }) {
    state.hasMore = hasMore
  }
}

export const actions = {
  async fetchMoreDreams({ state, commit }) {
    const params = state.cursor ? { before: state.cursor.after } : {}
    const { dreams, metadata } = await this.$axios.$get('/v1/dreams', { params })

    commit('appendDreams', { dreams })
    commit('setCursor', { cursor: metadata })
    commit('setHasMore', { hasMore: dreams.length !== 0 })
  }
}
