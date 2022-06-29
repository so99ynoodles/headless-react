import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { mergeProps } from '@react-aria/utils'
import { useButton } from '@react-aria/button'
import { useHover, useFocus } from '@react-aria/interactions'
import { handleFunctionalProp } from '@headless-react/shared'
import { ButtonProps } from './types'

interface Focusable {
  focus(): void
}

const Button = forwardRef<Focusable, ButtonProps>((props, ref) => {
  const { children, onFocus, ...rest } = props
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useImperativeHandle(ref, () => {
    return {
      focus() {
        if (buttonRef.current) {
          buttonRef.current.focus?.()
        }
      }
    }
  })

  const { buttonProps, isPressed } = useButton(rest, buttonRef)
  const { hoverProps, isHovered } = useHover({ isDisabled: props.isDisabled })
  const [isFocused, setFocused] = useState(false)
  const { focusProps } = useFocus({ isDisabled: props.isDisabled, onFocusChange: setFocused })

  return (
    <button {...mergeProps(buttonProps, hoverProps, focusProps)}>
      {handleFunctionalProp(props?.children, { isDisabled: props.isDisabled, isPressed, isHovered, isFocused })}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }
