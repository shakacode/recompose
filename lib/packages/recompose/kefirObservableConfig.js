const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _kefir = _interopRequireDefault(require('kefir'))

const config = {
  fromESObservable: _kefir.default.fromESObservable,
  toESObservable: function toESObservable(stream) {
    return stream.toESObservable()
  },
}
const _default = config
exports.default = _default
