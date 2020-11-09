const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _react = require('react')

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const renderComponent = function renderComponent(Component) {
  return function(_) {
    const factory = (0, _react.createFactory)(Component)

    const RenderComponent = function RenderComponent(props) {
      return factory(props)
    }

    if (process.env.NODE_ENV !== 'production') {
      RenderComponent.displayName = (0, _wrapDisplayName.default)(
        Component,
        'renderComponent'
      )
    }

    return RenderComponent
  }
}

const _default = renderComponent
exports.default = _default
