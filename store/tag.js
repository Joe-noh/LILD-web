export const state = () => ({
  id: null,
  name: null
})

export const mutations = {
  setTag(state, { id, name }) {
    state.id = id
    state.name = name
  }
}

export const actions = {
  async fetch({ commit }, { id }) {
    try {
      const { tag } = await this.$axios.$get(`/v1/tags/${id}`)
      commit('setTag', tag)
    } catch (e) {
      //
    }
  }
}
