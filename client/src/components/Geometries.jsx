import React, { useEffect, useRef, useState } from 'react'
import { extend } from '@react-three/fiber'
import { GLTFLoader } from "three-stdlib";

import * as THREE from "three";

import { Line2, LineGeometry, LineMaterial } from "three-fatline";
import { RENDERER, isElectron } from "./Globals";

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

export function GLBViewer(props) {
  const url = `${isElectron() ? 'https://electronvisual.org' : ''}/api/downloadGLB/${props.name}`;

  const [gltf, setGltf] = useState(null);

  const [rotation, setRotation] = useState({x: 0, y: 1.25, z: 0.15});
  const [scale, setScale] = useState(6);
  const [offset, setOffset] = useState([0, 0, 0]);

  const ref = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      url,
      (data) => setGltf(data),
      null,
      (error) => console.error(error)
    );
  }, [url]);

  useEffect(() => {
    if (gltf) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0xffffff,
            transparent: true,
            opacity: props.isExportReady ? 1.0 : 0.1,
          });
        }
      });
    }
  }, [gltf, props.isExportReady]);

  useEffect(() => {
    console.log(props.name);

    if (props.name.includes("C6H6")) {
      setRotation({x: 0, y: 0, z: Math.PI / 2});
      setScale(6);
      setOffset([0, -1.5, 0]);

    } else if (props.name.includes("CH3OH")) {
      if (props.isHomo) {
        setRotation({x: 0, y: 0.75, z: -1.05});
        setScale(3.5);
        setOffset([1.5, 1.25, 0]);

      } else {
        setRotation({x: 0, y: 0.75, z: -1.15});
        setScale(3.75);
        setOffset([1.5, 0, -1.25]);
      }

    } else if (props.name.includes("C2H4")) {
      setRotation({x: 0, y: 1.25, z: 0.15});
      setScale(6);
      
    } else if (props.name.includes("H2O")) {
      setRotation({x: 0, y: Math.PI / 2, z: Math.PI / 2});
      setScale(4);
      
    } else if (props.name.includes("H2")) {
      setRotation({x: 0, y: Math.PI / 2, z: 0});
      setScale(3);
      setOffset([0.4, 0.4, 0.4])

    } else if (props.name.includes("Cl2")) {
      setRotation({x: 0, y: Math.PI / 2, z: 0});
      setScale(4.5);
      setOffset([0.0, 0.4, 0.0])

    } else if (props.name.includes("HCl")) {
      setRotation({x: 0, y: -Math.PI / 2, z: 0});
      setScale(4.5);
      setOffset([0.0, 0.4, props.isHomo ? 2.8 : 0.8])
    }
  }, [props.isHomo, props.name]);

  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.x = rotation.x;
      ref.current.rotation.y = rotation.y;
      ref.current.rotation.z = rotation.z;
      ref.current.scale.set(scale, scale, scale);
      ref.current.position.set(...offset)
    }
  }, [offset, rotation, scale])

  return (
    <mesh ref={ref}>
      {gltf && <primitive castShadow receiveShadow object={gltf.scene} />}
    </mesh>
  );
}
