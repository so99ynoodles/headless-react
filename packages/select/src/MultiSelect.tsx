import React, { useRef } from 'react'
import { Item, Section } from '@react-stately/collections'
import { useMultiSelectState } from './hooks/useMultiSelectState'
import { ItemValueProps, MultiSelectProps } from './types'
import { SelectProvider } from './context'
import { useMultiSelect } from './hooks/useMultiSelect'
import { MultiHiddenSelectProps, useMultiHiddenSelect } from './hooks/useMultiHiddenSelect'

export const MultiSelect = (props: MultiSelectProps) => {
  const ariaProps = {
    ...props,
    label: props.label || 'x',
    children: (item: ItemValueProps) =>
      item.items ? (
        <Section
          key={item.key}
          title={item.name}
          items={item.items}
          // eslint-disable-next-line react/no-children-prop
          children={(item: ItemValueProps) => <Item key={item.key}>{item.name}</Item>}
        />
      ) : (
        <Item key={item.key}>{item.name}</Item>
      )
  }
  const state = useMultiSelectState(ariaProps)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const selectAria = useMultiSelect(ariaProps, state, triggerRef)
  return (
    <SelectProvider
      value={{
        state,
        triggerRef,
        ...selectAria
      }}
    >
      {props.children}
      <MultiHiddenSelect state={state} triggerRef={triggerRef} name={props.name} label={props.label} />
    </SelectProvider>
  )
}

function MultiHiddenSelect<T>(props: MultiHiddenSelectProps<T>) {
  const { state, triggerRef, label, name, isDisabled } = props
  const { containerProps, inputProps, selectProps } = useMultiHiddenSelect(props, state, triggerRef)

  if (state.collection.size <= 300) {
    return (
      <div {...containerProps}>
        <input {...inputProps} />
        <label>
          {label}
          <select multiple {...selectProps}>
            <option />
            {[...state.collection.getKeys()].map((key) => {
              const item = state.collection.getItem(key)
              if (item.type === 'item') {
                return (
                  <option key={item.key} value={item.key}>
                    {item.textValue}
                  </option>
                )
              }
              return null
            })}
          </select>
        </label>
      </div>
    )
  } else if (name) {
    return (
      <>
        {[...state.selectedKeys].map((key) => (
          <input
            key={key}
            type="hidden"
            autoComplete={selectProps.autoComplete}
            name={name}
            disabled={isDisabled}
            multiple
            value={key}
          />
        ))}
      </>
    )
  }

  return null
}
