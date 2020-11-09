const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _symbolObservable = _interopRequireDefault(require('symbol-observable'))

const _xstream = _interopRequireDefault(require('xstream'))

const noop = function noop() {}

const config = {
  fromESObservable: function fromESObservable(observable) {
    return _xstream.default.create({
      subscription: null,
      start: function start(listener) {
        this.subscription = observable.subscribe(listener)
      },
      stop: function stop() {
        this.subscription.unsubscribe()
      },
    })
  },
  toESObservable: function toESObservable(stream) {
    let _ref

    return (_ref = {
      subscribe: function subscribe(observer) {
        const listener = {
          next: observer.next || noop,
          error: observer.error || noop,
          complete: observer.complete || noop,
        }
        stream.addListener(listener)
        return {
          unsubscribe: function unsubscribe() {
            return stream.removeListener(listener)
          },
        }
      },
    }), (_ref[_symbolObservable.default] = function() {
      return this
    }), _ref
  },
}
const _default = config
exports.default = _default
