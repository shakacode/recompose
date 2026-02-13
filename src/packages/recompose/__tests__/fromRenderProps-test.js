import React from 'react'
import { render } from '@testing-library/react'
import { fromRenderProps, compose, toRenderProps, defaultProps } from '../'

test('fromRenderProps passes additional props to base component', () => {
  const RenderPropsComponent = ({ children }) => children({ i18n: 'zh-TW' })
  const EnhancedComponent = fromRenderProps(
    RenderPropsComponent,
    ({ i18n }) => ({
      i18n,
    })
  )('div')
  expect(EnhancedComponent.displayName).toBe('fromRenderProps(div)')

  const { container } = render(<EnhancedComponent />)
  expect(container.querySelector('div').getAttribute('i18n')).toBe('zh-TW')
})

test('fromRenderProps passes additional props to base component with custom renderPropName', () => {
  const RenderPropsComponent = ({ render: renderProp }) =>
    renderProp({ i18n: 'zh-TW' })
  const EnhancedComponent = fromRenderProps(
    RenderPropsComponent,
    ({ i18n }) => ({
      i18n,
    }),
    'render'
  )('div')
  expect(EnhancedComponent.displayName).toBe('fromRenderProps(div)')

  const { container } = render(<EnhancedComponent />)
  expect(container.querySelector('div').getAttribute('i18n')).toBe('zh-TW')
})

test('fromRenderProps passes additional props to base component with 2 RenderPropsComponents', () => {
  const RenderPropsComponent1 = ({ children }) => children({ theme: 'dark' })
  const RenderPropsComponent2 = ({ render: renderProp }) =>
    renderProp({ i18n: 'zh-TW' })
  const EnhancedComponent = compose(
    fromRenderProps(
      RenderPropsComponent1,
      ({ theme }) => ({ theme }),
      'children'
    ),
    fromRenderProps(
      RenderPropsComponent2,
      ({ i18n }) => ({ locale: i18n }),
      'render'
    )
  )('div')
  expect(EnhancedComponent.displayName).toBe(
    'fromRenderProps(fromRenderProps(div))'
  )

  const { container } = render(<EnhancedComponent />)
  const div = container.querySelector('div')
  expect(div.getAttribute('theme')).toBe('dark')
  expect(div.getAttribute('locale')).toBe('zh-TW')
})

test('fromRenderProps meet toRenderProps', () => {
  const RenderPropsComponent = toRenderProps(
    defaultProps({ foo1: 'bar1', foo2: 'bar2' })
  )

  const EnhancedComponent = fromRenderProps(
    RenderPropsComponent,
    ({ foo1 }) => ({
      foo: foo1,
    })
  )('div')
  expect(EnhancedComponent.displayName).toBe('fromRenderProps(div)')

  const { container } = render(<EnhancedComponent />)
  expect(container.querySelector('div').getAttribute('foo')).toBe('bar1')
})

test('fromRenderProps with multiple arguments #693', () => {
  const RenderPropsComponent = ({ children }) =>
    children({ theme: 'dark' }, { data: 'data' })
  const EnhancedComponent = compose(
    fromRenderProps(
      RenderPropsComponent,
      ({ theme }, { data }) => ({ theme, data }),
      'children'
    )
  )('div')
  expect(EnhancedComponent.displayName).toBe('fromRenderProps(div)')

  const { container } = render(<EnhancedComponent />)
  const div = container.querySelector('div')
  expect(div.getAttribute('theme')).toBe('dark')
  expect(div.getAttribute('data')).toBe('data')
})
