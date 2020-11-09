const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

const _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

const _react = require('react')

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const _mapValues = _interopRequireDefault(require('./utils/mapValues'))

/* eslint-disable no-console */
const withHandlers = function withHandlers(handlers) {
  return function(BaseComponent) {
    const factory = (0, _react.createFactory)(BaseComponent)

    const WithHandlers =
      /* #__PURE__ */
      (function(_Component) {
        ;(0, _inheritsLoose2.default)(WithHandlers, _Component)

        function WithHandlers() {
          let _this

          for (
            var _len = arguments.length, _args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            _args[_key] = arguments[_key]
          }

          _this = _Component.call(...[this].concat(_args)) || this
          _this.handlers = (0, _mapValues.default)(
            typeof handlers === 'function' ? handlers(_this.props) : handlers,
            createHandler =>
              function() {
                const handler = createHandler(_this.props)

                if (
                  process.env.NODE_ENV !== 'production' &&
                  typeof handler !== 'function'
                ) {
                  console.error(
                    // eslint-disable-line no-console
                    'withHandlers(): Expected a map of higher-order functions. ' +
                      'Refer to the docs for more info.'
                  )
                }

                return handler(...arguments)
              }
          )
          return _this
        }

        const _proto = WithHandlers.prototype

        _proto.render = function render() {
          return factory((0, _extends2.default)({}, this.props, this.handlers))
        }

        return WithHandlers
      })(_react.Component)

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'withHandlers')
      )(WithHandlers)
    }

    return WithHandlers
  }
}

const _default = withHandlers
exports.default = _default
