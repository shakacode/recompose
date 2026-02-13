import { createElement } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'

const flattenProp = propName => BaseComponent => {
  const FlattenProp = props =>
    createElement(BaseComponent, {
      ...props,
      ...props[propName],
    })

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'flattenProp'))(
      FlattenProp
    )
  }
  return FlattenProp
}

export default flattenProp
