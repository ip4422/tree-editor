import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState, AppThunk } from '../../app/store'
import { defaultDBFlatTree } from './constants'
import { TreeItem } from './types'
import {
  adoptDBItemsToTree,
  getKeys,
  deleteItem,
  alterItem,
  addItemToTree,
  applyCache
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

interface ApplyAction {
  dbItems: TreeItem[]
  cache: TreeItem[]
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
    alter: (state, action: PayloadAction<TreeItem[]>) => {
      state.cache = action.payload
    },
    apply: (state, action: PayloadAction<ApplyAction>) => {
      state.items = action.payload.dbItems
      state.cache = action.payload.cache
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
export const selectDB = (state: RootState) => state.tree.items

export const addItemAction =
  (newItem: TreeItem): AppThunk =>
  (dispatch, getState) => {
    const cache = selectCache(getState())
    const resultCache = addItemToTree(cache, newItem)
    dispatch(treeSlice.actions.add(resultCache))
  }

export const deleteItemAction =
  (item: TreeItem): AppThunk =>
  (dispatch, getState) => {
    const cache = selectCache(getState())
    const resultCache = deleteItem(cache, item)
    dispatch(treeSlice.actions.remove(resultCache))
  }

export const alterItemAction =
  (item: TreeItem): AppThunk =>
  (dispatch, getState) => {
    const cache = selectCache(getState())
    const resultCache = alterItem(cache, item)
    dispatch(treeSlice.actions.alter(resultCache))
  }

export const applyAction = (): AppThunk => (dispatch, getState) => {
  const cache = selectCache(getState())
  const dbItems = selectDB(getState())
  const [resultDBItems, resultCache] = applyCache(dbItems, cache)
  dispatch(
    treeSlice.actions.apply({
      dbItems: resultDBItems,
      cache: resultCache
    })
  )
}

export const tree = treeSlice.reducer
