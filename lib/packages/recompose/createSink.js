const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

const _react = require('react')

const _reactLifecyclesCompat = require('react-lifecycles-compat')

const createSink = function createSink(callback) {
  const Sink =
    /* #__PURE__ */
    (function(_Component) {
      ;(0, _inheritsLoose2.default)(Sink, _Component)

      function Sink() {
        let _this

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        _this = _Component.call(...[this].concat(args)) || this
        _this.state = {}
        return _this
      }

      Sink.getDerivedStateFromProps = function getDerivedStateFromProps(
        nextProps
      ) {
        callback(nextProps)
        return null
      }

      const _proto = Sink.prototype

      _proto.render = function render() {
        return null
      }

      return Sink
    })(_react.Component)
  ;(0, _reactLifecyclesCompat.polyfill)(Sink)
  return Sink
}

const _default = createSink
exports.default = _default
