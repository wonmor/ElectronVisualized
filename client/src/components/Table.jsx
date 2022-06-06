import { useNavigate } from "react-router-dom";
import "./Table.css";


export default function Table() {
  const navigate = useNavigate();

  function handleElementClick() {
    navigate("/element");
  }

  return (
    <div>
      <div className="bg-gray-700" style={{ "min-height": "100vh" }}>
        <div className="text-white text-center pt-10 pb-10 text-gray-400">
          <h1>
            Visualizing <span className="text-white">Electron Density</span>.
            Reimagined.
          </h1>
          <h2 className="mt-5 pb-5 text-gray-400 border-b border-gray-400">
            Simulated <span className="text-white">Real-Time</span> using{" "}
            <span className="text-white">GPAW</span> and{" "}
            <span className="text-white">ASE</span>.
          </h2>
          <p className="p-5 text-gray-400">
            Website still in the <b>development</b> phase. Only <b>Hydrogen</b>{" "}
            is available at the moment.
          </p>
          <div
            className="m-10 scale-75 sm:scale-100"
            role="region"
            tabindex="0"
          >
            <ol id="periodic-table">
              <li onClick={handleElementClick} title="Hydrogen">
                H
              </li>
              <li title="Helium">He</li>
              <li title="Lithium">Li</li>
              <li title="Beryllium">Be</li>
              <li title="Boron">B</li>
              <li title="Carbon">C</li>
              <li title="Nitrogen">N</li>
              <li title="Oxygen">O</li>
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
      </div>
    </div>
  );
}
