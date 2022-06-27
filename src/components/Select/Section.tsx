import React from 'react'
import {
  mergeProps,
  useListBoxSection
} from 'react-aria'
import { SelectSectionProvider, useSelectSectionContext } from './context'
import { SelectSectionHeadingProps, SelectSectionOptionsProps, SelectSectionProps } from './types'

export const Section = (props: SelectSectionProps) => {
  const { section, children } = props
  const { itemProps, groupProps, headingProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label']
  })

  return (
    <SelectSectionProvider
      value={{
        itemProps,
        groupProps,
        headingProps,
        section
      }}
    >
      <li {...mergeProps(itemProps, props)}>{typeof children === 'function' ? children?.({ section }) : children}</li>
    </SelectSectionProvider>
  )
}

export const SectionHeading = (props: SelectSectionHeadingProps) => {
  const { headingProps } = useSelectSectionContext()
  return <span {...mergeProps(headingProps, props)}>{props.children}</span>
}

export const SectionOptions = (props: SelectSectionOptionsProps) => {
  const { groupProps } = useSelectSectionContext()
  return <ul {...mergeProps(groupProps, props)}>{props.children}</ul>
}
