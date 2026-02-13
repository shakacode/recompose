import { createElement, Component } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'

const withState = (
  stateName,
  stateUpdaterName,
  initialState
) => BaseComponent => {
  class WithState extends Component {
    state = {
      stateValue:
        typeof initialState === 'function'
          ? initialState(this.props)
          : initialState,
    }

    updateStateValue = (updateFn, callback) =>
      this.setState(
        ({ stateValue }) => ({
          stateValue:
            typeof updateFn === 'function' ? updateFn(stateValue) : updateFn,
        }),
        callback
      )

    render() {
      return createElement(BaseComponent, {
        ...this.props,
        [stateName]: this.state.stateValue,
        [stateUpdaterName]: this.updateStateValue,
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withState'))(
      WithState
    )
  }
  return WithState
}

export default withState
