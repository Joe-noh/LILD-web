export const state = () => ({
  date: null,
  secret: false,
  body: '',
  tags: [],
  searchResult: []
})

export const mutations = {
  setDate(state, { date }) {
    state.date = date
  },

  setSecret(state, { secret }) {
    state.secret = secret
  },

  setBody(state, { body }) {
    state.body = body
  },

  setTags(state, { tags }) {
    state.tags = tags
  },

  addTag(state, { name }) {
    if (name && name.length > 0) {
      if (state.tags.find(tag => tag.name === name)) {
        // already have the same tag, do nothing
      } else {
        state.tags = [...state.tags, { name }]
      }
    }
  },

  removeTag(state, { name }) {
    state.tags = state.tags.filter(tag => tag.name !== name)
  },

  setSearchResult(state, { tags }) {
    state.searchResult = tags
  }
}

export const actions = {
  async create({ state, commit, rootState }) {
    const userId = rootState.currentUser.id
    const params = {
      date: state.date,
      secret: state.secret,
      body: state.body,
      tags: state.tags.map(tag => tag.name)
    }

    try {
      const { dream } = await this.$axios.$post(`/v1/users/${userId}/dreams`, { dream: params })
      commit('feed/prependDream', { dream }, { root: true })
    } catch (e) {
      console.log(e)
    }
  },

  async search({ commit }, { query }) {
    if (query && query.length > 0) {
      try {
        const { tags } = await this.$axios.$get('/v1/tags', { params: { q: query } })
        commit('setSearchResult', { tags })
      } catch (e) {
        console.log(e)
      }
    } else {
      commit('setSearchResult', { tags: [] })
    }
  },

  initialize({ commit, dispatch }, { date, secret, body, tags }) {
    commit('setDate', { date: date || null })
    commit('setSecret', { secret: secret || false })
    commit('setBody', { body: body || '' })
    commit('setTags', { tags: tags || [{ name: 'nightmare' }] })
  }
}
