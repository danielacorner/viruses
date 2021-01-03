import React, { useMemo, useRef } from "react";
import { useConvexPolyhedron, useSphere } from "@react-three/cannon";
import { useJitterParticle } from "./useJitterParticle";
import { useStore } from "../../store";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry";

export function SingleParticle({
  ChildParticle,
  position,
  mass,
  interactive,
  pathToGLTF,
}) {
  // TODO: make NonInteractiveParticle instanced for better performance?
  // TODO: make InteractiveParticle instanced for better performance?
  const Particle = interactive ? InteractiveParticle : NonInteractiveParticle;
  return (
    <Particle
      {...{
        mass,
        position,
        ChildParticle,
        pathToGLTF,
      }}
    />
  );
}
/** interacts with other particles using @react-three/cannon */
function InteractiveParticle({ pathToGLTF, position, ChildParticle, mass }) {
  // TODO:
  // const temperature=useStore(state=>state.temperature)

  // https://codesandbox.io/s/r3f-convex-polyhedron-cnm0s?from-embed=&file=/src/index.js:1639-1642
  const { nodes } = useGLTF(pathToGLTF) as any;
  const firstNodeWithGeom = Object.values(nodes).filter(
    (n: any) => "geometry" in n
  )[0] as any;
  const firstGeom = firstNodeWithGeom?.geometry;
  console.log("🌟🚨 ~ InteractiveParticle ~ firstGeom", firstGeom);
  const geo = useMemo(() => {
    if (!firstGeom) {
      return null;
    }
    const g = new THREE.Geometry().fromBufferGeometry(firstGeom as any);
    // Merge duplicate vertices resulting from glTF export.
    // Cannon assumes contiguous, closed meshes to work
    g.mergeVertices();
    // Ensure loaded mesh is convex and create faces if necessary
    return new ConvexGeometry(g.vertices);
  }, [firstGeom]);

  // const [ref] = useSphere(() => ({
  //   mass,
  //   position,
  //   args: 1,
  // }));
  const [ref] = useConvexPolyhedron(() => ({
    mass,
    position,
    args: geo,
  }));
  // const ref = useRef();
  useJitterParticle({
    mass,
    ref,
  });
  const scale = useStore((state) => state.scale);

  return (
    geo && (
      <mesh ref={ref} scale={[scale, scale, scale]}>
        <ChildParticle {...{ mass, position }} />
        <meshStandardMaterial attach="material" wireframe />
      </mesh>
    )
  );
}

/** doesn't interact with other particles (passes through them) */
function NonInteractiveParticle({ pathToGLTF, mass, position, ChildParticle }) {
  const ref = useRef();
  useJitterParticle({
    mass,
    ref,
  });
  const scale = useStore((state) => state.scale);

  return (
    <mesh ref={ref} scale={[scale, scale, scale]} position={position}>
      <ChildParticle />
    </mesh>
  );
}
