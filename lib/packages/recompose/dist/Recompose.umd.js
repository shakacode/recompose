;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports, require('react'))
    : typeof define === 'function' && define.amd
      ? define(['exports', 'react'], factory)
      : factory((global.Recompose = {}), global.React)
})(this, (exports, React) => {
  const React__default = 'default' in React ? React.default : React

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

      {
        return setDisplayName(wrapDisplayName(BaseComponent, 'mapProps'))(
          MapProps
        )
      }

      return MapProps
    }
  }

  function _extends() {
    _extends =
      Object.assign ||
      function(target) {
        for (let i = 1; i < arguments.length; i++) {
          const source = arguments[i]

          for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }

        return target
      }

    return _extends.apply(this, arguments)
  }

  const withProps = function withProps(input) {
    const hoc = mapProps(props =>
      _extends({}, props, typeof input === 'function' ? input(props) : input)
    )

    {
      return function(BaseComponent) {
        return setDisplayName(wrapDisplayName(BaseComponent, 'withProps'))(
          hoc(BaseComponent)
        )
      }
    }

    return hoc
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype)
    subClass.prototype.constructor = subClass
    subClass.__proto__ = superClass
  }

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  function componentWillMount() {
    // Call this.constructor.gDSFP to support sub-classes.
    const state = this.constructor.getDerivedStateFromProps(
      this.props,
      this.state
    )
    if (state !== null && state !== undefined) {
      this.setState(state)
    }
  }

  function componentWillReceiveProps(nextProps) {
    // Call this.constructor.gDSFP to support sub-classes.
    const state = this.constructor.getDerivedStateFromProps(
      nextProps,
      this.state
    )
    if (state !== null && state !== undefined) {
      this.setState(state)
    }
  }

  function componentWillUpdate(nextProps, nextState) {
    try {
      var prevProps = this.props
      var prevState = this.state
      this.props = nextProps
      this.state = nextState
      this.__reactInternalSnapshotFlag = true
      this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
        prevProps,
        prevState
      )
    } finally {
      this.props = prevProps
      this.state = prevState
    }
  }

  // React may warn about cWM/cWRP/cWU methods being deprecated.
  // Add a flag to suppress these warnings for this special case.
  componentWillMount.__suppressDeprecationWarning = true
  componentWillReceiveProps.__suppressDeprecationWarning = true
  componentWillUpdate.__suppressDeprecationWarning = true

  function polyfill(Component) {
    const prototype = Component.prototype

    if (!prototype || !prototype.isReactComponent) {
      throw new Error('Can only polyfill class components')
    }

    if (
      typeof Component.getDerivedStateFromProps !== 'function' &&
      typeof prototype.getSnapshotBeforeUpdate !== 'function'
    ) {
      return Component
    }

    // If new component APIs are defined, "unsafe" lifecycles won't be called.
    // Error if any of these lifecycles are present,
    // Because they would work differently between older and newer (16.3+) versions of React.
    let foundWillMountName = null
    let foundWillReceivePropsName = null
    let foundWillUpdateName = null
    if (typeof prototype.componentWillMount === 'function') {
      foundWillMountName = 'componentWillMount'
    } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
      foundWillMountName = 'UNSAFE_componentWillMount'
    }
    if (typeof prototype.componentWillReceiveProps === 'function') {
      foundWillReceivePropsName = 'componentWillReceiveProps'
    } else if (
      typeof prototype.UNSAFE_componentWillReceiveProps === 'function'
    ) {
      foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps'
    }
    if (typeof prototype.componentWillUpdate === 'function') {
      foundWillUpdateName = 'componentWillUpdate'
    } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
      foundWillUpdateName = 'UNSAFE_componentWillUpdate'
    }
    if (
      foundWillMountName !== null ||
      foundWillReceivePropsName !== null ||
      foundWillUpdateName !== null
    ) {
      const componentName = Component.displayName || Component.name
      const newApiName =
        typeof Component.getDerivedStateFromProps === 'function'
          ? 'getDerivedStateFromProps()'
          : 'getSnapshotBeforeUpdate()'

      throw Error(
        `Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n${componentName} uses ${newApiName} but also contains the following legacy lifecycles:${foundWillMountName !==
        null
          ? `\n  ${foundWillMountName}`
          : ''}${foundWillReceivePropsName !== null
          ? `\n  ${foundWillReceivePropsName}`
          : ''}${foundWillUpdateName !== null
          ? `\n  ${foundWillUpdateName}`
          : ''}\n\nThe above lifecycles should be removed. Learn more about this warning here:\n` +
          `https://fb.me/react-async-component-lifecycle-hooks`
      )
    }

    // React <= 16.2 does not support static getDerivedStateFromProps.
    // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
    // Newer versions of React will ignore these lifecycles if gDSFP exists.
    if (typeof Component.getDerivedStateFromProps === 'function') {
      prototype.componentWillMount = componentWillMount
      prototype.componentWillReceiveProps = componentWillReceiveProps
    }

    // React <= 16.2 does not support getSnapshotBeforeUpdate.
    // As a workaround, use cWU to invoke the new lifecycle.
    // Newer versions of React will ignore that lifecycle if gSBU exists.
    if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
      if (typeof prototype.componentDidUpdate !== 'function') {
        throw new Error(
          'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
        )
      }

      prototype.componentWillUpdate = componentWillUpdate

      const componentDidUpdate = prototype.componentDidUpdate

      prototype.componentDidUpdate = function componentDidUpdatePolyfill(
        prevProps,
        prevState,
        maybeSnapshot
      ) {
        // 16.3+ will not execute our will-update method;
        // It will pass a snapshot value to did-update though.
        // Older versions will require our polyfilled will-update value.
        // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
        // Because for <= 15.x versions this might be a "prevContext" object.
        // We also can't just check "__reactInternalSnapshot",
        // Because get-snapshot might return a falsy value.
        // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
        const snapshot = this.__reactInternalSnapshotFlag
          ? this.__reactInternalSnapshot
          : maybeSnapshot

        componentDidUpdate.call(this, prevProps, prevState, snapshot)
      }
    }

    return Component
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

      polyfill(WithPropsOnChange)

      {
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

                  if (typeof handler !== 'function') {
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

      {
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

      {
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

    {
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

    {
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

      {
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

      {
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

      {
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

      {
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

      {
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

      {
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

      {
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

    {
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

    {
      return function(BaseComponent) {
        return setDisplayName(
          wrapDisplayName(BaseComponent, 'onlyUpdateForKeys')
        )(hoc(BaseComponent))
      }
    }

    return hoc
  }

  const onlyUpdateForPropTypes = function onlyUpdateForPropTypes(
    BaseComponent
  ) {
    const propTypes = BaseComponent.propTypes

    {
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

    {
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

      {
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

      {
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

      if (spec.hasOwnProperty('render')) {
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

      Object.keys(spec).forEach(
        hook => (Lifecycle.prototype[hook] = spec[hook])
      )

      {
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

      {
        return setDisplayName(
          wrapDisplayName(BaseComponent, 'fromRenderProps')
        )(FromRenderProps)
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

    polyfill(Sink)
    return Sink
  }

  const componentFromProp = function componentFromProp(propName) {
    const Component = function Component(props) {
      return React.createElement(props[propName], omit(props, [propName]))
    }

    Component.displayName = `componentFromProp(${propName})`
    return Component
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {}
    const target = {}
    const sourceKeys = Object.keys(source)
    let key
    let i

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i]
      if (excluded.indexOf(key) >= 0) continue
      target[key] = source[key]
    }

    return target
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

    {
      const displayNames = Components.map(getDisplayName)
      Nest.displayName = `nest(${displayNames.join(', ')})`
    }

    return Nest
  }

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */

  const REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true,
  }

  const KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true,
  }

  const defineProperty = Object.defineProperty
  const getOwnPropertyNames = Object.getOwnPropertyNames
  const getOwnPropertySymbols = Object.getOwnPropertySymbols
  const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
  const getPrototypeOf = Object.getPrototypeOf
  const objectPrototype = getPrototypeOf && getPrototypeOf(Object)

  const hoistNonReactStatics = function hoistNonReactStatics(
    targetComponent,
    sourceComponent,
    blacklist
  ) {
    if (typeof sourceComponent !== 'string') {
      // don't hoist over string (html) components

      if (objectPrototype) {
        const inheritedComponent = getPrototypeOf(sourceComponent)
        if (inheritedComponent && inheritedComponent !== objectPrototype) {
          hoistNonReactStatics(targetComponent, inheritedComponent, blacklist)
        }
      }

      let keys = getOwnPropertyNames(sourceComponent)

      if (getOwnPropertySymbols) {
        keys = keys.concat(getOwnPropertySymbols(sourceComponent))
      }

      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i]
        if (
          !REACT_STATICS[key] &&
          !KNOWN_STATICS[key] &&
          (!blacklist || !blacklist[key])
        ) {
          const descriptor = getOwnPropertyDescriptor(sourceComponent, key)
          try {
            // Avoid failures from read-only properties
            defineProperty(targetComponent, key, descriptor)
          } catch (e) {}
        }
      }

      return targetComponent
    }

    return targetComponent
  }

  const hoistStatics = function hoistStatics(higherOrderComponent, blacklist) {
    return function(BaseComponent) {
      const NewComponent = higherOrderComponent(BaseComponent)
      hoistNonReactStatics(NewComponent, BaseComponent, blacklist)
      return NewComponent
    }
  }

  const commonjsGlobal =
    typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined' ? self : {}

  function unwrapExports(x) {
    return x &&
    x.__esModule &&
    Object.prototype.hasOwnProperty.call(x, 'default')
      ? x.default
      : x
  }

  function createCommonjsModule(fn, module) {
    return (module = {
      exports: {},
    }), fn(module, module.exports), module.exports
  }

  const lib = createCommonjsModule((module, exports) => {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    const createChangeEmitter = (exports.createChangeEmitter = function createChangeEmitter() {
      let currentListeners = []
      let nextListeners = currentListeners

      function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
          nextListeners = currentListeners.slice()
        }
      }

      function listen(listener) {
        if (typeof listener !== 'function') {
          throw new Error('Expected listener to be a function.')
        }

        let isSubscribed = true

        ensureCanMutateNextListeners()
        nextListeners.push(listener)

        return function() {
          if (!isSubscribed) {
            return
          }

          isSubscribed = false

          ensureCanMutateNextListeners()
          const index = nextListeners.indexOf(listener)
          nextListeners.splice(index, 1)
        }
      }

      function emit() {
        currentListeners = nextListeners
        const listeners = currentListeners
        for (let i = 0; i < listeners.length; i++) {
          listeners[i](...arguments)
        }
      }

      return {
        listen,
        emit,
      }
    })
  })

  unwrapExports(lib)
  const lib_1 = lib.createChangeEmitter

  const ponyfill = createCommonjsModule((module, exports) => {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })
    exports.default = symbolObservablePonyfill
    function symbolObservablePonyfill(root) {
      let result
      const _Symbol = root.Symbol

      if (typeof _Symbol === 'function') {
        if (_Symbol.observable) {
          result = _Symbol.observable
        } else {
          result = _Symbol('observable')
          _Symbol.observable = result
        }
      } else {
        result = '@@observable'
      }

      return result
    }
  })

  unwrapExports(ponyfill)

  const lib$1 = createCommonjsModule((module, exports) => {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    })

    const _ponyfill2 = _interopRequireDefault(ponyfill)

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    let root /* global window */

    if (typeof self !== 'undefined') {
      root = self
    } else if (typeof window !== 'undefined') {
      root = window
    } else if (typeof commonjsGlobal !== 'undefined') {
      root = commonjsGlobal
    } else {
      root = module
    }

    const result = (0, _ponyfill2.default)(root)
    exports.default = result
  })

  unwrapExports(lib$1)

  const symbolObservable = lib$1

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
            _this.propsEmitter = lib_1()
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
                (_config$fromESObserva[symbolObservable] = function() {
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

  const mapPropsStreamWithConfig = function mapPropsStreamWithConfig(
    config$$1
  ) {
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
          }), (_ref[symbolObservable] = function() {
            return this
          }), _ref
        })
      }
    }
  }

  const mapPropsStream = function mapPropsStream(transform) {
    const hoc = mapPropsStreamWithConfig(config)(transform)

    {
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

      const emitter = lib_1()
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
          (_config$fromESObserva[symbolObservable] = function() {
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

  Object.defineProperty(exports, '__esModule', { value: true })
})
