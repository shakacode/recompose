import React from 'react'
import { render } from '@testing-library/react'
import setObservableConfig from '../setObservableConfig'
import rxjs4Config from '../rxjs4ObservableConfig'
import { mapPropsStream } from '../'

setObservableConfig(rxjs4Config)

// Most of mapPropsStream's functionality is covered by componentFromStream
test('mapPropsStream creates a higher-order component from a stream', () => {
  const Double = mapPropsStream(props$ =>
    props$.map(({ n }) => ({ children: n * 2 }))
  )('div')
  const { container, rerender } = render(<Double n={112} />)
  const div = container.querySelector('div')
  expect(div.textContent).toBe('224')
  rerender(<Double n={358} />)
  expect(container.querySelector('div').textContent).toBe('716')
})
