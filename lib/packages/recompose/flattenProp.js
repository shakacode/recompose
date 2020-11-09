const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

const _react = require('react')

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const flattenProp = function flattenProp(propName) {
  return function(BaseComponent) {
    const factory = (0, _react.createFactory)(BaseComponent)

    const FlattenProp = function FlattenProp(props) {
      return factory((0, _extends2.default)({}, props, props[propName]))
    }

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'flattenProp')
      )(FlattenProp)
    }

    return FlattenProp
  }
}

const _default = flattenProp
exports.default = _default
