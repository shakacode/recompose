const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

const omit = function omit(obj, keys) {
  const rest = (0, _extends2.default)({}, obj)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    if (rest.hasOwnProperty(key)) {
      delete rest[key]
    }
  }

  return rest
}

const _default = omit
exports.default = _default
