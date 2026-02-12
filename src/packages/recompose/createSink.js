import { Component } from 'react'

const createSink = callback => {
  class Sink extends Component {
    state = {}

    static getDerivedStateFromProps(nextProps) {
      callback(nextProps)
      return null
    }

    render() {
      return null
    }
  }

  return Sink
}

export default createSink
