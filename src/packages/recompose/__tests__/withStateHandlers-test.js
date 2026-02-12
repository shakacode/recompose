import React from 'react'
import { render, act } from '@testing-library/react'
import { compose, withStateHandlers } from '../'

test('withStateHandlers handles events passed as argument', () => {
  const component = jest.fn(() => null)

  const InputComponent = withStateHandlers(
    { value: '' },
    {
      onChange: () => e => ({
        value: e.target.value,
      }),
    }
  )(component)

  render(<InputComponent />)
  const { onChange } = component.mock.lastCall[0]

  act(() => {
    onChange({ target: { value: 'Yay' } })
  })
  expect(component.mock.lastCall[0].value).toBe('Yay')
})

test('withStateHandlers adds a stateful value and a function for updating it', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const Counter = withStateHandlers(
    { counter: 0 },
    {
      updateCounter: ({ counter }) => increment => ({
        counter: counter + increment,
      }),
    }
  )(component)
  expect(Counter.displayName).toBe('withStateHandlers(component)')

  render(<Counter pass="through" />)
  const { updateCounter } = component.mock.calls[0][0]

  expect(component.mock.lastCall[0].counter).toBe(0)
  expect(component.mock.lastCall[0].pass).toBe('through')

  act(() => {
    updateCounter(9)
  })
  expect(component.mock.lastCall[0].counter).toBe(9)
  act(() => {
    updateCounter(1)
  })
  act(() => {
    updateCounter(10)
  })

  expect(component.mock.lastCall[0].counter).toBe(20)
  expect(component.mock.lastCall[0].pass).toBe('through')
})

test('withStateHandlers accepts initialState as function of props', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const Counter = withStateHandlers(
    ({ initialCounter }) => ({
      counter: initialCounter,
    }),
    {
      updateCounter: ({ counter }) => increment => ({
        counter: counter + increment,
      }),
    }
  )(component)

  const initialCounter = 101

  render(<Counter initialCounter={initialCounter} />)
  expect(component.mock.lastCall[0].counter).toBe(initialCounter)
})

test('withStateHandlers initial state must be function or object or null or undefined', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const Counter = withStateHandlers(1, {})(component)
  jest.spyOn(console, 'error').mockImplementation(() => {})
  render(<Counter />)
  expect(console.error).toHaveBeenCalled()
})

test('withStateHandlers have access to props', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const Counter = withStateHandlers(
    ({ initialCounter }) => ({
      counter: initialCounter,
    }),
    {
      increment: ({ counter }, { incrementValue }) => () => ({
        counter: counter + incrementValue,
      }),
    }
  )(component)

  const initialCounter = 101
  const incrementValue = 37

  render(
    <Counter initialCounter={initialCounter} incrementValue={incrementValue} />
  )

  const { increment } = component.mock.calls[0][0]

  act(() => {
    increment()
  })
  expect(component.mock.lastCall[0].counter).toBe(
    initialCounter + incrementValue
  )
})

test('withStateHandlers passes immutable state updaters', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const Counter = withStateHandlers(
    ({ initialCounter }) => ({
      counter: initialCounter,
    }),
    {
      increment: ({ counter }, { incrementValue }) => () => ({
        counter: counter + incrementValue,
      }),
    }
  )(component)

  const initialCounter = 101
  const incrementValue = 37

  render(
    <Counter initialCounter={initialCounter} incrementValue={incrementValue} />
  )

  const { increment } = component.mock.calls[0][0]

  act(() => {
    increment()
  })
  expect(component.mock.lastCall[0].counter).toBe(
    initialCounter + incrementValue
  )
})

test('withStateHandlers does not rerender if state updater returns undefined', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const Counter = withStateHandlers(
    ({ initialCounter }) => ({
      counter: initialCounter,
    }),
    {
      updateCounter: ({ counter }) => increment =>
        increment === 0
          ? undefined
          : {
              counter: counter + increment,
            },
    }
  )(component)

  const initialCounter = 101

  render(<Counter initialCounter={initialCounter} />)
  expect(component.mock.calls.length).toBe(1)

  const { updateCounter } = component.mock.calls[0][0]

  act(() => {
    updateCounter(1)
  })
  expect(component.mock.calls.length).toBe(2)

  act(() => {
    updateCounter(0)
  })
  expect(component.mock.calls.length).toBe(2)
})

test('withStateHandlers rerenders if parent props changed', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const Counter = compose(
    withStateHandlers(
      ({ initialCounter }) => ({
        counter: initialCounter,
      }),
      {
        increment: ({ counter }) => incrementValue => ({
          counter: counter + incrementValue,
        }),
      }
    ),
    withStateHandlers(
      { incrementValue: 1 },
      {
        // updates parent state and return undefined
        updateParentIncrement: ({ incrementValue }, { increment }) => () => {
          increment(incrementValue)
          return undefined
        },
      }
    )
  )(component)

  const initialCounter = 101

  render(<Counter initialCounter={initialCounter} />)

  const { updateParentIncrement } = component.mock.calls[0][0]

  act(() => {
    updateParentIncrement()
  })
  expect(component.mock.lastCall[0].counter).toBe(initialCounter + 1)
})
