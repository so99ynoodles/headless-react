import React from 'react'
import classcat from 'classcat'
import { FaCheck, FaChevronDown } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { Select, MultiSelect, ItemValueProps } from '../index'

export default {
  title: 'Example/Select',
  component: Select
}

const items = [
  {
    id: 1,
    name: 'Wade Cooper',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Arlene Mccoy',
    avatar:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    name: 'Devon Webb',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
  },
  {
    id: 4,
    name: 'Tom Cook',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 5,
    name: 'Tanya Fox',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 6,
    name: 'Hellen Schmidt',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 7,
    name: 'Caroline Schultz',
    avatar:
      'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 8,
    name: 'Mason Heaney',
    avatar:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 9,
    name: 'Claudie Smitham',
    avatar:
      'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 10,
    name: 'Emil Schaefer',
    avatar:
      'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
]

const sectionItems = [
  {
    id: 'eg',
    key: 'engineers',
    name: 'Engineers',
    items: [
      {
        id: 1,
        key: 'wade cooper',
        name: 'Wade Cooper',
        avatar:
          'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 2,
        key: 'arlene maccoy',
        name: 'Arlene Mccoy',
        avatar:
          'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 3,
        key: 'devon webb',
        name: 'Devon Webb',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
      },
      {
        id: 4,
        key: 'tom cook',
        name: 'Tom Cook',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 5,
        key: 'tanya fox',
        name: 'Tanya Fox',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ]
  },
  {
    id: 'md',
    key: 'merchandisers',
    name: 'Merchandisers',
    items: [
      {
        id: 6,
        key: 'hellen schmidt',
        name: 'Hellen Schmidt',
        avatar:
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 7,
        key: 'caroline schultz',
        name: 'Caroline Schultz',
        avatar:
          'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 8,
        key: 'mason heaney',
        name: 'Mason Heaney',
        avatar:
          'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 9,
        key: 'claudie smitham',
        name: 'Claudie Smitham',
        avatar:
          'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 10,
        key: 'emil schaefer',
        name: 'Emil Schaefer',
        avatar:
          'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ]
  }
]

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = ({ items }: { items: ItemValueProps[] }) => {
  return (
    <Select items={items}>
      <Select.Label className="block text-sm font-medium mb-1 text-gray-700">Assigned to</Select.Label>
      <Select.PopoverTrigger
        className={({
          isFocusVisible
        }) => `relative w-full bg-white border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none ${
          isFocusVisible ? 'ring-indigo-500 border-indigo-500 ring-1' : 'border-gray-300'
        } sm:text-sm"
    `}
      >
        {({ selectedItem }) => (
          <>
            <span className="flex items-center">
              {selectedItem ? (
                <>
                  <img src={selectedItem.value.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                  <span className="ml-3 block truncate">{selectedItem.value.name}</span>
                  <Select.PopoverClearButton className="absolute ml-3 inset-y-0 right-0 flex items-center pr-2">
                    <IoMdClose className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Select.PopoverClearButton>
                </>
              ) : (
                <>
                  <span className="block truncate text-gray-400">Select</span>
                  <span className="absolute ml-3 inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <FaChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </>
              )}
            </span>
          </>
        )}
      </Select.PopoverTrigger>
      <Select.Popover>
        <Select.Options className="z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {({ options }) =>
            options.map((option) =>
              option.type === 'section' ? (
                <Select.Section key={option.key} section={option}>
                  {({ section }) => (
                    <>
                      {section.rendered && (
                        <Select.SectionHeading className="text-xs font-bold uppercase text-gray-500 mx-3">
                          {section.rendered}
                        </Select.SectionHeading>
                      )}
                      <Select.SectionOptions>
                        {[...section.childNodes].map((option) => {
                          return (
                            <Select.Option
                              className={({ isDisabled, isFocused }) =>
                                classcat({
                                  'cursor-default select-none relative py-2 pl-3 pr-9 rounded-none': true,
                                  'text-gray-500': isDisabled,
                                  'text-white bg-indigo-600': isFocused
                                })
                              }
                              key={option.key}
                              option={option}
                            >
                              {({ isSelected, isFocused }) => (
                                <>
                                  <div className="flex items-center">
                                    <img
                                      src={option.value?.avatar}
                                      alt=""
                                      className="flex-shrink-0 h-6 w-6 rounded-full"
                                    />
                                    <span
                                      className={`${isSelected ? 'font-semibold' : 'font-normal'} ml-3 block truncate`}
                                    >
                                      {option.value?.name}
                                    </span>
                                  </div>
                                  {isSelected ? (
                                    <span
                                      className={`${
                                        isFocused ? 'text-white' : 'text-indigo-600'
                                      } absolute inset-y-0 right-0 flex items-center pr-4`}
                                    >
                                      <FaCheck className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Select.Option>
                          )
                        })}
                      </Select.SectionOptions>
                    </>
                  )}
                </Select.Section>
              ) : (
                <Select.Option
                  key={option.key}
                  option={option}
                  className={({ isDisabled, isFocused }) =>
                    classcat({
                      'cursor-default select-none relative py-2 pl-3 pr-9 rounded-none': true,
                      'text-gray-500': isDisabled,
                      'text-white bg-indigo-600': isFocused
                    })
                  }
                >
                  {({ isSelected, isFocused, option }) => (
                    <>
                      <div className="flex items-center">
                        <img src={option.value.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                        <span className={`${isSelected ? 'font-semibold' : 'font-normal'} ml-3 block truncate`}>
                          {option.value.name}
                        </span>
                      </div>
                      {isSelected ? (
                        <span
                          className={`${
                            isFocused ? 'text-white' : 'text-indigo-600'
                          } absolute inset-y-0 right-0 flex items-center pr-4`}
                        >
                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Select.Option>
              )
            )
          }
        </Select.Options>
      </Select.Popover>
    </Select>
  )
}

const Multi = () => {
  return (
    <MultiSelect items={items}>
      <MultiSelect.Label className="block text-sm font-medium mb-1 text-gray-700">Assigned to</MultiSelect.Label>
      <MultiSelect.PopoverTrigger
        className={({
          isFocusVisible
        }) => `relative w-full bg-white border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none gap-1 flex items-center flex-wrap sm:text-sm ${
          isFocusVisible ? 'ring-indigo-500 border-indigo-500 ring-1' : 'border-gray-300'
        }"
    `}
      >
        {({ selectedItems }) => (
          <>
            {selectedItems.length ? (
              selectedItems.map((item) => (
                <MultiSelect.PopoverItem
                  className="flex items-center gap-1 text-xs px-1 py-1 box-border block rounded bg-indigo-200"
                  key={item.key}
                >
                  {item.value.avatar ? (
                    <img alt={item.value.name} className="flex-shrink-0 h-4 w-4 rounded-full" src={item.value.avatar} />
                  ) : null}
                  {item.value.name}
                  <MultiSelect.PopoverItemClearButton item={item}>
                    <IoMdClose className="h-3 w-3 text-indigo-400" />
                  </MultiSelect.PopoverItemClearButton>
                </MultiSelect.PopoverItem>
              ))
            ) : (
              <span className="block truncate text-gray-400">Select</span>
            )}
            <span className="absolute ml-3 inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FaChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </>
        )}
      </MultiSelect.PopoverTrigger>
      <MultiSelect.Popover>
        <MultiSelect.Options className="z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {({ options }) =>
            options.map((option) =>
              option.type === 'section' ? (
                <MultiSelect.Section key={option.key} section={option}>
                  {({ section }) => (
                    <>
                      {section.rendered && (
                        <MultiSelect.SectionHeading className="text-xs font-bold uppercase text-gray-500 mx-3">
                          {section.rendered}
                        </MultiSelect.SectionHeading>
                      )}
                      <MultiSelect.SectionOptions>
                        {[...section.childNodes].map((option) => {
                          return (
                            <MultiSelect.Option
                              className={({ isDisabled, isFocused }) =>
                                classcat({
                                  'cursor-default MultiSelect-none relative py-2 pl-3 pr-9 rounded-none': true,
                                  'text-gray-500': isDisabled,
                                  'text-white bg-indigo-600': isFocused
                                })
                              }
                              key={option.key}
                              option={option}
                            >
                              {({ isSelected, isFocused }) => (
                                <>
                                  <div className="flex items-center">
                                    <img
                                      src={option.value?.avatar}
                                      alt=""
                                      className="flex-shrink-0 h-6 w-6 rounded-full"
                                    />
                                    <span
                                      className={`${isSelected ? 'font-semibold' : 'font-normal'} ml-3 block truncate`}
                                    >
                                      {option.value?.name}
                                    </span>
                                  </div>
                                  {isSelected ? (
                                    <span
                                      className={`${
                                        isFocused ? 'text-white' : 'text-indigo-600'
                                      } absolute inset-y-0 right-0 flex items-center pr-4`}
                                    >
                                      <FaCheck className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </MultiSelect.Option>
                          )
                        })}
                      </MultiSelect.SectionOptions>
                    </>
                  )}
                </MultiSelect.Section>
              ) : (
                <MultiSelect.Option
                  key={option.key}
                  option={option}
                  className={({ isDisabled, isFocused }) =>
                    classcat({
                      'cursor-default MultiSelect-none relative py-2 pl-3 pr-9 rounded-none': true,
                      'text-gray-500': isDisabled,
                      'text-white bg-indigo-600': isFocused
                    })
                  }
                >
                  {({ isSelected, isFocused, option }) => (
                    <>
                      <div className="flex items-center">
                        <img src={option.value.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                        <span className={`${isSelected ? 'font-semibold' : 'font-normal'} ml-3 block truncate`}>
                          {option.value.name}
                        </span>
                      </div>
                      {isSelected ? (
                        <span
                          className={`${
                            isFocused ? 'text-white' : 'text-indigo-600'
                          } absolute inset-y-0 right-0 flex items-center pr-4`}
                        >
                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </MultiSelect.Option>
              )
            )
          }
        </MultiSelect.Options>
      </MultiSelect.Popover>
    </MultiSelect>
  )
}

export const OptionItems = () => <Template items={items} />
export const SectionItems = () => <Template items={sectionItems} />
export const MultiItems = () => <Multi />
