import React from "react";
import { TemperatureControls } from "./TemperatureControls";
import { PauseControls } from "./PauseControls";
import styled from "styled-components/macro";

const StyledDiv = styled.div``;
export default function BottomControls() {
  return (
    <StyledDiv
      css={`
        position: fixed;
        bottom: 16px;
        left: 30vw;
        right: 16px;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        grid-gap: 2em;
        color: white;
        text-shadow: 0px 1px 4px black;
        .MuiSlider-root {
          color: white;
        }
      `}
    >
      {/* <ShuffleControls /> */}
      <TemperatureControls />
      <PauseControls />
    </StyledDiv>
  );
}
