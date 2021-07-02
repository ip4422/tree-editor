import React from 'react'
import './App.less'
import { Layout } from 'antd'

import { TreePage } from '../pages'

export function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ color: 'white', textAlign: 'center' }}>Tree editor</Layout.Header>
      <Layout.Content style={{ padding: '20px 50px' }}>
        <TreePage />
        {/* <ApplicationRoutes routes={ROUTES} /> */}
      </Layout.Content>
      <Layout.Footer
        style={{ textAlign: 'center', position: 'sticky', bottom: '0' }}
      >
        Manipulation tree elements
      </Layout.Footer>
    </Layout>
  )
}
