const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _shouldUpdate = _interopRequireDefault(require('./shouldUpdate'))

const _shallowEqual = _interopRequireDefault(require('./shallowEqual'))

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const _pick = _interopRequireDefault(require('./utils/pick'))

const onlyUpdateForKeys = function onlyUpdateForKeys(propKeys) {
  const hoc = (0, _shouldUpdate.default)(
    (props, nextProps) =>
      !(0, _shallowEqual.default)(
        (0, _pick.default)(nextProps, propKeys),
        (0, _pick.default)(props, propKeys)
      )
  )

  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'onlyUpdateForKeys')
      )(hoc(BaseComponent))
    }
  }

  return hoc
}

const _default = onlyUpdateForKeys
exports.default = _default
