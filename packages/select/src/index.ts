import { Select as SelectRoot } from './Select'
import { Label } from './Label'
import { Popover, PopoverTrigger } from './Popover'
import { Options, Option } from './Option'
import { Section, SectionHeading, SectionOptions } from './Section'

export const Select = Object.assign(SelectRoot, {
  Label,
  Popover,
  PopoverTrigger,
  Options,
  Option,
  Section,
  SectionHeading,
  SectionOptions
})
export * from './types'
