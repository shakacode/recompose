const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _onlyUpdateForKeys = _interopRequireDefault(
  require('./onlyUpdateForKeys')
)

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const _getDisplayName = _interopRequireDefault(require('./getDisplayName'))

const onlyUpdateForPropTypes = function onlyUpdateForPropTypes(BaseComponent) {
  const propTypes = BaseComponent.propTypes

  if (process.env.NODE_ENV !== 'production') {
    if (!propTypes) {
      /* eslint-disable */
      console.error(
        'A component without any `propTypes` was passed to ' +
          '`onlyUpdateForPropTypes()`. Check the implementation of the ' +
          ('component with display name "' +
            (0, _getDisplayName.default)(BaseComponent) +
            '".')
      )
      /* eslint-enable */
    }
  }

  const propKeys = Object.keys(propTypes || {})
  const OnlyUpdateForPropTypes = (0, _onlyUpdateForKeys.default)(propKeys)(
    BaseComponent
  )

  if (process.env.NODE_ENV !== 'production') {
    return (0, _setDisplayName.default)(
      (0, _wrapDisplayName.default)(BaseComponent, 'onlyUpdateForPropTypes')
    )(OnlyUpdateForPropTypes)
  }

  return OnlyUpdateForPropTypes
}

const _default = onlyUpdateForPropTypes
exports.default = _default
