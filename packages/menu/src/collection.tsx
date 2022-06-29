/* eslint-disable no-use-before-define, no-undef */
import { PartialNode } from '@react-stately/collections'
import { ReactElement, Key, HTMLAttributes, Children, ReactNode } from 'react'

export interface MenuItemProps<T> extends Omit<HTMLAttributes<T>, 'className' | 'children'> {
  key: Key
  textValue: string
  children?: ReactNode | ((props: { isDisabled: boolean; isFocused: boolean }) => ReactNode)
  className?: string | ((props: { isDisabled: boolean; isFocused: boolean }) => string)
}

function MenuItem<T>(props: MenuItemProps<T>): ReactElement | null {
  return null
}

export interface MenuSectionProps<T> extends HTMLAttributes<T> {
  key: Key
  title: string
}

function MenuSection<T>(props: MenuSectionProps<T>): ReactElement | null {
  return null
}

MenuItem.getCollectionNode = function* getCollectionNode<T>(
  props: MenuItemProps<T>,
  context: any
): Generator<PartialNode<T>> {
  const rendered = props.title
  const textValue = props.textValue || (typeof rendered === 'string' ? rendered : '') || props['aria-label'] || ''

  if (!textValue && !context?.suppressTextValueWarning) {
    console.warn(
      '<Item> with non-plain text contents is unsupported by type to select for accessibility. Please add a `textValue` prop.'
    )
  }

  yield {
    type: 'item',
    props,
    rendered,
    textValue,
    'aria-label': props['aria-label'],
    hasChildNodes: false
  }
}

MenuSection.getCollectionNode = function* getCollectionNode<T>(props: MenuSectionProps<T>): Generator<PartialNode<T>> {
  const { children, title } = props
  yield {
    props,
    type: 'section',
    hasChildNodes: true,
    rendered: title,
    'aria-label': props['aria-label'],
    *childNodes() {
      const items: PartialNode<T>[] = []
      Children.forEach(children, (child: any) => {
        items.push({
          type: 'item',
          element: child as ReactElement
        })
      })
      yield* items
    }
  }
}

const _MenuSection = MenuSection as <T>(props: MenuSectionProps<T>) => JSX.Element
const _MenuItem = MenuItem as <T>(props: MenuItemProps<T>) => JSX.Element
export { _MenuSection as MenuSection, _MenuItem as MenuItem }
