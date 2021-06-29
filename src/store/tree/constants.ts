import { DBTreeItemList } from './types'

export const rootDBKey = '0'

export const maxIterationCount = 1000
/**
 * Default DB. key of each element is unique value. It used as a
 * pointer to parent element.
 * Root element has parent === ''
 */
export const defaultDBFlatTree: DBTreeItemList = {
  [rootDBKey]: {
    title: 'root title',
    parent: '',
    deleted: false,
    key: '0'
  },
  '0-0': {
    title: 'child of root - 0',
    parent: '0',
    deleted: false,
    key: '0-0'
  },
  '0-0-0': {
    title: '0-0-0',
    parent: '0-0',
    deleted: false,
    key: '0-0-0'
  },
  '0-0-1': {
    title: '0-0-1',
    parent: '0-0',
    deleted: false,
    key: '0-0-1'
  },
  '0-0-0-0': {
    title: '0-0-0-0',
    parent: '0-0-1',
    deleted: false,
    key: '0-0-0-0'
  },
  '0-0-0-1': {
    title: '0-0-0-1',
    parent: '0-0-1',
    deleted: false,
    key: '0-0-0-1'
  },
  '0-0-0-0-0': {
    title: '0-0-0-0-0',
    parent: '0-0-0-1',
    deleted: false,
    key: '0-0-0-0-0'
  },
  '0-0-0-2': {
    title: '0-0-0-2',
    parent: '0-0-1',
    deleted: false,
    key: '0-0-0-2'
  },
  '0-0-2': {
    title: '0-0-2',
    parent: '0-0',
    deleted: false,
    key: '0-0-2'
  },
  '0-1': {
    title: 'child of root - 1',
    parent: '0',
    deleted: false,
    key: '0-1'
  },
  '0-1-0': {
    title: '0-1-0',
    parent: '0-1',
    deleted: false,
    key: '0-1-0'
  },
  '0-1-1': {
    title: '0-1-1',
    parent: '0-1',
    deleted: false,
    key: '0-1-1'
  },
  '0-1-2': {
    title: '0-1-2',
    parent: '0-1',
    deleted: false,
    key: '0-1-2'
  },
  '0-2': {
    title: 'child of root - 2',
    parent: '0',
    deleted: false,
    key: '0-2'
  }
}
