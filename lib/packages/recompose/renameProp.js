const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _extends3 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

const _omit = _interopRequireDefault(require('./utils/omit'))

const _mapProps = _interopRequireDefault(require('./mapProps'))

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const renameProp = function renameProp(oldName, newName) {
  const hoc = (0, _mapProps.default)(props => {
    let _extends2

    return (0, _extends3.default)(
      {},
      (0, _omit.default)(props, [oldName]),
      ((_extends2 = {}), (_extends2[newName] = props[oldName]), _extends2)
    )
  })

  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'renameProp')
      )(hoc(BaseComponent))
    }
  }

  return hoc
}

const _default = renameProp
exports.default = _default
