import React, { useState } from 'react'
import { Tree as AntTree, Row, Col, Button } from 'antd'

import { useAppSelector, useAppDispatch } from '../../utils/hooks'
import { add } from '../../store'

export const TreeDBContainer = () => {
  const [selectedIdList, setSelectedIdList] = useState([])
  const items = useAppSelector(state => state.tree.items)
  const dispatch = useAppDispatch()

  const onCheck = (checkedKeysValue: any) => {
    setSelectedIdList(checkedKeysValue.checked)
  }

  // const onSelect = (selectedKeysValue: any, info: any) => {
  //   console.log('onSelect', info)
  //   // setSelectedKeys(selectedKeysValue);
  // }

  const handleAdd = (): void => {
    dispatch(add(selectedIdList))
  }

  return (
    <div style={{ minWidth: '350px' }}>
      <Row gutter={16} wrap={false} align='middle'>
        <Col>
          <Button onClick={handleAdd}>{'<<<'}</Button>
        </Col>
        <Col>
          <AntTree
            checkable
            defaultExpandAll
            checkStrictly
            // onExpand={onExpand}
            // expandedKeys={expandedKeys}
            // autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={selectedIdList}
            // onSelect={onSelect}
            // selectedKeys={selectedKeys}
            treeData={items}
          />
        </Col>
      </Row>
    </div>
  )
}
