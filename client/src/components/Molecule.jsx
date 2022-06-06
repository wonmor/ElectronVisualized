import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";

import { Box, Slider, Button } from "@mui/material";

import store from "../store";

// A MUST — MAKE SURE THAT YOU WRITE CURLY BRACKETS NEXT TO IMPORT!
import { setGlobalAtomInfo } from "../states/atomInfoSlice";

import { setGlobalRenderInfo } from "../states/renderInfoSlice";

import axios from "axios";

import { Canvas } from "@react-three/fiber";

import { Atoms, BondLine } from "./Renderer";

import Controls from "./Controls";

import CANVAS from "./Constants";

/*
░█▀▄▀█ ░█▀▀▀█ ░█─── ░█▀▀▀ ░█▀▀█ ░█─░█ ░█─── ░█▀▀▀ 
░█░█░█ ░█──░█ ░█─── ░█▀▀▀ ░█─── ░█─░█ ░█─── ░█▀▀▀ 
░█──░█ ░█▄▄▄█ ░█▄▄█ ░█▄▄▄ ░█▄▄█ ─▀▄▄▀ ░█▄▄█ ░█▄▄▄
*/

const normalizeData = (val, max, min) => {
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
  const [particleRadius, setParticleRadius] = useState(0.025);

  const [reachedMaxPeak, setMaxPeak] = useState(false);
  const [reachedMinPeak, setMinPeak] = useState(true);

  /*
  Define that React and Redux states: former being used locally, and the latter being used globally.
  The purpose of using constants is due to its high efficiency when it comes to memory management.
  */

  const globalAtomInfo = useSelector((state) => state.atomInfo.globalAtomInfo);

  const globalRenderInfo = useSelector(
    (state) => state.renderInfo.globalRenderInfo
  );

  const [animation, setAnimation] = useState(globalRenderInfo["animation"]);

  const [statusText, setStatusText] = useState(globalRenderInfo["statusText"]);

  const [disableButton, setDisableButton] = useState(
    globalRenderInfo["disableButton"]
  );

  const [preRender, setPreRender] = useState(globalRenderInfo["preRender"]);

  const [serverError, setServerError] = useState(
    globalRenderInfo["serverError"]
  );

  const dispatch = useDispatch();

  // Handles the breathing animation event... needs more memoryr optimization though!
  useLazyInterval(() => {
    if (animation) {
      if (!reachedMaxPeak || reachedMinPeak) {
        setParticleRadius(particleRadius + 0.01);
      } else {
        setParticleRadius(particleRadius - 0.01);
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
  }, 1500); // Execute every 1.5 seconds

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

  const update = async () => {
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
      url: "/api/molecule",
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
        setPreRender(false);
      })
      .catch((error) => {
        if (error.response) {
          setStatusText("Server communication error has occured!");
          setServerError(true);

          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
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
    <div className="bg-gray-700" style={{ "min-height": "100vh" }}>
      <div className="text-white text-center pt-10 pb-10">
        <h1>
          Hydrogen Gas. <span className="text-gray-400">Visualized.</span>
        </h1>

        <h2 className="mt-5 pb-5 text-gray-400 border-b border-gray-400">
          Simulated <span className="text-white">Real-Time</span> using{" "}
          <span className="text-white">GPAW</span> and{" "}
          <span className="text-white">ASE</span>.
        </h2>

        <p className="pt-5 pr-5 pl-5 text-gray-400">
          <b>Hydrogen</b> is the first element in the periodic table. The atomic
          number is <b>1</b> and its mass is <b>1.01 g/mol</b>. Its gas form
          consists of two <b>Hydrogen</b> atoms, forming a <b>Sigma</b> bond.
        </p>

        <div class="gap-3 flex items-center justify-center pt-5">
          {!disableButton ? (
            <button
              disabled={disableButton}
              onClick={() => {
                update();
                setDisableButton(true);
              }}
              className="absolute mt-10 bg-transparent hover:bg-blue-500 text-gray-400 hover:text-white py-2 px-4 border border-gray-400 hover:border-transparent rounded"
              type="button"
            >
              <span>Start Rendering</span>
            </button>
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
            <Box
              component="span"
              sx={{
                p: 2,
                border: "1px dashed grey",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
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
            </Box>
          )}
        </div>
      </div>

      <div style={{ width: CANVAS.WIDTH, height: CANVAS.HEIGHT }}>
        <Canvas camera={{ fov: 35, position: [-5, 8, 8] }}>
          <Controls />

          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          {globalAtomInfo && (
            <Provider store={store}>
              {globalAtomInfo["atoms_x"].map((value, index) => {
                return (
                  <>
                    <Atoms
                      position={[
                        globalAtomInfo["atoms_x"][index],
                        globalAtomInfo["atoms_y"][index],
                        globalAtomInfo["atoms_z"][index],
                      ]}
                    />
                  </>
                );
              })}

              {Object.keys(globalAtomInfo["density_data"]).map((key, index) => {
                const coords = key.split(", ");
                const volume = globalAtomInfo["density_data"][key];

                return (
                  // Generate particles...
                  <mesh
                    position={[
                      coords[0] / 5 - 10.7,
                      coords[1] / 5 - 10.7,
                      coords[2] / 5 - 10.7,
                    ]}
                    scale={[1, 1, 1]}
                  >
                    <sphereBufferGeometry
                      args={[particleRadius, 30, 30]}
                      attach="geometry"
                    />

                    <meshBasicMaterial
                      transparent={true}
                      opacity={normalizeData(volume, 1, 0) / 50}
                      color={`rgb(255, ${Math.round(
                        255.0 - volume * 2.5
                      )}, ${Math.round(255.0 - volume * 2.5)})`}
                      attach="material"
                    />
                  </mesh>
                );
              })}

              <BondLine
                start={[
                  globalAtomInfo["atoms_x"][0],
                  globalAtomInfo["atoms_y"][0],
                  globalAtomInfo["atoms_z"][0],
                ]}
                end={[
                  globalAtomInfo["atoms_x"][1],
                  globalAtomInfo["atoms_y"][1],
                  globalAtomInfo["atoms_z"][1],
                ]}
              />
            </Provider>
          )}

          <gridHelper args={[undefined, undefined, "white"]} />
        </Canvas>
      </div>
    </div>
  );
}
