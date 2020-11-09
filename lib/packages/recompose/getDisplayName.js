exports.__esModule = true
exports.default = void 0

const getDisplayName = function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component
  }

  if (!Component) {
    return undefined
  }

  return Component.displayName || Component.name || 'Component'
}

const _default = getDisplayName
exports.default = _default
