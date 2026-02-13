import { createElement } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import { getOrCreateContext } from './utils/contextStore'

// Note: only the keys of contextTypes are used to select which context values
// to inject. The validator values (PropTypes) are not used for validation since
// PropTypes is deprecated and legacy context was removed in React 19.
const getContext = contextTypes => BaseComponent => {
  const contextKeys = Object.keys(contextTypes)

  // Build a chain of Consumer wrappers
  let Wrapped = BaseComponent
  contextKeys.forEach(key => {
    const Ctx = getOrCreateContext(key)
    const Prev = Wrapped
    Wrapped = props =>
      createElement(Ctx.Consumer, null, value =>
        createElement(Prev, { ...props, [key]: value })
      )
  })

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'getContext'))(Wrapped)
  }
  return Wrapped
}

export default getContext
