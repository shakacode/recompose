import { createElement } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'

const getContext = contextTypes => BaseComponent => {
  const GetContext = (ownerProps, context) =>
    createElement(BaseComponent, {
      ...ownerProps,
      ...context,
    })

  GetContext.contextTypes = contextTypes

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'getContext'))(
      GetContext
    )
  }
  return GetContext
}

export default getContext
