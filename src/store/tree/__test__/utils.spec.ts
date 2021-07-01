import { defaultDBFlatTree, rootDBKey } from '../constants'
import {
  getItemByKey,
  moveToParentByStep,
  reorderTree,
  deleteItem,
  markItemAsDeleted,
  markFlatTreeItemAsDeleted,
  alterItem,
  addItemToTree,
  adoptDBItemsToTree,
  getFlatTreeItemsArray,
  getTreeFromFlatDB,
  getKeysFromFlatTree,
  generateUniqueKey,
  getFlatTreeItemsByKeys,
  applyCache
} from '../utils'

/**
 * Default tree. key of each element is unique value. It used as a
 * pointer to parent element.
 * Root element has parent === ''
 */
const testTree = [
  {
    title: 'root title',
    parent: '',
    deleted: false,
    key: '0',
    children: [
      {
        title: 'child of root - 0',
        parent: '0',
        deleted: false,
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            parent: '0-0',
            deleted: false,
            key: '0-0-0',
            children: []
          },
          {
            title: '0-0-1',
            parent: '0-0',
            deleted: false,
            key: '0-0-1',
            children: [
              {
                title: '0-0-0-0',
                parent: '0-0-1',
                deleted: false,
                key: '0-0-0-0',
                children: []
              },
              {
                title: '0-0-0-1',
                parent: '0-0-1',
                deleted: false,
                key: '0-0-0-1',
                children: [
                  {
                    title: '0-0-0-0-0',
                    parent: '0-0-0-1',
                    deleted: false,
                    key: '0-0-0-0-0',
                    children: []
                  }
                ]
              },
              {
                title: '0-0-0-2',
                parent: '0-0-1',
                deleted: false,
                key: '0-0-0-2',
                children: []
              }
            ]
          },
          {
            title: '0-0-2',
            parent: '0-0',
            deleted: false,
            key: '0-0-2',
            children: []
          }
        ]
      },
      {
        title: 'child of root - 1',
        parent: '0',
        deleted: false,
        key: '0-1',
        children: [
          {
            title: '0-1-0',
            parent: '0-1',
            deleted: false,
            key: '0-1-0',
            children: []
          },
          {
            title: '0-1-1',
            parent: '0-1',
            deleted: false,
            key: '0-1-1',
            children: []
          },
          {
            title: '0-1-2',
            parent: '0-1',
            deleted: false,
            key: '0-1-2',
            children: []
          }
        ]
      },
      {
        title: 'child of root - 2',
        parent: '0',
        deleted: false,
        key: '0-2',
        children: []
      }
    ]
  }
]

describe('test functions with empty data', () => {
  it('getItemByKey. Should return null as a founded item', () => {
    let tree = getItemByKey()
    expect(tree).toBe(null)
  })

  it('moveToParentByStep. Should return null as a result moved item', () => {
    let tree = moveToParentByStep()
    expect(tree).toBe(null)
  })

  it('reorderTree. Should return [] as a result ordering without data', () => {
    let tree = reorderTree()
    expect(tree).toEqual([])
  })

  it('deleteItem. Should return [] as a result ordering without data', () => {
    let tree = deleteItem()
    expect(tree).toEqual([])
  })

  it('markItemAsDeleted. Should not to throw an error', () => {
    expect(() => {
      markItemAsDeleted()
    }).not.toThrow()
  })

  it('markFlatTreeItemAsDeleted. Should not to throw an error', () => {
    expect(() => {
      markFlatTreeItemAsDeleted()
    }).not.toThrow()
  })

  it('alterItem. Should return [] as a result altering item without data', () => {
    let tree = alterItem()
    expect(tree).toEqual([])
  })

  it('addItemToTree. Should return [] with empty children as a result altering item without data', () => {
    let tree = addItemToTree()
    expect(tree).toEqual([{ children: [] }])
  })

  it('getFlatTreeItemsArray. Should return [] without data', () => {
    let tree = getFlatTreeItemsArray()
    expect(tree).toEqual([])
  })

  it('getTreeFromFlatDB. Should return [] without data', () => {
    let tree = getTreeFromFlatDB()
    expect(tree).toEqual([])
  })

  it('adoptDBItemsToTree. Should return empty array as a result tree', () => {
    let tree = adoptDBItemsToTree()
    expect(tree).toEqual([])
  })

  it('getKeysFromFlatTree. Should return [] if call without data', () => {
    let keys = getKeysFromFlatTree()
    expect(keys).toEqual([])
  })

  it('generateUniqueKey. Should return "undefined-0" if call without data', () => {
    let keys = generateUniqueKey()
    expect(keys).toBe('undefined-0')
  })

  it('getFlatTreeItemsByKeys. Should return [] if call without data', () => {
    let tree = getFlatTreeItemsByKeys()
    expect(tree).toEqual([])
  })

  it('applyCache. Should return [], [] if call without data', () => {
    let keys = applyCache()
    expect(keys).toEqual([[], []])
  })
})

describe('should work with existing data correctly', () => {
  it("should find tree's item with received array", () => {
    const treeItem = {
      title: '0-0-0-0-0',
      parent: '0-0-0-1',
      deleted: false,
      key: '0-0-0-0-0',
      children: []
    }
    const foundItem = getItemByKey(testTree, treeItem.key)
    expect(foundItem).toEqual(treeItem)
  })

  it('should reorder tree', () => {
    const disorderedTree = [
      {
        title: '0-0-0-0-0',
        parent: '0-0-0-1',
        deleted: false,
        key: '0-0-0-0-0',
        children: []
      },
      {
        title: '0-0-0-0',
        parent: '0-0-1',
        deleted: false,
        key: '0-0-0-0',
        children: []
      },
      {
        title: 'child of root - 0',
        parent: '0',
        deleted: false,
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            parent: '0-0',
            deleted: false,
            key: '0-0-0',
            children: []
          },
          {
            title: '0-0-2',
            parent: '0-0',
            deleted: false,
            key: '0-0-2',
            children: []
          }
        ]
      },
      {
        title: '0-0-1',
        parent: '0-0',
        deleted: false,
        key: '0-0-1'
      }
    ]

    const orderedTree = [
      {
        title: '0-0-0-0-0',
        parent: '0-0-0-1',
        deleted: false,
        key: '0-0-0-0-0',
        children: []
      },
      {
        title: 'child of root - 0',
        parent: '0',
        deleted: false,
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            parent: '0-0',
            deleted: false,
            key: '0-0-0',
            children: []
          },
          {
            title: '0-0-2',
            parent: '0-0',
            deleted: false,
            key: '0-0-2',
            children: []
          },
          {
            title: '0-0-1',
            parent: '0-0',
            deleted: false,
            key: '0-0-1',
            children: [
              {
                title: '0-0-0-0',
                parent: '0-0-1',
                deleted: false,
                key: '0-0-0-0',
                children: []
              }
            ]
          }
        ]
      }
    ]
    const resultTree = reorderTree(disorderedTree)
    expect(resultTree).toEqual(orderedTree)
  })

  it('deleteItem. Should return array with deleted items', () => {
    const resultDeletedTree = [
      {
        title: 'root title',
        parent: '',
        deleted: false,
        key: '0',
        children: [
          {
            title: 'child of root - 0',
            parent: '0',
            deleted: true,
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                parent: '0-0',
                deleted: true,
                key: '0-0-0',
                children: []
              },
              {
                title: '0-0-1',
                parent: '0-0',
                deleted: true,
                key: '0-0-1',
                children: [
                  {
                    title: '0-0-0-0',
                    parent: '0-0-1',
                    deleted: true,
                    key: '0-0-0-0',
                    children: []
                  },
                  {
                    title: '0-0-0-1',
                    parent: '0-0-1',
                    deleted: true,
                    key: '0-0-0-1',
                    children: [
                      {
                        title: '0-0-0-0-0',
                        parent: '0-0-0-1',
                        deleted: true,
                        key: '0-0-0-0-0',
                        children: []
                      }
                    ]
                  },
                  {
                    title: '0-0-0-2',
                    parent: '0-0-1',
                    deleted: true,
                    key: '0-0-0-2',
                    children: []
                  }
                ]
              },
              {
                title: '0-0-2',
                parent: '0-0',
                deleted: true,
                key: '0-0-2',
                children: []
              }
            ]
          },
          {
            title: 'child of root - 1',
            parent: '0',
            deleted: false,
            key: '0-1',
            children: [
              {
                title: '0-1-0',
                parent: '0-1',
                deleted: false,
                key: '0-1-0',
                children: []
              },
              {
                title: '0-1-1',
                parent: '0-1',
                deleted: false,
                key: '0-1-1',
                children: []
              },
              {
                title: '0-1-2',
                parent: '0-1',
                deleted: false,
                key: '0-1-2',
                children: []
              }
            ]
          },
          {
            title: 'child of root - 2',
            parent: '0',
            deleted: false,
            key: '0-2',
            children: []
          }
        ]
      }
    ]

    const itemToDelete = {
      title: 'child of root - 0',
      parent: '0',
      deleted: false,
      key: '0-0',
      children: []
    }
    let tree = deleteItem(testTree, itemToDelete)
    expect(tree).toEqual(resultDeletedTree)
  })

  it('markItemAsDeleted. Should mutate received array (mark item as deleted)', () => {
    const tree = [
      {
        title: '0-0-1',
        parent: '0-0',
        deleted: false,
        key: '0-0-1',
        children: [
          {
            title: '0-0-0-0',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-0',
            children: []
          },
          {
            title: '0-0-0-1',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-1',
            children: [
              {
                title: '0-0-0-0-0',
                parent: '0-0-0-1',
                deleted: false,
                key: '0-0-0-0-0',
                children: []
              }
            ]
          },
          {
            title: '0-0-0-2',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-2',
            children: []
          }
        ]
      }
    ]

    const deletedTree = [
      {
        title: '0-0-1',
        parent: '0-0',
        deleted: false,
        key: '0-0-1',
        children: [
          {
            title: '0-0-0-0',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-0',
            children: []
          },
          {
            title: '0-0-0-1',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-1',
            children: [
              {
                title: '0-0-0-0-0',
                parent: '0-0-0-1',
                deleted: true,
                key: '0-0-0-0-0',
                children: []
              }
            ]
          },
          {
            title: '0-0-0-2',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-2',
            children: []
          }
        ]
      }
    ]

    markItemAsDeleted(tree, {
      title: '0-0-0-0-0',
      parent: '0-0-0-1',
      deleted: true,
      key: '0-0-0-0-0',
      children: []
    })
    expect(tree).toEqual(deletedTree)
  })

  it('markFlatTreeItemAsDeleted. Should set deleted flag from received item', () => {
    const flatTree = [
      {
        title: 'root title',
        parent: '',
        deleted: false,
        key: '0',
        children: []
      },
      {
        title: 'child of root - 2',
        parent: '0',
        deleted: false,
        key: '0-2',
        children: []
      },
      {
        title: '0-0-1',
        parent: '0-0',
        deleted: false,
        key: '0-0-1',
        children: []
      },
      {
        title: '0-0-0-2',
        parent: '0-0-1',
        deleted: false,
        key: '0-0-0-2',
        children: []
      },
      {
        title: '0-0-0-1',
        parent: '0-0-1',
        deleted: false,
        key: '0-0-0-1',
        children: []
      },
      {
        title: '0-0-2',
        parent: '0-0',
        deleted: false,
        key: '0-0-2',
        children: []
      }
    ]

    const flatTreeDeleted = [
      {
        title: 'root title',
        parent: '',
        deleted: false,
        key: '0',
        children: []
      },
      {
        title: 'child of root - 2',
        parent: '0',
        deleted: false,
        key: '0-2',
        children: []
      },
      {
        title: '0-0-1',
        parent: '0-0',
        deleted: true,
        key: '0-0-1',
        children: []
      },
      {
        title: '0-0-0-2',
        parent: '0-0-1',
        deleted: true,
        key: '0-0-0-2',
        children: []
      },
      {
        title: '0-0-0-1',
        parent: '0-0-1',
        deleted: true,
        key: '0-0-0-1',
        children: []
      },
      {
        title: '0-0-2',
        parent: '0-0',
        deleted: false,
        key: '0-0-2',
        children: []
      }
    ]

    const itemToDelete = {
      title: '0-0-1',
      parent: '0-0',
      deleted: true,
      key: '0-0-1',
      children: []
    }
    // set deleted to true
    markFlatTreeItemAsDeleted(flatTree, itemToDelete)
    expect(flatTree).toEqual(flatTreeDeleted)
  })

  it('alterItem. Should return tree with altered title from received item', () => {
    const sourceTree = [
      {
        title: '0-0-0',
        parent: '0-0',
        deleted: false,
        key: '0-0-0',
        children: []
      },
      {
        title: '0-0-1',
        parent: '0-0',
        deleted: false,
        key: '0-0-1',
        children: [
          {
            title: '0-0-0-0',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-0',
            children: []
          },
          {
            title: '0-0-0-1',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-1',
            children: [
              {
                title: '0-0-0-0-0',
                parent: '0-0-0-1',
                deleted: false,
                key: '0-0-0-0-0',
                children: []
              }
            ]
          },
          {
            title: '0-0-0-2',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-2',
            children: []
          }
        ]
      },
      {
        title: '0-0-2',
        parent: '0-0',
        deleted: false,
        key: '0-0-2',
        children: []
      }
    ]

    const resultTree = [
      {
        title: '0-0-0',
        parent: '0-0',
        deleted: false,
        key: '0-0-0',
        children: []
      },
      {
        title: '0-0-1',
        parent: '0-0',
        deleted: false,
        key: '0-0-1',
        children: [
          {
            title: 'test title',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-0',
            children: []
          },
          {
            title: '0-0-0-1',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-1',
            children: [
              {
                title: '0-0-0-0-0',
                parent: '0-0-0-1',
                deleted: false,
                key: '0-0-0-0-0',
                children: []
              }
            ]
          },
          {
            title: '0-0-0-2',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-2',
            children: []
          }
        ]
      },
      {
        title: '0-0-2',
        parent: '0-0',
        deleted: false,
        key: '0-0-2',
        children: []
      }
    ]

    const alteredItem = {
      title: 'test title',
      parent: '0-0-1',
      deleted: false,
      key: '0-0-0-0',
      children: []
    }

    let alteredTree = alterItem(sourceTree, alteredItem)
    expect(alteredTree).toEqual(resultTree)
  })

  it('addItemToTree. Should return tree with added item', () => {
    const sourceTree = [
      {
        title: '0-0-0',
        parent: '0-0',
        deleted: false,
        key: '0-0-0',
        children: []
      },
      {
        title: '0-0-1',
        parent: '0-0',
        deleted: false,
        key: '0-0-1',
        children: [
          {
            title: '0-0-0-0',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-0',
            children: []
          },
          {
            title: '0-0-0-1',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-1',
            children: []
          },
          {
            title: '0-0-0-2',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-2',
            children: []
          }
        ]
      },
      {
        title: '0-0-2',
        parent: '0-0',
        deleted: false,
        key: '0-0-2',
        children: []
      }
    ]

    // order different because we don't sort result array
    const resultTree = [
      {
        title: '0-0-0',
        parent: '0-0',
        deleted: false,
        key: '0-0-0',
        children: []
      },
      {
        title: '0-0-1',
        parent: '0-0',
        deleted: false,
        key: '0-0-1',
        children: [
          {
            title: '0-0-0-0',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-0',
            children: []
          },
          {
            title: '0-0-0-2',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-2',
            children: []
          },
          {
            title: '0-0-0-1',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-1',
            children: [
              {
                title: '0-0-0-0-0',
                parent: '0-0-0-1',
                deleted: false,
                key: '0-0-0-0-0',
                children: []
              }
            ]
          }
        ]
      },
      {
        title: '0-0-2',
        parent: '0-0',
        deleted: false,
        key: '0-0-2',
        children: []
      }
    ]

    const itemToAdd = {
      title: '0-0-0-0-0',
      parent: '0-0-0-1',
      deleted: false,
      key: '0-0-0-0-0',
      children: []
    }

    let tree = addItemToTree(sourceTree, itemToAdd)
    expect(tree).toEqual(resultTree)
  })

  it('getFlatTreeItemsArray. Should return flatten array', () => {
    const tree = [
      {
        title: 'root title',
        parent: '',
        deleted: false,
        key: '0',
        children: [
          {
            title: 'child of root - 2',
            parent: '0',
            deleted: false,
            key: '0-2',
            children: []
          }
        ]
      },
      {
        title: '0-0-1',
        parent: '0-0',
        deleted: false,
        key: '0-0-1',
        children: [
          {
            title: '0-0-0-2',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-2',
            children: []
          },
          {
            title: '0-0-0-1',
            parent: '0-0-1',
            deleted: false,
            key: '0-0-0-1',
            children: []
          }
        ]
      },
      {
        title: '0-0-2',
        parent: '0-0',
        deleted: false,
        key: '0-0-2',
        children: []
      }
    ]

    const flat = [
      {
        title: 'root title',
        parent: '',
        deleted: false,
        key: '0',
        children: []
      },
      {
        title: 'child of root - 2',
        parent: '0',
        deleted: false,
        key: '0-2',
        children: []
      },
      {
        title: '0-0-1',
        parent: '0-0',
        deleted: false,
        key: '0-0-1',
        children: []
      },
      {
        title: '0-0-0-2',
        parent: '0-0-1',
        deleted: false,
        key: '0-0-0-2',
        children: []
      },
      {
        title: '0-0-0-1',
        parent: '0-0-1',
        deleted: false,
        key: '0-0-0-1',
        children: []
      },
      {
        title: '0-0-2',
        parent: '0-0',
        deleted: false,
        key: '0-0-2',
        children: []
      }
    ]

    const result = getFlatTreeItemsArray(tree)
    expect(result).toEqual(flat)
  })

  it('getTreeFromFlatDB. Should return tree from DB for received parent key', () => {
    const fullTree = adoptDBItemsToTree(
      defaultDBFlatTree,
      defaultDBFlatTree[rootDBKey].key
    )
    expect(fullTree).toEqual(testTree)
  })

  it('adoptDBItemsToTree. Should return full tree with nested nodes', () => {
    const fullTree = adoptDBItemsToTree(defaultDBFlatTree)
    expect(fullTree).toEqual(testTree)
  })

  it('adoptDBItemsToTree. should return tree if we have only root', () => {
    const testDBWithRoot = {
      '0': {
        title: 'root title',
        parent: '',
        deleted: false,
        key: '0'
      }
    }

    const testResultTree = [
      {
        title: 'root title',
        parent: '',
        deleted: false,
        key: '0',
        children: []
      }
    ]

    const fullTree = adoptDBItemsToTree(testDBWithRoot)
    expect(fullTree).toEqual(testResultTree)
  })

  it('getKeysFromFlatTree. Should return [] if call without data', () => {
    const resultKeys = [
      '0',
      '0-0',
      '0-0-0',
      '0-0-1',
      '0-0-0-0',
      '0-0-0-1',
      '0-0-0-0-0',
      '0-0-0-2',
      '0-0-2',
      '0-1',
      '0-1-0',
      '0-1-1',
      '0-1-2',
      '0-2'
    ]
    let keys = getKeysFromFlatTree(testTree)
    expect(keys).toEqual(resultKeys)
  })

  it('generateUniqueKey. Should return generated key for received parent', () => {
    const flatTree = [
      {
        title: 'root title',
        parent: '',
        deleted: false,
        key: '0',
        children: []
      },
      {
        title: 'child of root - 2',
        parent: '0',
        deleted: false,
        key: '0-2',
        children: []
      },
      {
        title: '0-0-1',
        parent: '0-0',
        deleted: false,
        key: '0-0-1',
        children: []
      },
      {
        title: '0-0-1-0',
        parent: '0-0-1',
        deleted: false,
        key: '0-0-1-0',
        children: []
      },
      {
        title: '0-0-1-1',
        parent: '0-0-1',
        deleted: false,
        key: '0-0-1-1',
        children: []
      },
      {
        title: '0-0-2',
        parent: '0-0',
        deleted: false,
        key: '0-0-2',
        children: []
      }
    ]

    let keys = generateUniqueKey(flatTree, '0-0-1')
    expect(keys).toBe('0-0-1-2')
  })

  it('getFlatTreeItemsByKeys. Should return array of TreeItem by received keys', () => {
    const keys = [
      '0-0-0-0',
      '0-0-0-1',
      '0-0-0-2',
      '0-0-0',
      '0-0-1',
      '0-0-2',
      '0-0-0-0-0'
    ]
    const resultItems = [
      {
        title: '0-0-0-0',
        parent: '0-0-1',
        deleted: false,
        key: '0-0-0-0',
        children: []
      },
      {
        title: '0-0-0-1',
        parent: '0-0-1',
        deleted: false,
        key: '0-0-0-1',
        children: []
      },
      {
        title: '0-0-0-2',
        parent: '0-0-1',
        deleted: false,
        key: '0-0-0-2',
        children: []
      },
      {
        title: '0-0-0',
        parent: '0-0',
        deleted: false,
        key: '0-0-0',
        children: []
      },
      {
        title: '0-0-1',
        parent: '0-0',
        deleted: false,
        key: '0-0-1',
        children: []
      },
      {
        title: '0-0-2',
        parent: '0-0',
        deleted: false,
        key: '0-0-2',
        children: []
      },
      {
        title: '0-0-0-0-0',
        parent: '0-0-0-1',
        deleted: false,
        key: '0-0-0-0-0',
        children: []
      }
    ]
    let items = getFlatTreeItemsByKeys(getFlatTreeItemsArray(testTree), keys)
    expect(items).toEqual(resultItems)
  })

  it('applyCache. Should return cache and source DB with changes', () => {
    const sourceDB = [
      {
        title: 'root title',
        parent: '',
        deleted: false,
        key: '0',
        children: [
          {
            title: 'child of root - 0',
            parent: '0',
            deleted: false,
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                parent: '0-0',
                deleted: false,
                key: '0-0-0',
                children: []
              },
              {
                title: '0-0-1',
                parent: '0-0',
                deleted: false,
                key: '0-0-1',
                children: [
                  {
                    title: '0-0-0-0',
                    parent: '0-0-1',
                    deleted: false,
                    key: '0-0-0-0',
                    children: []
                  },
                  {
                    title: '0-0-0-1',
                    parent: '0-0-1',
                    deleted: false,
                    key: '0-0-0-1',
                    children: [
                      {
                        title: '0-0-0-0-0',
                        parent: '0-0-0-1',
                        deleted: false,
                        key: '0-0-0-0-0',
                        children: []
                      }
                    ]
                  },
                  {
                    title: '0-0-0-2',
                    parent: '0-0-1',
                    deleted: false,
                    key: '0-0-0-2',
                    children: []
                  }
                ]
              },
              {
                title: '0-0-2',
                parent: '0-0',
                deleted: false,
                key: '0-0-2',
                children: []
              }
            ]
          },
          {
            title: 'child of root - 1',
            parent: '0',
            deleted: false,
            key: '0-1',
            children: [
              {
                title: '0-1-0',
                parent: '0-1',
                deleted: false,
                key: '0-1-0',
                children: []
              },
              {
                title: '0-1-1',
                parent: '0-1',
                deleted: false,
                key: '0-1-1',
                children: []
              },
              {
                title: '0-1-2',
                parent: '0-1',
                deleted: false,
                key: '0-1-2',
                children: []
              }
            ]
          },
          {
            title: 'child of root - 2',
            parent: '0',
            deleted: false,
            key: '0-2',
            children: []
          }
        ]
      }
    ]

    const resultDBItems = [
      {
        title: 'root title',
        parent: '',
        deleted: false,
        key: '0',
        children: [
          {
            title: 'child of root - 0- test changes',
            parent: '0',
            deleted: true,
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                parent: '0-0',
                deleted: true,
                key: '0-0-0',
                children: []
              },
              {
                title: '0-0-1',
                parent: '0-0',
                deleted: true,
                key: '0-0-1',
                children: [
                  {
                    title: '0-0-0-0',
                    parent: '0-0-1',
                    deleted: true,
                    key: '0-0-0-0',
                    children: []
                  },
                  {
                    title: '0-0-0-1',
                    parent: '0-0-1',
                    deleted: true,
                    key: '0-0-0-1',
                    children: [
                      {
                        title: '0-0-0-0-0',
                        parent: '0-0-0-1',
                        deleted: true,
                        key: '0-0-0-0-0',
                        children: []
                      }
                    ]
                  },
                  {
                    title: '0-0-0-2',
                    parent: '0-0-1',
                    deleted: true,
                    key: '0-0-0-2',
                    children: []
                  }
                ]
              },
              {
                title: '0-0-2',
                parent: '0-0',
                deleted: true,
                key: '0-0-2',
                children: []
              }
            ]
          },
          {
            title: 'child of root - 1',
            parent: '0',
            deleted: false,
            key: '0-1',
            children: [
              {
                title: '0-1-0',
                parent: '0-1',
                deleted: false,
                key: '0-1-0',
                children: []
              },
              {
                title: '0-1-1',
                parent: '0-1',
                deleted: false,
                key: '0-1-1',
                children: []
              },
              {
                title: '0-1-2',
                parent: '0-1',
                deleted: false,
                key: '0-1-2',
                children: []
              }
            ]
          },
          {
            title: 'child of root - 2',
            parent: '0',
            deleted: false,
            key: '0-2',
            children: []
          }
        ]
      }
    ]

    const cache = [
      {
        title: '0-0-0-0-0',
        parent: '0-0-0-1',
        deleted: false,
        key: '0-0-0-0-0',
        children: []
      },
      {
        title: '0-0-0-0',
        parent: '0-0-1',
        deleted: false,
        key: '0-0-0-0',
        children: []
      },
      {
        title: 'root title',
        parent: '',
        deleted: false,
        key: '0',
        children: [
          {
            title: 'child of root - 0- test changes',
            parent: '0',
            deleted: true,
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                parent: '0-0',
                deleted: true,
                key: '0-0-0',
                children: []
              }
            ]
          }
        ]
      }
    ]
    const resultDBCache = [
      {
        title: '0-0-0-0-0',
        parent: '0-0-0-1',
        deleted: true,
        key: '0-0-0-0-0',
        children: []
      },
      {
        title: '0-0-0-0',
        parent: '0-0-1',
        deleted: true,
        key: '0-0-0-0',
        children: []
      },
      {
        title: 'root title',
        parent: '',
        deleted: false,
        key: '0',
        children: [
          {
            title: 'child of root - 0- test changes',
            parent: '0',
            deleted: true,
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                parent: '0-0',
                deleted: true,
                key: '0-0-0',
                children: []
              }
            ]
          }
        ]
      }
    ]

    let keys = applyCache(sourceDB, cache)
    expect(keys).toEqual([resultDBItems, resultDBCache])
  })
})
