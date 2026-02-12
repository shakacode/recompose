import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { branch, compose, withState, withProps } from '../'

test('branch tests props and applies one of two HoCs, for true and false', () => {
  const SayMyName = compose(
    withState('isBad', 'updateIsBad', false),
    branch(
      props => props.isBad,
      withProps({ name: 'Heisenberg' }),
      withProps({ name: 'Walter' })
    )
  )(({ isBad, name, updateIsBad }) => (
    <div>
      <div className="isBad">{isBad ? 'true' : 'false'}</div>
      <div className="name">{name}</div>
      <button onClick={() => updateIsBad(b => !b)}>Toggle</button>
    </div>
  ))

  expect(SayMyName.displayName).toBe('withState(branch(Component))')

  const { container } = render(<SayMyName />)
  const getIsBad = () => container.querySelector('.isBad').textContent
  const getName = () => container.querySelector('.name').textContent

  expect(getIsBad()).toBe('false')
  expect(getName()).toBe('Walter')

  fireEvent.click(container.querySelector('button'))

  expect(getIsBad()).toBe('true')
  expect(getName()).toBe('Heisenberg')
})

test('branch defaults third argument to identity function', () => {
  const Left = () => <div className="left">Left</div>
  const Right = () => <div className="right">Right</div>

  const BranchedComponent = branch(
    () => false,
    () => props => <Left {...props} />
  )(Right)

  const { container } = render(<BranchedComponent />)
  const right = container.querySelector('.right').textContent

  expect(right).toBe('Right')
})

test('branch third argument should not cause console error', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
  const Component = () => <div className="right">Component</div>

  const BranchedComponent = branch(
    () => false,
    v => v,
    v => v
  )(Component)

  render(<BranchedComponent />)

  expect(console.error.mock.calls.length > 0).toBe(false)
})
