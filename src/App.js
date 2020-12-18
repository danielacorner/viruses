import React from "react";
import { Canvas } from "react-three-fiber";
import Scene from "./components/Scene";
import { useWindowSize } from "./utils/hooks";

function App() {
  const windowSize = useWindowSize();

  return (
    <div className="App">
      <Canvas style={{ height: windowSize.height, width: windowSize.width }}>
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
