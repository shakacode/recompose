const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = exports.mapPropsStreamWithConfig = void 0

const _react = require('react')

const _symbolObservable = _interopRequireDefault(require('symbol-observable'))

const _componentFromStream = require('./componentFromStream')

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const _setObservableConfig = require('./setObservableConfig')

const identity = function identity(t) {
  return t
}

const mapPropsStreamWithConfig = function mapPropsStreamWithConfig(config) {
  const componentFromStream = (
    0,
    _componentFromStream.componentFromStreamWithConfig
  )({
    fromESObservable: identity,
    toESObservable: identity,
  })
  return function(transform) {
    return function(BaseComponent) {
      const factory = (0, _react.createFactory)(BaseComponent)
      const fromESObservable = config.fromESObservable

      const toESObservable = config.toESObservable
      return componentFromStream(props$ => {
        let _ref

        return (_ref = {
          subscribe: function subscribe(observer) {
            const subscription = toESObservable(
              transform(fromESObservable(props$))
            ).subscribe({
              next: function next(childProps) {
                return observer.next(factory(childProps))
              },
            })
            return {
              unsubscribe: function unsubscribe() {
                return subscription.unsubscribe()
              },
            }
          },
        }), (_ref[_symbolObservable.default] = function() {
          return this
        }), _ref
      })
    }
  }
}

exports.mapPropsStreamWithConfig = mapPropsStreamWithConfig

const mapPropsStream = function mapPropsStream(transform) {
  const hoc = mapPropsStreamWithConfig(_setObservableConfig.config)(transform)

  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'mapPropsStream')
      )(hoc(BaseComponent))
    }
  }

  return hoc
}

const _default = mapPropsStream
exports.default = _default
