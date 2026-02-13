import { createElement } from 'react'
import wrapDisplayName from './wrapDisplayName'

const renderComponent = Component => _ => {
  const RenderComponent = props => createElement(Component, props)
  if (process.env.NODE_ENV !== 'production') {
    RenderComponent.displayName = wrapDisplayName(Component, 'renderComponent')
  }
  return RenderComponent
}

export default renderComponent
