import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { withHandlers, withState, compose } from '../'

test('withHandlers passes handlers to base component', () => {
  let submittedFormValue
  const enhanceForm = compose(
    withState('value', 'updateValue', ''),
    withHandlers({
      onChange: props => event => {
        props.updateValue(event.target.value)
      },
      onSubmit: props => () => {
        submittedFormValue = props.value
      },
    })
  )

  const Form = enhanceForm(({ value, onChange, onSubmit }) => (
    <form onSubmit={onSubmit}>
      <label>
        Value
        <input type="text" value={value} onChange={onChange} />
      </label>
      <p>{value}</p>
    </form>
  ))

  const { container } = render(<Form />)

  fireEvent.change(container.querySelector('input'), {
    target: { value: 'Yay' },
  })
  expect(container.querySelector('p').textContent).toBe('Yay')

  fireEvent.change(container.querySelector('input'), {
    target: { value: 'Yay!!' },
  })
  expect(container.querySelector('p').textContent).toBe('Yay!!')

  fireEvent.submit(container.querySelector('form'))
  expect(submittedFormValue).toBe('Yay!!')
})

test('withHandlers passes immutable handlers', () => {
  const enhance = withHandlers({
    handler: () => () => null,
  })
  const component = jest.fn(() => null)
  const Div = enhance(component)

  const { rerender } = render(<Div />)
  rerender(<Div foo="bar" />)

  expect(component.mock.calls.length).toBe(2)
  expect(component.mock.calls[0][0].handler).toBe(
    component.mock.calls[1][0].handler
  )
})

test('withHandlers warns if handler is not a higher-order function', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const Button = withHandlers({
    onClick: () => {},
  })('button')

  const { container } = render(<Button />)

  // React 16 dev mode re-throws errors from event handlers via
  // invokeGuardedCallbackDev, causing an uncaught error in jsdom.
  // Suppress it so we can check the console.error warning instead.
  const onError = event => event.preventDefault()
  window.addEventListener('error', onError)

  fireEvent.click(container.querySelector('button'))

  window.removeEventListener('error', onError)

  const errorMessages = console.error.mock.calls.map(call => call[0])
  expect(errorMessages).toContain(
    'withHandlers(): Expected a map of higher-order functions. Refer to ' +
      'the docs for more info.'
  )
})

test('withHandlers allow handers to be a factory', () => {
  const enhance = withHandlers(initialProps => {
    let cache_

    return {
      handler: () => () => {
        if (cache_) {
          return cache_
        }
        cache_ = { ...initialProps }

        return cache_
      },
    }
  })

  const componentHandlers = []
  const componentHandlers2 = []

  const Component = enhance(({ handler }) => {
    componentHandlers.push(handler())
    return null
  })

  const Component2 = enhance(({ handler }) => {
    componentHandlers2.push(handler())
    return null
  })

  const { rerender } = render(<Component hello={'foo'} />)
  rerender(<Component hello={'bar'} />)
  expect(componentHandlers[0]).toBe(componentHandlers[1])

  // check that cache is not shared
  render(<Component2 hello={'foo'} />)
  expect(componentHandlers[0]).toEqual(componentHandlers2[0])
  expect(componentHandlers[0]).not.toBe(componentHandlers2[0])
})
