const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _symbolObservable = _interopRequireDefault(require('symbol-observable'))

const _rx = _interopRequireDefault(require('rx'))

const config = {
  fromESObservable: function fromESObservable(observable) {
    return _rx.default.Observable.create(observer => {
      const _observable$subscribe = observable.subscribe({
        next: function next(val) {
          return observer.onNext(val)
        },
        error: function error(_error) {
          return observer.onError(_error)
        },
        complete: function complete() {
          return observer.onCompleted()
        },
      })

      const unsubscribe = _observable$subscribe.unsubscribe

      return unsubscribe
    })
  },
  toESObservable: function toESObservable(rxObservable) {
    let _ref

    return (_ref = {
      subscribe: function subscribe(observer) {
        const subscription = rxObservable.subscribe(
          val => observer.next(val),
          error => observer.error(error),
          () => observer.complete()
        )
        return {
          unsubscribe: function unsubscribe() {
            return subscription.dispose()
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
