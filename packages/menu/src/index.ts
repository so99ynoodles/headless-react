import { MenuItem, MenuSection } from './collection'
import { Menu as MenuRoot, Overlay, Button } from './Menu'
import { Popup, Separator, ItemLabel, ItemDescription, ItemKeyboard, Items, Heading } from './Popup'

export const Menu = Object.assign(MenuRoot, {
  Button,
  Overlay,
  Item: MenuItem,
  Items,
  Heading,
  Section: MenuSection,
  Popup,
  Separator,
  ItemLabel,
  ItemDescription,
  ItemKeyboard
})
