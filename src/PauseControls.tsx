import React from "react";
import { useStore } from "./store";
import { Grid, IconButton, Typography } from "@material-ui/core";
import styled from "styled-components/macro";
import { Pause, PlayArrowOutlined } from "@material-ui/icons";

export function PauseControls() {
  const paused = useStore((s) => s.paused);
  const set = useStore((s) => s.set);
  return (
    <PauseControlsStyles>
      <Typography align="center" id="volume-slider" gutterBottom>
        {paused ? "Play" : "Pause"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <IconButton onClick={() => set({ paused: !paused })}>
            {paused ? <PlayArrowOutlined /> : <Pause />}
          </IconButton>
        </Grid>
      </Grid>
    </PauseControlsStyles>
  );
}
const PauseControlsStyles = styled.div`
  position: fixed;
  bottom: 0;
  right: calc(50% - 16px);
`;
