import React from "react";
import { Canvas } from "react-three-fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
    </mesh>
  );
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
    </mesh>
  );
}
function App() {
  return (
    <div className="App">
      <Canvas>
        <Physics>
          <Plane />
          <Cube />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
