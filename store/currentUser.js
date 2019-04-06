export const state = () => ({
  avatarUrl: null,
  name: null
})

export const actions = {
  async login({ dispatch }, params) {
    await dispatch('api/login', { id_token: params.idToken }, { root: true })
  }
}
