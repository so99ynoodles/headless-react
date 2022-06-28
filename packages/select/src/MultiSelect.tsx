import React, { useRef } from 'react'
import { Item, Section } from '@react-stately/collections'
import { useMultiSelectState } from './hooks/useMultiSelectState'
import { ItemValueProps, MultiSelectProps } from './types'
import { SelectProvider } from './context'
import { useMultiSelect } from './hooks/useMultiSelect'

export const MultiSelect = (props: MultiSelectProps) => {
  const ariaProps = {
    ...props,
    label: props.label || 'x',
    children: (item: ItemValueProps) =>
      item.items ? (
      // eslint-disable-next-line react/no-children-prop
      <Section key={item.key} title={item.name} items={item.items} children={(item: ItemValueProps) => <Item key={item.key}>{item.name}</Item>} />
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
    </SelectProvider>
  )
}
