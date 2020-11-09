const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = exports.createEventHandlerWithConfig = void 0

const _symbolObservable = _interopRequireDefault(require('symbol-observable'))

const _changeEmitter = require('change-emitter')

const _setObservableConfig = require('./setObservableConfig')

const createEventHandlerWithConfig = function createEventHandlerWithConfig(
  config
) {
  return function() {
    let _config$fromESObserva

    const emitter = (0, _changeEmitter.createChangeEmitter)()
    const stream = config.fromESObservable(
      (
        (_config$fromESObserva = {
          subscribe: function subscribe(observer) {
            const unsubscribe = emitter.listen(value => observer.next(value))
            return {
              unsubscribe,
            }
          },
        }),
        (_config$fromESObserva[_symbolObservable.default] = function() {
          return this
        }),
        _config$fromESObserva
      )
    )
    return {
      handler: emitter.emit,
      stream,
    }
  }
}

exports.createEventHandlerWithConfig = createEventHandlerWithConfig
const createEventHandler = createEventHandlerWithConfig(
  _setObservableConfig.config
)
const _default = createEventHandler
exports.default = _default
