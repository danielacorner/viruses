import React, { Suspense, useEffect } from "react";
import Tooltip from "./components/Tooltip";
import { useStore, scaleAtom, isDarkModeAtom } from "./store";
import { useAtom } from "jotai";
import {
  HasRunOutOfMemory,
  LoadingIndicator,
} from "./components/LoadingIndicator/LoadingIndicator";
import GuidedTour from "./components/GuidedTour/GuidedTour";
import FeedbackFormDialog from "./components/GuidedTour/FeedbackFormDialog";
import ErrorBoundary from "./components/ErrorBoundary";
import AudioSoundButton from "./components/controls/AudioSoundButton";
import { StartPage } from "./StartPage";
import { Stats } from "@react-three/drei";
import DarkModeButton from "./components/controls/DarkModeButton";

function App() {
  return (
    <div className="App">
      <ErrorBoundary boundaryTitle="App">
        {process.env.NODE_ENV === "development" && (
          <Stats className="memoryStats" />
        )}
        <LoadingIndicator />
        <LazyLoadedScene />
        <>
          <Tooltip />
          <GuidedTour />
          <FeedbackFormDialog />
        </>
        <AudioSoundButton
          {...{
            title: "Inner Life of the Cell - Protein Packing",
            href: "https://www.youtube.com/watch?v=uHeTQLNFTgU",
            audioFile: `${process.env.PUBLIC_URL}/audio/InnerLifeOfCell.mp3`,
          }}
        />
        <DarkModeButton />
        <HasRunOutOfMemory />
      </ErrorBoundary>
    </div>
  );
}

export default App;

const CanvasAndSceneLazy = React.lazy(() => import("./CanvasAndScene"));

function LazyLoadedScene() {
  const started = useStore((s) => s.started);
  return started ? (
    <Suspense fallback={<>Loading Canvas</>}>
      <CanvasAndSceneLazy />
    </Suspense>
  ) : (
    <StartPage />
  );
}
