import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { getMoleculeColour } from "./Globals";

const ColorToHex = (color) => {
  var hexadecimal = color.toString(16);
  return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
};

const ConvertRGBtoHex = (red, green, blue) => {
  return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
};

export function Particles({ particleRadius }) {
  const mesh = useRef();

  const globalAtomInfo = useSelector((state) => state.atomInfo.globalAtomInfo);

  const globalSelectedElement = useSelector(
    (state) => state.selectedElement.globalSelectedElement
  );

  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (const [key, value] of Object.entries(globalAtomInfo["density_data"])) {
      const coords = key.split(", ");
      const volume = value;

      const x = coords[0] / 5 - 10.7;
      const y = coords[1] / 5 - 10.7;
      const z = coords[2] / 5 - 10.7;

      temp.push({ x, y, z, volume });
    }
    return temp;
  }, [globalAtomInfo]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const dummyColour = useMemo(() => new THREE.Color(), []);

  // const tint = useMemo(() => new THREE.InstancedBufferAttribute( new Uint8Array( 100 * 3 ), 3, true ), []);

  useEffect(() => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, index) => {
      const { x, y, z, volume } = particle;

      const colours = getMoleculeColour(
        globalSelectedElement["element"],
        volume
      );

      console.log(globalSelectedElement["element"]);

      // Update the particle position based on the time
      // This is mostly random trigonometry functions to oscillate around the (x, y, z) point
      dummy.position.set(x, y, z);

      // Derive an oscillating value which will be used
      // for the particle size and rotation
      dummy.updateMatrix();

      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(index, dummy.matrix);
      mesh.current.setColorAt(
        index,
        dummyColour.set(ConvertRGBtoHex(...colours))
      );
      mesh.current.material.needsUpdate = true;
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh
        ref={mesh}
        args={[null, null, Object.keys(globalAtomInfo["density_data"]).length]}
      >
        <sphereBufferGeometry
          args={[particleRadius, 30, 30]}
          attach="geometry"
        />
        <meshPhongMaterial attach="material" />
      </instancedMesh>
    </>
  );
}
