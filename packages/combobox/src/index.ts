/* eslint-disable no-undef */
import { ComboBox as ComboBoxRoot } from './ComboBox'
import { MultiComboBox as MultiComboBoxRoot } from './MultiComboBox'
import { InputGroup, Input, InputGroupItemClearButton, InputGroupItem } from './Input'
import { Label } from './Label'
import { Options, Option } from './Options'
import { Popover, PopoverTrigger } from './Popover'
import { Section, SectionHeading, SectionOptions } from './Section'
import { MultiState, SingleState } from './context'
import { ComboBoxInputGroupProps } from './types'

export const ComboBox = Object.assign(ComboBoxRoot, {
  Label,
  Popover,
  PopoverTrigger,
  Options,
  Option,
  InputGroup: InputGroup as (props: ComboBoxInputGroupProps<SingleState>) => JSX.Element,
  Input,
  Section,
  SectionHeading,
  SectionOptions
})

export const MultiComboBox = Object.assign(MultiComboBoxRoot, {
  Label,
  Popover,
  PopoverTrigger,
  Options,
  Option,
  InputGroup: InputGroup as (props: ComboBoxInputGroupProps<MultiState>) => JSX.Element,
  InputGroupItem,
  InputGroupItemClearButton,
  Input,
  Section,
  SectionHeading,
  SectionOptions
})

export * from './hooks'
export * from './types'
