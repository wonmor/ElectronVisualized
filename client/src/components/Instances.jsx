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
    const pointCloudRef = particleRef;

    const globalAtomInfo = useSelector((state) => state.atomInfo.globalAtomInfo);
  
    const globalSelectedElement = useSelector(
      (state) => state.selectedElement.globalSelectedElement
    );

  // Write the coordinates based upon its parent JSON data stored in the Redux global state...
  const particles = useMemo(() => {
    let temp = [];
    let isColourException = false;

    if (
      globalSelectedElement["type"] === "Molecule" &&
      globalAtomInfo["density_data"]
    ) {
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
    } else if (
      globalSelectedElement["type"] === "Atom" &&
      globalAtomInfo["z_coords"]
    ) {
      for (let i = 0; i < globalAtomInfo["z_coords"].length; i++) {
        const currentXCoords = globalAtomInfo["x_coords"][i];
        const currentYCoords = globalAtomInfo["y_coords"][i];
        const currentZCoords = globalAtomInfo["z_coords"][i];

        const x = currentXCoords / 10;
        const y = currentYCoords / 10;
        const z = currentZCoords / 10;

        const volume = 0;

        temp.push({ x, y, z, volume, isColourException });
      }
    }

    console.log(temp);
    return temp;
  }, [globalAtomInfo, globalSelectedElement]);

  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const color = new THREE.Color();

    particles.forEach((particle) => {
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

      positions.push(x, y, z);
      color.set(currentColour);
      colors.push(color.r, color.g, color.b);
    });

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    return geometry;
  }, [particles, globalSelectedElement]);

  return (
    <points ref={pointCloudRef} args={[pointsGeometry]}>
      <ambientLight ref={lightRef} />
      <pointsMaterial
        attach="material"
        size={particleRadius * 5}
        vertexColors={THREE.VertexColors}
      />
    </points>
  );
}