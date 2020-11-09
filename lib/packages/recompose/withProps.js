const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _mapProps = _interopRequireDefault(require('./mapProps'))

const withProps = function withProps(input) {
  const hoc = (0, _mapProps.default)(props =>
    (0, _extends2.default)(
      {},
      props,
      typeof input === 'function' ? input(props) : input
    )
  )

  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'withProps')
      )(hoc(BaseComponent))
    }
  }

  return hoc
}

const _default = withProps
exports.default = _default
