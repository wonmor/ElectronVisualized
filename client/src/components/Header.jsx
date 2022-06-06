import { useState } from "react";
import useWindowSize from "../useWindowsSize";

import "./Header.css";
import Logo from "../assets/e_logo.svg";

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

  const [showMenu, setMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-rose-500 p-3">

      <a href="/">
        <div className="flex items-center flex-shrink-0 text-white mr-6">

          <img className="w-20 mr-5" src={Logo} alt="logo"></img>
          
          <span className="font-semibold text-xl tracking-tight">
            ElectronVisualized
          </span>

        </div>
      </a>

      <div className="block lg:hidden">

        <button
          onClick={() => {setMenu(!showMenu)}}
          className="flex items-center px-3 py-2 border rounded text-rose-200 border-rose-400 hover:text-white hover:border-white"
        >
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

      {(showMenu || size.width > 1000) && (

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            
            <a
              href="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-rose-200 hover:text-white mr-4"
            >
              Table
            </a>

            <a
              href="/molecule"
              className="block mt-4 lg:inline-block lg:mt-0 text-rose-200 hover:text-white mr-4"
            >
              Molecule
            </a>

            <a
              href="/api"
              className="block mt-4 lg:inline-block lg:mt-0 text-rose-200 hover:text-white mr-4"
            >
              API
            </a>

            <a
              href="/docs"
              className="block mt-4 lg:inline-block lg:mt-0 text-rose-200 hover:text-white"
            >
              Docs
            </a>

          </div>
        </div>

      )}
    </nav>
  );
}
