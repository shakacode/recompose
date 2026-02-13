import React from 'react'
import { render } from '@testing-library/react'
import { renderNothing } from '../'

test('renderNothing returns a component that renders null', () => {
  const Nothing = renderNothing('div')
  const { container } = render(<Nothing />)
  expect(container.innerHTML).toBe('')

  const Parent = () => <Nothing />
  const { container: parentContainer } = render(<Parent />)
  expect(parentContainer.innerHTML).toBe('')
})
