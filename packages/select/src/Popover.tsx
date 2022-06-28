import React, { useRef } from 'react'
import { useButton } from '@react-aria/button'
import { FocusScope, useFocusRing } from '@react-aria/focus'
import { DismissButton, useOverlay } from '@react-aria/overlays'
import { mergeProps } from '@react-aria/utils'
import { useSelectContext } from './context'
import { ItemValueProps, SelectMenuProps, SelectPopoverTriggerProps } from './types'
import { MultiSelectState } from './hooks/useMultiSelectState'
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
            ? { ...state, selectedItems: (state as MultiSelectState<ItemValueProps>).selectedItems }
            : { ...state, selectedItem: (state as SelectState<ItemValueProps>).selectedItem }
        )
        : props.children}
    </button>
  )
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
      <div ref={overlayRef} {...mergeProps(overlayProps, props)}>
        {props.children}
        <DismissButton onDismiss={state.close} />
      </div>
    </FocusScope>
  )
}
