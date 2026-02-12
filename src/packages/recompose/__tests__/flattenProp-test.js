import React from 'react'
import { render } from '@testing-library/react'
import { flattenProp } from '../'

test('flattenProps flattens an object prop and spreads it into the top-level props object', () => {
  const Counter = flattenProp('data-state')('div')
  expect(Counter.displayName).toBe('flattenProp(div)')

  const { container, rerender } = render(
    <Counter data-pass="through" data-state={{ 'data-counter': 1 }} />
  )
  const div = container.querySelector('div')
  expect(div.getAttribute('data-pass')).toBe('through')
  expect(div.getAttribute('data-counter')).toBe('1')

  rerender(<Counter data-pass="through" data-state={{ 'data-state': 1 }} />)
  const div2 = container.querySelector('div')
  expect(div2.getAttribute('data-pass')).toBe('through')
  expect(div2.getAttribute('data-state')).toBe('1')
})
