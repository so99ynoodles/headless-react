/* eslint-disable no-undef */
import { Select as SelectRoot } from './Select'
import { MultiSelect as MultiSelectRoot } from './MultiSelect'
import { Label } from './Label'
import { Popover, PopoverTrigger } from './Popover'
import { Options, Option } from './Option'
import { Section, SectionHeading, SectionOptions } from './Section'
import { SelectPopoverTriggerProps } from './types'
import { MultiState, SingleState } from './context'

export const Select = Object.assign(SelectRoot, {
  Label,
  Popover,
  PopoverTrigger: PopoverTrigger as (props: SelectPopoverTriggerProps<SingleState>) => JSX.Element,
  Options,
  Option,
  Section,
  SectionHeading,
  SectionOptions
})

export const MultiSelect = Object.assign(MultiSelectRoot, {
  Label,
  Popover,
  PopoverTrigger: PopoverTrigger as (props: SelectPopoverTriggerProps<MultiState>) => JSX.Element,
  Options,
  Option,
  Section,
  SectionHeading,
  SectionOptions
})
export * from './types'
