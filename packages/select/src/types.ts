import { ReactNode, HTMLAttributes, RefObject } from 'react'
import { AriaSelectProps, SelectProps } from '@react-types/select'
import { AriaButtonProps } from '@react-types/button'
import { Node, SingleSelection, MultipleSelection, Selection } from '@react-types/shared'
import { Item } from '@headless-react/shared'
import { MultiState, SingleState } from './context'
import { AriaHiddenSelectProps, AriaSelectOptions } from '@react-aria/select'
import { MenuTriggerState } from '@react-stately/menu'
import { ListState } from '@react-stately/list'

export interface MultiSelectProps<T>
  extends Omit<SelectProps<T>, keyof SingleSelection>, Omit<MultipleSelection, 'disallowEmptySelection'> {
  /**
   * Whether the menu should be closed on select.
   * @default false
   */
  closeOnSelect?: boolean
}

export interface MultiSelectState<T> extends ListState<T>, MenuTriggerState {
  /** Whether the select is currently focused. */
  readonly isFocused: boolean
  /** Sets whether the select is focused. */
  setFocused(isFocused: boolean): void
  /** The key for the currently selected item. */
  readonly selectedKeys: Selection
  /** Sets the selected keys. */
  setSelectedKeys(keys: Selection): void
  /** The value of the currently selected item. */
  readonly selectedItems: Node<T>[]
}

export interface AriaMultiSelectOptions<T> extends Omit<AriaSelectOptions<T>, keyof SingleSelection>, MultipleSelection {}

export interface MultiHiddenSelectProps<T> extends AriaHiddenSelectProps {
  /** State for the select. */
  state: MultiSelectState<T>,

  /** A ref to the trigger element. */
  triggerRef: RefObject<HTMLElement>
}

export interface MultiSelectRootProps extends Omit<AriaMultiSelectOptions<Item>, 'children'> {
  children?: ReactNode
  label?: string
  name?: string
  disallowEmptySelection?: boolean
  closeOnSelect?: boolean
}
export interface SelectRootProps extends Omit<AriaSelectProps<Item>, 'children'> {
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
