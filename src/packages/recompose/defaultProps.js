import { createElement } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'

const defaultProps = defaults => BaseComponent => {
  const DefaultProps = ownerProps => {
    const props = { ...defaults }
    Object.keys(ownerProps).forEach(key => {
      if (ownerProps[key] !== undefined || !(key in defaults)) {
        props[key] = ownerProps[key]
      }
    })
    return createElement(BaseComponent, props)
  }
  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'defaultProps'))(
      DefaultProps
    )
  }
  return DefaultProps
}

export default defaultProps
