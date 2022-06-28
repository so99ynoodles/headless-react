import React from 'react'
import { filterDOMProps, mergeProps } from '@react-aria/utils'
import { useComboBoxContext } from './context'
import { ComboBoxInputGroupProps, ComboBoxInputProps } from './types'

export const InputGroup = (props: ComboBoxInputGroupProps) => {
  const { state } = useComboBoxContext()
  const { selectedItem, isFocused, isOpen } = state
  return (
    <div
      {...props}
      className={
        typeof props.className === 'string' ? props.className : props.className?.({ isFocused, isOpen, selectedItem })
      }
    >
      {typeof props.children === 'function' ? props.children?.({ isFocused, isOpen, selectedItem }) : props.children}
    </div>
  )
}

export const Input = (props: ComboBoxInputProps) => {
  const { inputProps, inputRef, state } = useComboBoxContext()
  return (
    <input
      {...mergeProps(inputProps, filterDOMProps(props))}
      className={
        typeof props.className === 'string' ? props.className : props.className?.({ isFocused: state.isFocused })
      }
      ref={inputRef}
    />
  )
}
