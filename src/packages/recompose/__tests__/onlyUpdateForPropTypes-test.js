import React from 'react'
import PropTypes from 'prop-types'
import { render, act } from '@testing-library/react'
import { onlyUpdateForPropTypes, compose, withState, setPropTypes } from '../'

test('onlyUpdateForPropTypes only updates for props specified in propTypes', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const Counter = compose(
    withState('counter', 'updateCounter', 0),
    withState('foobar', 'updateFoobar', 'foobar'),
    onlyUpdateForPropTypes,
    setPropTypes({ counter: PropTypes.number })
  )(component)

  expect(Counter.displayName).toBe(
    'withState(withState(onlyUpdateForPropTypes(component)))'
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

test('onlyUpdateForPropTypes warns if BaseComponent does not have any propTypes', () => {
  const error = jest.spyOn(console, 'error').mockImplementation(() => {})
  const ShouldWarn = onlyUpdateForPropTypes('div')

  render(<ShouldWarn />)

  expect(error).toHaveBeenCalledWith(
    'A component without any `propTypes` was passed to ' +
      '`onlyUpdateForPropTypes()`. Check the implementation of the component ' +
      'with display name "div".'
  )

  error.mockRestore()
})
