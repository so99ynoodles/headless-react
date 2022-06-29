import { useInteractionModality } from '@react-aria/interactions'
import { useVisuallyHidden } from '@react-aria/visually-hidden'
import { ChangeEvent, RefObject } from 'react'
import { MultiHiddenSelectProps, MultiSelectState } from '../types'

export function useMultiHiddenSelect<T>(props: MultiHiddenSelectProps<T>, state: MultiSelectState<T>, triggerRef: RefObject<HTMLElement>) {
  const { autoComplete, name, isDisabled } = props
  const modality = useInteractionModality()
  const { visuallyHiddenProps } = useVisuallyHidden()

  return {
    containerProps: {
      ...visuallyHiddenProps,
      'aria-hidden': true
    },
    inputProps: {
      type: 'text',
      tabIndex: modality == null || state.isFocused || state.isOpen ? -1 : 0,
      style: { fontSize: 16 },
      onFocus: () => triggerRef.current?.focus(),
      disabled: isDisabled
    },
    selectProps: {
      tabIndex: -1,
      autoComplete,
      disabled: isDisabled,
      name,
      size: state.collection.size,
      selectedoptions: [...state.collection].map(item => ({ value: item.key })),
      onChange: (e: ChangeEvent<HTMLSelectElement>) => state.setSelectedKeys(new Set([...e.target.selectedOptions].map(option => option.value)))
    }
  }
}
