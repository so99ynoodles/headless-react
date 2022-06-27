import React, { HTMLAttributes, MutableRefObject, ReactNode, useContext, useRef } from 'react'
import {
  DismissButton,
  FocusScope,
  mergeProps,
  useButton,
  useComboBox,
  useFilter,
  useFocusRing,
  useListBox,
  useListBoxSection,
  useOption,
  useOverlay
} from 'react-aria'
import { ComboBoxState, Item, Section as StatelySection, useComboBoxState } from 'react-stately'
import { AriaComboBoxProps } from '@react-types/combobox'
import { Node } from '@react-types/shared'
import { ItemValueProps } from '../../types'

export interface ComboBoxRootProps extends Omit<AriaComboBoxProps<ItemValueProps>, 'children'> {
  children?: ReactNode
}
export interface ComboBoxLabelProps extends HTMLAttributes<HTMLLabelElement> {}
export interface ComboBoxPopoverProps extends HTMLAttributes<HTMLDivElement> {}
export interface ComboBoxOptionsProps extends Omit<HTMLAttributes<HTMLUListElement>, 'children'> {
  children: ((props: { options: Node<ItemValueProps>[] }) => ReactNode) | ReactNode
}
export interface ComboBoxOptionProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children' | 'className'> {
  option: Node<ItemValueProps>
  className?:
    | string
    | ((props: { isDisabled: boolean; isSelected: boolean; isFocused: boolean; option: ItemValueProps }) => string)
  children:
    | ReactNode
    | ((props: { isDisabled: boolean; isSelected: boolean; isFocused: boolean; option: ItemValueProps }) => ReactNode)
}
export interface ComboBoxSectionProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
  section: Node<ItemValueProps>
  children: ReactNode | ((props: { section: Node<ItemValueProps> }) => ReactNode)
}
export interface ComboBoxSectionOptionsProps extends HTMLAttributes<HTMLUListElement> {}
export interface ComboBoxSectionHeadingProps extends HTMLAttributes<HTMLSpanElement> {}
export interface ComboBoxInputGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
  className?: string | ((props: { isFocused: boolean; isOpen: boolean; selectedItem: Node<ItemValueProps> }) => string)
  children:
    | ReactNode
    | ((props: { isFocused: boolean; isOpen: boolean; selectedItem: Node<ItemValueProps> }) => ReactNode)
}
export interface ComboBoxInputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'className'> {
  className?: string | ((props: { isFocused: boolean }) => string)
}
export interface ComboBoxPopoverTriggerProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'placeholder' | 'children' | 'className'> {
  placeholder?: ReactNode
  children: ReactNode
  className?: string | ((props: ComboBoxState<ItemValueProps> & { isFocusVisible: boolean }) => string)
}

const createComboBoxContext = () => {
  const ComboBoxContext = React.createContext<
    |(ReturnType<typeof useComboBox> & {
        state: ComboBoxState<ItemValueProps>
        inputRef: MutableRefObject<HTMLInputElement | null>
        listBoxRef: MutableRefObject<HTMLUListElement | null>
        popoverRef: MutableRefObject<HTMLDivElement | null>
        buttonRef: MutableRefObject<HTMLButtonElement | null>
      })
      | undefined
      >(undefined)

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
  const ComboBoxSectionContext = React.createContext<
    |(ReturnType<typeof useListBoxSection> & {
        section: Node<ItemValueProps>
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

const ComboBoxRoot = (props: ComboBoxRootProps) => {
  const ariaProps = {
    ...props,
    label: 'x',
    children: (item: ItemValueProps) =>
      item.items ? (
        // eslint-disable-next-line react/no-children-prop
        <StatelySection key={item.key} title={item.name} items={item.items} children={(item: ItemValueProps) => <Item key={item.key}>{item.name}</Item>} />
      ) : (
        <Item key={item.key}>{item.name}</Item>
      )
  }
  const { contains } = useFilter({ sensitivity: 'base' })
  const state = useComboBoxState({ ...ariaProps, defaultFilter: contains })
  const inputRef = useRef<HTMLInputElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const listBoxRef = useRef<HTMLUListElement | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  const comboBoxProps = useComboBox(
    {
      ...ariaProps,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef
    },
    state
  )

  return (
    <ComboBoxProvider
      value={{
        ...comboBoxProps,
        state,
        inputRef,
        buttonRef,
        listBoxRef,
        popoverRef
      }}
    >
      {props.children}
    </ComboBoxProvider>
  )
}

const Label = (props: ComboBoxLabelProps) => {
  const { labelProps } = useComboBoxContext()
  return <label {...mergeProps(labelProps, props)} />
}

const Popover = (props: ComboBoxPopoverProps) => {
  const { state, popoverRef: overlayRef } = useComboBoxContext()
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

const Options = (props: ComboBoxOptionsProps) => {
  const { listBoxProps: listProps, listBoxRef, state } = useComboBoxContext()
  const { listBoxProps } = useListBox(listProps, state, listBoxRef)

  if (!state.isOpen) {
    return null
  }

  return (
    <ul ref={listBoxRef} {...mergeProps(listBoxProps, props)}>
      {typeof props.children === 'function' ? props.children?.({ options: [...state.collection] }) : props.children}
    </ul>
  )
}

const Section = (props: ComboBoxSectionProps) => {
  const { section, children } = props
  const { itemProps, groupProps, headingProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label']
  })

  return (
    <ComboBoxSectionProvider
      value={{
        itemProps,
        groupProps,
        headingProps,
        section
      }}
    >
      <li {...mergeProps(itemProps, props)}>{typeof children === 'function' ? children?.({ section }) : children}</li>
    </ComboBoxSectionProvider>
  )
}

const SectionHeading = (props: ComboBoxSectionHeadingProps) => {
  const { headingProps } = useComboBoxSectionContext()
  return <span {...mergeProps(headingProps, props)}>{props.children}</span>
}

const SectionOptions = (props: ComboBoxSectionOptionsProps) => {
  const { groupProps } = useComboBoxSectionContext()
  return <ul {...mergeProps(groupProps, props)}>{props.children}</ul>
}

const Option = (props: ComboBoxOptionProps) => {
  const { option } = props
  const { state } = useComboBoxContext()
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

const PopoverTrigger = (props: ComboBoxPopoverTriggerProps) => {
  const { buttonProps: triggerProps, buttonRef: triggerRef, state } = useComboBoxContext()
  const { focusProps, isFocusVisible } = useFocusRing()
  const { buttonProps } = useButton(triggerProps, triggerRef)
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={triggerRef}
      className={
        typeof props.className === 'string' ? props.className : props.className?.({ ...state, isFocusVisible })
      }
    >
      {props.children}
    </button>
  )
}

const InputGroup = (props: ComboBoxInputGroupProps) => {
  const { state } = useComboBoxContext()
  const { selectedItem, isFocused, isOpen } = state
  return (
    <div
      {...props}
      className={
        typeof props.className === 'string' ? props.className : props.className?.({ isFocused, isOpen, selectedItem })
      }
    >
      {typeof props.children === 'function' ? props.children?.({ isFocused, isOpen, selectedItem }) : props.children}
    </div>
  )
}

const Input = (props: ComboBoxInputProps) => {
  const { inputProps, inputRef, state } = useComboBoxContext()
  return (
    <input
      {...mergeProps(inputProps, props)}
      className={
        typeof props.className === 'string' ? props.className : props.className?.({ isFocused: state.isFocused })
      }
      ref={inputRef}
    />
  )
}

export const ComboBox = Object.assign(ComboBoxRoot, {
  Label,
  Popover,
  PopoverTrigger,
  Options,
  Option,
  InputGroup,
  Input,
  Section,
  SectionHeading,
  SectionOptions
})
