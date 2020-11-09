exports.__esModule = true
exports.default = void 0

const mapValues = function mapValues(obj, func) {
  const result = {}
  /* eslint-disable no-restricted-syntax */

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = func(obj[key], key)
    }
  }
  /* eslint-enable no-restricted-syntax */

  return result
}

const _default = mapValues
exports.default = _default
