import React from 'react'
import { render } from '@testing-library/react'
import { defaultProps } from '../'

test('defaultProps passes additional props to base component', () => {
  const DoReMi = defaultProps({ 'data-so': 'do', 'data-la': 'fa' })('div')
  expect(DoReMi.displayName).toBe('defaultProps(div)')

  const { container } = render(<DoReMi />)
  const div = container.querySelector('div')
  expect(div.getAttribute('data-so')).toBe('do')
  expect(div.getAttribute('data-la')).toBe('fa')
})

test('defaultProps has lower precendence than props from owner', () => {
  const DoReMi = defaultProps({ 'data-so': 'do', 'data-la': 'fa' })('div')

  const { container } = render(<DoReMi data-la="ti" />)
  const div = container.querySelector('div')
  expect(div.getAttribute('data-so')).toBe('do')
  expect(div.getAttribute('data-la')).toBe('ti')
})

test('defaultProps overrides undefined owner props', () => {
  const DoReMi = defaultProps({ 'data-so': 'do', 'data-la': 'fa' })('div')

  const { container } = render(<DoReMi data-la={undefined} />)
  const div = container.querySelector('div')
  expect(div.getAttribute('data-so')).toBe('do')
  expect(div.getAttribute('data-la')).toBe('fa')
})
