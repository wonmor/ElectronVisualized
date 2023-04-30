import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { useWindowSize, isElectron } from "./Globals";

import "./Header.css";

import Logo from "../assets/e_logo.svg";
import firebase from "firebase/compat/app";

/*
███████████████████████████████████
█─█─█▄─▄▄─██▀▄─██▄─▄▄▀█▄─▄▄─█▄─▄▄▀█
█─▄─██─▄█▀██─▀─███─██─██─▄█▀██─▄─▄█
▀▄▀▄▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▄▀▀▄▄▄▄▄▀▄▄▀▄▄▀
*/

const isEmpty = (str) => {
  return !str.trim().length;
};

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
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      setLogged(!!user);
    });

    return () => {
      unregisterAuthObserver();
    };
  }, []);

  const menuText = logged ? 'Member' : 'Sign in';

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
    <nav className="flex items-center justify-between flex-wrap bg-transparent p-3">
      <button
        onClick={() => {
          movePage("/");
        }}
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img className="w-20 mr-5" src={Logo} alt="logo"></img>

          <span className="text-xl tracking-tight">{"ElectronVisualized"}</span>
        </div>
      </button>

      {isElectron() && (
        <button
          onClick={() => {
            movePage("/download");
          }}
          style={{ marginLeft: "auto", marginTop: "auto", marginBottom: "auto", alignSelf: "center" }}
          className={`block mt-4 lg:inline-block lg:mt-0 mr-4 text-rose-200 hover:text-white`}
        >
          <span>Available on iPhone and iPad</span>
        </button>
      )}

      <div className="flex flex-row mt-4 sm:mt-0 lg:hidden">
        {!isElectron() && (
          <>
            {!logged ? (
              <button
                onClick={() => {
                  movePage("/login");
                }}
                className={`flex items-center px-3 py-2 border rounded text-rose-200 border-rose-200 hover:text-white hover:border-white ${
                  size.width < 380 ? "mt-5 mr-2" : "mr-2"
                }`}
              >
                <span>Sign in</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  movePage("/membership");
                }}
                className={`flex items-center px-3 py-2 border rounded text-rose-200 border-rose-200 hover:text-white hover:border-white ${
                  size.width < 380 ? "mt-5 mr-2" : "mr-2"
                }`}
              >
                <span>Member</span>
              </button>
            )}
          </>
        )}

        {!isElectron() && (
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
        )}
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
            {!isElectron() && (
              <>
                {!logged ? (
                  <button
                    onClick={() => {
                      movePage("/login");
                    }}
                    className={`items-center px-3 py-2 border rounded text-rose-200 border-rose-200 hover:text-white hover:border-white hidden lg:inline-block ${
                      size.width < 380 ? "mt-5 mr-5" : "mr-5"
                    }`}
                  >
                    <span>Sign in</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      movePage("/membership");
                    }}
                    className={`items-center px-3 py-2 border rounded text-rose-200 border-rose-200 hover:text-white hover:border-white hidden lg:inline-block ${
                      size.width < 380 ? "mt-5 mr-5" : "mr-5"
                    }`}
                  >
                    <span>Member</span>
                  </button>
                )}
              </>
            )}

            {!isElectron() && (
              <>
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
                  <span>Spotlight</span>
                </button>
                {/* {/* 
            <button
              onClick={() => {
                movePage("/dev");
              }}
              className={`block mt-4 lg:inline-block lg:mt-0 ${
                location.pathname === "/dev" ? "text-gray-400" : "text-rose-200"
              } hover:text-white mr-4`}
            >
              <span>API</span>
            </button> */}

            <button
              onClick={() => {
                movePage("/download-web");
              }}
              className={`block mt-4 lg:inline-block lg:mt-0 ${
                location.pathname === "/download-web"
                  ? "text-gray-400"
                  : "text-rose-200"
              } hover:text-white`}
            >
              <span>Download</span>
            </button>
              </>
            )}
          </div>
        </Transition>
      </div>
    </nav>
  );
}
