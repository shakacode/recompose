exports.__esModule = true
exports.default = toRenderProps

function toRenderProps(hoc) {
  const RenderPropsComponent = function RenderPropsComponent(props) {
    return props.children(props)
  }

  return hoc(RenderPropsComponent)
}
