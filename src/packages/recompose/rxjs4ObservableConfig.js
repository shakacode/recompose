import $$observable from 'symbol-observable'
import Rx from 'rx'

const config = {
  fromESObservable: observable =>
    Rx.Observable.create(observer => {
      const { unsubscribe } = observable.subscribe({
        next: val => observer.onNext(val),
        error: error => observer.onError(error),
        complete: () => observer.onCompleted(),
      })
      return unsubscribe
    }),
  toESObservable: rxObservable => ({
    subscribe: observer => {
      const subscription = rxObservable.subscribe(
        val => observer.next && observer.next(val),
        err => observer.error && observer.error(err),
        () => observer.complete && observer.complete()
      )
      return { unsubscribe: () => subscription.dispose() }
    },
    [$$observable]() {
      return this
    },
  }),
}

export default config
