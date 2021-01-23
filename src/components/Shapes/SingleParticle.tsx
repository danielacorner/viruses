import React, { useRef } from "react";
import { useConvexPolyhedron } from "@react-three/cannon";
import { useJitterParticle } from "./useJitterParticle";
import { useStore } from "../../store";
import * as THREE from "three";
import { usePauseUnpause } from "./usePauseUnpause";
import { useChangeVelocityWhenTemperatureChanges } from "./useChangeVelocityWhenTemperatureChanges";

/** Particle which can interact with others, or not (passes right through them) */
export function SingleParticle(props) {
  const Particle = props.interactive
    ? InteractiveParticle
    : NonInteractiveParticle;
  return <Particle {...props} />;
}
/** interacts with other particles using @react-three/cannon */
function InteractiveParticle(props) {
  const { position, Component, mass, numIcosahedronFaces } = props;

  const set = useStore((s) => s.set);
  const scale = useStore((s) => s.scale);

  // each virus has a polyhedron shape, usually icosahedron (20 faces)
  // this shape determines how it bumps into other particles
  // https://codesandbox.io/s/r3f-convex-polyhedron-cnm0s?from-embed=&file=/src/index.js:1639-1642
  const detail = Math.ceil(numIcosahedronFaces / 20);
  const [ref, api] = useConvexPolyhedron(() => ({
    mass,
    position,
    // https://threejs.org/docs/scenes/geometry-browser.html#IcosahedronBufferGeometry
    args: new THREE.IcosahedronGeometry(1, detail),
  }));

  usePauseUnpause({
    api,
  });

  useJitterParticle({
    mass,
    ref,
    api,
  });

  // when temperature changes, change particle velocity
  useChangeVelocityWhenTemperatureChanges({ mass, api });

  const handleSetSelectedProtein = () =>
    set({ selectedProtein: { ...props, api } });

  return (
    <mesh
      // visible={shouldRender}
      ref={ref}
      scale={[scale, scale, scale]}
      onClick={handleSetSelectedProtein}
    >
      <Component />
      {/* {shouldRender ? <Component /> : null} */}
    </mesh>
  );
}

/** hide particle if too big or too small */
export function useShouldRenderParticle(radius: number) {
  const scale = useStore((s) => s.scale);
  const worldRadius = useStore((s) => s.worldRadius);

  return getShouldRenderParticle(scale, radius, worldRadius);
}

export function getShouldRenderParticle(
  scale: number,
  radius: number,
  worldRadius: number
) {
  const tooBigToRender = scale * radius > worldRadius / 3;
  const tooSmallToRender = scale * radius < worldRadius / 20;
  return !(tooBigToRender || tooSmallToRender);
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
