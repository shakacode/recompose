const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _getDisplayName = _interopRequireDefault(require('./getDisplayName'))

const wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return `${hocName}(${(0, _getDisplayName.default)(BaseComponent)})`
}

const _default = wrapDisplayName
exports.default = _default
