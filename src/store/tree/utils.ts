import { cloneDeep } from 'lodash'
import { TreeItem, DBTreeItemList, DBTreeItem } from './types'
import { rootDBKey, maxIterationCount } from './constants'

/**
 * Find item in tree by key
 * @param {TreeItem[]} items - array of TreeItem to find with
 * @param {string} key - key of searched item
 * @returns {TreeItem | null} - link to item with received key
 */
export const getItemByKey = (
  items: TreeItem[] = [],
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
 * Check for each item for child existing. If child exists than go to next
 * loop. If there ar not child than finding parent. If parent found than we
 * extract current item from array and put to parent. If parent was not
 * finded too, than go to next loop.
 * If No child and no parent for each element mean that we have ordered tree
 * @param {TreeItem[]} items - array of TreeItem to move item to his parent
 * @returns {TreeItem | null} - item wich was moved to parent
 */
export const moveToParentByStep = (items: TreeItem[] = []): TreeItem | null => {
  let result = null
  if (items.length) {
    for (let i = 0; result == null && i < items.length; i++) {
      // check for existing children
      if (items.findIndex(item => item.parent === items[i].key) === -1) {
        // check for existing parent
        const parent = items.find(item => item.key === items[i].parent)
        if (parent) {
          result = items[i]
          items.splice(i, 1)
          parent.children.push(result)
          return result
        }
      }
    }
  }
  return result
}

/**
 * Reorder tree. Takes tree and place childrens to its parents.
 * @param {TreeItem[]} tree - disordered or ordered tree. Tree will be
 * rebuild anyway
 * @returns {TreeItem[]} - ordered tree
 */
export const reorderTree = (tree: TreeItem[]): TreeItem[] => {
  let result = getFlatTreeItemsArray(tree)
  let limiter = 0
  let movedChild = null
  do {
    movedChild = moveToParentByStep(result)
    limiter++
  } while (movedChild != null && limiter < maxIterationCount)
  return result
}

/**
 * Mark item as "deleted". Preparing array for changing and call
 * recursive delete function on prepared array
 * @param {TreeItem[]} cache - current view tree
 * @param {TreeItem} item - item to be deleted
 *
 */
export const deleteItem = (
  cache: TreeItem[] = [],
  itemToDelete: TreeItem = {} as TreeItem
) => {
  const cacheTree = cloneDeep(cache)
  markItemAsDeleted(cacheTree, itemToDelete)
  return cacheTree
}

/**
 * Mark item as "deleted" recursively from entire tree
 * @param {TreeItem[]} cache - current view tree
 * @param {TreeItem} item - item to be deleted
 *
 */
export const markItemAsDeleted = (
  tree: TreeItem[],
  itemToDelete: TreeItem = {} as TreeItem
) => {
  const startItem = getItemByKey(tree, itemToDelete.key)
  if (startItem) {
    // delete item and all his children
    startItem.deleted = !startItem.deleted
    for (let i = 0; i < startItem.children.length; i++) {
      markItemAsDeleted(startItem.children, startItem.children[i])
    }
  }
}

/**
 * mark item in flat array TreeItem[] as deleted
 * @param {TreeItem[]} items - items array where we should mark item deleted
 * @param {TreeItem} item - item to be deleted
 */
export const markFlatTreeItemAsDeleted = (
  items: TreeItem[] = [],
  itemToDelete: TreeItem = {} as TreeItem
) => {
  // first step delete item itself
  const pos = items.findIndex(item => item.key === itemToDelete.key)
  if (pos !== -1) {
    items[pos].deleted = itemToDelete.deleted
  }
  // delete children
  const childrens = items.filter(dbItem => dbItem.parent === itemToDelete.key)
  for (let i = 0; i < childrens.length; i++) {
    childrens[i].deleted = itemToDelete.deleted
    markFlatTreeItemAsDeleted(items, childrens[i])
  }
}

/**
 * Alter item's title.
 * @param {TreeItem[]} cache - current view tree
 * @param {TreeItem} item - item to be altered
 * @returns {TreeItem[]} - returns new cache with altered item title
 */
export const alterItem = (
  cache: TreeItem[] = [],
  itemToAltered: TreeItem = {} as TreeItem
) => {
  const resultCache = cloneDeep(cache)
  const alterItem = getItemByKey(resultCache, itemToAltered.key)
  if (alterItem) {
    alterItem.title = itemToAltered.title
  }
  return resultCache
}

/**
 * Add item to tree
 * @param {TreeItem[]} cache - current view tree
 * @param {TreeItem} item - item to be added
 * @returns {TreeItem[]} - result tree with new item
 */
export const addItemToTree = (
  tree: TreeItem[] = [] as TreeItem[],
  newItem: TreeItem
): TreeItem[] => {
  const flatTree = getFlatTreeItemsArray(tree)
  if (flatTree.findIndex(item => item.key === newItem.key) === -1) {
    flatTree.push(newItem)
  }
  const orderedTree = reorderTree(flatTree)

  return orderedTree
}

/**
 * returns flatten tree from tree
 * @param {TreeItem[]} tree - tree for flatting
 * @returns {DBTreeItem[]} - flat tree
 */
export const getFlatTreeItemsArray = (tree: TreeItem[]): TreeItem[] => {
  const resultFlatTree = [] as TreeItem[]
  for (const i in tree) {
    const childs = getFlatTreeItemsArray(tree[i]?.children)
    resultFlatTree.push({ ...tree[i], children: [] }, ...childs)
  }
  return resultFlatTree
}

/**
 * Returns tree for given root node key from flat source DB
 * @param {DBTreeItemList} nodes - original DB with root
 * @param {string} parent - root node key. It can be any node element. Tree
 * will be created from received key
 * @returns {TreeItem[]}  - result tree
 */
export const getTreeFromFlatDB = (
  nodes: DBTreeItemList,
  parent: string
): TreeItem[] => {
  const childrenItems = [] as TreeItem[]
  for (const key in nodes) {
    if (nodes[key].parent === parent) {
      const children = getTreeFromFlatDB(nodes, key)
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
    const children = getTreeFromFlatDB(items, rootItem.key)
    treeItems.push({ ...rootItem, children })
  }

  return treeItems
}

/**
 * get all keys array from tree. For fetch updated items from
 * original DB to cache. Because delete operation may take effect
 * on missed cache items
 * @param {TreeItem[]} tree - flat tree of cache
 * @returns {string[]} - keys array
 */
export const getKeysFromFlatTree = (tree: TreeItem[]): string[] => {
  const keys = [] as string[]
  const flatTree = getFlatTreeItemsArray(tree)
  for (const i in flatTree) {
    keys.push(flatTree[i].key)
  }
  return keys
}

/**
 * Generate unuque key for new item. It based on real DB items keys.
 * @param {DBTreeItem[]} dbItems - source flat DB tree with original keys
 * @param {string} parentKey - key of parent wich will be base for build
 * unique key
 * @returns {string} - unique key
 */
export const generateUniqueKey = (
  dbItems: DBTreeItem[] = [],
  parentKey: string
): string => {
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

/**
 * Returns flat tree of TreeItem[] by received keys array
 * @param {TreeItem[]} items - source flat tree
 * @param {string[]} keys - list of items keys for return array of this items
 * @returns {TreeItem[]} - flat tree of items by received keys
 */
export const getFlatTreeItemsByKeys = (
  items: TreeItem[],
  keys: string[] = []
): TreeItem[] => {
  const resultItems = [] as TreeItem[]
  for (let i = 0; i < keys.length; i++) {
    const item = items.find(item => item.key === keys[i])
    if (item) {
      resultItems.push({ ...item })
    }
  }
  return resultItems
}

/**
 * Apply changis from cache to source DB
 * @param {TreeItem[]} sourceItems - source tree
 * @param {TreeItem[]} cache - cache tree
 * @returns {[TreeItem[], TreeItem[]]} - ordered trees
 * with applyed changes as [sourceItems, cache]
 *
 */
export const applyCache = (
  sourceItems: TreeItem[],
  cache: TreeItem[]
): [TreeItem[], TreeItem[]] => {
  const resultSourceItems = getFlatTreeItemsArray(sourceItems)
  const resultCache = getFlatTreeItemsArray(cache)

  for (let i = 0; i < resultCache.length; i++) {
    const currentItem = resultCache[i]
    const posItem = resultSourceItems.findIndex(
      item => item.key === currentItem.key
    )
    if (posItem !== -1) {
      // if item exist then updating
      resultSourceItems[posItem] = { ...currentItem }
      markFlatTreeItemAsDeleted(resultSourceItems, currentItem)
    } else {
      // if new item
      const uniqueKey = generateUniqueKey(sourceItems, currentItem.parent)
      resultSourceItems.push({ ...currentItem, key: uniqueKey })
      // replace old key by unique one
      resultCache[i].key = uniqueKey
    }
  }
  const orderedResultSourceItems = reorderTree(resultSourceItems)
  // get all keys to update cache. Some items may be deleted after apply
  const keys = []
  let orderedResultCache = [] as TreeItem[]
  for (let i = 0; i < resultCache.length; i++) {
    keys.push(resultCache[i].key)
    orderedResultCache = reorderTree(
      getFlatTreeItemsByKeys(resultSourceItems, keys)
    )
  }

  return [orderedResultSourceItems, orderedResultCache]
}
