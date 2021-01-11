import React from "react";
import { Controls } from "react-three-gui";
import Scene from "./components/Scene";
import { useWindowSize } from "./utils/hooks";
import * as THREE from "three";
import MemoryStats from "react-memorystats";
import { render } from "react-dom";
import { useMount } from "./utils/utils";
import { ScaleControls } from "./ScaleControls";
// import { useFrame } from "react-three-fiber";
import BottomControls from "./BottomControls";
export default function CanvasAndScene({ renderProteins = true }) {
  useMount(() => {
    render(
      <MemoryStats corner="topLeft" />,
      document.querySelector("#memoryStats")
    );
  });
  const windowSize = useWindowSize();

  //  // This one makes the camera move in and out
  //  useFrame(({ clock, camera }) => {
  //   camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30
  // })
  return (
    <>
      <Controls.Provider>
        <Controls.Canvas
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFShadowMap;
          }}
          gl={{ antialias: false, alpha: false }}
          style={{ height: windowSize.height, width: windowSize.width }}
          camera={{ fov: 75, position: [0, 0, 15] }}
        >
          <Scene />
        </Controls.Canvas>
        <Controls anchor={"top_right"} style={{ marginTop: -64 }} />
      </Controls.Provider>
      <ScaleControls />
      <BottomControls />
    </>
  );
}
