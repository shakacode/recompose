import { createElement } from 'react'
import getDisplayName from './getDisplayName'

const nest = (...Components) => {
  const Nest = ({ children, ...props }) =>
    Components.reduceRight(
      (child, C) => createElement(C, props, child),
      children
    )

  if (process.env.NODE_ENV !== 'production') {
    const displayNames = Components.map(getDisplayName)
    Nest.displayName = `nest(${displayNames.join(', ')})`
  }

  return Nest
}

export default nest
