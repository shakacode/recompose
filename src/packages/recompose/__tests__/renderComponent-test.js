import React from 'react'
import { render, act } from '@testing-library/react'
import { renderComponent, withState, compose, branch } from '../'

test('renderComponent always renders the given component', () => {
  const componentA = jest.fn(() => null)
  const componentB = jest.fn(() => null)

  const Foobar = compose(
    withState('flip', 'updateFlip', false),
    branch(
      props => props.flip,
      renderComponent(componentA),
      renderComponent(componentB)
    )
  )(null)

  render(<Foobar />)
  const { updateFlip } = componentB.mock.calls[0][0]

  expect(componentB.mock.calls.length).toBe(1)
  expect(componentA.mock.calls.length).toBe(0)

  act(() => {
    updateFlip(true)
  })
  expect(componentB.mock.calls.length).toBe(1)
  expect(componentA.mock.calls.length).toBe(1)
})
