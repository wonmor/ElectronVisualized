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
  C2H4: [
    "Ethene",
    "Ethene is an organic compound having the formula C2H4. It is a colorless, flammable gas with a faint 'sweet and musky' odor.",
    "Trigonal Planar",
    "Nonpolar",
    "120°",
    "3 bonding orbitals\n1 antibonding orbital",
    "sp2",
    "AX2E",
    "1 sigma bond\n1 pi bond"
  ],
  H2O: [
    "Water",
    "Water is an inorganic, transparent, tasteless, odourless, and nearly colourless chemical substance.",
    "Bent",
    "Polar",
    "104.5°",
    "2 bonding orbitals\n2 antibonding orbitals",
    "sp3",
    "AX2E2",
    "2 sigma bonds\n2 lone pairs"
  ],
  H2: [
    "Hydrogen Gas",
    "Hydrogen is the lightest element. At standard conditions hydrogen is a gas of diatomic molecules having the formula H2.",
    "Linear",
    "Nonpolar",
    "180°",
    "1 bonding orbital\n1 antibonding orbital",
    "No",
    "AX2",
    "1 sigma bond"
  ],
  Cl2: [
    "Chlorine Gas",
    "Chlorine is a yellow-green gas at room temperature. Chlorine has a pungent, irritating odor similar to bleach that is detectable at low concentrations.",
    "Linear",
    "Nonpolar",
    "180°",
    "1 bonding orbital\n1 antibonding orbital",
    "No",
    "AX2",
    "1 sigma bond\n1 pi bond"
  ],
  HCl: [
    "Hydrochloric Acid",
    "Hydrochloric acid is the water-based, or aqueous, solution of hydrogen chloride gas.",
    "Linear",
    "Polar",
    "180°",
    "1 bonding orbital\n1 antibonding orbital",
    "sp",
    "AX2E",
    "1 sigma bond\n1 lone pair"
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
    "Lightest element. Gas of diatomic molecules. Highly combustible.",
    "1s^1",
  ],
  Be: [
    "Be",
    "Beryllium Atom",
    "Atom",
    "Steel-gray, strong, lightweight and brittle alkaline earth metal.",
    "[He] 2s^2",
  ],
  B: [
    "B",
    "Boron Atom",
    "Atom",
    "Brittle, dark, lustrous metalloid.",
    "[He] 2s^2 2p^1",
  ],
  O: [
    "O",
    "Oxygen Atom",
    "Atom",
    "Colorless, odorless, tasteless gas essential to living organisms.",
    "[He] 2s^2 2p^4",
  ],
  F: [
    "F",
    "Fluorine Atom",
    "Atom",
    "Highly reactive pale yellow diatomic gas. Most electronegative element.",
    "[He] 2s^2 2p^5",
  ],
  Ne: [
    "Ne",
    "Neon Atom",
    "Atom",
    "Colorless, odorless, inert monatomic gas.",
    "[He] 2s^2 2p^6",
  ],
  Fe: [
    "Fe",
    "Iron Atom",
    "Atom",
    "Most common element on Earth. Belongs to first transition series and group 8 of periodic table.",
    "[Ar] 4s^2 3d^6",
  ],
  Co: [
    "Co",
    "Cobalt Atom",
    "Atom",
    "Hard, lustrous, silver-gray metal.",
    "[Ar] 4s^2 3d^7",
  ],
  Ni: [
    "Ni",
    "Nickel Atom",
    "Atom",
    "Silvery-white lustrous metal with a slight golden tinge.",
    "[Ar] 4s^2 3d^8",
  ],
  Cu: [
    "Cu",
    "Copper Atom",
    "Atom",
    "Soft, malleable, and ductile metal with high thermal and electrical conductivity.",
    "[Ar] 4s^1 3d^10",
  ],
  Zn: [
    "Zn",
    "Zinc Atom",
    "Atom",
    "First element in group 12 of the periodic table. Chemically similar to magnesium.",
    "[Ar] 4s^2 3d^10",
  ],
  Pd: [
    "Pd",
    "Palladium Atom",
    "Atom",
    "Rare and lustrous silvery-white metal with greatest density of any element.",
    "[Kr] 4d^10",
  ],
  Ce: [
    "Ce",
    "Cerium Atom",
    "Atom",
    "Soft, ductile, and silvery-white metal that tarnishes when exposed to air.",
    "[Xe] 6s^2 4f^1",
  ],
  Pr: [
    "Pr",
    "Praseodymium Atom",
    "Atom",
    "Soft and traditionally considered to be one of the rare-earth elements.",
    "[Xe] 6s^2 4f^3",
  ],
  Nd: [
    "Nd",
    "Neodymium Atom",
    "Atom",
    "Fourth member of the lanthanide series and traditionally considered to be one of the rare-earth elements.",
    "[Xe] 6s^2 4f^4",
  ],
  Pm: [
    "Pm",
    "Promethium Atom",
    "Atom",
    "Fifth member of the lanthanide series and traditionally considered to be one of the rare-earth elements.",
    "[Xe] 6s^2 4f^5",
  ],
  Sm: [
    "Sm",
    "Samarium Atom",
    "Atom",
    "Sixth member of the lanthanide series and traditionally considered to be one of the rare-earth elements.",
    "[Xe] 6s^2 4f^6",
  ],
  Eu: [
    "Eu",
    "Europium Atom",
    "Atom",
    "Soft, silvery-white metal that tarnishes when exposed to air.",
    "[Xe] 6s^2 4f^7",
  ],
  Gd: [
    "Gd",
    "Gadolinium Atom",
    "Atom",
    "Silvery-white, malleable, and ductile rare earth metal. Third most abundant rare earth element.",
    "[Xe] 6s^2 5d^1 4f^7",
  ],
  Li: [
    "Li",
    "Lithium Atom",
    "Atom",
    "Composed of three electrons bound to a nucleus containing three protons. Common alkali metal.",
    "1s^2 2s^1",
  ],
  Na: [
    "Na",
    "Sodium Atom",
    "Atom",
    "Very soft silvery-white metal. Sixth most abundant element on Earth.",
    "[Ne] 3s^1",
  ],
  K: [
    "K",
    "Potassium Atom",
    "Atom",
    "Silvery-white metal that is soft enough to be cut with a knife with little force. Reacts rapidly with atmospheric oxygen.",
    "[Ar] 4s^1",
  ],
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
      return `hsl(${volume * 204000.0 + 200.0}, 100%, 60%)`;

    case "H2O":
      return lonePairHighlight
        ? `hsl(${volume * 1500.0 + 200.0}, 100%, 60%)`
        : `hsl(${volume * 5000.0 + 180.0}, 100%, 60%)`;

    case "HCl":
      return `hsl(${volume * 204000.0 + 200.0}, 100%, 60%)`;

    case "C2H4":
      return `hsl(${volume * 5000.0 + 180.0}, 100%, 60%)`;

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

    case "C2H4":
      return { fov: 75, position: [-5, 8, 8] };

    case "Cl2":
      return { fov: 75, position: [-5, 8, 8] };

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