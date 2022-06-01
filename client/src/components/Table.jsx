import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

// A MUST — MAKE SURE THAT YOU WRITE CURLY BRACKETS NEXT TO IMPORT!
import { setGlobalAtomInfo } from '../states/atomInfoSlice'

import axios from "axios";

import { Canvas } from "react-three-fiber";

import Renderer from "./Renderer";
import Controls from "./Controls";

import CANVAS from "./Constants";

export default function Table() {
  const [atomInfo, setAtomInfo] = useState(null);

  const globalAtomInfo = useSelector((state) => state.atomInfo.value)
  const dispatch = useDispatch()

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

  console.log(globalAtomInfo);

  return (
    <div className="bg-gray-700">
      <div className="text-white text-center pt-10 pb-10">
        <h1>Hydrogen</h1>
        <p className="pt-5">
          The first element in the periodic table. The atomic number is 1 and
          its mass is 1 AMU.
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
          <Renderer position={[-1.2, 0, 0]} />
          <Renderer position={[2.5, 0, 0]} />
          <gridHelper args={[undefined, undefined, "white"]} />
        </Canvas>
      </div>
    </div>
  );
}
