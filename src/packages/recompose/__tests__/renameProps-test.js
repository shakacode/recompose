import React from 'react'
import { render } from '@testing-library/react'
import { withProps, renameProps, compose } from '../'

test('renameProps renames props', () => {
  const StringConcat = compose(
    withProps({ 'data-so': 123, 'data-la': 456 }),
    renameProps({ 'data-so': 'data-do', 'data-la': 'data-fa' })
  )('div')

  expect(StringConcat.displayName).toBe('withProps(renameProps(div))')

  const { container } = render(<StringConcat />)
  const div = container.querySelector('div')

  expect(div.getAttribute('data-do')).toBe('123')
  expect(div.getAttribute('data-fa')).toBe('456')
})
