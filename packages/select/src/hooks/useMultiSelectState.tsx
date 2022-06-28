import {
  Node,
  MultipleSelection,
  Selection,
  SingleSelection
} from '@react-types/shared'
import { SelectProps } from '@react-types/select'
import { useState } from 'react'
import { MenuTriggerState, useMenuTriggerState } from '@react-stately/menu'
import { ListState } from '@react-stately/list'
import { useMultiSelectListState } from '@headless-react/shared'

export interface MultiSelectProps<T>
  extends Omit<SelectProps<T>, keyof SingleSelection>, Omit<MultipleSelection, 'disallowEmptySelection'> {
  /**
   * Whether the menu should be closed on select.
   * @default false
   */
  closeOnSelect?: boolean
}

export interface MultiSelectState<T> extends ListState<T>, MenuTriggerState {
  /** Whether the select is currently focused. */
  readonly isFocused: boolean
  /** Sets whether the select is focused. */
  setFocused(isFocused: boolean): void
  /** The key for the currently selected item. */
  readonly selectedKeys: Selection
  /** Sets the selected keys. */
  setSelectedKeys(keys: Selection): void
  /** The value of the currently selected item. */
  readonly selectedItems: Node<T>[]
}

/**
 * Provides state management for a select component. Handles building a collection
 * of items from props, handles the open state for the popup menu, and manages
 * multiple selection state.
 */
export function useMultiSelectState<T extends object>(props: MultiSelectProps<T>): MultiSelectState<T> {
  const triggerState = useMenuTriggerState(props)
  const listState = useMultiSelectListState({
    ...props,
    onSelectionChange: (keys: Selection) => {
      if (props.onSelectionChange != null) {
        props.onSelectionChange(keys)
      }
      if (props.closeOnSelect) {
        triggerState.close()
      }
    }
  })

  const [isFocused, setFocused] = useState(false)
  return {
    ...listState,
    ...triggerState,
    open() {
      // Don't open if the collection is empty.
      if (listState.collection.size !== 0) {
        triggerState.open()
      }
    },
    toggle(focusStrategy) {
      if (listState.collection.size !== 0) {
        triggerState.toggle(focusStrategy)
      }
    },
    isFocused,
    setFocused
  }
}
