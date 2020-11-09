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

const withStateHandlers = function withStateHandlers(
  initialState,
  stateUpdaters
) {
  return function(BaseComponent) {
    const factory = (0, _react.createFactory)(BaseComponent)

    const WithStateHandlers =
      /* #__PURE__ */
      (function(_Component) {
        ;(0, _inheritsLoose2.default)(WithStateHandlers, _Component)

        function WithStateHandlers() {
          let _this

          for (
            var _len = arguments.length, _args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            _args[_key] = arguments[_key]
          }

          _this = _Component.call(...[this].concat(_args)) || this
          _this.state =
            typeof initialState === 'function'
              ? initialState(_this.props)
              : initialState
          _this.stateUpdaters = (0, _mapValues.default)(
            stateUpdaters,
            handler =>
              function(mayBeEvent) {
                for (
                  var _len2 = arguments.length,
                    args = new Array(_len2 > 1 ? _len2 - 1 : 0),
                    _key2 = 1;
                  _key2 < _len2;
                  _key2++
                ) {
                  args[_key2 - 1] = arguments[_key2]
                }

                // Having that functional form of setState can be called async
                // we need to persist SyntheticEvent
                if (mayBeEvent && typeof mayBeEvent.persist === 'function') {
                  mayBeEvent.persist()
                }

                _this.setState((state, props) =>
                  handler(state, props)(...[mayBeEvent].concat(args))
                )
              }
          )
          return _this
        }

        const _proto = WithStateHandlers.prototype

        _proto.render = function render() {
          return factory(
            (0, _extends2.default)(
              {},
              this.props,
              this.state,
              this.stateUpdaters
            )
          )
        }

        return WithStateHandlers
      })(_react.Component)

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'withStateHandlers')
      )(WithStateHandlers)
    }

    return WithStateHandlers
  }
}

const _default = withStateHandlers
exports.default = _default
