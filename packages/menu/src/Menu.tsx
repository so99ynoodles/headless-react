import React, { useRef, ReactNode, Key, useState } from 'react'
import { useMenuTriggerState } from '@react-stately/menu'
import { useButton } from '@react-aria/button'
import { useMenuTrigger } from '@react-aria/menu'
import { FocusScope } from '@react-aria/focus'
import { useOverlay, DismissButton } from '@react-aria/overlays'
import { MenuTriggerProps } from '@react-types/menu'
import { MenuProvider, useMenuContext } from './context'
import { useFocus, useHover, usePress } from '@react-aria/interactions'
import { ButtonProps } from './types'
import { handleFunctionalProp } from '@headless-react/shared'
import { mergeProps } from '@react-aria/utils'

export const Menu = (
  props: MenuTriggerProps & { className?: string; children?: ReactNode; onAction?: (key: Key) => void }
) => {
  const state = useMenuTriggerState(props)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef)
  const { buttonProps } = useButton(menuTriggerProps, triggerRef)
  return (
    <MenuProvider
      value={{
        menuTriggerProps,
        menuProps,
        buttonProps,
        triggerRef,
        onClose: state.close,
        isOpen: state.isOpen,
        onAction: props.onAction
      }}
    >
      <div className={props.className}>{props.children}</div>
    </MenuProvider>
  )
}

export const Button = (props: ButtonProps) => {
  const { isDisabled } = props
  const { buttonProps, menuTriggerProps, triggerRef } = useMenuContext()
  const { isHovered, hoverProps } = useHover({ isDisabled })
  const [isFocused, setFocused] = useState(false)
  const { focusProps } = useFocus({ isDisabled, onFocusChange: setFocused })
  const { isPressed } = usePress({
    ...menuTriggerProps,
    ref: triggerRef
  })
  return (
    <button
      {...mergeProps(buttonProps, focusProps, hoverProps)}
      className={handleFunctionalProp(props.className, { isPressed, isHovered, isDisabled, isFocused })}
      ref={triggerRef}
    >
      {handleFunctionalProp(props.children, { isPressed, isHovered, isDisabled, isFocused })}
    </button>
  )
}

export const Overlay = (props: { className?: string; children?: ReactNode }) => {
  const context = useMenuContext()
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const { overlayProps } = useOverlay(
    {
      onClose: context.onClose,
      shouldCloseOnBlur: true,
      isOpen: context.isOpen,
      isDismissable: true
    },
    overlayRef
  )

  if (!context.isOpen) {
    return null
  }

  return (
    <FocusScope restoreFocus>
      <div {...overlayProps} className={props.className} ref={overlayRef}>
        {props.children}
        <DismissButton onDismiss={context.onClose} />
      </div>
    </FocusScope>
  )
}
