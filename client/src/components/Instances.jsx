import React, { useRef, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";

import * as THREE from "three";

import { getMoleculeColour, normalizeData } from "./Globals";

/*
▀█▀ █▀▀▄ █▀▀ ▀▀█▀▀ █▀▀█ █▀▀▄ █▀▀ █▀▀ █▀▀ 
▒█░ █░░█ ▀▀█ ░░█░░ █▄▄█ █░░█ █░░ █▀▀ ▀▀█ 
▄█▄ ▀░░▀ ▀▀▀ ░░▀░░ ▀░░▀ ▀░░▀ ▀▀▀ ▀▀▀ ▀▀▀

DEVELOPED AND DESIGNED BY JOHN SEONG.
SERVED UNDER THE MIT LICENSE.
*/

export function Particles({ particleRadius }) {
  /*
  This is a component of React that generates multiple instances of sphere (individual particles)
  depending on the parameters that are recorded on its blueprint, which is defined in this function

  Parameters
  ----------
  particleRadius: Float
    Contains the desired radius of the particles as a group

  Returns
  -------
  DOM File
    A HTML markup that contains graphical elements; in this case,
    containing instanced mesh that can be replicated throughout the canvas
  */
  const meshRef = useRef();

  const globalAtomInfo = useSelector((state) => state.atomInfo.globalAtomInfo);

  const globalSelectedElement = useSelector(
    (state) => state.selectedElement.globalSelectedElement
  );

  // Write the coordinates based upon its parent JSON data stored in the Redux global state...
  const particles = useMemo(() => {
    const temp = [];
    const temp2 = [];

    for (const [key, value] of Object.entries(globalAtomInfo["density_data"])) {
      const coords = key.split(", ");
      
      // Normalize the density data in range from 0 to 1...
      const volume = normalizeData(
        value,
        globalAtomInfo["vmax"],
        globalAtomInfo["vmin"]
      );

      // Phase shift and scale the coordinates to match the existing molecule shape that is already generated....
      const x = coords[0] / 5 - 10.7;
      const y = coords[1] / 5 - 10.7;
      const z = coords[2] / 5 - 10.7;

      temp.push({ x, y, z, volume });
    }

    if (globalSelectedElement["element"] === "H2O") {
      /*
      Somehow let the server know that this is the second render,
      and contraint the data little more than normal? or maybe leave it like this...
      */
      // for (const [key, value] of Object.entries(globalAtomInfo["density_data2"])) {
      //   const coords = key.split(", ");
        
      //   // Normalize the density data in range from 0 to 1...
      //   const volume = normalizeData(
      //     value,
      //     globalAtomInfo["vmax"],
      //     globalAtomInfo["vmin"]
      //   );
  
      //   // Phase shift and scale the coordinates to match the existing molecule shape that is already generated....
      //   const x = coords[0] / 5 - 10.7;
      //   const y = coords[1] / 5 - 10.7;
      //   const z = coords[2] / 5 - 10.7;
        
      //   temp2.push({ x, y, z, volume });
      // }
    }
    // Remove all the duplicate subarrays between temp and temp2 arrays
    // return temp.filter(val => !temp2.includes(val));
    return temp;
  }, [globalAtomInfo, globalSelectedElement]);

  // Anonymous states for instances...
  const anonymousObject = useMemo(() => new THREE.Object3D(), []);
  const anonymousColour = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    particles.forEach((particle, index) => {
      const { x, y, z, volume } = particle;

      const currentColour = getMoleculeColour(
        globalSelectedElement["element"],
        volume
      );

      console.log(globalSelectedElement["element"]);

      anonymousObject.position.set(x, y, z);

      anonymousObject.updateMatrix();

      // Apply the matrix to the instanced item...
      meshRef.current.setMatrixAt(index, anonymousObject.matrix);
      meshRef.current.setColorAt(index, anonymousColour.set(currentColour));
    });
    /*
    The lines below are arguably the most important part in this code.
    Without them, the changes will not be applied
    and the instances will not be updated accordingly.
    */
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
    meshRef.current.material.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[null, null, Object.keys(globalAtomInfo["density_data"]).length]}
      >
        <sphereBufferGeometry
          args={[particleRadius, 30, 30]}
          attach="geometry"
        />

        <meshBasicMaterial attach="material" />
      </instancedMesh>
    </>
  );
}
