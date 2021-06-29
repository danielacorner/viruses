import React, { useEffect } from "react";
import { useStore } from "../../store";
import { Grid, IconButton } from "@material-ui/core";
import styled from "styled-components/macro";
import { Pause, PlayArrowOutlined } from "@material-ui/icons";
import { usePrevious } from "../../utils/hooks";

export function PauseControls() {
  const paused = useStore((s) => s.paused);
  const set = useStore((s) => s.set);

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

  usePlayPauseOnSpacebar(handlePauseUnpause);

  const temperature = useStore((s) => s.temperature);
  const prevTemp = usePrevious(temperature);

  return (
    <PauseControlsStyles onClick={handlePauseUnpause}>
      <Grid container spacing={2}>
        <Grid item>
          <IconButton>{paused ? <PlayArrowOutlined /> : <Pause />}</IconButton>
        </Grid>
      </Grid>
    </PauseControlsStyles>
  );
}
const PauseControlsStyles = styled.div`
  width: fit-content;
  cursor: pointer;
`;

function usePlayPauseOnSpacebar(handlePauseUnpause: Function) {
  useEffect(() => {
    const onKeydown = (event) => {
      if (event.key === " ") {
        handlePauseUnpause();
      }
    };

    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [handlePauseUnpause]);
}
