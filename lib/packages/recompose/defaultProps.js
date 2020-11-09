const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _react = require('react')

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const defaultProps = function defaultProps(props) {
  return function(BaseComponent) {
    const factory = (0, _react.createFactory)(BaseComponent)

    const DefaultProps = function DefaultProps(ownerProps) {
      return factory(ownerProps)
    }

    DefaultProps.defaultProps = props

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'defaultProps')
      )(DefaultProps)
    }

    return DefaultProps
  }
}

const _default = defaultProps
exports.default = _default
