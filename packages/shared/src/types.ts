import { Key } from 'react'

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

type RequiredKeys = {
  key: Key
  id: Key
  [key: string | number]: any
}
export type Item = RequireAtLeastOne<RequiredKeys, 'key' | 'id'>
