import { ReactNode, HTMLAttributes } from 'react'
import { SelectState } from 'react-stately'
import { AriaSelectProps } from '@react-types/select'
import { Node } from '@react-types/shared'
import { ItemValueProps } from '../../types'

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
export interface SelectPopoverTriggerProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'placeholder' | 'children' | 'className'> {
  placeholder?: ReactNode
  children: (props: { selectedItem: ItemValueProps }) => ReactNode
  className?: string | ((props: SelectState<ItemValueProps> & { isFocusVisible: boolean }) => string)
}
