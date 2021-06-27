import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './store'
import { App } from './App'

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  // const inputElement = screen.getByText("Header")
  // expect(inputElement).toBeInTheDocument()

  // expect(screen.getByText("Header")).toBeInTheDocument()
})
