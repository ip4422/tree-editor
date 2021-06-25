/**
 * Original DB item type
 * @typedef DBTreeItem
 * @type {object}
 * @property {string} title - some string value
 * @property {string} parent -  "key" of parent element. '' - has no parent.
 * DB may contain only one root element with "key" === ''
 * @property {boolean} deleted -  deleted flag
 */
export interface DBTreeItem {
  title: string
  parent: string
  deleted: boolean
  key: string
}

/**
 * Interface for using with antd Tree component
 * @typedef TreeItem
 * @property {TreeItem[]} children -  children items
 */
export interface TreeItem extends DBTreeItem {
  children: TreeItem[]
}

/**
 * Origianl DB as flat tree
 * @typedef DBTreeItemList
 * @type {object}
 * @property {string} key - pair of unique key of element and element iteself
 */
export interface DBTreeItemList {
  [key: string]: DBTreeItem
}
