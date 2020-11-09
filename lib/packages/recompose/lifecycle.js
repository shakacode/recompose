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

/* eslint-disable no-console */
const lifecycle = function lifecycle(spec) {
  return function(BaseComponent) {
    const factory = (0, _react.createFactory)(BaseComponent)

    if (
      process.env.NODE_ENV !== 'production' &&
      spec.hasOwnProperty('render')
    ) {
      console.error(
        'lifecycle() does not support the render method; its behavior is to ' +
          'pass all props and state to the base component.'
      )
    }

    const Lifecycle =
      /* #__PURE__ */
      (function(_Component) {
        ;(0, _inheritsLoose2.default)(Lifecycle, _Component)

        function Lifecycle() {
          return _Component.apply(this, arguments) || this
        }

        const _proto = Lifecycle.prototype

        _proto.render = function render() {
          return factory((0, _extends2.default)({}, this.props, this.state))
        }

        return Lifecycle
      })(_react.Component)

    Object.keys(spec).forEach(hook => (Lifecycle.prototype[hook] = spec[hook]))

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'lifecycle')
      )(Lifecycle)
    }

    return Lifecycle
  }
}

const _default = lifecycle
exports.default = _default
