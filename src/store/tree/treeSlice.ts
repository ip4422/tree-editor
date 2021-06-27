import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState, AppThunk } from '../../app/store'
import { defaultDBFlatTree } from './constants'
import { TreeItem } from './types'
import {
  adoptDBItemsToTree,
  addItemsToTree,
  getKeys,
  deleteItemFromTree
} from './utils'

export interface TreeState {
  items: TreeItem[]
  cache: TreeItem[]
  cacheExpandedKeys: string[]
}

const initialState: TreeState = {
  items: adoptDBItemsToTree(defaultDBFlatTree),
  cache: [] as TreeItem[],
  cacheExpandedKeys: [] as string[]
}

const treeSlice = createSlice({
  name: 'public-repo-show/repos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TreeItem[]>) => {
      state.cache = action.payload
      state.cacheExpandedKeys = getKeys(action.payload)
    },
    remove: (state, action: PayloadAction<TreeItem[]>) => {
      state.cache = action.payload
    },
    reset: state => {
      state.items = adoptDBItemsToTree(defaultDBFlatTree)
      state.cache = [] as TreeItem[]
      state.cacheExpandedKeys = [] as string[]
    }
  }
})

export const { reset } = treeSlice.actions

export const selectCache = (state: RootState) => state.tree.cache

export const addItems =
  (items: string[]): AppThunk =>
  (dispatch, getState) => {
    const cache = selectCache(getState())
    const resultCache = addItemsToTree(defaultDBFlatTree, cache, items)
    dispatch(treeSlice.actions.add(resultCache))
  }

export const deleteItem =
  (item: TreeItem): AppThunk =>
  (dispatch, getState) => {
    const cache = selectCache(getState())
    const resultCache = deleteItemFromTree(cache, item)
    dispatch(treeSlice.actions.remove(resultCache))
  }

export const tree = treeSlice.reducer
