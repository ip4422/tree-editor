import React, { useState } from 'react'
import { Tree as AntTree, Row, Col, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import { useAppSelector, useAppDispatch } from '../../utils/hooks'
import { addItems } from '../../store'

export const TreeDBContainer = () => {
  const [selected, setSelected] = useState([] as string[])
  const items = useAppSelector(state => state.tree.items)
  const dispatch = useAppDispatch()

  const onSelect = (selectedKeysValue: any, info: any) => {
    setSelected(selectedKeysValue)
  }

  const handleAdd = (): void => {
    dispatch(addItems(selected))
  }

  const getIcon = (props: any) => {
    return props.data.deleted && <CloseOutlined style={{ color: 'red' }} />
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
            selectedKeys={selected}
            treeData={items}
          />
        </Col>
      </Row>
    </div>
  )
}
