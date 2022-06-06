import React, { useRef, useState } from "react";

import * as THREE from "three";

import { extend } from "@react-three/fiber";

import { Line2, LineGeometry, LineMaterial } from "three-fatline";

import { RENDERER } from "./Constants";

/*
░█▀▀█ ░█▀▀▀ ░█▄─░█ ░█▀▀▄ ░█▀▀▀ ░█▀▀█ ░█▀▀▀ ░█▀▀█ 
░█▄▄▀ ░█▀▀▀ ░█░█░█ ░█─░█ ░█▀▀▀ ░█▄▄▀ ░█▀▀▀ ░█▄▄▀ 
░█─░█ ░█▄▄▄ ░█──▀█ ░█▄▄▀ ░█▄▄▄ ░█─░█ ░█▄▄▄ ░█─░█
*/

extend({ LineGeometry, LineMaterial });

export function Atoms(props) {
  /*
  This is a component function in JSX

  Parameters
  ----------
  None

  Returns
  -------
  React Property
    Contains the information regarding mesh (in this case, atoms) under React-ThreeJS library
  */
  const mesh = useRef();

  const [active, setActive] = useState(false);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1, 1, 1]}
      onClick={(e) => setActive(!active)}
    >
      <sphereBufferGeometry
        args={[RENDERER.ATOM_RADIUS, 30, 30]}
        attach="geometry"
      />

      <meshBasicMaterial
        color={0xfff1ef}
        opacity={0.2}
        transparent={true}
        attach="material"
      />
    </mesh>
  );
}

export function BondLine({ start, end }) {
  /*
  This is a component function in JSX

  Parameters
  ----------
  start: Integer
    Specify the start point
  end: Integer
    Specify the end point

  Returns
  -------
  React Property
    Contains the information regarding mesh (in this case, tube that connects two atoms) under React-ThreeJS library
  */
  const geometry = new LineGeometry();

  geometry.setPositions(start.concat(end)); // [ x1, y1, z1,  x2, y2, z2, ... ] format

  const material = new LineMaterial({
    color: "hotpink",
    linewidth: 5, // px
    resolution: new THREE.Vector2(640, 480), // resolution of the viewport
    transparent: true,
    opacity: 0.2,
    // dashed, dashScale, dashSize, gapSize
  });

  const lineSegment = new Line2(geometry, material);

  lineSegment.computeLineDistances();

  return <primitive object={lineSegment} position={[0, 0, 0]} />;
}
