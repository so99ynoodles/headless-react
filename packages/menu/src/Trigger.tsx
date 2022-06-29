import { mergeProps } from '@react-aria/utils'
import React from 'react'
import { useMenuContext } from './context'
import { MenuTriggerProps } from './types'

export const Trigger = (props: MenuTriggerProps) => {
  const { triggerRef, buttonProps, isPressed } = useMenuContext()
  return (
    <button
      {...mergeProps(buttonProps, props)}
      ref={triggerRef}
      className={typeof props.className === 'function' ? props.className?.({ isPressed }) : props.className}
    >
      {typeof props.children === 'function' ? props.children?.({ isPressed }) : props.children}
    </button>
  )
}
