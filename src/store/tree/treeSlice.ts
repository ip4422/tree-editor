import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    add: (state, action: PayloadAction<string[]>) => {
      state.cache = addItemsToTree(defaultDBFlatTree, [], action.payload)
    },
    remove: (state, action: PayloadAction<TreeItem>) => {},
    reset: state => {
      state.items = adoptDBItemsToTree(defaultDBFlatTree)
      state.cache = [] as TreeItem[]
    }
  }
})

export const { add, remove, reset } = treeSlice.actions
export const tree = treeSlice.reducer
