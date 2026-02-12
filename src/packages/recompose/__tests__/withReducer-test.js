import React from 'react'
import { render, act } from '@testing-library/react'
import { withReducer, compose, flattenProp } from '../'

const SET_COUNTER = 'SET_COUNTER'

test('adds a stateful value and a function for updating it', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const initialState = { counter: 0 }

  const reducer = (state, action) =>
    action.type === SET_COUNTER ? { counter: action.payload } : state

  const Counter = compose(
    withReducer('state', 'dispatch', reducer, initialState),
    flattenProp('state')
  )(component)

  expect(Counter.displayName).toBe('withReducer(flattenProp(component))')

  render(<Counter />)
  const { dispatch } = component.mock.calls[0][0]

  expect(component.mock.lastCall[0].counter).toBe(0)

  act(() => {
    dispatch({ type: SET_COUNTER, payload: 18 })
  })
  expect(component.mock.lastCall[0].counter).toBe(18)
})

test('calls initialState when it is a function', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const initialState = ({ initialCount }) => ({ counter: initialCount })

  const reducer = (state, action) =>
    action.type === SET_COUNTER ? { counter: action.payload } : state

  const Counter = compose(
    withReducer('state', 'dispatch', reducer, initialState),
    flattenProp('state')
  )(component)

  render(<Counter initialCount={10} />)

  expect(component.mock.lastCall[0].counter).toBe(10)
})

test('receives state from reducer when initialState is not provided', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const initialState = { counter: 0 }

  const reducer = (state = initialState, action) =>
    action.type === SET_COUNTER ? { counter: action.payload } : state

  const Counter = compose(
    withReducer('state', 'dispatch', reducer),
    flattenProp('state')
  )(component)

  render(<Counter />)

  expect(component.mock.lastCall[0].counter).toBe(0)
})

test('calls the given callback with new state after a dispatch call', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const initialState = { counter: 0 }

  const reducer = (state, action) =>
    action.type === SET_COUNTER ? { counter: action.payload } : state

  const Counter = compose(
    withReducer('state', 'dispatch', reducer, initialState),
    flattenProp('state')
  )(component)

  render(<Counter />)
  const { dispatch } = component.mock.calls[0][0]
  const callback = jest.fn()

  act(() => {
    dispatch({ type: SET_COUNTER, payload: 11 }, callback)
  })

  expect(callback).toHaveBeenCalledTimes(1)
  expect(callback.mock.calls[0].length).toBe(1)
  expect(callback.mock.calls[0][0]).toEqual({ counter: 11 })
})
