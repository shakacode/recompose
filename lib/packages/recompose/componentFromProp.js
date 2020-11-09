const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _react = require('react')

const _omit = _interopRequireDefault(require('./utils/omit'))

const componentFromProp = function componentFromProp(propName) {
  const Component = function Component(props) {
    return (0, _react.createElement)(
      props[propName],
      (0, _omit.default)(props, [propName])
    )
  }

  Component.displayName = `componentFromProp(${propName})`
  return Component
}

const _default = componentFromProp
exports.default = _default
