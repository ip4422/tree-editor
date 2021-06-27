import { useState } from 'react'

/**
 * usePopupState hook
 */
export const usePopupState = ({ initialOpen = false } = {}): [
  isOpen: boolean,
  onToggle: () => void,
  onOpen: () => void,
  onClose: () => void
] => {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const onOpen = () => {
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  return [isOpen, onToggle, onOpen, onClose]
}
