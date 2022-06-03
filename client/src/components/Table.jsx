import { useState, useEffect } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";

import store from "../store";

import * as THREE from 'three'

// A MUST — MAKE SURE THAT YOU WRITE CURLY BRACKETS NEXT TO IMPORT!
import { setGlobalAtomInfo } from "../states/atomInfoSlice";

import axios from "axios";

import { Canvas } from "@react-three/fiber";

import { Atoms, Particles, BondLine } from "./Renderer";
import Controls from "./Controls";

import CANVAS, { RENDERER } from "./Constants";

var coordinates = [];


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

  var atoms_x, atoms_y, atoms_z, no_of_atoms, lineCoordinates;

  if (globalAtomInfo != null) {
    atoms_x = globalAtomInfo["atoms_x"];
    atoms_y = globalAtomInfo["atoms_y"];
    atoms_z = globalAtomInfo["atoms_z"];
    no_of_atoms = globalAtomInfo["no_of_atoms"];

    lineCoordinates = genLineCoords(atoms_x, atoms_y, atoms_z, no_of_atoms)
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
                randomParticles(atoms_x, atoms_y, atoms_z, index);

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
              {coordinates.map((value, index) => {
                return <Particles position={value} />
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

const randomSpherePoint = (x0, y0, z0, radius) => {
  /*
  A function that computes the coordinates for the random points used as a placeholder

  Parameters
  ----------
  x0: Float
    The x-coordinate of the position of the sphere
  y0: Float
    The y-coordinate of the position of the sphere
  z0: Float
    The z-coordinate of the position of the sphere
  radius: Float
    The value of the radius of the target sphere

  Returns
  -------
  Array
    Contains the x, y, and z coordinates of the random point that is generated
  */
  var u = Math.random();
  var v = Math.random();

  var theta = 2 * Math.PI * u;
  var phi = Math.acos(2 * v - 1);

  var x = x0 + radius * Math.sin(phi) * Math.cos(theta);
  var y = y0 + radius * Math.sin(phi) * Math.sin(theta);
  var z = z0 + radius * Math.cos(phi);

  return [x, y, z];
}

const genLineSegments = (lineCoordinates) => {
  /*
  This is a component function in JSX that dictates the behaviour of the line segment that connects two atoms (expresses the VSEPR shape and bond type)

  Parameters
  ----------
  lineCoordinates: Array
    Contains all the coordinates that the bond line (sigma bond, pi bond etc.) should be at

  Returns
  -------
  DOM File
    A HTML markup that contains graphical elements
  */
  for (var i = 0; i < lineCoordinates.length; i++) {
    if (i !== (lineCoordinates.length - 1)) {
      return <BondLine start={lineCoordinates[i]} end={lineCoordinates[i + 1]} />
    }
  }
}

const genLineCoords = (atoms_x, atoms_y, atoms_z, no_of_atoms) => {
  /*
  A function that computes the coordinates for the random points used as a placeholder

  Parameters
  ----------
  atoms_x: Array
    Contains the x-coordinates of atom's position
  atoms_y: Array
    Contains the y-coordinates of atom's position
  atoms_z: Array
    Contains the z-coordinates of atom's position
  no_of_atoms: Integer
    Essentially the number of atoms present

  Returns
  -------
  Array
    Contains the x, y, and z coordinates of all vector locations of where the line should be at
  */
  var vertices = []

  for (var i = 0; i < no_of_atoms.length; i++) {
    vertices.push(new THREE.Vector3(atoms_x[i], atoms_y[i], atoms_z[i]))
  }

  return vertices;
}

const randomParticles = (atoms_x, atoms_y, atoms_z, no_of_atoms) => {
  /*
  A function that generates random points on the sphere (for placeholder purposes when the server has failed)

  Parameters
  ----------
  atoms_x: Array
    Contains the x-coordinates of atom's position
  atoms_y: Array
    Contains the y-coordinates of atom's position
  atoms_z: Array
    Contains the z-coordinates of atom's position
  no_of_atoms: Integer
    Essentially the number of atoms present

  Returns
  -------
  None
  */
  for (var i = 0; i < 60; i++) {
    coordinates.push(
      randomSpherePoint(
        atoms_x[no_of_atoms],
        atoms_y[no_of_atoms],
        atoms_z[no_of_atoms],
        2.0
      )
    );
  }
};
