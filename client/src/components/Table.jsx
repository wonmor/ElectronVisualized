import { Canvas } from "react-three-fiber";
import Renderer from "./Renderer";

import Controls from "./objects/Controls";

const Table = () => {
  return (
    <div className="bg-gray-700">
      <div className="text-white text-center pt-10 pb-10">
        <h1>Hydrogen</h1>
        <p className="pt-5">
          The first element in the periodic table. The atomic number is 1 and
          its mass is 1 AMU.
        </p>
      </div>
      <div style={{ width: "100vw", height: "85vh" }}>
        <Canvas camera={{ fov: 30, position: [-5, 8, 8]}}>
          <Controls />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Renderer position={[-1.2, 0, 0]} />
          <Renderer position={[2.5, 0, 0]} />
          <gridHelper />
        </Canvas>
      </div>
    </div>
  );
};

export default Table;
