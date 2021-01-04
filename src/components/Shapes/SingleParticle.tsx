import React, { useRef } from "react";
import { useConvexPolyhedron } from "@react-three/cannon";
import { useJitterParticle } from "./useJitterParticle";
import { useStore } from "../../store";
import * as THREE from "three";

export function SingleParticle(props) {
  // TODO: make NonInteractiveParticle instanced for better performance?
  // TODO: make InteractiveParticle instanced for better performance?
  const Particle = props.interactive
    ? InteractiveParticle
    : NonInteractiveParticle;
  return <Particle {...props} />;
}
/** interacts with other particles using @react-three/cannon */
function InteractiveParticle(props) {
  const {
    pathToGLTF,
    position,
    atomCount,
    PDBUrl,
    Component,
    pathToImage,
    name,
    type,
    mass,
    numIcosahedronFaces,
  } = props;
  // TODO:
  // const temperature=useStore(state=>state.temperature)

  // https://codesandbox.io/s/r3f-convex-polyhedron-cnm0s?from-embed=&file=/src/index.js:1639-1642

  const detail = Math.ceil(numIcosahedronFaces / 20);
  const [ref] = useConvexPolyhedron(() => ({
    mass,
    position,
    // https://threejs.org/docs/scenes/geometry-browser.html#IcosahedronBufferGeometry
    args: new THREE.IcosahedronGeometry(1, detail),
  }));
  useJitterParticle({
    mass,
    ref,
  });
  const scale = useStore((state) => state.scale);
  const set = useStore((state) => state.set);

  return (
    <mesh
      ref={ref}
      scale={[scale, scale, scale]}
      onPointerOver={() => set({ selectedProtein: props })}
      // onPointerDown={() => set({ selectedProtein: { pathToImage } })}
    >
      <Component />
    </mesh>
  );
}

/** doesn't interact with other particles (passes through them) */
function NonInteractiveParticle({
  pathToGLTF,
  mass,
  position,
  Component,
  numIcosahedronFaces,
  pathToImage,
}) {
  const ref = useRef();
  useJitterParticle({
    mass,
    ref,
  });
  const scale = useStore((state) => state.scale);

  return (
    <mesh
      renderOrder={3}
      ref={ref}
      scale={[scale, scale, scale]}
      position={position}
    >
      <Component />
    </mesh>
  );
}
