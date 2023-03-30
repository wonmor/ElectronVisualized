import { useState, useEffect } from "react";
import ReactGA from "react-ga";

/*
░█▀▀█ ░█─── ░█▀▀▀█ ░█▀▀█ ─█▀▀█ ░█─── ░█▀▀▀█ 
░█─▄▄ ░█─── ░█──░█ ░█▀▀▄ ░█▄▄█ ░█─── ─▀▀▀▄▄ 
░█▄▄█ ░█▄▄█ ░█▄▄▄█ ░█▄▄█ ░█─░█ ░█▄▄█ ░█▄▄▄█
*/

export const CANVAS = {
  WIDTH: "fit-parent",
  HEIGHT: "85vh",
};

export const RENDERER = {
  ATOM_RADIUS: "0.3",
  TUBE_RADIUS: "0.3",
};

// Key: Molecule Name, Value: Molecule to Subtract
export const moleculesWithLonePairs = {
  "H2O": "O",
}

export const moleculeDict = {
  H2O: [
    "Water",
    "Water is an inorganic, transparent, tasteless, odourless, and nearly colourless chemical substance.",
    "Bent",
    "Polar",
    "104.5°",
    "2 bonding orbitals\n2 antibonding orbitals",
    "sp3"
  ],
  H2: [
    "Hydrogen Gas",
    "Hydrogen is the lightest element. At standard conditions hydrogen is a gas of diatomic molecules having the formula H2.",
    "Linear",
    "Nonpolar",
    "180°",
    "1 bonding orbital\n1 antibonding orbital",
    "s"
  ],
  Cl2: [
    "Chlorine Gas",
    "Chlorine is a yellow-green gas at room temperature. Chlorine has a pungent, irritating odor similar to bleach that is detectable at low concentrations.",
    "Linear",
    "Nonpolar",
    "180°",
    "1 bonding orbital\n1 antibonding orbital",
    "s"
  ],
  HCl: [
    "Hydrochloric Acid",
    "Hydrochloric acid is the water-based, or aqueous, solution of hydrogen chloride gas.",
    "Linear",
    "Polar",
    "180°",
    "1 bonding orbital\n1 antibonding orbital",
    "sp"
  ],
};

export const bondShapeDict = {
  H2O: [[0, 1], [0, 2]],
  H2: [[0, 1]],
  Cl2: [[0, 1]],
  HCl: [[0, 1]],
};

export const atomDict = {
  H: [
    "H",
    "Hydrogen Atom",
    "Atom",
    "Hydrogen is the lightest element. At standard conditions hydrogen is a gas of diatomic molecules having the formula H2. It is colorless, odorless, tasteless, non-toxic, and highly combustible. Hydrogen is the most abundant chemical substance in the universe, constituting roughly 75% of all normal matter.",
    "1s^1"
  ],
  Be: [
    "Be",
    "Beryllium Atom",
    "Atom",
    "Beryllium is a chemical element with the symbol Be and atomic number 4. It is a steel-gray, strong, lightweight and brittle alkaline earth metal. It is a divalent element that occurs naturally only in combination with other elements to form minerals. Notable gemstones high in beryllium include beryl and chrysoberyl.",
    "[He] 2s^2"
  ],
  B: [
    "B",
    "Boron Atom",
    "Atom",
    "Boron is a chemical element with the symbol B and atomic number 5. In its crystalline form it is a brittle, dark, lustrous metalloid; in its amorphous form it is a brown powder.",
    "[He] 2s^2 2p^1"
  ],
  O: [
    "O",
    "Oxygen Atom",
    "Atom",
    "Oxygen is a colourless, odourless, tasteless gas essential to living organisms, being taken up by animals, which convert it to carbon dioxide; plants, in turn, utilize carbon dioxide as a source of carbon and return the oxygen to the atmosphere.",
    "[He] 2s^2 2p^4"
  ],
  F: [
    "F",
    "Fluorine Atom",
    "Atom",
    "Fluorine is a chemical element with the symbol F and atomic number 9. It is the lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard conditions. As the most electronegative element, it is extremely reactive, as it reacts with almost all other elements, except for helium and neon.",
    "[He] 2s^2 2p^5"
  ],
  Ne: [
    "Ne",
    "Neon Atom",
    "Atom",
    "Neon is a chemical element with the symbol Ne and atomic number 10. It is a noble gas. Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about two-thirds the density of air.",
    "[He] 2s^2 2p^6"
  ],
  Fe: [
    "Fe",
    "Iron Atom",
    "Atom",
    "Iron is a chemical element with the symbol Fe and atomic number 26. It is a metal that belongs to the first transition series and group 8 of the periodic table. It is by mass the most common element on Earth, forming much of Earth's outer and inner core.",
    "[Ar] 4s^2 3d^6"
  ],
  Co: [
    "Co",
    "Cobalt Atom",
    "Atom",
    "Cobalt is a chemical element with the symbol Co and atomic number 27. Like nickel, cobalt is found in the Earth's crust only in chemically combined form, save for small deposits found in alloys of natural meteoric iron. The free element, produced by reductive smelting, is a hard, lustrous, silver-gray metal.",
    "[Ar] 4s^2 3d^7"
  ],
  Ni: [
    "Ni",
    "Nickel Atom",
    "Atom",
    "Nickel is a chemical element with the symbol Ni and atomic number 28. It is a silvery-white lustrous metal with a slight golden tinge. Nickel belongs to the transition metals and is hard and ductile.",
    "[Ar] 4s^2 3d^8"
  ],
  Cu: [
    "Cu",
    "Copper Atom",
    "Atom",
    "Copper is a chemical element with the symbol Cu (from Latin: cuprum) and atomic number 29. It is a soft, malleable, and ductile metal with very high thermal and electrical conductivity.",
    "[Ar] 4s^1 3d^10"
  ],
  Zn: [
    "Zn",
    "Zinc Atom",
    "Atom",
    "Zinc is a chemical element with the symbol Zn and atomic number 30. It is the first element in group 12 of the periodic table. In some respects zinc is chemically similar to magnesium: both elements exhibit only one normal oxidation state (+2), and the Zn2+ and Mg2+ ions are of similar size.",
    "[Ar] 4s^2 3d^10"
  ],
  Pd: [
    "Pd",
    "Palladium Atom",
    "Atom",
    "Palladium is a chemical element with the symbol Pd and atomic number 46. It is a rare and lustrous silvery-white metal discovered in 1803 by William Hyde Wollaston. It has the greatest density of any element and the lowest melting point of any metal.",
    "[Kr] 4d^10"
  ],
  Ce: [
    "Ce",
    "Cerium Atom",
    "Atom",
    "Cerium is a chemical element with the symbol Ce and atomic number 58. Cerium is a soft, ductile and silvery-white metal that tarnishes when exposed to air, and it is soft enough to be cut with a knife.",
    "[Xe] 6s^2 4f^1"
  ],
  Pr: [
    "Pr",
    "Praseodymium Atom",
    "Atom",
    "Praseodymium is a chemical element with the symbol Pr and atomic number 59. It is the third member of the lanthanide series, and is traditionally considered to be one of the rare-earth elements.",
    "[Xe] 6s^2 4f^3"
  ],
  Nd: [
    "Nd",
    "Neodymium Atom",
    "Atom",
    "Neodymium is a chemical element with the symbol Nd and atomic number 60. It is the fourth member of the lanthanide series and is traditionally considered to be one of the rare-earth elements.",
    "[Xe] 6s^2 4f^4"
  ],
  Pm: [
    "Pm",
    "Promethium Atom",
    "Atom",
    "Promethium is a chemical element with the symbol Pm and atomic number 61. It is the fifth member of the lanthanide series and is traditionally considered to be one of the rare-earth elements.",
    "[Xe] 6s^2 4f^5"
  ],
  Sm: [
    "Sm",
    "Samarium Atom",
    "Atom",
    "Samarium is a chemical element with the symbol Sm and atomic number 62. It is the sixth member of the lanthanide series and is traditionally considered to be one of the rare-earth elements.",
    "[Xe] 6s^2 4f^6"
  ],
  Eu: [
    "Eu",
    "Europium Atom",
    "Atom",
    "Europium is a chemical element with the symbol Eu and atomic number 63. It is a soft, silvery-white metal that tarnishes when exposed to air, and it is soft enough to be cut with a knife.",
    "[Xe] 6s^2 4f^7"
  ],
  Gd: [
    "Gd",
    "Gadolinium Atom",
    "Atom",
    "Gadolinium is a chemical element with the symbol Gd and atomic number 64. Gadolinium is a silvery-white, malleable, and ductile rare earth metal. Gadolinium is the third most abundant rare earth element, after cerium and lanthanum.",
    "[Xe] 6s^2 5d^1 4f^7"
  ],
  Li: [
    "Li",
    "Lithium Atom",
    "Atom",
    "A lithium atom is an atom of the chemical element lithium. Stable lithium is composed of three electrons bound by the electromagnetic force to a nucleus containing three protons along with either three or four neutrons, depending on the isotope, held together by the strong force.",
    "1s^2 2s^1"
  ],
  Na: [
    "Na",
    "Sodium Atom",
    "Atom",
    "Sodium is a very soft silvery-white metal. Sodium is the most common alkali metal and the sixth most abundant element on Earth, comprising 2.8 percent of Earth’s crust. It occurs abundantly in nature in compounds, especially common salt—sodium chloride (NaCl)—which forms the mineral halite and constitutes about 80 percent of the dissolved constituents of seawater.",
    "[Ne] 3s^1"
  ],
  K: [
    "K",
    "Potassium Atom",
    "Atom",
    "Potassium is a silvery-white metal that is soft enough to be cut with a knife with little force. Potassium metal reacts rapidly with atmospheric oxygen to form flaky white potassium peroxide in only seconds of exposure.",
    "[Ar] 4s^1"
  ]
};

export const normalizeData = (val, max, min) => {
  /*
    This function normalizes a given dataset within a certain range that is defined
  
    Parameters
    ----------
    val: Float
      A value that has to be normalized within a range
    max: Float
      The desired upper limit of the value
    min: Float
      The desired lower limit of the value
  
    Returns
    -------
    Float
      Returns a normalized float value contained within the boundary set
    */

  return (val - min) / (max - min);
};

export const getMoleculeColour = (
  element,
  volume,
  lonePairHighlight = false
) => {
  /*
    Getting the molecule colour based upon the element name and the volume information
  
    Parameters
    ----------
    element: String
        Name of the element
    volume: Float
        Volume that correspond with each coordinate of the Canvas
  
    Returns
    -------
    String
        Contains the RGB information of the generated colour
    */
  switch (element) {
    case "H":
      return `hsl(${volume * 100.0 + 800.0}, 100%, 60%)`;

    case "O":
      return `hsl(${volume * 1500.0 + 200.0}, 100%, 60%)`;

    case "H2":
      return `hsl(${volume * 100.0 + 800.0}, 100%, 60%)`;

    case "Cl2":
      return `hsl(${volume * 2000.0 + 200.0}, 100%, 60%)`;

    case "H2O":
      return lonePairHighlight
        ? `hsl(${volume * 1500.0 + 200.0}, 100%, 60%)`
        : `hsl(${volume * 5000.0 + 180.0}, 100%, 60%)`;

    case "HCl":
      return `hsl(${volume * 24000.0 + 200.0}, 100%, 60%)`;

    default:
      return `hsl(${volume * 100.0 + 800.0}, 100%, 60%)`;
  }
};

export const getAtomColour = (element) => {
  switch (element) {
    case "H":
      return "#C8C8C8"; // light gray for a neutral atom
    case "Be":
      return "#FFB266"; // peachy orange for its high melting point and density
    case "B":
      return "#FFB3D1"; // pink for its low density and high thermal conductivity
    case "Li":
      return "#BFBFBF"; // gray for its softness and low density
    case "Na":
      return "#E0E0E0"; // light gray for its reactivity and softness
    case "K":
      return "#E6E6E6"; // gray for its softness and low density
    case "O":
      return "#F07070"; // bright red for its high electronegativity and reactivity
    case "F":
      return "#66CC99"; // green for its high electronegativity and reactivity
    case "Ne":
      return "#EBEBEB"; // light gray for its low reactivity and low boiling point
    case "Fe":
      return "#D9A871"; // golden brown for its metallic nature and abundance in the earth's crust
    case "Co":
      return "#FF5C5C"; // dark red for its ferromagnetism and use in magnetic materials
    case "Ni":
      return "#A9A9A9"; // dark gray for its metallic nature and use in alloys
    case "Cu":
      return "#FFD700"; // gold for its high electrical conductivity and use in electrical wiring
    case "Zn":
      return "#AED6F1"; // light blue for its metallic nature and use in galvanization
    case "Pd":
      return "#E8E8E8"; // light gray for its use in catalytic converters and jewelry
    case "Ce":
      return "#FFDAB9"; // peach for its use in catalytic converters and ability to change color
    case "Pr":
      return "#FF9966"; // coral for its use in magnets and lasers
    case "Nd":
      return "#A0522D"; // sienna for its use in magnets and lasers
    case "Pm":
      return "#FFA07A"; // light salmon for its radioactivity and use in nuclear batteries
    case "Sm":
      return "#90EE90"; // light green for its use in magnets and lasers
    case "Eu":
      return "#CD5C5C"; // indian red for its red phosphorescence and use in security features
    case "Gd":
      return "#87CEFA"; // light sky blue for its use in magnets and MRI contrast agents
    default:
      return "#C8C8C8"; // light gray for unknown elements
  }
};

export const getMoleculeOpacity = (element, volume) => {
  /*
    Getting the molecule opacity based upon the element name and the volume information
  
    Parameters
    ----------
    element: String
        Name of the element
    volume: Float
        Volume that correspond with each coordinate of the Canvas
  
    Returns
    -------
    String
        Contains the normalized value of the volume so that it can be used for the opacity
    */
  switch (element) {
    case "H2":
      return normalizeData(volume, 1, 0) / 50;

    case "Cl2":
      return normalizeData(255 - Math.abs(volume) * 1.004, 1, -1);

    case "H2O":
      return normalizeData(255 - Math.abs(volume) * 1.006, 1, -1);

    case "HCl":
      return normalizeData(255 - Math.abs(volume) * 1.003, 1, -1);

    default:
      return normalizeData(volume, 1, 0) / 50;
  }
};

export const getCameraPosition = (element) => {
  /*
    Updating the camera position according to the element name
  
    Parameters
    ----------
    element: String
        Name of the element
  
    Returns
    -------
    Dictionary
        Contains the position values and the FOV of the camera
    */
  switch (element) {
    case "H":
      return { fov: 15, position: [-5, 8, 8] };

    case "Na":
      return { fov: 55, position: [-5, 8, 8] };

    case "K":
      return { fov: 65, position: [-5, 8, 8] };

    case "H2":
      return { fov: 20, position: [-5, 8, 8] };

    case "H2O":
      return { fov: 55, position: [-5, 8, 8] };

    case "HCl":
      return { fov: 55, position: [-5, 8, 8] };

    default:
      return { fov: 35, position: [-5, 8, 8] };
  }
};

export function useWindowSize() {
  /*
    Initialize state with undefined width/height so server and client renders match

    Parameters
    ----------
    None

    Returns
    -------
    Array
        Contains the x and y sizes of the current window
    */

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export const zoomInCamera = (camera, constant) => {
  camera.position.x = camera.position.x / constant;
  camera.position.y = camera.position.y / constant;
  camera.position.z = camera.position.z / constant;
};

export const zoomOutCamera = (camera, constant) => {
  camera.position.x = camera.position.x * constant;
  camera.position.y = camera.position.y * constant;
  camera.position.z = camera.position.z * constant;
};

export const useAnalyticsEventTracker = (category = "Renderer") => {
  const eventTracker = (
    action = "Initiate Rendering Process",
    label = "Renderer"
  ) => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};

export const isElectron = () => {
  // Renderer process
  if (
    typeof window !== "undefined" &&
    typeof window.process === "object" &&
    window.process.type === "renderer"
  ) {
    return true;
  }

  // Main process
  if (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    !!process.versions.electron
  ) {
    return true;
  }

  // Detect the user agent when the `nodeIntegration` option is set to true
  if (
    typeof navigator === "object" &&
    typeof navigator.userAgent === "string" &&
    navigator.userAgent.indexOf("Electron") >= 0
  ) {
    return true;
  }

  return false;
};

export const invertColor = (hex) => {
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
};

export const padZero = (str, len) => {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
};