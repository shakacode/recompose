import React from 'react'
import { render } from '@testing-library/react'
import { Stream as MostStream } from 'most'
import { Observable } from 'rxjs'
import { mapPropsStreamWithConfig } from '../'
import rxConfig from '../rxjsObservableConfig'
import mostConfig from '../mostObservableConfig'

// Most of mapPropsStreamConfig's functionality is covered by componentFromStream
test('mapPropsStreamWithConfig creates a higher-order component from a stream and a observable config', () => {
  const Double = mapPropsStreamWithConfig(rxConfig)(props$ =>
    props$.map(({ n }) => ({ children: n * 2 }))
  )('div')
  const { container, rerender } = render(<Double n={112} />)
  const div = container.querySelector('div')
  expect(div.textContent).toBe('224')
  rerender(<Double n={358} />)
  expect(container.querySelector('div').textContent).toBe('716')
})

test('mapPropsStreamWithConfig creates a stream with the correct config', () => {
  const MostComponent = mapPropsStreamWithConfig(mostConfig)(props$ => {
    expect(props$ instanceof MostStream).toBe(true)
    return props$.map(v => v)
  })('div')

  render(<MostComponent />)

  const RXJSComponent = mapPropsStreamWithConfig(rxConfig)(props$ => {
    expect(props$ instanceof Observable).toBe(true)
    return props$.map(v => v)
  })('div')

  render(<RXJSComponent />)
})
