import React from 'react'

const isBrowser = typeof document !== 'undefined'

const useInsertionEffect = React.useInsertionEffect
  ? React.useInsertionEffect
  : function useInsertionEffect(create) {
      create()
    }

export default function useInsertionEffectMaybe(create) {
  if (!isBrowser) {
    return create()
  }
  useInsertionEffect(create)
}
