import React, { useMemo, useRef } from "react";
import { useConvexPolyhedron } from "@react-three/cannon";
import { useJitterParticle } from "./useJitterParticle";
import { scaleAtom, useStore } from "../../store";
import * as THREE from "three";
import { useChangeVelocityWhenTemperatureChanges } from "./useChangeVelocityWhenTemperatureChanges";
import styled from "styled-components/macro";
import { Html } from "@react-three/drei";
import { toConvexProps } from "./toConvexProps";
import { useAtom } from "jotai";

/** Particle which can interact with others, or not (passes right through them) */
export function SingleParticle(props) {
  const Particle = props.interactive
    ? InteractiveParticle
    : NonInteractiveParticle;
  return <Particle {...props} />;
}
/** interacts with other particles using @react-three/cannon */
export function InteractiveParticle(props) {
  const { position, Component, mass, numIcosahedronFaces } = props;

  const set = useStore((s) => s.set);
  const [scale, setScale] = useAtom(scaleAtom);
  const isTooltipMaximized = useStore((s) => s.isTooltipMaximized);
  const selectedProtein = useStore((s) => s.selectedProtein);
  const isSelectedProtein =
    selectedProtein && selectedProtein.name === props.name;

  // each virus has a polyhedron shape, usually icosahedron (20 faces)
  // this shape determines how it bumps into other particles
  // https://codesandbox.io/s/r3f-convex-polyhedron-cnm0s?from-embed=&file=/src/index.js:1639-1642
  const detail = Math.floor(numIcosahedronFaces / 20);
  const volumeOfSphere = (4 / 3) * Math.PI * props.radius ** 3;
  const mockMass = 10 ** -5 * volumeOfSphere;
  // const RADIUS = 1;
  const geo = useMemo(
    () =>
      toConvexProps(
        new THREE.IcosahedronBufferGeometry(props.radius * 0.001, detail)
      ),
    [props.radius, detail]
  );

  const [ref, api] = useConvexPolyhedron(() => ({
    // TODO: accurate mass data from PDB --> need to multiply by number of residues or something else? doesn't seem right
    mass: mockMass, // approximate mass using volume of a sphere equation
    position,
    // type: !paused ? "Dynamic" : "Static",
    // https://threejs.org/docs/scenes/geometry-browser.html#IcosahedronBufferGeometry
    args: geo as any,
    // material: {
    //   restitution: 1,
    // },
  }));

  useJitterParticle({
    mass,
    ref,
    api,
  });

  // when temperature changes, change particle velocity
  useChangeVelocityWhenTemperatureChanges({ mass, api });

  const handleSetSelectedProtein = () =>
    set({ selectedProtein: { ...props, api } });

  const pointerDownTime = useRef(0);
  // if we mousedown AND mouseup over the same particle very quickly, select it
  const handlePointerDown = () => {
    pointerDownTime.current = Date.now();
  };
  const handlePointerUp = () => {
    const timeSincePointerDown = Date.now() - pointerDownTime.current;
    if (timeSincePointerDown < 300) {
      handleSetSelectedProtein();
    }
  };

  // https://codeworkshop.dev/blog/2020-11-05-displacement-maps-normal-maps-and-textures-in-react-three-fiber/
  // const displacementMap = useLoader(
  //   THREE.TextureLoader,
  //   "/images/maps/displacement-map.jpg"
  // );
  // const normalMap = useLoader(
  //   THREE.TextureLoader,
  //   "/images/maps/normal-map.jpg"
  // );
  // // apply texture on mount to all mesh nodes
  // const circleRef = useRef(null as any);
  // React.useEffect(() => {
  //   if (ref.current) {
  //     ref.current.traverse((node) => {
  //       if ((node as any).material) {
  //         (node as any).material.displacementMap = displacementMap;
  //         (node as any).material.normalMap = normalMap;
  //       }
  //     });
  //   }
  //   if (circleRef.current) {
  //     circleRef.current.material.map = displacementMap;
  //     circleRef.current.material.displacementMap = displacementMap;
  //     circleRef.current.material.normalMap = normalMap;
  //   }
  // }, []);
  return (
    <mesh
      ref={ref}
      scale={[scale, scale, scale]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {isSelectedProtein && !isTooltipMaximized ? <HighlightParticle /> : null}
      <Component />
      {/* <mesh ref={circleRef}>
        <sphereBufferGeometry args={[10, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color={"red"}
          // map={displacementMap}
          // displacementMap={displacementMap}
          // normalMap={normalMap}
        />
      </mesh> */}
    </mesh>
  );
}

const CircleOutline = styled.div`
  pointer-events: none;
  border: 2px solid #ff4775;
  box-sizing: border-box;
  border-radius: 50%;
  width: ${(props) => props.radius * 2}px;
  height: ${(props) => props.radius * 2}px;
  margin-left: ${(props) => -props.radius}px;
  margin-top: ${(props) => -props.radius}px;
`;
function HighlightParticle() {
  const selectedProtein = useStore((s) => s.selectedProtein);
  const [scale, setScale] = useAtom(scaleAtom);
  return selectedProtein ? (
    <Html>
      <CircleOutline radius={selectedProtein.radius * scale * 70} />
    </Html>
  ) : null;
}

/** hide particle if too big or too small */
export function useShouldRenderParticle(radius: number) {
  const [scale, setScale] = useAtom(scaleAtom);
  const worldRadius = useStore((s) => s.worldRadius);

  return getShouldRenderParticle(scale, radius, worldRadius);
}

// particle must be within this radius range at the current scale
const BIGGEST_PARTICLE_RADIUS = 0.2;
const SMALLEST_PARTICLE_RADIUS = 0.05;
export function getShouldRenderParticle(
  scale: number,
  radius: number,
  worldRadius: number
) {
  const particleSize = scale * radius;
  const tooBigToRender = particleSize > worldRadius * BIGGEST_PARTICLE_RADIUS;
  const tooSmallToRender =
    particleSize < worldRadius * SMALLEST_PARTICLE_RADIUS;
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
