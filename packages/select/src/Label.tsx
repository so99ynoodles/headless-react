import React from 'react'
import { filterDOMProps, mergeProps } from '@react-aria/utils'
import { useSelectContext } from './context'
import { SelectLabelProps } from './types'

export const Label = (props: SelectLabelProps) => {
  const { labelProps } = useSelectContext()
  return <label {...mergeProps(labelProps, filterDOMProps(props))} />
}
