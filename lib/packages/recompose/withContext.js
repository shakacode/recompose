const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

const _react = require('react')

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const withContext = function withContext(childContextTypes, getChildContext) {
  return function(BaseComponent) {
    const factory = (0, _react.createFactory)(BaseComponent)

    const WithContext =
      /* #__PURE__ */
      (function(_Component) {
        ;(0, _inheritsLoose2.default)(WithContext, _Component)

        function WithContext() {
          let _this

          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key]
          }

          _this = _Component.call(...[this].concat(args)) || this

          _this.getChildContext = function() {
            return getChildContext(_this.props)
          }

          return _this
        }

        const _proto = WithContext.prototype

        _proto.render = function render() {
          return factory(this.props)
        }

        return WithContext
      })(_react.Component)

    WithContext.childContextTypes = childContextTypes

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'withContext')
      )(WithContext)
    }

    return WithContext
  }
}

const _default = withContext
exports.default = _default
