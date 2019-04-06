export const mutations = {
  setTokens(state, { accessToken, refreshToken }) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    this.$axios.setToken(accessToken, 'Bearer')
  }
}

export const actions = {
  async login({ dispatch, commit }, params) {
    const { auth, user } = await dispatch('post', { path: '/v1/users', params })
    commit('setTokens', auth)

    return user
  },

  post({ getters }, { path, params }) {
    return this.$axios.$post(path, params)
  }
}
