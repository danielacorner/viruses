import React from "react";
import { useStore } from "./store";
import { Grid, IconButton, Typography } from "@material-ui/core";
import styled from "styled-components/macro";
import { Pause, PlayArrowOutlined } from "@material-ui/icons";

export function PauseControls() {
  const paused = useStore((s) => s.paused);
  const set = useStore((s) => s.set);
  return (
    <PauseControlsStyles onClick={() => set({ paused: !paused })}>
      <Typography align="center" id="volume-slider">
        {paused ? "Play" : "Pause"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <IconButton>{paused ? <PlayArrowOutlined /> : <Pause />}</IconButton>
        </Grid>
      </Grid>
    </PauseControlsStyles>
  );
}
const PauseControlsStyles = styled.div`
  cursor: pointer;
  position: fixed;
  bottom: 56px;
  right: calc(200px + 2 * 32px);
`;
