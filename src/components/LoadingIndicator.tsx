import React, { useRef } from "react";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { useProgress } from "@react-three/drei";
import styled from "styled-components/macro";
import { useFrame } from "react-three-fiber";
import { CanvasAndSceneEmpty } from "../CanvasAndSceneEmpty";
import * as THREE from "three";
import { useStore } from "../store";
import { MAX_SCALE, MIN_SCALE } from "../utils/constants";
// import { render } from "react-dom";
// import MemoryStats from "react-memorystats";

export function LoadingIndicator() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  // // show memorystats once we're done loading
  // const alreadyRendered = useRef(false);
  // useEffect(() => {
  //   if (
  //     process.env.NODE_ENV === "development" &&
  //     progress === 100 &&
  //     !alreadyRendered.current
  //   ) {
  //     alreadyRendered.current = true;
  //     render(
  //       <MemoryStats corner="topLeft" />,
  //       document.querySelector("#memoryStats")
  //     );
  //   }
  // }, [progress]);

  return errors.length > 0 ? (
    <div
      style={{ maxWidth: "100vw", wordBreak: "break-all", padding: "0 6em" }}
    >
      {JSON.stringify(errors)}
    </div>
  ) : active || true ? (
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

function SpinningParticle() {
  // const ref = useRef(null as any);
  // useFrame(({ clock }) => {
  //   const time = clock.getElapsedTime();
  //   if (ref.current) {
  //     ref.current.rotation.x = Math.sin(time / 4);
  //     ref.current.rotation.y = Math.sin(time / 2);
  //   }
  // });

  const scale = useStore((s) => s.scale);
  const scalePct = (scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE);

  return (
    <>
      <mesh>
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
      <mesh>
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
      <mesh>
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
      <mesh>
        <icosahedronBufferGeometry args={[scalePct * 5, 1]} />
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
      <mesh>
        <icosahedronBufferGeometry args={[scalePct * 10, 2]} />
        <meshPhysicalMaterial
          opacity={0.018}
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
      <CircularProgress />
    </StyledDiv>
  );
}
