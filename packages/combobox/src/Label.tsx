import React from 'react'
import { filterDOMProps, mergeProps } from '@react-aria/utils'
import { useComboBoxContext } from './context'
import { ComboBoxLabelProps } from './types'

export const Label = (props: ComboBoxLabelProps) => {
  const { labelProps } = useComboBoxContext()
  return <label {...mergeProps(labelProps, filterDOMProps(props))} className={props.className} />
}
