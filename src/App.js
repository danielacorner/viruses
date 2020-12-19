import React from "react";
import { Controls } from "react-three-gui";
import Scene from "./components/Scene";
import { useWindowSize } from "./utils/hooks";
import MemoryStats from "react-memorystats";
import { render } from "react-dom";
import { useMount } from "./utils/utils";

function App() {
  const windowSize = useWindowSize();
  useMount(() => {
    render(
      <MemoryStats corner="topRight" />,
      document.querySelector("#memoryStats")
    );
  });
  return (
    <div className="App">
      <Controls.Provider>
        <Controls.Canvas
          gl={{ antialias: false, alpha: false }}
          style={{ height: windowSize.height, width: windowSize.width }}
        >
          <Scene />
        </Controls.Canvas>
        <Controls />
      </Controls.Provider>
      <div id="memoryStats"></div>
    </div>
  );
}

export default App;
