import React from "react";
import { TemperatureControls } from "./TemperatureControls";
import { PauseControls } from "./PauseControls";
import styled from "styled-components/macro";
import { IconButton, Typography, useMediaQuery } from "@material-ui/core";
import { BREAKPOINT_MOBILE } from "./utils/constants";
import { ShuffleOutlined } from "@material-ui/icons";
import { useStore } from "./store";

const StyledDiv = styled.div``;
export default function BottomControls() {
  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINT_MOBILE}px)`);
  return (
    <StyledDiv
      css={`
        position: fixed;
        bottom: ${isTabletOrLarger ? 16 : 64}px;
        left: 30vw;
        right: 32px;
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        grid-gap: 2em;
      `}
    >
      {/* <ShuffleControls /> */}
      <PauseControls />
      <TemperatureControls />
    </StyledDiv>
  );
}
function ShuffleControls() {
  const set = useStore((s) => s.set);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto auto",
        alignItems: "center",
      }}
    >
      <Typography style={{ color: "lightgrey" }}>Shuffle</Typography>
      <IconButton
        disabled={true}
        onClick={() => set({ shuffled: Math.random() })}
      >
        <ShuffleOutlined />
      </IconButton>
    </div>
  );
}
