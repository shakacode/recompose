import { createContext } from 'react'

const store = new Map()

export const getOrCreateContext = key => {
  const existing = store.get(key)
  if (existing) return existing
  const ctx = createContext(undefined)
  if (process.env.NODE_ENV !== 'production') {
    ctx.displayName = key
  }
  store.set(key, ctx)
  return ctx
}
