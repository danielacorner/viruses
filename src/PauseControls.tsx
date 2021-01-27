import React from "react";
import { useStore } from "./store";
import { Grid, IconButton, Typography } from "@material-ui/core";
import styled from "styled-components/macro";
import { Pause, PlayArrowOutlined } from "@material-ui/icons";
import { useEventListener, usePreviousIf } from "./utils/hooks";

export function PauseControls() {
  const paused = useStore((s) => s.paused);
  const set = useStore((s) => s.set);
  const temperature = useStore((s) => s.temperature);
  const prevTemp = usePreviousIf(temperature, temperature !== 0);

  const handlePauseUnpause = () => {
    const nextPaused = !paused;

    // freeze or unfreeze the temperature
    if (nextPaused === true && temperature !== 0) {
      set({ temperature: 0 });
    } else if (!nextPaused && temperature === 0) {
      set({ temperature: prevTemp });
    }

    set({ paused: nextPaused });
  };

  useEventListener("keydown", (event) =>
    event.key === " " ? handlePauseUnpause() : null
  );

  return (
    <PauseControlsStyles onClick={() => handlePauseUnpause()}>
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
`;
