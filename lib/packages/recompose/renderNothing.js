const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

const _react = require('react')

const Nothing =
  /* #__PURE__ */
  (function(_Component) {
    ;(0, _inheritsLoose2.default)(Nothing, _Component)

    function Nothing() {
      return _Component.apply(this, arguments) || this
    }

    const _proto = Nothing.prototype

    _proto.render = function render() {
      return null
    }

    return Nothing
  })(_react.Component)

const renderNothing = function renderNothing(_) {
  return Nothing
}

const _default = renderNothing
exports.default = _default
