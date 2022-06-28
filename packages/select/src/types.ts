import { ReactNode, HTMLAttributes, Key } from 'react'
import { AriaSelectProps } from '@react-types/select'
import { Node } from '@react-types/shared'
import { AriaMultiSelectProps } from './hooks/useMultiSelect'
import { MultiState, SingleState } from './context'

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

type RequiredKeys = {
  key: Key
  id: Key
  [key: string | number]: any
}
export type ItemValueProps = RequireAtLeastOne<RequiredKeys, 'key' | 'id'>
export interface MultiSelectProps extends Omit<AriaMultiSelectProps<ItemValueProps>, 'children'> {
  children?: ReactNode
  label?: string
  name?: string
  disallowEmptySelection?: boolean
  closeOnSelect?: boolean
}
export interface SelectProps extends Omit<AriaSelectProps<ItemValueProps>, 'children'> {
  children?: ReactNode
  label?: string
  name?: string
}
export interface SelectLabelProps extends HTMLAttributes<HTMLLabelElement> {}
export interface SelectMenuProps extends HTMLAttributes<HTMLDivElement> {}
export interface SelectOptionsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ((props: { options: Node<ItemValueProps>[] }) => ReactNode) | ReactNode
}
export interface SelectOptionProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children' | 'className'> {
  option: Node<ItemValueProps>
  className?:
    | string
    | ((props: { isDisabled: boolean; isSelected: boolean; isFocused: boolean; option: ItemValueProps }) => string)
  children:
    | ReactNode
    | ((props: { isDisabled: boolean; isSelected: boolean; isFocused: boolean; option: ItemValueProps }) => ReactNode)
}
export interface SelectSectionProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
  section: Node<ItemValueProps>
  children: ReactNode | ((props: { section: Node<ItemValueProps> }) => ReactNode)
}
export interface SelectSectionOptionsProps extends HTMLAttributes<HTMLUListElement> {}
export interface SelectSectionHeadingProps extends HTMLAttributes<HTMLSpanElement> {}
export interface SelectPopoverTriggerProps<T = SingleState | MultiState>
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'placeholder' | 'children' | 'className'> {
  placeholder?: ReactNode
  children: ReactNode | ((props: T extends SingleState ? { selectedItem: Node<ItemValueProps> } & SingleState : { selectedItems: Node<ItemValueProps>[] } & MultiState) => ReactNode)
  className?:
    | string
    | ((
        props: (T & { isFocusVisible: boolean })
      ) => string)
}
