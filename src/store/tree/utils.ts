import { TreeItem, DBTreeItemList } from './types'

export const getItemsById = (
  sourceDBItems: TreeItem[],
  idList: string[]
): TreeItem[] => {
  return [] as TreeItem[]
}

/**
 * Returns root node
 * @param {DBTreeItemList} nodes - flat tree. Only root has no parent
 * @returns {TreeItem} - root node object
 */
export const getRootNode = (nodes: DBTreeItemList): TreeItem => {
  for (let key in nodes) {
    if (!nodes[key].parent) {
      return { ...nodes[key] }
    }
  }
  return {} as TreeItem
}

/**
 * Returns tree for given root node key
 * @param {DBTreeItemList} nodes - flat tree. Only root has no parent
 * @param {string} parent - root node key. It can be any node element. Tree
 * will be created from received key
 * @returns {TreeItem[]}  - result tree
 */
export const getNestedNodes = (
  nodes: DBTreeItemList,
  parent: string
): TreeItem[] => {
  const nestedNodes = [] as TreeItem[]
  for (const key in nodes) {
    if (nodes[key].parent === parent) {
      const children = getNestedNodes(nodes, key)
      // don't push empty children
      let nestedNode = { ...nodes[key], ...(children.length && { children }) }
      nestedNodes.push(nestedNode)
    }
  }
  return nestedNodes
}

/**
 * Returns tree for given flat tree. Root will be finded throughout received
 * array with empty parent (null | undefined | '')
 * @param {DBTreeItemList} nodes - flat tree. Only root has no parent
 * @returns {TreeItem[]}  - result tree
 */
export const adoptDBItemsToTree = (items: DBTreeItemList): TreeItem[] => {
  const treeItems = [] as TreeItem[]
  const rootItem = getRootNode(items)
  // check for existing root item. If we have no root, than return empty array
  if (rootItem.key) {
    const children = getNestedNodes(items, rootItem.key)
    // don't push empty children
    if (children.length) {
      rootItem.children = children
    }
    treeItems.push(rootItem)
  }

  return treeItems
}
