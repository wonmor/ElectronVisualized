import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { Button } from "@mui/material";

import * as THREE from "three";

import store from "../store";

// A MUST — MAKE SURE THAT YOU WRITE CURLY BRACKETS NEXT TO IMPORT!
import {
  setGlobalAtomInfo,
  appendGlobalAtomInfo,
} from "../states/atomInfoSlice";

import { setGlobalRenderInfo } from "../states/renderInfoSlice";

import axios from "axios";

import { GLBViewer, DefaultModel } from "./Geometries";

import Controls from "./Controls";
import MetaTag from "./MetaTag";
import Diagram from "./Diagram";

import { Particles } from "./Instances";
import {
  moleculeDict,
  moleculesWithLonePairs,
  isElectron,
  CANVAS,
  getCameraPosition,
  useWindowSize,
  useAnalyticsEventTracker,
} from "./Globals";

/*
DEVELOPED AND DESIGNED BY JOHN SEONG.
USES GPAW (DENSITY FUNCTIONAL THEORY) FOR COMPUTATION PURPOSES.

HOW TO OPTIMIZE REACT + THREE-FIBER: https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance
PERIODIC TABLE REST API WRITTEN IN GOLANG: https://github.com/neelpatel05/periodic-table-api-go
*/

const moleculesWithMolecularOrbitals = [
  "C2H4",
  "H2O"
];

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

export default function Renderer() {
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

  const lightRef = useRef();
  const particleRef = useRef();

  const [particleRadius, setParticleRadius] = useState(0.015);
  const [reachedMaxPeak, setMaxPeak] = useState(false);
  const [reachedMinPeak, setMinPeak] = useState(true);
  const [addCoolEffects, setAddCoolEffects] = useState(false);
  const [zoomCameraConstant, setZoomCameraConstant] = useState(1.0);
  const [molecularOrbital, setMolecularOrbital] = useState(null);

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

  const globalCameraInfo = useSelector(
    (state) => state.cameraInfo.globalCameraInfo
  );

  const [animation, setAnimation] = useState(globalRenderInfo.animation);
  const [statusText, setStatusText] = useState(globalRenderInfo.statusText);
  const [disableButton, setDisableButton] = useState(
    globalRenderInfo.disableButton
  );
  const [preRender, setPreRender] = useState(globalRenderInfo.preRender);
  // const [currentElementArray, setCurrentElementArray] = useState(null);
  const [serverError, setServerError] = useState(globalRenderInfo.serverError);
  const [electronConfig, setElectronConfig] = useState([]);
  const [isHomo, setIsHomo] = useState(true);

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

  // Splits the electron config. String into an array...
  useEffect(() => {
    try {
      setElectronConfig(globalSelectedElement["electronConfig"].split(" "));
    } catch (error) {
      console.log(error);
    }
  }, [globalSelectedElement]);

  const fetchMoleculeSecondRenderElement = async (secondRenderElement) => {
    await axios({
      method: "GET",
      url: `${
        isElectron() ? "https://electronvisual.org" : ""
      }/api/load/${secondRenderElement}`,
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

  const fetchMoleculeCombinedRenderElement = async (
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
      url: `${
        isElectron() ? "https://electronvisual.org" : ""
      }/api/load/${firstRenderElement}`,
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
            bond_lengths: res.bond_lengths,
          }) || null
        );

        if (secondRenderElement !== null) {
          // Nested AXIOS method...
          fetchMoleculeSecondRenderElement(secondRenderElement);
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

  const fetchAtomRenderElement = async (renderElement) => {
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
      url: `${
        isElectron() ? "https://electronvisual.org" : ""
      }/api/loadSPH/${renderElement}`,
    })
      .then((response) => {
        const res = response.data;

        dispatch(
          setGlobalAtomInfo({
            x_coords: res.x_coords,
            y_coords: res.y_coords,
            z_coords: res.z_coords,
            n_value: res.n_value,
            l_value: res.l_value,
            m_value: res.m_value,
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

  const HSLColorBarLegend = () => {
    return (
      <div
        style={{
          display: "flex",
          height: "20px",
          overflow: "hidden",
          color: "black",
        }}
      >
        <div style={{ flex: 1, backgroundColor: "#7fffd4" }}>
          <p style={{ fontSize: "12px", textAlign: "center" }}>0</p>
        </div>
        <div style={{ flex: 1, backgroundColor: "#87CEEB" }}>
          <p style={{ fontSize: "12px", textAlign: "center" }}>0.2</p>
        </div>
        <div style={{ flex: 1, backgroundColor: "#3895D3" }}>
          <p style={{ fontSize: "12px", textAlign: "center" }}>0.4</p>
        </div>
        <div style={{ flex: 1, backgroundColor: "#C3B1E1" }}>
          <p style={{ fontSize: "12px", textAlign: "center" }}>0.6</p>
        </div>
        <div style={{ flex: 1, backgroundColor: "hsl(0, 50%, 75%)" }}>
          <p style={{ fontSize: "12px", textAlign: "center" }}>0.8</p>
        </div>
        <div style={{ flex: 1, backgroundColor: "hsl(60, 50%, 75%)" }}>
          <p style={{ fontSize: "12px", textAlign: "center" }}>1</p>
        </div>
      </div>
    );
  };

  const gaEventTracker = useAnalyticsEventTracker("Molecule Renderer");

  useEffect(() => {
    if (globalSelectedElement.element) {
      console.log(globalSelectedElement.element);
      setMolecularOrbital(
        `${globalSelectedElement.element}${isHomo ? "_HOMO" : "_LUMO"}`
      );
    }
  }, [globalSelectedElement.element, isHomo]);

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
        className="bg-gray-700 pb-20 text-center overflow-auto"
        style={{ minHeight: "100vh", width: "-webkit-fill-available" }}
      >
        <div className="text-rose-200 text-center pt-10 pb-10 ml-5 mr-5">
          <h1 className={`mb-5 ${size.width < 350 ? "scale-75" : null}`}>
            {globalSelectedElement["name"]}
            <span className="font-thin text-gray-400">. Visualized.</span>
          </h1>

          <p className="pr-5 pl-5 md:pl-60 md:pr-60 text-gray-400">
            {globalSelectedElement["description"]}
          </p>

          <div class="flex items-center justify-center pt-5">
            {!disableButton ? (
              <div class="grid grid-row-2 gap-4 content-center justify-items-center">
                <button
                  disabled={disableButton}
                  onClick={() => {
                    if (globalSelectedElement.type === "Molecule") {
                      gaEventTracker("Molecule Renderer", "Render");

                      if (
                        Object.keys(moleculesWithLonePairs).includes(
                          globalSelectedElement.element
                        )
                      ) {
                        fetchMoleculeCombinedRenderElement(
                          globalSelectedElement.element,
                          moleculesWithLonePairs[globalSelectedElement.element]
                        );
                        /*
                        e.g. H2O (Water) has a lone pair on the Oxygen atom, so we need to render the Oxygen atom as well...
                        Save oxygen atom's coordinates to subtract it from the water's coordinates to visualize the lone pairs...
                        */
                      } else if (globalSelectedElement.type === "Atom") {
                        fetchAtomRenderElement(globalSelectedElement.element);
                      } else {
                        fetchMoleculeCombinedRenderElement(
                          globalSelectedElement.element
                        );
                      }
                    } else {
                      fetchAtomRenderElement(globalSelectedElement.element);
                    }
                    setDisableButton(true);
                  }}
                  className="bg-transparent hover:bg-blue-500 text-white hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                  type="button"
                >
                  <span>View 3D Model</span>
                </button>
              </div>
            ) : preRender ? (
              <div className="text-gray-400 mt-5">
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
                {!globalAtomInfo.n_value ? (
                  <>
                    <div
                      style={{ whiteSpace: "pre-wrap" }}
                      className="flex flex-col items-center justify-center bg-white p-3 rounded scale-90 sm:scale-100"
                    >
                      <h2 className="text-black text-xl md:text-2xl">
                        {moleculeDict[globalSelectedElement.element][2] +
                          " | " +
                          moleculeDict[globalSelectedElement.element][4]}
                      </h2>

                      <div className="flex flex-row space-x-3 justify-center items-center">
                        <h2 className="text-black font-bold">
                          {moleculeDict[globalSelectedElement.element][7]}
                        </h2>
                      </div>

                      <h2 className="text-black text-xl md:text-2xl mb-5">
                        {moleculeDict[globalSelectedElement.element][3] +
                          " | " +
                          moleculeDict[globalSelectedElement.element][6] +
                          " hybrid"}
                      </h2>

                      {moleculesWithMolecularOrbitals.includes(globalSelectedElement.element) ? (
                        <Button
                          onClick={() => {
                            setIsHomo(!isHomo);
                          }}
                          variant="contained"
                          sx={{
                            marginLeft: "7.5em",
                            marginRight: "7.5em",
                            backgroundColor: "white",
                            color: "black",
                            borderColor: "black",
                            border: "3px solid",
                            "&:hover": {
                              backgroundColor: "lightgrey",
                            },
                          }}
                        >
                          {isHomo ? (
                            <span>
                              ORBITAL{" "}
                              <span className="bg-black font-bold text-white p-1 rounded">
                                HOMO
                              </span>{" "}
                              <span className="font-bold">
                                LUMO
                              </span>
                            </span>
                          ) : (
                            <span>
                              ORBITAL{" "}
                              <span className="font-bold">
                                HOMO{" "}
                              </span>
                              <span className="bg-black font-bold text-white p-1 rounded">
                                LUMO
                              </span>
                            </span>
                          )}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setAnimation(!animation);

                            if (!animation) {
                              setParticleRadius(0.01);

                              setMaxPeak(false);
                              setMinPeak(true);
                            }
                          }}
                          variant="contained"
                          sx={{
                            marginLeft: "7.5em",
                            marginRight: "7.5em",
                            backgroundColor: "white",
                            color: "black",
                            borderColor: "black",
                            border: "3px solid",
                            "&:hover": {
                              color: "white",
                              backgroundColor: "black",
                              borderColor: "black",
                            },
                          }}
                        >
                          <span className="font-bold">
                            {!animation
                              ? "Enable Animation"
                              : "Disable Animation"}
                          </span>
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center bg-white p-3 rounded scale-90 sm:scale-100">
                    <h2 className="text-black text-xl md:text-2xl font-bold mb-2">
                      Electron Config.
                    </h2>
                    <div className="flex flex-row space-x-3 justify-center items-center">
                      {electronConfig.map((config, index) => {
                        if (index !== 0) {
                          return (
                            <button
                              className={`border-2 p-2 border-black rounded ${
                                index === electronConfig.length - 1
                                  ? "bg-black"
                                  : "bg-white hover:bg-gray-200"
                              }`}
                              type="button"
                            >
                              <h2
                                className={`${
                                  index === electronConfig.length - 1
                                    ? "text-white"
                                    : "text-black"
                                }`}
                              >
                                {config}
                              </h2>
                            </button>
                          );
                        } else {
                          return <h2 className="text-black">{config}</h2>;
                        }
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          className="bg-gray-800 text-center text-gray-400 ml-10 mr-10 md:ml-40 md:mr-40 rounded"
          style={{ width: CANVAS.WIDTH, height: CANVAS.HEIGHT }}
        >
          {!preRender && globalSelectedElement["type"] === "Molecule" && (
            <div
              className="absolute"
              style={{
                zIndex: 10,
                backgroundColor: "black",
                left: "50%",
                transform: "translate(-50%, 0%)",
              }}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col">
                  <p className="pt-2 pl-2 pr-2 text-sm md:text-xl">
                    Electron Density
                  </p>
                </div>
              </div>
              <HSLColorBarLegend />
            </div>
          )}

          {!preRender && globalAtomInfo.n_value && (
            <div
              className="absolute"
              style={{
                zIndex: 10,
                backgroundColor: "black",
                left: "50%",
                transform: "translate(-50%, 0%)",
              }}
            >
              <div className="flex flex-col">
                <p className="pt-2 pl-2 pr-2 font-bold text-sm md:text-xl">
                  Quantum Num.
                </p>
                <p className="pl-2 pr-2 pb-2 text-sm md:text-xl">
                  N = {globalAtomInfo.n_value}&nbsp;&nbsp;&nbsp;&nbsp;L ={" "}
                  {globalAtomInfo.l_value}&nbsp;&nbsp;&nbsp;&nbsp;M
                  <sub>l</sub> = {globalAtomInfo.m_value}
                </p>
              </div>
            </div>
          )}

          {preRender && (
            <div
              className="absolute"
              style={{
                zIndex: 10,
                backgroundColor: "black",
                left: "50%",
                transform: "translate(-50%, 0%)",
              }}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col">
                  <p className="p-2 text-sm md:text-xl">
                    Drag or zoom using your finger or a mouse cursor...
                  </p>
                </div>
              </div>
            </div>
          )}

          <Canvas
            gl={{ version: 2 }}
            camera={getCameraPosition(globalSelectedElement["element"])}
          >
            <Provider store={store}>
              {!preRender && (
                <Controls />
              )}
            </Provider>

            {preRender && (
              <Suspense fallback={null}>

              </Suspense>
            )}

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

            {globalAtomInfo && !preRender && (
              <Provider store={store}>
                {/* {globalSelectedElement.type === "Molecule" &&
                  globalAtomInfo.atoms_x.map((value, index) => {
                    return (
                      <>
                        <mesh>
                          <Atoms
                            position={[
                              globalAtomInfo.atoms_x[index],
                              globalAtomInfo.atoms_y[index],
                              globalAtomInfo.atoms_z[index],
                            ]}

                            // colour={globalAtomInfo["atomic_color"][currentElementArray[index]]}
                          />

                          {Object.values(
                            bondShapeDict[globalSelectedElement.element]
                          ).map((value) => {
                            return (
                              <>
                                <BondLine
                                  coords={[
                                    globalAtomInfo["atoms_x"][value[0]],
                                    globalAtomInfo["atoms_y"][value[0]],
                                    globalAtomInfo["atoms_z"][value[0]],
                                    globalAtomInfo["atoms_x"][value[1]],
                                    globalAtomInfo["atoms_y"][value[1]],
                                    globalAtomInfo["atoms_z"][value[1]],
                                  ]}
                                />
                              </>
                            );
                          })}
                        </mesh>
                      </>
                    );
                  })} */}
                {globalSelectedElement.type === "Atom" ? (
                  <primitive object={new THREE.AxesHelper(5)} />
                ) : (
                  <>
                    {globalSelectedElement.element &&
                      moleculesWithMolecularOrbitals.includes(globalSelectedElement.element) &&
                      molecularOrbital !== null && (
                        <GLBViewer name={molecularOrbital} />
                      )}
                  </>
                )}

                <Particles
                  particleRef={particleRef}
                  lightRef={lightRef}
                  particleRadius={particleRadius}
                />
              </Provider>
            )}

            <gridHelper args={[10, 9, "gray"]} />
          </Canvas>
        </div>

        {!preRender && moleculesWithMolecularOrbitals.includes(globalSelectedElement.element) && (
          <Diagram name={globalSelectedElement.name.toLowerCase().replace(/ /g, "_") + "_energy_diagram"} />
        )}

        <div class="p-5" />
      </div>
    </>
  );
}
