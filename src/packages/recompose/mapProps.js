import { createElement } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'

const mapProps = propsMapper => BaseComponent => {
  const MapProps = props => createElement(BaseComponent, propsMapper(props))
  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'mapProps'))(MapProps)
  }
  return MapProps
}

export default mapProps
