import { extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import React from "react";

extend({ OrbitControls });

export default function Controls() {
  /*
  This is a component function in JSX

  Parameters
  ----------
  None

  Returns
  -------
  React Property
    Contains the information regarding the Orbit Controls (a.k.a. Camera) property under React-ThreeJS library
  */
  const { camera, gl } = useThree();

  return (
    <orbitControls
      enableZoom={true}
      minDistance={5}
      maxDistance={30}
      args={[camera, gl.domElement]}
    />
  );
}