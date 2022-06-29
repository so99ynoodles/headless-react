import React, { useRef } from 'react'
import { useButton } from '@react-aria/button'
import { FocusScope, useFocusRing } from '@react-aria/focus'
import { DismissButton, useOverlay } from '@react-aria/overlays'
import { mergeProps } from '@react-aria/utils'
import { useSelectContext } from './context'
import {
  MultiSelectPopoverItemClearButtonProps,
  MultiSelectPopoverItemProps,
  MultiSelectState,
  SelectMenuProps,
  SelectPopoverClearButtonProps,
  SelectPopoverTriggerProps
} from './types'
import { Item } from '@headless-react/shared'
import { SelectState } from '@react-stately/select'

export const PopoverTrigger = (props: SelectPopoverTriggerProps) => {
  const { triggerProps, valueProps, triggerRef, state } = useSelectContext()
  const { focusProps, isFocusVisible } = useFocusRing()
  const { buttonProps } = useButton(triggerProps, triggerRef)

  return (
    <button
      {...mergeProps(buttonProps, valueProps, focusProps)}
      ref={triggerRef}
      className={
        typeof props.className === 'string' ? props.className : props.className?.({ ...state, isFocusVisible })
      }
    >
      {typeof props.children === 'function'
        ? props.children(
          state.selectionManager.selectionMode === 'multiple'
            ? { ...state, selectedItems: (state as MultiSelectState<Item>).selectedItems }
            : { ...state, selectedItem: (state as SelectState<Item>).selectedItem }
        )
        : props.children}
    </button>
  )
}

export const PopoverClearButton = (props: SelectPopoverClearButtonProps) => {
  const { state } = useSelectContext()
  const buttonRef = useRef<HTMLSpanElement | null>(null)
  const { buttonProps } = useButton(
    {
      ...props,
      onPress: (e) => {
        if (props.onPress) {
          props.onPress(e)
        } else {
          (state as SelectState<Item>).selectionManager.setSelectedKeys(new Set())
        }
      }
    },
    buttonRef
  )
  return <span {...mergeProps(buttonProps, props)} className={props.className}>{props.children}</span>
}

export const Popover = (props: SelectMenuProps) => {
  const { state } = useSelectContext()
  const overlayRef = useRef(null)
  const { overlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      shouldCloseOnBlur: true,
      isDismissable: false
    },
    overlayRef
  )

  if (!state.isOpen) {
    return null
  }

  return (
    <FocusScope restoreFocus>
      <div ref={overlayRef} {...mergeProps(overlayProps, props)} className={props.className}>
        {props.children}
        <DismissButton onDismiss={state.close} />
      </div>
    </FocusScope>
  )
}

export const PopoverItem = (props: MultiSelectPopoverItemProps) => {
  return <span {...props}>{props.children}</span>
}

export const PopoverItemClearButton = (props: MultiSelectPopoverItemClearButtonProps) => {
  const { state } = useSelectContext()
  const buttonRef = useRef<HTMLSpanElement | null>(null)
  const { buttonProps } = useButton(
    {
      ...props,
      onPress: (e) => {
        if (props.onPress) {
          props.onPress(e)
        } else {
          (state as MultiSelectState<Item>).selectionManager.toggleSelection(props.item.key)
        }
      }
    },
    buttonRef
  )
  return <span {...mergeProps(buttonProps, props)} className={props.className}>{props.children}</span>
}
