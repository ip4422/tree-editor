import React from 'react'
import { Row, Col } from 'antd'

import { TreeCacheContainer } from './TreeCacheContainer'
import { TreeDBContainer } from './TreeDBContainer'

export const Trees = () => {
  return (
    <Row gutter={16} wrap={false}>
      <Col>
        <TreeCacheContainer />
      </Col>
      <Col>
        <TreeDBContainer />
      </Col>
    </Row>
  )
}
