import React from 'react'
import { render, act } from '@testing-library/react'
import { shouldUpdate, compose, withState } from '../'
import { countRenders } from './utils'

test('shouldUpdate implements shouldComponentUpdate', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const initialTodos = ['eat', 'drink', 'sleep']
  const Todos = compose(
    withState('todos', 'updateTodos', initialTodos),
    shouldUpdate((props, nextProps) => props.todos !== nextProps.todos),
    countRenders
  )(component)

  expect(Todos.displayName).toBe(
    'withState(shouldUpdate(countRenders(component)))'
  )

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
