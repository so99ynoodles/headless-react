# @headless-react/select

Headless React Select component with [`@react-aia`](https://react-spectrum.adobe.com/react-aria/index.html) and [`@react-stately`](https://react-spectrum.adobe.com/react-stately/index.html).

## Getting Started

```
$ npm install @headless-react/select
```

```jsx
import { Select } from '@headless-react/select'

const SelectExample = ({
  label,
  items
}) => {
  return (
    <Select items={items}>
      <Select.Label>{label}</Select.Label>
      <Select.PopoverTrigger>
        {({ selectedItem }) => selectedItem.value.name}
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

const MultiSelectExample = () => {
  return (
    <MultiSelect items={items}>
      <MultiSelect.Label>{label}</Select.Label>
      <MultiSelect.PopoverTrigger>
        {({ selectedItems }) => selectedItems.map(item => <span>{item.value.name}</span>)}
      </MultiSelect.PopoverTrigger>
      <MultiSelect.Popover>
        <MultiSelect.Options>
          {({ options }) => options.map(option => (
            <MultiSelect.Option key={option.key} option={option}>
              {option.name}
            </MultiSelect.Option>
          ))}
        </MultiSelect.Options>
      </MultiSelect.Popover>
    </MultiSelect>
  )
}
```

## Example

[CodeSandBox Example](https://codesandbox.io/s/headless-react-select-rte4ze?file=/src/App.tsx)