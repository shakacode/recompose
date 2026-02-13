import React from 'react'
import { render } from '@testing-library/react'
import { lifecycle } from '../'

test('lifecycle is a higher-order component version of React.Component', () => {
  const enhance = lifecycle({
    UNSAFE_componentWillMount() {
      this.setState({ 'data-bar': 'baz' })
    },
  })
  const Div = enhance('div')
  expect(Div.displayName).toBe('lifecycle(div)')

  const { container } = render(<Div data-foo="bar" />)
  const div = container.querySelector('div')
  expect(div.getAttribute('data-foo')).toBe('bar')
  expect(div.getAttribute('data-bar')).toBe('baz')
})
