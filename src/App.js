import React from "react";
import { Controls } from "react-three-gui";
import Scene from "./components/Scene";
import { useWindowSize } from "./utils/hooks";

function App() {
  const windowSize = useWindowSize();

  return (
    <div className="App">
      <Controls.Provider>
        <Controls.Canvas
          style={{ height: windowSize.height, width: windowSize.width }}
        >
          <Scene />
        </Controls.Canvas>
      </Controls.Provider>
    </div>
  );
}

export default App;
