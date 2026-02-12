import React from 'react'
import { render } from '@testing-library/react'
import { nest, setDisplayName, toClass } from '../'

test('nest nests components from outer to inner', () => {
  const A = setDisplayName('A')(toClass('div'))
  const B = setDisplayName('B')(toClass('div'))
  const C = setDisplayName('C')(toClass('div'))

  const Nest = nest(A, B, C)

  expect(Nest.displayName).toBe('nest(A, B, C)')

  const { container } = render(<Nest pass="through">Child</Nest>)
  // nest(A,B,C) creates nested divs, all with pass="through"
  const divs = container.querySelectorAll('div')
  expect(divs.length).toBe(3)
  divs.forEach(div => expect(div.getAttribute('pass')).toBe('through'))
  expect(container.textContent).toBe('Child')
})
