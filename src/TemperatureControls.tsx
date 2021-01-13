import React from "react";
import { useStore } from "./store";
import { Slider, Typography } from "@material-ui/core";
import styled from "styled-components/macro";
import { AcUnit, Whatshot } from "@material-ui/icons";

export function TemperatureControls() {
  const temperature = useStore((s) => s.temperature);
  const set = useStore((s) => s.set);
  return (
    <TemperatureControlsStyles>
      <Typography align="center" id="volume-slider" gutterBottom>
        Temperature
      </Typography>
      <div className="grid">
        <div className="grid-item">
          <AcUnit />
        </div>
        <div className="grid-item">
          <Slider
            aria-labelledby="volume-slider"
            onChange={(event, newValue) => {
              set({ temperature: newValue });
            }}
            min={0}
            max={100}
            value={temperature}
          />
        </div>
        <div className="grid-item">
          <Whatshot />
        </div>
      </div>
    </TemperatureControlsStyles>
  );
}
const TemperatureControlsStyles = styled.div`
  .grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    grid-gap: 1em;
  }
`;
