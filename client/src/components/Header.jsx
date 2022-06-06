import { useState } from 'react';
import useWindowSize from '../useWindowsSize';

// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from '../states/counterSlice'

import "./Header.css";
import Logo from "../assets/e_logo.svg";

// For React-Redux state management library: https://react-redux.js.org/tutorials/quick-start

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

  // const count = useSelector((state) => state.counter.value)
  // const dispatch = useDispatch()
  const size = useWindowSize(); 

  const [isActive, setActive] = useState(false);

  const showResponsiveMenu = () => {
    setActive(!isActive); 
   };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-rose-500 p-3">
      <a href="/">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
      <img className="w-20 mr-5" src={Logo} alt="logo"></img>
        <span className="font-semibold text-xl tracking-tight">ElectronVisualized</span>
      </div>
      </a>
      <div className="block lg:hidden">
        <button onClick={showResponsiveMenu} className="flex items-center px-3 py-2 border rounded text-rose-200 border-rose-400 hover:text-white hover:border-white">
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
      {(isActive || size.width > 1000) && 
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-rose-200 hover:text-white mr-4"
          >
            Table
          </a>
          <a
            href="/element"
            className="block mt-4 lg:inline-block lg:mt-0 text-rose-200 hover:text-white mr-4"
          >
            Element
          </a>
          <a
            href="/api"
            className="block mt-4 lg:inline-block lg:mt-0 text-rose-200 hover:text-white"
          >
            API
          </a>
        </div>
      </div>
    }
    </nav>
  );
}
