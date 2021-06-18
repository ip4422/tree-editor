import { createStore } from 'redux'
import { tree, TreeState } from '../store'

/**
 * Create a testing store with imported reducers and initial state
 * @function storeFactory
 * @param {object} initialState  - Initial state for store
 * @returns {Store} - Redux store
 */
export const storeFactory = (initialState: TreeState) =>
  createStore(tree, initialState)
