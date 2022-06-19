import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { setCameraInfo } from "../states/cameraInfoSlice";

/*
░█▀▀█ ─█▀▀█ ░█▀▄▀█ ░█▀▀▀ ░█▀▀█ ─█▀▀█ 　 ░█▀▀█ ░█▀▀▀█ ░█▄─░█ ▀▀█▀▀ ░█▀▀█ ░█▀▀▀█ ░█─── ░█▀▀▀█ 
░█─── ░█▄▄█ ░█░█░█ ░█▀▀▀ ░█▄▄▀ ░█▄▄█ 　 ░█─── ░█──░█ ░█░█░█ ─░█── ░█▄▄▀ ░█──░█ ░█─── ─▀▀▀▄▄ 
░█▄▄█ ░█─░█ ░█──░█ ░█▄▄▄ ░█─░█ ░█─░█ 　 ░█▄▄█ ░█▄▄▄█ ░█──▀█ ─░█── ░█─░█ ░█▄▄▄█ ░█▄▄█ ░█▄▄▄█
*/

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCameraInfo(camera));
  }, [camera, dispatch]);

  return (
    <orbitControls
      enableZoom={true}
      minDistance={0.1}
      maxDistance={30}
      args={[camera, gl.domElement]}
    />
  );
}