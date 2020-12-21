import React, { Suspense, useMemo, useRef } from "react";
import { useSphere } from "@react-three/cannon";
import { useJitterParticle } from "./useJitterParticle";
import { getRandStartPosition } from "./particleUtils";
import { useStore } from "../../store";
import { useMount } from "../../utils/utils";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

const colors = [...new Array(1000)].map(() => "white");
const rpi = () => Math.random() * Math.PI;

// const FancyParticle = React.forwardRef((props, ref) => {
//   return <group ref={ref}>{props.children}</group>;
// });

const JitteryParticle = ({
  ChildParticle,
  scale,
  position = null,
  temperature,
  amount,
  ...rest
}) => {
  // const mesh = useRef(null as any);
  const coords = useMemo(
    () => [...new Array(amount)].map(() => [rpi(), rpi(), rpi()]),
    [amount]
  );

  const worldRadius = useStore((state) => state.worldRadius);

  // https://codesandbox.io/s/may-with-60fps-your-web-site-run-xj31x?from-embed=&file=/src/index.js:297-1112

  const mesh = useRef(null as any);
  // const [mesh] = useSphere(() => ({
  //   // rotation: [-Math.PI / 2, 0, 0],
  //   mass: 1,
  //   position: position || getRandStartPosition(-worldRadius, worldRadius),
  // }));

  const particleRef = useJitterParticle({
    jitterPosition: temperature,
    jitterRotation: 0.01,
  });

  // const dummy = new THREE.Object3D();
  // useFrame((state) => {
  //   const t = state.clock.getElapsedTime();
  //   coords.forEach(([x, y, z], i) => {
  //     dummy.rotation.set(x + t, y + t, z + t);
  //     //       dummy.updateMatrix(void dummy.rotation.set(x + t, y + t, z + t))
  //     dummy.updateMatrix();
  //     mesh.current.setMatrixAt(i, dummy.matrix);
  //   });
  //   mesh.current.instanceMatrix.needsUpdate = true;
  // });

  // random start positions
  useMount(() => {});

  return (
    <group ref={particleRef} {...rest}>
      <instancedMesh
        ref={mesh}
        args={[null, null, amount]}
        renderOrder={2}
        // onPointerMove={(e) => setHovered(e.instanceId)}
        // onPointerOut={(e) => setHovered(undefined)}
      >
        {/* <boxBufferGeometry attach="geometry" /> */}
        {/* <instancedBufferGeometry */}
        <Suspense fallback={null}>
          <ChildParticle scale={[scale, scale, scale]} />
        </Suspense>
        <boxBufferGeometry attach="geometry" />
        <meshNormalMaterial attach="material" transparent opacity={1} />
      </instancedMesh>
    </group>
  );
};

export default JitteryParticle;
