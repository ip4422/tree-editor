import React from 'react'
// import { useAppSelector } from '../../utils/hooks'

import { Trees } from './Trees'

export const TreesContainer = (): JSX.Element => {
  // const items = useAppSelector(state => state.tree.items)

  return (
    <div>
      <Trees />
    </div>
  )
}
