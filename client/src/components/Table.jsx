import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { setGlobalRenderInfo } from "../states/renderInfoSlice";

import { setGlobalSelectedElement } from "../states/selectedElementSlice";

import { Background } from "./Geometries";

import { moleculeDict, useWindowSize } from "./Globals";

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

  const appendNewRender = (element, name, description) => {
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
        description: description,
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
      <div className="">
        <div
          className={`m-10 scale-75 sm:scale-100 ${
            size.width < 350 ? "scale-50" : null
          }`}
          role="region"
          tabindex="0"
        >
          <ol className="scale-90 sm:scale-100" id="periodic-table">
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(
                  "H",
                  "Hydrogen Atom",
                  "Hydrogen is the lightest element. At standard conditions hydrogen is a gas of diatomic molecules having the formula H2. It is colorless, odorless, tasteless, non-toxic, and highly combustible. Hydrogen is the most abundant chemical substance in the universe, constituting roughly 75% of all normal matter."
                );
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer/${globalSelectedElement["element"]}`);
              }}
              title="Hydrogen"
            >
              H
            </li>
            <li title="Helium">He</li>
            <li title="Lithium">Li</li>
            <li title="Beryllium">Be</li>
            <li title="Boron">B</li>
            <li title="Carbon">C</li>
            <li title="Nitrogen">N</li>
            <li
              onMouseDown={() => {
                // This code runs first...
                appendNewRender(
                  "O",
                  "Oxygen Atom",
                  "Oxygen is a colourless, odourless, tasteless gas essential to living organisms, being taken up by animals, which convert it to carbon dioxide; plants, in turn, utilize carbon dioxide as a source of carbon and return the oxygen to the atmosphere."
                );
              }}
              onClick={() => {
                // This code runs after a global state change...
                movePage(`/renderer/${globalSelectedElement["element"]}`);
              }}
              title="Oxygen"
            >
              O
            </li>
            <li title="Fluorine">F</li>
            <li title="Neon">Ne</li>
            <li title="Sodium">Na</li>
            <li title="Magnesium">Mg</li>
            <li title="Aluminium">Al</li>
            <li title="Silicon">Si</li>
            <li title="Phosphorus">P</li>
            <li title="Sulfur">S</li>
            <li title="Chlorine">Cl</li>
            <li title="Argon">Ar</li>
            <li title="Potassium">K</li>
            <li title="Calcium">Ca</li>
            <li title="Scandium">Sc</li>
            <li title="Titanium">Ti</li>
            <li title="Vanadium">V</li>
            <li title="Chromium">Cr</li>
            <li title="Manganese">Mn</li>
            <li title="Iron">Fe</li>
            <li title="Cobalt">Co</li>
            <li title="Nickel">Ni</li>
            <li title="Copper">Cu</li>
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
      </div>
    );
  };

  return (
    <div>
      <div className="bg-gray-700" style={{ "min-height": "100vh" }}>
        <div className="text-white text-center p-5 text-gray-400">
          <h1
            className={`scale-75 sm:scale-100 ${
              size.width < 350 ? "truncate" : null
            }`}
          >
            Visualizing <span className="text-rose-200"><b>Electron Density</b></span>.
            Reimagined.
          </h1>

          <h2 className="sm:mt-5 pb-3 pl-5 pr-5 text-gray-400">
            Simulated with the
            help of{" "}
            <span className="text-white">Density Functional Theory</span>.
          </h2>

          <div className="bg-gray-600 pb-2">
            <h1
              className={`scale-90 sm:scale-100 mt-5 pt-5 pl-5 pr-5 text-blue-200 ${
                size.width < 350 ? "truncate" : null
              }`}
            >
              <b>Molecules</b>
            </h1>

            <p className="p-5 text-gray-400">
              Visualize your favourite molecule using <b>GPAW</b> and <b>ASE</b>{" "}
              packages. Now available on the <b>Web</b>.
            </p>

            {Object.keys(moleculeDict).map((key, index) => {
              const value = moleculeDict[key];

              return (
                <button
                  onMouseDown={() => {
                    // This code runs first...
                    appendNewRender(key, value[0], value[1]);
                  }}
                  onClick={() => {
                    // This code runs after a global state change...
                    movePage(`/renderer/${globalSelectedElement["element"]}`);
                  }}
                  className="mb-3 mr-2 sm:mt-0 bg-transparent hover:bg-blue-500 text-white hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                  type="button"
                >
                  <span>{value[0]}</span>
                </button>
              );
            })}
          </div>

          <h1 className="scale-90 sm:scale-100 mt-5 pl-5 pr-5 text-gray-400">
            <b>Atoms</b>
          </h1>

          <p className="p-5 text-gray-400 border-b border-gray-500">
            Website still in the <b>development</b> phase. Only <b>Hydrogen</b>{" "}
            and <b>Oxygen</b> are available at the moment.
          </p>

          {displayPeriodicTable()}

          <h2 className="p-5 text-gray-400 border-t border-gray-500">
            "Compared to more traditional plane wave or localized basis set approaches, <span className="text-white">Projector Augmented-wave</span> method offers <span className="text-white">several advantages</span>, most notably good computational scalability and systematic convergence properties."
          </h2>

          <p className="p-5 text-gray-400">
            — A public testimonial by  <span className="text-white">J Enkovaara et al. 2010</span> on their topical review <a href="https://iopscience.iop.org/article/10.1088/0953-8984/22/25/253202" className="hover:underline text-blue-200"><i>Electronic structure calculations with <b>GPAW</b></i></a>.
          </p>

        </div>
        <Background />
      </div>
    </div>
  );
}
