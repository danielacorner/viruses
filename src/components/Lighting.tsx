import React from "react";

export function Lighting() {
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
