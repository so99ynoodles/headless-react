import { Key } from 'react'
import { CollectionBase, Selection, Node } from '@react-types/shared'
import { MultipleSelectionStateProps } from '@react-stately/selection'
import { ListState, useListState } from '@react-stately/list'
import { useControlledState } from '@react-stately/utils'

export interface MultiSelectListProps<T> extends CollectionBase<T>, MultipleSelectionStateProps {
  /** Filter function to generate a filtered list of nodes. */
  filter?: (nodes: Iterable<Node<T>>) => Iterable<Node<T>>
  /** @private */
  suppressTextValueWarning?: boolean
}

export interface MultiSelectListState<T> extends ListState<T> {
  /** The key for the currently selected item. */
  readonly selectedKeys: Selection
  /** Sets the selected keys. */
  setSelectedKeys(keys: Set<Key>): void
  /** The value of the currently selected item. */
  readonly selectedItems: Node<T>[]
}

export function useMultiSelectListState<T extends object>(props: MultiSelectListProps<T>): MultiSelectListState<T> {
  const [selectedKeys, setSelectedKeys] = useControlledState<Selection>(
    props.selectedKeys as Selection,
    props.defaultSelectedKeys = new Set(),
    props.onSelectionChange!
  )
  const { collection, disabledKeys, selectionManager } = useListState({
    ...props,
    selectionMode: 'multiple',
    disallowEmptySelection: false,
    allowDuplicateSelectionEvents: true,
    selectedKeys,
    onSelectionChange: (keys: Selection) => {
      if (props.onSelectionChange) {
        props.onSelectionChange(keys)
      }
      setSelectedKeys(keys)
    }
  })

  const selectedItems = selectedKeys === 'all' ? [...collection] : [...selectedKeys].map(key => collection.getItem(key))
  return {
    collection,
    disabledKeys,
    selectionManager,
    selectedKeys,
    setSelectedKeys,
    selectedItems
  }
}
