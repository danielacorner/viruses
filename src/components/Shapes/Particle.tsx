import React, { Suspense, useMemo, useRef } from "react";
import { useSphere } from "@react-three/cannon";
import {
  useJitterInstanceParticle,
  useJitterParticle,
} from "./useJitterParticle";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
// https://discourse.threejs.org/t/there-is-no-gltfloader-in-three-module/16117/4
import { useMount } from "../../utils/utils";
import { useGLTF } from "@react-three/drei";
import { getRandStartPosition } from "./particleUtils";
import { useStore } from "../../store";
// import * as antibody from "./models/1bv1/scene.gltf";

const dummy = new THREE.Object3D();

const rpi = () => Math.random() * Math.PI;

// const FancyParticle = React.forwardRef((props, ref) => {
//   return <group ref={ref}>{props.children}</group>;
// });

const Particle = ({
  ChildParticle,
  scale,
  position = null,
  temperature,
  numParticles,
  pathToGLTF,
  instanced = true,
  jittery,
  ...rest
}) => {
  const worldRadius = useStore((state) => state.worldRadius);

  // https://codesandbox.io/s/may-with-60fps-your-web-site-run-xj31x?from-embed=&file=/src/index.js:297-1112

  const instancedRef = useRef();
  const [sphereRef, sphereApi] = useSphere(() => ({
    // rotation: [-Math.PI / 2, 0, 0],
    mass: 1,
    position: position || getRandStartPosition(-worldRadius, worldRadius),
  }));

  (instanced ? useJitterInstanceParticle : useJitterParticle)({
    jitterPosition: !jittery ? 0 : temperature,
    jitterRotation: !jittery ? 0 : temperature,
    numParticles,
    ref: instanced ? instancedRef : sphereRef,
  });

  // random start positions: instanced
  const coords = useMemo(
    () => [...new Array(numParticles)].map(() => [rpi(), rpi(), rpi()]),
    [numParticles]
  );
  useFrame((state) => {
    if (!instanced || !(instancedRef.current as any)?.setMatrixAt) {
      return;
    }
    const t = state.clock.getElapsedTime();
    coords.forEach(([x, y, z], i) => {
      dummy.rotation.set(x + t, y + t, z + t);
      //       dummy.updateMatrix(void dummy.rotation.set(x + t, y + t, z + t))
      dummy.updateMatrix();
      (instancedRef.current as any).setMatrixAt(i, dummy.matrix);
    });
    (instancedRef.current as any).instanceMatrix.needsUpdate = true;
  });

  // random start positions: non-instanced
  useMount(() => {
    if (instanced) {
      return;
    }
    const [x, y, z] = getRandStartPosition(-worldRadius, worldRadius);
    // https://codesandbox.io/s/r3f-cannon-instanced-physics-devf8
    sphereApi.position.set(x, y, z);
  });

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
  console.log("🌟🚨 ~ usedgltf", usedgltf);

  const allGeometries = Object.values(usedgltf?.nodes)
    .map((node) => (node as any).geometry)
    .filter(Boolean);

  console.log("🌟🚨 ~ allGeometries", allGeometries);

  // const mergedGeometry = allGeometries.slice(-1).reduce((acc, cur) => {
  //   return (acc as any).merge(cur);
  // });
  const mergedGeometry = allGeometries[allGeometries.length - 1];
  // const mergedGeometry = useMemo(() => {
  //   const base = allGeometries.slice(1).reduce((acc, cur) => {
  //     return (acc as any).merge(cur);
  //   }, allGeometries[0]);
  //   return base;
  // }, [allGeometries]);
  console.log("🌟🚨 ~ mergedGeometry ~ mergedGeometry", mergedGeometry);

  const geometry = usedgltf?.nodes?.["RNA__SARS-CoV-2_0"]?.geometry;
  const materials = usedgltf?.materials["SARS-CoV-2"];
  console.log("🌟🚨 ~ instanced", instanced);
  console.log("🌟🚨 ~ geometry", geometry);
  // console.log("🌟🚨 ~ geometry", geometry);

  // each instance must have only one geometry https://github.com/pmndrs/react-three-fiber/issues/574#issuecomment-703296449
  return instanced && mergedGeometry ? (
    <>
      {allGeometries.map((geom) => (
        <instancedMesh
          ref={instancedRef}
          args={[geom, materials, Math.ceil(numParticles)]}
          renderOrder={2}
          scale={[scale, scale, scale]}
        ></instancedMesh>
      ))}
    </>
  ) : (
    <ChildParticle ref={sphereRef} scale={[scale, scale, scale]} />
  );
  // <instancedMesh
  //   ref={mesh}
  //   args={[null, null, numParticles]}
  //   renderOrder={2}
  //   // onPointerMove={(e) => setHovered(e.instanceId)}
  //   // onPointerOut={(e) => setHovered(undefined)}
  // >
  //   {/* <Suspense fallback={null}>
  //     <ChildParticle scale={[scale, scale, scale]} />
  //   </Suspense> */}
  //   <boxBufferGeometry attach="geometry" />
  //   <meshNormalMaterial attach="material" transparent opacity={1} />
  // </instancedMesh>
};

export default Particle;
