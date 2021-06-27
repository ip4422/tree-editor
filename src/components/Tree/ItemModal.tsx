import React, { useState, useEffect } from 'react'
import { Modal, Input } from 'antd'

import { TreeItem } from '../../store'

interface ItemModalProps {
  visible: boolean
  title: string
  item: TreeItem
  onOk: (item: TreeItem) => void
  onCancel: () => void
}

export const ItemModal = ({
  visible,
  title,
  item,
  onOk,
  onCancel
}: ItemModalProps) => {
  const [value, setValue] = useState(item.title)

  // change title when changed parent item
  useEffect(() => {
    setValue(item.title)
  }, [item])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleOk = () => {
    onOk({ ...item, title: value })
    setValue('')
  }

  const handleCancel = () => {
    // setValue('')
    onCancel()
  }

  return (
    <Modal
      title={title}
      destroyOnClose
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <Input onChange={handleInput} value={value} />
    </Modal>
  )
}
