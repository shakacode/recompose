import React from 'react'
import { render, act } from '@testing-library/react'
import { pure, compose, withState } from '../'
import { countRenders } from './utils'

test('pure implements shouldComponentUpdate() using shallowEqual()', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const initialTodos = ['eat', 'drink', 'sleep']
  const Todos = compose(
    withState('todos', 'updateTodos', initialTodos),
    pure,
    countRenders
  )(component)

  expect(Todos.displayName).toBe('withState(pure(countRenders(component)))')

  render(<Todos />)
  const { updateTodos } = component.mock.calls[0][0]

  expect(component.mock.lastCall[0].todos).toBe(initialTodos)
  expect(component.mock.lastCall[0].renderCount).toBe(1)

  // Does not re-render
  act(() => {
    updateTodos(initialTodos)
  })
  expect(component.mock.calls.length).toBe(1)

  act(() => {
    updateTodos(todos => todos.slice(0, -1))
  })
  expect(component.mock.calls.length).toBe(2)
  expect(component.mock.lastCall[0].todos).toEqual(['eat', 'drink'])
  expect(component.mock.lastCall[0].renderCount).toBe(2)
})
