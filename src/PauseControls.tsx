import React from "react";
import { useStore, scaleAtom, isDarkModeAtom } from "./store";
import { useAtom } from "jotai";
import { Grid, IconButton, Typography } from "@material-ui/core";
import styled from "styled-components/macro";
import { Pause, PlayArrowOutlined } from "@material-ui/icons";
import { useEventListener, usePreviousIf } from "./utils/hooks";
import {
  darkText,
  darkTextShadow,
  lightText,
  lightTextShadow,
} from "./utils/colors";

export function PauseControls() {
  const paused = useStore((s) => s.paused);
  const set = useStore((s) => s.set);
  const temperature = useStore((s) => s.temperature);
  const prevTemp = usePreviousIf(temperature, temperature !== 0);
  const [isDarkMode] = useAtom(isDarkModeAtom);

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
    <PauseControlsStyles
      {...{ isDarkMode }}
      onClick={() => handlePauseUnpause()}
    >
      <Typography align="center" id="volume-slider">
        {/* {paused ? "Play" : "Pause"} */}
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
  color: ${(p) => (p.isDarkMode ? lightText : darkText)};
  text-shadow: ${(p) => (p.isDarkMode ? lightTextShadow : darkTextShadow)};
  .MuiButtonBase-root {
    color: hsla(0, 0%, ${(p) => (p.isDarkMode ? 100 : 0)}%, 0.5);
  }
`;
