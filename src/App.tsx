import React, { Suspense, useEffect } from "react";
import Tooltip from "./components/Tooltip";
import { useStore, scaleAtom, isDarkModeAtom } from "./store";
import { useAtom } from "jotai";
import {
  HasRunOutOfMemory,
  LoadingIndicator,
} from "./components/LoadingIndicator/LoadingIndicator";
import GuidedTour from "./components/GuidedTour";
import ErrorBoundary from "./components/ErrorBoundary";
import AudioSoundButton from "./components/controls/AudioSoundButton";
import { StartPage } from "./StartPage";
import { Stats } from "@react-three/drei";
import DarkModeButton from "./components/controls/DarkModeButton";

function App() {
  const startedThunderdome = useStore((s) => s.startedThunderdome);

  return (
    <div className="App">
      <ErrorBoundary boundaryTitle="App">
        {process.env.NODE_ENV === "development" && (
          <Stats className="memoryStats" />
        )}
        <LoadingIndicator />
        <LazyLoadedScene />
        {startedThunderdome ? null : (
          <>
            <Tooltip />
            <GuidedTour />
          </>
        )}
        <AudioSoundButton
          {...(startedThunderdome
            ? {
                title: "Nōpi - Aqiral",
                href: "https://www.youtube.com/watch?v=c-o8o9cYJeY",
                audioFile: `${process.env.PUBLIC_URL}/audio/NopiAqiral.mp3`,
              }
            : {
                title: "Inner Life of the Cell - Protein Packing",
                href: "https://www.youtube.com/watch?v=uHeTQLNFTgU",
                audioFile: `${process.env.PUBLIC_URL}/audio/InnerLifeOfCell.mp3`,
              })}
        />
        <DarkModeButton />
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
