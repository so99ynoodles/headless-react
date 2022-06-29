import { createContext, useContext, RefObject, HTMLAttributes } from 'react'
import { AriaButtonProps } from '@react-types/button'
import { MenuTriggerState } from '@react-stately/menu'
import { TreeState } from '@react-stately/tree'
import { Item } from '@headless-react/shared'
import { useMenuSection } from '@react-aria/menu'

const createMenuContext = () => {
  const MenuContext = createContext<
    | {
        treeState: TreeState<Item>
        menuState: MenuTriggerState
        menuTriggerProps: AriaButtonProps
        triggerRef: RefObject<HTMLButtonElement>
        overlayProps: HTMLAttributes<HTMLElement>
        menuProps: HTMLAttributes<HTMLElement>
        menuRef: RefObject<HTMLUListElement>
        overlayRef: RefObject<HTMLDivElement>
        onClose: () => void
        buttonProps: HTMLAttributes<HTMLElement>
        isPressed: boolean
      }
    | undefined
  >(undefined)

  const useMenuContext = () => {
    const context = useContext(MenuContext)
    if (!context) {
      throw new Error('You cannot use `Menu.Trigger` or `Menu.Items` outside of `Menu` component.')
    }
    return context
  }
  return [useMenuContext, MenuContext.Provider] as const
}

const createMenuPopupSectionContext = () => {
  const MenuPopupSectionContext = createContext<
    | (ReturnType<typeof useMenuSection> & {
        section: Node<Item>
      })
    | undefined
  >(undefined)

  const useMenuPopupSectionContext = () => {
    const context = useContext(MenuPopupSectionContext)
    if (!context) {
      throw new Error(
        'You cannot use `Menu.PopupSectionHeading` or `Menu.PopupSectionOptions` outside of `Menu.PopupSection` component.'
      )
    }
    return context
  }
  return [useMenuPopupSectionContext, MenuPopupSectionContext.Provider] as const
}

const [useMenuContext, MenuProvider] = createMenuContext()
const [useMenuPopupSectionContext, MenuPopupSectionProvider] = createMenuPopupSectionContext()

export { useMenuContext, MenuProvider, useMenuPopupSectionContext, MenuPopupSectionProvider }
