const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

const _react = _interopRequireDefault(require('react'))

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const fromRenderProps = function fromRenderProps(
  RenderPropsComponent,
  propsMapper,
  renderPropName
) {
  if (renderPropName === void 0) {
    renderPropName = 'children'
  }

  return function(BaseComponent) {
    const baseFactory = _react.default.createFactory(BaseComponent)

    const renderPropsFactory = _react.default.createFactory(
      RenderPropsComponent
    )

    const FromRenderProps = function FromRenderProps(ownerProps) {
      let _renderPropsFactory

      return renderPropsFactory(
        (
          (_renderPropsFactory = {}),
          (_renderPropsFactory[renderPropName] = function() {
            return baseFactory(
              (0, _extends2.default)({}, ownerProps, propsMapper(...arguments))
            )
          }),
          _renderPropsFactory
        )
      )
    }

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'fromRenderProps')
      )(FromRenderProps)
    }

    return FromRenderProps
  }
}

const _default = fromRenderProps
exports.default = _default
