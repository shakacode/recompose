exports.__esModule = true
exports.default = void 0

const compose = function compose() {
  for (
    var _len = arguments.length, funcs = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    funcs[_key] = arguments[_key]
  }

  return funcs.reduce(
    (a, b) =>
      function() {
        return a(b(...arguments))
      },
    arg => arg
  )
}

const _default = compose
exports.default = _default
