import { createContext, MutableRefObject, useContext } from 'react'
import { useComboBox } from '@react-aria/combobox'
import { useListBoxSection } from '@react-aria/listbox'
import { ComboBoxState } from '@react-stately/combobox'
import { Node } from '@react-types/shared'
import { Item } from '@headless-react/shared'
import { MultiComboBoxState } from './types'

export type SingleState = ComboBoxState<Item>
export type MultiState = MultiComboBoxState<Item>
interface ContextType<T> extends ReturnType<typeof useComboBox> {
  state: T
  inputRef: MutableRefObject<HTMLInputElement | null>
  listBoxRef: MutableRefObject<HTMLUListElement | null>
  popoverRef: MutableRefObject<HTMLDivElement | null>
  buttonRef: MutableRefObject<HTMLButtonElement | null>
}

const createComboBoxContext = () => {
  const ComboBoxContext = createContext<ContextType<SingleState | MultiState> | undefined>(undefined)
  const useComboBoxContext = () => {
    const context = useContext(ComboBoxContext)
    if (!context) {
      throw new Error(
        'You cannot use `ComboBox.Label`, `ComboBox.Menu`, `ComboBox.Trigger`, `ComboBox.Section`, `ComboBox.Options` or `ComboBox.Option` outside of `Select` component.'
      )
    }
    return context
  }
  return [useComboBoxContext, ComboBoxContext.Provider] as const
}

const createComboBoxSectionContext = () => {
  const ComboBoxSectionContext = createContext<
    |(ReturnType<typeof useListBoxSection> & {
        section: Node<Item>
      })
      | undefined
      >(undefined)

  const useComboBoxSectionContext = () => {
    const context = useContext(ComboBoxSectionContext)
    if (!context) {
      throw new Error(
        'You cannot use `ComboBox.SectionHeading` or `ComboBox.SectionOptions` outside of `ComboBox.Section` component.'
      )
    }
    return context
  }
  return [useComboBoxSectionContext, ComboBoxSectionContext.Provider] as const
}

const [useComboBoxContext, ComboBoxProvider] = createComboBoxContext()
const [useComboBoxSectionContext, ComboBoxSectionProvider] = createComboBoxSectionContext()

export {
  useComboBoxContext,
  ComboBoxProvider,
  useComboBoxSectionContext,
  ComboBoxSectionProvider
}
