# @headless-react/menu

Headless React Menu component with [`@react-aria`](https://react-spectrum.adobe.com/react-aria/index.html) and [`@react-stately`](https://react-spectrum.adobe.com/react-stately/index.html).

## Getting Started

```
$ npm install @headless-react/menu
```

```jsx
import { Menu } from '@headless-react/menu'

const AutoComplete = ({
  label,
  items
}) => {
  return (
    <ComboBox defaultItems={items}>
      <ComboBox.Label>{label}</ComboBox.Label>
      <ComboBox.InputGroup>
        {({ selectedItem }) => (
          <>
            <ComboBox.Input />
            <ComboBox.PopoverTrigger />
          </>
        )}
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ComboBox.Options>
          {({ options }) => options.map(option => (
            <ComboBox.Option key={option.key} option={option}>
              {option.name}
            </ComboBox.Option>
          ))}
        </ComboBox.Options>
      </ComboBox.Popover>
    </ComboBox>
  )
}
```

## Example

[CodeSandBox Example](https://codesandbox.io/s/headless-react-combobox-yseg1j?file=/src/App.tsx)