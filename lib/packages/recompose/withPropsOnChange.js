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

const _reactLifecyclesCompat = require('react-lifecycles-compat')

const _pick = _interopRequireDefault(require('./utils/pick'))

const _shallowEqual = _interopRequireDefault(require('./shallowEqual'))

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const withPropsOnChange = function withPropsOnChange(
  shouldMapOrKeys,
  propsMapper
) {
  return function(BaseComponent) {
    const factory = (0, _react.createFactory)(BaseComponent)
    const shouldMap =
      typeof shouldMapOrKeys === 'function'
        ? shouldMapOrKeys
        : function(props, nextProps) {
            return !(0, _shallowEqual.default)(
              (0, _pick.default)(props, shouldMapOrKeys),
              (0, _pick.default)(nextProps, shouldMapOrKeys)
            )
          }

    const WithPropsOnChange =
      /* #__PURE__ */
      (function(_Component) {
        ;(0, _inheritsLoose2.default)(WithPropsOnChange, _Component)

        function WithPropsOnChange() {
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
            computedProps: propsMapper(_this.props),
            prevProps: _this.props,
          }
          return _this
        }

        WithPropsOnChange.getDerivedStateFromProps = function getDerivedStateFromProps(
          nextProps,
          prevState
        ) {
          if (shouldMap(prevState.prevProps, nextProps)) {
            return {
              computedProps: propsMapper(nextProps),
              prevProps: nextProps,
            }
          }

          return {
            prevProps: nextProps,
          }
        }

        const _proto = WithPropsOnChange.prototype

        _proto.render = function render() {
          return factory(
            (0, _extends2.default)({}, this.props, this.state.computedProps)
          )
        }

        return WithPropsOnChange
      })(_react.Component)
    ;(0, _reactLifecyclesCompat.polyfill)(WithPropsOnChange)

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'withPropsOnChange')
      )(WithPropsOnChange)
    }

    return WithPropsOnChange
  }
}

const _default = withPropsOnChange
exports.default = _default
