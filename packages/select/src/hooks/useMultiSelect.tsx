import { chain, filterDOMProps, mergeProps, useId } from '@react-aria/utils'
import { FocusEvent, RefObject, useMemo } from 'react'
import { ListKeyboardDelegate, useTypeSelect } from '@react-aria/selection'
import { setInteractionModality } from '@react-aria/interactions'
import { useCollator } from '@react-aria/i18n'
import { useField } from '@react-aria/label'
import { useMenuTrigger } from '@react-aria/menu'
import { SelectAria } from '@react-aria/select'
import { AriaMultiSelectOptions, MultiSelectState } from '../types'

export function useMultiSelect<T>(
  props: AriaMultiSelectOptions<T>,
  state: MultiSelectState<T>,
  ref: RefObject<HTMLElement>
): SelectAria<T> {
  const { keyboardDelegate, isDisabled } = props

  const collator = useCollator({ usage: 'search', sensitivity: 'base' })
  const delegate = useMemo(
    () => keyboardDelegate || new ListKeyboardDelegate(state.collection, state.disabledKeys, null as any, collator),
    [keyboardDelegate, state.collection, state.disabledKeys, collator]
  )

  const { menuTriggerProps, menuProps } = useMenuTrigger(
    {
      isDisabled,
      type: 'listbox'
    },
    state,
    ref
  )

  const { typeSelectProps } = useTypeSelect({
    keyboardDelegate: delegate,
    selectionManager: state.selectionManager,
    onTypeSelect(key) {
      if (state.selectedKeys !== 'all') {
        state.setSelectedKeys(state.selectedKeys.add(key))
      } else {
        state.setSelectedKeys(new Set([...state.collection].map(item => item.key).filter(k => k !== key)))
      }
    }
  })

  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField({
    ...props,
    labelElementType: 'span'
  })

  typeSelectProps.onKeyDown = typeSelectProps.onKeyDownCapture
  delete typeSelectProps.onKeyDownCapture

  const domProps = filterDOMProps(props, { labelable: true })
  const triggerProps = mergeProps(typeSelectProps, menuTriggerProps, fieldProps)

  const valueId = useId()

  return {
    labelProps: {
      ...labelProps,
      onClick: () => {
        if (!props.isDisabled) {
          ref.current?.focus()

          // Show the focus ring so the user knows where focus went
          setInteractionModality('keyboard')
        }
      }
    },
    triggerProps: mergeProps(domProps, {
      ...triggerProps,
      onKeyDown: chain(triggerProps.onKeyDown, props.onKeyDown),
      onKeyUp: props.onKeyUp,
      'aria-labelledby': [
        triggerProps['aria-labelledby'],
        triggerProps['aria-label'] && !triggerProps['aria-labelledby'] ? triggerProps.id : null,
        valueId
      ]
        .filter(Boolean)
        .join(' '),
      onFocus(e: FocusEvent) {
        if (state.isFocused) {
          return
        }

        if (props.onFocus) {
          props.onFocus(e)
        }

        if (props.onFocusChange) {
          props.onFocusChange(true)
        }

        state.setFocused(true)
      },
      onBlur(e: FocusEvent) {
        if (state.isOpen) {
          return
        }

        if (props.onBlur) {
          props.onBlur(e)
        }

        if (props.onFocusChange) {
          props.onFocusChange(false)
        }

        state.setFocused(false)
      }
    }),
    valueProps: {
      id: valueId
    },
    menuProps: {
      ...menuProps,
      autoFocus: state.focusStrategy || true,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
      disallowEmptySelection: true,
      onBlur: (e: FocusEvent) => {
        if (e.currentTarget.contains(e.relatedTarget as Node)) {
          return
        }

        if (props.onBlur) {
          props.onBlur(e)
        }

        if (props.onFocusChange) {
          props.onFocusChange(false)
        }

        state.setFocused(false)
      },
      'aria-labelledby': [
        fieldProps['aria-labelledby'],
        triggerProps['aria-label'] && !fieldProps['aria-labelledby'] ? triggerProps.id : null
      ]
        .filter(Boolean)
        .join(' ')
    },
    descriptionProps,
    errorMessageProps
  } as any
}
