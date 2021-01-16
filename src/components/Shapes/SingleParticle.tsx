import React, { useRef } from "react";
import { useConvexPolyhedron } from "@react-three/cannon";
import { useJitterParticle } from "./useJitterParticle";
import { GlobalStateType, useStore } from "../../store";
import * as THREE from "three";
import { usePauseUnpause } from "./usePauseUnpause";
import {
  useChangeVelocityWhenScaleChanges,
  useChangeVelocityWhenTemperatureChanges,
} from "./useChangeVelocityWhenTemperatureChanges";
import { useMount } from "../../utils/utils";

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
    position,
    Component,
    mass,
    numIcosahedronFaces,
    radius,
    // pathToGLTF,
    // atomCount,
    // PDBUrl,
    // pathToImage,
    // name,
    // type,
    // paused,
  } = props;

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

  useChangeVelocityWhenTemperatureChanges({ mass, api });
  useChangeVelocityWhenScaleChanges({ mass, api });

  // set temperature low to start...
  useMount(() => {
    setTimeout(() => {
      set({ temperature: 0.001 });
    }, 1000);
  });

  const scale = useStore((state: GlobalStateType) => state.scale);
  const set = useStore((state: GlobalStateType) => state.set);

  const handleSetSelectedProtein = () =>
    set({ selectedProtein: { ...props, api } });

  const shouldRender = useShouldRenderParticle(radius);

  // TODO: lazy-load components?
  return (
    <mesh
      // visible={shouldRender}
      ref={ref}
      scale={[scale, scale, scale]}
      onPointerDown={handleSetSelectedProtein}
      // {...(shouldRender ? { onPointerDown: handleSetSelectedProtein } : {})}
    >
      {shouldRender ? <Component /> : null}
    </mesh>
  );
}

export function useShouldRenderParticle(radius: number) {
  const scale = useStore((state: GlobalStateType) => state.scale);
  const worldRadius = useStore((state: GlobalStateType) => state.worldRadius);

  const tooBigToRender = scale * radius > worldRadius / 3;
  const tooSmallToRender = scale * radius < worldRadius / 25;
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
