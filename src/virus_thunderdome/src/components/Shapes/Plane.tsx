import React from "react";
import { usePlane } from "@react-three/cannon";
import { Reflector, useMatcapTexture } from "@react-three/drei";

export function Plane({
  width,
  height,
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
  const [matcap] = useMatcapTexture(
    133, // index of the matcap texture https://github.com/emmelleppi/matcaps/blob/master/matcap-list.json
    1024 // size of the texture ( 64, 128, 256, 512, 1024 )
  );
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
        </>
      ) : (
        <>
          <planeGeometry
            attach="geometry"
            args={[width, height, widthSegments, heightSegments]}
          />
          <meshMatcapMaterial
            matcap={matcap as any}
            opacity={0.3}
            transparent={true}
          />
        </>
      )}
      {/* <meshStandardMaterial
				attach="material"
				color={color}
				// roughness={0.7}
				// metalness={0.5}
				// opacity={0.5}
				depthTest={false}
			/> */}
    </mesh>
  );
}
