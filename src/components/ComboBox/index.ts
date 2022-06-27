import { ComboBox as ComboBoxRoot } from './ComboBox'
import { InputGroup, Input } from './Input'
import { Label } from './Label'
import { Options, Option } from './Options'
import { Popover, PopoverTrigger } from './Popover'
import { Section, SectionHeading, SectionOptions } from './Section'

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

export * from './types'
