exports.__esModule = true
exports.default = void 0

const setStatic = function setStatic(key, value) {
  return function(BaseComponent) {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value
    /* eslint-enable no-param-reassign */

    return BaseComponent
  }
}

const _default = setStatic
exports.default = _default
