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

export const moleculeDict = {
  H2O: [
    "Water",
    "Water is an inorganic, transparent, tasteless, odourless, and nearly colourless chemical substance, which is the main constituent of Earth's hydrosphere and the fluids of all known living organisms.",
  ],
  H2: [
    "Hydrogen Gas",
    "Hydrogen is the lightest element. At standard conditions hydrogen is a gas of diatomic molecules having the formula H2. It is colorless, odorless, tasteless, non-toxic, and highly combustible. Hydrogen is the most abundant chemical substance in the universe, constituting roughly 75% of all normal matter.",
  ],
  Cl2: [
    "Chlorine Gas",
    "Chlorine is a yellow-green gas at room temperature. Chlorine has a pungent, irritating odor similar to bleach that is detectable at low concentrations. The density of chlorine gas is approximately 2.5 times greater than air, which will cause it to initially remain near the ground in areas with little air movement.",
  ],
  HCl: [
    "Hydrochloric Acid",
    "Hydrochloric acid is the water-based, or aqueous, solution of hydrogen chloride gas. It is also the main component of gastric acid, an acid produced naturally in the human stomach to help digest food.",
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
  Cu: [
    "Cu",
    "Copper Atom",
    "Atom",
    "Copper is a chemical element with the symbol Cu (from Latin: cuprum) and atomic number 29. It is a soft, malleable, and ductile metal with very high thermal and electrical conductivity.",
    "[Ar] 3d^10 4s^1"
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

export const getAtomColour = (
  element
) => {
  /*
    Getting the atom colour based upon the element name
    and the colour it emits while combusting
  
    Parameters
    ----------
    element: String
        Name of the element
    volume: Float
        Volume that correspond with each coordinate of the Canvas
  
    Returns
    -------
    String
        Contains the HEX information of the generated colour
    */
  switch (element) {
    case "H":
      return '#3fc6f2';

    case "Be":
      return "#FFFFFF";

    case "B":
      return "#00FF00";

    case "Li":
      return '#FFC0CB';

    case "Na":
      return "#FFFF00";

    case "K":
      return "#C8A2C8";

    case "O":
      return "#FFA500";

    case "Cu":
      return '#00CC99';

    default:
      return "#FFFF00";
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