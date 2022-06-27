import React, { useRef } from 'react'
import { HiddenSelect, useSelect } from '@react-aria/select'
import { useSelectState } from '@react-stately/select'
import { Item, Section } from '@react-stately/collections'
import { SelectProps, ItemValueProps } from './types'
import { SelectProvider } from './context'

export const Select = (props: SelectProps) => {
  const ariaProps = {
    ...props,
    label: 'x',
    children: (item: ItemValueProps) =>
      item.items ? (
      // eslint-disable-next-line react/no-children-prop
      <Section key={item.key} title={item.name} items={item.items} children={(item: ItemValueProps) => <Item key={item.key}>{item.name}</Item>} />
      ) : (
      <Item key={item.key}>{item.name}</Item>
      )
  }
  const state = useSelectState(ariaProps)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const selectAria = useSelect(ariaProps, state, triggerRef)
  return (
    <SelectProvider
      value={{
        state,
        triggerRef,
        ...selectAria
      }}
    >
      {props.children}
      <HiddenSelect state={state} triggerRef={triggerRef} name={props.name} label={props.label} />
    </SelectProvider>
  )
}
