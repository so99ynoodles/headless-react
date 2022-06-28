import { createContext, useContext, MutableRefObject } from 'react'
import { Node } from '@react-types/shared'
import { useSelect } from '@react-aria/select'
import { useListBoxSection } from '@react-aria/listbox'
import { SelectState } from '@react-stately/select'
import { Item } from './types'
import { MultiSelectState } from './hooks/useMultiSelectState'

export type SingleState = SelectState<Item>
export type MultiState = MultiSelectState<Item>
interface ContextType<T> extends ReturnType<typeof useSelect> {
  state: T
  triggerRef: MutableRefObject<HTMLButtonElement | null>
}

const createSelectContext = () => {
  const SelectContext = createContext<ContextType<SingleState | MultiState> | undefined>(undefined)
  const useSelectContext = () => {
    const context = useContext(SelectContext)
    if (!context) {
      throw new Error(
        'You cannot use `Select.Label`, `Select.Popover`, `Select.PopoverTrigger`, `Select.Section`, `Select.Options` or `Select.Option` outside of `Select` component.'
      )
    }
    return context
  }
  return [useSelectContext, SelectContext.Provider] as const
}

const createSelectSectionContext = () => {
  const SelectSectionContext = createContext<
    |(ReturnType<typeof useListBoxSection> & {
        section: Node<Item>
      })
      | undefined
      >(undefined)

  const useSelectSectionContext = () => {
    const context = useContext(SelectSectionContext)
    if (!context) {
      throw new Error(
        'You cannot use `Select.SectionHeading` or `Select.SectionOptions` outside of `Select.Section` component.'
      )
    }
    return context
  }
  return [useSelectSectionContext, SelectSectionContext.Provider] as const
}

const createMultiSelectPopoverContext = () => {
  const MultiSelectPopoverContext = createContext<Node<Item> | undefined>(undefined)

  const useMultiSelectPopoverContext = () => {
    const context = useContext(MultiSelectPopoverContext)
    if (!context) {
      throw new Error(
        'You cannot use `MultiSelect.PopoverItem` or `MultiSelect.PopoverItemClearButton` outside of `MultiSelect.Popover` component.'
      )
    }
    return context
  }
  return [useMultiSelectPopoverContext, MultiSelectPopoverContext.Provider] as const
}

const [useSelectContext, SelectProvider] = createSelectContext()
const [useSelectSectionContext, SelectSectionProvider] = createSelectSectionContext()
const [useMultiSelectPopoverContext, MultiSelectPopoverProvider] = createMultiSelectPopoverContext()

export {
  useSelectContext,
  SelectProvider,
  useSelectSectionContext,
  SelectSectionProvider,
  useMultiSelectPopoverContext,
  MultiSelectPopoverProvider
}
