import React, { useState, useRef } from 'react'
import { useMenuContext, MenuPopupSectionProvider, useMenuPopupSectionContext } from './context'
import {
  MenuPopupItemProps,
  MenuPopupItemsProps,
  MenuPopupProps,
  MenuPopupSectionHeadingProps,
  MenuPopupSectionOptionsProps,
  MenuPopupSectionProps,
  MenuPopupSeparatorProps
} from './types'
import { DismissButton } from '@react-aria/overlays'
import { FocusScope } from '@react-aria/focus'
import { mergeProps } from '@react-aria/utils'
import { useMenuItem, useMenuSection } from '@react-aria/menu'
import { useFocus } from '@react-aria/interactions'
import { useSeparator } from '@react-aria/separator'

export const Popup = (props: MenuPopupProps) => {
  const { overlayProps, overlayRef, onClose } = useMenuContext()
  return (
    <FocusScope restoreFocus>
      <div {...mergeProps(overlayProps, props)} ref={overlayRef} className={props.className}>
        {props.children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  )
}

export const PopupItems = (props: MenuPopupItemsProps) => {
  const { menuProps, menuRef } = useMenuContext()
  return (
    <ul {...mergeProps(menuProps, props)} ref={menuRef} className={props.className}>
      {props.children}
    </ul>
  )
}

export const PopupSeparator = (props: MenuPopupSeparatorProps) => {
  const { separatorProps } = useSeparator({
    elementType: 'li'
  })

  return <li {...mergeProps(separatorProps, props)} />
}

export const PopupSection = (props: MenuPopupSectionProps) => {
  const { section, children } = props
  const { itemProps, groupProps, headingProps } = useMenuSection({
    heading: section.rendered,
    'aria-label': section['aria-label']
  })

  return (
    <MenuPopupSectionProvider
      value={{
        itemProps,
        groupProps,
        headingProps,
        section
      }}
    >
      <li {...mergeProps(itemProps, props)} className={props.className}>
        {typeof children === 'function' ? children?.({ section }) : children}
      </li>
    </MenuPopupSectionProvider>
  )
}

export const PopupSectionHeading = (props: MenuPopupSectionHeadingProps) => {
  const { headingProps } = useMenuPopupSectionContext()
  return (
    <span {...mergeProps(headingProps, props)} className={props.className}>
      {props.children}
    </span>
  )
}

export const PopupSectionOptions = (props: MenuPopupSectionOptionsProps) => {
  const { groupProps } = useMenuPopupSectionContext()
  return (
    <ul {...mergeProps(groupProps, props)} className={props.className}>
      {props.children}
    </ul>
  )
}

export const PopupItem = (props: MenuPopupItemProps) => {
  const { item, onAction } = props
  const { treeState, onClose } = useMenuContext()
  const menuItemRef = useRef<HTMLLIElement | null>(null)
  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      onClose,
      onAction
    },
    treeState,
    menuItemRef
  )

  const isDisabled = treeState.disabledKeys.has(item.key)
  const [isFocused, setFocused] = useState(false)
  const { focusProps } = useFocus({ onFocusChange: setFocused })

  return (
    <li
      {...mergeProps(menuItemProps, focusProps, props)}
      ref={menuItemRef}
      className={typeof props.className === 'function' ? props.className?.({ isDisabled, isFocused }) : props.className}
    >
      {typeof props.children === 'function' ? props.children?.({ isDisabled, isFocused }) : props.children}
    </li>
  )
}
