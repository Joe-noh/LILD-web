import { createState, createMutations, createActions } from './dreamList'

export const state = createState('/v1/dreams')

export const mutations = createMutations()

export const actions = createActions('feed')
