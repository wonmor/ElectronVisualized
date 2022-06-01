import React, { useRef, useState } from "react";

import * as THREE from 'three'

import { useSelector } from "react-redux";

import { RENDERER } from "./Constants";

export function Atoms(props) {
  const mesh = useRef();

  const [active, setActive] = useState(false);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1, 1, 1]}
      onClick={(e) => setActive(!active)}
    >
      <sphereBufferGeometry args={[RENDERER.ATOM_RADIUS, 30, 30]} attach="geometry" />
      <meshBasicMaterial color={0xfff1ef} opacity={0.1} transparent={true} attach="material" />
    </mesh>
  );
}

export function Particles(props) {
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
      <sphereBufferGeometry args={[RENDERER.PARTICLE_RADIUS, 30, 30]} attach="geometry" />
      <meshBasicMaterial color={0xfff1ef} attach="material" />
    </mesh>
  );
}

export function Tube(props) {
  const globalAtomInfo = useSelector((state) => state.atomInfo.value);

  const mesh = useRef();

  const [active, setActive] = useState(false);

  var atoms_x, atoms_y, atoms_z;

  if (globalAtomInfo != null) {
    atoms_x = globalAtomInfo["atoms_x"];
    atoms_y = globalAtomInfo["atoms_y"];
    atoms_z = globalAtomInfo["atoms_z"];
  }

  const points = []

  points.push(new THREE.Vector3(atoms_x[0], atoms_y[0], atoms_z[0]))
  points.push(new THREE.Vector3(atoms_x[1], atoms_y[1], atoms_z[1]))

  return (
    <mesh
      {...props}
      ref={mesh}
      rotateX={Math.PI / 2}
      scale={[1.5, 1.5, 1.5]}
      onClick={(e) => setActive(!active)}
    >
      <bufferGeometry attach="geometry" setFromPoints={points} />
      <lineBasicMaterial attach="material" color={0xfff1ef} linewidth={10} linecap={'round'} linejoin={'round'} />
    </mesh>
  );
}

// FIX THE TUBE!
