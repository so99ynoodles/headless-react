import { ReactNode } from 'react'

export function handleFunctionalProp<T>(prop: Function | string | ReactNode, arg: T) {
  if (typeof prop === 'function') {
    return prop(arg)
  } else {
    return prop
  }
}
