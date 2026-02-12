import React from 'react'
import PropTypes from 'prop-types'
import { render } from '@testing-library/react'
import { toClass, withContext, getContext, compose } from '../'

test('toClass returns the base component if it is already a class', () => {
  class BaseComponent extends React.Component {
    render() {
      return <div />
    }
  }

  const TestComponent = toClass(BaseComponent)
  expect(TestComponent).toBe(BaseComponent)
})

test('toClass copies propTypes, displayName and defaultProps from base component', () => {
  const StatelessComponent = () => <div />

  StatelessComponent.displayName = 'Stateless'
  StatelessComponent.propTypes = { foo: PropTypes.string }
  StatelessComponent.defaultProps = { foo: 'bar', fizz: 'buzz' }

  const TestComponent = toClass(StatelessComponent)

  expect(TestComponent.displayName).toBe('Stateless')
  expect(TestComponent.propTypes).toEqual({ foo: PropTypes.string })
  expect(TestComponent.defaultProps).toEqual({ foo: 'bar', fizz: 'buzz' })
})

test('toClass passes defaultProps correctly', () => {
  const StatelessComponent = jest.fn(() => null)

  StatelessComponent.displayName = 'Stateless'
  StatelessComponent.propTypes = { foo: PropTypes.string }
  StatelessComponent.contextTypes = { bar: PropTypes.object }
  StatelessComponent.defaultProps = { foo: 'bar', fizz: 'buzz' }

  const TestComponent = toClass(StatelessComponent)

  render(<TestComponent />)
  expect(StatelessComponent.mock.lastCall[0].foo).toBe('bar')
  expect(StatelessComponent.mock.lastCall[0].fizz).toBe('buzz')
})

test('toClass passes context and props correctly', () => {
  const store = {}

  class Provider extends React.Component {
    static propTypes = {
      children: PropTypes.node,
    }

    render() {
      return this.props.children
    }
  }

  Provider = compose(
    withContext({ store: PropTypes.object }, props => ({ store: props.store }))
  )(Provider)

  const StatelessComponent = props =>
    <div
      data-fizz={props.fizz}
      data-has-store={props.store === store ? 'yes' : 'no'}
    />

  const TestComponent = compose(
    getContext({ store: PropTypes.object }),
    toClass
  )(StatelessComponent)

  const { container } = render(
    <Provider store={store}>
      <TestComponent fizz="fizzbuzz" />
    </Provider>
  )

  const div = container.querySelector('div')
  expect(div.getAttribute('data-fizz')).toBe('fizzbuzz')
  expect(div.getAttribute('data-has-store')).toBe('yes')
})

test('toClass works with strings (DOM components)', () => {
  const Div = toClass('div')
  const { container } = render(<Div>Hello</Div>)
  expect(container.innerHTML).toBe('<div>Hello</div>')
})
