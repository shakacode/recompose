const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _hoistNonReactStatics = _interopRequireDefault(
  require('hoist-non-react-statics')
)

const hoistStatics = function hoistStatics(higherOrderComponent, blacklist) {
  return function(BaseComponent) {
    const NewComponent = higherOrderComponent(BaseComponent)
    ;(0, _hoistNonReactStatics.default)(NewComponent, BaseComponent, blacklist)
    return NewComponent
  }
}

const _default = hoistStatics
exports.default = _default
