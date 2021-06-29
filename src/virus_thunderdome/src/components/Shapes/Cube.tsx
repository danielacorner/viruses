import React from "react";
import { useBox } from "@react-three/cannon";

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
    </mesh>
  );
}
