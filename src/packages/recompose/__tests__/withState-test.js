import React from 'react'
import { render, act } from '@testing-library/react'
import { withState } from '../'

test('withState adds a stateful value and a function for updating it', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const Counter = withState('counter', 'updateCounter', 0)(component)
  expect(Counter.displayName).toBe('withState(component)')

  render(<Counter pass="through" />)
  const { updateCounter } = component.mock.calls[0][0]

  expect(component.mock.lastCall[0].counter).toBe(0)
  expect(component.mock.lastCall[0].pass).toBe('through')

  act(() => {
    updateCounter(n => n + 9)
  })
  act(() => {
    updateCounter(n => n * 2)
  })

  expect(component.mock.lastCall[0].counter).toBe(18)
  expect(component.mock.lastCall[0].pass).toBe('through')
})

test('withState also accepts a non-function, which is passed directly to setState()', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const Counter = withState('counter', 'updateCounter', 0)(component)
  render(<Counter />)
  const { updateCounter } = component.mock.calls[0][0]

  act(() => {
    updateCounter(18)
  })
  expect(component.mock.lastCall[0].counter).toBe(18)
})

test('withState accepts setState() callback', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const Counter = withState('counter', 'updateCounter', 0)(component)
  render(<Counter />)
  const { updateCounter } = component.mock.calls[0][0]

  const callback = jest.fn(() => {
    expect(component.mock.lastCall[0].counter).toBe(18)
  })

  expect(component.mock.lastCall[0].counter).toBe(0)
  act(() => {
    updateCounter(18, callback)
  })
  expect(callback).toHaveBeenCalledTimes(1)
})

test('withState also accepts initialState as function of props', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const Counter = withState(
    'counter',
    'updateCounter',
    props => props.initialCounter
  )(component)

  render(<Counter initialCounter={1} />)
  const { updateCounter } = component.mock.calls[0][0]

  expect(component.mock.lastCall[0].counter).toBe(1)
  act(() => {
    updateCounter(n => n * 3)
  })
  expect(component.mock.lastCall[0].counter).toBe(3)
})
