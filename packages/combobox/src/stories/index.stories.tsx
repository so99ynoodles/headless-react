import classcat from 'classcat'
import React from 'react'
import { FaCheck, FaChevronDown, FaSearch } from 'react-icons/fa'
import { ComboBox, ComboBoxRootProps, MultiComboBox } from '../index'
import { IoMdClose } from 'react-icons/io'

export default {
  title: 'Example/ComboBox',
  component: ComboBox
}

const items = [
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

const AutoComplete = (props: ComboBoxRootProps) => {
  return (
    <ComboBox {...props}>
      <ComboBox.Label className="block text-sm font-medium mb-1 text-gray-700">{props.label}</ComboBox.Label>
      <ComboBox.InputGroup
        className={({ isFocused }) => `
        ${isFocused ? 'ring-indigo-500 border-indigo-500 ring-1' : 'border-gray-300'}
        relative w-full rounded-md shadow-sm text-left cursor-default outline-none flex items-center border
      `}
      >
        {({ selectedItem }) => (
          <>
            <span>
              <FaSearch className="ml-2 h-5 w-5 text-gray-300" aria-hidden="true" />
            </span>
            {selectedItem && selectedItem.value.avatar && (
              <img src={selectedItem.value.avatar} alt="" className="ml-3 flex-shrink-0 h-6 w-6 rounded-full" />
            )}
            <ComboBox.Input
              placeholder="Search..."
              className="relative w-full pl-3 pr-10 py-2 rounded-md outline-none"
            />
            <ComboBox.PopoverTrigger className="absolute ml-3 inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboBox.PopoverTrigger>
          </>
        )}
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ComboBox.Options className="z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {({ options }) =>
            options.map((option) =>
              option.type === 'section' ? (
                <ComboBox.Section key={option.key} section={option}>
                  {({ section }) => (
                    <>
                      {section.rendered && (
                        <ComboBox.SectionHeading className="text-xs font-bold uppercase text-gray-500 mx-3">
                          {section.rendered}
                        </ComboBox.SectionHeading>
                      )}
                      <ComboBox.SectionOptions>
                        {[...section.childNodes].map((option) => {
                          return (
                            <ComboBox.Option
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
                            </ComboBox.Option>
                          )
                        })}
                      </ComboBox.SectionOptions>
                    </>
                  )}
                </ComboBox.Section>
              ) : (
                <ComboBox.Option
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
                        {option.value.avatar && (
                          <img src={option.value.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                        )}
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
                </ComboBox.Option>
              )
            )
          }
        </ComboBox.Options>
      </ComboBox.Popover>
    </ComboBox>
  )
}

export const SingleComboBox = () => <AutoComplete defaultItems={items} label="Assigned to" />

export const MultipleComboBox = () => (
  <MultiComboBox defaultItems={items}>
    <MultiComboBox.Label className="block text-sm font-medium mb-1 text-gray-700">Multiple</MultiComboBox.Label>
    <MultiComboBox.InputGroup
      className={({ isFocused }) => `
        ${isFocused ? 'ring-indigo-500 border-indigo-500 ring-1' : 'border-gray-300'}
        relative w-full rounded-md shadow-sm text-left cursor-default outline-none flex items-center border gap-1 px-10
      `}
    >
      {({ selectedItems }) => (
        <>
          <MultiComboBox.InputGroupItem className="absolute left-2 top-1/2 -translate-y-1/2">
            <FaSearch className="h-5 w-5 text-gray-300" aria-hidden="true" />
          </MultiComboBox.InputGroupItem>
          <MultiComboBox.InputGroupItem className="flex items-center gap-1 grow flex-wrap py-2">
            {selectedItems.length
              ? selectedItems.map((item) => (
                  <MultiComboBox.InputGroupItem
                    className="relative flex items-center gap-1 text-xs pl-1 pr-4 py-1 box-border block rounded bg-indigo-200"
                    key={item.key}
                  >
                    <img src={item.value.avatar} alt="" className="flex-shrink-0 h-4 w-4 rounded-full" />
                    <span className="block truncate">{item.value.name}</span>
                    <MultiComboBox.InputGroupItemClearButton
                      item={item}
                      className="absolute top-1/2 -translate-y-1/2 right-1 flex justify-center items-center"
                    >
                      <IoMdClose className="h-3 w-3 text-gray-400" aria-hidden="true" />
                    </MultiComboBox.InputGroupItemClearButton>
                  </MultiComboBox.InputGroupItem>
              ))
              : null}
            <MultiComboBox.Input placeholder="Search..." className="relative grow rounded-md outline-none" />
          </MultiComboBox.InputGroupItem>
          <MultiComboBox.PopoverTrigger className="absolute ml-3 inset-y-0 right-0 flex items-center pr-2">
            <FaChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </MultiComboBox.PopoverTrigger>
        </>
      )}
    </MultiComboBox.InputGroup>
    <MultiComboBox.Popover>
      <MultiComboBox.Options className="z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        {({ options }) =>
          options.map((option) =>
            option.type === 'section' ? (
              <MultiComboBox.Section key={option.key} section={option}>
                {({ section }) => (
                  <>
                    {section.rendered && (
                      <MultiComboBox.SectionHeading className="text-xs font-bold uppercase text-gray-500 mx-3">
                        {section.rendered}
                      </MultiComboBox.SectionHeading>
                    )}
                    <MultiComboBox.SectionOptions>
                      {[...section.childNodes].map((option) => {
                        return (
                          <MultiComboBox.Option
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
                          </MultiComboBox.Option>
                        )
                      })}
                    </MultiComboBox.SectionOptions>
                  </>
                )}
              </MultiComboBox.Section>
            ) : (
              <MultiComboBox.Option
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
                      {option.value.avatar && (
                        <img src={option.value.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                      )}
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
              </MultiComboBox.Option>
            )
          )
        }
      </MultiComboBox.Options>
    </MultiComboBox.Popover>
  </MultiComboBox>
)
