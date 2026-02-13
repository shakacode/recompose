import { createElement } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'

const identity = Component => Component

const branch = (test, left, right = identity) => BaseComponent => {
  let leftComponent
  let rightComponent
  const Branch = props => {
    if (test(props)) {
      leftComponent = leftComponent || left(BaseComponent)
      return createElement(leftComponent, props)
    }
    rightComponent = rightComponent || right(BaseComponent)
    return createElement(rightComponent, props)
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'branch'))(Branch)
  }
  return Branch
}

export default branch
