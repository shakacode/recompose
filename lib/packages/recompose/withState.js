const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _extends3 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

const _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

const _react = require('react')

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const withState = function withState(
  stateName,
  stateUpdaterName,
  initialState
) {
  return function(BaseComponent) {
    const factory = (0, _react.createFactory)(BaseComponent)

    const WithState =
      /* #__PURE__ */
      (function(_Component) {
        ;(0, _inheritsLoose2.default)(WithState, _Component)

        function WithState() {
          let _this

          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key]
          }

          _this = _Component.call(...[this].concat(args)) || this
          _this.state = {
            stateValue:
              typeof initialState === 'function'
                ? initialState(_this.props)
                : initialState,
          }

          _this.updateStateValue = function(updateFn, callback) {
            return _this.setState(_ref => {
              const stateValue = _ref.stateValue
              return {
                stateValue:
                  typeof updateFn === 'function'
                    ? updateFn(stateValue)
                    : updateFn,
              }
            }, callback)
          }

          return _this
        }

        const _proto = WithState.prototype

        _proto.render = function render() {
          let _extends2

          return factory(
            (0, _extends3.default)(
              {},
              this.props,
              (
                (_extends2 = {}),
                (_extends2[stateName] = this.state.stateValue),
                (_extends2[stateUpdaterName] = this.updateStateValue),
                _extends2
              )
            )
          )
        }

        return WithState
      })(_react.Component)

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'withState')
      )(WithState)
    }

    return WithState
  }
}

const _default = withState
exports.default = _default
