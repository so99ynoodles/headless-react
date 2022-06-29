import { HTMLAttributes, Key, ReactNode } from 'react'
import { ComboBoxState, ComboBoxStateProps } from '@react-stately/combobox'
import { AriaComboBoxProps } from '@react-types/combobox'
import { Node, SingleSelection, MultipleSelection } from '@react-types/shared'
import { Item } from '@headless-react/shared'
import { AriaComboBoxOptions } from '@react-aria/combobox'
import { SelectState } from '@react-stately/select'
import { MultiSelectState } from '@headless-react/select'
import { AriaButtonProps } from '@react-types/button'
import { MultiState, SingleState } from './context'

export interface AriaMultiComboBoxOptions<T> extends Omit<AriaComboBoxOptions<T>, keyof SingleSelection>, MultipleSelection {}
export interface MultiComboBoxStateProps<T> extends Omit<ComboBoxStateProps<T>, keyof SingleSelection>, Omit<MultipleSelection, 'selectedKeys'> {
  selectedKeys?: Iterable<Key>
}
export interface MultiComboBoxState<T> extends Omit<ComboBoxState<T>, keyof SelectState<T>>, MultiSelectState<T> {}
export interface MultiComboBoxRootProps extends Omit<MultiComboBoxStateProps<Item>, 'children'> {
  children?: ReactNode
  label?: string
}
export interface ComboBoxRootProps extends Omit<AriaComboBoxProps<Item>, 'children'> {
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
export interface ComboBoxInputGroupProps<T = SingleState | MultiState> extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
  className?: string | ((props: T extends SingleState ? { isFocused: boolean; isOpen: boolean; selectedItem: Node<Item> } : { isFocused: boolean; isOpen: boolean; selectedItems: Node<Item>[] }) => string)
  children:
    | ReactNode
    | ((props: T extends SingleState ? { isFocused: boolean; isOpen: boolean; selectedItem: Node<Item> } : { isFocused: boolean; isOpen: boolean; selectedItems: Node<Item>[] }) => ReactNode)
}
export interface ComboBoxInputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'className'> {
  className?: string | ((props: { isFocused: boolean }) => string)
}
export interface ComboBoxPopoverTriggerProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'placeholder' | 'children' | 'className'> {
  placeholder?: ReactNode
  children: ReactNode
  className?: string | ((props: { isFocusVisible: boolean }) => string)
}

export interface MultiComboBoxInputGroupItemProps extends HTMLAttributes<HTMLSpanElement> {}
export interface MultiComboBoxInputGroupItemClearButtonProps extends AriaButtonProps<'span'> {
  className?: string;
  item: Node<Item>
}
