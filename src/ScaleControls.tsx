import React from "react";
import { useStore } from "./store";
import { Slider, Typography, useMediaQuery } from "@material-ui/core";
import styled from "styled-components/macro";
import { ZoomOut, ZoomIn } from "@material-ui/icons";
import { getIsTouchDevice } from "./getIsTouchDevice";

export function ScaleControls() {
  const scale = useStore((s) => s.scale);
  const set = useStore((s) => s.set);
  const isTouchDevice = getIsTouchDevice();
  const isLandscape =
    useMediaQuery(`(orientation: landscape)`) && isTouchDevice;
  return (
    <ScaleControlsStyles isLandscape={isLandscape}>
      <Typography align="center" id="volume-slider" gutterBottom>
        Scale
      </Typography>
      <div className="grid">
        <div className="grid-item">
          <ZoomIn />
        </div>
        <div className="grid-item">
          <Slider
            orientation="vertical"
            aria-labelledby="volume-slider"
            onChange={(event, newValue) => {
              set({ scale: newValue });
            }}
            min={0}
            step={0.00000001}
            scale={(x) => x ** 2}
            max={0.03}
            value={scale}
          />
        </div>
        <div className="grid-item">
          <ZoomOut />
        </div>
      </div>
    </ScaleControlsStyles>
  );
}
const ScaleControlsStyles = styled.div`
  position: fixed;
  display: grid;
  grid-template-rows: auto 1fr;
  justify-items: center;
  right: 16px;
  bottom: 124px;
  height: calc(100vh - 248px);
  min-height: 50vh;
  .grid {
    display: grid;
    justify-items: center;
    height: 100%;
    .grid-item {
      height: 100%;
    }
    grid-template-rows: auto 1fr auto;
    align-items: center;
    grid-gap: 1em;
  }
`;
