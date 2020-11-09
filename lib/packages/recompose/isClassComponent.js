exports.__esModule = true
exports.default = void 0

const isClassComponent = function isClassComponent(Component) {
  return Boolean(
    Component &&
      Component.prototype &&
      typeof Component.prototype.render === 'function'
  )
}

const _default = isClassComponent
exports.default = _default
