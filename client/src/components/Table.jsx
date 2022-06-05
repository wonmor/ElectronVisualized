import { useState, useEffect } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";

import store from "../store";

// A MUST — MAKE SURE THAT YOU WRITE CURLY BRACKETS NEXT TO IMPORT!
import { setGlobalAtomInfo } from "../states/atomInfoSlice";

import axios from "axios";

import { Canvas } from "@react-three/fiber";

import { Atoms, Particles, BondLine } from "./Renderer";
import Controls from "./Controls";

import CANVAS from "./Constants";

export default function Table() {
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
  const [atomInfo, setAtomInfo] = useState(null);

  const globalAtomInfo = useSelector((state) => state.atomInfo.value);
  const dispatch = useDispatch();

  const update = () => {
    axios({
      method: "GET",
      url: "/api/plot",
    })
      .then((response) => {
        const res = response.data;
        setAtomInfo({
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

          density_data: res.density_data
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  useEffect(update, []);

  var atoms_x, atoms_y, atoms_z, density_data;

  // Define local variables
  if (globalAtomInfo != null) {
    atoms_x = globalAtomInfo["atoms_x"];
    atoms_y = globalAtomInfo["atoms_y"];
    atoms_z = globalAtomInfo["atoms_z"];

    density_data = globalAtomInfo["density_data"]
  }

  return (
    <div className="bg-gray-700">
      <div className="text-white text-center pt-10 pb-10">
        <h1>Hydrogen Gas</h1>
        <p className="pt-5">
          Hydrogen is the first element in the periodic table. The atomic number is 1 and
          its mass is 1 AMU. Its gas form consists of two Hydrogen atoms bonded together (Sigma Bond).
        </p>
        <div class="gap-3 flex items-center justify-center pt-5">
          <button
            onClick={() => {
              update();
              dispatch(setGlobalAtomInfo(atomInfo) || null);
            }}
            className="bg-transparent hover:bg-blue-500 text-white hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
            type="button "
          >
            <span>Start Rendering</span>
          </button>
        </div>
      </div>
      <div style={{ width: CANVAS.WIDTH, height: CANVAS.HEIGHT }}>
        <Canvas camera={{ fov: 30, position: [-5, 8, 8] }}>
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
                
                return <Particles position={[coords[0] / 5 - 10.7, coords[1] / 5 - 10.7, coords[2] / 5 - 10.7]} />
              })}
              <BondLine start={[atoms_x[0], atoms_y[0], atoms_z[0]]} end={[atoms_x[1], atoms_y[1], atoms_z[1]]} />
            </Provider>
          )}

          <gridHelper args={[undefined, undefined, "white"]} />
        </Canvas>
      </div>
    </div>
  );
}