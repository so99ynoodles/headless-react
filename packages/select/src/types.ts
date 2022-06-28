import { ReactNode, HTMLAttributes } from 'react'
import { AriaSelectProps } from '@react-types/select'
import { AriaButtonProps } from '@react-types/button'
import { Node } from '@react-types/shared'
import { Item } from '@headless-react/shared'
import { AriaMultiSelectProps } from './hooks/useMultiSelect'
import { MultiState, SingleState } from './context'

export interface MultiSelectProps extends Omit<AriaMultiSelectProps<Item>, 'children'> {
  children?: ReactNode
  label?: string
  name?: string
  disallowEmptySelection?: boolean
  closeOnSelect?: boolean
}
export interface SelectProps extends Omit<AriaSelectProps<Item>, 'children'> {
  children?: ReactNode
  label?: string
  name?: string
}
export interface SelectLabelProps extends HTMLAttributes<HTMLLabelElement> {}
export interface SelectMenuProps extends HTMLAttributes<HTMLDivElement> {}
export interface SelectOptionsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ((props: { options: Node<Item>[] }) => ReactNode) | ReactNode
}
export interface SelectOptionProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children' | 'className'> {
  option: Node<Item>
  className?:
    | string
    | ((props: { isDisabled: boolean; isSelected: boolean; isFocused: boolean; option: Item }) => string)
  children:
    | ReactNode
    | ((props: { isDisabled: boolean; isSelected: boolean; isFocused: boolean; option: Item }) => ReactNode)
}
export interface SelectSectionProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
  section: Node<Item>
  children: ReactNode | ((props: { section: Node<Item> }) => ReactNode)
}
export interface SelectSectionOptionsProps extends HTMLAttributes<HTMLUListElement> {}
export interface SelectSectionHeadingProps extends HTMLAttributes<HTMLSpanElement> {}
export interface SelectPopoverTriggerProps<T = SingleState | MultiState>
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'placeholder' | 'children' | 'className'> {
  placeholder?: ReactNode
  children: ReactNode | ((props: T extends SingleState ? { selectedItem: Node<Item> } & SingleState : { selectedItems: Node<Item>[] } & MultiState) => ReactNode)
  className?:
    | string
    | ((
        props: (T & { isFocusVisible: boolean })
      ) => string)
}

export interface SelectPopoverClearButtonProps extends AriaButtonProps<'span'> {
  className?: string
}

export interface MultiSelectPopoverItemProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
}

export interface MultiSelectPopoverItemClearButtonProps extends AriaButtonProps<'span'> {
  className?: string;
  item: Node<Item>
}
