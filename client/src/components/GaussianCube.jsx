import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, PerspectiveCamera } from '@react-three/drei';

const parseCubeFile = (fileContents) => {
  const lines = fileContents.split('\n');
  const numAtoms = parseInt(lines[2].split(/\s+/)[0]);

  const atoms = [];
  for (let i = 0; i < numAtoms; i++) {
    const atomData = lines[6 + i].split(/\s+/).filter(Boolean).map(Number);
    const atomicNumber = atomData[0];
    const position = [atomData[2], atomData[3], atomData[4]];

    // You can adjust the size calculation as needed
    const size = Math.cbrt(atomicNumber) * 0.2;

    atoms.push({ atomicNumber, position, size });
  }

  const orbitalData = [];
  // Parse orbital data as needed and add it to the orbitalData array

  return {
    atoms,
    orbitalData,
  };
};

const MolecularOrbital = ({ fileContents }) => {
  const { atoms, orbitalData } = parseCubeFile(fileContents);

  return (
    <group>
      {atoms.map((atom, index) => (
        <Box key={index} position={atom.position} args={[atom.size, atom.size, atom.size]} />
      ))}
      {/* Render the orbital data as needed */}
    </group>
  );
};

const EtheneVisualization = () => {
  const [fileContents, setFileContents] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContents(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h1>Gaussian Cube<br />Visualizer</h1>
      <h2>Beta</h2>
      <input type="file" onChange={handleFileChange} />
      {fileContents && (
        <Canvas
          style={{ backgroundColor: 'white' }}
          camera={{ position: [5, 5, 5], fov: 50 }}
        >
          <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <MolecularOrbital fileContents={fileContents} />
          <OrbitControls />
        </Canvas>
      )}
    </div>
  );
};

export default EtheneVisualization;
