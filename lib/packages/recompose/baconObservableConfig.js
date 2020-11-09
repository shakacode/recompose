const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _symbolObservable = _interopRequireDefault(require('symbol-observable'))

const _baconjs = _interopRequireDefault(require('baconjs'))

const config = {
  fromESObservable: function fromESObservable(observable) {
    return _baconjs.default.fromBinder(sink => {
      const _observable$subscribe = observable.subscribe({
        next: function next(val) {
          return sink(new _baconjs.default.Next(val))
        },
        error: function error(err) {
          return sink(new _baconjs.default.Error(err))
        },
        complete: function complete() {
          return sink(new _baconjs.default.End())
        },
      })

      const unsubscribe = _observable$subscribe.unsubscribe

      return unsubscribe
    })
  },
  toESObservable: function toESObservable(stream) {
    let _ref

    return (_ref = {
      subscribe: function subscribe(observer) {
        const unsubscribe = stream.subscribe(event => {
          if (event.hasValue()) {
            observer.next(event.value())
          } else if (event.isError()) {
            observer.error(event.error)
          } else if (event.isEnd()) {
            observer.complete()
          }
        })
        return {
          unsubscribe,
        }
      },
    }), (_ref[_symbolObservable.default] = function() {
      return this
    }), _ref
  },
}
const _default = config
exports.default = _default
