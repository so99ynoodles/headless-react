import { Menu as MenuRoot } from './Menu'
import {
  Popup,
  PopupItems,
  PopupItem,
  PopupSection,
  PopupSectionHeading,
  PopupSectionOptions,
  PopupSeparator
} from './Popup'
import { Trigger } from './Trigger'

export const Menu = Object.assign(MenuRoot, {
  Trigger,
  Popup,
  PopupItems,
  PopupItem,
  PopupSection,
  PopupSectionHeading,
  PopupSectionOptions,
  PopupSeparator
})

export * from './types'
