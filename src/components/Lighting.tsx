import React from "react";
import { useControl } from "react-three-gui";

export function Lighting() {
  const spotlightIntensity = useControl("spotlight intensity", {
    group: "Lighting",
    type: "number",
    min: 0,
    value: 2,
    max: 3,
  });
  const baselightIntensity = useControl("baselight intensity", {
    group: "Lighting",
    type: "number",
    min: 0,
    value: 1,
    max: 3,
  });
  return (
    <>
      <ambientLight intensity={0.3} />
      <color attach="background" args={["#ffffff"] as any} />
      {/* pointLight does not cast shadow */}
      {/* <pointLight position={[10, 10, 10]} intensity={0.2} /> */}
      <pointLight position={[-10, -10, -10]} intensity={baselightIntensity} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.5}
        penumbra={1}
        intensity={spotlightIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
    </>
  );
}
