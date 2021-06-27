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
 * Find child item by his parent key and delete it from cache than return it
 * @param {TreeItem[]} items - array of TreeItem to find with
 * @param {string} key - key of searched item
 * @returns {TreeItem | null} - link to item with received key
 */
// TODO: probably remove
export const extractChildByKey = (
  items: TreeItem[],
  key: string
): TreeItem | null => {
  if (items.length) {
    let result = null
    for (let i = 0; result == null && i < items.length; i++) {
      if (items[i].parent === key) {
        const result = items[i]
        items.splice(i, 1)
        return result
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
// TODO: probably remove after refactoring alterItem
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
// TODO: probably remove after refactoring alterItem
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

// TODO: documentation
const getIndexOfChildChain = (
  items: DBTreeItem[],
  pos: number,
  parentKey: string
): number => {
  // pointer for case when we got to end of array
  let pointer = pos
  for (let i = pos; i < items.length; i++) {
    if (items[i].parent !== parentKey) {
      return i
    }
    pointer++
  }
  return pointer
}

/**
 * Reorder flat tree
 * @param {DBTreeItem[]} tree - flat tree to ordering
 * @returns {DBTreeItem[]} - ordered flat tree
 */
// now it push before other children and ordering changing
export const reorderFlatTree = (
  tree: DBTreeItem[] = [] as DBTreeItem[]
): DBTreeItem[] => {
  const orderedTree = [] as DBTreeItem[]
  if (tree.length) {
    const currentItem = { ...tree[0] }
    orderedTree.push(currentItem)
    // start from second item cause we already push initial item
    for (let i = 1; i < tree.length; i++) {
      // check for root item first
      if (tree[i].parent) {
        // check for existing direct parent in ordered items
        let pos = orderedTree.findIndex(item => item.key === tree[i].parent)
        if (pos >= 0) {
          const lastChildChain = getIndexOfChildChain(
            orderedTree,
            pos + 1,
            tree[i].parent
          )
          orderedTree.splice(lastChildChain, 0, {
            ...tree[i]
          })
        } else {
          // check for existing direct children in ordered items
          pos = orderedTree.findIndex(item => item.parent === tree[i].key)
          if (pos >= 0) {
            orderedTree.splice(pos, 0, {
              ...tree[i]
            })
          } else {
            // if no direct parent and children in ordered tree
            orderedTree.push({ ...tree[i] })
          }
        }
      } else {
        orderedTree.splice(0, 0, { ...tree[i] })
      }
    }
  }
  return orderedTree
}

/**
 * Mark item as "deleted". Preparing array for changing and call
 * recursive delete function on prepared array
 * @param {TreeItem[]} cache - current view tree
 * @param {TreeItem} item - item to be deleted
 *
 */
// TODO: rename to markAsDeleted or something else
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
// TODO: rename to markAsDeleted
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
 * mark item in DBTreeItem[] as deleted
 * @param {DBTreeItem[]} dbItems - dbItems array where we should mark item deleted
 * @param {TreeItem} item - item to be deleted
 */
const markDBTreeItemAsDeleted = (
  dbItems: DBTreeItem[],
  itemToDelete: DBTreeItem
) => {
  // first step delete item itself
  const pos = dbItems.findIndex(dbItem => dbItem.key === itemToDelete.key)
  if (pos !== -1) {
    dbItems[pos].deleted = itemToDelete.deleted
  }
  // delete children
  const childrens = dbItems.filter(dbItem => dbItem.parent === itemToDelete.key)
  for (let i = 0; i < childrens.length; i++) {
    childrens[i].deleted = itemToDelete.deleted
    markDBTreeItemAsDeleted(dbItems, childrens[i])
  }
}

/**
 * Alter item's title
 * @param {TreeItem[]} cache - current view tree
 * @param {TreeItem} item - item to be altered
 *
 */
// TODO: refactore without flat tree
export const alterItem = (cache: TreeItem[], itemToAltered: TreeItem) => {
  const flatTree = getFlattenTree(cache)
  const index = flatTree.findIndex(item => item.key === itemToAltered.key)
  if (index !== -1) {
    flatTree[index].title = itemToAltered.title
  }
  return flatTreeToViewTree(flatTree)
}

/**
 * Add item to tree
 * @param {TreeItem[]} cache - current view tree
 * @param {TreeItem} item - item to be added
 * @returns {TreeItem[]} - result tree with new item
 */
export const addItemToTree = (
  tree: TreeItem[],
  newItem: TreeItem
): TreeItem[] => {
  const flatTree = getFlatDBTreeItemArray(tree)
  if (flatTree.findIndex(item => item.key === newItem.key) === -1) {
    flatTree.push(newItem)
  }
  const orderedTree = reorderFlatTree(flatTree)

  return dbTreeItemToTreeItem(orderedTree)
}

/**
 * returns flatten tree
 * @param {TreeItem[]} tree - tree for flatting
 * @returns {DBTreeItem[]} nodes - flat tree
 */
export const getFlatDBTreeItemArray = (tree: TreeItem[]): DBTreeItem[] => {
  const resultFlatTree = [] as DBTreeItem[]
  for (const i in tree) {
    const childs = getFlatDBTreeItemArray(tree[i].children)
    const { children, ...rest } = tree[i]
    resultFlatTree.push({ ...rest }, ...childs)
  }
  return resultFlatTree
}

/**
 * Returns tree for given root node key
 * @param {TreeItem[]} nodes - flat tree. Only root has no parent
 * @param {string} parent - root node key. It can be any node element. Tree
 * will be created from received key
 * @returns {TreeItem[]}  - result tree
 */
export const getChildrenArray = (
  nodes: DBTreeItem[],
  parent: string
): TreeItem[] => {
  const childrenItems = [] as TreeItem[]
  for (const key in nodes) {
    if (nodes[key].parent === parent) {
      const children = getChildrenArray(nodes, nodes[key].key)
      childrenItems.push({
        ...{ ...nodes[key], children: [] },
        ...{ children }
      })
    }
  }
  return childrenItems
}

/**
 * Returns root node
 * @param {TreeItem[]} nodes - flat tree. Only root has no parent
 * @returns {TreeItem} - root node object
 */
export const getRootNode = (nodes: DBTreeItem[]): TreeItem => {
  for (let key in nodes) {
    if (!nodes[key].parent) {
      return { ...nodes[key], children: [] as TreeItem[] }
    }
  }
  return {} as TreeItem
}

/**
 * Returns tree for given flat tree with root or without root
 * @param {DBTreeItem[]} nodes - flat tree. Only root has no parent
 * @returns {TreeItem[]}  - result tree
 */
export const dbTreeItemToTreeItem = (items: DBTreeItem[]): TreeItem[] => {
  const treeItems = [] as TreeItem[]
  const rootItem = getRootNode(items)
  // check for existing root item. If we have no root, than return empty array
  if (rootItem.key) {
    const children = getChildrenArray(items, rootItem.key)
    rootItem.children = children
    treeItems.push(rootItem)
  }
  for (let i in items) {
    if (!getItemByKey(treeItems, items[i].key)) {
      const parent = getItemByKey(treeItems, items[i].parent)
      if (parent) {
        const children = getChildrenArray(items, items[i].parent)
        parent.children.push(...children)
      } else {
        const children = getChildrenArray(items, items[i].key)
        const item = { ...items[i], children }
        treeItems.push(item)
      }
    }
  }
  return treeItems
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

// TODO: probably remove
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
 * get all keys array from tree
 */
export const getKeys = (tree: TreeItem[]): string[] => {
  const keys = [] as string[]
  const flatTree = getFlattenTree(tree)
  for (const i in flatTree) {
    keys.push(flatTree[i].key)
  }
  return keys
}

/**
 * Generate unuque key for new item. It based on real DB items keys.
 */
const generateUniqueKey = (dbItems: DBTreeItem[], parentKey: string) => {
  // maxCount for prevent infinity loop
  const maxCount = 1000
  let appendIndexCount = 0
  while (appendIndexCount < maxCount) {
    const key = `${parentKey}-${appendIndexCount}`
    if (dbItems.findIndex(item => item.key === key) === -1) {
      return key
    }
    appendIndexCount++
  }
  return `${parentKey}-error`
}

const getDBTreeItemsByKeys = (
  dbItems: DBTreeItem[],
  keys: string[]
): DBTreeItem[] => {
  const resultDBItems = [] as DBTreeItem[]
  for (let i = 0; i < keys.length; i++) {
    const item = dbItems.find(dbItem => dbItem.key === keys[i])
    if (item) {
      resultDBItems.push({ ...item })
    }
  }
  return resultDBItems
}
/**
 * Apply cache to DB
 */
export const applyCache = (
  dbItems: TreeItem[],
  cache: TreeItem[]
): [TreeItem[], TreeItem[]] => {
  const resultDBItems = getFlatDBTreeItemArray(dbItems)
  const resultCache = getFlatDBTreeItemArray(cache)

  for (let i = 0; i < resultCache.length; i++) {
    const currentItem = resultCache[i]
    const posItem = resultDBItems.findIndex(
      item => item.key === currentItem.key
    )
    if (posItem !== -1) {
      // if item exist then updating
      resultDBItems[posItem] = { ...currentItem }
      markDBTreeItemAsDeleted(resultDBItems, currentItem)
    } else {
      // if new item
      const uniqueKey = generateUniqueKey(dbItems, currentItem.parent)
      resultDBItems.push({ ...currentItem, key: uniqueKey })
      // replace old key by unique one
      resultCache[i].key = uniqueKey
    }
  }
  const orderedResultDBItems = reorderFlatTree(resultDBItems)
  // get all keys to update cache. Some items may be deleted after apply
  const keys = []
  let orderedResultCache = [] as DBTreeItem[]
  for (let i = 0; i < resultCache.length; i++) {
    keys.push(resultCache[i].key)
    orderedResultCache = reorderFlatTree(
      getDBTreeItemsByKeys(resultDBItems, keys)
    )
  }

  return [
    dbTreeItemToTreeItem(orderedResultDBItems),
    dbTreeItemToTreeItem(orderedResultCache)
  ]
}
