import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";

import { Box, Slider, Button } from "@mui/material";

import store from "../store";

// A MUST — MAKE SURE THAT YOU WRITE CURLY BRACKETS NEXT TO IMPORT!
import { setGlobalAtomInfo } from "../states/atomInfoSlice";

import axios from "axios";

import { Canvas } from "@react-three/fiber";

import { Atoms, BondLine } from "./Renderer";

import Controls from "./Controls";

import CANVAS from "./Constants";

function normalizeData(val, max, min) {
  return (val - min) / (max - min);
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default function Element() {
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

  const [disable, setDisable] = useState(false);
  const [preRender, setPreRender] = useState(true);
  const [serverError, setServerError] = useState(false);

  const [statusText, setStatusText] = useState("Rendering in Progress...");
  const [particleRadius, setParticleRadius] = useState(0.025);

  const [reachedMaxPeak, setMaxPeak] = useState(false);
  const [reachedMinPeak, setMinPeak] = useState(true);

  const [animation, setAnimation] = useState(true);

  const globalAtomInfo = useSelector((state) => state.atomInfo.globalAtomInfo);

  const dispatch = useDispatch();

  useInterval(() => {
    if (animation) {
      if (!reachedMaxPeak || reachedMinPeak) {
        setParticleRadius(particleRadius + 0.01);
      }
      if (!reachedMinPeak || reachedMaxPeak) {
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
    }
  }, 1500);

  const update = async () => {
    await axios({
      method: "GET",
      url: "/api/plot",
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
    setParticleRadius(value);
  };

  var atoms_x, atoms_y, atoms_z, density_data;

  // Define local variables
  if (globalAtomInfo != null) {
    atoms_x = globalAtomInfo["atoms_x"];
    atoms_y = globalAtomInfo["atoms_y"];
    atoms_z = globalAtomInfo["atoms_z"];

    density_data = globalAtomInfo["density_data"];
  }

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
          number is <b>1</b> and its mass is <b>1 AMU</b>. Its gas form consists
          of two <b>Hydrogen</b> atoms, forming a <b>Sigma</b> bond.
        </p>
        <div class="gap-3 flex items-center justify-center pt-5">
          {!disable ? (
            <button
              disabled={disable}
              onClick={() => {
                update();
                setDisable(true);
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
              {atoms_x.map((value, index) => {
                return (
                  <>
                    <Atoms
                      position={[
                        atoms_x[index],
                        atoms_y[index],
                        atoms_z[index],
                      ]}
                    />
                  </>
                );
              })}
              {Object.keys(density_data).map((key, index) => {
                var coords = key.split(", ");
                var volume = density_data[key];
                // Save the global variable...
                // dispatch(setCurrentVolume(density_data[key]) || 0.0);

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
                start={[atoms_x[0], atoms_y[0], atoms_z[0]]}
                end={[atoms_x[1], atoms_y[1], atoms_z[1]]}
              />
            </Provider>
          )}

          <gridHelper args={[undefined, undefined, "white"]} />
        </Canvas>
      </div>
    </div>
  );
}
