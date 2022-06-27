import React, { useRef } from 'react'
import { useButton } from '@react-aria/button'
import { FocusScope, useFocusRing } from '@react-aria/focus'
import { DismissButton, useOverlay } from '@react-aria/overlays'
import { mergeProps } from '@react-aria/utils'
import { useSelectContext } from './context'
import { SelectMenuProps, SelectPopoverTriggerProps } from './types'

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
      {props.children({ selectedItem: state.selectedItem?.value })}
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
