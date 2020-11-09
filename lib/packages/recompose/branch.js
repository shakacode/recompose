const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _react = require('react')

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

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
        leftFactory =
          leftFactory || (0, _react.createFactory)(left(BaseComponent))
        return leftFactory(props)
      }

      rightFactory =
        rightFactory || (0, _react.createFactory)(right(BaseComponent))
      return rightFactory(props)
    }

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'branch')
      )(Branch)
    }

    return Branch
  }
}

const _default = branch
exports.default = _default
