import MetaTag from "../tools/MetaTag";
import firebase from "firebase/compat/app";

import "firebase/compat/firestore"; // Import the Firestore module

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { Model } from "./Shop";

export default function Highlight() {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsRef = firebase.firestore().collection('items');
        const snapshot = await itemsRef.get();

        const itemsData = [];
        snapshot.forEach((doc) => {
          const item = doc.data();
          if (item.name.toLowerCase().includes('benzene')) {
            itemsData.push({
              id: doc.id,
              ...item,
            });
          }
        });

        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <MetaTag
        title={"ElectronVisualized"}
        description={"View Electron Density, Molecular and Atomic Orbitals"}
        keywords={
          "electron, electron density, chemistry, computational chemistry"
        }
        imgsrc={"cover.png"}
        url={"https://electronvisual.org"}
      />

      <div
        className="overflow-auto pb-40"
        style={{ "min-height": "100vh", width: "-webkit-fill-available" }}
      >
        <div className="text-center pt-10 pl-5 pr-5 text-white">
          <h1 className="scale-75 sm:scale-100 flex items-center justify-center">
            <span className="text-white font-thin">Meet Benzene.</span>
          </h1>
          <p className="text-gray-400 m-5">
            Available in 5 different materials, Benzene is a great gift for any chemistry enthusiast.
            <br />
            3D printed and shipped to your door.
          </p>

          <button
            onClick={() => {
              navigate("/shop");
            }}
            className="z-40 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-4 mx-4"
          >
            <span>I want one!</span>
          </button>

          <div style={{ height: "300px", display: "inline-grid", width: "-webkit-fill-available" }}>
            {items[0] && (
              <Canvas camera={{ position: [0, 0, 5] }}>
                <directionalLight position={[0, 10, 5]} intensity={1} />
                <Suspense fallback={null}>
                  <Model name={items[0].name} key={items[0].id} url={items[0].stlFileUrl}/>
                </Suspense>
              </Canvas>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
