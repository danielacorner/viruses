import React, { Suspense, useEffect } from "react";
import Tooltip from "./components/Tooltip";
import { useStore, scaleAtom } from "./store";
import { useAtom } from "jotai";
import {
  HasRunOutOfMemory,
  LoadingIndicator,
} from "./components/LoadingIndicator/LoadingIndicator";
import GuidedTour from "./components/GuidedTour";
import { useLocalStorageState } from "./utils/useLocalStorageState";
import { useMount } from "./utils/utils";
import ErrorBoundary from "./components/ErrorBoundary";
import AudioSoundButton from "./components/controls/AudioSoundButton";
import { StartPage } from "./StartPage";

function App() {
  return (
    <div className="App">
      <ErrorBoundary boundaryTitle="App">
        <LoadingIndicator />
        <LazyLoadedScene />
        <div id="memoryStats"></div>
        <Tooltip />
        <GuidedTour />
        <AudioSoundButton
          title={"Inner Life of the Cell - Protein Packing"}
          href={"https://www.youtube.com/watch?v=uHeTQLNFTgU"}
        />
        <HasRunOutOfMemory />
      </ErrorBoundary>
    </div>
  );
}

export default App;

const CanvasAndSceneLazy = React.lazy(() => import("./CanvasAndScene"));
const ThunderdomeCanvasAndSceneLazy = React.lazy(
  () => import("./virus_thunderdome/src/CanvasAndScene")
);

function LazyLoadedScene() {
  const started = useStore((s) => s.started);
  const startedThunderdome = useStore((s) => s.startedThunderdome);
  return started ? (
    <Suspense fallback={<>Loading Canvas</>}>
      <CanvasAndSceneLazy />
    </Suspense>
  ) : startedThunderdome ? (
    <Suspense fallback={<>Loading Thunderdome</>}>
      <ThunderdomeCanvasAndSceneLazy />
    </Suspense>
  ) : (
    <StartPage />
  );
}
