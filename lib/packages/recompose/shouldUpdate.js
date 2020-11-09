const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

const _react = require('react')

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const shouldUpdate = function shouldUpdate(test) {
  return function(BaseComponent) {
    const factory = (0, _react.createFactory)(BaseComponent)

    const ShouldUpdate =
      /* #__PURE__ */
      (function(_Component) {
        ;(0, _inheritsLoose2.default)(ShouldUpdate, _Component)

        function ShouldUpdate() {
          return _Component.apply(this, arguments) || this
        }

        const _proto = ShouldUpdate.prototype

        _proto.shouldComponentUpdate = function shouldComponentUpdate(
          nextProps
        ) {
          return test(this.props, nextProps)
        }

        _proto.render = function render() {
          return factory(this.props)
        }

        return ShouldUpdate
      })(_react.Component)

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'shouldUpdate')
      )(ShouldUpdate)
    }

    return ShouldUpdate
  }
}

const _default = shouldUpdate
exports.default = _default
