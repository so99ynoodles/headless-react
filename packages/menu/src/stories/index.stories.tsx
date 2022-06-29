import React from 'react'
import classcat from 'classcat'
import { FaArchive, FaCopy, FaDownload, FaEdit, FaTrash } from 'react-icons/fa'
import { Menu } from '../'

export default {
  title: 'Example/Menu',
  component: Menu
}

export const Default = () => (
  <Menu className="relative inline-block text-left" onAction={alert}>
    <Menu.Button
      className={({ isHovered }) =>
        classcat({
          'inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white': true,
          'bg-indigo-500': isHovered,
          'bg-indigo-600': !isHovered
        })
      }
    >
      Open
    </Menu.Button>
    <Menu.Overlay className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <Menu.Popup className="p-2 flex flex-col gap-1">
        <Menu.Section key="first" title="first">
          <Menu.Item
            className={({ isDisabled, isFocused }) =>
              classcat({
                'flex items-center cursor-default select-none relative py-2 pl-3 pr-9 rounded-none': true,
                'text-gray-500': isDisabled,
                'text-white bg-indigo-600': isFocused
              })
            }
            textValue="copy"
            key="copy"
          >
            <FaEdit className="mr-2 h-5 w-5 text-indigo-400 hover:text-indigo-100" />
            Edit
          </Menu.Item>
          <Menu.Item
            className={({ isDisabled, isFocused }) =>
              classcat({
                'flex items-center cursor-default select-none relative py-2 pl-3 pr-9 rounded-none': true,
                'text-gray-500': isDisabled,
                'text-white bg-indigo-600': isFocused
              })
            }
            textValue="cut"
            key="cut"
          >
            <FaCopy className="mr-2 h-5 w-5 text-indigo-400 hover:text-indigo-100" />
            Copy
          </Menu.Item>
          <Menu.Item
            className={({ isDisabled, isFocused }) =>
              classcat({
                'flex items-center cursor-default select-none relative py-2 pl-3 pr-9 rounded-none': true,
                'text-gray-500': isDisabled,
                'text-white bg-indigo-600': isFocused
              })
            }
            textValue="paste"
            key="paste"
          >
            <FaArchive className="mr-2 h-5 w-5 text-indigo-400 hover:text-indigo-100" />
            Archive
          </Menu.Item>
        </Menu.Section>
        <Menu.Section key="second" title="second">
          <Menu.Separator className="my-2 border-t" />
          <Menu.Item
            className={({ isDisabled, isFocused }) =>
              classcat({
                'flex items-center cursor-default select-none relative py-2 pl-3 pr-9 rounded-none': true,
                'text-gray-500': isDisabled,
                'text-white bg-indigo-600': isFocused
              })
            }
            textValue="download"
            key="download"
          >
            <FaDownload className="mr-2 h-5 w-5 text-indigo-400 hover:text-indigo-100" />
            Download
          </Menu.Item>
        </Menu.Section>
        <Menu.Section key="third" title="third">
          <Menu.Separator className="my-2 border-t" />
          <Menu.Item
            className={({ isDisabled, isFocused }) =>
              classcat({
                'flex items-center cursor-default select-none relative py-2 pl-3 pr-9 rounded-none': true,
                'text-gray-500': isDisabled,
                'text-white bg-indigo-600': isFocused
              })
            }
            textValue="delete"
            key="delete"
          >
            <FaTrash className="mr-2 h-5 w-5 text-indigo-400 hover:text-indigo-100" />
            Delete
          </Menu.Item>
        </Menu.Section>
      </Menu.Popup>
    </Menu.Overlay>
  </Menu>
)
