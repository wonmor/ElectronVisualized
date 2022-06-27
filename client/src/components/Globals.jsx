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

export const getMoleculeColour = (element, volume, lonePairHighlight = false) => {
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
      return lonePairHighlight ? `hsl(${volume * 1500.0 + 200.0}, 100%, 60%)` : `hsl(${volume * 5000.0 + 180.0}, 100%, 60%)`;

    case "HCl":
      return `hsl(${volume * 24000.0 + 200.0}, 100%, 60%)`;

    default:
        return `hsl(${volume * 100.0 + 800.0}, 100%, 60%)`;
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

export const useAnalyticsEventTracker = (category="Renderer") => {
  const eventTracker = (action = "Initiate Rendering Process", label = "Renderer") => {
    ReactGA.event({category, action, label});
  }
  return eventTracker;
}

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
