# @react-headless/combobox

Headless React ComboBox component with [`@react-aia`](https://react-spectrum.adobe.com/react-aria/index.html) and [`@react-stately`](https://react-spectrum.adobe.com/react-stately/index.html).

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