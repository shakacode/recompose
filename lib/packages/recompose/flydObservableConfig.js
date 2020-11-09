const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _symbolObservable = _interopRequireDefault(require('symbol-observable'))

const _flyd = _interopRequireDefault(require('flyd'))

const noop = function noop() {}

const config = {
  fromESObservable: function fromESObservable(observable) {
    const stream = _flyd.default.stream()

    const _observable$subscribe = observable.subscribe({
      next: function next(value) {
        return stream(value)
      },
      error: function error(_error) {
        return stream({
          error: _error,
        })
      },
      complete: function complete() {
        return stream.end(true)
      },
    })

    const unsubscribe = _observable$subscribe.unsubscribe

    _flyd.default.on(unsubscribe, stream.end)

    return stream
  },
  toESObservable: function toESObservable(stream) {
    let _ref

    return (_ref = {
      subscribe: function subscribe(observer) {
        const sub = _flyd.default.on(observer.next || noop, stream)

        _flyd.default.on(_ => observer.complete(), sub.end)

        return {
          unsubscribe: function unsubscribe() {
            return sub.end(true)
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
