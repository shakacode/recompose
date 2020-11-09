const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

const _omit = _interopRequireDefault(require('./utils/omit'))

const _pick = _interopRequireDefault(require('./utils/pick'))

const _mapProps = _interopRequireDefault(require('./mapProps'))

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const keys = Object.keys

const mapKeys = function mapKeys(obj, func) {
  return keys(obj).reduce((result, key) => {
    const val = obj[key]
    /* eslint-disable no-param-reassign */

    result[func(val, key)] = val
    /* eslint-enable no-param-reassign */

    return result
  }, {})
}

const renameProps = function renameProps(nameMap) {
  const hoc = (0, _mapProps.default)(props =>
    (0, _extends2.default)(
      {},
      (0, _omit.default)(props, keys(nameMap)),
      mapKeys(
        (0, _pick.default)(props, keys(nameMap)),
        (_, oldName) => nameMap[oldName]
      )
    )
  )

  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'renameProps')
      )(hoc(BaseComponent))
    }
  }

  return hoc
}

const _default = renameProps
exports.default = _default
