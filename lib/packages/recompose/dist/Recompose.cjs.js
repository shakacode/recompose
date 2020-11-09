Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex.default : ex
}

const React = require('react')

const React__default = _interopDefault(React)
const _extends = _interopDefault(require('@babel/runtime/helpers/extends'))
const _inheritsLoose = _interopDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)
const reactLifecyclesCompat = require('react-lifecycles-compat')
const _objectWithoutPropertiesLoose = _interopDefault(
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
)
const hoistNonReactStatics = _interopDefault(require('hoist-non-react-statics'))
const changeEmitter = require('change-emitter')
const $$observable = _interopDefault(require('symbol-observable'))

const setStatic = function setStatic(key, value) {
  return function(BaseComponent) {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value
    /* eslint-enable no-param-reassign */

    return BaseComponent
  }
}

const setDisplayName = function setDisplayName(displayName) {
  return setStatic('displayName', displayName)
}

const getDisplayName = function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component
  }

  if (!Component) {
    return undefined
  }

  return Component.displayName || Component.name || 'Component'
}

const wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return `${hocName}(${getDisplayName(BaseComponent)})`
}

const mapProps = function mapProps(propsMapper) {
  return function(BaseComponent) {
    const factory = React.createFactory(BaseComponent)

    const MapProps = function MapProps(props) {
      return factory(propsMapper(props))
    }

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'mapProps'))(
        MapProps
      )
    }

    return MapProps
  }
}

const withProps = function withProps(input) {
  const hoc = mapProps(props =>
    _extends({}, props, typeof input === 'function' ? input(props) : input)
  )

  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withProps'))(
        hoc(BaseComponent)
      )
    }
  }

  return hoc
}

const pick = function pick(obj, keys) {
  const result = {}

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]
    }
  }

  return result
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule shallowEqual
 * @typechecks
 */

/* eslint-disable no-self-compare */
const hasOwnProperty = Object.prototype.hasOwnProperty
/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */

function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } // Step 6.a: NaN == NaN

  return x !== x && y !== y
}
/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */

function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  } // Test for A's keys different from B.

  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false
    }
  }

  return true
}

const withPropsOnChange = function withPropsOnChange(
  shouldMapOrKeys,
  propsMapper
) {
  return function(BaseComponent) {
    const factory = React.createFactory(BaseComponent)
    const shouldMap =
      typeof shouldMapOrKeys === 'function'
        ? shouldMapOrKeys
        : function(props, nextProps) {
            return !shallowEqual(
              pick(props, shouldMapOrKeys),
              pick(nextProps, shouldMapOrKeys)
            )
          }

    const WithPropsOnChange =
      /* #__PURE__ */
      (function(_Component) {
        _inheritsLoose(WithPropsOnChange, _Component)

        function WithPropsOnChange() {
          let _this

          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key]
          }

          _this = _Component.call(...[this].concat(args)) || this
          _this.state = {
            computedProps: propsMapper(_this.props),
            prevProps: _this.props,
          }
          return _this
        }

        WithPropsOnChange.getDerivedStateFromProps = function getDerivedStateFromProps(
          nextProps,
          prevState
        ) {
          if (shouldMap(prevState.prevProps, nextProps)) {
            return {
              computedProps: propsMapper(nextProps),
              prevProps: nextProps,
            }
          }

          return {
            prevProps: nextProps,
          }
        }

        const _proto = WithPropsOnChange.prototype

        _proto.render = function render() {
          return factory(_extends({}, this.props, this.state.computedProps))
        }

        return WithPropsOnChange
      })(React.Component)

    reactLifecyclesCompat.polyfill(WithPropsOnChange)

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(
        wrapDisplayName(BaseComponent, 'withPropsOnChange')
      )(WithPropsOnChange)
    }

    return WithPropsOnChange
  }
}

const mapValues = function mapValues(obj, func) {
  const result = {}
  /* eslint-disable no-restricted-syntax */

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = func(obj[key], key)
    }
  }
  /* eslint-enable no-restricted-syntax */

  return result
}

const withHandlers = function withHandlers(handlers) {
  return function(BaseComponent) {
    const factory = React.createFactory(BaseComponent)

    const WithHandlers =
      /* #__PURE__ */
      (function(_Component) {
        _inheritsLoose(WithHandlers, _Component)

        function WithHandlers() {
          let _this

          for (
            var _len = arguments.length, _args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            _args[_key] = arguments[_key]
          }

          _this = _Component.call(...[this].concat(_args)) || this
          _this.handlers = mapValues(
            typeof handlers === 'function' ? handlers(_this.props) : handlers,
            createHandler =>
              function() {
                const handler = createHandler(_this.props)

                if (
                  process.env.NODE_ENV !== 'production' &&
                  typeof handler !== 'function'
                ) {
                  console.error(
                    // eslint-disable-line no-console
                    'withHandlers(): Expected a map of higher-order functions. ' +
                      'Refer to the docs for more info.'
                  )
                }

                return handler(...arguments)
              }
          )
          return _this
        }

        const _proto = WithHandlers.prototype

        _proto.render = function render() {
          return factory(_extends({}, this.props, this.handlers))
        }

        return WithHandlers
      })(React.Component)

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withHandlers'))(
        WithHandlers
      )
    }

    return WithHandlers
  }
}

const defaultProps = function defaultProps(props) {
  return function(BaseComponent) {
    const factory = React.createFactory(BaseComponent)

    const DefaultProps = function DefaultProps(ownerProps) {
      return factory(ownerProps)
    }

    DefaultProps.defaultProps = props

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'defaultProps'))(
        DefaultProps
      )
    }

    return DefaultProps
  }
}

const omit = function omit(obj, keys) {
  const rest = _extends({}, obj)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    if (rest.hasOwnProperty(key)) {
      delete rest[key]
    }
  }

  return rest
}

const renameProp = function renameProp(oldName, newName) {
  const hoc = mapProps(props => {
    let _extends2

    return _extends(
      {},
      omit(props, [oldName]),
      ((_extends2 = {}), (_extends2[newName] = props[oldName]), _extends2)
    )
  })

  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return setDisplayName(wrapDisplayName(BaseComponent, 'renameProp'))(
        hoc(BaseComponent)
      )
    }
  }

  return hoc
}

const keys = Object.keys

const mapKeys = function mapKeys(obj, func) {
  return keys(obj).reduce((result, key) => {
    const val = obj[key]
    /* eslint-disable no-param-reassign */

    result[func(val, key)] = val
    /* eslint-enable no-param-reassign */

    return result
  }, {})
}

const renameProps = function renameProps(nameMap) {
  const hoc = mapProps(props =>
    _extends(
      {},
      omit(props, keys(nameMap)),
      mapKeys(pick(props, keys(nameMap)), (_, oldName) => nameMap[oldName])
    )
  )

  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return setDisplayName(wrapDisplayName(BaseComponent, 'renameProps'))(
        hoc(BaseComponent)
      )
    }
  }

  return hoc
}

const flattenProp = function flattenProp(propName) {
  return function(BaseComponent) {
    const factory = React.createFactory(BaseComponent)

    const FlattenProp = function FlattenProp(props) {
      return factory(_extends({}, props, props[propName]))
    }

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'flattenProp'))(
        FlattenProp
      )
    }

    return FlattenProp
  }
}

const withState = function withState(
  stateName,
  stateUpdaterName,
  initialState
) {
  return function(BaseComponent) {
    const factory = React.createFactory(BaseComponent)

    const WithState =
      /* #__PURE__ */
      (function(_Component) {
        _inheritsLoose(WithState, _Component)

        function WithState() {
          let _this

          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key]
          }

          _this = _Component.call(...[this].concat(args)) || this
          _this.state = {
            stateValue:
              typeof initialState === 'function'
                ? initialState(_this.props)
                : initialState,
          }

          _this.updateStateValue = function(updateFn, callback) {
            return _this.setState(_ref => {
              const stateValue = _ref.stateValue
              return {
                stateValue:
                  typeof updateFn === 'function'
                    ? updateFn(stateValue)
                    : updateFn,
              }
            }, callback)
          }

          return _this
        }

        const _proto = WithState.prototype

        _proto.render = function render() {
          let _extends2

          return factory(
            _extends(
              {},
              this.props,
              (
                (_extends2 = {}),
                (_extends2[stateName] = this.state.stateValue),
                (_extends2[stateUpdaterName] = this.updateStateValue),
                _extends2
              )
            )
          )
        }

        return WithState
      })(React.Component)

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withState'))(
        WithState
      )
    }

    return WithState
  }
}

const withStateHandlers = function withStateHandlers(
  initialState,
  stateUpdaters
) {
  return function(BaseComponent) {
    const factory = React.createFactory(BaseComponent)

    const WithStateHandlers =
      /* #__PURE__ */
      (function(_Component) {
        _inheritsLoose(WithStateHandlers, _Component)

        function WithStateHandlers() {
          let _this

          for (
            var _len = arguments.length, _args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            _args[_key] = arguments[_key]
          }

          _this = _Component.call(...[this].concat(_args)) || this
          _this.state =
            typeof initialState === 'function'
              ? initialState(_this.props)
              : initialState
          _this.stateUpdaters = mapValues(
            stateUpdaters,
            handler =>
              function(mayBeEvent) {
                for (
                  var _len2 = arguments.length,
                    args = new Array(_len2 > 1 ? _len2 - 1 : 0),
                    _key2 = 1;
                  _key2 < _len2;
                  _key2++
                ) {
                  args[_key2 - 1] = arguments[_key2]
                }

                // Having that functional form of setState can be called async
                // we need to persist SyntheticEvent
                if (mayBeEvent && typeof mayBeEvent.persist === 'function') {
                  mayBeEvent.persist()
                }

                _this.setState((state, props) =>
                  handler(state, props)(...[mayBeEvent].concat(args))
                )
              }
          )
          return _this
        }

        const _proto = WithStateHandlers.prototype

        _proto.render = function render() {
          return factory(
            _extends({}, this.props, this.state, this.stateUpdaters)
          )
        }

        return WithStateHandlers
      })(React.Component)

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(
        wrapDisplayName(BaseComponent, 'withStateHandlers')
      )(WithStateHandlers)
    }

    return WithStateHandlers
  }
}

const noop = function noop() {}

const withReducer = function withReducer(
  stateName,
  dispatchName,
  reducer,
  initialState
) {
  return function(BaseComponent) {
    const factory = React.createFactory(BaseComponent)

    const WithReducer =
      /* #__PURE__ */
      (function(_Component) {
        _inheritsLoose(WithReducer, _Component)

        function WithReducer() {
          let _this

          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key]
          }

          _this = _Component.call(...[this].concat(args)) || this
          _this.state = {
            stateValue: _this.initializeStateValue(),
          }

          _this.dispatch = function(action, callback) {
            if (callback === void 0) {
              callback = noop
            }

            return _this.setState(
              _ref => {
                const stateValue = _ref.stateValue
                return {
                  stateValue: reducer(stateValue, action),
                }
              },
              () => callback(_this.state.stateValue)
            )
          }

          return _this
        }

        const _proto = WithReducer.prototype

        _proto.initializeStateValue = function initializeStateValue() {
          if (initialState !== undefined) {
            return typeof initialState === 'function'
              ? initialState(this.props)
              : initialState
          }

          return reducer(undefined, {
            type: '@@recompose/INIT',
          })
        }

        _proto.render = function render() {
          let _extends2

          return factory(
            _extends(
              {},
              this.props,
              (
                (_extends2 = {}),
                (_extends2[stateName] = this.state.stateValue),
                (_extends2[dispatchName] = this.dispatch),
                _extends2
              )
            )
          )
        }

        return WithReducer
      })(React.Component)

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withReducer'))(
        WithReducer
      )
    }

    return WithReducer
  }
}

const identity = function identity(Component) {
  return Component
}

const branch = function branch(test, left, right) {
  if (right === void 0) {
    right = identity
  }

  return function(BaseComponent) {
    let leftFactory
    let rightFactory

    const Branch = function Branch(props) {
      if (test(props)) {
        leftFactory = leftFactory || React.createFactory(left(BaseComponent))
        return leftFactory(props)
      }

      rightFactory = rightFactory || React.createFactory(right(BaseComponent))
      return rightFactory(props)
    }

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'branch'))(Branch)
    }

    return Branch
  }
}

const renderComponent = function renderComponent(Component) {
  return function(_) {
    const factory = React.createFactory(Component)

    const RenderComponent = function RenderComponent(props) {
      return factory(props)
    }

    if (process.env.NODE_ENV !== 'production') {
      RenderComponent.displayName = wrapDisplayName(
        Component,
        'renderComponent'
      )
    }

    return RenderComponent
  }
}

const Nothing =
  /* #__PURE__ */
  (function(_Component) {
    _inheritsLoose(Nothing, _Component)

    function Nothing() {
      return _Component.apply(this, arguments) || this
    }

    const _proto = Nothing.prototype

    _proto.render = function render() {
      return null
    }

    return Nothing
  })(React.Component)

const renderNothing = function renderNothing(_) {
  return Nothing
}

const shouldUpdate = function shouldUpdate(test) {
  return function(BaseComponent) {
    const factory = React.createFactory(BaseComponent)

    const ShouldUpdate =
      /* #__PURE__ */
      (function(_Component) {
        _inheritsLoose(ShouldUpdate, _Component)

        function ShouldUpdate() {
          return _Component.apply(this, arguments) || this
        }

        const _proto = ShouldUpdate.prototype

        _proto.shouldComponentUpdate = function shouldComponentUpdate(
          nextProps
        ) {
          return test(this.props, nextProps)
        }

        _proto.render = function render() {
          return factory(this.props)
        }

        return ShouldUpdate
      })(React.Component)

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'shouldUpdate'))(
        ShouldUpdate
      )
    }

    return ShouldUpdate
  }
}

const pure = function pure(BaseComponent) {
  const hoc = shouldUpdate(
    (props, nextProps) => !shallowEqual(props, nextProps)
  )

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'pure'))(
      hoc(BaseComponent)
    )
  }

  return hoc(BaseComponent)
}

const onlyUpdateForKeys = function onlyUpdateForKeys(propKeys) {
  const hoc = shouldUpdate(
    (props, nextProps) =>
      !shallowEqual(pick(nextProps, propKeys), pick(props, propKeys))
  )

  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return setDisplayName(
        wrapDisplayName(BaseComponent, 'onlyUpdateForKeys')
      )(hoc(BaseComponent))
    }
  }

  return hoc
}

const onlyUpdateForPropTypes = function onlyUpdateForPropTypes(BaseComponent) {
  const propTypes = BaseComponent.propTypes

  if (process.env.NODE_ENV !== 'production') {
    if (!propTypes) {
      /* eslint-disable */
      console.error(
        'A component without any `propTypes` was passed to ' +
          '`onlyUpdateForPropTypes()`. Check the implementation of the ' +
          ('component with display name "' +
            getDisplayName(BaseComponent) +
            '".')
      )
      /* eslint-enable */
    }
  }

  const propKeys = Object.keys(propTypes || {})
  const OnlyUpdateForPropTypes = onlyUpdateForKeys(propKeys)(BaseComponent)

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(
      wrapDisplayName(BaseComponent, 'onlyUpdateForPropTypes')
    )(OnlyUpdateForPropTypes)
  }

  return OnlyUpdateForPropTypes
}

const withContext = function withContext(childContextTypes, getChildContext) {
  return function(BaseComponent) {
    const factory = React.createFactory(BaseComponent)

    const WithContext =
      /* #__PURE__ */
      (function(_Component) {
        _inheritsLoose(WithContext, _Component)

        function WithContext() {
          let _this

          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key]
          }

          _this = _Component.call(...[this].concat(args)) || this

          _this.getChildContext = function() {
            return getChildContext(_this.props)
          }

          return _this
        }

        const _proto = WithContext.prototype

        _proto.render = function render() {
          return factory(this.props)
        }

        return WithContext
      })(React.Component)

    WithContext.childContextTypes = childContextTypes

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withContext'))(
        WithContext
      )
    }

    return WithContext
  }
}

const getContext = function getContext(contextTypes) {
  return function(BaseComponent) {
    const factory = React.createFactory(BaseComponent)

    const GetContext = function GetContext(ownerProps, context) {
      return factory(_extends({}, ownerProps, context))
    }

    GetContext.contextTypes = contextTypes

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'getContext'))(
        GetContext
      )
    }

    return GetContext
  }
}

const lifecycle = function lifecycle(spec) {
  return function(BaseComponent) {
    const factory = React.createFactory(BaseComponent)

    if (
      process.env.NODE_ENV !== 'production' &&
      spec.hasOwnProperty('render')
    ) {
      console.error(
        'lifecycle() does not support the render method; its behavior is to ' +
          'pass all props and state to the base component.'
      )
    }

    const Lifecycle =
      /* #__PURE__ */
      (function(_Component) {
        _inheritsLoose(Lifecycle, _Component)

        function Lifecycle() {
          return _Component.apply(this, arguments) || this
        }

        const _proto = Lifecycle.prototype

        _proto.render = function render() {
          return factory(_extends({}, this.props, this.state))
        }

        return Lifecycle
      })(React.Component)

    Object.keys(spec).forEach(hook => (Lifecycle.prototype[hook] = spec[hook]))

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'lifecycle'))(
        Lifecycle
      )
    }

    return Lifecycle
  }
}

const isClassComponent = function isClassComponent(Component) {
  return Boolean(
    Component &&
      Component.prototype &&
      typeof Component.prototype.render === 'function'
  )
}

const toClass = function toClass(baseComponent) {
  let _class
  let _temp

  return isClassComponent(baseComponent)
    ? baseComponent
    : (
        (_temp = _class =
          /* #__PURE__ */
          (function(_Component) {
            _inheritsLoose(ToClass, _Component)

            function ToClass() {
              return _Component.apply(this, arguments) || this
            }

            const _proto = ToClass.prototype

            _proto.render = function render() {
              if (typeof baseComponent === 'string') {
                return React__default.createElement(baseComponent, this.props)
              }

              return baseComponent(this.props, this.context)
            }

            return ToClass
          })(React.Component)),
        (_class.displayName = getDisplayName(baseComponent)),
        (_class.propTypes = baseComponent.propTypes),
        (_class.contextTypes = baseComponent.contextTypes),
        (_class.defaultProps = baseComponent.defaultProps),
        _temp
      )
}

function toRenderProps(hoc) {
  const RenderPropsComponent = function RenderPropsComponent(props) {
    return props.children(props)
  }

  return hoc(RenderPropsComponent)
}

const fromRenderProps = function fromRenderProps(
  RenderPropsComponent,
  propsMapper,
  renderPropName
) {
  if (renderPropName === void 0) {
    renderPropName = 'children'
  }

  return function(BaseComponent) {
    const baseFactory = React__default.createFactory(BaseComponent)
    const renderPropsFactory = React__default.createFactory(
      RenderPropsComponent
    )

    const FromRenderProps = function FromRenderProps(ownerProps) {
      let _renderPropsFactory

      return renderPropsFactory(
        (
          (_renderPropsFactory = {}),
          (_renderPropsFactory[renderPropName] = function() {
            return baseFactory(
              _extends({}, ownerProps, propsMapper(...arguments))
            )
          }),
          _renderPropsFactory
        )
      )
    }

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'fromRenderProps'))(
        FromRenderProps
      )
    }

    return FromRenderProps
  }
}

const setPropTypes = function setPropTypes(propTypes) {
  return setStatic('propTypes', propTypes)
}

const compose = function compose() {
  for (
    var _len = arguments.length, funcs = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    funcs[_key] = arguments[_key]
  }

  return funcs.reduce(
    (a, b) =>
      function() {
        return a(b(...arguments))
      },
    arg => arg
  )
}

const createSink = function createSink(callback) {
  const Sink =
    /* #__PURE__ */
    (function(_Component) {
      _inheritsLoose(Sink, _Component)

      function Sink() {
        let _this

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        _this = _Component.call(...[this].concat(args)) || this
        _this.state = {}
        return _this
      }

      Sink.getDerivedStateFromProps = function getDerivedStateFromProps(
        nextProps
      ) {
        callback(nextProps)
        return null
      }

      const _proto = Sink.prototype

      _proto.render = function render() {
        return null
      }

      return Sink
    })(React.Component)

  reactLifecyclesCompat.polyfill(Sink)
  return Sink
}

const componentFromProp = function componentFromProp(propName) {
  const Component = function Component(props) {
    return React.createElement(props[propName], omit(props, [propName]))
  }

  Component.displayName = `componentFromProp(${propName})`
  return Component
}

const nest = function nest() {
  for (
    var _len = arguments.length, Components = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    Components[_key] = arguments[_key]
  }

  const factories = Components.map(React.createFactory)

  const Nest = function Nest(_ref) {
    const children = _ref.children

    const props = _objectWithoutPropertiesLoose(_ref, ['children'])

    return factories.reduceRight(
      (child, factory) => factory(props, child),
      children
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayNames = Components.map(getDisplayName)
    Nest.displayName = `nest(${displayNames.join(', ')})`
  }

  return Nest
}

const hoistStatics = function hoistStatics(higherOrderComponent, blacklist) {
  return function(BaseComponent) {
    const NewComponent = higherOrderComponent(BaseComponent)
    hoistNonReactStatics(NewComponent, BaseComponent, blacklist)
    return NewComponent
  }
}

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

const componentFromStreamWithConfig = function componentFromStreamWithConfig(
  config$$1
) {
  return function(propsToVdom) {
    return (
      /* #__PURE__ */
      (function(_Component) {
        _inheritsLoose(ComponentFromStream, _Component)

        function ComponentFromStream() {
          let _config$fromESObserva

          let _this

          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key]
          }

          _this = _Component.call(...[this].concat(args)) || this
          _this.state = {
            vdom: null,
          }
          _this.propsEmitter = changeEmitter.createChangeEmitter()
          _this.props$ = config$$1.fromESObservable(
            (
              (_config$fromESObserva = {
                subscribe: function subscribe(observer) {
                  const unsubscribe = _this.propsEmitter.listen(props => {
                    if (props) {
                      observer.next(props)
                    } else {
                      observer.complete()
                    }
                  })

                  return {
                    unsubscribe,
                  }
                },
              }),
              (_config$fromESObserva[$$observable] = function() {
                return this
              }),
              _config$fromESObserva
            )
          )
          _this.vdom$ = config$$1.toESObservable(propsToVdom(_this.props$))
          return _this
        }

        const _proto = ComponentFromStream.prototype

        _proto.componentWillMount = function componentWillMount() {
          const _this2 = this

          // Subscribe to child prop changes so we know when to re-render
          this.subscription = this.vdom$.subscribe({
            next: function next(vdom) {
              _this2.setState({
                vdom,
              })
            },
          })
          this.propsEmitter.emit(this.props)
        }

        _proto.componentWillReceiveProps = function componentWillReceiveProps(
          nextProps
        ) {
          // Receive new props from the owner
          this.propsEmitter.emit(nextProps)
        }

        _proto.shouldComponentUpdate = function shouldComponentUpdate(
          nextProps,
          nextState
        ) {
          return nextState.vdom !== this.state.vdom
        }

        _proto.componentWillUnmount = function componentWillUnmount() {
          // Call without arguments to complete stream
          this.propsEmitter.emit() // Clean-up subscription before un-mounting

          this.subscription.unsubscribe()
        }

        _proto.render = function render() {
          return this.state.vdom
        }

        return ComponentFromStream
      })(React.Component)
    )
  }
}

const componentFromStream = function componentFromStream(propsToVdom) {
  return componentFromStreamWithConfig(config)(propsToVdom)
}

const identity$1 = function identity(t) {
  return t
}

const mapPropsStreamWithConfig = function mapPropsStreamWithConfig(config$$1) {
  const componentFromStream$$1 = componentFromStreamWithConfig({
    fromESObservable: identity$1,
    toESObservable: identity$1,
  })
  return function(transform) {
    return function(BaseComponent) {
      const factory = React.createFactory(BaseComponent)
      const fromESObservable = config$$1.fromESObservable

      const toESObservable = config$$1.toESObservable
      return componentFromStream$$1(props$ => {
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
        }), (_ref[$$observable] = function() {
          return this
        }), _ref
      })
    }
  }
}

const mapPropsStream = function mapPropsStream(transform) {
  const hoc = mapPropsStreamWithConfig(config)(transform)

  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return setDisplayName(wrapDisplayName(BaseComponent, 'mapPropsStream'))(
        hoc(BaseComponent)
      )
    }
  }

  return hoc
}

const createEventHandlerWithConfig = function createEventHandlerWithConfig(
  config$$1
) {
  return function() {
    let _config$fromESObserva

    const emitter = changeEmitter.createChangeEmitter()
    const stream = config$$1.fromESObservable(
      (
        (_config$fromESObserva = {
          subscribe: function subscribe(observer) {
            const unsubscribe = emitter.listen(value => observer.next(value))
            return {
              unsubscribe,
            }
          },
        }),
        (_config$fromESObserva[$$observable] = function() {
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
const createEventHandler = createEventHandlerWithConfig(config)

// Higher-order component helpers

exports.mapProps = mapProps
exports.withProps = withProps
exports.withPropsOnChange = withPropsOnChange
exports.withHandlers = withHandlers
exports.defaultProps = defaultProps
exports.renameProp = renameProp
exports.renameProps = renameProps
exports.flattenProp = flattenProp
exports.withState = withState
exports.withStateHandlers = withStateHandlers
exports.withReducer = withReducer
exports.branch = branch
exports.renderComponent = renderComponent
exports.renderNothing = renderNothing
exports.shouldUpdate = shouldUpdate
exports.pure = pure
exports.onlyUpdateForKeys = onlyUpdateForKeys
exports.onlyUpdateForPropTypes = onlyUpdateForPropTypes
exports.withContext = withContext
exports.getContext = getContext
exports.lifecycle = lifecycle
exports.toClass = toClass
exports.toRenderProps = toRenderProps
exports.fromRenderProps = fromRenderProps
exports.setStatic = setStatic
exports.setPropTypes = setPropTypes
exports.setDisplayName = setDisplayName
exports.compose = compose
exports.getDisplayName = getDisplayName
exports.wrapDisplayName = wrapDisplayName
exports.shallowEqual = shallowEqual
exports.isClassComponent = isClassComponent
exports.createSink = createSink
exports.componentFromProp = componentFromProp
exports.nest = nest
exports.hoistStatics = hoistStatics
exports.componentFromStream = componentFromStream
exports.componentFromStreamWithConfig = componentFromStreamWithConfig
exports.mapPropsStream = mapPropsStream
exports.mapPropsStreamWithConfig = mapPropsStreamWithConfig
exports.createEventHandler = createEventHandler
exports.createEventHandlerWithConfig = createEventHandlerWithConfig
exports.setObservableConfig = configureObservable
