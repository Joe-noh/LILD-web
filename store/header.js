export const state = () => ({
  title: '',
  mode: ''
})

export const mutations = {
  setTitle(state, { title }) {
    state.title = title
  },

  setMode(state, { mode }) {
    state.mode = mode
  }
}

export const actions = {
  feed({ commit }) {
    commit('setTitle', { title: null })
    commit('setMode', { mode: 'feed' })
  },

  newDream({ commit }) {
    commit('setTitle', { title: null })
    commit('setMode', { mode: 'dream/new' })
  },

  taggedDreams({ commit }, { tag }) {
    commit('setTitle', { title: `#${tag.name}` })
    commit('setMode', { mode: 'feed' })
  }
}
