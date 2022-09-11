import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { Transition } from "@headlessui/react";

import { FaHome } from 'react-icons/fa';

import { useWindowSize, isElectron } from "./Globals";

import "./Header.css";

import Logo from "../assets/e_logo.svg";

/*
███████████████████████████████████
█─█─█▄─▄▄─██▀▄─██▄─▄▄▀█▄─▄▄─█▄─▄▄▀█
█─▄─██─▄█▀██─▀─███─██─██─▄█▀██─▄─▄█
▀▄▀▄▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▄▀▀▄▄▄▄▄▀▄▄▀▄▄▀
*/

const isEmpty = (str) => {
  return !str.trim().length;
}

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

  const [localSearchKeyword, setLocalSearchKeyword] = useState("");

  const [showMenu, setMenu] = useState(false);
  const [showMenuAlreadyTriggered, setMenuAlreadyTriggered] = useState(false);
  const [showDropDown, setDropDown] = useState(false);

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

  const moveToSearchResults = (keyword) => {
    if (!isEmpty(keyword)) {
      movePage('/search');
    }
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

          <span className="text-xl tracking-tight">
            ElectronVisualized {isElectron() && (<span className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">Studio</span>)}
          </span>
        </div>
      </button>

      <div className="flex flex-row mt-4 sm:mt-0 lg:hidden">
        <button
          onClick={() => {
            movePage("/");
          }}
          className={`flex items-center px-3 py-2 border rounded text-rose-200 border-rose-200 hover:text-white hover:border-white ${size.width < 380 ? "mt-5 mr-2" : "mr-2"
            }`}
        >
          {size.width < 380 && <span className="mr-3">Home</span>}
          
          <FaHome />
        </button>

        <button
          onClick={() => {
            setMenu(!showMenu);
          }}
          className={`flex items-center px-3 py-2 border rounded text-rose-200 border-rose-200 hover:text-white hover:border-white ${size.width < 380 ? "mt-5 mr-5" : "mr-5"
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
      <div className="w-full block flex lg:items-center lg:w-auto">
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
            movePage('/');
          }}
          className={`items-center px-3 py-2 border rounded text-rose-200 border-rose-200 hover:text-white hover:border-white hidden lg:inline-block ${size.width < 380 ? "mt-5 mr-5" : "mr-5"
            }`}
        >
          {size.width < 380 && <span className="mr-3">Menu</span>}

          <FaHome />
        </button>
        
            <button
              onClick={() => {
                movePage("/renderer");
              }}
              className={`block mt-4 lg:inline-block lg:mt-0 mr-4 ${location.pathname === "/renderer"
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
              className={`block mt-4 lg:inline-block lg:mt-0 ${location.pathname === "/dev" ? "text-gray-400" : "text-rose-200"
                } hover:text-white mr-4`}
            >
              <span>API</span>
            </button>

            <button
              onClick={() => {
                movePage("/docs");
              }}
              className={`block mt-4 lg:inline-block lg:mt-0 ${location.pathname === "/docs"
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
              className={`block mt-4 lg:inline-block lg:mt-0 ${location.pathname === "/extensions"
                  ? "text-gray-400"
                  : "text-rose-200"
                } hover:text-white`}
            >
              <span>Extensions</span>
            </button>
          </div>
        </Transition>

        {/* Reponsive Search Bar... */}
        {size.width > 1024 && (
          <div className="flex flex-cols">
            <form
              onClick={() => setDropDown(true)}
              onMouseLeave={() => setDropDown(false)}
              onSubmit={(e) => {
                e.preventDefault(); // Else the page will be reloaded which is the default DOM behaviour in forms and its submit button...
                moveToSearchResults(localSearchKeyword);
              }}
              className="flex flex-cols justify-self-end m-5 overflow-auto scale-90 sm:scale-100 mb-5 p-3 max-w-fit text-white border border-gray-400 rounded"
            >
              <label>
                <span>
                  <input
                    className="bg-transparent truncate ..."
                    type="text"
                    onChange={setLocalSearchKeyword}
                    placeholder="Type any keyword..."
                  />
                </span>
              </label>
              <button className="ml-3" type="submit">
                <span>Search</span>
              </button>
            </form>
            <div className="absolute mt-20 mr-10" style={{ "z-index": "10" }}>
              <Transition
                show={showDropDown}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-200"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="bg-black text-white p-5 rounded">
                  <h3 className="mb-5">
                    I can help you with whatever you need.
                  </h3>
                  <p>
                    <i className="font-semibold">Try searching "H2O"...</i>
                  </p>
                </div>
              </Transition>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
