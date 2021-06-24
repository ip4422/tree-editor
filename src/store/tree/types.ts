/**
 * Interface for using with antd Tree component
 * @typedef TreeItem
 * @type {object}
 * @property {string} title - some string value from DB
 * (title === DBTreeItem.value)
 * @property {boolean} deleted -  deleted flag
 * @property {number} parent -  ID of parent element. -1 - has no parent.
 * DB may contain only one root element with ID === -1
 * @property {string} key -  unique key value for antd Tree component
 */
export interface TreeItem {
  title: string
  parent: string
  deleted: boolean
  key: string
  children?: TreeItem[]
}

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
 * Origianl DB as flat tree
 * @typedef DBTreeItemList
 * @type {object}
 * @property {string} key - pair of unique key of element and element iteself
 */
export interface DBTreeItemList {
  [key: string]: DBTreeItem
}
