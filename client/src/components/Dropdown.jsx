import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { moleculeDict } from "./Globals";

/*
████████████████████████████████████████████████████████████████████████████████████
█▄─▄▄▀█▄─▄▄▀█─▄▄─█▄─▄▄─█▄─▄▄▀█─▄▄─█▄─█▀▀▀█─▄█▄─▀█▄─▄███▄─▀█▀─▄█▄─▄▄─█▄─▀█▄─▄█▄─██─▄█
██─██─██─▄─▄█─██─██─▄▄▄██─██─█─██─██─█─█─█─███─█▄▀─█████─█▄█─███─▄█▀██─█▄▀─███─██─██
▀▄▄▄▄▀▀▄▄▀▄▄▀▄▄▄▄▀▄▄▄▀▀▀▄▄▄▄▀▀▄▄▄▄▀▀▄▄▄▀▄▄▄▀▀▄▄▄▀▀▄▄▀▀▀▄▄▄▀▄▄▄▀▄▄▄▄▄▀▄▄▄▀▀▄▄▀▀▄▄▄▄▀▀
*/

const classNames = (...classes) => {
  /*
  This function handles all the CSS className properties that will be linked with the DOM element

  Parameters
  ----------
  None

  Returns
  -------
  String
    Contains the names of the classes
  */
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown() {
  /*
  This is a component function in JSX that handles all the dropdown menu-related events

  Parameters
  ----------
  None

  Returns
  -------
  DOM File
    Contains HTML properties that each represent the graphic element on the website
  */
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>

        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span className="font-bold">
            {moleculeDict["H2"][0]}
          </span>
          
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />

        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>

              {({ active }) => (
                <a
                  href="#api-url"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {moleculeDict["H2"][0]}
                </a>
              )}

            </Menu.Item>
            
            {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Locations
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Number of Atoms
                </a>
              )}
            </Menu.Item> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
