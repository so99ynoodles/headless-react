import React from 'react'
import { mergeProps } from '@react-aria/utils'
import { useSelectContext } from './context'
import { SelectLabelProps } from './types'

export const Label = (props: SelectLabelProps) => {
  const { labelProps } = useSelectContext()
  return <label {...mergeProps(labelProps, props)} className={props.className} />
}
