import React from "react";
import { useStore } from "./store";
import { Grid, Slider, Typography } from "@material-ui/core";
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
      <Grid container spacing={2}>
        <Grid item>
          <AcUnit />
        </Grid>
        <Grid item xs>
          <Slider
            aria-labelledby="volume-slider"
            onChange={(event, newValue) => {
              set({ temperature: newValue });
            }}
            min={0}
            max={100}
            value={temperature}
          />
        </Grid>
        <Grid item>
          <Whatshot />
        </Grid>
      </Grid>
    </TemperatureControlsStyles>
  );
}
const TemperatureControlsStyles = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 200px;
`;
