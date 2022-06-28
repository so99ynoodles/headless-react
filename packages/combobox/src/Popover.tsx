import React from 'react'
import { useButton } from '@react-aria/button'
import { FocusScope, useFocusRing } from '@react-aria/focus'
import { DismissButton, useOverlay } from '@react-aria/overlays'
import { filterDOMProps, mergeProps } from '@react-aria/utils'
import { useComboBoxContext } from './context'
import { ComboBoxPopoverProps, ComboBoxPopoverTriggerProps } from './types'

export const Popover = (props: ComboBoxPopoverProps) => {
  const { state, popoverRef: overlayRef } = useComboBoxContext()
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
      <div ref={overlayRef} {...mergeProps(overlayProps, filterDOMProps(props))} className={props.className}>
        {props.children}
        <DismissButton onDismiss={state.close} />
      </div>
    </FocusScope>
  )
}

export const PopoverTrigger = (props: ComboBoxPopoverTriggerProps) => {
  const { buttonProps: triggerProps, buttonRef: triggerRef, state } = useComboBoxContext()
  const { focusProps, isFocusVisible } = useFocusRing()
  const { buttonProps } = useButton(triggerProps, triggerRef)
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={triggerRef}
      className={
        typeof props.className === 'string' ? props.className : props.className?.({ ...state, isFocusVisible })
      }
    >
      {props.children}
    </button>
  )
}
