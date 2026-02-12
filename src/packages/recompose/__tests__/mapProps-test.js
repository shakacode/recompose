import React from 'react'
import { render, act } from '@testing-library/react'
import { mapProps, withState, compose } from '../'

test('mapProps maps owner props to child props', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const StringConcat = compose(
    withState('strings', 'updateStrings', ['do', 're', 'mi']),
    mapProps(({ strings, ...rest }) => ({
      ...rest,
      string: strings.join(''),
    }))
  )(component)

  expect(StringConcat.displayName).toBe('withState(mapProps(component))')

  render(<StringConcat />)
  const { updateStrings } = component.mock.calls[0][0]
  act(() => {
    updateStrings(strings => [...strings, 'fa'])
  })

  expect(component.mock.calls[0][0].string).toBe('doremi')
  expect(component.mock.calls[1][0].string).toBe('doremifa')
})
