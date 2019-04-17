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
  async create({ state, rootState }) {
    console.log(state)
    const userId = rootState.currentUser.id

    try {
      const { dream } = await this.$axios.$post(`/v1/users/${userId}/dreams`, { dream: state })
      console.log(dream)
    } catch (e) {
      console.log(e)
    }
  },

  clear({ commit }) {
    commit('setDate', { date: null })
    commit('setSecret', { secret: false })
    commit('setBody', { body: '' })
  }
}
