import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Transition } from "@headlessui/react";

import { useWindowSize } from "./Globals";

import "./Header.css";
import Logo from "../assets/e_logo.svg";
import { useEffect } from "react";

/*
███████████████████████████████████
█─█─█▄─▄▄─██▀▄─██▄─▄▄▀█▄─▄▄─█▄─▄▄▀█
█─▄─██─▄█▀██─▀─███─██─██─▄█▀██─▄─▄█
▀▄▀▄▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▄▀▀▄▄▄▄▄▀▄▄▀▄▄▀
*/

export default function Header() {
  /*
    This is a component function in JSX that contains the HTML markup that represent each graphical element on the webpage

    Parameters
    ----------
    None

    Returns
    -------
    DOM File
        A HTML markup that contains graphical elements
  */
  const size = useWindowSize();

  const location = useLocation();

  const [searchKeyword, setSearchKeyword] = useState();

  const [showMenu, setMenu] = useState(false);
  const [showMenuAlreadyTriggered, setMenuAlreadyTriggered] = useState(false);

  const navigate = useNavigate();

  const movePage = (page) => {
    /*
    This function, when executed, navigates the user to another page smoothly without a flicker

    Parameters
    ----------
    page: String
      The desired URL

    Returns
    -------
    None
    */
    setMenu(false);
    navigate(page);
  };

  // Responsive Menu Design
  useEffect(() => {
    if (size.width > 1024) {
      setMenu(true);
      setMenuAlreadyTriggered(true);
    } else if (showMenuAlreadyTriggered) {
      setMenu(false);
      setMenuAlreadyTriggered(false);
    }
  }, [showMenu, showMenuAlreadyTriggered, size.width]);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-3">
      <button
        onClick={() => {
          movePage("/");
        }}
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img className="w-20 mr-5" src={Logo} alt="logo"></img>

          <span className="font-semibold text-xl tracking-tight">
            ElectronVisualized
          </span>
        </div>
      </button>

      <div className="block lg:hidden">
        <button
          onClick={() => {
            setMenu(!showMenu);
          }}
          className={`flex items-center px-3 py-2 border rounded text-rose-200 border-rose-200 hover:text-white hover:border-white ${
            size.width < 380 ? "mt-5 mr-5" : "mr-5"
          }`}
        >
          {size.width < 380 && <span className="mr-3">Menu</span>}

          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>

            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <Transition
          show={showMenu}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="text-sm lg:flex-grow">
            <button
              onClick={() => {
                movePage("/renderer");
              }}
              className={`block mt-4 lg:inline-block lg:mt-0 mr-4 ${
                location.pathname === "/renderer"
                  ? "text-gray-400"
                  : "text-rose-200"
              } hover:text-white`}
            >
              <span>Renderer</span>
            </button>

            <button
              onClick={() => {
                movePage("/dev");
              }}
              className={`block mt-4 lg:inline-block lg:mt-0 ${
                location.pathname === "/dev" ? "text-gray-400" : "text-rose-200"
              } hover:text-white mr-4`}
            >
              <span>API</span>
            </button>

            <button
              onClick={() => {
                movePage("/docs");
              }}
              className={`block mt-4 lg:inline-block lg:mt-0 ${
                location.pathname === "/docs"
                  ? "text-gray-400"
                  : "text-rose-200"
              } hover:text-white mr-4`}
            >
              <span>Docs</span>
            </button>

            <button
              onClick={() => {
                movePage("/extensions");
              }}
              className={`block mt-4 lg:inline-block lg:mt-0 ${
                location.pathname === "/extensions"
                  ? "text-gray-400"
                  : "text-rose-200"
              } hover:text-white`}
            >
              <span>Extensions</span>
            </button>
          </div>
        </Transition>

        {size.width > 1024 && (
          <form className="justify-self-end m-5 break-all overflow-auto scale-90 sm:scale-100 mb-5 p-3 max-w-fit text-white border border-gray-400 rounded">
            <label>
              <input
                className="bg-transparent"
                type="text"
                onChange={setSearchKeyword}
                placeholder="Search by any keyword..."
              />
            </label>
          </form>
        )}
      </div>
    </nav>
  );
}
