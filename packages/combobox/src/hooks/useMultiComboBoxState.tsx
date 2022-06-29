import { Collection, FocusStrategy, Node, Selection } from '@react-types/shared'
import { MenuTriggerAction } from '@react-types/combobox'
import { ListCollection } from '@react-stately/list'
import { useControlledState } from '@react-stately/utils'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useMenuTriggerState } from '@react-stately/menu'
import { useMultiSelectListState } from '@headless-react/shared'
import { MultiComboBoxState, MultiComboBoxStateProps } from '../types'

type FilterFn = (textValue: string, inputValue: string) => boolean
export function useMultiComboBoxState<T extends object>(props: MultiComboBoxStateProps<T>): MultiComboBoxState<T> {
  const {
    defaultFilter,
    menuTrigger = 'input',
    allowsEmptyCollection = false,
    allowsCustomValue,
    shouldCloseOnBlur = true
  } = props

  const [showAllItems, setShowAllItems] = useState(false)
  const [isFocused, setFocusedState] = useState(false)
  const [inputValue, setInputValue] = useControlledState(
    props.inputValue as string,
    props.defaultInputValue ?? '',
    props.onInputChange!
  )

  const onSelectionChange = (keys: Selection) => {
    if (props.onSelectionChange) {
      props.onSelectionChange(keys)
    }
    resetInputValue()
    triggerState.close()
  }

  const { collection, selectionManager, selectedKeys, setSelectedKeys, selectedItems, disabledKeys } =
    useMultiSelectListState({
      ...props,
      onSelectionChange,
      items: props.items ?? props.defaultItems
    })

  // Preserve original collection so we can show all items on demand
  const originalCollection = collection
  const filteredCollection = useMemo(
    () =>
      // No default filter if items are controlled.
      props.items != null || !defaultFilter ? collection : filterCollection(collection, inputValue, defaultFilter),
    [collection, inputValue, defaultFilter, props.items]
  )

  // Track what action is attempting to open the menu
  const menuOpenTrigger = useRef('focus' as MenuTriggerAction)
  const onOpenChange = (open: boolean) => {
    if (props.onOpenChange) {
      props.onOpenChange(open, open ? menuOpenTrigger.current : undefined)
    }
  }

  const triggerState = useMenuTriggerState({ ...props, onOpenChange, isOpen: undefined, defaultOpen: undefined })
  const open = (focusStrategy?: FocusStrategy, trigger?: MenuTriggerAction) => {
    const displayAllItems = trigger === 'manual' || (trigger === 'focus' && menuTrigger === 'focus')
    // Prevent open operations from triggering if there is nothing to display
    // Also prevent open operations from triggering if items are uncontrolled but defaultItems is empty, even if displayAllItems is true.
    // This is to prevent comboboxes with empty defaultItems from opening but allow controlled items comboboxes to open even if the inital list is empty (assumption is user will provide swap the empty list with a base list via onOpenChange returning `menuTrigger` manual)
    if (
      allowsEmptyCollection ||
      filteredCollection.size > 0 ||
      (displayAllItems && originalCollection.size > 0) ||
      props.items
    ) {
      if (displayAllItems && !triggerState.isOpen && props.items === undefined) {
        // Show all items if menu is manually opened. Only care about this if items are undefined
        setShowAllItems(true)
      }

      menuOpenTrigger.current = trigger!
      triggerState.open(focusStrategy)
    }
  }

  const toggle = (focusStrategy?: FocusStrategy, trigger?: MenuTriggerAction) => {
    const displayAllItems = trigger === 'manual' || (trigger === 'focus' && menuTrigger === 'focus')
    // If the menu is closed and there is nothing to display, early return so toggle isn't called to prevent extraneous onOpenChange
    if (
      !(
        allowsEmptyCollection ||
        filteredCollection.size > 0 ||
        (displayAllItems && originalCollection.size > 0) ||
        props.items
      ) &&
      !triggerState.isOpen
    ) {
      return
    }

    if (displayAllItems && !triggerState.isOpen && props.items === undefined) {
      // Show all items if menu is toggled open. Only care about this if items are undefined
      setShowAllItems(true)
    }

    // Only update the menuOpenTrigger if menu is currently closed
    if (!triggerState.isOpen) {
      menuOpenTrigger.current = trigger!
    }

    triggerState.toggle(focusStrategy)
  }

  const lastValue = useRef(inputValue)
  const resetInputValue = () => {
    // multi combobox should not restore the text value
    lastValue.current = ''
    setInputValue('')
  }

  const isInitialRender = useRef(true)

  useEffect(() => {
    // Open and close menu automatically when the input value changes if the input is focused,
    // and there are items in the collection or allowEmptyCollection is true.
    if (
      isFocused &&
      (filteredCollection.size > 0 || allowsEmptyCollection) &&
      inputValue !== lastValue.current &&
      !triggerState.isOpen &&
      menuTrigger !== 'manual'
    ) {
      open(null as any, 'input')
    }

    // Close the menu if the collection is empty. Don't close menu if filtered collection size is 0
    // but we are currently showing all items via button press
    if (!showAllItems && !allowsEmptyCollection && triggerState.isOpen && filteredCollection.size === 0) {
      triggerState.close()
    }

    // If it is the intial render and inputValue isn't controlled nor has an intial value, set input to match current selected key if any
    if (isInitialRender.current && props.inputValue === undefined && props.defaultInputValue === undefined) {
      resetInputValue()
    }

    lastValue.current = inputValue
    isInitialRender.current = false
  })

  useEffect(() => {
    // Reset focused key when the menu closes
    if (!triggerState.isOpen) {
      selectionManager.setFocusedKey(null as any)
    }
  }, [triggerState.isOpen, selectionManager])

  const revert = () => {
    if (allowsCustomValue && [...selectedKeys].length) {
      commitCustomValue()
    } else {
      commitSelection()
    }
  }

  const commitCustomValue = () => {
    setSelectedKeys(new Set([...selectedKeys, inputValue]))
    resetInputValue()
    triggerState.close()
  }

  const commitSelection = () => {
    // If multiple things are controlled, call onSelectionChange
    if (props.selectedKeys !== undefined && props.inputValue !== undefined) {
      props.onSelectionChange?.(selectedKeys)
      // Stop menu from reopening from useEffect
      const itemText = collection.getItem(selectionManager.focusedKey).textValue ?? ''
      lastValue.current = itemText
    }
    // If only a single aspect of combobox is controlled, reset input value and close menu for the user
    resetInputValue()
    triggerState.close()
  }

  const commit = () => {
    if (triggerState.isOpen && selectionManager.focusedKey != null) {
      // Reset inputValue and close menu here if the selected key is already the focused key. Otherwise
      // fire onSelectionChange to allow the application to control the closing.
      if ([...selectedKeys].includes(selectionManager.focusedKey)) {
        setSelectedKeys(new Set([...selectedKeys].filter((key) => key !== selectionManager.focusedKey)))
        commitSelection()
      } else {
        setSelectedKeys(new Set([...selectedKeys, selectionManager.focusedKey]))
        commitSelection()
      }
    } else if (allowsCustomValue) {
      commitCustomValue()
    } else {
      // Reset inputValue and close menu if no item is focused but user triggers a commit
      commitSelection()
    }
  }

  const setFocused = (isFocused: boolean) => {
    if (isFocused) {
      if (menuTrigger === 'focus') {
        open(null as any, 'focus')
      }
    } else if (shouldCloseOnBlur) {
      const itemTexts = [...collection].map((item) => item.textValue)
      if (allowsCustomValue && !itemTexts.includes(inputValue)) {
        commitCustomValue()
      } else {
        commitSelection()
      }
    }

    setFocusedState(isFocused)
  }

  return {
    ...triggerState,
    toggle,
    open,
    selectionManager,
    selectedKeys,
    setSelectedKeys,
    disabledKeys,
    isFocused,
    setFocused,
    selectedItems,
    collection: showAllItems ? originalCollection : filteredCollection,
    inputValue,
    setInputValue,
    commit,
    revert
  }
}

function filterCollection<T extends object>(
  collection: Collection<Node<T>>,
  inputValue: string,
  filter: FilterFn
): Collection<Node<T>> {
  return new ListCollection(filterNodes(collection, inputValue, filter))
}

function filterNodes<T>(nodes: Iterable<Node<T>>, inputValue: string, filter: FilterFn): Iterable<Node<T>> {
  const filteredNode = []
  for (const node of nodes) {
    if (node.type === 'section' && node.hasChildNodes) {
      const filtered = filterNodes(node.childNodes, inputValue, filter)
      if ([...filtered].length > 0) {
        filteredNode.push({ ...node, childNodes: filtered })
      }
    } else if (node.type !== 'section' && filter(node.textValue, inputValue)) {
      filteredNode.push({ ...node })
    }
  }
  return filteredNode
}
