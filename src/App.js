import React from "react";
import { Controls } from "react-three-gui";
import Scene from "./components/Scene";
import { useWindowSize } from "./utils/hooks";

function App() {
  const windowSize = useWindowSize();

  return (
    <div className="App">
      <Controls.Canvas
        style={{ height: windowSize.height, width: windowSize.width }}
      >
        <Scene />
      </Controls.Canvas>
    </div>
  );
}

export default App;
