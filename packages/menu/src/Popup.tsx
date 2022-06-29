import React, { useRef, ReactNode } from 'react'
import { Item } from '@headless-react/shared'
import { TreeProps, useTreeState } from '@react-stately/tree'
import { useMenu } from '@react-aria/menu'
import { MenuItemRenderer, MenuSectionRenderer } from './renderer'
import { mergeProps } from '@react-aria/utils'
import { useSeparator } from '@react-aria/separator'
import { useMenuContext, useMenuItemContext, useMenuSectionContext } from './context'

export const Popup = (props: TreeProps<Item> & { className?: string }) => {
  const { onAction, menuProps: ariaMenuProps } = useMenuContext()
  const state = useTreeState({ ...props, selectionMode: 'none' })
  const menuRef = useRef<HTMLUListElement | null>(null)
  const { menuProps } = useMenu({ ...ariaMenuProps, ...props }, state, menuRef)
  return (
    <ul {...menuProps} ref={menuRef} className={props.className}>
      {[...state.collection].map((item) =>
        item.type === 'section' ? (
          <MenuSectionRenderer key={item.key} state={state} section={item} onAction={onAction} />
        ) : (
          <MenuItemRenderer key={item.key} state={state} item={item} onAction={onAction} />
        )
      )}
    </ul>
  )
}

export const Heading = (props: { className?: string; children?: ReactNode }) => {
  const { headingProps } = useMenuSectionContext()
  return (
    <span {...headingProps} className={props.className}>
      {props.children}
    </span>
  )
}

Heading.getCollectionNode = function* (props: { className?: string; children?: ReactNode }) {
  yield null
}

export const Items = (props: { className?: string; children?: ReactNode }) => {
  const { groupProps, items, state, onAction } = useMenuSectionContext()
  return (
    <ul {...groupProps} className={props.className}>
      {items.map((item) => (
        <MenuItemRenderer key={item.key} item={item} state={state} onAction={onAction} />
      ))}
    </ul>
  )
}

Items.getCollectionNode = function* () {
  yield null
}

export const Separator = (props: { className?: string }) => {
  const { separatorProps } = useSeparator({
    elementType: 'li'
  })

  return <li {...separatorProps} className={props.className} />
}

Separator.getCollectionNode = function* () {
  yield null
}

export const ItemLabel = (props: { className?: string; children?: ReactNode }) => {
  const { labelProps } = useMenuItemContext()
  return (
    <span {...mergeProps(labelProps, props)} className={props.className}>
      {props.children}
    </span>
  )
}

export const ItemDescription = (props: { className?: string; children?: ReactNode }) => {
  const { descriptionProps } = useMenuItemContext()
  return (
    <span {...mergeProps(descriptionProps, props)} className={props.className}>
      {props.children}
    </span>
  )
}

export const ItemKeyboard = (props: { className?: string; children?: ReactNode }) => {
  const { keyboardShortcutProps } = useMenuItemContext()
  return (
    <kbd {...mergeProps(keyboardShortcutProps, props)} className={props.className}>
      {props.children}
    </kbd>
  )
}
