# @react-headless/select

Headless React Select component with [`@react-aia`](https://react-spectrum.adobe.com/react-aria/index.html) and [`@react-stately`](https://react-spectrum.adobe.com/react-stately/index.html).

## Getting Started

```
$ npm install @react-headless/Select
```

```jsx
import { Select } from '@react-headless/select'

const Select = ({
  label,
  items
}) => {
  return (
    <Select items={items}>
      <Select.Label>{label}</Select.Label>
      <Select.PopoverTrigger>
        {({ selectedItem }) => selectedItem.name}
      </Select.PopoverTrigger>
      <Select.Popover>
        <Select.Options>
          {({ options }) => options.map(option => (
            <Select.Option key={option.key} option={option}>
              {option.name}
            </Select.Option>
          ))}
        </Select.Options>
      </Select.Popover>
    </Select>
  )
}
```