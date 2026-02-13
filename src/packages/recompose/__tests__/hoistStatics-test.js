import React from 'react'
import { render } from '@testing-library/react'
import { hoistStatics, mapProps } from '../'

test('copies non-React static properties from base component to new component', () => {
  const BaseComponent = jest.fn(() => null)
  BaseComponent.foo = () => {}

  const EnhancedComponent = hoistStatics(
    mapProps(props => ({ n: props.n * 5 }))
  )(BaseComponent)

  expect(EnhancedComponent.foo).toBe(BaseComponent.foo)

  render(<EnhancedComponent n={3} />)
  expect(BaseComponent.mock.lastCall[0].n).toBe(15)
})

test('does not copy blacklisted static properties to new component ', () => {
  const BaseComponent = () => null
  BaseComponent.foo = () => {}
  BaseComponent.bar = () => {}

  const EnhancedComponent = hoistStatics(
    comp => props => React.createElement(comp, props),
    { bar: true } // Blacklist
  )(BaseComponent)

  expect(EnhancedComponent.foo).toBe(BaseComponent.foo)
  expect(EnhancedComponent.bar).toBe(undefined)
})
