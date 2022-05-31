import { extend, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import React from "react";

extend({ OrbitControls });

export default function Controls() {
  const { camera, gl } = useThree();

  return (
    <orbitControls
      enableZoom={true}
      args={[camera, gl.domElement]}
    />
  );
}