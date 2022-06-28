import { createContext, useContext, MutableRefObject } from 'react'
import { Node } from '@react-types/shared'
import { useSelect } from '@react-aria/select'
import { useListBoxSection } from '@react-aria/listbox'
import { SelectState } from '@react-stately/select'
import { ItemValueProps } from './types'
import { MultiSelectState } from './hooks/useMultiSelectState'

export type SingleState = SelectState<ItemValueProps>
export type MultiState = MultiSelectState<ItemValueProps>
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
        section: Node<ItemValueProps>
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

const [useSelectContext, SelectProvider] = createSelectContext()
const [useSelectSectionContext, SelectSectionProvider] = createSelectSectionContext()

export {
  useSelectContext,
  SelectProvider,
  useSelectSectionContext,
  SelectSectionProvider
}
