import React, { Suspense, useEffect } from "react";
import Tooltip from "./components/Tooltip";
import { useStore } from "./store";
import {
  HasRunOutOfMemory,
  LoadingIndicator,
} from "./components/LoadingIndicator";
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
        <AudioSoundButton />
        <SaveControlsSettingsToLocalStorage />
        <HasRunOutOfMemory />
      </ErrorBoundary>
    </div>
  );
}

export default App;

const CanvasAndSceneLazy = React.lazy(() => import("./CanvasAndScene"));
const ThunderdomeCanvasAndSceneLazy = React.lazy(
  () => import("./virus_thunderdome/src/App")
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

// could replace with atomWithStorage
function SaveControlsSettingsToLocalStorage() {
  const set = useStore((s) => s.set);
  const scale = useStore((s) => s.scale);
  // const temperature = useStore((s) => s.temperature);

  const [settings, setSettings] = useLocalStorageState("settings", {
    // temperature,
    scale,
  });

  // when app mounts, retrieve settings from local storage
  useMount(() => {
    if (!settings) {
      return;
    }
    // if (settings.temperature) {
    //   set({ temperature: settings.temperature });
    // }
    if (settings.scale) {
      set({ scale: settings.scale });
    }
  });

  useEffect(() => {
    setSettings({ scale });
  }, [scale, setSettings]);

  return null;
}
