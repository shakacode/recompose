const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _react = require('react')

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const mapProps = function mapProps(propsMapper) {
  return function(BaseComponent) {
    const factory = (0, _react.createFactory)(BaseComponent)

    const MapProps = function MapProps(props) {
      return factory(propsMapper(props))
    }

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'mapProps')
      )(MapProps)
    }

    return MapProps
  }
}

const _default = mapProps
exports.default = _default
