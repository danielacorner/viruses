import React from "react";
import { TemperatureControls } from "../../TemperatureControls";
import { PauseControls } from "../../PauseControls";
import styled from "styled-components/macro";

const StyledDiv = styled.div``;
export default function BottomControls() {
  return (
    <StyledDiv
      css={`
        position: fixed;
        bottom: 6px;
        left: 30vw;
        right: 6px;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        grid-gap: 2em;
      `}
    >
      {/* <ShuffleControls /> */}
      <TemperatureControls />
      <PauseControls />
    </StyledDiv>
  );
}
