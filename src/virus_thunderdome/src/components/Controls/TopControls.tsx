import React from "react";
import styled from "styled-components/macro";
import { ScaleControls } from "./ScaleControls";
import { IconButton } from "@material-ui/core";
import { VolumeMute, VolumeUp } from "@material-ui/icons";
import { useStore } from "../../store";

const StyledDiv = styled.div``;
export default function TopControls() {
  return (
    <StyledDiv
      css={`
        position: fixed;
        top: 12px;
        left: 8vw;
        right: 4vw;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        grid-gap: 2em;
      `}
    >
      <ScaleControls />
      {/* <MuteControls /> */}
      {/* <ShuffleControls /> */}
    </StyledDiv>
  );
}

function MuteControls() {
  const set = useStore((s) => s.set);
  const soundOn = useStore((s) => s.soundOn);
  return (
    <IconButton onClick={() => set({ soundOn: !soundOn })}>
      {soundOn ? <VolumeUp /> : <VolumeMute />}
    </IconButton>
  );
}
