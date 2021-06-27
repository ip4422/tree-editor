import React, { useState } from 'react'
import { Tree as AntTree, Row, Col, Button } from 'antd'
import { DeleteFilled } from '@ant-design/icons'

import { useAppSelector, useAppDispatch } from '../../utils/hooks'
import { addItemAction, TreeItem } from '../../store'

export const TreeDBContainer = () => {
  const [selectedItem, setSelectedItem] = useState({} as TreeItem)
  const items = useAppSelector(state => state.tree.items)
  const dispatch = useAppDispatch()

  // store selected item for further editing or create new item
  const onSelect = (selectedKeysValue: any, info: any) => {
    if (info.selectedNodes.length) {
      setSelectedItem({ ...info.selectedNodes[0], children: [] as TreeItem[] })
    } else {
      setSelectedItem({} as TreeItem)
    }
  }

  const handleAdd = (): void => {
    if (selectedItem.key) {
      dispatch(addItemAction(selectedItem))
    }
  }

  const getIcon = (props: any) => {
    return props.data.deleted && <DeleteFilled style={{ color: 'red' }} />
  }

  return (
    <div style={{ minWidth: '350px' }}>
      <Row gutter={16} wrap={false} align='middle'>
        <Col>
          <Button onClick={handleAdd}>{'<<<'}</Button>
        </Col>
        <Col>
          <AntTree
            defaultExpandAll
            checkStrictly
            showIcon
            icon={getIcon}
            onSelect={onSelect}
            selectedKeys={[selectedItem.key]}
            treeData={items}
          />
        </Col>
      </Row>
    </div>
  )
}
