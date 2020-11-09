exports.__esModule = true
exports.default = void 0

const _most = require('most')

const config = {
  fromESObservable: _most.from || _most.Stream.from,
  toESObservable: function toESObservable(stream) {
    return stream
  },
}
const _default = config
exports.default = _default
