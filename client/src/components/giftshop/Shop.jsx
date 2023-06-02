import React, { useEffect, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { STLLoader } from "three-stdlib";
import { Vector3 } from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";

import * as THREE from "three";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import firebase from "firebase/compat/app";

import "firebase/compat/firestore"; // Import the Firestore module

export const Model = ({ name, url }) => {
  const [geometry, setGeometry] = useState(null);
  const [center, setCenter] = useState(new Vector3()); // center of the model
  const [size, setSize] = useState(new Vector3()); // size of the model

  // Get the camera and its aspect from @react-three/fiber's useThree hook
  const { camera, size: canvasSize } = useThree();

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(url, (geometry) => {
      const mesh = new THREE.Mesh(geometry);
      const box = new THREE.Box3().setFromObject(mesh);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      setGeometry(geometry);
      setCenter(center);
      setSize(size);
    });
  }, [url]);

  useEffect(() => {
    // Update the camera's position based on the size of the model
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 1.75 / Math.tan(fov / 2));

    // Update orbit control's target
    camera.position.z = cameraZ;

    if (name.toLowerCase().includes("water") && geometry) {
      geometry.rotateZ(Math.PI / 4);
      geometry.rotateX(Math.PI / 4);
      geometry.rotateY(-Math.PI / 2);
    }
    
    camera.updateProjectionMatrix();
  }, [camera, geometry, name, size]);

  useFrame(() => {
    // Rotate the model a bit each frame
    if (geometry) {
      geometry.rotateY(0.005);
    }
  });

  if (!geometry) return null;

  return (
    <group position={[-center.x, -center.y, center.z]}>
      <mesh>
        <primitive object={geometry} attach="geometry" />
        <meshPhysicalMaterial metalness={1} clearcoat={1} color="#fffff" />
      </mesh>
    </group>
  );
};

const Shop = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartAnimation, setCartAnimation] = useState(false);

  const navigate = useNavigate();

  // Load user from Firebase Authentication
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  // Load items from Firestore
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("items")
      .onSnapshot((snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(items);
        setItems(items);
      });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Fetch the cart count from Firestore and set it as the initial cartCount value
    const fetchCartCount = async () => {
      if (user) {
        const cartRef = firebase.firestore().collection("customers-web").doc(user.uid);
        const cartSnapshot = await cartRef.get();
        const { items } = cartSnapshot.data();
        const totalCount = Object.values(items).reduce((sum, quantity) => sum + quantity, 0);
        setCartCount(totalCount);
      }
    };

    fetchCartCount();
  }, [user]);

  const addToCart = async (itemId) => {
    if (!user) {
      // User is not logged in, redirect to login page
      navigate("/login");
      return;
    }
    const cartRef = firebase.firestore().collection("customers-web").doc(user.uid);
    const cartDoc = await cartRef.get();
    if (!cartDoc.exists) {
      await cartRef.set({ items: { [itemId]: 1 } });
    } else {
      const { items } = cartDoc.data();
      const updatedItems = { ...items };
      // Check if the item already exists in the cart. If it does, increment its quantity.
      // Otherwise, add it to the cart with a quantity of 1.
      if (updatedItems[itemId]) {
        updatedItems[itemId] += 1;
      } else {
        updatedItems[itemId] = 1;
      }
      await cartRef.update({ items: updatedItems });
    }
  
    // Calculate the total count of items in the cart
    const cartSnapshot = await cartRef.get();
    const { items } = cartSnapshot.data();
    const totalCount = Object.values(items).reduce((sum, quantity) => sum + quantity, 0);
  
    setCartCount(totalCount);
    setCartAnimation(true);
    setTimeout(() => {
      setCartAnimation(false);
    }, 1000);
  };

  return (
    <div
      className="bg-gray-800 min-h-screen pb-40"
      style={{ minHeight: "100vh", width: "-webkit-fill-available" }}
    >
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-thin text-white mb-10">Giftshop</h1>
          <button className="flex items-center text-white" onClick={() => navigate("/cart")}>
            <ShoppingCartIcon sx={{ fontSize: 32 }} />
            {cartCount > 0 && (
              <span className="bg-red-500 rounded-full text-white w-6 h-6 text-center ml-2">
                {cartCount}
              </span>
            )}
          </button>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <li
              key={item.id}
              className="border-gray-600 border-2 overflow-hidden shadow-md rounded-lg relative"
            >
              <div className="p-4">
                <h2 className="text-3xl font-thin text-white mb-2">
                  {item.name}
                </h2>
                <p className="text-white text-base mb-2">{item.description}</p>
            <p className="text-white text-3xl font-thin mb-4">
              ${item.price}
            </p>
            <button
              onClick={() => addToCart(item.id)}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              <span>Add to Cart</span>
            </button>
            {cartAnimation && (
              <span
                className="absolute top-2 right-2 bg-red-500 w-8 h-8 text-center rounded-full text-white flex justify-center items-center"
                style={{ animation: "cartAnimation 1s" }}
              >
                +
              </span>
            )}
          </div>
          <div className="w-full h-64 object-cover border-t-2 border-gray-600">
            <Canvas camera={{ position: [0, 0, 5] }}>
            <directionalLight position={[0, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
                <Model name={item.name} key={item.id} url={item.stlFileUrl} />
          </Suspense>
          </Canvas>
        </div>
        </li>
      ))}
    </ul>
  </div>
</div>
);
};

export default Shop;