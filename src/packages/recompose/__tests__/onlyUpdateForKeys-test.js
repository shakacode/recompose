import React from 'react'
import { render, act } from '@testing-library/react'
import { onlyUpdateForKeys, compose, withState } from '../'

test('onlyUpdateForKeys implements shouldComponentUpdate()', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const Counter = compose(
    withState('counter', 'updateCounter', 0),
    withState('foobar', 'updateFoobar', 'foobar'),
    onlyUpdateForKeys(['counter'])
  )(component)

  expect(Counter.displayName).toBe(
    'withState(withState(onlyUpdateForKeys(component)))'
  )

  render(<Counter />)
  const { updateCounter, updateFoobar } = component.mock.calls[0][0]

  expect(component.mock.lastCall[0].counter).toBe(0)
  expect(component.mock.lastCall[0].foobar).toBe('foobar')

  // Does not update
  act(() => {
    updateFoobar('barbaz')
  })
  expect(component.mock.calls.length).toBe(1)

  act(() => {
    updateCounter(42)
  })
  expect(component.mock.calls.length).toBe(2)
  expect(component.mock.lastCall[0].counter).toBe(42)
  expect(component.mock.lastCall[0].foobar).toBe('barbaz')
})
