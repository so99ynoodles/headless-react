import React, { useRef } from 'react'
import { mergeProps } from '@react-aria/utils'
import { MultiState, SingleState, useComboBoxContext } from './context'
import { ComboBoxInputGroupProps, ComboBoxInputProps, MultiComboBoxInputGroupItemClearButtonProps, MultiComboBoxInputGroupItemProps, MultiComboBoxState } from './types'
import { useButton } from '@react-aria/button'
import { Item } from '@headless-react/shared'

export const InputGroup = (props: ComboBoxInputGroupProps) => {
  const { state } = useComboBoxContext()
  const { isFocused, isOpen } = state
  const isMulti = state.selectionManager.selectionMode === 'multiple'
  return (
    <div
      {...props}
      className={
        typeof props.className === 'string'
          ? props.className
          : isMulti
            ? props.className?.({ isFocused, isOpen, selectedItems: (state as MultiState).selectedItems })
            : props.className?.({ isFocused, isOpen, selectedItem: (state as SingleState).selectedItem })
      }
    >
      {typeof props.children === 'function' ? isMulti
        ? props.children?.({ isFocused, isOpen, selectedItems: (state as MultiState).selectedItems })
        : props.children?.({ isFocused, isOpen, selectedItem: (state as SingleState).selectedItem }) : props.children}
    </div>
  )
}

export const InputGroupItem = (props: MultiComboBoxInputGroupItemProps) => {
  return <span {...props}>{props.children}</span>
}

export const InputGroupItemClearButton = (props: MultiComboBoxInputGroupItemClearButtonProps) => {
  const { state } = useComboBoxContext()
  const buttonRef = useRef<HTMLSpanElement | null>(null)
  const { buttonProps } = useButton(
    {
      ...props,
      onPress: (e) => {
        if (props.onPress) {
          props.onPress(e)
        } else {
          (state as MultiComboBoxState<Item>).selectionManager.toggleSelection(props.item.key)
        }
      }
    },
    buttonRef
  )
  return <span {...mergeProps(buttonProps, props)} className={props.className}>{props.children}</span>
}

export const Input = (props: ComboBoxInputProps) => {
  const { inputProps, inputRef, state } = useComboBoxContext()
  return (
    <input
      {...mergeProps(inputProps, props)}
      className={
        typeof props.className === 'string' ? props.className : props.className?.({ isFocused: state.isFocused })
      }
      ref={inputRef}
    />
  )
}
