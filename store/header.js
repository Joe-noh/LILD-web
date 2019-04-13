export const state = () => ({
  title: null,
  trailing: null
})

export const mutations = {
  setTitle(state, { title }) {
    state.title = title
  },

  setTrailing(state, { trailing }) {
    state.trailing = trailing
  }
}

export const actions = {
  feed({ commit }) {
    commit('setTitle', { title: null })
    commit('setTrailing', { trailing: 'menu' })
  },

  newDream({ commit }) {
    commit('setTitle', { title: null })
    commit('setTrailing', { trailing: 'back' })
  }
}
