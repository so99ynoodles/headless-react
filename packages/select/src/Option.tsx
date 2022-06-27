import React, { useRef } from 'react'
import { useListBox, useOption } from '@react-aria/listbox'
import { mergeProps } from '@react-aria/utils'
import { useSelectContext } from './context'
import { SelectOptionProps, SelectOptionsProps } from './types'

export const Options = (props: SelectOptionsProps) => {
  const { menuProps, state } = useSelectContext()
  const listRef = useRef<HTMLUListElement | null>(null)
  const { listBoxProps } = useListBox(menuProps, state, listRef)

  if (!state.isOpen) {
    return null
  }

  return (
    <ul ref={listRef} {...mergeProps(listBoxProps, props)}>
      {typeof props.children === 'function' ? props.children?.({ options: [...state.collection] }) : props.children}
    </ul>
  )
}

export const Option = (props: SelectOptionProps) => {
  const { option } = props
  const { state } = useSelectContext()
  const optionRef = React.useRef<HTMLLIElement | null>(null)
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
