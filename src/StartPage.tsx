import React from "react";
import { Button, Typography } from "@material-ui/core";
import WarningOutlined from "@material-ui/icons/WarningOutlined";
import { CanvasAndSceneEmpty } from "./CanvasAndSceneEmpty";
import { useStore } from "./store";
import ErrorBoundary from "./components/ErrorBoundary";
import { DeviceOrientationOrbitControls } from "./components/DeviceOrientationOrbitControls";
import { useHoverAnimation } from "./components/effects/useHoverAnimation";
import ReactJson from "react-json-view";

export function StartPage() {
  const set = useStore((s) => s.set);
  return (
    <ErrorBoundary boundaryTitle={"Start Page"}>
      <CanvasAndSceneEmpty isStartPage={true} />
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
