import React, { useRef } from 'react'
import { Item, Section } from '@react-stately/collections'
import { useFilter } from '@react-aria/i18n'
import { useComboBox } from '@react-aria/combobox'
import { useComboBoxState } from '@react-stately/combobox'
import { ComboBoxProvider } from './context'
import { ComboBoxProps, ItemValueProps } from './types'

export const ComboBox = (props: ComboBoxProps) => {
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
  const { contains } = useFilter({ sensitivity: 'base' })
  const state = useComboBoxState({ ...ariaProps, defaultFilter: contains })
  const inputRef = useRef<HTMLInputElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const listBoxRef = useRef<HTMLUListElement | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  const comboBoxProps = useComboBox(
    {
      ...ariaProps,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef
    },
    state
  )

  return (
    <ComboBoxProvider
      value={{
        ...comboBoxProps,
        state,
        inputRef,
        buttonRef,
        listBoxRef,
        popoverRef
      }}
    >
      {props.children}
    </ComboBoxProvider>
  )
}
