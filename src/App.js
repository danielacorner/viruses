import React from "react";
import { Controls } from "react-three-gui";
import Scene from "./components/Scene";
import { useWindowSize } from "./utils/hooks";
import MemoryStats from "react-memorystats";
import { render } from "react-dom";
import { useMount } from "./utils/utils";
import * as THREE from "three";
import Tooltip from "./components/Tooltip";
function App() {
  const windowSize = useWindowSize();
  useMount(() => {
    render(
      <MemoryStats corner="topLeft" />,
      document.querySelector("#memoryStats")
    );
  });
  return (
    <div className="App">
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
        <Controls />
      </Controls.Provider>
      <div id="memoryStats"></div>
      <Tooltip />
    </div>
  );
}

export default App;
