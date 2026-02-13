import React from 'react'
import { render, act } from '@testing-library/react'
import { createSink, compose, withState, mapProps } from '../'

test('createSink creates a React component that fires a callback when receiving new props', () => {
  const spy = jest.fn()
  const Sink = createSink(spy)
  const Counter = compose(
    withState('counter', 'updateCounter', 0),
    mapProps(({ updateCounter, ...rest }) => ({
      increment: () => updateCounter(n => n + 1),
      ...rest,
    }))
  )(Sink)

  render(
    <div>
      <Counter />
    </div>
  )

  const lastProps = () => spy.mock.lastCall[0]
  const { increment } = lastProps()
  const getCounter = () => lastProps().counter
  expect(getCounter()).toBe(0)
  act(() => {
    increment()
  })
  expect(getCounter()).toBe(1)
  act(() => {
    increment()
  })
  expect(getCounter()).toBe(2)
})
