export const state = () => ({
  title: '',
  isDreamForm: false
})

export const mutations = {
  title(state, title) {
    state.title = title
  },

  isDreamForm(state, bool) {
    state.isDreamForm = bool
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
  },

  userDreams({ commit }, { user }) {
    commit('setTitle', { title: user.name })
    commit('setMode', { mode: 'user' })
  }
}
