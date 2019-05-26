export const state = () => ({
  id: null,
  name: null,
  avatarUrl: null
})

export const mutations = {
  setUser(state, { id, name, avatarUrl }) {
    state.id = id
    state.name = name
    state.avatarUrl = avatarUrl
  }
}

export const actions = {
  async fetch({ commit }, { id }) {
    try {
      const { user } = await this.$axios.$get(`/v1/users/${id}`)
      commit('setUser', user)
    } catch (e) {
      //
    }
  }
}
