import React from 'react'
import { render } from '@testing-library/react'
import { Observable } from 'rxjs'
import { Stream as MostStream } from 'most'
import mostConfig from '../mostObservableConfig'
import rxjsConfig from '../rxjsObservableConfig'
import { componentFromStreamWithConfig } from '../componentFromStream'

test('componentFromStreamWithConfig creates a stream with the correct stream type.', () => {
  const MostComponent = componentFromStreamWithConfig(mostConfig)(props$ => {
    expect(props$ instanceof MostStream).toBe(true)
    return props$.map(v =>
      <div>
        {String(v)}
      </div>
    )
  })

  render(<MostComponent />)

  const RXJSComponent = componentFromStreamWithConfig(rxjsConfig)(props$ => {
    expect(props$ instanceof Observable).toBe(true)
    return props$.map(v =>
      <div>
        {String(v)}
      </div>
    )
  })

  render(<RXJSComponent />)
})
