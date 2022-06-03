import React, { useRef, useState, useLayoutEffect } from "react";

import * as THREE from "three";

import { RENDERER } from "./Constants";

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
        opacity={0.1}
        transparent={true}
        attach="material"
      />
    </mesh>
  );
}

export function Particles(props) {
  /*
  This is a component function in JSX

  Parameters
  ----------
  None

  Returns
  -------
  React Property
    Contains the information regarding mesh (in this case, particles) under React-ThreeJS library
  */
  const mesh = useRef();

  const [active, setActive] = useState(false);

  //   useFrame(() => {
  //     mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  //   });

  // Make sure you MANUALLY collect all the garbage!

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1, 1, 1]}
      onClick={(e) => setActive(!active)}
    >
      <sphereBufferGeometry
        args={[RENDERER.PARTICLE_RADIUS, 30, 30]}
        attach="geometry"
      />
      <meshBasicMaterial color={0xfff1ef} attach="material" />
    </mesh>
  );
}

export function Line({ start, end }) {
  /*
  This is a component function in JSX

  Parameters
  ----------
  None

  Returns
  -------
  React Property
    Contains the information regarding mesh (in this case, tube that connects two atoms) under React-ThreeJS library
  */
  const ref = useRef();
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints(
      [start, end].map((point) => new THREE.Vector3(...point))
    );
  }, [start, end]);

  return (
    <line ref={ref}>
      <bufferGeometry attach="geometry" />
      <lineBasicMaterial color="white" linewidth="5" attach="material" />
    </line>
  );
}

// FIX THE TUBE!
