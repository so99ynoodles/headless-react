import React, { useRef } from 'react'
import { useMenuTriggerState } from '@react-stately/menu'
import { useMenu, useMenuTrigger } from '@react-aria/menu'
import { useButton } from '@react-aria/button'
import { MenuRootProps } from './types'
import { MenuProvider } from './context'
import { useTreeState } from '@react-stately/tree'
import { Section, Item as CollectionItem } from '@react-stately/collections'
import { Item } from '@headless-react/shared'
import { useOverlay } from '@react-aria/overlays'
import { mergeProps } from '@react-aria/utils'

export const Menu = (props: MenuRootProps) => {
  const ariaProps = {
    ...props,
    children: (item: Item) =>
      item.items ? (
        <Section
          key={item.key}
          title={item.name}
          items={item.items}
          // eslint-disable-next-line react/no-children-prop
          children={(item: Item) => <CollectionItem key={item.key}>{item.name}</CollectionItem>}
        />
      ) : (
        <CollectionItem key={item.key}>{item.name}</CollectionItem>
      )
  }
  const treeState = useTreeState({ ...ariaProps, selectionMode: 'none' })
  const menuState = useMenuTriggerState(props)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLUListElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  const { menuProps: ariaMenuProps, menuTriggerProps } = useMenuTrigger({}, menuState, triggerRef)
  const { menuProps } = useMenu(mergeProps(ariaProps, ariaMenuProps), treeState, menuRef)
  const { overlayProps } = useOverlay(props, overlayRef)
  const { isPressed, buttonProps } = useButton(menuTriggerProps, triggerRef)
  return (
    <MenuProvider
      value={{
        menuProps,
        menuTriggerProps,
        buttonProps,
        isPressed,
        overlayProps,
        triggerRef,
        menuRef,
        overlayRef,
        menuState,
        treeState,
        onClose: props.onClose || menuState.close
      }}
    >
      <div {...props} className={props.className}>
        {props.children}
      </div>
    </MenuProvider>
  )
}
