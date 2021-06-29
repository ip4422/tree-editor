import { defaultDBFlatTree } from '../constants'
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
  getFlatTreeItemsArray
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
  it('adoptDBItemsToTree. Should return empty array as a result tree', () => {
    let tree = adoptDBItemsToTree()
    expect(tree).toEqual([])
  })

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
})

describe('should work with existing data correctly', () => {
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

  it('should return full tree with nested nodes', () => {
    const fullTree = adoptDBItemsToTree(defaultDBFlatTree)
    expect(fullTree).toEqual(testTree)
  })

  it('should return tree if we have only root', () => {
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

  // it("should return ordered tree from received random ordered items by their's keys", () => {
  //   const treeItems = [
  //     {
  //       title: 'root title',
  //       parent: '',
  //       deleted: false,
  //       key: '0',
  //       children: [
  //         {
  //           title: 'child of root - 2',
  //           parent: '0',
  //           deleted: false,
  //           key: '0-2',
  //           children: []
  //         }
  //       ]
  //     },
  //     {
  //       title: '0-0-1',
  //       parent: '0-0',
  //       deleted: false,
  //       key: '0-0-1',
  //       children: [
  //         {
  //           title: '0-0-0-2',
  //           parent: '0-0-1',
  //           deleted: false,
  //           key: '0-0-0-2',
  //           children: []
  //         },
  //         {
  //           title: '0-0-0-1',
  //           parent: '0-0-1',
  //           deleted: false,
  //           key: '0-0-0-1',
  //           children: []
  //         }
  //       ]
  //     },
  //     {
  //       title: '0-0-2',
  //       parent: '0-0',
  //       deleted: false,
  //       key: '0-0-2',
  //       children: []
  //     }
  //   ]

  //   const keys = ['0-0-0-2', '0-0-0-1', '0-0-2', '0-0-1', '0', '0-2']
  //   // 1
  //   // const keys = ['0-0-2', '0-0-0-1', '0-0-0-2', '0-0-0-0-0']
  //   // 2
  //   // const keys = ['0-0-2', '0-0-0-1', '0-0-0-2', '0-0-0-0-0', '0-0']
  //   const emptyItems = []
  //   const result = addItemsToTree(defaultDBFlatTree, emptyItems, keys)
  //   expect(result).toEqual(treeItems)
  // })

  it('should return flatten array', () => {
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
})
