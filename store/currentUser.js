export const state = () => ({
  avatarUrl: null,
  name: null
})

export const actions = {
  async login({ dispatch }, params) {
    const data = await dispatch('api/login', params, { root: true })
    console.log(data)
  }
}
