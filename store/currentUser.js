import * as firebase from 'firebase/app'
import 'firebase/auth'

export const state = () => ({
  id: null,
  name: null,
  avatarUrl: null,
  isLoggedIn: false
})

export const mutations = {
  setUser(state, { id, name, avatarUrl }) {
    state.id = id
    state.name = name
    state.avatarUrl = avatarUrl
    state.isLoggedIn = true
  },

  setTokens(state, { accessToken, refreshToken }) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    this.$axios.setToken(accessToken, 'Bearer')
  },

  clear(state) {
    state.id = null
    state.name = null
    state.avatarUrl = null
    state.isLoggedIn = false

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    this.$axios.setToken(false)
  }
}

const helpers = {
  initializeFirebase() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: process.env.firebaseApiKey,
        authDomain: process.env.firebaseDomain,
        projectId: process.env.firebaseProjectId
      })
    }
  },

  async signIn(provider) {
    await firebase.auth().signInWithPopup(provider)
    return firebase.auth().currentUser.getIdToken()
  },

  decodeToken(token) {
    return JSON.parse(atob(token.split('.')[1]))
  }
}

export const actions = {
  async refresh({ state, commit, dispatch }) {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (accessToken && refreshToken) {
      const payload = helpers.decodeToken(accessToken)
      const now = Math.floor(Date.now() / 1000)

      if (payload.exp - now < 1800) {
        const { auth, user } = await this.$axios.$put('/v1/sessions', { refreshToken })
        commit('setTokens', auth)
        commit('setUser', user)
      } else if (!state.name) {
        commit('setTokens', { accessToken, refreshToken })
        const { user } = await this.$axios.$get(`/v1/users/${payload.sub}`)
        commit('setUser', user)
      }
      return true
    } else {
      commit('clear')
      return false
    }
  },

  loginWithTwitter({ dispatch, commit }) {
    return dispatch('loginWith', new firebase.auth.TwitterAuthProvider())
  },

  loginWithGoogle({ dispatch, commit }) {
    return dispatch('loginWith', new firebase.auth.GoogleAuthProvider())
  },

  async loginWith({ dispatch, commit }, provider) {
    helpers.initializeFirebase()

    try {
      const idToken = await helpers.signIn(provider)
      const { auth, user } = await this.$axios.$post('/v1/users', { idToken })
      commit('setTokens', auth)
      commit('setUser', user)
    } catch (e) {
      commit('clear')
    }
  },

  logout({ commit }) {
    commit('clear')
  }
}
