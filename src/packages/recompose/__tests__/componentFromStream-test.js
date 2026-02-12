import React from 'react'
import { render, act } from '@testing-library/react'
import { Observable, Subject } from 'rxjs'
import rxjsConfig from '../rxjsObservableConfig'
import { componentFromStreamWithConfig } from '../componentFromStream'

const componentFromStream = componentFromStreamWithConfig(rxjsConfig)

test('componentFromStream creates a component from a prop stream transformation', () => {
  const Double = componentFromStream(props$ =>
    props$.map(({ n }) =>
      <div>
        {n * 2}
      </div>
    )
  )
  const { container, rerender } = render(<Double n={112} />)
  const div = container.querySelector('div')
  expect(div.textContent).toBe('224')
  rerender(<Double n={358} />)
  expect(container.querySelector('div').textContent).toBe('716')
})

test('componentFromStream unsubscribes from stream before unmounting', () => {
  let subscriptions = 0
  const vdom$ = new Observable(observer => {
    subscriptions += 1
    observer.next(<div />)
    return {
      unsubscribe() {
        subscriptions -= 1
      },
    }
  })
  const Div = componentFromStream(() => vdom$)
  const { unmount } = render(<Div />)
  expect(subscriptions).toBe(1)
  unmount()
  expect(subscriptions).toBe(0)
})

test('componentFromStream renders nothing until the stream emits a value', () => {
  const vdom$ = new Subject()
  const Div = componentFromStream(() => vdom$.mapTo(<div />))
  const { container } = render(<Div />)
  expect(container.querySelector('div')).toBe(null)
  act(() => {
    vdom$.next()
  })
  expect(container.querySelector('div')).not.toBe(null)
})

test('handler multiple observers of props stream', () => {
  const Div = componentFromStream(props$ =>
    // Adds three observers to props stream
    props$.combineLatest(props$, props$, props1 => <div {...props1} />)
  )

  const { container, rerender } = render(<Div data-value={1} />)
  const div = container.querySelector('div')

  expect(div.getAttribute('data-value')).toBe('1')
  rerender(<Div data-value={2} />)
  const div2 = container.querySelector('div')
  expect(div2.getAttribute('data-value')).toBe('2')
})

test('complete props stream before unmounting', () => {
  let counter = 0

  const Div = componentFromStream(props$ => {
    const first$ = props$.first().do(() => {
      counter += 1
    })

    const last$ = props$
      .last()
      .do(() => {
        counter -= 1
      })
      .startWith(null)

    return props$.combineLatest(first$, last$, props1 => <div {...props1} />)
  })

  const { container, unmount } = render(<Div />)

  expect(counter).toBe(1)
  expect(container.querySelector('div')).not.toBe(null)

  unmount()
  expect(counter).toBe(0)
})

test('completed props stream should throw an exception', () => {
  const Div = componentFromStream(props$ => {
    const first$ = props$.filter(() => false).first().startWith(null)

    return props$.combineLatest(first$, props1 => <div {...props1} />)
  })

  const { container, unmount } = render(<Div />)

  expect(container.querySelector('div')).not.toBe(null)

  const error = jest.spyOn(console, 'error').mockImplementation(() => {})

  expect(() => unmount()).toThrowError(/no elements in sequence/)
  expect(error).toHaveBeenCalled()
})
