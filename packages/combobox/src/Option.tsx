import React, { useRef } from 'react'
import { useListBox, useOption } from '@react-aria/listbox'
import { mergeProps } from '@react-aria/utils'
import { useComboBoxContext } from './context'
import { ComboBoxOptionProps, ComboBoxOptionsProps } from './types'

export const Options = (props: ComboBoxOptionsProps) => {
  const { listBoxProps: listProps, listBoxRef, state } = useComboBoxContext()
  const { listBoxProps } = useListBox(listProps, state, listBoxRef)

  if (!state.isOpen) {
    return null
  }

  return (
    <ul ref={listBoxRef} {...mergeProps(listBoxProps, props)} className={props.className}>
      {typeof props.children === 'function' ? props.children?.({ options: [...state.collection] }) : props.children}
    </ul>
  )
}

export const Option = (props: ComboBoxOptionProps) => {
  const { option } = props
  const { state } = useComboBoxContext()
  const optionRef = useRef<HTMLLIElement | null>(null)
  const { optionProps, isDisabled, isSelected, isFocused } = useOption({ key: option.key }, state, optionRef)
  return (
    <li
      {...optionProps}
      ref={optionRef}
      className={
        typeof props.className === 'string'
          ? props.className
          : props.className?.({ isDisabled, isSelected, isFocused, option })
      }
    >
      {typeof props.children === 'function'
        ? props.children?.({ isDisabled, isSelected, isFocused, option })
        : props.children}
    </li>
  )
}
