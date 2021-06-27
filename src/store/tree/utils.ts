import { cloneDeep } from 'lodash'
import { TreeItem, DBTreeItemList, DBTreeItem } from './types'
import { rootDBKey } from './constants'

/**
 * Find item in tree by key
 * @param {TreeItem[]} items - array of TreeItem to find with
 * @param {string} key - key of searched item
 * @returns {TreeItem | null} - link to item with received key
 */
export const getItemByKey = (
  items: TreeItem[],
  key: string
): TreeItem | null => {
  if (items.length) {
    let result = null
    for (let i = 0; result == null && i < items.length; i++) {
      if (items[i].key === key) {
        return items[i]
      }
      result = getItemByKey(items[i].children, key)
    }
    return result
  }
  return null
}

/**
 * Returns root node
 * @param {TreeItem[]} nodes - flat tree. Only root has no parent
 * @returns {TreeItem} - root node object
 */
export const getRootItem = (nodes: TreeItem[]): TreeItem => {
  for (let key in nodes) {
    if (!nodes[key].parent) {
      return { ...nodes[key], children: [] as TreeItem[] }
    }
  }
  return {} as TreeItem
}

/**
 * Returns tree for given root node key
 * @param {TreeItem[]} nodes - flat tree. Only root has no parent
 * @param {string} parent - root node key. It can be any node element. Tree
 * will be created from received key
 * @returns {TreeItem[]}  - result tree
 */
export const getChildrenItems = (
  nodes: TreeItem[],
  parent: string
): TreeItem[] => {
  const childrenItems = [] as TreeItem[]
  for (const key in nodes) {
    if (nodes[key].parent === parent) {
      const children = getChildrenItems(nodes, nodes[key].key)
      childrenItems.push({ ...nodes[key], ...{ children } })
    }
  }
  return childrenItems
}

/**
 * Returns tree for given flat tree with root or without root
 * @param {TreeItem[]} nodes - flat tree. Only root has no parent
 * @returns {TreeItem[]}  - result tree
 */
export const flatTreeToViewTree = (items: TreeItem[]): TreeItem[] => {
  const treeItems = [] as TreeItem[]
  const rootItem = getRootItem(items)
  // check for existing root item. If we have no root, than return empty array
  if (rootItem.key) {
    const children = getChildrenItems(items, rootItem.key)
    rootItem.children = children
    treeItems.push(rootItem)
  }
  for (let i in items) {
    if (!getItemByKey(treeItems, items[i].key)) {
      const parent = getItemByKey(treeItems, items[i].parent)
      if (parent) {
        const children = getChildrenItems(items, items[i].parent)
        parent.children.push(...children)
      } else {
        const children = getChildrenItems(items, items[i].key)
        const item = { ...items[i], children }
        treeItems.push(item)
      }
    }
  }
  return treeItems
}

/**
 * Reorder flat tree
 * @param {DBTreeItem[]} tree - flat tree to ordering
 * @returns {DBTreeItem[]} - ordered flat tree
 */
// TODO: refactoring for keep current ordering when add children
// now it push before other children and ordering changing
export const reorderFlatTree = (
  tree: DBTreeItem[] = [] as DBTreeItem[]
): TreeItem[] => {
  const orderedTree = [] as TreeItem[]
  if (tree.length) {
    const currentItem = { ...tree[0], children: [] as TreeItem[] }
    orderedTree.push(currentItem)
    // start from second item cause we already push initial item
    for (let i = 1; i < tree.length; i++) {
      if (tree[i].parent) {
        // check for existing direct parent in ordered items
        let pos = orderedTree.findIndex(item => item.key === tree[i].parent)
        if (pos >= 0) {
          orderedTree.splice(pos + 1, 0, {
            ...tree[i],
            children: [] as TreeItem[]
          })
        } else {
          // check for existing direct children in ordered items
          pos = orderedTree.findIndex(item => item.parent === tree[i].key)
          if (pos >= 0) {
            orderedTree.splice(pos, 0, {
              ...tree[i],
              children: [] as TreeItem[]
            })
          } else {
            // if no direct parent and children in ordered tree
            orderedTree.push({ ...tree[i], children: [] as TreeItem[] })
          }
        }
      } else {
        orderedTree.splice(0, 0, { ...tree[i], children: [] as TreeItem[] })
      }
    }
  }
  return orderedTree
}

/**
 * Add items to tree view
 * @param {DBTreeItemList} sourceDB - source DB with whole items list
 * @param {TreeItem[]} items - current view tree
 * @param {string[]} keys - list of keys to add
 *
 */
export const addItemsToTree = (
  sourceDB: DBTreeItemList,
  items: TreeItem[],
  keys: string[]
) => {
  const flatTree = getFlattenTree(items)
  for (let i = 0; i < keys.length; i++) {
    if (!flatTree.find(item => item.key === keys[i])) {
      flatTree.push({ ...sourceDB[keys[i]], children: [] as TreeItem[] })
    }
  }

  // should ordering list to build correctly tree
  const orderedTree = reorderFlatTree(flatTree)

  return flatTreeToViewTree(orderedTree)
}

/**
 * Mark item as "deleted". Preparing array for changing and call
 * recursive delete function on prepared array
 * @param {TreeItem[]} cache - current view tree
 * @param {TreeItem} item - item to be deleted
 *
 */
export const deleteItem = (cache: TreeItem[], itemToDelete: TreeItem) => {
  const cacheTree = cloneDeep(cache)
  deleteItemFromTree(cacheTree, itemToDelete)
  return cacheTree
}

/**
 * Mark item as "deleted" recursively from entire tree
 * @param {TreeItem[]} cache - current view tree
 * @param {TreeItem} item - item to be deleted
 *
 */
export const deleteItemFromTree = (
  tree: TreeItem[],
  itemToDelete: TreeItem
) => {
  const startItem = getItemByKey(tree, itemToDelete.key)
  if (startItem) {
    // delete item and all his children
    startItem.deleted = !startItem.deleted
    for (let i = 0; i < startItem.children.length; i++) {
      deleteItemFromTree(startItem.children, startItem.children[i])
    }
  }
}

/**
 * Alter item's title
 * @param {TreeItem[]} cache - current view tree
 * @param {TreeItem} item - item to be altered
 *
 */
export const alterItem = (cache: TreeItem[], itemToAltered: TreeItem) => {
  const flatTree = getFlattenTree(cache)
  const index = flatTree.findIndex(item => item.key === itemToAltered.key)
  if (index !== -1) {
    flatTree[index].title = itemToAltered.title
  }
  return flatTreeToViewTree(flatTree)
}

/**
 * Returns tree for given root node key
 * @param {DBTreeItemList} nodes - original DB with root
 * @param {string} parent - root node key. It can be any node element. Tree
 * will be created from received key
 * @returns {TreeItem[]}  - result tree
 */
export const getTree = (nodes: DBTreeItemList, parent: string): TreeItem[] => {
  const childrenItems = [] as TreeItem[]
  for (const key in nodes) {
    if (nodes[key].parent === parent) {
      const children = getTree(nodes, key)
      childrenItems.push({ ...nodes[key], ...{ children } })
    }
  }
  return childrenItems
}

/**
 * Returns tree for given flat tree. Root will be finded throughout received
 * array with empty parent
 * @param {DBTreeItemList} nodes - flat tree. Only root has no parent
 * @returns {TreeItem[]}  - result tree
 */
export const adoptDBItemsToTree = (
  items: DBTreeItemList = {} as DBTreeItemList
): TreeItem[] => {
  const treeItems = [] as TreeItem[]
  const rootItem = { ...items[rootDBKey] }
  // check for existing root item. If we have no root, than return empty array
  if (rootItem.key) {
    const children = getTree(items, rootItem.key)
    treeItems.push({ ...rootItem, children })
  }

  return treeItems
}

/**
 * returns flatten tree
 * @param {TreeItem[]} tree - tree for flatting
 * @returns {TreeItem[]} nodes - flat tree
 */
export const getFlattenTree = (tree: TreeItem[]): TreeItem[] => {
  const resultFlatTree = [] as TreeItem[]
  for (const i in tree) {
    const children = getFlattenTree(tree[i].children)
    resultFlatTree.push({ ...tree[i], children: [] }, ...children)
  }
  return resultFlatTree
}

/**
 * get all keys array
 */
export const getKeys = (tree: TreeItem[]): string[] => {
  const keys = [] as string[]
  const flatTree = getFlattenTree(tree)
  for (const i in flatTree) {
    keys.push(flatTree[i].key)
  }
  return keys
}
