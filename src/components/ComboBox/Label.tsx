import React from 'react'
import { mergeProps } from 'react-aria'
import { useComboBoxContext } from './context'
import { ComboBoxLabelProps } from './types'

export const Label = (props: ComboBoxLabelProps) => {
  const { labelProps } = useComboBoxContext()
  return <label {...mergeProps(labelProps, props)} />
}
