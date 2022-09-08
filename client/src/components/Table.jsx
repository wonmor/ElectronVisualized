import React from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { setGlobalRenderInfo } from "../states/renderInfoSlice";

import { setGlobalSelectedElement } from "../states/selectedElementSlice";

import { Background } from "./Geometries";

import { moleculeDict, atomDict, useWindowSize, isElectron } from "./Globals";

import MetaTag from "./MetaTag";

import { Mount } from "./Transitions";

import "./Table.css";

import "./Background.css";

/*
░█▀▀█ ░█▀▀▀ ░█▀▀█ ▀█▀ ░█▀▀▀█ ░█▀▀▄ ▀█▀ ░█▀▀█ 　 ▀▀█▀▀ ─█▀▀█ ░█▀▀█ ░█─── ░█▀▀▀ 
░█▄▄█ ░█▀▀▀ ░█▄▄▀ ░█─ ░█──░█ ░█─░█ ░█─ ░█─── 　 ─░█── ░█▄▄█ ░█▀▀▄ ░█─── ░█▀▀▀ 
░█─── ░█▄▄▄ ░█─░█ ▄█▄ ░█▄▄▄█ ░█▄▄▀ ▄█▄ ░█▄▄█ 　 ─░█── ░█─░█ ░█▄▄█ ░█▄▄█ ░█▄▄▄
*/

export default function Table() {
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
  const globalSelectedElement = useSelector(
    (state) => state.selectedElement.globalSelectedElement
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const size = useWindowSize();

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
    navigate(page);
  };

  const resetAllPreviousRenders = () => {
    /*
    Removes all previous renders prior to a new render

    Parameters
    ----------
    None

    Returns
    -------
    None
    */
    dispatch(
      setGlobalRenderInfo({
        animation: false,
        disableButton: false,
        preRender: true,
        serverError: false,
        statusText: "Rendering in Progress...",
      })
    );
  };

  const appendNewRender = (element, name, type, description, electronConfig) => {
    /*
    This function clears the previous render
    and append a new information to Redux global state

    Parameters
    ----------
    None
    
    Returns
    -------
    None
    */
    dispatch(
      setGlobalSelectedElement({
        element: element,
        name: name,
        type: type,
        description: description,
        electronConfig: electronConfig
      })
    );
    resetAllPreviousRenders();
  };

  const displayPeriodicTable = () => {
    /*
    This function displays the periodic table on the website

    Parameters
    ----------
    page: String
      The desired URL
    
    Returns
    -------
    DOM File
        A HTML markup that contains graphical elements
    */
    return (
      <>
        <div
          className={`m-10 scale-75 sm:scale-100 ${size.width < 350 ? "scale-50" : null
            }`}
          role="region"
          tabindex="0"
        >
          <ol className="scale-90 sm:scale-100" id="periodic-table">
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.H);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer/${globalSelectedElement.element}`);
              }}
              title="Hydrogen"
            >
              H
            </li>
            <li title="Helium">He</li>
            <li onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Li);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer/${globalSelectedElement.element}`);
              }}
              title="Lithium">Li</li>
            <li onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Be);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer/${globalSelectedElement.element}`);
              }}
              title="Beryllium">Be</li>
            <li onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.B);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer/${globalSelectedElement.element}`);
              }}
              title="Boron">B</li>
            <li title="Carbon">C</li>
            <li title="Nitrogen">N</li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.O);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer/${globalSelectedElement.element}`);
              }}
              title="Oxygen"
            >
              O
            </li>
            <li title="Fluorine">F</li>
            <li title="Neon">Ne</li>
            <li onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Na);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer/${globalSelectedElement.element}`);
              }}
              title="Sodium">Na</li>
            <li title="Magnesium">Mg</li>
            <li title="Aluminium">Al</li>
            <li title="Silicon">Si</li>
            <li title="Phosphorus">P</li>
            <li title="Sulfur">S</li>
            <li title="Chlorine">Cl</li>
            <li title="Argon">Ar</li>
            <li onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.K);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer/${globalSelectedElement.element}`);
              }} title="Potassium">K</li>
            <li title="Calcium">Ca</li>
            <li title="Scandium">Sc</li>
            <li title="Titanium">Ti</li>
            <li title="Vanadium">V</li>
            <li title="Chromium">Cr</li>
            <li title="Manganese">Mn</li>
            <li title="Iron">Fe</li>
            <li title="Cobalt">Co</li>
            <li title="Nickel">Ni</li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Cu);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer/${globalSelectedElement.element}`);
              }}
              title="Copper"
            >
              Cu
            </li>
            <li title="Zinc">Zn</li>
            <li title="Gallium">Ga</li>
            <li title="Germanium">Ge</li>
            <li title="Arsenic">As</li>
            <li title="Selenium">Se</li>
            <li title="Bromine">Br</li>
            <li title="Krypton">Kr</li>
            <li title="Rubidium">Rb</li>
            <li title="Strontium">Sr</li>
            <li title="Yttrium">Y</li>
            <li title="Zirconium">Zr</li>
            <li title="Niobium">Nb</li>
            <li title="Molybdenum">Mo</li>
            <li title="Technetium">Tc</li>
            <li title="Ruthenium">Ru</li>
            <li title="Rhodium">Rh</li>
            <li title="Palladium">Pd</li>
            <li title="Silver">Ag</li>
            <li title="Cadmium">Cd</li>
            <li title="Indium">In</li>
            <li title="Tin">Sn</li>
            <li title="Antimony">Sb</li>
            <li title="Tellurium">Te</li>
            <li title="Iodine">I</li>
            <li title="Xenon">Xe</li>
            <li title="Caesium">Cs</li>
            <li title="Barium">Ba</li>
            <li title="Lanthanum">La</li>
            <li title="Cerium">Ce</li>
            <li title="Praseodymium">Pr</li>
            <li title="Neodymium">Nd</li>
            <li title="Promethium">Pm</li>
            <li title="Samarium">Sm</li>
            <li title="Europium">Eu</li>
            <li title="Gadolinium">Gd</li>
            <li title="Terbium">Tb</li>
            <li title="Dysprosium">Dy</li>
            <li title="Holmium">Ho</li>
            <li title="Erbium">Er</li>
            <li title="Thulium">Tm</li>
            <li title="Ytterbium">Yb</li>
            <li title="Lutetium">Lu</li>
            <li title="Hafnium">Hf</li>
            <li title="Tantalum">Ta</li>
            <li title="Tungsten">W</li>
            <li title="Rhenium">Re</li>
            <li title="Osmium">Os</li>
            <li title="Iridium">Ir</li>
            <li title="Platinum">Pt</li>
            <li title="Gold">Au</li>
            <li title="Mercury">Hg</li>
            <li title="Thallium">Tl</li>
            <li title="Lead">Pb</li>
            <li title="Bismuth">Bi</li>
            <li title="Polonium">Po</li>
            <li title="Astatine">At</li>
            <li title="Radon">Rn</li>
            <li title="Francium">Fr</li>
            <li title="Radium">Ra</li>
            <li title="Actinium">Ac</li>
            <li title="Thorium">Th</li>
            <li title="Protactinium">Pa</li>
            <li title="Uranium">U</li>
            <li title="Neptunium">Np</li>
            <li title="Plutonium">Pu</li>
            <li title="Americium">Am</li>
            <li title="Curium">Cm</li>
            <li title="Berkelium">Bk</li>
            <li title="Californium">Cf</li>
            <li title="Einsteinium">Es</li>
            <li title="Fermium">Fm</li>
            <li title="Mendelevium">Md</li>
            <li title="Nobelium">No</li>
            <li title="Lawrencium">Lr</li>
            <li title="Rutherfordium">Rf</li>
            <li title="Dubnium">Db</li>
            <li title="Seaborgium">Sg</li>
            <li title="Bohrium">Bh</li>
            <li title="Hassium">Hs</li>
            <li title="Meitnerium">Mt</li>
            <li title="Darmstadtium">Ds</li>
            <li title="Roentgenium">Rg</li>
            <li title="Copernicium">Cn</li>
            <li title="Nihonium">Nh</li>
            <li title="Flerovium">Fl</li>
            <li title="Moscovium">Mc</li>
            <li title="Livermorium">Lv</li>
            <li title="Tennessine">Ts</li>
            <li title="Oganesson">Og</li>
          </ol>
        </div>
      </>
    );
  };

  return (
    <>
      <MetaTag title={"ElectronVisualized"}
        description={"View Electron Density, Molecular and Atomic Orbitals"}
        keywords={"electron, electron density, chemistry, computational chemistry"}
        imgsrc={"cover.png"}
        url={"https://electronvisual.org"} />

      <div className="bg-gray-700" style={{ "min-height": "100vh" }}>
        <div className="text-white text-center p-5 text-gray-400">
          <Mount content={<><h1
            className={`scale-75 sm:scale-100 ${size.width < 350 ? "truncate" : null
              }`}
          >
            Visualizing{" "}
            <span className="text-rose-200">
              Quantum Mechanics
            </span>
            . Reimagined.
          </h1>

            <h2 className="sm:mt-5 mb-2 pb-3 pl-5 pr-5 text-gray-400">
              Electron Density with the help of{" "}
              {globalSelectedElement.type === "Molecule" ? (
                <span className="text-white">Density Functional Theory</span>
              ) : (
                <span className="text-white">Spherical Harmonics</span>
              )}
              .
            </h2>
            {!isElectron() && (
              <div className="flex flex-col md:flex-row justify-center items-center">
                <div
                  type="button"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-white bg-[#050708]/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                >
                  <img className="mr-3" style={{ width: "15px" }} src="web.svg" alt="web" />
                  <span>
                    Runs Natively on the Web
                  </span>
                </div>

                <a
                  href="https://apps.apple.com/us/app/electronvisualized/id1631246652?mt=12"
                  type="button"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                >
                  <svg
                    className="w-5 h-5 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="apple"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                    ></path>
                  </svg>
                  <span>
                    Now Available on the Mac App Store
                  </span>
                </a>
              </div>
            )}
          </>} show />

          <div className="bg-gray-600 rounded pb-2">
            <h1
              className={`scale-90 sm:scale-100 mt-5 pt-5 pl-5 pr-5 text-blue-200 ${size.width < 350 ? "truncate ..." : null
                }`}
            >
              Molecules
            </h1>

            <p className="p-5 text-gray-400">
              Visualize the <b>molecular orbital</b> structure, all generated
              using DFT. Now available on the Web and Desktop.
            </p>

            <div className="ml-5 mr-5">
              {Object.keys(moleculeDict).map((key, index) => {
                const value = moleculeDict[key];

                return (
                  <button
                    onMouseDown={() => {
                      // This code runs first...
                      appendNewRender(key, value[0], "Molecule", value[1]);
                    }}
                    onClick={() => {
                      // This code runs after a global state change...
                      movePage(`/renderer/${globalSelectedElement["element"]}`);
                    }}
                    className="mb-2 mr-2 sm:mt-0 bg-transparent hover:bg-blue-500 text-white hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                    type="button"
                  >
                    <span>{value[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <h1 className="scale-90 sm:scale-100 mt-5 pl-5 pr-5 text-gray-400">
            Atoms
          </h1>

          <p className="p-5 text-gray-400 border-b border-gray-500">
            Using spherical harmonics, view the <b>atomic orbital</b> structure
            of your choice. Colours are displayed based upon elements' actual properties in the flame test.
          </p>

          {displayPeriodicTable()}

          <h2 className="p-5 text-gray-400 border-t border-gray-500">
            "Compared to more traditional plane wave or localized basis set
            approaches,{" "}
            <span className="text-white">Projector Augmented-wave</span> method
            offers <span className="text-white">several advantages</span>, most
            notably good computational scalability and systematic convergence
            properties."
          </h2>

          <p className="p-5 text-gray-400">
            — A public testimonial by{" "}
            <span className="text-white">J Enkovaara et al. 2010</span> on their
            topical review{" "}
            <a
              href="https://iopscience.iop.org/article/10.1088/0953-8984/22/25/253202"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-200"
            >
              <i>
                Electronic structure calculations with <b>GPAW</b>
              </i>
            </a>
            .
          </p>
        </div>
        <Background />
      </div>
    </>
  );
}
