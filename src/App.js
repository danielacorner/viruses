import React from "react";
import { Canvas } from "react-three-fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import SarsCov2Suspense from "./components/GLTFs/SarsCov2";
import { useWindowSize } from "./utils/hooks";

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
  const scale = 0.1;
  const pos = [0, 0, 0];
  const windowSize = useWindowSize();

  return (
    <div className="App">
      <Canvas style={{ height: windowSize.height, width: windowSize.width }}>
        <Physics>
          <Plane />
          <Cube />
          <SarsCov2Suspense
            // ref={idx === 0 ? ref : null}
            scale={[scale, scale, scale]}
            position={[pos.x, pos.y, pos.z]}
          />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
