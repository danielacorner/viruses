import React, { useRef, useState } from "react";
import { useSphere } from "@react-three/cannon";
import { useSpring, a } from "react-spring/three";
import * as THREE from "three";
// https://discourse.threejs.org/t/there-is-no-gltfloader-in-three-module/16117/4
import { useGLTF } from "../../../utils/useGltf";

import { getRandPosition } from "../particleUtils";
import { useStore } from "../../../store";
// import * as antibody from "./models/1bv1/scene.gltf";

const dummy = new THREE.Object3D();

const rpi = () => Math.random() * Math.PI;

const Particle = ({
  ChildParticle,
  scale,
  temperature,
  numParticles,
  pathToGLTF,
  instanced,
  jittery,
  ...rest
}) => {
  const worldRadius = useStore((state) => state.worldRadius);

  // https://codesandbox.io/s/may-with-60fps-your-web-site-run-xj31x?from-embed=&file=/src/index.js:297-1112

  const instancedRef = useRef();
  const [sphereRef, sphereApi] = useSphere((index) => ({
    // rotation: [-Math.PI / 2, 0, 0],
    mass: 1,
    position: getRandPosition(worldRadius),
    args: 1, // ? https://codesandbox.io/s/r3f-cannon-instanced-physics-devf8?file=/src/index.js
  }));
  // random start positions: instanced
  // useMount(() => {
  //   if (!instanced || !(instancedRef.current as any)?.setMatrixAt) {
  //     return;
  //   }
  //   let i = 0;
  //   for (let idx = 0; idx < numParticles; idx++) {
  //     const [x, y, z] = getRandPosition( worldRadius);
  //     dummy.position.x = x;
  //     dummy.position.x = y;
  //     dummy.position.x = z;
  //     // dummy.position.set(x, y, z);

  //     //       dummy.updateMatrix(void dummy.rotation.set(x + t, y + t, z + t))
  //     dummy.updateMatrix();
  //     (instancedRef.current as any).setMatrixAt(i++, dummy.matrix);
  //   }
  //   (instancedRef.current as any).instanceMatrix.needsUpdate = true;
  // });

  // random start positions: non-instanced
  // * https://www.npmjs.com/package/@react-three/cannon
  // useMount(() => {
  //   if (instanced) {
  //     return;
  //   }
  //   const [x, y, z] = getRandPosition(worldRadius);
  //   // https://codesandbox.io/s/r3f-cannon-instanced-physics-devf8
  //   sphereApi.position.set(x, y, z);
  // });

  // // random start positions
  // useMount(() => {
  //   if (!ref.current) {
  //     return;
  //   }
  //   dummy.position.set(0, 0, 0);
  //   ref.current.setMatrixAt(0, dummy.matrix);

  //   ref.current.instanceMatrix.needsUpdate = true;
  // });

  // useFrame((state) => {
  //   if (!ref.current) {
  //     return;
  //   }
  //   const time = state.clock.getElapsedTime();
  //   ref.current.rotation.x = Math.sin(time / 4);
  //   ref.current.rotation.y = Math.sin(time / 2);
  //   let i = 0;
  //   for (let x = 0; x < 10; x++)
  //     for (let y = 0; y < 10; y++)
  //       for (let z = 0; z < 10; z++) {
  //         dummy.position.set(5 - x, 5 - y, 5 - z);
  //         dummy.rotation.y =
  //           Math.sin(x / 4 + time) +
  //           Math.sin(y / 4 + time) +
  //           Math.sin(z / 4 + time);
  //         dummy.rotation.z = dummy.rotation.y * 2;
  //         dummy.updateMatrix();
  //         ref.current.setMatrixAt(i++, dummy.matrix);
  //       }
  //   ref.current.instanceMatrix.needsUpdate = true;
  // });

  const usedgltf = useGLTF(pathToGLTF) as any;

  const allGeometriesAndMaterials = Object.values(usedgltf?.nodes)
    // .map(([nodeName, node]) => ({
    //   geometry: (node as any).geometry,
    //   material: (node as any).material,
    // }))
    // geometry must exist
    .filter(({ geometry }) => Boolean(geometry));

  // const mergedGeometry = allGeometries.slice(-1).reduce((acc, cur) => {
  //   return (acc as any).merge(cur);
  // });
  // const mergedGeometry = allGeometries[allGeometries.length - 1];
  // const mergedGeometry = useMemo(() => {
  //   const base = allGeometries.slice(1).reduce((acc, cur) => {
  //     return (acc as any).merge(cur);
  //   }, allGeometries[0]);
  //   return base;
  // }, [allGeometries]);

  // each instance must have only one geometry https://github.com/pmndrs/react-three-fiber/issues/574#issuecomment-703296449
  const [active, setActive] = useState(false);
  const springProps = useSpring({
    scale: [
      (active ? 2 : 1) * scale,
      (active ? 2 : 1) * scale,
      (active ? 2 : 1) * scale,
    ],
  });

  return instanced ? (
    <>
      {allGeometriesAndMaterials.map(({ geometry, material }, idx) => (
        <a.instancedMesh
          key={idx}
          onPointerOver={() => {
            setActive(true);
          }}
          onPointerOut={() => {
            setActive(false);
          }}
          ref={sphereRef}
          args={[geometry, material, Math.ceil(numParticles)]}
          renderOrder={2}
          scale={springProps.scale}
        />
      ))}
    </>
  ) : (
    <ChildParticle scale={springProps.scale} />
  );
  // <instancedMesh
  //   ref={mesh}
  //   args={[null, null, numParticles]}
  //   renderOrder={2}
  //   // onPointerMove={(e) => setHovered(e.instanceId)}
  //   // onPointerOut={(e) => setHovered(undefined)}
  // >
  //   {/* <Suspense component={null}>
  //     <ChildParticle scale={[scale, scale, scale]} />
  //   </Suspense> */}
  //   <boxBufferGeometry attach="geometry" />
  //   <meshNormalMaterial attach="material" transparent opacity={1} />
  // </instancedMesh>
};

export default Particle;
