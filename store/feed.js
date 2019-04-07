export const state = () => ({
  dreams: [],
  cursor: {
    before: null,
    after: null
  }
})

export const mutations = {
  setDreams(state, { dreams }) {
    state.dreams = dreams
  },

  appendDreams(state, { dreams }) {
    state.dreams.concat(dreams)
  },

  setCursor(state, { cursor }) {
    state.cursor = cursor
  }
}

export const actions = {
  async fetchDreams({ commit }) {
    const { dreams, metadata } = await this.$axios.$get('/v1/dreams')
    commit('setDreams', { dreams })
    commit('setCursor', { metadata })
  }
}
