import React from "react";
import { usePlane } from "@react-three/cannon";
import { TextureLoader } from "three";
import { useLoader } from "react-three-fiber";

export function Plane(props) {
  const texture = useLoader(TextureLoader, "https://picsum.photos/500/500/");
  console.log("🌟🚨: Plane -> props", props);
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
    // position: [-100, -100, -100],
  }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial
        attach="material"
        color={props.color}
        // roughness={0.7}
        // metalness={0.5}
        opacity={0.5}
        depthTest={false}
      />
    </mesh>
  );
}
