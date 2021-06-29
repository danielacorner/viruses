import React, { forwardRef } from "react";
import { useFrame } from "@react-three/fiber";

// https://codesandbox.io/s/postprocessing-godrays-i8vkz?file=/src/index.js:759-1174
export const Sun = forwardRef(function Sun(props, forwardRef: any) {
  useFrame(({ clock }) => {
    if (forwardRef.current) {
      forwardRef.current.position.x = Math.sin(clock.getElapsedTime()) * -8;
      forwardRef.current.position.y = Math.cos(clock.getElapsedTime()) * -8;
    }
  });

  return (
    <mesh ref={forwardRef} position={[0, 0, -15]}>
      <sphereGeometry args={[1, 36, 36]} />
      <meshBasicMaterial color={"#00FF00"} />
    </mesh>
  );
});
