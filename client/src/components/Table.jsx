import { Canvas } from "react-three-fiber";
import Renderer from "./Renderer";

const Table = () => {
    return (
        <div>
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Renderer position={[-1.2, 0, 0]} />
                <Renderer position={[2.5, 0, 0]} />
            </Canvas>
        </div>
    );
}

export default Table;