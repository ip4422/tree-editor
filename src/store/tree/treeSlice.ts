import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState, AppThunk } from '../../app/store'
import { defaultDBFlatTree } from './constants'
import { TreeItem } from './types'
import { adoptDBItemsToTree, addItemsToTree } from './utils'
export interface TreeState {
  items: TreeItem[]
  cache: TreeItem[]
}

const initialState: TreeState = {
  items: adoptDBItemsToTree(defaultDBFlatTree),
  cache: [] as TreeItem[]
}

const treeSlice = createSlice({
  name: 'public-repo-show/repos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TreeItem[]>) => {
      state.cache = action.payload
    },
    remove: (state, action: PayloadAction<TreeItem>) => {},
    reset: state => {
      state.items = adoptDBItemsToTree(defaultDBFlatTree)
      state.cache = [] as TreeItem[]
    }
  }
})

export const { add, remove, reset } = treeSlice.actions

export const selectCache = (state: RootState) => state.tree.cache

export const addItems =
  (items: string[]): AppThunk =>
  (dispatch, getState) => {
    const cache = selectCache(getState())
    const resultCache = addItemsToTree(defaultDBFlatTree, cache, items)
    dispatch(add(resultCache))
  }

export const tree = treeSlice.reducer
