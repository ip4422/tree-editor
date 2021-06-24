import React from 'react'
import { Tree as AntTree } from 'antd'

import { TreeItem } from '../../store'

interface TreeProps {
  items: TreeItem[]
}

export const Tree = ({ items }: TreeProps): JSX.Element => {
  const onCheck = (checkedKeysValue: any) => {
    console.log('onCheck', checkedKeysValue)
    // setCheckedKeys(checkedKeysValue);
  }

  const onSelect = (selectedKeysValue: any, info: any) => {
    console.log('onSelect', info)
    // setSelectedKeys(selectedKeysValue);
  }

  return (
    <div style={{ minWidth: '350px' }}>
      <AntTree
        checkable
        defaultExpandAll
        // onExpand={onExpand}
        // expandedKeys={expandedKeys}
        // autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        // checkedKeys={checkedKeys}
        onSelect={onSelect}
        // selectedKeys={selectedKeys}
        treeData={items}
      />
    </div>
  )
}
