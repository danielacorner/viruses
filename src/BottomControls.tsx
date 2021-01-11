import React from "react";
import { TemperatureControls } from "./TemperatureControls";
import { PauseControls } from "./PauseControls";
import styled from "styled-components/macro";
import { useMediaQuery } from "@material-ui/core";
import { BREAKPOINT_MOBILE } from "./utils/constants";

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
      <PauseControls />
      <TemperatureControls />
    </StyledDiv>
  );
}
