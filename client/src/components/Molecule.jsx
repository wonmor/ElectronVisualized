import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";

import { Slider, Button } from "@mui/material";

import { Switch } from "@headlessui/react";

import store from "../store";

// A MUST — MAKE SURE THAT YOU WRITE CURLY BRACKETS NEXT TO IMPORT!
import {
  setGlobalAtomInfo,
  appendGlobalAtomInfo,
} from "../states/atomInfoSlice";

import { setGlobalRenderInfo } from "../states/renderInfoSlice";

import axios from "axios";

import { Canvas } from "@react-three/fiber";

import { Atoms, BondLine } from "./Geometries";

import Controls from "./Controls";

import { Particles } from "./Instances";

import { CANVAS, getCameraPosition, useWindowSize } from "./Globals";

/*
░█▀▄▀█ ░█▀▀▀█ ░█─── ░█▀▀▀ ░█▀▀█ ░█─░█ ░█─── ░█▀▀▀ 
░█░█░█ ░█──░█ ░█─── ░█▀▀▀ ░█─── ░█─░█ ░█─── ░█▀▀▀ 
░█──░█ ░█▄▄▄█ ░█▄▄█ ░█▄▄▄ ░█▄▄█ ─▀▄▄▀ ░█▄▄█ ░█▄▄▄

DEVELOPED AND DESIGNED BY JOHN SEONG.
USES GPAW (DENSITY FUNCTIONAL THEORY) FOR COMPUTATION PURPOSES.

HOW TO OPTIMIZE REACT + THREE-FIBER: https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance
*/

const useLazyInterval = (callback, delay) => {
  /*
  This function calls the saved interval and resets it into a new value;
  It also prevents memory leak by discaring the data when it's unused

  Parameters
  ----------
  callback: Function(s)
    Input the function(s) to execute every n milliseconds

  Returns
  -------
  Function
    Clear the previously stored interval to conserve memory
  */

  const savedCallback = useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    // Clear the interval to conserve memory
    return () => clearInterval(id);
  }, [delay]);
};

export default function Molecule() {
  /*
  This is a component function in JSX that also handles the HTTP requests from the server by using AJAX

  Parameters
  ----------
  None

  Returns
  -------
  DOM File
    A HTML markup that contains graphical elements
  */
  const [particleRadius, setParticleRadius] = useState(0.015);

  const [reachedMaxPeak, setMaxPeak] = useState(false);
  const [reachedMinPeak, setMinPeak] = useState(true);

  const [lonePairEnabled, setLonePairEnabled] = useState(true);

  /*
  Define that React and Redux states: former being used locally, and the latter being used globally.
  The purpose of using constants is due to its high efficiency when it comes to memory management.
  */

  const globalAtomInfo = useSelector((state) => state.atomInfo.globalAtomInfo);

  const globalSelectedElement = useSelector(
    (state) => state.selectedElement.globalSelectedElement
  );

  const globalRenderInfo = useSelector(
    (state) => state.renderInfo.globalRenderInfo
  );

  const [animation, setAnimation] = useState(globalRenderInfo["animation"]);

  const [statusText, setStatusText] = useState(globalRenderInfo["statusText"]);

  const [disableButton, setDisableButton] = useState(
    globalRenderInfo["disableButton"]
  );

  const [preRender, setPreRender] = useState(globalRenderInfo["preRender"]);

  // const [currentElementArray, setCurrentElementArray] = useState(null);

  const [serverError, setServerError] = useState(
    globalRenderInfo["serverError"]
  );

  const dispatch = useDispatch();

  const size = useWindowSize();

  // Handles the breathing animation event... needs more memoryr optimization though!
  useLazyInterval(() => {
    if (animation) {
      if (!reachedMaxPeak || reachedMinPeak) {
        setParticleRadius(particleRadius + 0.0025);
      } else {
        setParticleRadius(particleRadius - 0.0025);
      }
      if (particleRadius < 0.01) {
        setMinPeak(true);
        setMaxPeak(false);
      }
      if (particleRadius > 0.04) {
        setMinPeak(false);
        setMaxPeak(true);
      }
    } else {
      // Clear the interval when animation event is not triggered...
      clearInterval();
    }
  }, 100); // Execute every 1.5 seconds

  /*
  Whenever the state information regarding DOM element
  hide/show changes, run this function...
  */

  useEffect(() => {
    dispatch(
      setGlobalRenderInfo({
        animation: animation,
        disableButton: disableButton,
        preRender: preRender,
        serverError: serverError,
        statusText: statusText,
      })
    );
  }, [animation, disableButton, dispatch, preRender, serverError, statusText]);

  const fetchSecondRenderElement = async (secondRenderElement) => {
    await axios({
      method: "GET",
      url: `/api/gpaw/${secondRenderElement}`,
    })
      .then((response) => {
        const res = response.data;

        dispatch(
          appendGlobalAtomInfo({
            density_data2: res.density_data,
          }) || null
        );

        setPreRender(false);
      })
      .catch((error) => {
        if (error.response) {
          setStatusText("Server communication error has occured!");
          setServerError(true);

          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);

          return;
        }
      });
  };

  const fetchCombinedRenderElement = async (
    firstRenderElement,
    secondRenderElement = null
  ) => {
    /*
    This is an asyncronous function that sends HTML requests to the server, ran by Flask (Python)

    Parameters
    ----------
    None

    Returns
    -------
    None
    */

    await axios({
      method: "GET",
      url: `/api/gpaw/${firstRenderElement}`,
    })
      .then((response) => {
        const res = response.data;

        dispatch(
          setGlobalAtomInfo({
            no_of_atoms: res.no_of_atoms,
            atomic_colors: res.atomic_colors,
            elements: res.elements,

            atoms_x: res.atoms_x,
            atoms_y: res.atoms_y,
            atoms_z: res.atoms_z,

            xdim: res.xdim,
            ydim: res.ydim,
            zdim: res.zdim,

            vmax: res.vmax,
            vmin: res.vmin,

            density_data: res.density_data,
          }) || null
        );

        if (secondRenderElement !== null) {
          // Nested AXIOS method...
          fetchSecondRenderElement(secondRenderElement);
        } else {
          setPreRender(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          setStatusText("Server communication error has occured!");
          setServerError(true);

          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);

          return;
        }
      });
  };

  const changeParticleRadius = (event, value) => {
    /*
    This function changes the state of individual particle radius...

    Parameters
    ----------
    None

    Returns
    -------
    None
    */
    setParticleRadius(value);
  };

  return (
    <div>
      <div className="bg-gray-700" style={{ "min-height": "100vh" }}>
        <div className="text-rose-200 text-center pt-10 pb-10 ml-5 mr-5">
          <h1
            className={`font-bold mb-5 ${size.width < 350 ? "scale-75" : null}`}
          >
            {globalSelectedElement["name"]}
            <span className="font-thin text-gray-400">. Visualized.</span>
          </h1>

          <h2 className="sm:mt-5 pb-3 pl-5 pr-5 text-gray-400">
            Simulated <span className="text-white">Real Time</span> with the
            help of{" "}
            <span className="text-white">Density Functional Theory</span>.
          </h2>

          <p className="pt-5 pr-5 pl-5 md:pl-60 md:pr-60 text-gray-400">
            {globalSelectedElement["description"]}
          </p>

          <div class="flex items-center justify-center pt-5">
            {!disableButton ? (
              <div class="grid grid-row-2 gap-4 content-center justify-items-center">
                <button
                  disabled={disableButton}
                  onClick={() => {
                    if (globalSelectedElement["element"] === "H2O" && lonePairEnabled) {
                      fetchCombinedRenderElement("H2O", "O");
                      /*
                        Save oxygen atom's coordinates to subtract it
                        from the water's coordinates to visualize the lone pairs...
                        */
                    } else {
                      fetchCombinedRenderElement(
                        globalSelectedElement["element"]
                      );
                    }
                    setDisableButton(true);
                  }}
                  className="bg-transparent hover:bg-blue-500 text-white hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                  type="button"
                >
                  <span>Start Rendering</span>
                </button>
                {globalSelectedElement["element"] === "H2O" && (
                  <>
                    <p className="text-gray-400 mt-5">
                      Enable <span className="text-white">Lone Pair</span> Rendering
                    </p>

                    <Switch
                      checked={lonePairEnabled}
                      onChange={setLonePairEnabled}
                      className={`${
                        lonePairEnabled ? "bg-blue-600" : "bg-gray-400"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span
                        className={`${
                          lonePairEnabled ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white`}
                      />
                    </Switch>
                  </>
                )}
              </div>
            ) : preRender ? (
              <div
                className={`absolute text-gray-400 ${
                  serverError ? "mt-10" : "mt-40"
                }`}
              >
                <h3>{statusText}</h3>

                {!serverError && (
                  <div className="scale-75 lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-5">
                {!animation && (
                  <div>
                    <p className="text-gray-400">Particle Radius</p>

                    <Slider
                      className="ml-40 mr-40 mb-5"
                      onClick={() => {
                        setAnimation(false);
                      }}
                      sx={{
                        width: 300,
                        color: "gray",
                      }}
                      value={particleRadius}
                      onChange={changeParticleRadius}
                      min={0.01}
                      max={0.07}
                      step={0.001}
                      valueLabelDisplay="auto"
                    />
                  </div>
                )}
                <Button
                  onClick={() => {
                    setAnimation(!animation);

                    if (!animation) {
                      setParticleRadius(0.01);

                      setMaxPeak(false);
                      setMinPeak(true);
                    }
                  }}
                  variant="outlined"
                  sx={{
                    marginLeft: "7.5em",
                    marginRight: "7.5em",
                    color: "gray",
                    borderColor: "gray",
                  }}
                >
                  {!animation ? "Enable Animation" : "Disable Animation"}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div style={{ width: CANVAS.WIDTH, height: CANVAS.HEIGHT }}>
          <Canvas camera={getCameraPosition(globalSelectedElement["element"])}>
            <Controls />

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

            {globalAtomInfo && !preRender && (
              <Provider store={store}>
                {globalAtomInfo["atoms_x"].map((value, index) => {
                  return (
                    <mesh>
                      <Atoms
                        position={[
                          globalAtomInfo["atoms_x"][index],
                          globalAtomInfo["atoms_y"][index],
                          globalAtomInfo["atoms_z"][index],
                        ]}

                        // colour={globalAtomInfo["atomic_color"][currentElementArray[index]]}
                      />

                      {index !== globalAtomInfo["atoms_x"].length - 2 ? (
                        <BondLine
                          coords={[
                            globalAtomInfo["atoms_x"][0],
                            globalAtomInfo["atoms_y"][0],
                            globalAtomInfo["atoms_z"][0],
                            globalAtomInfo["atoms_x"][index],
                            globalAtomInfo["atoms_y"][index],
                            globalAtomInfo["atoms_z"][index],
                          ]} // [ x1, y1, z1,  x2, y2, z2, ... ] format
                        />
                      ) : (
                        <BondLine
                          coords={[
                            globalAtomInfo["atoms_x"][0],
                            globalAtomInfo["atoms_y"][0],
                            globalAtomInfo["atoms_z"][0],
                            globalAtomInfo["atoms_x"][index],
                            globalAtomInfo["atoms_y"][index],
                            globalAtomInfo["atoms_z"][index],
                          ]} // [ x1, y1, z1,  x2, y2, z2, ... ] format
                        />
                      )}
                    </mesh>
                  );
                })}
                <Particles particleRadius={particleRadius} />
              </Provider>
            )}

            <gridHelper args={[undefined, undefined, "white"]} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
