const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

const _react = require('react')

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const getContext = function getContext(contextTypes) {
  return function(BaseComponent) {
    const factory = (0, _react.createFactory)(BaseComponent)

    const GetContext = function GetContext(ownerProps, context) {
      return factory((0, _extends2.default)({}, ownerProps, context))
    }

    GetContext.contextTypes = contextTypes

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'getContext')
      )(GetContext)
    }

    return GetContext
  }
}

const _default = getContext
exports.default = _default
