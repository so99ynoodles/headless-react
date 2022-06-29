import {
  Selection
} from '@react-types/shared'
import { useState } from 'react'
import { useMenuTriggerState } from '@react-stately/menu'
import { useMultiSelectListState } from '@headless-react/shared'
import { MultiSelectProps, MultiSelectState } from '../types'

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
