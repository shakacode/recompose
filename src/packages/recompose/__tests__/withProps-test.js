import React from 'react'
import { render } from '@testing-library/react'
import { withProps } from '../'

test('withProps passes additional props to base component', () => {
  const DoReMi = withProps({ 'data-so': 'do', 'data-la': 'fa' })('div')
  expect(DoReMi.displayName).toBe('withProps(div)')

  const { container } = render(<DoReMi />)
  const div = container.querySelector('div')
  expect(div.getAttribute('data-so')).toBe('do')
  expect(div.getAttribute('data-la')).toBe('fa')
})

test('withProps takes precedent over owner props', () => {
  const DoReMi = withProps({ 'data-so': 'do', 'data-la': 'fa' })('div')

  const { container } = render(<DoReMi data-la="ti" />)
  const div = container.querySelector('div')
  expect(div.getAttribute('data-so')).toBe('do')
  expect(div.getAttribute('data-la')).toBe('fa')
})

test('withProps should accept function', () => {
  const DoReMi = withProps(props => ({
    'data-so': props['data-la'],
  }))('div')

  const { container } = render(<DoReMi data-la="la" />)
  const div = container.querySelector('div')
  expect(div.getAttribute('data-so')).toBe('la')
})
