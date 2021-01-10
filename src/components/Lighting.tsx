import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { useControl } from "react-three-gui";
import { useStore } from "../store";

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
  const selectedProtein = useStore((s) => s.selectedProtein);
  const worldRadius = useStore((s) => s.worldRadius);
  const scale = useStore((s) => s.scale);
  const [selectedCoords, setSelectedCoords] = useState({ x: 0, y: 0, z: 0 });

  // selected particle position
  const currentPosition = useRef(null as null | [number, number, number]);
  useEffect(() => {
    if (selectedProtein) {
      selectedProtein.api.position.subscribe(
        (p) => (currentPosition.current = p)
      );
    }
    return () => {
      currentPosition.current = null;
    };
  }, [selectedProtein]);

  const pointlightRef = useRef(null as any);

  useFrame(() => {
    if (currentPosition.current?.[0]) {
      // find the selected protein and its coordinates to move/point the spotlight
      // spotlightRef.current?.lookAt(
      //   currentPosition.current[0],
      //   currentPosition.current[1],
      //   currentPosition.current[2]
      // );
      setSelectedCoords({
        x: currentPosition.current[0],
        y: currentPosition.current[1],
        z: currentPosition.current[2],
      });
    }
  });
  if (selectedProtein) {
    console.log("🌟🚨 ~ radius", selectedProtein.radius);
    console.log("🌟🚨 ~ scale", scale);
    console.log(
      "🌟🚨 ~ Lighting ~ selectedProtein.radius * scale",
      selectedProtein.radius * scale
    );
  }
  const mult = useControl("multiplier", {
    type: "number",
    min: 0,
    max: 5,
    value: 0.5,
  });
  return (
    <>
      <color attach="background" args={["#ffffff"] as any} />
      {/* pointLight does not cast shadow */}
      {/* <pointLight position={[10, 10, 10]} intensity={0.2} /> */}
      {selectedProtein ? (
        <spotLight
          ref={pointlightRef}
          position={[
            selectedCoords.x * worldRadius,
            selectedCoords.y * worldRadius,
            selectedCoords.z * worldRadius,
          ]}
          angle={0.5}
          intensity={1.3}
          penumbra={0.2}
          distance={worldRadius * 3}
        />
      ) : (
        <>
          <ambientLight intensity={0.3} />
          <pointLight
            position={[-10, -10, -10]}
            intensity={baselightIntensity}
          />
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
      )}
    </>
  );
}
