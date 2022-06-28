import { HTMLAttributes, ReactNode, Key } from 'react'
import { ComboBoxState } from '@react-stately/combobox'
import { AriaComboBoxProps } from '@react-types/combobox'
import { Node } from '@react-types/shared'

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

type RequiredKeys = {
  key: Key
  id: Key
  [key: string | number]: any
}
export type Item = RequireAtLeastOne<RequiredKeys, 'key' | 'id'>
export interface ComboBoxProps extends Omit<AriaComboBoxProps<Item>, 'children'> {
  children?: ReactNode
  label?: string
}
export interface ComboBoxLabelProps extends HTMLAttributes<HTMLLabelElement> {}
export interface ComboBoxPopoverProps extends HTMLAttributes<HTMLDivElement> {}
export interface ComboBoxOptionsProps extends Omit<HTMLAttributes<HTMLUListElement>, 'children'> {
  children: ((props: { options: Node<Item>[] }) => ReactNode) | ReactNode
}
export interface ComboBoxOptionProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children' | 'className'> {
  option: Node<Item>
  className?:
    | string
    | ((props: { isDisabled: boolean; isSelected: boolean; isFocused: boolean; option: Item }) => string)
  children:
    | ReactNode
    | ((props: { isDisabled: boolean; isSelected: boolean; isFocused: boolean; option: Item }) => ReactNode)
}
export interface ComboBoxSectionProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
  section: Node<Item>
  children: ReactNode | ((props: { section: Node<Item> }) => ReactNode)
}
export interface ComboBoxSectionOptionsProps extends HTMLAttributes<HTMLUListElement> {}
export interface ComboBoxSectionHeadingProps extends HTMLAttributes<HTMLSpanElement> {}
export interface ComboBoxInputGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
  className?: string | ((props: { isFocused: boolean; isOpen: boolean; selectedItem: Node<Item> }) => string)
  children:
    | ReactNode
    | ((props: { isFocused: boolean; isOpen: boolean; selectedItem: Node<Item> }) => ReactNode)
}
export interface ComboBoxInputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'className'> {
  className?: string | ((props: { isFocused: boolean }) => string)
}
export interface ComboBoxPopoverTriggerProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'placeholder' | 'children' | 'className'> {
  placeholder?: ReactNode
  children: ReactNode
  className?: string | ((props: ComboBoxState<Item> & { isFocusVisible: boolean }) => string)
}
