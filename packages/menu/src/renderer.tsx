import React, { Key, useRef } from 'react'
import { Node } from '@react-types/shared'
import { Item, handleFunctionalProp } from '@headless-react/shared'
import { useMenuItem, useMenuSection } from '@react-aria/menu'
import { mergeProps } from '@react-aria/utils'
import { MenuItemProvider, MenuSectionProvider } from './context'
import { TreeState } from '@react-stately/tree'
import { useFocus } from '@react-aria/interactions'

export interface MenuSectionRendererProps {
  section: Node<Item>
  state: TreeState<Item>
  onAction?: (key: Key) => void
}

export interface MenuItemRendererProps {
  item: Node<Item>
  state: TreeState<Item>
  onAction?: (key: Key) => void
}

export const MenuSectionRenderer = (props: MenuSectionRendererProps) => {
  const { section, state, onAction } = props
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: section.rendered,
    'aria-label': section['aria-label']
  })

  return (
    <MenuSectionProvider value={{ headingProps, groupProps, state, onAction, items: [...section.childNodes] }}>
      <li {...mergeProps(itemProps, section.props)}>
        <ul {...groupProps}>
          {section.props?.children}
          {[...section.childNodes].map((item) => (
            <MenuItemRenderer key={item.key} item={item} state={state} onAction={onAction} />
          ))}
        </ul>
      </li>
    </MenuSectionProvider>
  )
}

export const MenuItemRenderer = (props: MenuItemRendererProps) => {
  const { item, state, onAction } = props
  const isDisabled = state.disabledKeys.has(item.key)
  const menuItemRef = useRef<HTMLLIElement | null>(null)
  const { menuItemProps, labelProps, descriptionProps, keyboardShortcutProps } = useMenuItem(
    {
      key: item.key,
      isDisabled,
      onAction
    },
    state,
    menuItemRef
  )
  const [isFocused, setFocused] = React.useState(false)
  const { focusProps } = useFocus({ onFocusChange: setFocused })

  return (
    <MenuItemProvider
      value={{
        labelProps,
        descriptionProps,
        keyboardShortcutProps
      }}
    >
      <li
        {...mergeProps(menuItemProps, focusProps)}
        ref={menuItemRef}
        className={handleFunctionalProp(item.props?.className, { isFocused, isDisabled })}
      >
        {handleFunctionalProp(item.props?.children, { isFocused, isDisabled })}
      </li>
    </MenuItemProvider>
  )
}
