import { createElement } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import { getOrCreateContext } from './utils/contextStore'

const withContext = (childContextTypes, getChildContext) => BaseComponent => {
  const contextKeys = Object.keys(childContextTypes)

  const WithContext = props => {
    const contextValues = getChildContext(props)
    let element = createElement(BaseComponent, props)
    contextKeys.forEach(key => {
      const Ctx = getOrCreateContext(key)
      element = createElement(
        Ctx.Provider,
        { value: contextValues[key] },
        element
      )
    })
    return element
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withContext'))(
      WithContext
    )
  }
  return WithContext
}

export default withContext
