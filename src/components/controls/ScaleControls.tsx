import React, { useEffect, useRef } from "react";
import { scaleAtom } from "../../store";
import { Slider, Typography, useMediaQuery } from "@material-ui/core";
import styled from "styled-components/macro";
import { ZoomOut, ZoomIn } from "@material-ui/icons";
import { getIsTouchDevice } from "../../getIsTouchDevice";
import { MIN_SCALE, MAX_SCALE } from "../../utils/constants";
import { useProgress } from "@react-three/drei";
import { darkText, darkTextShadow } from "../../utils/colors";
import { useAtom } from "jotai";

export function ScaleControls() {
  const [scale, setScale] = useAtom(scaleAtom);
  const isTouchDevice = getIsTouchDevice();
  const { active: loading } = useProgress();

  const isLandscape =
    useMediaQuery(`(orientation: landscape)`) && isTouchDevice;

  // remember the lowest scale we've hit so far
  const lowestSoFar = useRef(scale);
  useEffect(() => {
    lowestSoFar.current = Math.min(scale, lowestSoFar.current);
  }, [scale]);
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
            valueLabelDisplay="auto"
            valueLabelFormat={(x) => Number(x * 10000).toFixed(2)}
            orientation="vertical"
            aria-labelledby="volume-slider"
            onChange={(event, newValue) => {
              // prevent going any lower while loading (can still go higher)
              // because we start small and scale up, this ensures we load the minimum number of assets each time
              if (loading && newValue < lowestSoFar.current) {
                return;
              }
              setScale(Number(newValue));
            }}
            min={MIN_SCALE}
            step={0.00000001}
            scale={(x) => x ** 2}
            max={MAX_SCALE}
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
  color: ${darkText};
  text-shadow: ${darkTextShadow};
  .MuiSlider-root {
    color: hsl(0, 0%, 30%);
  }
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
