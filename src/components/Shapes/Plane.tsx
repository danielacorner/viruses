import React from "react";
import { usePlane } from "@react-three/cannon";
import { Reflector, useMatcapTexture } from "@react-three/drei";

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
  const [matcap] = useMatcapTexture(
    133, // index of the matcap texture https://github.com/emmelleppi/matcaps/blob/master/matcap-list.json
    1024 // size of the texture ( 64, 128, 256, 512, 1024 )
  );
  // TODO: useNormalTexture https://github.com/pmndrs/drei#usenormaltexture

  return (
    <mesh ref={ref} /* receiveShadow */>
      {reflect ? (
        <>
          {/* https://github.com/pmndrs/drei#reflector */}
          <Reflector mirror={0.5}>
            {(Material, props) => (
              <>
                <Material
                  mirror={0.5}
                  color="#ddd"
                  metalness={0}
                  roughnessMap={1}
                  roughness={1}
                  normalMap={1}
                  normalScale={1}
                  {...props}
                />
              </>
            )}
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
