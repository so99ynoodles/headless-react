# headless-react

Headless React components with [`@react-aria`](https://react-spectrum.adobe.com/react-aria/index.html) and [`@react-stately`](https://react-spectrum.adobe.com/react-stately/index.html).

## Motivation
`react-aria` and `react-stately` provide great APIs but they are hard to use between projects to projects and difficult to learn / implement complex components with them. Providing `headless-ui` like APIs would be helpful.

### CAUTION: THIS IS AN UNSTABLE PROJECT FOR THE PERSONAL USE. USE IT AT YOUR OWN RISK.

## Getting Started

```
$ npm install @headless-react/combobox
```

```jsx
import { ComboBox } from '@headless-react/combobox'

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
            <ComboBox.PopoverTrigger>
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

## Components
- [x] Button
- [x] ComboBox
  - [x] Single
  - [x] Multi
- [x] Select
  - [x] Single
  - [x] Multi
- [x] Menu
- [ ] RadioGroup

...something I need

## Examples on CodeSandBox

- [Select Example](https://codesandbox.io/s/headless-react-select-rte4ze?file=/src/App.tsx)
- [ComboBox Example](https://codesandbox.io/s/headless-react-combobox-yseg1j?file=/src/App.tsx)
- [Menu Example](https://codesandbox.io/s/headless-react-menu-ij01ux?file=/src/App.tsx)