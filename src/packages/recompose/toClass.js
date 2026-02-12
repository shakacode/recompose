import React, { Component } from 'react'
import getDisplayName from './getDisplayName'
import isClassComponent from './isClassComponent'

const toClass = baseComponent =>
  isClassComponent(baseComponent)
    ? baseComponent
    : class ToClass extends Component {
        static displayName = getDisplayName(baseComponent)
        static propTypes = baseComponent.propTypes
        static defaultProps = baseComponent.defaultProps
        render() {
          if (typeof baseComponent === 'string') {
            return React.createElement(baseComponent, this.props)
          }
          return baseComponent(this.props)
        }
      }
export default toClass
