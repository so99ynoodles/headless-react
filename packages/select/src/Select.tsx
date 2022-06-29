import React, { useRef } from 'react'
import { HiddenSelect, useSelect } from '@react-aria/select'
import { useSelectState } from '@react-stately/select'
import { Item as CollectionItem, Section } from '@react-stately/collections'
import { Item } from '@headless-react/shared'
import { SelectRootProps } from './types'
import { SelectProvider } from './context'

export const Select = (props: SelectRootProps) => {
  const ariaProps = {
    ...props,
    label: props.label || 'x',
    disallowEmptySelection: false,
    children: (item: Item) =>
      item.items ? (
      // eslint-disable-next-line react/no-children-prop
      <Section key={item.key} title={item.name} items={item.items} children={(item: Item) => <CollectionItem key={item.key}>{item.name}</CollectionItem>} />
      ) : (
      <CollectionItem key={item.key}>{item.name}</CollectionItem>
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
