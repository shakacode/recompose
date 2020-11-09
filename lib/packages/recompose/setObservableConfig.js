exports.__esModule = true
exports.default = exports.config = void 0
let _config = {
  fromESObservable: null,
  toESObservable: null,
}

const configureObservable = function configureObservable(c) {
  _config = c
}

const config = {
  fromESObservable: function fromESObservable(observable) {
    return typeof _config.fromESObservable === 'function'
      ? _config.fromESObservable(observable)
      : observable
  },
  toESObservable: function toESObservable(stream) {
    return typeof _config.toESObservable === 'function'
      ? _config.toESObservable(stream)
      : stream
  },
}
exports.config = config
const _default = configureObservable
exports.default = _default
