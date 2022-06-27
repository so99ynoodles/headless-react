import React from 'react'
import { useListBoxSection } from '@react-aria/listbox'
import { mergeProps } from '@react-aria/utils'
import { useComboBoxSectionContext, ComboBoxSectionProvider } from './context'
import { ComboBoxSectionHeadingProps, ComboBoxSectionOptionsProps, ComboBoxSectionProps } from './types'

export const Section = (props: ComboBoxSectionProps) => {
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

export const SectionHeading = (props: ComboBoxSectionHeadingProps) => {
  const { headingProps } = useComboBoxSectionContext()
  return <span {...mergeProps(headingProps, props)}>{props.children}</span>
}

export const SectionOptions = (props: ComboBoxSectionOptionsProps) => {
  const { groupProps } = useComboBoxSectionContext()
  return <ul {...mergeProps(groupProps, props)}>{props.children}</ul>
}
