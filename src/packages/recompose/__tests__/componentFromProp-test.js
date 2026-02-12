import React from 'react'
import { render } from '@testing-library/react'
import { componentFromProp } from '../'

test('componentFromProp creates a component that takes a component as a prop and renders it with the rest of the props', () => {
  const Container = componentFromProp('component')
  expect(Container.displayName).toBe('componentFromProp(component)')

  const Component = ({ pass }) => <div>Pass: {pass}</div>

  const { container } = render(
    <Container component={Component} pass="through" />
  )
  const div = container.querySelector('div')
  expect(div.textContent).toBe('Pass: through')
})
