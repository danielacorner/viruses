import React from "react";
import { Controls } from "react-three-gui";
import Scene from "./components/Scene";
import { useWindowSize } from "./utils/hooks";
import * as THREE from "three";
import MemoryStats from "react-memorystats";
import { render } from "react-dom";
import { useMount } from "./utils/utils";
import { TemperatureControls } from "./TemperatureControls";
import { ScaleControls } from "./ScaleControls";
import { PauseControls } from "./PauseControls";

export default function CanvasAndScene({ renderProteins = true }) {
  useMount(() => {
    render(
      <MemoryStats corner="topLeft" />,
      document.querySelector("#memoryStats")
    );
  });
  const windowSize = useWindowSize();

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
        >
          <Scene />
        </Controls.Canvas>
        <Controls anchor={"top_right"} />
      </Controls.Provider>
      <TemperatureControls />
      <ScaleControls />
      <PauseControls />
    </>
  );
}
