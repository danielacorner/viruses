import React from "react";
import { usePlane } from "@react-three/cannon";
import { Reflector } from "@react-three/drei";

export function Plane({
  width = 100,
  height = 100,
  widthSegments = 1,
  heightSegments = 1,
  reflect = false,
  ...rest
}) {
  const [ref] = usePlane(() => ({
    // rotation: [-Math.PI / 2, 0, 0],
    ...rest,
    // position: [-100, -100, -100],
  }));

  return (
    <mesh ref={ref} /* receiveShadow */>
      {reflect ? (
        <>
          <Reflector>
            <planeGeometry
              attach="geometry"
              args={[width, height, widthSegments, heightSegments]}
            />
          </Reflector>
          <meshPhysicalMaterial
            attach={"material"}
            metalness={1}
            roughness={0}
          />
        </>
      ) : (
        <>
          <planeGeometry
            attach="geometry"
            args={[width, height, widthSegments, heightSegments]}
          />
        </>
      )}
      {/*  <meshStandardMaterial
        attach="material"
        // depthTest={false}
        opacity={0.5}
        // reflectivity={1}
        {...materialProps}
      /> */}
    </mesh>
  );
}
