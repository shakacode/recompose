const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _setStatic = _interopRequireDefault(require('./setStatic'))

const setDisplayName = function setDisplayName(displayName) {
  return (0, _setStatic.default)('displayName', displayName)
}

const _default = setDisplayName
exports.default = _default
