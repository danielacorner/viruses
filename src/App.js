import React, { Suspense, useEffect } from "react";
import Tooltip from "./components/Tooltip";
import { Button, Typography } from "@material-ui/core";
import WarningOutlined from "@material-ui/icons/WarningOutlined";
import { CanvasAndSceneEmpty } from "./CanvasAndSceneEmpty";
import { useStore } from "./store";
import { LoadingIndicator } from "./components/LoadingIndicator";
import GuidedTour from "./components/GuidedTour";
import { useLocalStorageState } from "./utils/useLocalStorageState";
import { useMount } from "./utils/utils";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary
        fallback={() => {
          console.log(`🌟🚨 An error has occurred: App`);
          return null;
        }}
      >
        <LoadingIndicator />
        <LazyLoadedScene />
        <div id="memoryStats"></div>
        <Tooltip />
        <GuidedTour />
        <SaveControlsSettingsToLocalStorage />
      </ErrorBoundary>
    </div>
  );
}

export default App;

const CanvasAndSceneLazy = React.lazy(() => import("./CanvasAndScene"));

function LazyLoadedScene() {
  const set = useStore((s) => s.set);
  const started = useStore((s) => s.started);
  return started ? (
    <Suspense fallback={null}>
      <CanvasAndSceneLazy />
    </Suspense>
  ) : (
    <ErrorBoundary
      fallback={() => {
        console.log(`🌟🚨 An error has occurred: LazyLoadedScene`);
        return null;
      }}
    >
      <CanvasAndSceneEmpty />
      <div
        style={{
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "grid",
          placeItems: "center",
          alignContent: "center",
          gridGap: "1em",
          minHeight: "100vh",
        }}
      >
        <Typography style={{ textAlign: "center" }} variant="h3">
          Virus{" "}
          <span role="img" aria-label="">
            🦠
          </span>{" "}
          Terrarium
        </Typography>
        <div
          style={{
            display: "grid",
            gridAutoFlow: "column",
            placeItems: "center",
            gridGap: "0.25em",
          }}
        >
          <WarningOutlined />
          <Typography variant="body2">
            Requirements: {">"}40MB download, 1GB memory
          </Typography>
        </div>
        <Typography variant="subtitle2">
          ( this could take a while... )
        </Typography>
        <Button
          style={{ padding: "0.25em 3em", pointerEvents: "auto" }}
          onClick={() => set({ started: true })}
          variant="outlined"
        >
          Start
        </Button>
      </div>
    </ErrorBoundary>
  );
}

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
