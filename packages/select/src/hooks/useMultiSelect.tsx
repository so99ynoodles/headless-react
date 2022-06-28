import { AriaButtonProps } from '@react-types/button'
import { AriaListBoxOptions } from '@react-aria/listbox'
import { chain, filterDOMProps, mergeProps, useId } from '@react-aria/utils'
import { FocusEvent, HTMLAttributes, RefObject, useMemo } from 'react'
import { KeyboardDelegate, CollectionBase, AsyncLoadable, InputBase, Validation, HelpTextProps, LabelableProps, TextInputBase, FocusableProps, MultipleSelection, DOMProps, AriaLabelingProps, FocusableDOMProps } from '@react-types/shared'
import { ListKeyboardDelegate, useTypeSelect } from '@react-aria/selection'
import { setInteractionModality } from '@react-aria/interactions'
import { useCollator } from '@react-aria/i18n'
import { useField } from '@react-aria/label'
import { useMenuTrigger } from '@react-aria/menu'
import { MultiSelectState } from './useMultiSelectState'

export interface MultiSelectProps<T> extends CollectionBase<T>, AsyncLoadable, Omit<InputBase, 'isReadOnly'>, Validation, HelpTextProps, LabelableProps, TextInputBase, Omit<MultipleSelection, 'disallowEmptySelection'>, FocusableProps {
  /** Sets the open state of the menu. */
  isOpen?: boolean,
  /** Sets the default open state of the menu. */
  defaultOpen?: boolean,
  /** Method that is called when the open state of the menu changes. */
  onOpenChange?: (isOpen: boolean) => void,
  /**
   * Whether the menu should automatically flip direction when space is limited.
   * @default true
   */
  shouldFlip?: boolean
}

export interface AriaMultiSelectProps<T> extends MultiSelectProps<T>, DOMProps, AriaLabelingProps, FocusableDOMProps {
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string,
  /**
   * The name of the input, used when submitting an HTML form.
   */
  name?: string
}

interface AriaSelectOptions<T> extends AriaMultiSelectProps<T> {
  /**
   * An optional keyboard delegate implementation for type to select,
   * to override the default.
   */
  keyboardDelegate?: KeyboardDelegate
}

interface SelectAria<T> {
  /** Props for the label element. */
  labelProps: HTMLAttributes<HTMLElement>

  /** Props for the popup trigger element. */
  triggerProps: AriaButtonProps

  /** Props for the element representing the selected value. */
  valueProps: HTMLAttributes<HTMLElement>

  /** Props for the popup. */
  menuProps: AriaListBoxOptions<T>

  /** Props for the select's description element, if any. */
  descriptionProps: HTMLAttributes<HTMLElement>

  /** Props for the select's error message element, if any. */
  errorMessageProps: HTMLAttributes<HTMLElement>
}

/**
 * Provides the behavior and accessibility implementation for a select component.
 * A select displays a collapsible list of options and allows a user to select one of them.
 * @param props - Props for the select.
 * @param state - State for the select, as returned by `useListState`.
 */
export function useMultiSelect<T>(
  props: AriaSelectOptions<T>,
  state: MultiSelectState<T>,
  ref: RefObject<HTMLElement>
): SelectAria<T> {
  const { keyboardDelegate, isDisabled } = props

  // By default, a KeyboardDelegate is provided which uses the DOM to query layout information (e.g. for page up/page down).
  // When virtualized, the layout object will be passed in as a prop and override this.
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
