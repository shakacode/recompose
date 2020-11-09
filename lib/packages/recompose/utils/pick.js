exports.__esModule = true
exports.default = void 0

const pick = function pick(obj, keys) {
  const result = {}

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]
    }
  }

  return result
}

const _default = pick
exports.default = _default
