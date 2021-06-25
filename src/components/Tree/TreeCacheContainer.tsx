import React, { useState } from 'react'
import { Tree as AntTree, Row, Col, Button } from 'antd'

import { useAppSelector, useAppDispatch } from '../../utils/hooks'
import { reset } from '../../store'

// type CheckedKeysValue = {
//   checked?: string[]
// }

export const TreeCacheContainer = () => {
  const items = useAppSelector(state => state.tree.cache)
  const [checked, setChecked] = useState([] as string[])
  const dispatch = useAppDispatch()

  const onCheck = (checkedKeysValue: any) => {
    setChecked(checkedKeysValue.checked)
  }

  const onSelect = (selectedKeysValue: any, info: any) => {
    console.log('onSelect', info)
    // setSelectedKeys(selectedKeysValue);
  }

  const handleReset = () => {
    dispatch(reset())
  }

  return (
    <div style={{ minWidth: '350px', minHeight: '400px' }}>
      <AntTree
        checkable
        defaultExpandAll
        checkStrictly
        // onExpand={onExpand}
        // expandedKeys={expandedKeys}
        // autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checked}
        onSelect={onSelect}
        // selectedKeys={selectedKeys}
        treeData={items}
      />
      <div style={{ marginTop: '20px' }}>
        <Row gutter={8} wrap={false}>
          <Col>
            <Button>+</Button>
          </Col>
          <Col>
            <Button>-</Button>
          </Col>
          <Col>
            <Button>a</Button>
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
