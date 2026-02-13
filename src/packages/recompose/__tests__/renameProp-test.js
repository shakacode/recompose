import React from 'react'
import { render } from '@testing-library/react'
import { withProps, renameProp, compose } from '../'

test('renameProp renames a single prop', () => {
  const StringConcat = compose(
    withProps({ 'data-so': 123, 'data-la': 456 }),
    renameProp('data-so', 'data-do')
  )('div')

  expect(StringConcat.displayName).toBe('withProps(renameProp(div))')

  const { container } = render(<StringConcat />)
  const div = container.querySelector('div')
  expect(div.getAttribute('data-do')).toBe('123')
  expect(div.getAttribute('data-la')).toBe('456')
})
