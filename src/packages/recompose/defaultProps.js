import { createElement } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'

const defaultProps = props => BaseComponent => {
  const DefaultProps = ownerProps => createElement(BaseComponent, ownerProps)
  DefaultProps.defaultProps = props
  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'defaultProps'))(
      DefaultProps
    )
  }
  return DefaultProps
}

export default defaultProps
