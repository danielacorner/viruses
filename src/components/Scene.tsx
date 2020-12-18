import React from "react";
import { Physics, usePlane, useBox, useSphere } from "@react-three/cannon";
import SarsCov2Suspense from "./GLTFs/SarsCov2";
import { OrbitControls } from "@react-three/drei";

const Scene = () => {
  return (
    <>
      <OrbitControls />
      <Lighting />
      <Physics
      // iterations={20}
      // tolerance={0.0001}
      // defaultContactMaterial={{
      //   friction: 0.9,
      //   restitution: 0.7,
      //   contactEquationStiffness: 1e7,
      //   contactEquationRelaxation: 1,
      //   frictionEquationStiffness: 1e7,
      //   frictionEquationRelaxation: 2,
      // }}
      // // gravity={[0, -40, 0]}
      // allowSleep={false}
      >
        <Plane />
        <Cube />
        <Covid />
      </Physics>
    </>
  );
};

export default Scene;

function Lighting() {
  return (
    <>
      <pointLight position={[10, 10, 10]} intensity={0.2} />
      <ambientLight intensity={0.3} />
      <color attach="background" args={["#d3e4a4"] as any} />
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
    </>
  );
}

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
    </mesh>
  );
}
