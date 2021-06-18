import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TreeItem {
  value: string
  parent: TreeItem
  children: TreeItem[]
}

export interface TreeState {
  items: TreeItem[]
}

const initialState: TreeState = {
  items: [] as TreeItem[]
}

const treeSlice = createSlice({
  name: 'public-repo-show/repos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TreeItem>) => {},
    remove: (state, action: PayloadAction<TreeItem>) => {},
    reset: state => {}
  }
})

export const { add, remove, reset } = treeSlice.actions
export const tree = treeSlice.reducer
