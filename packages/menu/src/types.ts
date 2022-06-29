import { HTMLAttributes, Key, ReactNode } from 'react'
import { MenuTriggerProps as MenuTriggerStateProps } from '@react-types/menu'
import { TreeProps } from '@react-stately/tree'
import { Item } from '@headless-react/shared'
import { OverlayProps } from '@react-aria/overlays'
import { Node } from '@react-types/shared'

export interface MenuRootProps
  extends Omit<TreeProps<Item>, 'children'>,
    MenuTriggerStateProps,
    OverlayProps,
    HTMLAttributes<HTMLDivElement> {}
export interface MenuTriggerProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  className?: string | ((props: { isPressed: boolean }) => string)
  children?: ReactNode | ((props: { isPressed: boolean }) => string)
}
export interface MenuPopupProps extends HTMLAttributes<HTMLDivElement> {}
export interface MenuPopupItemsProps extends HTMLAttributes<HTMLUListElement> {}
export interface MenuPopupSectionProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
  section: Node<Item>
  children?: string | ((props: { section: Node<Item> }) => string)
}
export interface MenuPopupSectionHeadingProps extends HTMLAttributes<HTMLSpanElement> {}
export interface MenuPopupSectionOptionsProps extends HTMLAttributes<HTMLUListElement> {}
export interface MenuPopupItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'className' | 'children'> {
  item: Node<Item>
  className?: string | ((props: { isFocused: boolean; isDisabled: boolean }) => string)
  children?: string | ((props: { isFocused: boolean; isDisabled: boolean }) => string)
  onAction: (key: Key) => void
}
export interface MenuPopupSeparatorProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {}
