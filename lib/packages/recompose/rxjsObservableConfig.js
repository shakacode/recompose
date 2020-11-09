const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _rxjs = _interopRequireDefault(require('rxjs'))

const config = {
  fromESObservable: _rxjs.default.Observable.from,
  toESObservable: function toESObservable(stream) {
    return stream
  },
}
const _default = config
exports.default = _default
