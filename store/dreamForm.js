export const state = () => ({
  date: null,
  secret: false,
  body: ''
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
  }
}

export const actions = {
  async create({ state, commit, rootState }) {
    const userId = rootState.currentUser.id

    try {
      const { dream } = await this.$axios.$post(`/v1/users/${userId}/dreams`, { dream: state })
      commit('feed/prependDream', { dream }, { root: true })
    } catch (e) {
      console.log(e)
    }
  },

  initialize({ commit, dispatch }, { date, secret, body }) {
    commit('setDate', { date: date || null })
    commit('setSecret', { secret: secret || false })
    commit('setBody', { body: body || '' })
  }
}
