import React from 'react'
import { render } from '@testing-library/react'
import { toRenderProps, defaultProps } from '../'

test('toRenderProps creates a component from defaultProps HOC', () => {
  const enhance = defaultProps({ foo: 'bar' })
  const Enhanced = toRenderProps(enhance)

  expect(Enhanced.displayName).toBe('defaultProps(RenderPropsComponent)')

  const { container } = render(
    <Enhanced>
      {({ foo }) =>
        <h1>
          {foo}
        </h1>}
    </Enhanced>
  )

  const h1 = container.querySelector('h1')
  expect(h1.innerHTML).toBe('bar')
})
