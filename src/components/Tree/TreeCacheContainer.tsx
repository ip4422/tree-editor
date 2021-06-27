import React, { useState, useEffect } from 'react'
import { Tree as AntTree, Row, Col, Button } from 'antd'
import { DeleteFilled } from '@ant-design/icons'

import { useAppSelector, useAppDispatch } from '../../utils/hooks'
import { usePopupState } from '../../utils/usePopupState'

import { reset, deleteItemAction, alterItemAction, TreeItem } from '../../store'
import { getItemByKey } from '../../store/tree/utils'
import { ItemModal } from './ItemModal'

export const TreeCacheContainer = () => {
  const items = useAppSelector(state => state.tree.cache || ([] as TreeItem[]))
  const expanded = useAppSelector(state => state.tree.cacheExpandedKeys)
  const [selectedItem, setSelectedItem] = useState({} as TreeItem)
  const [newItem, setNewItem] = useState({} as TreeItem)
  const [isOpenAddModal, onToggleAddModal] = usePopupState()
  const [isOpenAlterModal, onToggleAlterModal] = usePopupState()

  const dispatch = useAppDispatch()

  // calculate temporary unique key for new item
  useEffect(() => {
    const item = { ...selectedItem }
    item.key = `${selectedItem.key}-0-${
      selectedItem?.children ? selectedItem?.children.length : 0
    }`
    item.title = item.key
    setNewItem(item)
  }, [selectedItem])

  // we need refresh actions accessible when make delete on item
  useEffect(() => {
    if (selectedItem.key) {
      const freshItem = getItemByKey(items, selectedItem.key)
      setSelectedItem({
        ...(freshItem || ({} as TreeItem)),
        children: [] as TreeItem[]
      })
    }
  }, [items, selectedItem.key])

  // store selected item for further editing or create new item
  const onSelect = (selectedKeysValue: any, info: any) => {
    if (info.selectedNodes.length) {
      setSelectedItem(info.selectedNodes[0])
    } else {
      setSelectedItem({} as TreeItem)
    }
  }

  // reset to default state
  const handleReset = () => {
    dispatch(reset())
  }

  // display icon for deleted items
  const getIcon = (props: any) => {
    return props.data.deleted && <DeleteFilled style={{ color: 'red' }} />
  }

  // TODO: implement delete item with it's children
  // mark item as deleted
  const handleDelete = () => {
    if (selectedItem.key) {
      dispatch(deleteItemAction(selectedItem))
    }
  }

  // TODO: implement store new item
  // create new item for selected parent item stored in "selectedItem"
  const handleNewItem = (item: TreeItem) => {
    console.log(`item`, item)
    onToggleAddModal()
  }

  // create new item for selected parent item stored in "selectedItem"
  const handleAlterItem = (item: TreeItem) => {
    if (item.key) {
      dispatch(alterItemAction(item))
    }
    onToggleAlterModal()
  }

  return (
    <div style={{ minWidth: '350px', minHeight: '400px' }}>
      <AntTree
        showIcon
        icon={getIcon}
        expandedKeys={expanded}
        onSelect={onSelect}
        selectedKeys={[selectedItem.key]}
        treeData={items}
      />
      <div style={{ marginTop: '20px' }}>
        <Row gutter={8} wrap={false}>
          <Col>
            <ItemModal
              visible={isOpenAddModal}
              title={`Adding new item for parent: ${selectedItem.title}`}
              item={newItem}
              onOk={handleNewItem}
              onCancel={onToggleAddModal}
            />
            <Button
              disabled={!selectedItem.key || selectedItem.deleted}
              onClick={onToggleAddModal}
            >
              +
            </Button>
          </Col>
          <Col>
            <Button disabled={!selectedItem.key} onClick={handleDelete}>
              -
            </Button>
          </Col>
          <Col>
            <ItemModal
              visible={isOpenAlterModal}
              title={`Altering item: ${selectedItem.title}`}
              item={selectedItem}
              onOk={handleAlterItem}
              onCancel={onToggleAlterModal}
            />
            <Button
              disabled={!selectedItem.key || selectedItem.deleted}
              onClick={onToggleAlterModal}
            >
              a
            </Button>
          </Col>
          <Col span={2} />
          <Col>
            <Button>Apply</Button>
          </Col>
          <Col>
            <Button onClick={handleReset}>Reset</Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}
