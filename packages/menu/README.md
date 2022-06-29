# @headless-react/menu

Headless React Menu component with [`@react-aria`](https://react-spectrum.adobe.com/react-aria/index.html) and [`@react-stately`](https://react-spectrum.adobe.com/react-stately/index.html).

## Getting Started

```
$ npm install @headless-react/menu
```

```jsx
import { Menu } from '@headless-react/menu'

const MenuExample = () => {
  return (
    <Menu onAction={actionFunction}>
      <Menu.Button>
        Open Menu
      </Menu.Button>
      <Menu.Overlay>
        <Menu.Popup>
          <Menu.Item>Item 1</Menu.Item>
          <Menu.Item>Item 2</Menu.Item>
          <Menu.Item>Item 3</Menu.Item>
        </Menu.Popup>
      </Menu.Overlay>
    </Menu>
  )
}
```

## Example

[CodeSandBox Example](https://codesandbox.io/s/headless-react-menu-ij01ux?file=/src/App.tsx)