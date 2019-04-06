import * as firebase from 'firebase/app'
import 'firebase/auth'

export const state = () => ({
  avatarUrl: null,
  name: null
})

export const mutations = {
  setUser(state, user) {
    state.avatarUrl = user.avatarUrl
    state.name = user.name
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
  }
}

export const actions = {
  loginWithTwitter({ dispatch, commit }) {
    dispatch('loginWith', new firebase.auth.TwitterAuthProvider())
  },

  loginWithGoogle({ dispatch, commit }) {
    dispatch('loginWith', new firebase.auth.GoogleAuthProvider())
  },

  async loginWith({ dispatch, commit }, provider) {
    helpers.initializeFirebase()

    const idToken = await helpers.signIn(provider)
    const user = await dispatch('api/login', { idToken }, { root: true })
    commit('setUser', user)
  }
}
