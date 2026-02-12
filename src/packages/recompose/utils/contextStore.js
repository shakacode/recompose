import { createContext } from 'react'

const store = {}

export const getOrCreateContext = key => {
  if (!store[key]) {
    store[key] = createContext(undefined)
    if (process.env.NODE_ENV !== 'production') {
      store[key].displayName = key
    }
  }
  return store[key]
}
