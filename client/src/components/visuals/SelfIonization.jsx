import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Define the atomic coordinates of the water molecule
const waterCoordinates = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.7692, 0.4409, 0),
  new THREE.Vector3(-0.7692, 0.4409, 0),
];

// Calculate the van der Waals radii of the atoms
const waterRadii = [1.2, 1.4, 1.4]; // in angstroms

// Find the maximum radius
const maxWaterRadius = Math.max(...waterRadii);

// Create a function to create a water molecule
function createWaterMolecule(position, coordinates, radii) {
  // Create a sphere geometry for each atom
  const spheres = coordinates.map((coord, i) => {
    const radius = radii[i] / maxWaterRadius;
    const scalingFactor = i === 0 ? 1.5 : 1; // make oxygen larger than hydrogen
    const geometry = new THREE.SphereGeometry(radius * scalingFactor, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: '#4682B4',
      specular: '#ffffff',
      shininess: 30,
      transparent: true,
      opacity: 0.8,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(coord.x, coord.y, coord.z).add(position);
    return sphere;
  });

  return spheres;
}

// Create five water molecules with different positions
const waterMolecules = [
  createWaterMolecule(new THREE.Vector3(0, 0, 0), waterCoordinates, waterRadii),
  createWaterMolecule(new THREE.Vector3(1.5, 0, 0), waterCoordinates, waterRadii),
  createWaterMolecule(new THREE.Vector3(-1.5, 0, 0), waterCoordinates, waterRadii),
  createWaterMolecule(new THREE.Vector3(0, 1.5, 0), waterCoordinates, waterRadii),
  createWaterMolecule(new THREE.Vector3(0, -1.5, 0), waterCoordinates, waterRadii),
].flat();

// Define the 3D scene
function Scene() {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {waterMolecules.map((sphere, i) => (
        <mesh key={i} geometry={sphere.geometry} material={sphere.material} position={sphere.position} />
      ))}
      <OrbitControls />
    </>
  );
}

// Render the 3D scene
export default function SelfIonization() {
  return (
<Canvas camera={{ position: [0, 0, 5] }} style={{ margin: 100, width: 'match_parent', height: "800px" }}>
  <Scene />
</Canvas>
  );
}
