import { Item } from '@headless-react/shared'
import { createContext, HTMLAttributes, useContext, RefObject, Key } from 'react'
import { Node } from '@react-types/shared'
import { TreeState } from '@react-stately/tree'

const createMenuContext = () => {
  const MenuContext = createContext<
    | {
        menuTriggerProps: HTMLAttributes<HTMLElement>
        menuProps: HTMLAttributes<HTMLElement>
        buttonProps: HTMLAttributes<HTMLElement>
        triggerRef: RefObject<HTMLButtonElement>
        onClose: () => void
        isOpen: boolean
        onAction?: (key: Key) => void
      }
    | undefined
  >(undefined)

  const useMenuContext = () => {
    const context = useContext(MenuContext)
    if (!context) {
      throw new Error('Error')
    }
    return context
  }

  return [useMenuContext, MenuContext.Provider] as const
}

const createMenuSectionContext = () => {
  const MenuSectionContext = createContext<
    | {
        headingProps: HTMLAttributes<HTMLElement>
        groupProps: HTMLAttributes<HTMLElement>
        items: Node<Item>[]
        state: TreeState<Item>
        onAction?: (key: Key) => void
      }
    | undefined
  >(undefined)

  const useMenuSectionContext = () => {
    const context = useContext(MenuSectionContext)
    if (!context) {
      throw new Error('Error')
    }
    return context
  }

  return [useMenuSectionContext, MenuSectionContext.Provider] as const
}

const createMenuItemContext = () => {
  const MenuItemContext = createContext<
    | {
        labelProps: HTMLAttributes<HTMLElement>
        descriptionProps: HTMLAttributes<HTMLElement>
        keyboardShortcutProps: HTMLAttributes<HTMLElement>
      }
    | undefined
  >(undefined)

  const useMenuItemContext = () => {
    const context = useContext(MenuItemContext)
    if (!context) {
      throw new Error('Error')
    }
    return context
  }

  return [useMenuItemContext, MenuItemContext.Provider] as const
}

const [useMenuContext, MenuProvider] = createMenuContext()
const [useMenuSectionContext, MenuSectionProvider] = createMenuSectionContext()
const [useMenuItemContext, MenuItemProvider] = createMenuItemContext()

export {
  useMenuContext,
  useMenuSectionContext,
  useMenuItemContext,
  MenuProvider,
  MenuItemProvider,
  MenuSectionProvider
}
