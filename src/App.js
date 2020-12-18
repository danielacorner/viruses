import React from "react";
import { Canvas } from "react-three-fiber";
import { Physics, usePlane, useBox, useSphere } from "@react-three/cannon";
import SarsCov2Suspense from "./components/GLTFs/SarsCov2";
import { useWindowSize } from "./utils/hooks";
import { OrbitControls } from "@react-three/drei";

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
  const windowSize = useWindowSize();

  return (
    <div className="App">
      <Canvas style={{ height: windowSize.height, width: windowSize.width }}>
        <pointLight position={[10, 10, 10]} intensity={0.2} />
        <ambientLight intensity={0.3} />
        <color attach="background" args={["#d3e4a4"]} />
        <pointLight position={[-10, -10, -10]} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        <Physics>
          <Plane />
          <Cube />
          <Covid />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;

function Covid(props) {
  const scale = 0.015;
  const pos = [0, 0, 0];

  const [ref] = useSphere(() => ({
    // rotation: [-Math.PI / 2, 0, 0],
    mass: 1,
    position: [3, 5, 0],
  }));
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <SarsCov2Suspense
        attach="material"
        // ref={idx === 0 ? ref : null}
        scale={[scale, scale, scale]}
        position={pos}
      />
      <OrbitControls />
    </mesh>
  );
}
