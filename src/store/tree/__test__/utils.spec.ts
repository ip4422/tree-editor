import { defaultDBFlatTree } from '../constants'
import { getRootNode, getNestedNodes, adoptDBItemsToTree } from '../utils'


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
            key: '0-0-0'
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
                key: '0-0-0-0'
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
                    key: '0-0-0-0-0'
                  }
                ]
              },
              {
                title: '0-0-0-2',
                parent: '0-0-1',
                deleted: false,
                key: '0-0-0-2'
              }
            ]
          },
          {
            title: '0-0-2',
            parent: '0-0',
            deleted: false,
            key: '0-0-2'
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
            key: '0-1-0'
          },
          {
            title: '0-1-1',
            parent: '0-1',
            deleted: false,
            key: '0-1-1'
          },
          {
            title: '0-1-2',
            parent: '0-1',
            deleted: false,
            key: '0-1-2'
          }
        ]
      },
      {
        title: 'child of root - 2',
        parent: '0',
        deleted: false,
        key: '0-2'
      }
    ]
  }
]

describe('test functions with empty data', () => {
  it('should return empty root node', () => {
    let rootNode = getRootNode({})
    expect(rootNode).toEqual({})
    rootNode = getRootNode()
    expect(rootNode).toEqual({})
  })

  it('should return empty array as a nested nodes', () => {
    let nestedNodes = getNestedNodes()
    expect(nestedNodes).toEqual([])
    nestedNodes = getNestedNodes({}, '')
    expect(nestedNodes).toEqual([])
  })

  it('should return empty array as a result tree', () => {
    let tree = adoptDBItemsToTree()
    expect(tree).toEqual([])
  })
})

describe('should work with existing data correctly', () => {
  it('should return nested nodes for given root', () => {
    const testPartialNodes = testTree[0].children[1]
    const partialTree = getNestedNodes(defaultDBFlatTree, testPartialNodes.key)
    expect(partialTree).toEqual(testPartialNodes.children)
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
        key: '0'
      }
    ]

    const fullTree = adoptDBItemsToTree(testDBWithRoot)
    expect(fullTree).toEqual(testResultTree)
  })
})
