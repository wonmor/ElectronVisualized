import React, { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";

import * as THREE from "three";

import { getMoleculeColour, normalizeData, getAtomColour } from "./Globals";

/*
▀█▀ █▀▀▄ █▀▀ ▀▀█▀▀ █▀▀█ █▀▀▄ █▀▀ █▀▀ █▀▀ 
▒█░ █░░█ ▀▀█ ░░█░░ █▄▄█ █░░█ █░░ █▀▀ ▀▀█ 
▄█▄ ▀░░▀ ▀▀▀ ░░▀░░ ▀░░▀ ▀░░▀ ▀▀▀ ▀▀▀ ▀▀▀

DEVELOPED AND DESIGNED BY JOHN SEONG.
SERVED UNDER THE MIT LICENSE.

TIPS & TRICKS

Cannot convert undefined or null to object in react + redux FIX:
https://stackoverflow.com/questions/43641685/cannot-convert-undefined-or-null-to-object-in-react

*/

export function Particles({ particleRef, lightRef, particleRadius }) {
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
  const meshRef = particleRef;

  const globalAtomInfo = useSelector((state) => state.atomInfo.globalAtomInfo);

  const globalSelectedElement = useSelector(
    (state) => state.selectedElement.globalSelectedElement
  );

  // Write the coordinates based upon its parent JSON data stored in the Redux global state...
  const particles = useMemo(() => {
    let temp = [];
    let isColourException = false;

    if (globalSelectedElement["type"] === "Molecule" && globalAtomInfo["density_data"]) {
      for (const [key, value] of Object.entries(
        globalAtomInfo["density_data"]
      )) {
        if (globalAtomInfo["density_data2"]) {
          if (key in globalAtomInfo["density_data2"]) {
            isColourException = true;
          } else {
            isColourException = false;
          }
        }
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

        temp.push({ x, y, z, volume, isColourException });
      }
      
    } else if (globalSelectedElement["type"] === "Atom" && globalAtomInfo["z_coords"]) {
      for (let i = 0; i < globalAtomInfo["z_coords"].length; i++) {
        const currentXCoords = globalAtomInfo["x_coords"][i];
        const currentYCoords = globalAtomInfo["y_coords"][i];
        const currentZCoords = globalAtomInfo["z_coords"][i];
        
        const x = currentXCoords / 10 - 8;
        const y = currentYCoords / 10 - 8;
        const z = currentZCoords / 10 - 8;

        const volume = 0;
        
        temp.push({ x, y, z, volume, isColourException });
      }
    }

    console.log(temp)
    return temp;
  }, [globalAtomInfo, globalSelectedElement]);

  // Anonymous states for instances...
  const anonymousObject = useMemo(() => new THREE.Object3D(), []);
  const anonymousColour = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    particles.forEach((particle, index) => {
      const { x, y, z, volume, isColourException } = particle;
      let currentColour;

      if (globalSelectedElement["type"] === "Molecule") {
        currentColour = getMoleculeColour(
          globalSelectedElement["element"],
          volume
        );

        if (isColourException) {
          currentColour = getMoleculeColour(
            globalSelectedElement["element"],
            volume,
            true
          );
        }
      }

      if (globalSelectedElement["type"] === "Atom") {
        currentColour = getAtomColour(globalSelectedElement["element"]);

        if (isColourException) {
          currentColour = "#FFFF00";
        }
      }

      anonymousObject.position.set(x, y, z);

      // Add code to differentiate the boundaries between the shells...

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
    <instancedMesh
      ref={meshRef}
      args={[null, null, globalSelectedElement["type"] === "Molecule" ? Object.keys(globalAtomInfo["density_data"]).length : globalAtomInfo["z_coords"].length]}
    >
        <ambientLight ref={lightRef} />
        <sphereBufferGeometry
          args={[particleRadius, 30, 30]}
          attach="geometry"
        />
        <meshBasicMaterial attach="material" />
    </instancedMesh>
  );
}
