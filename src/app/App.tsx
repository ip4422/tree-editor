import React from 'react'
import './App.less'
import { Layout } from 'antd'

import { TreePage } from '../pages'

export function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ color: 'white' }}>Header</Layout.Header>
      <Layout.Content style={{ padding: '20px 50px' }}>
        <TreePage />
        {/* <ApplicationRoutes routes={ROUTES} /> */}
      </Layout.Content>
      <Layout.Footer
        style={{ textAlign: 'center', position: 'sticky', bottom: '0' }}
      >
        Application for displaying Github user's public repositories
      </Layout.Footer>
    </Layout>
  )
}
