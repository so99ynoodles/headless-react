import React, { useRef, useContext, ReactNode, HTMLAttributes, MutableRefObject } from 'react'
import {
  useSelect,
  HiddenSelect,
  useListBox,
  mergeProps,
  useOption,
  useButton,
  useFocusRing,
  useOverlay,
  FocusScope,
  DismissButton
} from 'react-aria'
import { useSelectState, Item, SelectState } from 'react-stately'
import { AriaSelectProps } from '@react-types/select'
import { Node } from '@react-types/shared'
import { ItemValueProps } from '../../types'

export interface SelectRootProps extends Omit<AriaSelectProps<ItemValueProps>, 'children'> {
  children: ReactNode
  label?: string
  name?: string
}
export interface SelectLabelProps extends HTMLAttributes<HTMLLabelElement> {}
export interface SelectMenuProps extends HTMLAttributes<HTMLDivElement> {}
export interface SelectOptionsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ((props: { options: Node<ItemValueProps>[] }) => ReactNode) | ReactNode
}
export interface SelectOptionProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children' | 'className'> {
  option: Node<ItemValueProps>
  className?:
    | string
    | ((props: { isDisabled: boolean; isSelected: boolean; isFocused: boolean; option: ItemValueProps }) => string)
  children:
    | ReactNode
    | ((props: { isDisabled: boolean; isSelected: boolean; isFocused: boolean; option: ItemValueProps }) => ReactNode)
}
export interface SelectPopoverTriggerProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'placeholder' | 'children' | 'className'> {
  placeholder?: ReactNode
  children: (props: { selectedItem: ItemValueProps }) => ReactNode
  className?: string | ((props: SelectState<ItemValueProps> & { isFocusVisible: boolean }) => string)
}

const createSelectContext = () => {
  const SelectContext = React.createContext<
    |(ReturnType<typeof useSelect> & {
        state: SelectState<ItemValueProps>
        triggerRef: MutableRefObject<HTMLButtonElement | null>
      })
      | undefined
      >(undefined)

  const useSelectContext = () => {
    const context = useContext(SelectContext)
    if (!context) {
      throw new Error(
        'You cannot use `Select.Label`, `Select.Popover`, `Select.PopoverTrigger`, `Select.Options` or `Select.Option` outside of `Select` component.'
      )
    }
    return context
  }
  return [useSelectContext, SelectContext.Provider] as const
}

const [useSelectContext, SelectProvider] = createSelectContext()

const SelectRoot = (props: SelectRootProps) => {
  const ariaProps = {
    ...props,
    label: 'x',
    children: (item: ItemValueProps) => <Item>{item.name}</Item>
  }
  const state = useSelectState(ariaProps)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const selectAria = useSelect(ariaProps, state, triggerRef)
  return (
    <SelectProvider
      value={{
        state,
        triggerRef,
        ...selectAria
      }}
    >
      {props.children}
      <HiddenSelect state={state} triggerRef={triggerRef} name={props.name} label={props.label} />
    </SelectProvider>
  )
}

const Label = (props: SelectLabelProps) => {
  const { labelProps } = useSelectContext()
  return <label {...mergeProps(labelProps, props)} />
}

const Popover = (props: SelectMenuProps) => {
  const { state } = useSelectContext()
  const overlayRef = React.useRef(null)
  const { overlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      shouldCloseOnBlur: true,
      isDismissable: false
    },
    overlayRef
  )

  if (!state.isOpen) {
    return null
  }

  return (
    <FocusScope restoreFocus>
      <div ref={overlayRef} {...mergeProps(overlayProps, props)}>
        {props.children}
        <DismissButton onDismiss={state.close} />
      </div>
    </FocusScope>
  )
}

const Options = (props: SelectOptionsProps) => {
  const { menuProps, state } = useSelectContext()
  const listRef = useRef<HTMLUListElement | null>(null)
  const { listBoxProps } = useListBox(menuProps, state, listRef)

  if (!state.isOpen) {
    return null
  }

  return (
    <ul ref={listRef} {...mergeProps(listBoxProps, props)}>
      {typeof props.children === 'function' ? props.children?.({ options: [...state.collection] }) : props.children}
    </ul>
  )
}
const Option = (props: SelectOptionProps) => {
  const { option } = props
  const { state } = useSelectContext()
  const optionRef = React.useRef<HTMLLIElement | null>(null)
  const { optionProps, isDisabled, isSelected, isFocused } = useOption({ key: option.key }, state, optionRef)
  return (
    <li
      {...optionProps}
      ref={optionRef}
      className={
        typeof props.className === 'string'
          ? props.className
          : props.className?.({ isDisabled, isSelected, isFocused, option })
      }
    >
      {typeof props.children === 'function'
        ? props.children?.({ isDisabled, isSelected, isFocused, option })
        : props.children}
    </li>
  )
}
const PopoverTrigger = (props: SelectPopoverTriggerProps) => {
  const { triggerProps, valueProps, triggerRef, state } = useSelectContext()
  const { focusProps, isFocusVisible } = useFocusRing()
  const { buttonProps } = useButton(triggerProps, triggerRef)
  return (
    <button
      {...mergeProps(buttonProps, valueProps, focusProps)}
      ref={triggerRef}
      className={
        typeof props.className === 'string' ? props.className : props.className?.({ ...state, isFocusVisible })
      }
    >
      {props.children({ selectedItem: state.selectedItem?.value })}
    </button>
  )
}

export const Select = Object.assign(SelectRoot, { Label, PopoverTrigger, Popover, Options, Option })
