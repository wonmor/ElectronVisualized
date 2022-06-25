import React, { useEffect, useRef, useState } from 'react'

import { extend } from '@react-three/fiber'

import { useGLTF, useAnimations } from '@react-three/drei'

import * as THREE from "three";

import { Line2, LineGeometry, LineMaterial } from "three-fatline";

import { RENDERER } from "./Globals";

/*
█▀▀▀ █▀▀ █▀▀█ █▀▄▀█ █▀▀ ▀▀█▀▀ █▀▀█ ─▀─ █▀▀ █▀▀ 
█─▀█ █▀▀ █──█ █─▀─█ █▀▀ ──█── █▄▄▀ ▀█▀ █▀▀ ▀▀█ 
▀▀▀▀ ▀▀▀ ▀▀▀▀ ▀───▀ ▀▀▀ ──▀── ▀─▀▀ ▀▀▀ ▀▀▀ ▀▀▀
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
        // color={`rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`}
        color={"#FFFFFF"}
        opacity={0.2}
        transparent={true}
        attach="material"
      />
    </mesh>
  );
}

export function BondLine({coords}) {
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

  geometry.setPositions(coords); // [ x1, y1, z1,  x2, y2, z2, ... ] format

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
  // To Do: add a functionality to plot the bond line based upon the bond length

  return <primitive object={lineSegment} position={[0, 0, 0]} />;
}

export function DefaultModel(props) {
  /*
  This is a component function in JSX that contains the HTML markup that represent each graphical element on the webpage

  Parameters
  ----------
  props: React element
    Represents all the other properties that have to be rendered prior to this operation

  Returns
  -------
  DOM File
      A HTML markup that contains graphical elements
  */
  const group = useRef();

  const { scene, animations } = useGLTF('/default/scene.gltf')
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    actions["TOY FREDDY MAGIC"]?.play();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive castShadow receiveShadow object={scene} />
    </group>
  )
}

export function Background() {
  /*
  This is a component function in JSX that contains the HTML markup that represent each graphical element on the webpage

  Parameters
  ----------
  None

  Returns
  -------
  DOM File
      A HTML markup that contains graphical elements
*/
  return (
    <div className="opacity-25">
      <div className="light x1"></div>
      <div className="light x2"></div>
      <div className="light x3"></div>
      <div className="light x4"></div>
      <div className="light x5"></div>
      <div className="light x6"></div>
      <div className="light x7"></div>
      <div className="light x8"></div>
      <div className="light x9"></div>
    </div>
  );
}
