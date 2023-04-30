import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGlobalRenderInfo } from "../states/renderInfoSlice";
import { setGlobalSelectedElement } from "../states/selectedElementSlice";
import { Background } from "./Geometries";
import { moleculeDict, atomDict, useWindowSize, isElectron } from "./Globals";

import LazyLoad from "react-lazyload";
import classNames from "classnames";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MetaTag from "./MetaTag";
import quantumNumbers from "../assets/quantum_num.json";

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const size = useWindowSize();

  const [selectedItem, setSelectedItem] = useState("none");

  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");

  const [noResultsFound, setNoResultsFound] = useState(false);

  const OptionDisplay = () => (
    <section className="bg-transparent py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        <LazyLoad height={400} once>
          <div
            className="relative bg-black px-4 overflow-hidden shadow rounded-lg text-white"
            style={{
              height: "400px", // Set the height to the desired value
            }}
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50" />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
              <h3 className="text-lg leading-6 font-medium z-40">
                A Beginner's Guide
              </h3>
              <div className="mt-4 flex items-baseline justify-center">
                <span className="text-5xl font-thin z-40">
                  <span className="underline decoration-1 underline-offset-8 font-thin">
                    Explore
                  </span>
                  <br />
                  Atomic
                  <br />
                  Orbitals
                </span>
              </div>
              <p className="mt-4 text-sm z-40">
                Discover the Secrets of the Quantum Realm
              </p>
              <button
                id="checkout-and-portal-button"
                onClick={() => {
                  setSelectedItem("atom");
                }}
                className="z-40 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
              >
                <span>Navigate</span>
              </button>
            </div>
            <img
              className="absolute top-0 left-0 right-0 bottom-0 object-contain object-center w-full h-full"
              src="atomic-orbital.png"
              alt="Atomic Orbital"
              style={{ filter: "brightness(30%)" }}
            />
          </div>
        </LazyLoad>

        <LazyLoad height={400} once>
          <div
            className="relative bg-gray-800 px-4 overflow-hidden shadow rounded-lg text-white"
            style={{
              height: "400px", // Set the height to the desired value
            }}
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50" />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
              <h3 class="text-lg leading-6 font-medium z-40">
                A Comprehensive Guide
              </h3>
              <div class="mt-4 flex items-baseline justify-center">
                <span class="text-5xl font-thin z-40">
                  Molecular
                  <br />
                  <span className="underline decoration-1 underline-offset-8 font-thin">
                    Orbital
                  </span>
                  <br />
                  Theory
                </span>
              </div>
              <p class="mt-4 text-sm z-40">Friendly Hugs Between Atoms</p>
              <button
                id="checkout-and-portal-button"
                onClick={() => {
                  setSelectedItem("molecule");
                }}
                className="z-40 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
              >
                <span>Navigate</span>
              </button>
            </div>
            <img
              className="absolute top-0 left-0 right-0 bottom-0 object-contain object-center w-full h-full"
              src="molecular-orbital.png"
              alt="Moleecular Orbital"
              style={{ filter: "brightness(30%)" }}
            />
          </div>
        </LazyLoad>
      </div>
    </section>
  );

  useEffect(() => {
    if (digit1.length === 0 || digit2.length === 0 || digit3.length === 0) {
      setNoResultsFound(false);
    }
  }, [digit1, digit2, digit3]);

  const handleDigitChange = (event, digitSetter) => {
    const value = event.target.value;
    if (!isNaN(value) && value.length <= 1) {
      digitSetter(value);
    } else {
      digitSetter(0); // or any other default value that you want
    }
  };

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

  const appendNewRender = (
    element,
    name,
    type,
    description,
    electronConfig
  ) => {
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
        electronConfig: electronConfig,
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
          className={`pt-10 m-10 scale-75 sm:scale-100 ${
            size.width < 350 ? "scale-50" : null
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
                movePage(`/renderer`);
              }}
              title="Hydrogen"
            >
              H
            </li>
            <li title="Helium">He</li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Li);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Lithium"
            >
              Li
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Be);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Beryllium"
            >
              Be
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.B);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Boron"
            >
              B
            </li>
            <li title="Carbon">C</li>
            <li title="Nitrogen">N</li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.O);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Oxygen"
            >
              O
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.F);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Fluorine"
            >
              F
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Ne);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Neon"
            >
              Ne
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Na);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Sodium"
            >
              Na
            </li>
            <li title="Magnesium">Mg</li>
            <li title="Aluminium">Al</li>
            <li title="Silicon">Si</li>
            <li title="Phosphorus">P</li>
            <li title="Sulfur">S</li>
            <li title="Chlorine">Cl</li>
            <li title="Argon">Ar</li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.K);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Potassium"
            >
              K
            </li>
            <li title="Calcium">Ca</li>
            <li title="Scandium">Sc</li>
            <li title="Titanium">Ti</li>
            <li title="Vanadium">V</li>
            <li title="Chromium">Cr</li>
            <li title="Manganese">Mn</li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Fe);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Iron"
            >
              Fe
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Co);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Cobalt"
            >
              Co
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Ni);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Nickel"
            >
              Ni
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Cu);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Copper"
            >
              Cu
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Zn);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Zinc"
            >
              Zn
            </li>
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
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Pd);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Palladium"
            >
              Pd
            </li>
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
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Ce);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Cerium"
            >
              Ce
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Pr);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Praseodymium"
            >
              Pr
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Nd);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Neodymium"
            >
              Nd
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Pm);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Promethium"
            >
              Pm
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Sm);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Samarium"
            >
              Sm
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Eu);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Europium"
            >
              Eu
            </li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(...atomDict.Gd);
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer`);
              }}
              title="Gadolinium"
            >
              Gd
            </li>
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
      <MetaTag
        title={"ElectronVisualized"}
        description={"View Electron Density, Molecular and Atomic Orbitals"}
        keywords={
          "electron, electron density, chemistry, computational chemistry"
        }
        imgsrc={"cover.png"}
        url={"https://electronvisual.org"}
      />

      <div
        className={`overflow-auto pb-40`}
        style={{ minHeight: "100vh", width: "-webkit-fill-available" }}
      >
        <div className="text-white text-center p-5 text-gray-400">

            <h1
              className={`scale-75 sm:scale-100 mb-5 font-thin ${
                size.width < 350 ? "truncate" : null
              }`}
            >
              Visualizing{" "}
              <span className="font-thin text-rose-200">Quantum Mechanics</span>.
              Reimagined.
            </h1>

            {!isElectron() && (
              <div className="flex flex-col md:flex-row justify-center items-center">
                <a
                  href="https://apps.apple.com/us/app/electronify/id6446613861"
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
                  <span>App Store</span>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.johnseong.electronify"
                  type="button"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-black bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-300 dark:hover:bg-gray-100 mr-2 mb-2"
                >
                  <img
                    src="google_play.svg"
                    alt="google_play_icon"
                    className="w-5 h-5 mr-2 -ml-1"
                  />
                  <span>Google Play</span>
                </a>
              </div>
            )}
   

          {selectedItem === "none" && <OptionDisplay />}

          {(selectedItem === "atom" || selectedItem === "molecule") && (
            <button
              className="m-5 bg-transparent hover:bg-blue-500 text-white hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
              type="button"
              onClick={() => {
                setSelectedItem("none");
              }}
            >
              <KeyboardBackspaceIcon />
              <span className="ml-2">Back</span>
            </button>
          )}

          {selectedItem === "molecule" && (
            <>
              <div className="border-2 border-gray-600 rounded-xl pb-2 m-auto" style={{ maxWidth: "1200px" }}>
                <h1
                  className={`scale-90 sm:scale-100 pt-5 font-thin text-white ${
                    size.width < 350 ? "truncate ..." : null
                  }`}
                >
                  Molecules
                </h1>

                <div className="my-5 mt-5">
                  {Object.keys(moleculeDict)
                    .slice(3)
                    .map((key, index) => {
                      const value = moleculeDict[key];

                      return (
                        <button
                          onMouseDown={() => {
                            // This code runs first...
                            appendNewRender(
                              key,
                              value[0],
                              "Molecule",
                              value[1]
                            );
                          }}
                          onClick={() => {
                            // This code runs after a global state change...
                            movePage(`/renderer`);
                          }}
                          className="mb-2 mr-2 sm:mt-0 bg-transparent hover:bg-blue-500 text-white hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                          type="button"
                          key={key}
                        >
                          <span className="font-bold">{key}</span>{" "}
                          <span>{value[0]}</span>
                        </button>
                      );
                    })}
                </div>

                <div className="flex flex-col ml-5 mr-5 justify-center items-center">
                  <div
                    className="border-2 border-green-200 rounded-md p-3 m-5"
                    style={{ maxWidth: "500px" }}
                  >
                    <h2 className="text-green-200 font-thin mb-3">Organic</h2>
                    {Object.keys(moleculeDict)
                      .slice(0, 3)
                      .map((key, index) => {
                        const value = moleculeDict[key];

                        return (
                          <button
                            onMouseDown={() => {
                              // This code runs first...
                              appendNewRender(
                                key,
                                value[0],
                                "Molecule",
                                value[1]
                              );
                            }}
                            onClick={() => {
                              // This code runs after a global state change...
                              movePage(`/renderer`);
                            }}
                            className="mb-2 mr-2 sm:mt-0 bg-transparent hover:bg-green-200 text-green-200 hover:text-black py-2 px-4 border border-green-200 hover:border-transparent rounded"
                            type="button"
                            key={key}
                          >
                            <span className="font-bold">{key}</span>{" "}
                            <span>{value[0]}</span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedItem === "atom" && (
            <>
              <div className="border-2 border-gray-600 rounded-xl p-5 m-auto" style={{ maxWidth: "1200px" }}>
                <h1 className="scale-90 sm:scale-100 px-5 font-thin text-white">
                  Atoms
                </h1>

                <div className="mx-5 py-5">
                  <div className="p-6 w-fit m-auto bg-white rounded-lg shadow-lg">
                    <h2 className="mb-4 text-xl text-black font-medium">
                      Enter Quantum Num.
                    </h2>
                    <div className="flex items-center justify-center">
                      <input
                        className={classNames(
                          "w-12 py-2 mr-2 text-center text-gray-500 border rounded",
                          {
                            "border-red-500": digit1.length === 0,
                          }
                        )}
                        type="text"
                        maxLength="1"
                        placeholder="N"
                        value={digit1}
                        onChange={(event) =>
                          handleDigitChange(event, setDigit1)
                        }
                      />
                      <input
                        className={classNames(
                          "w-12 py-2 mr-2 text-center text-gray-500 border rounded",
                          {
                            "border-red-500": digit2.length === 0,
                          }
                        )}
                        type="text"
                        maxLength="1"
                        placeholder="L"
                        value={digit2}
                        onChange={(event) =>
                          handleDigitChange(event, setDigit2)
                        }
                      />
                      <input
                        className={classNames(
                          "w-12 py-2 text-center text-gray-500 border rounded",
                          {
                            "border-red-500": digit3.length === 0,
                          }
                        )}
                        type="text"
                        maxLength="1"
                        value={digit3}
                        placeholder="ML"
                        onChange={(event) =>
                          handleDigitChange(event, setDigit3)
                        }
                      />
                    </div>
                    <div className="mt-4">
                      {digit1.length === 0 ||
                      digit2.length === 0 ||
                      digit3.length === 0 ? (
                        <>
                          <p className="text-red-500">
                            Please enter three digits.
                          </p>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            let matchFound = false;

                            for (const [key, value] of Object.entries(
                              quantumNumbers
                            )) {
                              if (
                                value["n"] === parseInt(digit1) &&
                                value["l"] === parseInt(digit2) &&
                                value["m"] === parseInt(digit3)
                              ) {
                                appendNewRender(...atomDict[key]);
                                movePage(`/renderer`);
                                matchFound = true;
                                break;
                              }
                            }

                            if (!matchFound) {
                              setNoResultsFound(true);
                            }
                          }}
                          className="mb-2 mr-2 sm:mt-0 bg-transparent hover:bg-green-800 text-green-800 hover:text-white py-2 px-4 border border-green-800 hover:border-transparent rounded"
                          type="button"
                        >
                          <span>Search</span>
                        </button>
                      )}

                      {noResultsFound && (
                        <p className="text-red-500">No results found.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {displayPeriodicTable()}

              <p className="text-gray-400 ml-0 mr-0 md:ml-40 md:mr-40">
                ElectronVisualized uses spherical harmonics to calculate the
                radial part of the atomic orbitals.
                <br />
                Then, Metropolis-Hastings algorithm is used to sample the
                wavefunction.
              </p>

              <div className="ml-5 mr-5 mt-2">
                <button
                  onClick={() => {
                    // This code runs after a global state change...
                    movePage(`/molar-mass`);
                  }}
                  className="m-5 bg-transparent hover:bg-blue-500 text-gray-400 hover:text-white py-2 px-4 border border-gray-400 hover:border-transparent rounded"
                  type="button"
                >
                  <span>Molar Mass Calculator</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
