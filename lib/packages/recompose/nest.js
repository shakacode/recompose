const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _objectWithoutPropertiesLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
)

const _react = require('react')

const _getDisplayName = _interopRequireDefault(require('./getDisplayName'))

const nest = function nest() {
  for (
    var _len = arguments.length, Components = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    Components[_key] = arguments[_key]
  }

  const factories = Components.map(_react.createFactory)

  const Nest = function Nest(_ref) {
    const children = _ref.children

    const props = (0, _objectWithoutPropertiesLoose2.default)(_ref, [
      'children',
    ])
    return factories.reduceRight(
      (child, factory) => factory(props, child),
      children
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayNames = Components.map(_getDisplayName.default)
    Nest.displayName = `nest(${displayNames.join(', ')})`
  }

  return Nest
}

const _default = nest
exports.default = _default
