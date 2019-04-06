export const state = () => ({
  accessToken: null,
  refreshToken: null
})

export const getters = {
  headers({ accessToken }) {
    if (accessToken) {
      return { Authentication: `Bearer ${accessToken}` }
    } else {
      return {}
    }
  }
}

export const actions = {
  login({ dispatch }, params) {
    dispatch('post', { path: '/v1/users', params })
  },

  post({ getters }, { path, params }) {
    return this.$axios.$post(path, params, { headers: getters.headers })
  }
}
