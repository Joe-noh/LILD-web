export function createState(path) {
  return () => ({
    dreams: [],
    cursor: {
      before: null,
      after: null
    },
    path
  })
}

export function createMutations() {
  return {
    appendDreams(state, { dreams }) {
      state.dreams = state.dreams.concat(dreams)
    },

    prependDream(state, { dream }) {
      state.dreams.unshift(dream)
    },

    setCursor(state, { cursor }) {
      state.cursor = cursor
    },

    setPath(state, { path }) {
      state.path = path
    },

    clear(state) {
      state.dreams = []
      state.cursor = { before: null, after: null }
    }
  }
}

export function createActions(moduleName) {
  return {
    async fetchMoreDreams({ state, commit }) {
      const path = state.path
      const params = state.cursor ? { before: state.cursor.after } : {}
      const { dreams, metadata } = await this.$axios.$get(path, { params })

      commit(`${moduleName}/appendDreams`, { dreams }, { root: true })
      commit(`${moduleName}/setCursor`, { cursor: metadata }, { root: true })

      return { hasMore: !!metadata.after }
    }
  }
}
