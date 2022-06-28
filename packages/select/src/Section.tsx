import React from 'react'
import { useListBoxSection } from '@react-aria/listbox'
import { filterDOMProps, mergeProps } from '@react-aria/utils'
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
      <li {...mergeProps(itemProps, filterDOMProps(props))}>{typeof children === 'function' ? children?.({ section }) : children}</li>
    </SelectSectionProvider>
  )
}

export const SectionHeading = (props: SelectSectionHeadingProps) => {
  const { headingProps } = useSelectSectionContext()
  return <span {...mergeProps(headingProps, filterDOMProps(props))}>{props.children}</span>
}

export const SectionOptions = (props: SelectSectionOptionsProps) => {
  const { groupProps } = useSelectSectionContext()
  return <ul {...mergeProps(groupProps, filterDOMProps(props))}>{props.children}</ul>
}
