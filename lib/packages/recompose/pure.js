const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _shouldUpdate = _interopRequireDefault(require('./shouldUpdate'))

const _shallowEqual = _interopRequireDefault(require('./shallowEqual'))

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const pure = function pure(BaseComponent) {
  const hoc = (0, _shouldUpdate.default)(
    (props, nextProps) => !(0, _shallowEqual.default)(props, nextProps)
  )

  if (process.env.NODE_ENV !== 'production') {
    return (0, _setDisplayName.default)(
      (0, _wrapDisplayName.default)(BaseComponent, 'pure')
    )(hoc(BaseComponent))
  }

  return hoc(BaseComponent)
}

const _default = pure
exports.default = _default
