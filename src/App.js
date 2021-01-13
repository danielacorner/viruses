import React, { Suspense, useEffect } from "react";
import Tooltip from "./components/Tooltip";
import { Button, LinearProgress, Typography } from "@material-ui/core";
import WarningOutlined from "@material-ui/icons/WarningOutlined";
import { CanvasAndSceneEmpty } from "./CanvasAndSceneEmpty";
import { useStore } from "./store";

function App() {
  return (
    <div className="App">
      {/* <LoadingIndicator /> */}
      <LazyLoadedScene />
      <div id="memoryStats"></div>
      <Tooltip />
    </div>
  );
}

export default App;

const CanvasAndSceneLazy = React.lazy(() => import("./CanvasAndScene"));

// TECHDEBT: could estimate load time by testing user's connection speed https://www.geeksforgeeks.org/how-to-detect-network-speed-using-javascript/
const ESTIMATED_LOAD_TIME = 5 * 60 * 1000;

function LazyLoadedScene() {
  const set = useStore((s) => s.set);
  const loading = useStore((s) => s.loading);
  const started = useStore((s) => s.started);

  // stop loading after ~2min
  useEffect(() => {
    if (started) {
      window.setTimeout(() => {
        set({ loading: false });
      }, ESTIMATED_LOAD_TIME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  return !started ? (
    <>
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
            Requirements: {">"}200MB download, 1GB memory
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
    </>
  ) : (
    <>
      {loading && <LinearProgress variant="indeterminate" />}
      <Suspense fallback={null}>
        <CanvasAndSceneLazy />
      </Suspense>
    </>
  );
}
