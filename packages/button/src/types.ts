import { ReactNode } from 'react'
import { AriaButtonProps } from '@react-types/button'

export interface ButtonProps extends Omit<AriaButtonProps<'button'>, 'children' | 'className'> {
  children?:
    | ReactNode
    | ((props: { isDisabled: boolean; isPressed: boolean; isHovered: boolean; isFocused: boolean }) => ReactNode)
  className?:
    | string
    | ((props: { isDisabled: boolean; isPressed: boolean; isHovered: boolean; isFocused: boolean }) => string)
}
