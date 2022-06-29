import { ComboBoxAria, useComboBox } from '@react-aria/combobox'
import { AriaMultiComboBoxOptions, MultiComboBoxState } from '../types'

export function useMultiComboBox<T>(props: AriaMultiComboBoxOptions<T>, state: MultiComboBoxState<T>): ComboBoxAria<T> {
  return useComboBox(props as any, state as any)
}
