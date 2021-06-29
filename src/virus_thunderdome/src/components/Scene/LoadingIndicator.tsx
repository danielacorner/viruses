import React, { useRef } from "react";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { useProgress } from "@react-three/drei";
import styled from "styled-components/macro";
import { useFrame } from "react-three-fiber";
import { CanvasAndSceneEmpty } from "../../CanvasAndSceneEmpty";
import { useStore } from "../../store";
import { MAX_SCALE, MIN_SCALE } from "../../utils/constants";

export function LoadingIndicator() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return errors.length > 0 ? (
    <div
      style={{ maxWidth: "100vw", wordBreak: "break-all", padding: "0 6em" }}
    >
      {JSON.stringify(errors)}
    </div>
  ) : active ? (
    <>
      <LoadingIndicatorStyles>
        <div>
          {loaded}/{total} models loaded
        </div>{" "}
        <div>loading asset: {item}</div>
      </LoadingIndicatorStyles>
      <LinearProgress
        {...(loaded === 0
          ? { variant: "indeterminate" }
          : { variant: "determinate", value: progress })}
      />
      <CanvasAndSceneEmpty isLoadingIndicator={true}>
        <SpinningParticle />
      </CanvasAndSceneEmpty>
      <CenteredSpinner />
    </>
  ) : null;
}
const SPEED_Y = 0.5;
const SPEED_X = 0.2;
const AMPLITUDE_Y = 1;
const AMPLITUDE_X_INV = 0.01;
function SpinningParticle() {
  const scale = useStore((s) => s.scale);
  const scalePct = (scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE);

  const ref1 = useRef(null as any);
  const ref2 = useRef(null as any);
  const ref3 = useRef(null as any);
  const ref4 = useRef(null as any);
  const ref5 = useRef(null as any);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (!ref1.current) {
      return;
    }
    ref1.current.rotation.x = -Math.sin(time * SPEED_Y) * AMPLITUDE_Y;
    ref1.current.rotation.y =
      ref1.current.rotation.y + Math.cos(time * SPEED_X) * AMPLITUDE_X_INV;

    ref2.current.rotation.x = Math.sin(time * SPEED_Y) * AMPLITUDE_Y;
    ref2.current.rotation.y =
      ref2.current.rotation.y - Math.cos(time * SPEED_X) * AMPLITUDE_X_INV;

    ref3.current.rotation.x = Math.sin(time * SPEED_Y) * AMPLITUDE_Y;
    ref3.current.rotation.y =
      ref3.current.rotation.y + Math.cos(time * SPEED_X) * AMPLITUDE_X_INV;

    ref4.current.rotation.x = -Math.sin(time * SPEED_Y) * AMPLITUDE_Y;
    ref4.current.rotation.y =
      ref4.current.rotation.y - Math.cos(time * SPEED_X) * AMPLITUDE_X_INV;

    ref5.current.rotation.x = -Math.sin(time * SPEED_Y) * AMPLITUDE_Y;
    ref5.current.rotation.y =
      ref5.current.rotation.y + Math.cos(time * SPEED_X) * AMPLITUDE_X_INV;
  });
  return (
    <>
      <mesh ref={ref1}>
        <tetrahedronBufferGeometry args={[scalePct * 0.25, 0]} />
        <meshPhysicalMaterial
          opacity={0.5}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
        />
      </mesh>
      <mesh ref={ref2}>
        <octahedronBufferGeometry args={[scalePct * 0.5, 0]} />
        <meshPhysicalMaterial
          opacity={0.4}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
        />
      </mesh>
      <mesh ref={ref3}>
        <icosahedronBufferGeometry args={[scalePct * 1, 0]} />
        <meshPhysicalMaterial
          // wireframe={true}
          opacity={0.4}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
        />
      </mesh>
      <mesh ref={ref4}>
        <icosahedronBufferGeometry args={[scalePct * 4, 1]} />
        <meshPhysicalMaterial
          color="tomato"
          // wireframe={true}
          opacity={0.08}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
        />
      </mesh>
      <mesh ref={ref5}>
        <icosahedronBufferGeometry args={[scalePct * 14, 2]} />
        <meshPhysicalMaterial
          opacity={0.04}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
          // wireframe={true}
        />
      </mesh>
      <mesh>
        <icosahedronBufferGeometry args={[scalePct * 100, 5]} />
        <meshPhysicalMaterial
          color="rebeccapurple"
          opacity={0.018}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
          wireframe={true}
        />
      </mesh>
      <mesh>
        <icosahedronBufferGeometry args={[scalePct * 600, 10]} />
        <meshPhysicalMaterial
          color="cornflowerblue"
          opacity={0.01}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
          wireframe={true}
        />
      </mesh>
    </>
  );
}

const LoadingIndicatorStyles = styled.div`
  position: fixed;
  max-width: 100vw;
  top: 4px;
  font-size: 0.8em;
  display: grid;
  place-content: center;
  justify-items: start;
  align-items: start;
  z-index: 999;
  right: 1em;
  left: 4em;
  width: calc(100vw - 5em);
  grid-template-columns: 16vw 1fr;
  grid-gap: 1em;
  word-break: break-all;
`;

// function useInterval({ cb, interval }) {
//   useMount(() => {
//     const timer = window.setInterval(cb, interval);
//     return () => window.clearInterval(timer);
//   });
// }

const StyledDiv = styled.div`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
`;
function CenteredSpinner() {
  return (
    <StyledDiv>
      <CircularProgress size={100} />
    </StyledDiv>
  );
}
