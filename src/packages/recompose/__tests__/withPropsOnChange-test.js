import * as React from 'react'
import { render, act } from '@testing-library/react'
import {
  withPropsOnChange,
  withState,
  withStateHandlers,
  flattenProp,
  compose,
} from '../'

test('withPropsOnChange maps subset of owner props to child props', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const mapSpy = jest.fn()
  const StringConcat = compose(
    withState('strings', 'updateStrings', { a: 'a', b: 'b', c: 'c' }),
    flattenProp('strings'),
    withPropsOnChange(['a', 'b'], ({ a, b, ...props }) => {
      mapSpy()
      return {
        ...props,
        foobar: a + b,
      }
    })
  )(component)

  expect(StringConcat.displayName).toBe(
    'withState(flattenProp(withPropsOnChange(component)))'
  )

  render(<StringConcat />)
  const { updateStrings } = component.mock.calls[0][0]
  expect(component.mock.lastCall[0].foobar).toBe('ab')
  expect(component.mock.calls.length).toBe(1)
  expect(mapSpy).toHaveBeenCalledTimes(1)

  // Does not re-map for non-dependent prop updates
  act(() => {
    updateStrings(strings => ({ ...strings, c: 'baz' }))
  })
  expect(component.mock.lastCall[0].foobar).toBe('ab')
  expect(component.mock.lastCall[0].c).toBe('c')
  expect(component.mock.calls.length).toBe(2)
  expect(mapSpy).toHaveBeenCalledTimes(1)

  act(() => {
    updateStrings(strings => ({ ...strings, a: 'foo', b: 'bar' }))
  })
  expect(component.mock.lastCall[0].foobar).toBe('foobar')
  expect(component.mock.lastCall[0].c).toBe('baz')
  expect(component.mock.calls.length).toBe(3)
  expect(mapSpy).toHaveBeenCalledTimes(2)
})

test('withPropsOnChange maps subset of owner props to child props with custom predicate', () => {
  const component = jest.fn(() => null)
  component.displayName = 'component'

  const mapSpy = jest.fn()
  const shouldMapSpy = jest.fn()
  const PageContainer = compose(
    withStateHandlers(
      { result: { hasError: false, loading: true, error: null } },
      {
        updateResult: ({ result }) => payload => ({
          result: { ...result, ...payload },
        }),
      }
    ),
    withPropsOnChange(
      ({ result }, { result: nextResult }) => {
        shouldMapSpy(result, nextResult)
        return !result.hasError && nextResult.hasError
      },
      ({ result: { hasError, error } }) => {
        mapSpy()

        if (hasError) {
          return {
            errorEverHappened: true,
            lastError: error,
          }
        }

        return {
          errorEverHappened: false,
        }
      }
    )
  )(component)

  expect(PageContainer.displayName).toBe(
    'withStateHandlers(withPropsOnChange(component))'
  )

  render(<PageContainer />)
  const { updateResult } = component.mock.calls[0][0]
  expect(component.mock.lastCall[0].errorEverHappened).toBe(false)
  expect(component.mock.lastCall[0].lastError).toBeUndefined()
  expect(component.mock.calls.length).toBe(1)
  expect(mapSpy).toHaveBeenCalledTimes(1)
  expect(shouldMapSpy).toHaveBeenCalledTimes(1)

  act(() => {
    updateResult({ loading: false, hasError: true, error: '1' })
  })
  expect(component.mock.lastCall[0].errorEverHappened).toBe(true)
  expect(component.mock.lastCall[0].lastError).toBe('1')
  expect(component.mock.calls.length).toBe(2)
  expect(mapSpy).toHaveBeenCalledTimes(2)

  // Does not re-map for false map result
  act(() => {
    updateResult({ loading: true, hasError: false, error: null })
  })
  expect(component.mock.lastCall[0].errorEverHappened).toBe(true)
  expect(component.mock.lastCall[0].lastError).toBe('1')
  expect(component.mock.calls.length).toBe(3)
  expect(mapSpy).toHaveBeenCalledTimes(2)

  act(() => {
    updateResult({ loading: false, hasError: true, error: '2' })
  })
  expect(component.mock.lastCall[0].errorEverHappened).toBe(true)
  expect(component.mock.lastCall[0].lastError).toBe('2')
  expect(component.mock.calls.length).toBe(4)
  expect(mapSpy).toHaveBeenCalledTimes(3)
})
