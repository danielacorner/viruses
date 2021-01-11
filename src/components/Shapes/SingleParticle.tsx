import React, { useRef } from "react";
import { useConvexPolyhedron } from "@react-three/cannon";
import { useFrame } from "react-three-fiber";
import { useJitterParticle } from "./useJitterParticle";
import { GlobalStateType, useStore } from "../../store";
import * as THREE from "three";
import { usePauseUnpause } from "./usePauseUnpause";
import { useChangeVelocityWhenTemperatureChanges } from "./useChangeVelocityWhenTemperatureChanges";
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
    paused,
    radius,
  } = props;
  // TODO:
  // const temperature=useStore(state=>state.temperature)

  // https://codesandbox.io/s/r3f-convex-polyhedron-cnm0s?from-embed=&file=/src/index.js:1639-1642

  const detail = Math.ceil(numIcosahedronFaces / 20);
  const [ref, api] = useConvexPolyhedron(() => ({
    mass,
    position,
    // https://threejs.org/docs/scenes/geometry-browser.html#IcosahedronBufferGeometry
    args: new THREE.IcosahedronGeometry(1, detail),
  }));
  const prevPosition = useRef([0, 0, 0]);
  useMount(() => api.position.subscribe((p) => (prevPosition.current = p)));
  useFrame(() => {
    if (paused && prevPosition.current) {
      const [x, y, z] = prevPosition.current as any;
      api.position.set(x, y, z);
    }
  });

  usePauseUnpause({
    api,
  });

  useJitterParticle({
    mass,
    ref,
    api,
  });

  useChangeVelocityWhenTemperatureChanges({ mass, api });

  const worldRadius = useStore((state: GlobalStateType) => state.worldRadius);
  const scale = useStore((state: GlobalStateType) => state.scale);
  const set = useStore((state: GlobalStateType) => state.set);

  const handleSetSelectedProtein = () =>
    set({ selectedProtein: { ...props, api } });
  // const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINT_MOBILE}px)`);
  const tooBigToRender = scale * radius > worldRadius / 3;
  const tooSmallToRender = scale * radius < worldRadius / 100;
  return (
    <mesh
      visible={!(tooBigToRender || tooSmallToRender)}
      ref={ref}
      scale={[scale, scale, scale]}
      {...(tooBigToRender || tooSmallToRender
        ? {}
        : { onPointerDown: handleSetSelectedProtein })}
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
